"""Render every dialogue line to a 48 kHz mono WAV with word-level timings.

Uses Microsoft Edge's neural voices (``edge-tts``), which need network access.
Output goes to ``<outdir>/line_NN.wav`` plus a ``voices.json`` manifest holding
each clip's real duration and word boundaries -- the timeline and the subtitles
are both built from those measurements rather than from guesses.
"""
import asyncio
import json
import subprocess
import sys
from pathlib import Path

import edge_tts

sys.path.insert(0, str(Path(__file__).parent))
from script_data import LINES, VOICES  # noqa: E402

RATE = {"maya": "+6%", "noor": "+4%"}
PITCH = {"maya": "+0Hz", "noor": "+0Hz"}


async def synth(text, voice, rate, pitch, mp3_path):
    """Stream one line to MP3, returning its word boundaries in seconds."""
    comm = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
    words = []
    with open(mp3_path, "wb") as fh:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                fh.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "t": chunk["offset"] / 1e7,
                    "d": chunk["duration"] / 1e7,
                    "w": chunk["text"],
                })
    return words


def to_wav(mp3_path, wav_path, gain_db=0.0):
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(mp3_path),
         "-af", f"volume={gain_db}dB,highpass=f=80,dynaudnorm=f=200:g=5",
         "-ar", "48000", "-ac", "1", str(wav_path)],
        check=True,
    )


def duration(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", str(path)],
        check=True, capture_output=True, text=True,
    )
    return float(out.stdout.strip())


async def main(outdir):
    outdir = Path(outdir)
    outdir.mkdir(parents=True, exist_ok=True)
    manifest = []

    for i, line in enumerate(LINES):
        who = line["who"]
        stem = outdir / f"line_{i:02d}"

        if who == "both":
            # Both characters say the closing line together: render it in each
            # voice and mix them so it reads as two people, not an echo.
            parts = []
            for n, (name, voice) in enumerate(VOICES.items()):
                mp3 = outdir / f"line_{i:02d}_{name}.mp3"
                words = await synth(line["text"], voice, RATE[name], PITCH[name], mp3)
                wav = outdir / f"line_{i:02d}_{name}.wav"
                to_wav(mp3, wav, gain_db=-3.0)
                parts.append(wav)
                if n == 0:
                    first_words = words
            subprocess.run(
                ["ffmpeg", "-y", "-loglevel", "error",
                 "-i", str(parts[0]), "-i", str(parts[1]),
                 "-filter_complex",
                 "[1:a]adelay=40|40[b];[0:a][b]amix=inputs=2:normalize=0,"
                 "alimiter=limit=0.95",
                 "-ar", "48000", "-ac", "1", str(stem.with_suffix(".wav"))],
                check=True,
            )
            words = first_words
        else:
            mp3 = stem.with_suffix(".mp3")
            words = await synth(line["text"], VOICES[who], RATE[who], PITCH[who], mp3)
            to_wav(mp3, stem.with_suffix(".wav"))

        wav = stem.with_suffix(".wav")
        dur = duration(wav)
        manifest.append({
            "index": i, "scene": line["scene"], "who": who,
            "text": line["text"], "file": str(wav), "dur": dur, "words": words,
        })
        print(f"  line {i:02d}  {who:5s}  {dur:5.2f}s  {line['text'][:58]}")

    (outdir / "voices.json").write_text(json.dumps(manifest, indent=1))
    print(f"\ntotal speech: {sum(m['dur'] for m in manifest):.2f}s across {len(manifest)} lines")


if __name__ == "__main__":
    asyncio.run(main(sys.argv[1]))
