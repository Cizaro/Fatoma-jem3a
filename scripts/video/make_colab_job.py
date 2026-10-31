"""Package a job for the Colab notebook: keyframes plus a shot list to animate.

Hugging Face's free GPU is metered per request; Colab's free T4 is not, so the
animation stage moves there. Shots are cut to a uniform 5 seconds because that
is the clip length LTX-Video renders comfortably on a T4 (121 frames at 24fps),
and 24 of them tile the 120-second timeline exactly.
"""
import json
import shutil
import sys
import zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import bible            # noqa: E402
import timeline as tl   # noqa: E402

CLIP_SECONDS = 5.0


def build_shots(frames):
    """Tile every scene with 5-second shots, cycling the scene's own prompts."""
    pool = sorted(Path(frames).glob("kf_*.png"))
    if not pool:
        raise SystemExit("no keyframes found")
    jobs, n = [], 0
    for scene in tl.SCENES:
        span = scene["end"] - scene["start"]
        count = int(round(span / CLIP_SECONDS))
        prompts = [s for s in bible.SHOTS if s["scene"] == scene["id"]]
        for k in range(count):
            shot = prompts[k % len(prompts)]
            # Prefer this shot's own keyframe; fall back to the pool we have.
            kf = Path(frames) / f"kf_{shot['id']:02d}.png"
            if not kf.exists():
                kf = pool[n % len(pool)]
            jobs.append({
                "index": n,
                "scene": scene["id"],
                "concept": shot["concept"],
                "image": kf.name,
                "prompt": shot["motion"],
                "seed": 4000 + n * 13,
            })
            n += 1
    return jobs, pool


def main(frames, outdir):
    out = Path(outdir)
    out.mkdir(parents=True, exist_ok=True)
    jobs, pool = build_shots(frames)

    staging = out / "job"
    if staging.exists():
        shutil.rmtree(staging)
    (staging / "frames").mkdir(parents=True)
    used = {j["image"] for j in jobs}
    for p in pool:
        if p.name in used:
            shutil.copy(p, staging / "frames" / p.name)
    (staging / "shots.json").write_text(json.dumps(
        {"clip_seconds": CLIP_SECONDS, "fps": 24, "width": 768, "height": 448,
         "shots": jobs}, indent=1))

    zpath = out / "colab_job.zip"
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for f in staging.rglob("*"):
            if f.is_file():
                z.write(f, f.relative_to(staging))

    print(f"{len(jobs)} shots x {CLIP_SECONDS}s = {len(jobs) * CLIP_SECONDS:.0f}s")
    print(f"{len(used)} keyframes bundled")
    print(f"-> {zpath}")
    for j in jobs[:4]:
        print(f"   {j['index']:02d} scene {j['scene']} {j['image']} :: {j['prompt'][:60]}")
    return zpath


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
