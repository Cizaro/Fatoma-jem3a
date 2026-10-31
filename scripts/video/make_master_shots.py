"""Build the Colab job from ONE master frame, so the cast never changes.

Generating a keyframe per shot made the two women drift - different faces and
hair in every scene. Here every shot is a crop of a single master image, so the
characters are literally the same pixels throughout; variety comes from the
framing and from what each shot is asked to animate.

Scene props that used to be baked into images (the question mark over Noor's
head, the barrier) are drawn later in the overlay layer instead, where they can
be controlled without disturbing the cast.
"""
import json
import shutil
import sys
import zipfile
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
import bible            # noqa: E402
import timeline as tl   # noqa: E402

CLIP_SECONDS = 5.0
OUT_W, OUT_H = 768, 448          # what LTX-Video renders on a free T4

# Crop windows as fractions of the master frame. Maya sits left, Noor right.
FRAMINGS = {
    "wide":     (0.00, 0.00, 1.00, 1.00),
    "mid":      (0.16, 0.10, 0.86, 0.98),
    "maya_cu":  (0.52, 0.00, 1.00, 0.72),
    "noor_cu":  (0.01, 0.04, 0.65, 0.78),
    "maya_med": (0.34, 0.00, 1.00, 0.88),
    "noor_med": (0.00, 0.02, 0.76, 0.92),
}

# Which framing each shot uses, per scene. Keeps the edit moving without ever
# cutting to a different-looking character.
SCENE_FRAMING = {
    1: ["wide", "maya_cu", "noor_cu", "mid", "maya_med"],
    2: ["noor_cu", "mid", "maya_cu", "noor_med", "wide"],
    3: ["noor_cu", "mid", "maya_cu", "wide", "noor_med"],
    4: ["mid", "wide", "maya_med", "noor_cu", "mid", "wide"],
    5: ["wide", "mid", "wide"],
}

CAMERA = ["slow push-in", "slow pull-back", "gentle drift to the left",
          "gentle drift to the right", "very slow push-in", "static camera"]


def crop(master, key):
    fx0, fy0, fx1, fy1 = FRAMINGS[key]
    w, h = master.size
    box = (int(fx0 * w), int(fy0 * h), int(fx1 * w), int(fy1 * h))
    sub = master.crop(box)
    # Letterbox-free fit: trim to the output ratio, then scale up.
    target = OUT_W / OUT_H
    cw, ch = sub.size
    if cw / ch > target:
        new_w = int(ch * target)
        sub = sub.crop(((cw - new_w) // 2, 0, (cw - new_w) // 2 + new_w, ch))
    else:
        new_h = int(cw / target)
        sub = sub.crop((0, (ch - new_h) // 2, cw, (ch - new_h) // 2 + new_h))
    return sub.resize((OUT_W, OUT_H), Image.LANCZOS)


def main(master_path, outdir):
    out = Path(outdir)
    staging = out / "job"
    if staging.exists():
        shutil.rmtree(staging)
    (staging / "frames").mkdir(parents=True)

    master = Image.open(master_path).convert("RGB")
    # Upsample first so close-ups keep detail when they are scaled back up.
    master = master.resize((master.width * 2, master.height * 2), Image.LANCZOS)

    made, jobs, n = {}, [], 0
    for scene in tl.SCENES:
        span = scene["end"] - scene["start"]
        count = int(round(span / CLIP_SECONDS))
        framings = SCENE_FRAMING[scene["id"]]
        prompts = [s for s in bible.SHOTS if s["scene"] == scene["id"]]
        for k in range(count):
            fr = framings[k % len(framings)]
            if fr not in made:
                p = staging / "frames" / f"fr_{fr}.png"
                crop(master, fr).save(p)
                made[fr] = p.name
            shot = prompts[k % len(prompts)]
            jobs.append({
                "index": n,
                "scene": scene["id"],
                "concept": shot["concept"],
                "framing": fr,
                "image": made[fr],
                "prompt": f"{shot['motion']} {CAMERA[n % len(CAMERA)].capitalize()}.",
                "seed": 7000 + n * 17,
            })
            n += 1

    (staging / "shots.json").write_text(json.dumps(
        {"clip_seconds": CLIP_SECONDS, "fps": 24, "width": OUT_W, "height": OUT_H,
         "shots": jobs}, indent=1))

    zpath = out / "colab_job.zip"
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for f in staging.rglob("*"):
            if f.is_file():
                z.write(f, f.relative_to(staging))

    # A sheet so the framings can be checked before burning any GPU time.
    sheet = Image.new("RGB", (OUT_W * 3, OUT_H * 2), (20, 18, 30))
    for i, name in enumerate(made.values()):
        sheet.paste(Image.open(staging / "frames" / name),
                    ((i % 3) * OUT_W, (i // 3) * OUT_H))
    sheet.save(out / "framings.png")

    print(f"{len(jobs)} shots x {CLIP_SECONDS}s = {len(jobs) * CLIP_SECONDS:.0f}s")
    print(f"{len(made)} framings, all cut from one master: {list(made)}")
    print(f"-> {zpath}")
    return zpath


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
