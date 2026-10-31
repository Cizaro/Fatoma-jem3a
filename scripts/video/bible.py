"""Character bible and shot list.

The wardrobe and hair descriptions here are repeated verbatim in every prompt.
Together with the reference sheet handed to the image editor, that is what
keeps Maya and Noor recognisably the same two people in all fifteen shots.
"""

STYLE = ("3D animated film still, Pixar-style 3D rendering, fully three-dimensional "
         "CGI characters, soft volumetric lighting, subsurface-scattering skin, glossy "
         "rounded 3D shading, depth of field, vibrant saturated colors, expressive "
         "cartoon faces with large eyes, high quality 3D animation render, "
         "not a drawing, not flat 2D, not line art, no text, no captions")

MAYA = ("a young woman university student with fair light skin, wearing a soft "
        "CORAL-PEACH HIJAB neatly framing her face, round glasses, and a cream-beige "
        "long-sleeve top, warm brown eyes, no hair showing")

NOOR = ("a young woman university student with fair light skin, wearing a DUSTY ROSE "
        "PINK HIJAB neatly framing her face, no glasses, and a lavender-purple "
        "long-sleeve cardigan, large dark brown eyes, no hair showing")

SETTING = ("a bright modern university cafeteria, big sunny windows, warm wooden tables, "
           "colorful chairs, potted plants, softly blurred students in the background")

SHEET_PROMPT = (
    f"Character reference sheet, two different young women standing side by side, "
    f"full body, front view, neutral pose, plain soft light grey studio background. "
    f"On the left: {MAYA}. On the right: {NOOR}. "
    f"Both are clearly different people with distinct faces, hair and clothing. "
    f"{STYLE}")

# Fifteen shots covering 120 seconds. ``scene`` ties each shot to the dialogue
# timeline; ``concept`` is the part of the communication model it illustrates.
SHOTS = [
    # --- Scene 1 (0-25s) : sender, message, channel, receiver -----------------
    dict(id=1, scene=1, concept="SENDER",
         still=f"Wide two-shot. {MAYA} sits on the left at a cafeteria table facing "
               f"{NOOR} on the right. Maya leans forward, eyes bright, mouth open "
               f"mid-sentence, both hands raised in an excited explaining gesture. "
               f"Noor listens attentively. Two drinks and a notebook on the table. "
               f"{SETTING}. {STYLE}",
         motion="The young woman in the coral-orange hoodie talks excitedly and gestures "
                "with both hands; her friend in the lavender cardigan nods and listens. "
                "Gentle slow push-in camera move. Smooth natural cartoon animation."),
    dict(id=2, scene=1, concept="MESSAGE",
         still=f"Medium close-up on {MAYA}, smiling warmly, talking, one hand open in "
               f"front of her as if presenting an idea. Warm window light. "
               f"{SETTING}, softly blurred behind her. {STYLE}",
         motion="The young woman in the coral-orange hoodie speaks warmly to camera-left, "
                "her open hand moving as she explains. Her mouth moves as she talks. "
                "Slow gentle camera drift. Smooth natural cartoon animation."),
    dict(id=3, scene=1, concept="CHANNEL / RECEIVER",
         still=f"Medium close-up on {NOOR} listening, head tilted slightly, eyebrows "
               f"raised with curiosity, holding a smartphone in one hand, about to ask "
               f"a question. {SETTING}, softly blurred. {STYLE}",
         motion="The young woman in the lavender cardigan listens, tilts her head, then "
                "asks a question while glancing at the phone in her hand. "
                "Slow gentle camera drift. Smooth natural cartoon animation."),

    # --- Scene 2 (25-50s) : noise / barrier ----------------------------------
    dict(id=4, scene=2, concept="NOISE / BARRIER",
         still=f"Medium close-up on {NOOR} looking confused and puzzled, eyebrows "
               f"furrowed, head tilted, both palms turned up in a questioning shrug, "
               f"a large glowing yellow question mark floating in the air above her "
               f"head. {SETTING}, softly blurred. {STYLE}",
         motion="The confused young woman in the lavender cardigan shrugs with both palms "
                "up and frowns in puzzlement while a glowing question mark bobs above her "
                "head. Slight camera shake. Smooth natural cartoon animation."),
    dict(id=5, scene=2, concept="NOISE / BARRIER",
         still=f"Wide two-shot across the cafeteria table. {NOOR} on the right looks "
               f"baffled with a question mark above her head, while {MAYA} on the left "
               f"waves both hands in a correcting 'no no' gesture, eyes wide. A faint "
               f"jagged crack of static floats in the air between the two of them. "
               f"{SETTING}. {STYLE}",
         motion="The young woman in the coral-orange hoodie waves both hands to correct a "
                "misunderstanding while her confused friend in the lavender cardigan "
                "frowns. Static crackles between them. Smooth natural cartoon animation."),
    dict(id=6, scene=2, concept="CLARIFY",
         still=f"Medium close-up on {MAYA} clarifying patiently, calm reassuring smile, "
               f"one hand gesturing between two imaginary points as if explaining a "
               f"bridge or a link. {SETTING}, softly blurred. {STYLE}",
         motion="The young woman in the coral-orange hoodie calmly explains, moving one "
                "hand between two points as if describing a connection, and smiles. "
                "Slow gentle push-in. Smooth natural cartoon animation."),

    # --- Scene 3 (50-75s) : feedback -----------------------------------------
    dict(id=7, scene=3, concept="FEEDBACK",
         still=f"Medium close-up on {NOOR}, now bright and enthusiastic, smiling, "
               f"holding up three fingers as she counts out suggestions. "
               f"{SETTING}, softly blurred. {STYLE}",
         motion="The young woman in the lavender cardigan smiles and counts points on her "
                "fingers as she gives advice. Slow gentle camera drift. Smooth natural "
                "cartoon animation."),
    dict(id=8, scene=3, concept="FEEDBACK",
         still=f"Wide two-shot. {NOOR} on the right leans in talking and gesturing with "
               f"an open hand, {MAYA} on the left listens with a delighted grin and nods, "
               f"scribbling in an open notebook on the table. {SETTING}. {STYLE}",
         motion="The young woman in the lavender cardigan gives suggestions while her "
                "friend in the coral-orange hoodie nods happily and writes in a notebook. "
                "Smooth natural cartoon animation."),
    dict(id=9, scene=3, concept="FEEDBACK",
         still=f"Close-up over the table on an open notebook where a pen is writing, with "
               f"{MAYA}'s delighted face visible above it, nodding. Healthy snacks and "
               f"fruit in a basket beside the notebook. {SETTING}. {STYLE}",
         motion="A hand writes in the notebook while the young woman in the coral-orange "
                "hoodie smiles and nods above it. Slow camera push-in on the page. "
                "Smooth natural cartoon animation."),

    # --- Scene 4 (75-105s) : teamwork ----------------------------------------
    dict(id=10, scene=4, concept="SHARED MEANING",
         still=f"Wide two-shot, both leaning over the table together planning. {MAYA} on "
               f"the left writes in a notebook, {NOOR} on the right points at the page. "
               f"Both smiling and focused, heads close together. {SETTING}. {STYLE}",
         motion="Two young women lean over a notebook together, one writing and one "
                "pointing at the page, both smiling and talking. Slow gentle push-in. "
                "Smooth natural cartoon animation."),
    dict(id=11, scene=4, concept="SHARED MEANING",
         still=f"Medium shot of {NOOR} holding up her smartphone so {MAYA} can see the "
               f"screen, which glows with a colorful social media feed of snack photos. "
               f"Both look excited. {SETTING}. {STYLE}",
         motion="The young woman in the lavender cardigan holds up a glowing phone to show "
                "her friend a colorful social feed; both react with excitement. "
                "Smooth natural cartoon animation."),
    dict(id=12, scene=4, concept="SHARED MEANING",
         still=f"Close-up of the open notebook on the table, now filled with a colorful "
               f"hand-drawn business plan: a snack delivery logo, price list, and a "
               f"little map, with both women's hands resting beside it. {SETTING}. "
               f"{STYLE}",
         motion="The camera drifts slowly across a colorful hand-drawn business plan in a "
                "notebook while two pairs of hands gesture beside it. Smooth natural "
                "cartoon animation."),
    dict(id=13, scene=4, concept="SHARED MEANING",
         still=f"Wide two-shot, {MAYA} and {NOOR} laughing together and high-fiving across "
               f"the cafeteria table, notebook and phone between them. Joyful energy. "
               f"{SETTING}. {STYLE}",
         motion="Two young women laugh and high-five across a cafeteria table, delighted. "
                "Slight celebratory camera move. Smooth natural cartoon animation."),

    # --- Scene 5 (105-120s) : conclusion -------------------------------------
    dict(id=14, scene=5, concept="CONCLUSION",
         still=f"Wide two-shot, {MAYA} and {NOOR} sitting side by side behind the "
               f"cafeteria table, both turned to face the camera directly, beaming warm "
               f"confident smiles. Bright cheerful lighting. {SETTING}. {STYLE}",
         motion="Two young women turn to face the camera side by side and smile warmly, "
                "talking together. Slow gentle push-in. Smooth natural cartoon animation."),
    dict(id=15, scene=5, concept="CONCLUSION",
         still=f"Medium two-shot of {MAYA} and {NOOR} facing the camera, both grinning "
               f"happily, Maya giving a thumbs up and Noor waving. Warm golden light, "
               f"celebratory mood. {SETTING}. {STYLE}",
         motion="Two young women smile at the camera; one gives a thumbs up and the other "
                "waves. Warm and celebratory. Smooth natural cartoon animation."),
]

EDIT_PREFIX = ("Using the two women from the reference image, keeping their faces, hair "
               "and clothing exactly the same: ")


MASTER_PROMPT = (
    '3D Pixar-style animated film still, two young women university students sitting at a cafeteria table facing each other, upper body, both visible. LEFT character: a young woman university student with fair light skin, wearing a soft CORAL-PEACH HIJAB neatly framing her face, round glasses, and a cream-beige long-sleeve top, warm brown eyes, no hair showing, smiling and talking with one hand raised in an explaining gesture. RIGHT character: a young woman university student with fair light skin, wearing a DUSTY ROSE PINK HIJAB neatly framing her face, no glasses, and a lavender-purple long-sleeve cardigan, large dark brown eyes, no hair showing, listening attentively. Two drinks and a notebook on the table. Bright modern university cafeteria with big sunny windows, warm wooden tables, colorful chairs, plants, softly blurred students behind. Pixar 3D render, soft volumetric lighting, subsurface-scattering skin, glossy rounded 3D shading, large expressive cartoon eyes, vibrant saturated colors, depth of field, high quality 3D animation, modest clothing, not a drawing, not flat 2D, no text')
