"""Cut the film: shots -> timed segments -> overlays -> mixed audio -> MP4.

Every shot is either an animated clip or, when GPU quota has not stretched far
enough to animate it yet, its keyframe with a slow push-in. Either way the shot
is retimed to land exactly on its slot, so the five scenes always start on
0:00, 0:25, 0:50, 1:15 and 1:45 and the film is exactly 120 seconds.
"""
import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import bible            # noqa: E402
import music            # noqa: E402
import overlays         # noqa: E402
import timeline as tl   # noqa: E402

W, H, FPS = 1920, 1080, 30
XF = 0.0                # shots self-fade instead of cross-dissolving
FADE = 0.22             # dip at each shot boundary
TOTAL = 120.0


def run(args, **kw):
    r = subprocess.run(args, capture_output=True, text=True, **kw)
    if r.returncode != 0:
        raise RuntimeError(f"ffmpeg failed:\n{' '.join(map(str, args))[:300]}\n"
                           f"{r.stderr[-1500:]}")
    return r


def slots():
    """Duration of each shot's slot, so every scene fills its exact span."""
    out = []
    for scene in tl.SCENES:
        group = [s for s in bible.SHOTS if s["scene"] == scene["id"]]
        span = scene["end"] - scene["start"]
        for s in group:
            out.append({"id": s["id"], "dur": span / len(group), "kf": None})
    return out


def plan_from_spec(spec_path):
    """The Colab plan: uniform 5-second shots that tile the timeline exactly."""
    spec = json.loads(Path(spec_path).read_text())
    return [{"id": s["index"], "dur": spec["clip_seconds"], "kf": s["image"]}
            for s in spec["shots"]]


def pick_asset(entry, clips, frames):
    """Prefer a real animated clip; fall back to a still, reusing one if needed."""
    clip = Path(clips) / f"shot_{entry['id']:02d}.mp4"
    if clip.exists():
        return ("clip", clip)
    if entry.get("kf"):
        named = Path(frames) / entry["kf"]
        if named.exists():
            return ("still", named)
    kf = Path(frames) / f"kf_{entry['id']:02d}.png"
    if kf.exists():
        return ("still", kf)
    pool = sorted(Path(frames).glob("kf_*.png"))
    if not pool:
        raise SystemExit("no keyframes at all - run make_keyframes.py first")
    return ("reused", pool[entry["id"] % len(pool)])


def build_segment(kind, src, dur, idx, workdir):
    """One shot, rendered to exactly `dur` seconds at 1920x1080/30fps."""
    dst = Path(workdir) / f"seg_{idx:02d}.mp4"
    if kind == "clip":
        probe = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                     "-of", "csv=p=0", str(src)])
        src_dur = float(probe.stdout.strip())
        # Retime rather than cut, so no motion or gesture is lost mid-shot.
        ratio = dur / src_dur
        vf = (f"setpts={ratio:.6f}*PTS,scale={W}:{H}:flags=lanczos,fps={FPS},"
              f"fade=t=in:st=0:d={FADE},"
              f"fade=t=out:st={max(0.0, dur - FADE):.3f}:d={FADE},format=yuv420p")
        run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), "-an",
             "-vf", vf, "-t", f"{dur:.3f}", "-c:v", "libx264", "-crf", "21",
             "-preset", "veryfast", str(dst)])
    else:
        frames = int(dur * FPS) + 2
        # Alternate the push direction so reused stills do not feel repetitive.
        zexpr = "1.0+0.0009*on" if idx % 2 == 0 else "1.14-0.0009*on"
        xy = ("x='iw/2-(iw/zoom/2)'", "y='ih/2-(ih/zoom/2)'")
        vf = (f"scale={W * 2}:{H * 2}:flags=lanczos,"
              f"zoompan=z='{zexpr}':{xy[0]}:{xy[1]}:d={frames}:s={W}x{H}:fps={FPS},"
              f"fade=t=in:st=0:d={FADE},"
              f"fade=t=out:st={max(0.0, dur - FADE):.3f}:d={FADE},format=yuv420p")
        run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-i", str(src),
             "-vf", vf, "-t", f"{dur:.3f}", "-c:v", "libx264", "-crf", "21",
             "-preset", "veryfast", str(dst)])
    return dst


def join_segments(segs, dst):
    """Join the shots with the concat demuxer - one pass, no intermediates."""
    dst = Path(dst)
    listing = dst.parent / "segs.txt"
    listing.write_text("\n".join(f"file '{Path(s).as_posix()}'" for s in segs))
    run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
         "-i", str(listing), "-c", "copy", "-t", f"{TOTAL:.3f}", str(dst)])
    return dst


def build_audio(timeline, workdir, dst):
    """Voices at their exact cues, over music that ducks under speech."""
    workdir = Path(workdir)
    music_wav = workdir / "music.wav"
    if not music_wav.exists():
        music.write_wav(music_wav, music.build(TOTAL))

    lines = timeline["lines"]
    args = ["ffmpeg", "-y", "-loglevel", "error"]
    for item in lines:
        args += ["-i", item["file"]]
    args += ["-i", str(music_wav)]
    m = len(lines)

    parts, labels = [], []
    for i, item in enumerate(lines):
        delay = int(item["start"] * 1000)
        parts.append(f"[{i}:a]adelay={delay}|{delay},volume=1.6[v{i}]")
        labels.append(f"[v{i}]")
    parts.append("".join(labels) + f"amix=inputs={m}:normalize=0:"
                 f"dropout_transition=0,alimiter=limit=0.95[speech]")
    parts.append("[speech]asplit=2[sp_out][sp_key]")
    parts.append(f"[{m}:a]volume=0.30[bed]")
    parts.append("[bed][sp_key]sidechaincompress=threshold=0.05:ratio=7:"
                 "attack=12:release=420[duck]")
    parts.append("[sp_out][duck]amix=inputs=2:normalize=0,"
                 "alimiter=limit=0.96,aformat=sample_fmts=s16:channel_layouts=stereo[out]")
    args += ["-filter_complex", ";".join(parts), "-map", "[out]",
             "-t", f"{TOTAL:.3f}", "-c:a", "pcm_s16le", str(dst)]
    run(args)
    return dst


def main(voices_json, frames, clips, workdir, out, spec=None):
    workdir = Path(workdir)
    workdir.mkdir(parents=True, exist_ok=True)
    timeline = tl.build(voices_json)

    plan = plan_from_spec(spec) if spec else slots()
    segs, durs, report = [], [], []
    for i, entry in enumerate(plan):
        kind, src = pick_asset(entry, clips, frames)
        dur = entry["dur"] + XF
        print(f"  shot {entry['id']:02d}  {kind:7s}  {entry['dur']:.2f}s  {Path(src).name}")
        segs.append(build_segment(kind, src, dur, i, workdir))
        durs.append(dur)
        report.append({"shot": entry["id"], "kind": kind, "src": Path(src).name})

    print("  dissolving shots...")
    base = join_segments(segs, workdir / "base.mp4")

    print("  rendering overlays...")
    concat, n = overlays.render(timeline, workdir / "ov")

    print("  mixing audio...")
    audio = build_audio(timeline, workdir, workdir / "audio.wav")

    print("  muxing final film...")
    Path(out).parent.mkdir(parents=True, exist_ok=True)
    # Overlay the PNG states straight from the concat list. Re-encoding them to
    # VP9 first silently dropped the alpha channel and painted the film black,
    # and forcing a rate on the input made every state last one frame -- so the
    # rate is applied after concat instead, where the durations still hold.
    run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(base),
         "-f", "concat", "-safe", "0", "-i", str(concat),
         "-i", str(audio),
         "-filter_complex",
         f"[1:v]fps={FPS},format=rgba,scale={W}:{H}[ov];"
         f"[0:v][ov]overlay=0:0:format=auto:shortest=0[v]",
         "-map", "[v]", "-map", "2:a",
         "-c:v", "libx264", "-crf", "19", "-preset", "medium", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart",
         "-t", f"{TOTAL:.3f}", str(out)])

    (workdir / "shot_report.json").write_text(json.dumps(report, indent=1))
    print(f"\nwrote {out}  ({n} overlay states)")
    return out


if __name__ == "__main__":
    main(*sys.argv[1:6], spec=sys.argv[6] if len(sys.argv) > 6 else None)
