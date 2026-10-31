"""Dialogue, scene structure and on-screen labels for the communication video.

Every timing in this module is a *target*. The real timeline is built in
``timeline.py`` from the measured length of each generated voice clip, so the
finished film lands on exactly ``TOTAL`` seconds.
"""

FPS = 30
W, H = 1920, 1080
TOTAL = 120.0

# Voices: two clearly different female neural voices so the characters never
# sound like the same person.
VOICES = {
    # maya = FATIMA (sender), noor = ZAINAB (receiver).
    # These AI voices are a scratch track: the students dub their own later.
    "maya": "en-US-AvaNeural",
    "noor": "en-GB-SoniaNeural",
}

# Scene boundaries in seconds, exactly as the brief specifies.
SCENES = [
    {"id": 1, "start": 0.0, "end": 25.0, "title": "Introducing the Idea"},
    {"id": 2, "start": 25.0, "end": 50.0, "title": "Miscommunication"},
    {"id": 3, "start": 50.0, "end": 75.0, "title": "Feedback"},
    {"id": 4, "start": 75.0, "end": 105.0, "title": "Teamwork"},
    {"id": 5, "start": 105.0, "end": 120.0, "title": "Conclusion"},
]

# Each line carries the expression both characters hold while it plays, plus a
# gesture for the speaker. The renderer interpolates between consecutive lines.
#   expressions: neutral excited thinking confused happy warm surprised proud
#   gestures:    rest explain offer count phone write point thumbs shrug cheer
LINES = [
    # ---- Scene 1: the idea (sender -> message -> channel -> receiver) -------
    dict(scene=1, who="maya", expr=("excited", "neutral"), gest="explain",
         text="Zainab! I have been thinking about this all week. "
              "I want to start a snack delivery business, just for students on campus."),
    dict(scene=1, who="noor", expr=("warm", "thinking"), gest="offer",
         text="Okay Fatima, I am listening. Snack delivery. How would that actually work?"),
    dict(scene=1, who="maya", expr=("excited", "thinking"), gest="phone",
         text="You order from your phone between lectures, "
              "and we bring the snack straight to your building."),
    dict(scene=1, who="noor", expr=("warm", "thinking"), gest="point",
         text="So people order online. And who makes the food?"),

    # ---- Scene 2: the barrier ----------------------------------------------
    dict(scene=2, who="noor", expr=("surprised", "confused"), gest="shrug",
         text="Wait. So you are opening a restaurant? "
              "Like a real kitchen, with chefs and tables?"),
    dict(scene=2, who="maya", expr=("surprised", "confused"), gest="explain",
         text="No, no! Not a restaurant. I do not cook anything."),
    dict(scene=2, who="maya", expr=("warm", "thinking"), gest="offer",
         text="We work with the shops that are already here. We only handle the delivery."),
    dict(scene=2, who="noor", expr=("happy", "happy"), gest="point",
         text="Ohh! So you are the bridge between the shop and the student. Now I get it."),

    # ---- Scene 3: feedback --------------------------------------------------
    dict(scene=3, who="noor", expr=("warm", "proud"), gest="count",
         text="Then here is my feedback. Keep the prices low. Students are always broke."),
    dict(scene=3, who="noor", expr=("warm", "proud"), gest="count",
         text="Add healthy options too, not just crisps and chocolate."),
    dict(scene=3, who="noor", expr=("excited", "proud"), gest="count",
         text="And give a student discount. People will share that everywhere."),
    dict(scene=3, who="maya", expr=("happy", "happy"), gest="write",
         text="That is brilliant. Affordable, healthy, and a student discount. "
              "I am writing all of this down."),

    # ---- Scene 4: teamwork --------------------------------------------------
    dict(scene=4, who="maya", expr=("excited", "happy"), gest="write",
         text="Okay. Business plan. Name, menu, delivery times, pricing."),
    dict(scene=4, who="noor", expr=("happy", "excited"), gest="phone",
         text="And promotion. Instagram. That is where everyone on campus actually is."),
    dict(scene=4, who="maya", expr=("happy", "happy"), gest="offer",
         text="Daily story polls. What should we deliver tomorrow?"),
    dict(scene=4, who="noor", expr=("excited", "excited"), gest="explain",
         text="And reels during exam week. Late night study snacks, delivered in fifteen minutes."),
    dict(scene=4, who="maya", expr=("happy", "happy"), gest="thumbs",
         text="We make a really good team, Zainab."),

    # ---- Scene 5: conclusion ------------------------------------------------
    dict(scene=5, who="maya", expr=("happy", "happy"), gest="offer",
         text="We started with one idea and a lot of questions."),
    dict(scene=5, who="noor", expr=("happy", "happy"), gest="offer",
         text="And we ended up with a real plan."),
    dict(scene=5, who="both", expr=("happy", "happy"), gest="cheer",
         text="Communication turns ideas into opportunities!"),
]

# Communication-model badges. ``at`` is a fraction of the owning scene, so the
# badges keep their place even after the timeline is fitted to real audio.
BADGES = [
    dict(scene=1, at=0.04, hold=0.30, label="SENDER",   anchor="maya",  color="#FF7A3D"),
    dict(scene=1, at=0.10, hold=0.26, label="MESSAGE",  anchor="middle", color="#FFC23D"),
    dict(scene=1, at=0.40, hold=0.26, label="CHANNEL",  anchor="middle", color="#4ECDC4"),
    dict(scene=1, at=0.58, hold=0.30, label="RECEIVER", anchor="noor",  color="#7C6CF5"),
    dict(scene=2, at=0.06, hold=0.42, label="NOISE / BARRIER", anchor="middle", color="#FF4D6D"),
    dict(scene=3, at=0.05, hold=0.60, label="FEEDBACK", anchor="noor",  color="#2BD67B"),
    dict(scene=4, at=0.08, hold=0.30, label="SHARED MEANING", anchor="middle", color="#4ECDC4"),
]

# Full-width word cards the brief asks for by name.
CARDS = [
    dict(scene=2, at=0.17, hold=0.26, text="COMMUNICATION BARRIER", color="#FF4D6D"),
    dict(scene=3, at=0.04, hold=0.30, text="FEEDBACK", color="#2BD67B"),
    dict(scene=4, at=0.02, hold=0.22, text="TEAMWORK", color="#7C6CF5"),
]

# Scene props drawn in the overlay layer rather than baked into the artwork,
# so they never disturb the two characters.
MARKS = [
    dict(scene=2, at=0.02, hold=0.13, kind="qmark", anchor="noor", color="#FFC23D"),
    dict(scene=2, at=0.05, hold=0.10, kind="static", anchor="middle", color="#FF4D6D"),
]

PALETTE = {
    "wall_top": (84, 108, 186),
    "wall_bot": (142, 164, 232),
    "floor": (196, 168, 142),
    "table": (233, 196, 148),
    "table_edge": (196, 150, 104),
    "ink": (38, 34, 58),
    "sub_bg": (18, 16, 32),
    "white": (255, 255, 255),
}

FONTS = {
    "black": "C:/Windows/Fonts/seguibl.ttf",
    "semibold": "C:/Windows/Fonts/seguisb.ttf",
    "bold": "C:/Windows/Fonts/segoeuib.ttf",
}
