"""Synthesise the cheerful background score, so nothing is licensed or borrowed.

A bright I-V-vi-IV loop in D major: marimba-ish melody, soft pad, bass and a
light kit. Scene 2 (the misunderstanding) gets a brief detune wobble to sell
the "noise in the channel" beat.
"""
import numpy as np

SR = 48000
BPM = 112
BEAT = 60.0 / BPM
BAR = BEAT * 4

# D major: D - A - Bm - G
PROG = [(62, "maj"), (69, "maj"), (71, "min"), (67, "maj")]
CHORD = {"maj": (0, 4, 7), "min": (0, 3, 7)}
MELODY = [74, 76, 78, 76, 74, 69, 71, 74, 76, 74, 73, 71, 69, 71, 74, 71]


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12.0)


def env(n, attack, decay, sustain=0.0, release=None):
    """A simple ADSR shaped over n samples."""
    a = max(1, int(attack * SR))
    d = max(1, int(decay * SR))
    r = max(1, int((release if release is not None else decay) * SR))
    out = np.zeros(n)
    a = min(a, n)
    out[:a] = np.linspace(0, 1, a)
    rest = n - a
    if rest > 0:
        d = min(d, rest)
        out[a:a + d] = np.linspace(1, sustain, d)
        if rest - d > 0:
            out[a + d:] = sustain
    if r < n:                                      # fade the tail out
        out[-r:] *= np.linspace(1, 0, r)
    return out


def tone(freq, dur, harmonics=(1.0, 0.5, 0.25), detune=0.0, shape=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.zeros(n)
    for i, amp in enumerate(harmonics, start=1):
        sig += amp * np.sin(2 * np.pi * freq * i * (1 + detune) * t)
    sig /= max(1e-9, sum(harmonics))
    return sig * (shape if shape is not None else env(n, 0.005, dur * 0.9))


def place(buf, sig, at, gain=1.0):
    i = int(at * SR)
    j = min(len(buf), i + len(sig))
    if i < len(buf):
        buf[i:j] += sig[:j - i] * gain


def kick(dur=0.17):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 110 * np.exp(-t * 26) + 46
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, dur)


def hat(dur=0.05, seed=0):
    rng = np.random.default_rng(seed)
    n = int(dur * SR)
    return rng.standard_normal(n) * env(n, 0.001, dur) * 0.33


def build(total=120.0, wobble=(25.0, 50.0)):
    n = int(total * SR)
    pad = np.zeros(n)
    lead = np.zeros(n)
    low = np.zeros(n)
    drums = np.zeros(n)

    bars = int(np.ceil(total / BAR))
    for b in range(bars):
        t0 = b * BAR
        root, quality = PROG[b % len(PROG)]
        # Detune the harmony through the misunderstanding scene.
        det = 0.010 if wobble[0] <= t0 < wobble[1] else 0.0

        for iv in CHORD[quality]:                   # soft sustained pad
            place(pad, tone(hz(root + iv - 12), BAR * 0.98,
                            (1.0, 0.35, 0.18), det,
                            env(int(BAR * 0.98 * SR), 0.22, 0.5, 0.55, 0.5)), t0, 0.16)
        for k in range(4):                          # walking bass
            place(low, tone(hz(root - 12), BEAT * 0.9, (1.0, 0.3), det), t0 + k * BEAT, 0.30)
        for k in range(8):                          # marimba melody
            note = MELODY[(b * 4 + k // 2) % len(MELODY)]
            if k % 2 == 0 or (b + k) % 3 == 0:
                d = BEAT * 0.48
                place(lead, tone(hz(note), d, (1.0, 0.6, 0.3, 0.12), det,
                                 env(int(d * SR), 0.004, d * 0.85)),
                      t0 + k * BEAT / 2, 0.19)
        for k in range(4):                          # light kit
            place(drums, kick(), t0 + k * BEAT, 0.5 if k % 2 == 0 else 0.28)
            place(drums, hat(seed=b * 8 + k), t0 + k * BEAT + BEAT / 2, 0.5)

    mix = pad + lead + low + drums
    mix *= 1.0 / max(1e-9, np.abs(mix).max())

    fade = int(2.5 * SR)                            # gentle top and tail
    mix[:fade] *= np.linspace(0, 1, fade)
    mix[-fade:] *= np.linspace(1, 0, fade)
    return mix[:n]


def write_wav(path, mono, peak=0.82):
    import wave
    data = np.clip(mono * peak, -1, 1)
    pcm = (data * 32767).astype("<i2")
    stereo = np.repeat(pcm[:, None], 2, axis=1).tobytes()
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(stereo)
    return path


if __name__ == "__main__":
    import sys
    write_wav(sys.argv[1], build(float(sys.argv[2]) if len(sys.argv) > 2 else 120.0))
    print("wrote", sys.argv[1])
