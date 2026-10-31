"""Turn measured voice clips into an exact 120-second timeline.

Produces absolute start/end times for every spoken line, the on-screen badges
and cards, and the subtitle cues (split from real word boundaries so the text
tracks the voice instead of drifting).
"""
import json
from pathlib import Path

from script_data import BADGES, CARDS, LINES, MARKS, SCENES, TOTAL

# Breathing room at the head and tail of each scene, in seconds.
LEAD = {1: 1.1, 2: 0.7, 3: 0.8, 4: 0.7, 5: 1.6}
TAIL = {1: 0.7, 2: 0.7, 3: 0.7, 4: 1.0, 5: 2.6}

SUB_MAX_CHARS = 46
SUB_MAX_WORDS = 8


def build(voices_json):
    clips = json.loads(Path(voices_json).read_text())
    by_scene = {s["id"]: [] for s in SCENES}
    for clip in clips:
        by_scene[clip["scene"]].append(clip)

    placed = []
    for scene in SCENES:
        sid = scene["id"]
        group = by_scene[sid]
        span = scene["end"] - scene["start"]
        speech = sum(c["dur"] for c in group)
        lead, tail = LEAD[sid], TAIL[sid]
        slack = span - lead - tail - speech
        gap = slack / (len(group) - 1) if len(group) > 1 else 0.0
        # A negative gap would mean the voices overrun the scene; pull the
        # lead-in back instead of letting lines collide.
        if gap < 0.12:
            lead = max(0.25, lead + gap * (len(group) - 1) * 0.5)
            slack = span - lead - tail - speech
            gap = max(0.12, slack / max(1, len(group) - 1))

        t = scene["start"] + lead
        for clip in group:
            placed.append({**clip, "start": t, "end": t + clip["dur"]})
            t += clip["dur"] + gap

    for item in placed:
        item["line"] = LINES[item["index"]]

    overlays = []
    tagged = ([(b, "badge") for b in BADGES] + [(c, "card") for c in CARDS]
              + [(m, m["kind"]) for m in MARKS])
    for spec, kind in tagged:
        scene = next(s for s in SCENES if s["id"] == spec["scene"])
        span = scene["end"] - scene["start"]
        start = scene["start"] + spec["at"] * span
        overlays.append({**spec, "kind": kind,
                         "start": start, "end": start + spec["hold"] * span})

    return {"lines": placed, "overlays": overlays, "subs": subtitles(placed),
            "total": TOTAL}


def split_text(text):
    """Break a line into short subtitle chunks, preferring clause breaks."""
    words, chunks, cur = text.split(), [], []
    for w in words:
        cur.append(w)
        joined = " ".join(cur)
        clause = w.endswith((".", "!", "?", ",", ";")) and len(cur) >= 3
        if len(joined) >= SUB_MAX_CHARS or len(cur) >= SUB_MAX_WORDS or clause:
            chunks.append(joined)
            cur = []
    if cur:
        # Fold a stray tail into the previous chunk rather than flashing it.
        tail = " ".join(cur)
        if chunks and len(tail) < 14:
            chunks[-1] += " " + tail
        else:
            chunks.append(tail)
    return chunks


def subtitles(placed):
    """Split each line into cues, weighting each by how long it takes to say.

    Word-level boundaries from the voice service proved unreliable, so each
    chunk gets a share of the clip's measured duration proportional to its
    length, plus a little extra for the pause a sentence break creates.
    """
    cues = []
    for item in placed:
        chunks = split_text(item["text"])
        weights = [len(c) + (6 if c.endswith((".", "!", "?")) else 0) for c in chunks]
        span = item["dur"]
        total_w = sum(weights) or 1
        t = item["start"]
        for chunk, weight in zip(chunks, weights):
            d = span * weight / total_w
            cues.append({"start": t, "end": t + d,
                         "text": tidy(chunk), "who": item["who"]})
            t += d

    # Hold each cue until the next one starts so the band never flickers.
    for a, b in zip(cues, cues[1:]):
        if 0 < b["start"] - a["end"] < 0.45:
            a["end"] = b["start"]
    return cues


def tidy(text):
    for p in (" .", " ,", " !", " ?", " '", " n't"):
        text = text.replace(p, p.strip() if p != " '" else "'")
    return text.strip()


if __name__ == "__main__":
    import sys
    tl = build(sys.argv[1])
    for item in tl["lines"]:
        print(f"{item['start']:6.2f} - {item['end']:6.2f}  s{item['scene']} "
              f"{item['who']:5s}  {item['text'][:52]}")
    print(f"\n{len(tl['subs'])} subtitle cues, {len(tl['overlays'])} overlays")
    last = max(i["end"] for i in tl["lines"])
    print(f"last word ends at {last:.2f}s of {tl['total']:.0f}s")
