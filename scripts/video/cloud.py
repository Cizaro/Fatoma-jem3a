"""Thin client over the free Hugging Face GPU Spaces used to make the film.

Three open-source models, none of which run on this machine:
  * Qwen-Image (fast)      -> the character sheet
  * Qwen-Image-Edit-2511   -> every shot keyframe, conditioned on that sheet
                              so both students stay the same people throughout
  * LTX-Video (distilled)  -> turns each keyframe into a moving shot

Spaces are shared and queue, so every call retries with backoff and each
result is cached on disk: re-running the pipeline never regenerates work that
already succeeded.
"""
import os
import shutil
import time
from pathlib import Path

from gradio_client import Client, handle_file

TXT2IMG = "black-forest-labs/FLUX.1-schnell"
IMG_EDIT = "Qwen/Qwen-Image-Edit-2511"
VIDEO = "Lightricks/ltx-video-distilled"

NEG_VIDEO = ("worst quality, inconsistent motion, blurry, jittery, distorted, "
             "photorealistic, live action, real person, deformed hands, extra limbs, "
             "morphing faces, text, watermark")

_clients = {}


def client(space):
    if space not in _clients:
        tok = os.environ.get("HF_TOKEN") or None
        try:
            _clients[space] = Client(space, verbose=False, token=tok)
        except TypeError:                              # older gradio_client
            _clients[space] = Client(space, verbose=False)
    return _clients[space]


def _retry(fn, tries=4, base=20, label=""):
    """Retry queue/quota hiccups, but surface programming errors immediately."""
    last = None
    for i in range(tries):
        try:
            return fn()
        except (TypeError, KeyError, AttributeError):
            raise                                      # our bug, not the Space's
        except Exception as exc:                       # queue / quota / timeout
            last = exc
            msg = str(exc)[:160].replace("\n", " ")
            print(f"    retry {i + 1}/{tries} {label}: {type(exc).__name__}: {msg}")
            wait = base * (i + 1)
            if "quota" in msg.lower() or "exceeded" in msg.lower():
                wait = max(wait, 70)
            _clients.clear()
            time.sleep(wait)
    raise RuntimeError(f"{label} failed after {tries} tries: {last}")


def _grab(result, dest):
    """Copy whatever a Space returned into our own output path."""
    item = result[0] if isinstance(result, (list, tuple)) else result
    if isinstance(item, list) and item:                # gallery output
        item = item[0]
    if isinstance(item, dict):
        item = item.get("image") or item.get("video") or item.get("path")
    if isinstance(item, dict):
        item = item.get("path")
    Path(dest).parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(item, dest)
    return dest


def text_to_image(prompt, dest, width=1024, height=576, steps=4, seed=0):
    dest = Path(dest)
    if dest.exists():
        print(f"    cached  {dest.name}")
        return str(dest)

    def go():
        return client(TXT2IMG).predict(
            prompt=prompt, seed=seed, randomize_seed=False,
            width=width, height=height, num_inference_steps=steps,
            api_name="/infer")
    return _grab(_retry(go, label=f"t2i {dest.name}"), dest)


def edit_image(refs, prompt, dest, width=1024, height=576, steps=24, seed=0):
    """Make a new still from reference images - this is what locks identity."""
    dest = Path(dest)
    if dest.exists():
        print(f"    cached  {dest.name}")
        return str(dest)
    gallery = [{"image": handle_file(str(r))} for r in refs]

    def go():
        return client(IMG_EDIT).predict(
            images=gallery, prompt=prompt, seed=seed, randomize_seed=False,
            true_guidance_scale=4.0, num_inference_steps=steps,
            height=height, width=width, rewrite_prompt=False, api_name="/infer")
    return _grab(_retry(go, label=f"edit {dest.name}"), dest)


def image_to_video(image, prompt, dest, seconds=8.0, width=1024, height=576, seed=0):
    dest = Path(dest)
    if dest.exists():
        print(f"    cached  {dest.name}")
        return str(dest)

    def go():
        return client(VIDEO).predict(
            prompt=prompt, negative_prompt=NEG_VIDEO,
            input_image_filepath=handle_file(str(image)),
            input_video_filepath=None,
            height_ui=height, width_ui=width, mode="image-to-video",
            duration_ui=seconds, ui_frames_to_use=9, seed_ui=seed,
            randomize_seed=False, ui_guidance_scale=1.0,
            improve_texture_flag=True, api_name="/image_to_video")
    return _grab(_retry(go, tries=5, label=f"i2v {dest.name}"), dest)
