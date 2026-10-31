"""Shaded drawing primitives that give flat shapes a rounded, 3D-cartoon read.

The trick is a single pre-baked radial shading overlay: a highlight in the
upper-left and a shadow in the lower-right. It is built once, then scaled and
masked onto each body part, so no per-frame blurring is ever needed.
"""
import math

from PIL import Image, ImageDraw, ImageFilter

_SHADE_CACHE = {}
_TEX = 192  # resolution of the baked shading texture


def _bake_shade():
    """Build the reusable highlight/shadow overlay for a unit sphere."""
    hi = Image.new("L", (_TEX, _TEX), 0)
    lo = Image.new("L", (_TEX, _TEX), 0)
    dh, dl = ImageDraw.Draw(hi), ImageDraw.Draw(lo)
    c = _TEX / 2.0

    # Highlight: concentric discs toward the upper-left.
    for i in range(26):
        f = i / 25.0
        r = c * (0.80 - 0.60 * f)
        cx, cy = c - c * 0.30, c - c * 0.34
        dh.ellipse([cx - r, cy - r * 0.92, cx + r, cy + r * 0.92], fill=int(12 + 150 * f))

    # Shadow: a crescent hugging the lower-right rim.
    for i in range(26):
        f = i / 25.0
        r = c * (1.02 - 0.42 * f)
        cx, cy = c + c * 0.20, c + c * 0.26
        dl.ellipse([cx - r, cy - r, cx + r, cy + r], fill=int(10 + 128 * f))
    inner = Image.new("L", (_TEX, _TEX), 0)
    ImageDraw.Draw(inner).ellipse(
        [c - c * 0.72, c - c * 0.78, c + c * 0.52, c + c * 0.46], fill=255)
    lo.paste(0, mask=inner.filter(ImageFilter.GaussianBlur(_TEX * 0.10)))

    disc = Image.new("L", (_TEX, _TEX), 0)
    ImageDraw.Draw(disc).ellipse([1, 1, _TEX - 2, _TEX - 2], fill=255)
    hi = hi.filter(ImageFilter.GaussianBlur(_TEX * 0.055))
    lo = lo.filter(ImageFilter.GaussianBlur(_TEX * 0.065))

    out = Image.new("RGBA", (_TEX, _TEX), (0, 0, 0, 0))
    white = Image.new("RGBA", (_TEX, _TEX), (255, 255, 255, 255))
    dark = Image.new("RGBA", (_TEX, _TEX), (26, 18, 46, 255))
    out.paste(dark, mask=Image.composite(lo, Image.new("L", (_TEX, _TEX), 0), disc))
    out = Image.alpha_composite(
        out, _tint(white, Image.composite(hi, Image.new("L", (_TEX, _TEX), 0), disc)))
    return out


def _tint(rgba, alpha_mask):
    img = rgba.copy()
    img.putalpha(alpha_mask)
    return img


def shade_tex():
    if "t" not in _SHADE_CACHE:
        _SHADE_CACHE["t"] = _bake_shade()
    return _SHADE_CACHE["t"]


def shade_onto(layer, mask, box, strength=1.0):
    """Lay the baked shading over whatever ``mask`` covers inside ``box``."""
    x0, y0, x1, y1 = (int(round(v)) for v in box)
    w, h = max(1, x1 - x0), max(1, y1 - y0)
    tex = shade_tex().resize((w, h), Image.BILINEAR)
    if strength < 0.999:
        a = tex.getchannel("A").point(lambda v: int(v * strength))
        tex = tex.copy()
        tex.putalpha(a)
    sub = mask.crop((x0, y0, x0 + w, y0 + h))
    tex.putalpha(Image.composite(tex.getchannel("A"),
                                 Image.new("L", (w, h), 0), sub))
    layer.alpha_composite(tex, (x0, y0))


def ball(layer, box, color, shade=1.0, outline=None, ow=0):
    """A shaded ellipse - the workhorse for heads, cheeks, hands and props."""
    mask = Image.new("L", layer.size, 0)
    ImageDraw.Draw(mask).ellipse(box, fill=255)
    solid = Image.new("RGBA", layer.size, tuple(color) + (255,))
    solid.putalpha(mask)
    layer.alpha_composite(solid)
    if shade > 0:
        shade_onto(layer, mask, box, shade)
    if outline and ow:
        ImageDraw.Draw(layer).ellipse(box, outline=tuple(outline) + (255,), width=ow)
    return mask


def _round_poly_mask(size, pts, r):
    """Mask for a polygon with rounded corners, approximated by discs."""
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    if len(pts) >= 3:
        d.polygon(pts, fill=255)
    if r > 0:
        for x, y in pts:
            d.ellipse([x - r, y - r, x + r, y + r], fill=255)
        for (x0, y0), (x1, y1) in zip(pts, pts[1:] + pts[:1]):
            d.line([x0, y0, x1, y1], fill=255, width=int(r * 2))
    return mask


def blob(layer, pts, color, r=0, shade=1.0):
    """A rounded polygon with the same shading treatment as ``ball``."""
    mask = _round_poly_mask(layer.size, pts, r)
    solid = Image.new("RGBA", layer.size, tuple(color) + (255,))
    solid.putalpha(mask)
    layer.alpha_composite(solid)
    if shade > 0:
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        shade_onto(layer, mask,
                   (min(xs) - r, min(ys) - r, max(xs) + r, max(ys) + r), shade)
    return mask


def capsule(layer, p0, p1, r0, r1, color, shade=1.0):
    """A tapered limb segment: two discs joined by a quad."""
    (x0, y0), (x1, y1) = p0, p1
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy) or 1.0
    nx, ny = -dy / L, dx / L
    quad = [(x0 + nx * r0, y0 + ny * r0), (x1 + nx * r1, y1 + ny * r1),
            (x1 - nx * r1, y1 - ny * r1), (x0 - nx * r0, y0 - ny * r0)]
    mask = Image.new("L", layer.size, 0)
    d = ImageDraw.Draw(mask)
    d.polygon(quad, fill=255)
    d.ellipse([x0 - r0, y0 - r0, x0 + r0, y0 + r0], fill=255)
    d.ellipse([x1 - r1, y1 - r1, x1 + r1, y1 + r1], fill=255)
    solid = Image.new("RGBA", layer.size, tuple(color) + (255,))
    solid.putalpha(mask)
    layer.alpha_composite(solid)
    if shade > 0:
        rr = max(r0, r1)
        shade_onto(layer, mask, (min(x0, x1) - rr, min(y0, y1) - rr,
                                 max(x0, x1) + rr, max(y0, y1) + rr), shade * 0.85)
    return mask


def soft_shadow(layer, box, alpha=90, blur=None):
    """An elliptical contact shadow that grounds a character or prop."""
    x0, y0, x1, y1 = box
    w, h = int(x1 - x0), int(y1 - y0)
    if w < 2 or h < 2:
        return
    pad = int(max(w, h) * 0.3) + 4
    tile = Image.new("L", (w + pad * 2, h + pad * 2), 0)
    ImageDraw.Draw(tile).ellipse([pad, pad, pad + w, pad + h], fill=alpha)
    tile = tile.filter(ImageFilter.GaussianBlur(blur or max(4, h * 0.45)))
    dark = Image.new("RGBA", tile.size, (20, 12, 40, 255))
    dark.putalpha(tile)
    layer.alpha_composite(dark, (int(x0) - pad, int(y0) - pad))


def bezier(p0, p1, p2, steps=18):
    """Quadratic bezier sample points - used for mouths, brows and arrows."""
    out = []
    for i in range(steps + 1):
        t = i / steps
        u = 1 - t
        out.append((u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
                    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]))
    return out


def thick_curve(layer, pts, color, width, cap=True):
    d = ImageDraw.Draw(layer)
    d.line(pts, fill=tuple(color) + (255,), width=int(max(1, width)), joint="curve")
    if cap:
        r = width / 2.0
        for x, y in (pts[0], pts[-1]):
            d.ellipse([x - r, y - r, x + r, y + r], fill=tuple(color) + (255,))


def vgrad(size, top, bottom):
    """A vertical gradient image, built one scanline at a time."""
    w, h = size
    strip = Image.new("RGB", (1, h))
    px = strip.load()
    for y in range(h):
        f = y / max(1, h - 1)
        px[0, y] = tuple(int(top[i] + (bottom[i] - top[i]) * f) for i in range(3))
    return strip.resize((w, h), Image.BILINEAR)


def lerp(a, b, t):
    return a + (b - a) * t


def smooth(t):
    """Smoothstep, clamped - the default easing for every animated value."""
    t = min(1.0, max(0.0, t))
    return t * t * (3 - 2 * t)


def ease_out_back(t, k=1.7):
    t = min(1.0, max(0.0, t))
    return 1 + (k + 1) * (t - 1) ** 3 + k * (t - 1) ** 2


def mix(c0, c1, t):
    return tuple(int(lerp(c0[i], c1[i], t)) for i in range(3))


def shift(color, amt):
    """Lighten (amt > 0) or darken (amt < 0) a colour."""
    if amt >= 0:
        return tuple(min(255, int(c + (255 - c) * amt)) for c in color)
    return tuple(max(0, int(c * (1 + amt))) for c in color)
