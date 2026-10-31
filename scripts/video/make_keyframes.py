"""Generate one standalone keyframe per shot with FLUX.1-schnell.

Standalone rather than cropped from a storyboard grid: the grid produced white
gutter edges inside the frame and let wardrobe bleed between the two
characters. Each shot gets its own prompt, and every keyframe is cached.
"""
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import bible          # noqa: E402
import cloud          # noqa: E402

W, H = 1024, 576      # 16:9, and exactly what LTX-Video takes as input


def main(outdir, only=None):
    out = Path(outdir)
    out.mkdir(parents=True, exist_ok=True)
    made = []
    for shot in bible.SHOTS:
        if only and shot["id"] not in only:
            continue
        dest = out / f"kf_{shot['id']:02d}.png"
        print(f"  shot {shot['id']:02d} (scene {shot['scene']}, {shot['concept']})")
        cloud.text_to_image(shot["still"], dest, width=W, height=H,
                            steps=4, seed=1000 + shot["id"] * 7)
        made.append(str(dest))
    print(f"\n{len(made)} keyframes in {out}")
    return made


def contact_sheet(outdir, dest, cols=3, tile_w=420):
    """Stitch every keyframe into one sheet so the whole film can be eyeballed."""
    from PIL import Image, ImageDraw
    files = sorted(Path(outdir).glob("kf_*.png"))
    rows = (len(files) + cols - 1) // cols
    th = int(tile_w * H / W)
    sheet = Image.new("RGB", (cols * tile_w, rows * (th + 18)), (22, 20, 34))
    d = ImageDraw.Draw(sheet)
    for i, f in enumerate(files):
        im = Image.open(f).convert("RGB").resize((tile_w, th), Image.LANCZOS)
        x, y = (i % cols) * tile_w, (i // cols) * (th + 18)
        sheet.paste(im, (x, y + 18))
        d.text((x + 6, y + 4), f.stem, fill=(235, 232, 245))
    sheet.save(dest)
    return dest


if __name__ == "__main__":
    args = sys.argv[1:]
    outdir = args[0]
    only = {int(a) for a in args[1:]} or None
    main(outdir, only)
    print(contact_sheet(outdir, os.path.join(outdir, "contact.png")))
