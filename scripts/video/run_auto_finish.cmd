@echo off
REM Unattended finisher for the communication video.
REM Renders any shots that are still missing, then rebuilds the 2:00 film.
setlocal
set /p HF_TOKEN=<C:\Users\Alina\.hf_video_token
set BASE=C:\Users\Alina\FATOMA JEM3A
cd /d "%BASE%\scripts\video"
python auto_finish.py ^
  "%BASE%\output\render_state" ^
  "%BASE%\output\render_state\voice\voices.json" ^
  "%BASE%\output\communication-video-final.mp4"
endlocal
