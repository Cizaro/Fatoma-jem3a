"""The two student characters: a parametric cartoon rig drawn with PIL.

Each character is drawn into her own supersampled RGBA tile from a pose dict,
so the same rig produces every frame of every scene -- which is what keeps the
two of them looking like the same two people all the way through.

Proportions are deliberately stylised (large eyes, large head, soft rounded
limbs) so the result reads as a cartoon and never as a photograph of anyone.
"""
import math

from PIL import Image, ImageDraw

from draw3d import ball, bezier, blob, capsule, lerp, shift, thick_curve

TW, TH = 620, 780          # tile size at 1x
HIP_X = 310
R = 92                     # head radius
HEAD = (310, 360)
SHO_Y = 548                # shoulder line
L1, L2 = 92, 88            # upper arm / forearm

MAYA = dict(
    name="maya", facing=1,
    skin=(224, 164, 120), skin_sh=(184, 122, 84),
    hair=(66, 40, 46), hair_hi=(116, 70, 72),
    top=(255, 122, 61), top_sh=(210, 80, 34),
    sleeve=(255, 158, 106), accent=(255, 212, 98),
    lip=(198, 86, 90), style="bun",
)

NOOR = dict(
    name="noor", facing=-1,
    skin=(247, 208, 172), skin_sh=(204, 156, 122),
    hair=(38, 32, 52), hair_hi=(88, 80, 118),
    top=(124, 108, 245), top_sh=(86, 70, 194),
    sleeve=(170, 158, 252), accent=(78, 205, 196),
    lip=(208, 104, 114), style="long",
)

# expression -> brow_raise, brow_angle, eye_open, smile, cheek, gaze_y
EXPR = {
    "neutral":  (0.05, 0.00, 0.95, 0.14, 0.18, 0.00),
    "warm":     (0.18, -0.05, 0.92, 0.46, 0.30, 0.02),
    "happy":    (0.34, -0.10, 0.76, 0.92, 0.52, -0.02),
    "excited":  (0.62, -0.14, 1.02, 0.80, 0.46, -0.06),
    "thinking": (0.12, 0.26, 0.82, 0.04, 0.16, -0.16),
    "confused": (0.30, 0.52, 0.88, -0.30, 0.22, -0.10),
    "surprised": (0.85, -0.05, 1.10, -0.08, 0.26, -0.04),
    "proud":    (0.26, -0.12, 0.72, 0.68, 0.40, 0.04),
}

# gesture -> forward hand, back hand, prop, shoulder lift
GEST = {
    "rest":    dict(fwd=(124, 664), back=(-116, 668), pf=None, pb=None, sh=0.0),
    "explain": dict(fwd=(215, 600), back=(-200, 620), pf=None, pb=None, sh=0.10),
    "offer":   dict(fwd=(228, 630), back=(-116, 694), pf=None, pb=None, sh=0.04),
    "count":   dict(fwd=(178, 500), back=(-116, 692), pf="count", pb=None, sh=0.12),
    "phone":   dict(fwd=(150, 600), back=(66, 634), pf="phone", pb=None, sh=0.02),
    "write":   dict(fwd=(182, 650), back=(-138, 648), pf="pen", pb=None, sh=-0.04),
    "point":   dict(fwd=(235, 586), back=(-116, 692), pf="point", pb=None, sh=0.08),
    "thumbs":  dict(fwd=(180, 546), back=(-116, 692), pf="thumb", pb=None, sh=0.10),
    "shrug":   dict(fwd=(228, 572), back=(-220, 580), pf=None, pb=None, sh=0.30),
    "cheer":   dict(fwd=(198, 442), back=(-192, 438), pf=None, pb=None, sh=0.26),
}


def base_pose():
    return dict(expr="neutral", gest="rest", mouth=0.0, blink=0.0, breath=0.0,
                face_dir=1.0, bob=0.0, lean=0.0, gaze_x=0.0, head_x=0.0,
                squint=0.0)


def expr_vals(name, blend=None, t=0.0):
    a = EXPR.get(name, EXPR["neutral"])
    if blend and blend != name:
        b = EXPR.get(blend, a)
        return tuple(lerp(a[i], b[i], t) for i in range(6))
    return a


def gest_vals(name, blend=None, t=0.0):
    a = GEST.get(name, GEST["rest"])
    if not blend or blend == name:
        return a
    b = GEST.get(blend, a)
    out = dict(a)
    for k in ("fwd", "back"):
        out[k] = (lerp(a[k][0], b[k][0], t), lerp(a[k][1], b[k][1], t))
    out["sh"] = lerp(a["sh"], b["sh"], t)
    out["pf"] = b["pf"] if t > 0.5 else a["pf"]
    return out


def _ik(sx, sy, tx, ty, l1, l2):
    """Two-bone solve. Of the two elbow solutions, take the lower one so the
    arm always bends the way a human arm does."""
    dx, dy = tx - sx, ty - sy
    raw = math.hypot(dx, dy) or 1.0
    d = min(max(raw, abs(l1 - l2) + 2.0), l1 + l2 - 2.0)
    ux, uy = dx / raw, dy / raw
    a = (l1 * l1 - l2 * l2 + d * d) / (2 * d)
    h = math.sqrt(max(0.0, l1 * l1 - a * a))
    mx, my = sx + ux * a, sy + uy * a
    e1 = (mx - uy * h, my + ux * h)
    e2 = (mx + uy * h, my - ux * h)
    ex, ey = e1 if e1[1] >= e2[1] else e2
    return ex, ey, sx + ux * d, sy + uy * d


def _hand(layer, x, y, spec, prop, facing, s):
    """A hand, plus whatever it is holding."""
    skin = spec["skin"]
    r = 26 * s
    if prop == "phone":
        w, h = 50 * s, 92 * s
        bx = [x - w / 2, y - h * 0.76, x + w / 2, y + h * 0.24]
        blob(layer, [(bx[0], bx[1]), (bx[2], bx[1]), (bx[2], bx[3]), (bx[0], bx[3])],
             (46, 42, 64), r=10 * s, shade=0.7)
        d = ImageDraw.Draw(layer)
        d.rounded_rectangle([bx[0] + 6 * s, bx[1] + 7 * s, bx[2] - 6 * s, bx[3] - 12 * s],
                            radius=7 * s, fill=(132, 208, 250, 255))
        d.rounded_rectangle([bx[0] + 6 * s, bx[1] + 7 * s, bx[2] - 6 * s, bx[1] + 34 * s],
                            radius=7 * s, fill=(190, 236, 255, 255))
    ball(layer, [x - r, y - r * 0.94, x + r, y + r * 0.94], skin, shade=0.9)
    if prop == "point":
        capsule(layer, (x + facing * 10 * s, y - 4 * s), (x + facing * 38 * s, y - 12 * s),
                10 * s, 8 * s, skin, shade=0.8)
    elif prop == "thumb":
        capsule(layer, (x, y - 8 * s), (x + facing * 4 * s, y - 38 * s),
                10.5 * s, 9 * s, skin, shade=0.8)
    elif prop == "count":
        for i in range(3):
            fx = x + (i - 1) * 15 * s
            capsule(layer, (fx, y - 6 * s), (fx + facing * 3 * s, y - 40 * s),
                    8.5 * s, 7.5 * s, skin, shade=0.8)
    elif prop == "pen":
        capsule(layer, (x - facing * 18 * s, y - 30 * s), (x + facing * 16 * s, y + 14 * s),
                6 * s, 4.5 * s, (255, 212, 98), shade=0.7)
    elif prop != "phone":
        capsule(layer, (x - facing * 6 * s, y + 2 * s), (x - facing * 22 * s, y + 8 * s),
                10.5 * s, 8.5 * s, shift(skin, -0.04), shade=0.7)
    ImageDraw.Draw(layer).arc(
        [x - r * 0.78, y - r * 0.45, x + r * 0.78, y + r * 0.95],
        205, 335, fill=tuple(spec["skin_sh"]) + (140,), width=int(max(1, 2.6 * s)))


def _eye(layer, cx, cy, spec, open_f, gaze_x, gaze_y, s, out_dir):
    """One eye: sclera, iris, catchlight, lash line and lashes."""
    ew, eh = 26 * s, 30 * s
    lash = (38, 28, 46)
    if open_f < 0.10:
        pts = bezier((cx - ew, cy - 2 * s), (cx, cy + 9 * s), (cx + ew, cy - 2 * s), 12)
        thick_curve(layer, pts, lash, 4.8 * s)
        return
    h = eh * open_f
    box = [cx - ew, cy - h, cx + ew, cy + h]
    ball(layer, box, (252, 250, 255), shade=0.42)
    ir = 15.5 * s
    ix = cx + gaze_x * ew * 0.32
    iy = cy + gaze_y * h * 0.30
    iy = max(cy - h + ir * 0.70, min(cy + h - ir * 0.70, iy))
    clip = Image.new("L", layer.size, 0)
    ImageDraw.Draw(clip).ellipse(box, fill=255)
    eye = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    ball(eye, [ix - ir, iy - ir, ix + ir, iy + ir], (72, 50, 118), shade=0.0)
    d = ImageDraw.Draw(eye)
    d.ellipse([ix - ir * 0.74, iy - ir * 0.74, ix + ir * 0.74, iy + ir * 0.74],
              fill=(120, 88, 188, 255))
    d.ellipse([ix - ir * 0.44, iy - ir * 0.44, ix + ir * 0.44, iy + ir * 0.44],
              fill=(26, 18, 38, 255))
    d.ellipse([ix - ir * 0.74, iy - ir * 0.88, ix - ir * 0.10, iy - ir * 0.24],
              fill=(255, 255, 255, 240))
    d.ellipse([ix + ir * 0.16, iy + ir * 0.28, ix + ir * 0.56, iy + ir * 0.68],
              fill=(255, 255, 255, 115))
    eye.putalpha(Image.composite(eye.getchannel("A"),
                                 Image.new("L", layer.size, 0), clip))
    layer.alpha_composite(eye)
    top = bezier((cx - ew, cy - h * 0.52), (cx, cy - h * 1.34), (cx + ew, cy - h * 0.52), 14)
    thick_curve(layer, top, lash, 5.0 * s)
    for k in range(2):
        lx = cx + out_dir * ew * (0.70 + 0.22 * k)
        ly = cy - h * (0.46 - 0.16 * k)
        thick_curve(layer, [(lx, ly), (lx + out_dir * 13 * s, ly - 11 * s - k * 3 * s)],
                    lash, 3.6 * s)


def _mouth(layer, cx, cy, spec, open_f, smile, s):
    w = 31 * s * (1 + 0.32 * smile)
    if open_f > 0.07:
        h = 29 * s * open_f * (1 + 0.25 * max(0.0, smile))
        box = [cx - w, cy - h * 0.45, cx + w, cy + h]
        ball(layer, box, (120, 50, 60), shade=0.35)
        clip = Image.new("L", layer.size, 0)
        ImageDraw.Draw(clip).ellipse(box, fill=255)
        inner = Image.new("RGBA", layer.size, (0, 0, 0, 0))
        di = ImageDraw.Draw(inner)
        di.rounded_rectangle([cx - w * 0.84, cy - h * 0.45, cx + w * 0.84, cy - h * 0.02],
                             radius=5 * s, fill=(255, 252, 250, 255))
        di.ellipse([cx - w * 0.50, cy + h * 0.26, cx + w * 0.50, cy + h * 1.15],
                   fill=(216, 106, 120, 255))
        inner.putalpha(Image.composite(inner.getchannel("A"),
                                       Image.new("L", layer.size, 0), clip))
        layer.alpha_composite(inner)
        ImageDraw.Draw(layer).ellipse(
            box, outline=tuple(shift(spec["lip"], -0.32)) + (225,),
            width=int(max(1, 2.8 * s)))
    else:
        bow = smile * 15 * s
        pts = bezier((cx - w, cy - bow * 0.35), (cx, cy + bow + 3 * s),
                     (cx + w, cy - bow * 0.35), 16)
        thick_curve(layer, pts, shift(spec["lip"], -0.26), 4.8 * s)


def _hair_back(layer, spec, hx, hy, s):
    hair, f = spec["hair"], spec["facing"]
    if spec["style"] == "long":
        # Long hair built from soft overlapping masses, never a flat slab.
        capsule(layer, (hx, hy + 0.40 * R * s), (hx, hy + 1.40 * R * s),
                0.96 * R * s, 0.66 * R * s, hair, shade=0.8)
        for sgn in (-1, 1):
            capsule(layer, (hx + sgn * 0.72 * R * s, hy + 0.10 * R * s),
                    (hx + sgn * 0.86 * R * s, hy + 1.50 * R * s),
                    0.34 * R * s, 0.15 * R * s, hair, shade=0.85)
    ball(layer, [hx - 1.10 * R * s, hy - 1.20 * R * s,
                 hx + 1.10 * R * s, hy + 0.94 * R * s], hair, shade=0.8)
    if spec["style"] == "bun":
        bx, by = hx - f * 0.42 * R * s, hy - 1.06 * R * s
        ball(layer, [bx - 0.50 * R * s, by - 0.48 * R * s,
                     bx + 0.50 * R * s, by + 0.48 * R * s], hair, shade=1.0)
        for k in range(5):
            a = math.pi * (0.12 + 0.19 * k)
            px, py = bx + math.cos(a) * 0.40 * R * s, by + math.sin(a) * 0.38 * R * s
            ball(layer, [px - 0.13 * R * s, py - 0.12 * R * s,
                         px + 0.13 * R * s, py + 0.12 * R * s],
                 spec["hair_hi"], shade=0.6)
        thick_curve(layer, [(bx - 0.34 * R * s, by + 0.44 * R * s),
                            (bx + 0.34 * R * s, by + 0.44 * R * s)],
                    spec["accent"], 0.17 * R * s)


def _hair_front(layer, spec, hx, hy, s, fo):
    hair, hi, f = spec["hair"], spec["hair_hi"], spec["facing"]
    if spec["style"] == "bun":
        # A curly fringe that clears the eyes, with bumps for texture.
        blob(layer, [(hx - 1.02 * R * s + fo, hy - 0.94 * R * s),
                     (hx + 1.02 * R * s + fo, hy - 0.98 * R * s),
                     (hx + 0.92 * R * s + fo, hy - 0.46 * R * s),
                     (hx - 0.94 * R * s + fo, hy - 0.42 * R * s)],
             hair, r=0.17 * R * s, shade=0.9)
        for k in range(3):
            px = hx + (-0.52 + 0.52 * k) * R * s + fo
            ball(layer, [px - 0.30 * R * s, hy - 0.72 * R * s,
                         px + 0.30 * R * s, hy - 0.44 * R * s], hi, shade=0.5)
        for sgn in (-1, 1):
            sx = hx + sgn * 1.00 * R * s + fo * 0.35
            capsule(layer, (sx, hy - 0.52 * R * s),
                    (sx + sgn * 0.14 * R * s, hy + 0.66 * R * s),
                    0.20 * R * s, 0.13 * R * s, hair, shade=0.8)
    else:
        part = hx + f * 0.16 * R * s + fo
        for sgn in (-1, 1):
            blob(layer, [(part, hy - 1.00 * R * s),
                         (hx + sgn * 0.98 * R * s + fo, hy - 0.86 * R * s),
                         (hx + sgn * 0.90 * R * s + fo, hy - 0.34 * R * s),
                         (hx + sgn * 0.70 * R * s + fo, hy - 0.60 * R * s)],
                 hair, r=0.15 * R * s, shade=0.9)
        band = bezier((hx - 1.08 * R * s + fo * 0.4, hy - 0.60 * R * s),
                      (hx + fo * 0.4, hy - 1.34 * R * s),
                      (hx + 1.08 * R * s + fo * 0.4, hy - 0.60 * R * s), 20)
        thick_curve(layer, band, spec["accent"], 0.16 * R * s)
        thick_curve(layer, [(p[0], p[1] - 0.045 * R * s) for p in band],
                    shift(spec["accent"], 0.38), 0.05 * R * s)
        lock = hx - f * 1.04 * R * s + fo * 0.25
        capsule(layer, (lock, hy + 0.10 * R * s),
                (lock - f * 0.16 * R * s, hy + 1.46 * R * s),
                0.24 * R * s, 0.15 * R * s, hair, shade=0.85)


def draw(spec, pose, ss=2):
    """Render one character to an RGBA tile at 1x size (TW x TH)."""
    s = ss
    layer = Image.new("RGBA", (TW * s, TH * s), (0, 0, 0, 0))
    f = spec["facing"]
    br, bang, eopen, smile, cheek, gy = expr_vals(
        pose["expr"], pose.get("expr_b"), pose.get("expr_t", 0.0))
    g = gest_vals(pose["gest"], pose.get("gest_b"), pose.get("gest_t", 0.0))
    eopen *= (1.0 - pose["blink"]) * (1.0 - 0.34 * pose.get("squint", 0.0))

    breath = math.sin(pose["breath"] * math.tau)
    lean = pose["lean"] * 16
    sho_y = SHO_Y - g["sh"] * 26 + breath * 1.6
    hip_x = HIP_X + lean * 0.35
    hx = HEAD[0] + lean + pose["head_x"] * 18
    hy = HEAD[1] + pose["bob"] - g["sh"] * 20 + breath * 2.2
    fo = f * pose["face_dir"] * 0.17 * R * s      # feature shift when turned

    # --- body -------------------------------------------------------------
    _hair_back(layer, spec, hx * s, hy * s, s)
    capsule(layer, (hx * s, (hy + 0.80 * R) * s), (hip_x * s, (sho_y + 10) * s),
            31 * s, 36 * s, spec["skin_sh"], shade=0.8)
    blob(layer, [((hip_x - 74) * s, (sho_y + 6) * s), ((hip_x + 74) * s, (sho_y + 6) * s),
                 ((hip_x + 104) * s, (TH + 20) * s), ((hip_x - 104) * s, (TH + 20) * s)],
         spec["top"], r=42 * s, shade=0.95)
    for sgn in (-1, 1):
        cap = hip_x + sgn * 84
        ball(layer, [(cap - 40) * s, (sho_y - 16) * s, (cap + 40) * s, (sho_y + 64) * s],
             spec["sleeve"], shade=0.95)
    coll = bezier(((hip_x - 34) * s, (sho_y + 2) * s), (hip_x * s, (sho_y + 30) * s),
                  ((hip_x + 34) * s, (sho_y + 2) * s), 16)
    thick_curve(layer, coll, spec["top_sh"], 7 * s)

    # --- arms (back arm first so the forward one overlaps) ----------------
    for which, side in (("back", -f), ("fwd", f)):
        tx, ty = g[which]
        sx = hip_x + side * 88
        ex, ey, fx2, fy2 = _ik(sx, sho_y + 12, hip_x + f * tx, ty, L1, L2)
        capsule(layer, (sx * s, (sho_y + 12) * s), (ex * s, ey * s),
                30 * s, 21 * s, spec["sleeve"], shade=0.95)
        capsule(layer, (ex * s, ey * s), (fx2 * s, fy2 * s),
                20 * s, 15.5 * s, spec["skin"], shade=0.95)
        _hand(layer, fx2 * s, fy2 * s, spec,
              g["pf"] if which == "fwd" else g["pb"], f, s)

    # --- head -------------------------------------------------------------
    ball(layer, [(hx - R) * s, (hy - 1.04 * R) * s, (hx + R) * s, (hy + 1.06 * R) * s],
         spec["skin"], shade=1.0)
    for sgn in (-1, 1):
        ex = hx + sgn * 0.97 * R
        ball(layer, [(ex - 0.16 * R) * s + fo * 0.45, (hy + 0.06 * R) * s,
                     (ex + 0.16 * R) * s + fo * 0.45, (hy + 0.42 * R) * s],
             spec["skin"], shade=0.8)
    thick_curve(layer, bezier(((hx - 0.58 * R) * s + fo, (hy + 0.76 * R) * s),
                              (hx * s + fo, (hy + 1.04 * R) * s),
                              ((hx + 0.58 * R) * s + fo, (hy + 0.76 * R) * s), 14),
                shift(spec["skin_sh"], 0.12), 3.0 * s)

    ey_c = hy + 0.16 * R
    for sgn in (-1, 1):
        _eye(layer, (hx + sgn * 0.43 * R) * s + fo, ey_c * s, spec, eopen,
             pose["gaze_x"] + f * pose["face_dir"] * 0.28, gy, s, sgn)
    for sgn in (-1, 1):
        inner = sgn * f > 0
        bx0, bx1 = hx + sgn * 0.74 * R, hx + sgn * 0.12 * R
        y0 = ey_c - 0.57 * R - br * 14
        y1 = ey_c - 0.55 * R - br * 12 + (bang * 16 if inner else bang * 2)
        thick_curve(layer, bezier((bx0 * s + fo, y0 * s),
                                  ((bx0 + bx1) / 2 * s + fo, (min(y0, y1) - 0.17 * R) * s),
                                  (bx1 * s + fo, y1 * s), 14),
                    shift(spec["hair"], 0.34), 6.4 * s)

    nose_y = hy + 0.46 * R
    ball(layer, [(hx - 0.10 * R) * s + fo, (nose_y - 0.09 * R) * s,
                 (hx + 0.12 * R) * s + fo, (nose_y + 0.13 * R) * s],
         shift(spec["skin"], -0.06), shade=0.9)
    for sgn in (-1, 1):
        cxx = hx + sgn * 0.60 * R
        cb = Image.new("RGBA", layer.size, (0, 0, 0, 0))
        ball(cb, [(cxx - 0.26 * R) * s + fo, (nose_y - 0.02 * R) * s,
                  (cxx + 0.26 * R) * s + fo, (nose_y + 0.26 * R) * s],
             (255, 136, 140), shade=0.0)
        cb.putalpha(cb.getchannel("A").point(lambda v: int(v * 0.42 * cheek)))
        layer.alpha_composite(cb)
    _mouth(layer, hx * s + fo, (hy + 0.68 * R) * s, spec, pose["mouth"], smile, s)

    _hair_front(layer, spec, hx * s, hy * s, s, fo)
    return layer.resize((TW, TH), Image.LANCZOS) if s != 1 else layer
