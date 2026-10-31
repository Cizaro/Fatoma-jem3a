"""Side deliverables for re-voicing the film.

The AI voices are a scratch track. Fatima and Zainab record over them, so they
need the exact in/out time of every line, a subtitle file they can retime, and
a music-only stem to lay their voices onto.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import timeline as tl   # noqa: E402

NAMES = {"maya": "FATIMA", "noor": "ZAINAB", "both": "BOTH"}


def ts(seconds, comma=True):
    h, rem = divmod(max(0.0, seconds), 3600)
    m, s = divmod(rem, 60)
    frac = f"{s:06.3f}".replace(".", "," if comma else ".")
    return f"{int(h):02d}:{int(m):02d}:{frac}"


def write_srt(timeline, dest):
    out = []
    for i, cue in enumerate(timeline["subs"], start=1):
        who = NAMES.get(cue["who"], cue["who"])
        out.append(f"{i}\n{ts(cue['start'])} --> {ts(cue['end'])}\n"
                   f"{who}: {cue['text']}\n")
    Path(dest).write_text("\n".join(out), encoding="utf-8")
    return dest


def write_script(timeline, dest):
    """A recording sheet: say this line, starting here, finish by here."""
    rows = ["VOICE-OVER RECORDING SCRIPT",
            "Communication in Business - snack delivery idea",
            "Total running time: 2:00 (120.000s)", "",
            "Record each line so it starts at IN and finishes before OUT.",
            "The gaps between lines are deliberate - leave them silent.", "",
            f"{'#':>3}  {'SPEAKER':8}  {'IN':>8}  {'OUT':>8}  {'LEN':>6}  LINE",
            "-" * 100]
    for item in timeline["lines"]:
        who = NAMES.get(item["who"], item["who"])
        rows.append(f"{item['index']:>3}  {who:8}  {ts(item['start'], False)[3:]:>8}  "
                    f"{ts(item['end'], False)[3:]:>8}  {item['dur']:>5.2f}s  {item['text']}")
    rows += ["", "SCENE MARKERS"]
    for sc in tl.SCENES:
        rows.append(f"  Scene {sc['id']}  {ts(sc['start'], False)[3:]} - "
                    f"{ts(sc['end'], False)[3:]}   {sc['title']}")
    rows += ["", "ON-SCREEN TEXT (do not read aloud)"]
    for o in sorted(timeline["overlays"], key=lambda x: x["start"]):
        label = o.get("label") or o.get("text") or o["kind"]
        rows.append(f"  {ts(o['start'], False)[3:]} - {ts(o['end'], False)[3:]}  "
                    f"{o['kind']:7s} {label}")
    Path(dest).write_text("\n".join(rows), encoding="utf-8")
    return dest


if __name__ == "__main__":
    voices, outdir = sys.argv[1], Path(sys.argv[2])
    outdir.mkdir(parents=True, exist_ok=True)
    t = tl.build(voices)
    print(write_srt(t, outdir / "subtitles.srt"))
    print(write_script(t, outdir / "voiceover_script.txt"))
    print(f"{len(t['subs'])} cues, {len(t['lines'])} lines, "
          f"last word at {max(l['end'] for l in t['lines']):.2f}s")
