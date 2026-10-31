"""Approve or reject the animated shots waiting in the review queue.

    python review.py <state_dir> list
    python review.py <state_dir> approve 7 8 9
    python review.py <state_dir> reject 10

Approved shots move into clips/ and appear in the film on the next rebuild.
Rejected shots move into clips_rejected/ and are pinned to their still, so the
daily run never generates them again unwatched.
"""
import sys
from pathlib import Path


def load_skip(state):
    f = Path(state) / "use_still.txt"
    if not f.exists():
        return set()
    return {int(n) for n in f.read_text().split() if n.strip().isdigit()}


def save_skip(state, skip):
    (Path(state) / "use_still.txt").write_text(
        "\n".join(str(n) for n in sorted(skip)) + "\n")


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    state = Path(sys.argv[1])
    action = sys.argv[2]
    pending = state / "clips_pending"
    clips = state / "clips"
    rejected = state / "clips_rejected"
    for d in (pending, clips, rejected):
        d.mkdir(parents=True, exist_ok=True)

    waiting = sorted(int(f.stem.split("_")[1]) for f in pending.glob("shot_*.mp4"))
    if action == "list":
        print(f"awaiting review: {waiting}" if waiting else "nothing awaiting review")
        print(f"approved: {len(list(clips.glob('shot_*.mp4')))}  "
              f"pinned to stills: {sorted(load_skip(state))}")
        return 0

    wanted = [int(a) for a in sys.argv[3:]]
    if not wanted:
        print("name at least one shot number")
        return 2

    skip = load_skip(state)
    moved = []
    for i in wanted:
        src = pending / f"shot_{i:02d}.mp4"
        if not src.exists():
            print(f"shot {i:02d}: not in the review queue, skipped")
            continue
        if action == "approve":
            src.replace(clips / src.name)
            skip.discard(i)
        elif action == "reject":
            src.replace(rejected / src.name)
            skip.add(i)
        else:
            print(f"unknown action {action!r}")
            return 2
        moved.append(i)

    save_skip(state, skip)
    print(f"{action}d: {moved}")
    still_waiting = sorted(int(f.stem.split("_")[1])
                           for f in pending.glob("shot_*.mp4"))
    print(f"still awaiting review: {still_waiting}" if still_waiting
          else "review queue is empty")
    return 0


if __name__ == "__main__":
    sys.exit(main())
