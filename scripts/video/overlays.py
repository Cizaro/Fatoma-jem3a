"""Render the on-screen text layer: subtitles, model badges and word cards.

The overlay only changes when a cue starts or ends, so instead of drawing 3600
frames we render one PNG per distinct state (about sixty) and let ffmpeg hold
each for as long as it is on screen.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1920, 1080
FONT_BLACK = "C:/Windows/Fonts/seguibl.ttf"
FONT_SEMI = "C:/Windows/Fonts/seguisb.ttf"

_fonts = {}


def font(path, size):
    key = (path, size)
    if key not in _fonts:
        _fonts[key] = ImageFont.truetype(path, size)
    return _fonts[key]


def hex_rgb(s):
    s = s.lstrip("#")
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines[:2]


def draw_subtitle(img, text, who):
    """Caption band, tinted by whoever is speaking."""
    d = ImageDraw.Draw(img)
    fnt = font(FONT_SEMI, 46)
    lines = wrap(d, text, fnt, W - 480)
    lh = 58
    box_h = lh * len(lines) + 40
    box_w = max(d.textlength(l, font=fnt) for l in lines) + 76
    x0, y1 = (W - box_w) / 2, H - 62
    y0 = y1 - box_h
    d.rounded_rectangle([x0, y0, x0 + box_w, y1], radius=22, fill=(16, 14, 28, 214))
    accent = {"maya": (255, 122, 61), "noor": (150, 136, 255)}.get(who, (120, 220, 200))
    d.rounded_rectangle([x0, y0, x0 + 9, y1], radius=5, fill=accent + (255,))
    for i, line in enumerate(lines):
        tw = d.textlength(line, font=fnt)
        d.text(((W - tw) / 2, y0 + 20 + i * lh), line, font=fnt,
               fill=(255, 255, 255, 255))


def draw_badge(img, label, color, anchor, t):
    """A pill naming the part of the communication model on screen."""
    d = ImageDraw.Draw(img)
    fnt = font(FONT_BLACK, 40)
    pad_x, pad_y = 34, 18
    tw = d.textlength(label, font=fnt)
    bw, bh = tw + pad_x * 2, 40 + pad_y * 2
    # Fatima ("maya") sits on the right of frame, Zainab ("noor") on the left,
    # so each badge points at the student it names.
    cx = {"maya": W * 0.74, "noor": W * 0.26, "middle": W * 0.5}.get(anchor, W * 0.5)
    y = 108
    pop = min(1.0, t / 0.35)
    scale = 0.86 + 0.14 * (1 - (1 - pop) ** 3)
    bw, bh = bw * scale, bh * scale
    x0, y0 = cx - bw / 2, y - bh / 2
    rgb = hex_rgb(color)
    d.rounded_rectangle([x0 + 4, y0 + 7, x0 + bw + 4, y0 + bh + 7],
                        radius=bh / 2, fill=(10, 8, 24, 110))
    d.rounded_rectangle([x0, y0, x0 + bw, y0 + bh], radius=bh / 2, fill=rgb + (242,))
    f2 = font(FONT_BLACK, max(12, int(40 * scale)))
    tw2 = d.textlength(label, font=f2)
    d.text((cx - tw2 / 2, y0 + (bh - 40 * scale) / 2 - 2), label, font=f2,
           fill=(255, 255, 255, 255))


def draw_card(img, text, color, t, hold):
    """The big word cards the brief asks for by name."""
    d = ImageDraw.Draw(img)
    fnt = font(FONT_BLACK, 104)
    tw = d.textlength(text, font=fnt)
    appear = min(1.0, t / 0.45)
    out = min(1.0, max(0.0, (hold - t) / 0.4))
    a = int(255 * appear * out)
    if a <= 2:
        return
    cx, cy = W / 2, H * 0.30
    rgb = hex_rgb(color)
    slide = (1 - appear) * 40
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    dl = ImageDraw.Draw(layer)
    dl.rounded_rectangle([cx - tw / 2 - 52, cy - 86 + slide, cx + tw / 2 + 52, cy + 72 + slide],
                         radius=26, fill=(14, 12, 26, 206))
    dl.text((cx - tw / 2, cy - 72 + slide), text, font=fnt, fill=(255, 255, 255, 255))
    dl.rounded_rectangle([cx - tw / 2, cy + 44 + slide, cx + tw / 2, cy + 56 + slide],
                         radius=6, fill=rgb + (255,))
    layer.putalpha(layer.getchannel("A").point(lambda v: int(v * a / 255)))
    img.alpha_composite(layer)


def draw_qmark(img, color, t, hold):
    """The puzzled question mark that floats over Noor's head in scene 2."""
    import math
    appear = min(1.0, t / 0.35)
    out = min(1.0, max(0.0, (hold - t) / 0.35))
    a = appear * out
    if a <= 0.02:
        return
    cx, cy = W * 0.225, H * 0.235 + math.sin(t * 2.6) * 15
    tilt = math.sin(t * 1.9) * 7
    size = int(168 * (0.72 + 0.28 * appear))
    fnt = font(FONT_BLACK, size)
    glyph = Image.new("RGBA", (size * 2, int(size * 2.2)), (0, 0, 0, 0))
    dg = ImageDraw.Draw(glyph)
    rgb = hex_rgb(color)
    dg.text((size * 0.5, size * 0.1), "?", font=fnt, fill=rgb + (255,),
            stroke_width=max(3, size // 22), stroke_fill=(62, 40, 20, 255))
    glyph = glyph.rotate(tilt, resample=Image.BICUBIC, expand=False)
    glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse(
        [cx - size * 0.75, cy - size * 0.70, cx + size * 0.75, cy + size * 0.80],
        fill=rgb + (70,))
    glow = glow.filter(__import__("PIL.ImageFilter", fromlist=["x"]).GaussianBlur(38))
    glyph.putalpha(glyph.getchannel("A").point(lambda v: int(v * a)))
    glow.putalpha(glow.getchannel("A").point(lambda v: int(v * a)))
    img.alpha_composite(glow)
    img.alpha_composite(glyph, (int(cx - glyph.width / 2), int(cy - glyph.height / 2)))


def draw_static(img, color, t, hold):
    """A jagged burst of interference: the noise in the channel, made visible."""
    import math
    import random
    a = min(1.0, t / 0.25) * min(1.0, max(0.0, (hold - t) / 0.25))
    if a <= 0.02:
        return
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    rgb = hex_rgb(color)
    rnd = random.Random(int(t * 9))
    y0 = H * 0.40
    for k in range(3):
        pts, x = [], W * 0.34
        yy = y0 + k * 46 - 46
        while x < W * 0.66:
            pts.append((x, yy + rnd.uniform(-20, 20) * math.sin(t * 7 + k)))
            x += 34
        if len(pts) > 1:
            d.line(pts, fill=rgb + (int(215 * a),), width=9, joint="curve")
    img.alpha_composite(layer)


def states(timeline):
    """Collapse the cue lists into (start, end, subtitle, badges, cards) spans."""
    marks = {0.0, timeline["total"]}
    for c in timeline["subs"]:
        marks |= {round(c["start"], 3), round(c["end"], 3)}
    for o in timeline["overlays"]:
        marks |= {round(o["start"], 3), round(o["end"], 3)}
    marks = sorted(m for m in marks if 0 <= m <= timeline["total"])

    spans = []
    for a, b in zip(marks, marks[1:]):
        if b - a < 0.04:
            continue
        mid = (a + b) / 2
        sub = next((c for c in timeline["subs"] if c["start"] <= mid < c["end"]), None)
        act = [o for o in timeline["overlays"] if o["start"] <= mid < o["end"]]
        # The bobbing question mark and the interference need to move, so a span
        # holding one is chopped into short steps instead of a single still.
        if any(o["kind"] in ("qmark", "static") for o in act):
            step = 1 / 8.0
            t = a
            while t < b - 1e-6:
                nxt = min(b, t + step)
                spans.append({"start": t, "end": nxt, "sub": sub, "overlays": act})
                t = nxt
        else:
            spans.append({"start": a, "end": b, "sub": sub, "overlays": act})
    return spans


def render(timeline, outdir):
    """Write one PNG per span plus an ffmpeg concat list covering all 120s."""
    outdir = Path(outdir)
    outdir.mkdir(parents=True, exist_ok=True)
    spans = states(timeline)
    lines = []
    for i, sp in enumerate(spans):
        img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        for o in sp["overlays"]:
            t = sp["start"] - o["start"]
            hold = o["end"] - o["start"]
            if o["kind"] == "badge":
                draw_badge(img, o["label"], o["color"], o["anchor"], t)
            elif o["kind"] == "qmark":
                draw_qmark(img, o["color"], t, hold)
            elif o["kind"] == "static":
                draw_static(img, o["color"], t, hold)
            else:
                draw_card(img, o["text"], o["color"], t, hold)
        if sp["sub"]:
            draw_subtitle(img, sp["sub"]["text"], sp["sub"]["who"])
        p = outdir / f"ov_{i:04d}.png"
        img.save(p)
        lines.append(f"file '{p.as_posix()}'\nduration {sp['end'] - sp['start']:.3f}")
    lines.append(f"file '{(outdir / f'ov_{len(spans) - 1:04d}.png').as_posix()}'")
    concat = outdir / "overlay.txt"
    concat.write_text("\n".join(lines))
    return concat, len(spans)
