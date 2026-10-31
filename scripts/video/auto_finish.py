"""Unattended finisher: render the 24 shots, then rebuild the film.

Written to be launched by Windows Task Scheduler. It waits out the Hugging
Face quota rather than giving up: a quota refusal is not an error here, just a
reason to sleep and try the same shot again. Every finished clip is cached, so
a run that only gets halfway simply picks up where it left off next time.

Usage:  python auto_finish.py <state_dir> <voices.json> <out.mp4>
"""
import json
import os
import shutil
import subprocess
import sys
import time
import traceback
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

WIDTH, HEIGHT = 768, 448
QUOTA_SLEEP = 30 * 60          # how long to wait out an exhausted quota
MAX_HOURS = 30                 # give up after this long rather than run forever


def log(state, msg):
    line = f"{datetime.now():%Y-%m-%d %H:%M:%S}  {msg}"
    print(line, flush=True)
    with open(Path(state) / "auto_finish.log", "a", encoding="utf-8") as fh:
        fh.write(line + "\n")


def render_all(state, token):
    """Render every missing shot, sleeping through quota refusals."""
    import cloud
    os.environ["HF_TOKEN"] = token

    spec = json.loads((Path(state) / "job" / "shots.json").read_text())
    frames = Path(state) / "job" / "frames"
    clips = Path(state) / "clips"
    pending = Path(state) / "clips_pending"
    clips.mkdir(parents=True, exist_ok=True)
    pending.mkdir(parents=True, exist_ok=True)

    # Shots whose animation broke the characters badly enough to be rejected by
    # hand. They keep their still rather than being generated again unwatched.
    skip_file = Path(state) / "use_still.txt"
    skip = set()
    if skip_file.exists():
        skip = {int(n) for n in skip_file.read_text().split() if n.strip().isdigit()}
    if skip:
        log(state, f"shots pinned to stills: {sorted(skip)}")

    deadline = time.time() + MAX_HOURS * 3600
    todo = [s for s in spec["shots"]
            if s["index"] not in skip
            and not (clips / f"shot_{s['index']:02d}.mp4").exists()
            and not (pending / f"shot_{s['index']:02d}.mp4").exists()]
    log(state, f"{len(todo)} shots to render, {len(spec['shots'])} total")

    while todo and time.time() < deadline:
        shot = todo[0]
        dest = pending / f"shot_{shot['index']:02d}.mp4"
        try:
            cloud.image_to_video(
                frames / shot["image"], shot["prompt"], dest,
                seconds=spec["clip_seconds"], width=WIDTH, height=HEIGHT,
                seed=shot["seed"])
            log(state, f"shot {shot['index']:02d} done  "
                       f"({len(spec['shots']) - len(todo) + 1}/{len(spec['shots'])})")
            todo.pop(0)
        except Exception as exc:
            msg = str(exc)
            if "quota" in msg.lower() or "exceeded" in msg.lower():
                log(state, f"quota exhausted, sleeping {QUOTA_SLEEP // 60} min")
                time.sleep(QUOTA_SLEEP)
            else:
                log(state, f"shot {shot['index']:02d} failed: {msg[:160]}")
                todo.append(todo.pop(0))      # retry it after the others
                time.sleep(60)
    done = len(list(clips.glob("shot_*.mp4")))
    waiting = sorted(int(f.stem.split("_")[1]) for f in pending.glob("shot_*.mp4"))
    log(state, f"render stage finished: {done} approved, {len(waiting)} awaiting review")
    if waiting:
        sheet = contact_sheet(state, waiting)
        log(state, f"review sheet for shots {waiting} -> {sheet}")
    return done, len(spec["shots"])


def contact_sheet(state, indices):
    """One frame from each clip awaiting review, laid out for a quick look."""
    from PIL import Image, ImageDraw
    pending = Path(state) / "clips_pending"
    tiles, tmp = [], Path(state) / ".sheet"
    tmp.mkdir(exist_ok=True)
    for i in indices:
        clip = pending / f"shot_{i:02d}.mp4"
        frame = tmp / f"{i:02d}.png"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "2.5",
                        "-i", str(clip), "-frames:v", "1", str(frame)], check=False)
        if not frame.exists():
            continue
        im = Image.open(frame).convert("RGB").resize((420, 236))
        d = ImageDraw.Draw(im)
        d.rectangle([0, 0, 76, 26], fill=(0, 0, 0))
        d.text((8, 8), f"shot {i:02d}", fill=(255, 220, 0))
        tiles.append(im)
    cols = min(3, max(1, len(tiles)))
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (420 * cols, 236 * rows), (20, 20, 20))
    for n, im in enumerate(tiles):
        sheet.paste(im, ((n % cols) * 420, (n // cols) * 236))
    out = Path(state) / "review_sheet.png"
    sheet.save(out)
    shutil.rmtree(tmp, ignore_errors=True)
    return out


def rebuild(state, voices, out):
    import assemble
    work = Path(state) / "work"
    if work.exists():
        shutil.rmtree(work, ignore_errors=True)
    assemble.main(voices, str(Path(state) / "job" / "frames"),
                  str(Path(state) / "clips"), str(work), out,
                  spec=str(Path(state) / "job" / "shots.json"))
    log(state, f"rebuilt film -> {out}")


def already_finished(state, out):
    """True once every shot is animated and the film is newer than all of them."""
    spec_path = Path(state) / "job" / "shots.json"
    if not spec_path.exists() or not Path(out).exists():
        return False
    spec = json.loads(spec_path.read_text())
    clips = [Path(state) / "clips" / f"shot_{s['index']:02d}.mp4" for s in spec["shots"]]
    if not all(c.exists() for c in clips):
        return False
    newest = max(c.stat().st_mtime for c in clips)
    return Path(out).stat().st_mtime >= newest


def main():
    state, voices, out = sys.argv[1], sys.argv[2], sys.argv[3]
    Path(state).mkdir(parents=True, exist_ok=True)
    token = os.environ.get("HF_TOKEN", "")
    log(state, "=== auto_finish starting ===")
    # A daily trigger keeps this as a safety net, so a finished film must not be
    # rebuilt over and over - and never over edits made after it was rendered.
    if already_finished(state, out):
        log(state, "all shots animated and film is up to date - nothing to do")
        return 0
    if not token:
        log(state, "no HF_TOKEN in environment - cannot render, rebuilding only")
    else:
        try:
            done, total = render_all(state, token)
            log(state, f"{done} of {total} shots animated")
        except Exception:
            log(state, "render stage crashed:\n" + traceback.format_exc()[-1200:])
    try:
        rebuild(state, voices, out)        # stills stand in for any missing clip
        log(state, "=== auto_finish complete ===")
    except Exception:
        log(state, "assembly failed:\n" + traceback.format_exc()[-1200:])
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
