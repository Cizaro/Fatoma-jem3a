#!/usr/bin/env python3
"""
Build the MIT320 Partial I mock exam as two PDFs: the paper she sits,
and the solutions he marks from.

The questions live here once. Printing them twice from one source is
the only way the answer key cannot drift away from the paper.

Every traced output in Section 3 was produced by running the snippet
through PHP, not by reading it.

    python scripts/build-mock-exam.py
"""
import io
import os

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (BaseDocTemplate, Frame, PageBreak, PageTemplate,
                                Paragraph, Preformatted, Spacer, Table, TableStyle)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "Php", "resources", "exams")

INK   = colors.HexColor("#15171E")
MUTED = colors.HexColor("#5A6070")
RULE  = colors.HexColor("#C9CCD4")
CODE  = colors.HexColor("#F2F0EA")
MARK  = colors.HexColor("#B23A18")

# ---------------------------------------------------------------- styles
ss = getSampleStyleSheet()
S = {
    "title": ParagraphStyle("title", parent=ss["Title"], fontName="Helvetica-Bold",
                            fontSize=19, leading=23, textColor=INK, spaceAfter=2),
    "sub": ParagraphStyle("sub", parent=ss["Normal"], fontName="Helvetica",
                          fontSize=10.5, leading=14, textColor=MUTED,
                          alignment=TA_CENTER, spaceAfter=12),
    "sec": ParagraphStyle("sec", parent=ss["Heading2"], fontName="Helvetica-Bold",
                          fontSize=13, leading=16, textColor=INK,
                          spaceBefore=15, spaceAfter=3),
    "secnote": ParagraphStyle("secnote", parent=ss["Normal"], fontName="Helvetica-Oblique",
                              fontSize=9.5, leading=12, textColor=MUTED, spaceAfter=8),
    "q": ParagraphStyle("q", parent=ss["Normal"], fontName="Helvetica",
                        fontSize=10.5, leading=14.5, textColor=INK, spaceAfter=3),
    "opt": ParagraphStyle("opt", parent=ss["Normal"], fontName="Helvetica",
                          fontSize=10.5, leading=14, textColor=INK,
                          leftIndent=14, spaceAfter=1),
    "ans": ParagraphStyle("ans", parent=ss["Normal"], fontName="Helvetica-Bold",
                          fontSize=10.5, leading=14, textColor=MARK,
                          leftIndent=14, spaceAfter=2),
    "why": ParagraphStyle("why", parent=ss["Normal"], fontName="Helvetica-Oblique",
                          fontSize=9.5, leading=12.5, textColor=MUTED,
                          leftIndent=14, spaceAfter=7),
    "code": ParagraphStyle("code", parent=ss["Code"], fontName="Courier",
                           fontSize=9, leading=11.6, textColor=INK,
                           leftIndent=8, spaceBefore=3, spaceAfter=5),
}


def code(txt):
    """A code block on a tinted panel. Preformatted can split across a
    page break; a table cell cannot, and the longest listing here is
    taller than a page of A4."""
    return Preformatted(txt.strip(), S["code"])


def lines(n=3):
    """Ruled space to write an answer in - a paper nobody can write on
    is not a paper."""
    rows = [[""] for _ in range(n)]
    t = Table(rows, colWidths=[165 * mm], rowHeights=[8.5 * mm] * n)
    t.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, RULE),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def box(h_mm, label=""):
    """An empty frame, for the flowchart."""
    t = Table([[label]], colWidths=[165 * mm], rowHeights=[h_mm * mm])
    t.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, RULE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TEXTCOLOR", (0, 0), (-1, -1), MUTED),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Oblique"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


# ---------------------------------------------------------------- content
MCQ = [
    ("Where does PHP code run?",
     ["in the browser",
      "on the server, before the HTML is sent to the browser",
      "in the browser, after the HTML has loaded",
      "inside the database"], 1,
     "The browser never sees PHP. It receives only what the script printed."),
    ("Which of these is a VALID PHP variable name?",
     ["$2php", "$my-var", "$_total", "my_var"], 2,
     "A name may start with a letter or an underscore, never a digit; a hyphen "
     "is a minus sign; and without the $ it is not a variable at all."),
    ("What does  echo 10 . 5;  print?",
     ["15", "105", "10.5", "a syntax error"], 1,
     "The dot joins. It turns both numbers into text and sticks them together."),
    ("In PHP 8, what does  echo \"Total: \" . 5 + 3;  print?",
     ["Total: 53", "Total: 8", "8", "a syntax error"], 1,
     "PHP 8 changed the precedence: + now binds tighter than the dot, so the "
     "addition happens first. In PHP 7 this was an error."),
    ("var_dump((int) \"12abc\");  gives:",
     ["int(0)", "int(12)", "string(5) \"12abc\"", "a fatal error"], 1,
     "Casting to int reads digits from the front and stops at the first "
     "character that is not one."),
    ("Which comparison is TRUE?",
     ["0 == \"a\"", "null === false", "\"1\" == \"01\"", "\"abc\" == 0"], 2,
     "Two numeric strings are compared as numbers, and 1 equals 01. The first "
     "and last were true in PHP 7 and are false in PHP 8."),
    ("What does  7 / 2  produce?",
     ["int(3)", "float(3.5)", "int(4)", "string(\"3.5\")"], 1,
     "Division always produces a float in PHP unless you ask for intdiv()."),
    ("Which loop is guaranteed to run at least once?",
     ["for", "while", "do-while", "foreach"], 2,
     "Its test is at the bottom, so the body has already run before anything "
     "is checked."),
    ("Inside a loop, continue:",
     ["ends the loop completely",
      "skips the rest of this pass and starts the next",
      "starts the loop again from the first pass",
      "stops the whole script"], 1,
     "break ends the loop; continue only ends the current pass."),
    ("Which is a valid PHP comment?",
     ["<!-- note -->", "** note **", "# note", "' note"], 2,
     "PHP takes //, # and /* ... */. The first is an HTML comment, which PHP "
     "ignores and the browser shows in the source."),
]

TF = [
    ("Every PHP variable name must begin with a $ sign.", True,
     "No exceptions. Leaving it off makes PHP read a bare word instead."),
    ("$Name and $name refer to the same variable.", False,
     "Variable names are case sensitive. (Function names are not.)"),
    ("The === operator compares the value AND the data type.", True,
     "That is the whole difference between === and ==."),
    ("\"5\" === 5 evaluates to true.", False,
     "Same value, different types - string against integer - so === says no."),
    ("The + operator joins two strings together in PHP.", False,
     "The dot joins. + tries to add, converting the text to numbers first."),
    ("(bool) \"0.0\" evaluates to false.", False,
     "It is TRUE. Only the empty string and the single character \"0\" are "
     "falsy strings; \"0.0\" is neither."),
    ("empty(\"0\") returns true.", True,
     "empty() counts \"0\" as empty, which is exactly why it is the wrong "
     "check for a quantity box someone legitimately typed 0 into."),
    ("Changing $v inside  foreach ($arr as $v)  changes the array.", False,
     "$v is a copy. Changing the array needs a reference: foreach ($arr as &$v)."),
]

TRACE = [
    ("""$a = "5";
$b = 5;
var_dump($a == $b);
var_dump($a === $b);""",
     "bool(true)\nbool(false)",
     "== converts the string to a number and finds them equal. === compares "
     "the types first and stops there."),
    ("""for ($i = 1; $i <= 6; $i++) {
    if ($i % 2 == 0) continue;
    if ($i == 5) break;
    echo $i . " ";
}""",
     "1 3 ",
     "2, 4 and 6 are skipped by continue. At 5 the loop breaks before the "
     "echo, so 5 is never printed."),
    ("""$n = 10;
do {
    echo "run ";
    $n++;
} while ($n < 5);""",
     "run ",
     "The test is at the bottom, so the body runs once even though 10 was "
     "never less than 5."),
    ("""$s = "PHP";
$s .= " is";
$s .= " fun";
echo $s . " (" . strlen($s) . ")";""",
     "PHP is fun (10)",
     ".= adds to the end of what is already there. \"PHP is fun\" is ten "
     "characters including the two spaces."),
    ("""$cart = ["pen" => 3, "book" => 12, "bag" => 25];
$t = 0;
foreach ($cart as $item => $price) {
    if ($price < 5) continue;
    $t += $price;
}
echo $t;""",
     "37",
     "The pen at 3 is skipped, so 12 + 25."),
    ("""$x = 10;
$y = $x++;
$z = ++$x;
echo "$x $y $z";""",
     "12 10 12",
     "$x++ hands back the old value and then adds; ++$x adds first and hands "
     "back the new one. $x is raised twice either way."),
]

ERRORQ = """<?php
$price = 10
$qty = "3";
if ($price = 10) {
    echo "Total: " + $price * $qty;
}"""
ERRORS = [
    "Line 2 has no semicolon at the end.",
    "The if uses = (which puts a value in and is always true) instead of ==.",
    "The output uses + to join text to a number; it should be the dot.",
]

SCENARIO = """A tutor types <b>five marks out of 20</b> into a form, one box per student,
and presses <b>Show results</b>. The page must then display a table of the five marks
with a letter grade beside each one, and underneath it the total, the average to two
decimal places, the highest mark, and how many students passed (a pass is 10 or more).
If any box is empty or holds something that is not a number from 0 to 20, the page must
say so and show no table."""

GRADES = "18 and over = A &nbsp;|&nbsp; 16 = B &nbsp;|&nbsp; 14 = C &nbsp;|&nbsp; 10 = D &nbsp;|&nbsp; under 10 = F"

SOL_PSEUDO = """START
  IF the Show results button was pressed THEN
      TOTAL   <-- 0
      HIGHEST <-- nothing yet          [not 0: zero is a legal mark]
      PASSES  <-- 0
      PRINT the table heading row      [once, outside the loop]
      I <-- 1
      WHILE I <= 5
          MARK <-- the mark typed for student I
          IF MARK is not a number OR MARK < 0 OR MARK > 20 THEN
              PRINT "Every mark must be a number from 0 to 20."
              STOP
          ENDIF
          TOTAL <-- TOTAL + MARK
          IF MARK >= 10 THEN PASSES <-- PASSES + 1 ENDIF
          IF HIGHEST is nothing OR MARK > HIGHEST THEN HIGHEST <-- MARK ENDIF
          PRINT a row holding I, MARK and the letter grade for MARK
          I <-- I + 1
      ENDWHILE
      PRINT the end of the table
      PRINT TOTAL
      PRINT TOTAL / 5 to two decimal places
      PRINT HIGHEST
      PRINT PASSES
  ENDIF
STOP"""

SOL_FLOW = """( START )
    |
< Show results pressed ? > --no--> ( STOP )
    | yes
[ TOTAL <-- 0 , HIGHEST <-- none , PASSES <-- 0 ]
    |
/ print the heading row ONCE /
    |
[ I <-- 1 ]
    |
< I <= 5 ? > --no--> / print total, average, highest, passes / --> ( STOP )
    | yes
/ read MARK for student I /
    |
< MARK valid ? > --no--> / print the error / --> ( STOP )
    | yes
[ TOTAL <-- TOTAL + MARK ]
    |
< MARK >= 10 ? > --yes--> [ PASSES <-- PASSES + 1 ]
    |
< MARK > HIGHEST ? > --yes--> [ HIGHEST <-- MARK ]
    |
/ print the row for student I /
    |
[ I <-- I + 1 ]
    |
    +---- back up to < I <= 5 ? >"""

SOL_PHP = r"""<?php
/**
 * Exam results dashboard.
 *
 * Reads five marks out of 20 from a POST form, grades each one, and
 * reports the total, the average, the highest mark and the pass count.
 *
 * @author  Fatima Al-Helou
 * @version 1.0
 */

/**
 * Turn a mark out of 20 into a letter grade.
 *
 * @param  int|float $mark The mark to grade, 0 to 20.
 * @return string          A, B, C, D or F.
 */
function letterGrade($mark) {
    if ($mark >= 18)     { return "A"; }
    elseif ($mark >= 16) { return "B"; }
    elseif ($mark >= 14) { return "C"; }
    elseif ($mark >= 10) { return "D"; }
    return "F";
}

// Nothing below runs until the button has actually been pressed.
if (isset($_POST["show"])) {

    $total   = 0;      // running sum of every mark
    $highest = null;   // null, not 0 - a mark of 0 is legal
    $passes  = 0;      // how many reached 10

    echo "<table border='1'>";
    echo "<tr><th>Student</th><th>Mark</th><th>Grade</th></tr>";

    // One pass per student; $i doubles as the student number shown.
    for ($i = 1; $i <= 5; $i++) {

        $mark = $_POST["mark" . $i];

        // Everything from a form is text, and the box may be empty.
        if (!is_numeric($mark) || $mark < 0 || $mark > 20) {
            echo "</table>";
            echo "<p>Every mark must be a number from 0 to 20.</p>";
            return;
        }

        $total += $mark;
        if ($mark >= 10) { $passes++; }
        if ($highest === null || $mark > $highest) { $highest = $mark; }

        echo "<tr>";
        echo "<td>Student " . $i . "</td>";
        echo "<td>" . $mark . "</td>";
        echo "<td>" . letterGrade($mark) . "</td>";
        echo "</tr>";
    }

    echo "</table>";

    // Worked out after the loop, never inside it.
    echo "<p>Total: "   . $total . "</p>";
    echo "<p>Average: " . number_format($total / 5, 2) . "</p>";
    echo "<p>Highest: " . $highest . "</p>";
    echo "<p>Passed: "  . $passes . " out of 5</p>";
}"""

MARKING = [
    ("Pseudocode", 5, "Counter set before the loop; the loop tests up to and "
     "including 5; the totals are printed after it, not inside. CAPITALS and "
     "<-- are his conventions and are expected."),
    ("Flowchart", 5, "Start AND Stop both drawn; input and output in "
     "parallelograms; every decision a diamond with both ways labelled; the "
     "arrow back up to the loop test present. An unconnected box loses a mark."),
    ("PHP, working", 6, "Loop runs exactly five times, total and pass count "
     "accumulate outside the loop, average divides after it."),
    ("PHP, documented", 4, "One PHPDoc block for the script and one for the "
     "function, with @param and @return, plus inline // comments that say WHY "
     "rather than restating the line."),
]

TIPS = [
    "Write the $ on every variable. It is the single most common lost mark.",
    "Join text with the dot. The + will quietly turn your words into numbers.",
    "=== checks the value AND the type; == checks the value after converting.",
    "In an if, == asks a question. A single = puts a value in and is always true.",
    "A PHPDoc block is /** on its own line, a one-line summary, then @param "
    "and @return. Section 4 asks for it by name.",
]


# ---------------------------------------------------------------- layout
def document(path, footer):
    doc = BaseDocTemplate(path, pagesize=A4,
                          leftMargin=22 * mm, rightMargin=23 * mm,
                          topMargin=18 * mm, bottomMargin=18 * mm,
                          title="MIT320 Partial I - Mock Exam", author="MIT320")
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")

    def decorate(canvas, d):
        canvas.saveState()
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(doc.leftMargin, 11 * mm, footer)
        canvas.drawRightString(A4[0] - doc.rightMargin, 11 * mm,
                               "page %d" % canvas.getPageNumber())
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.4)
        canvas.line(doc.leftMargin, 14 * mm, A4[0] - doc.rightMargin, 14 * mm)
        canvas.restoreState()

    doc.addPageTemplates([PageTemplate(id="p", frames=[frame], onPage=decorate)])
    return doc


def header(flow, subtitle):
    flow.append(Paragraph("MIT320 &mdash; Information Systems Development", S["title"]))
    flow.append(Paragraph(subtitle, S["sub"]))


def letters(i):
    return "abcd"[i]


def build_paper(path):
    f = []
    header(f, "Partial I &nbsp;&middot;&nbsp; <b>MOCK EXAM</b> &nbsp;&middot;&nbsp; "
              "Lessons 1&ndash;3 &nbsp;&middot;&nbsp; 60 minutes &nbsp;&middot;&nbsp; 50 marks")
    f.append(Paragraph("Name: ______________________________ &nbsp;&nbsp;&nbsp; "
                       "Date: ______________", S["q"]))
    f.append(Spacer(1, 4))
    f.append(Paragraph("<b>Answer every section.</b> Sections 1 and 2 carry one mark "
                       "each. Write your answers in the space provided. "
                       "No notes, no computer.", S["secnote"]))

    f.append(Paragraph("Section 1 &mdash; Multiple Choice", S["sec"]))
    f.append(Paragraph("Circle one answer. 10 marks, about 12 minutes.", S["secnote"]))
    for n, (q, opts, _a, _w) in enumerate(MCQ, 1):
        f.append(Paragraph("<b>%d.</b> %s" % (n, q), S["q"]))
        for i, o in enumerate(opts):
            f.append(Paragraph("%s) %s" % (letters(i), o), S["opt"]))
        f.append(Spacer(1, 4))

    f.append(PageBreak())

    f.append(Paragraph("Section 2 &mdash; True or False", S["sec"]))
    f.append(Paragraph("Write T or F in the box. 8 marks, about 6 minutes.", S["secnote"]))
    rows = [[Paragraph("<b>%d.</b> %s" % (n, s), S["q"]), ""]
            for n, (s, _a, _w) in enumerate(TF, 1)]
    t = Table(rows, colWidths=[148 * mm, 17 * mm])
    t.setStyle(TableStyle([
        ("BOX", (1, 0), (1, -1), 0.5, RULE),
        ("INNERGRID", (1, 0), (1, -1), 0.5, RULE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    f.append(t)

    f.append(Paragraph("Section 3 &mdash; Code Output and Tracing", S["sec"]))
    f.append(Paragraph("Write the EXACT output. Spaces matter. 12 marks, "
                       "about 17 minutes.", S["secnote"]))
    for n, (snippet, _out, _w) in enumerate(TRACE, 1):
        f.append(Paragraph("<b>%d.</b> What is printed?" % n, S["q"]))
        f.append(code(snippet))
        f.append(lines(2))
        f.append(Spacer(1, 7))

    f.append(Paragraph("<b>7.</b> This script has <b>three</b> faults. Name each one "
                       "and give the correction.", S["q"]))
    f.append(code(ERRORQ))
    f.append(lines(4))

    f.append(PageBreak())

    f.append(Paragraph("Section 4 &mdash; Main Algorithmic and Coding Exercise", S["sec"]))
    f.append(Paragraph("20 marks, about 25 minutes. All three deliverables are "
                       "required.", S["secnote"]))
    f.append(Paragraph(SCENARIO, S["q"]))
    f.append(Spacer(1, 3))
    f.append(Paragraph("<b>Grades:</b> " + GRADES, S["q"]))
    f.append(Spacer(1, 8))

    f.append(Paragraph("<b>(a) Pseudocode</b> &nbsp; <i>5 marks</i>", S["q"]))
    f.append(lines(9))
    f.append(Spacer(1, 6))
    f.append(Paragraph("<b>(b) Flowchart</b> &nbsp; <i>5 marks</i> &mdash; show the "
                       "inputs, the decisions and the loop.", S["q"]))
    f.append(box(92, "draw here"))
    f.append(PageBreak())
    f.append(Paragraph("<b>(c) PHP code</b> &nbsp; <i>10 marks</i> &mdash; include "
                       "inline // comments and a PHPDoc block (/** ... */).", S["q"]))
    f.append(lines(26))

    document(path, "MIT320 Partial I mock exam  -  question paper").build(f)


def build_solutions(path):
    f = []
    header(f, "Partial I &nbsp;&middot;&nbsp; <b>MOCK EXAM &mdash; SOLUTIONS</b> "
              "&nbsp;&middot;&nbsp; for the tutor")
    f.append(Paragraph("Every traced output in Section 3 was produced by running the "
                       "snippet through PHP 8.2, not by reading it. Where PHP 8 "
                       "changed a behaviour that older notes still teach, it is "
                       "called out.", S["secnote"]))

    f.append(Paragraph("Section 1 &mdash; Multiple Choice", S["sec"]))
    for n, (q, opts, a, why) in enumerate(MCQ, 1):
        f.append(Paragraph("<b>%d.</b> %s" % (n, q), S["q"]))
        f.append(Paragraph("%s) %s" % (letters(a), opts[a]), S["ans"]))
        f.append(Paragraph(why, S["why"]))

    f.append(Paragraph("Section 2 &mdash; True or False", S["sec"]))
    for n, (s, a, why) in enumerate(TF, 1):
        f.append(Paragraph("<b>%d.</b> %s" % (n, s), S["q"]))
        f.append(Paragraph("TRUE" if a else "FALSE", S["ans"]))
        f.append(Paragraph(why, S["why"]))

    f.append(PageBreak())
    f.append(Paragraph("Section 3 &mdash; Code Output and Tracing", S["sec"]))
    for n, (snippet, out, why) in enumerate(TRACE, 1):
        f.append(Paragraph("<b>%d.</b>" % n, S["q"]))
        f.append(code(snippet))
        f.append(Paragraph("Output:", S["q"]))
        f.append(code(out))
        f.append(Paragraph(why, S["why"]))

    f.append(Paragraph("<b>7.</b> The three faults:", S["q"]))
    for e in ERRORS:
        f.append(Paragraph("&bull; " + e, S["ans"]))
    f.append(Paragraph("Only the first stops the script from parsing. The other two "
                       "run happily and give a wrong answer, which is the point of "
                       "the question.", S["why"]))

    f.append(PageBreak())
    f.append(Paragraph("Section 4 &mdash; Main Exercise", S["sec"]))
    f.append(Paragraph(SCENARIO, S["q"]))
    f.append(Spacer(1, 6))
    f.append(Paragraph("<b>(a) Pseudocode</b>", S["q"]))
    f.append(code(SOL_PSEUDO))
    f.append(Paragraph("<b>(b) Flowchart</b>", S["q"]))
    f.append(code(SOL_FLOW))
    f.append(PageBreak())
    f.append(Paragraph("<b>(c) PHP</b>", S["q"]))
    f.append(code(SOL_PHP))

    f.append(Paragraph("Marking", S["sec"]))
    rows = [[Paragraph("<b>What</b>", S["q"]), Paragraph("<b>Marks</b>", S["q"]),
             Paragraph("<b>Look for</b>", S["q"])]]
    for what, marks, look in MARKING:
        rows.append([Paragraph(what, S["q"]), Paragraph(str(marks), S["q"]),
                     Paragraph(look, S["q"])])
    t = Table(rows, colWidths=[32 * mm, 16 * mm, 117 * mm])
    t.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.4, RULE),
        ("BACKGROUND", (0, 0), (-1, 0), CODE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    f.append(t)

    f.append(Paragraph("Say these out loud before she sits it", S["sec"]))
    for tip in TIPS:
        f.append(Paragraph("&bull; " + tip, S["q"]))

    document(path, "MIT320 Partial I mock exam  -  SOLUTIONS, do not hand out").build(f)



# ------------------------------------------------- the same thing, for the web
def md_escape(t):
    return t.replace("&mdash;", "-").replace("&nbsp;", " ").replace("&middot;", "·") \
            .replace("&ndash;", "-").replace("&bull;", "-").replace("<b>", "**") \
            .replace("</b>", "**").replace("<i>", "*").replace("</i>", "*")


def write_markdown():
    """The paper and the key as course pages, from the same questions the
    PDFs are printed from - so the web copy cannot drift from the handout."""
    q = ["# MIT320 Partial I - Mock Exam",
         "",
         "Lessons 1 to 3 &middot; 60 minutes &middot; 50 marks. Sit it with no notes "
         "and no computer, then mark it from the answers page.",
         "",
         "> There is a printable PDF of this paper, and a separate one with the "
         "answers, built by `scripts/build-mock-exam.py`.",
         "",
         "## Section 1 - Multiple Choice",
         "", "*Circle one. 10 marks, about 12 minutes.*", ""]
    for n, (text, opts, _a, _w) in enumerate(MCQ, 1):
        q.append("**%d.** %s" % (n, md_escape(text)))
        q.append("")
        for i, o in enumerate(opts):
            q.append("- %s) %s" % ("abcd"[i], md_escape(o)))
        q.append("")

    q += ["## Section 2 - True or False", "", "*8 marks, about 6 minutes.*", ""]
    for n, (text, _a, _w) in enumerate(TF, 1):
        q.append("**%d.** %s" % (n, md_escape(text)))
    q.append("")

    q += ["## Section 3 - Code Output and Tracing", "",
          "*Write the EXACT output. Spaces matter. 12 marks, about 17 minutes.*", ""]
    for n, (snippet, _o, _w) in enumerate(TRACE, 1):
        q += ["**%d.** What is printed?" % n, "", "```php", "<?php", snippet, "```", ""]
    q += ["**7.** This script has **three** faults. Name each one and give the "
          "correction.", "", "```php", ERRORQ, "```", ""]

    q += ["## Section 4 - Main Algorithmic and Coding Exercise", "",
          "*20 marks, about 25 minutes. All three deliverables are required.*", "",
          md_escape(SCENARIO), "",
          "**Grades:** " + md_escape(GRADES), "",
          "**(a) Pseudocode** - 5 marks", "",
          "**(b) Flowchart** - 5 marks, showing the inputs, the decisions and the loop", "",
          "**(c) PHP code** - 10 marks, with inline `//` comments and a PHPDoc "
          "block (`/** ... */`)", ""]

    a = ["# Mock Exam - Answers", "",
         "Every traced output in Section 3 was produced by running the snippet "
         "through PHP 8.2, not by reading it. Where PHP 8 changed a behaviour that "
         "older notes still teach, it is called out.", "",
         "## Section 1 - Multiple Choice", ""]
    for n, (text, opts, ans, why) in enumerate(MCQ, 1):
        a += ["**%d.** %s" % (n, md_escape(text)),
              "", "**%s) %s**" % ("abcd"[ans], md_escape(opts[ans])),
              "", md_escape(why), ""]

    a += ["## Section 2 - True or False", ""]
    for n, (text, ans, why) in enumerate(TF, 1):
        a += ["**%d.** %s" % (n, md_escape(text)),
              "", "**%s** - %s" % ("TRUE" if ans else "FALSE", md_escape(why)), ""]

    a += ["## Section 3 - Code Output and Tracing", ""]
    for n, (snippet, out, why) in enumerate(TRACE, 1):
        a += ["**%d.**" % n, "", "```php", "<?php", snippet, "```", "",
              "Output:", "", "```", out, "```", "", md_escape(why), ""]
    a += ["**7.** The three faults:", ""]
    for e in ERRORS:
        a.append("- " + md_escape(e))
    a += ["", "Only the first stops the script from parsing. The other two run "
          "happily and give a wrong answer, which is the point of the question.", ""]

    a += ["## Section 4 - Main Exercise", "", md_escape(SCENARIO), "",
          "### (a) Pseudocode", "", "```", SOL_PSEUDO, "```", "",
          "### (b) Flowchart", "", "```", SOL_FLOW, "```", "",
          "### (c) PHP", "", "```php", SOL_PHP, "```", "",
          "### Marking", "", "| What | Marks | Look for |", "|---|---|---|"]
    for what, marks, look in MARKING:
        a.append("| %s | %d | %s |" % (what, marks, md_escape(look)))
    a += ["", "### Say these out loud before she sits it", ""]
    for tip in TIPS:
        a.append("- " + md_escape(tip))
    a.append("")

    for name, body in (("mock-exam.md", q), ("mock-exam-answers.md", a)):
        p = os.path.join(OUT, name)
        io.open(p, "w", encoding="utf-8", newline="\n").write("\n".join(body))
        print("  %7.1f KB  %s" % (os.path.getsize(p) / 1024, p))


def main():
    os.makedirs(OUT, exist_ok=True)
    paper = os.path.join(OUT, "MIT320-Partial-I-Mock-Exam.pdf")
    sols = os.path.join(OUT, "MIT320-Partial-I-Mock-Exam-SOLUTIONS.pdf")
    build_paper(paper)
    build_solutions(sols)
    write_markdown()
    for p in (paper, sols):
        print("  %7.1f KB  %s" % (os.path.getsize(p) / 1024, p))


if __name__ == "__main__":
    main()
