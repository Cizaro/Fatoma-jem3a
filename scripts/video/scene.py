"""The university cafeteria: background plate, foreground table and props.

The background is expensive to draw but never changes, so it is built once per
scene tint and cached. Only the characters and overlays are redrawn each frame.
"""
import math
import random

from PIL import Image, ImageDraw, ImageFilter

from draw3d import ball, bezier, blob, capsule, mix, shift, thick_curve, vgrad

WW, WH = 2112, 1188        # world canvas, slightly larger than frame for camera moves
TABLE_Y = 962              # where the foreground table edge sits
CHAR_Y = 280               # top of each character tile in world space
MAYA_X, NOOR_X = 240, 1252

_BG_CACHE = {}

WALL_TOP = (104, 158, 192)
WALL_BOT = (206, 230, 232)
FLOOR = (178, 142, 108)
TABLE = (236, 198, 148)
TABLE_EDGE = (190, 142, 96)


def _window(dst, box, blur=True):
    """A big cafeteria window with campus greenery behind it."""
    x0, y0, x1, y1 = box
    w, h = int(x1 - x0), int(y1 - y0)
    pane = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    pane.paste(vgrad((w, h), (168, 214, 248), (226, 242, 250)).convert("RGBA"), (0, 0))
    d = ImageDraw.Draw(pane)
    rnd = random.Random(7)
    for i in range(5):                                   # campus buildings
        bw = rnd.randint(int(w * 0.10), int(w * 0.20))
        bx = int(w * 0.04 + i * w * 0.19)
        bh = rnd.randint(int(h * 0.26), int(h * 0.46))
        d.rounded_rectangle([bx, h - bh - h * 0.18, bx + bw, h - h * 0.16],
                            radius=8, fill=(154, 176, 206, 255))
        for r in range(3):
            for c in range(2):
                wx = bx + 10 + c * (bw - 28) / 1.0
                wy = h - bh - h * 0.18 + 14 + r * 22
                if wy < h - h * 0.20:
                    d.rounded_rectangle([wx, wy, wx + 12, wy + 14], radius=3,
                                        fill=(206, 224, 242, 255))
    for i in range(6):                                   # trees and lawn
        tx = int(w * 0.06 + i * w * 0.17)
        ty = h - h * 0.14
        d.ellipse([tx - 34, ty - 70, tx + 34, ty - 6], fill=(96, 174, 118, 255))
        d.ellipse([tx - 22, ty - 96, tx + 26, ty - 44], fill=(124, 196, 134, 255))
        d.rectangle([tx - 6, ty - 20, tx + 6, ty + 10], fill=(132, 98, 72, 255))
    d.rectangle([0, h - h * 0.14, w, h], fill=(118, 182, 126, 255))
    if blur:
        pane = pane.filter(ImageFilter.GaussianBlur(5.5))
    dst.alpha_composite(pane, (int(x0), int(y0)))

    fr = ImageDraw.Draw(dst)
    fr.rounded_rectangle(box, radius=26, outline=(248, 250, 252, 255), width=16)
    for k in (1, 2):                                     # mullions
        mx = x0 + (x1 - x0) * k / 3
        fr.rectangle([mx - 7, y0 + 8, mx + 7, y1 - 8], fill=(248, 250, 252, 255))
    glare = Image.new("RGBA", dst.size, (0, 0, 0, 0))
    ImageDraw.Draw(glare).polygon(
        [(x0 + 40, y1 - 20), (x0 + 190, y0 + 20), (x0 + 290, y0 + 20),
         (x0 + 140, y1 - 20)], fill=(255, 255, 255, 46))
    dst.alpha_composite(glare.filter(ImageFilter.GaussianBlur(9)))


def _lamp(dst, x, y, color):
    d = ImageDraw.Draw(dst)
    d.line([x, 0, x, y - 30], fill=(60, 56, 78, 255), width=6)
    blob(dst, [(x - 56, y - 30), (x + 56, y - 30), (x + 40, y + 34), (x - 40, y + 34)],
         color, r=16, shade=0.9)
    glow = Image.new("RGBA", dst.size, (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([x - 120, y + 10, x + 120, y + 190],
                                 fill=(255, 232, 170, 70))
    dst.alpha_composite(glow.filter(ImageFilter.GaussianBlur(44)))
    d.ellipse([x - 26, y + 18, x + 26, y + 46], fill=(255, 244, 206, 255))


def _patron(dst, x, y, s, top, hair):
    """A soft blurred cartoon silhouette - populates the room without stealing focus."""
    ball(dst, [x - 56 * s, y + 46 * s, x + 56 * s, y + 210 * s], top, shade=0.5)
    ball(dst, [x - 40 * s, y - 42 * s, x + 40 * s, y + 56 * s], hair, shade=0.5)


def _menu_board(dst, x, y):
    blob(dst, [(x - 210, y - 130), (x + 210, y - 130), (x + 210, y + 130),
               (x - 210, y + 130)], (46, 92, 96), r=18, shade=0.85)
    d = ImageDraw.Draw(dst)
    for i in range(4):
        d.rounded_rectangle([x - 170, y - 96 + i * 54, x - 170 + (150 - i * 18),
                             y - 72 + i * 54], radius=10, fill=(214, 238, 232, 190))
    for i, col in enumerate([(255, 196, 86), (255, 128, 102), (124, 212, 160)]):
        cx = x + 108
        d.ellipse([cx - 30, y - 94 + i * 62, cx + 30, y - 40 + i * 62], fill=col + (235,))


def _counter(dst, x, y):
    blob(dst, [(x - 300, y), (x + 300, y), (x + 300, y + 220), (x - 300, y + 220)],
         (222, 158, 110), r=16, shade=0.9)
    blob(dst, [(x - 312, y - 26), (x + 312, y - 26), (x + 312, y + 16), (x - 312, y + 16)],
         (246, 236, 220), r=14, shade=0.8)
    d = ImageDraw.Draw(dst)
    for i, col in enumerate([(255, 128, 102), (255, 206, 96), (124, 206, 236)]):
        bx = x - 190 + i * 150
        d.rounded_rectangle([bx - 46, y - 92, bx + 46, y - 26], radius=12, fill=col + (255,))
        d.rounded_rectangle([bx - 46, y - 92, bx + 46, y - 70], radius=10,
                            fill=shift(col, 0.3) + (255,))


def _plant(dst, x, y, s=1.0):
    blob(dst, [(x - 52 * s, y), (x + 52 * s, y), (x + 40 * s, y + 96 * s),
               (x - 40 * s, y + 96 * s)], (206, 118, 88), r=12 * s, shade=0.9)
    for i in range(7):
        a = -math.pi / 2 + (i - 3) * 0.33
        lx, ly = x + math.cos(a) * 86 * s, y - 36 * s + math.sin(a) * 70 * s
        capsule(dst, (x, y - 10 * s), (lx, ly), 15 * s, 7 * s,
                (74 + i * 6, 162, 110), shade=0.8)


def background(tint=None, bright=1.0, seed=3):
    """Build (and cache) the full cafeteria plate behind the characters."""
    key = (tint, round(bright, 3), seed)
    if key in _BG_CACHE:
        return _BG_CACHE[key]

    img = Image.new("RGBA", (WW, WH), (0, 0, 0, 255))
    img.paste(vgrad((WW, WH), WALL_TOP, WALL_BOT).convert("RGBA"), (0, 0))
    far = Image.new("RGBA", (WW, WH), (0, 0, 0, 0))

    # Floor with a simple perspective sweep.
    d = ImageDraw.Draw(far)
    d.polygon([(0, 700), (WW, 700), (WW, WH), (0, WH)], fill=FLOOR + (255,))
    for i in range(9):
        fx = i * WW / 8
        d.line([WW / 2 + (fx - WW / 2) * 0.55, 700, fx, WH],
               fill=shift(FLOOR, -0.10) + (160,), width=5)
    d.rectangle([0, 686, WW, 714], fill=shift(FLOOR, -0.22) + (255,))

    _window(far, (118, 150, 880, 610))
    _menu_board(far, 1560, 330)
    _counter(far, 1620, 640)
    _plant(far, 905, 688, 0.84)
    rnd = random.Random(seed)
    for i, (px, col, hc) in enumerate([
            (300, (236, 126, 140), (72, 48, 56)), (560, (118, 190, 214), (44, 40, 60)),
            (1300, (142, 206, 160), (40, 36, 54))]):
        _patron(far, px, 540 + rnd.randint(-14, 14), 0.86, col, hc)

    far = far.filter(ImageFilter.GaussianBlur(4.2))
    img.alpha_composite(far)

    for i, x in enumerate((420, 1056, 1690)):
        _lamp(img, x, 110 + (i % 2) * 26, [(255, 138, 110), (124, 198, 232),
                                           (255, 206, 96)][i])

    # Warm bokeh for depth.
    bok = Image.new("RGBA", (WW, WH), (0, 0, 0, 0))
    db = ImageDraw.Draw(bok)
    for _ in range(26):
        bx, by = rnd.randint(0, WW), rnd.randint(60, 760)
        r = rnd.randint(16, 52)
        db.ellipse([bx - r, by - r, bx + r, by + r], fill=(255, 238, 198, 36))
    img.alpha_composite(bok.filter(ImageFilter.GaussianBlur(14)))

    if tint:
        ov = Image.new("RGBA", (WW, WH), tuple(tint))
        img = Image.alpha_composite(img, ov)
    if bright != 1.0:
        img = Image.eval(img.convert("RGB"), lambda v: min(255, int(v * bright))).convert("RGBA")

    _BG_CACHE[key] = img
    return img


def _cup(dst, x, y, body, s=1.0):
    ball(dst, [x - 46 * s, y - 16 * s, x + 46 * s, y + 20 * s], shift(body, -0.3), shade=0.5)
    blob(dst, [(x - 42 * s, y - 70 * s), (x + 42 * s, y - 70 * s),
               (x + 34 * s, y + 10 * s), (x - 34 * s, y + 10 * s)],
         body, r=14 * s, shade=0.95)
    ball(dst, [x - 42 * s, y - 86 * s, x + 42 * s, y - 56 * s], shift(body, 0.42), shade=0.6)
    ImageDraw.Draw(dst).arc([x + 26 * s, y - 56 * s, x + 74 * s, y - 10 * s],
                            300, 110, fill=shift(body, -0.1) + (255,), width=int(11 * s))


def _notebook(dst, x, y, s=1.0, text_lines=0):
    blob(dst, [(x - 150 * s, y - 92 * s), (x + 150 * s, y - 104 * s),
               (x + 158 * s, y + 70 * s), (x - 142 * s, y + 80 * s)],
         (252, 250, 244), r=10 * s, shade=0.55)
    blob(dst, [(x - 150 * s, y - 92 * s), (x - 128 * s, y - 94 * s),
               (x - 120 * s, y + 78 * s), (x - 142 * s, y + 80 * s)],
         (124, 108, 245), r=6 * s, shade=0.7)
    d = ImageDraw.Draw(dst)
    for i in range(min(5, text_lines)):
        wmul = (0.86, 0.68, 0.92, 0.54, 0.76)[i]
        d.rounded_rectangle([x - 100 * s, y - 64 * s + i * 30 * s,
                             x - 100 * s + 220 * s * wmul, y - 52 * s + i * 30 * s],
                            radius=6 * s, fill=(132, 140, 168, 220))


def _basket(dst, x, y, s=1.0):
    blob(dst, [(x - 96 * s, y - 40 * s), (x + 96 * s, y - 40 * s),
               (x + 78 * s, y + 44 * s), (x - 78 * s, y + 44 * s)],
         (226, 160, 92), r=14 * s, shade=0.9)
    for i, col in enumerate([(255, 196, 86), (124, 206, 160), (255, 128, 102),
                             (246, 232, 180)]):
        bx = x - 62 * s + i * 42 * s
        ball(dst, [bx - 28 * s, y - 86 * s, bx + 28 * s, y - 30 * s], col, shade=0.85)


def table(frame, notebook_lines=0, phone_on_table=False):
    """Foreground table, drawn over the characters so they sit behind it."""
    d = ImageDraw.Draw(frame)
    shadow = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).ellipse([-200, TABLE_Y - 70, WW + 200, TABLE_Y + 80],
                                   fill=(30, 20, 50, 110))
    frame.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(28)))

    d.polygon([(-160, TABLE_Y), (WW + 160, TABLE_Y), (WW + 300, WH), (-300, WH)],
              fill=TABLE + (255,))
    d.polygon([(-160, TABLE_Y), (WW + 160, TABLE_Y), (WW + 170, TABLE_Y + 26),
               (-170, TABLE_Y + 26)], fill=shift(TABLE, 0.16) + (255,))
    d.line([(-160, TABLE_Y), (WW + 160, TABLE_Y)], fill=TABLE_EDGE + (255,), width=7)
    sheen = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    ImageDraw.Draw(sheen).polygon(
        [(240, WH), (700, TABLE_Y + 20), (900, TABLE_Y + 20), (440, WH)],
        fill=(255, 255, 255, 38))
    frame.alpha_composite(sheen.filter(ImageFilter.GaussianBlur(20)))

    _cup(frame, 455, TABLE_Y + 128, (255, 138, 110), 0.82)
    _cup(frame, 1672, TABLE_Y + 136, (124, 198, 232), 0.82)
    _notebook(frame, 1056, TABLE_Y + 148, 0.86, notebook_lines)
    _basket(frame, 212, TABLE_Y + 150, 0.78)
    if phone_on_table:
        d.rounded_rectangle([1472, TABLE_Y + 92, 1544, TABLE_Y + 176],
                            radius=14, fill=(48, 44, 66, 255))
        d.rounded_rectangle([1480, TABLE_Y + 100, 1536, TABLE_Y + 164],
                            radius=10, fill=(136, 210, 250, 255))
