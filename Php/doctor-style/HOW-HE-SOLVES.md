# The way your lecturer answers a question

Every question from this course gets answered in the **same four parts, in this
order**. The handwriting at the top of the exercise sheet says it outright:

> write pseudocode and flow chart and PHP code

So an answer that is only code is an incomplete answer, however well it runs.

| | Part | What it is |
|---|---|---|
| 1 | **Pseudocode** | the steps in words, CAPITALS, `<--` for "put in" |
| 2 | **Flowchart** | the same steps as shapes, Start and Stop, nothing unconnected |
| 3 | **HTML form** | the inputs and the buttons, written as plain HTML |
| 4 | **PHP script** | `<?php` under the form, reads `$_POST`, calculates, echoes |

Copy `template.php` and fill in the four parts. `radius.php` is the worked
example, and it is his own board solution.

---

## His habits, copied exactly

These are not better or worse than other ways of writing PHP. They are **his**,
and matching them is how an answer looks like it belongs in his class.

**Short capital variable names, one per quantity.**

```php
$R = $_POST["rad"];      // Radius
$A = pi() * $R * $R;     // Area
$C = 2 * pi() * $R;      // Circumference
$V = (4/3) * pi() * pow($R, 3);   // Volume
```

Not `$radius` and `$area`. He writes `$R`, `$A`, `$C`, `$V` — the letter from
the formula. On a whiteboard that is the whole reason, and it carries into the
file.

**The form first, the PHP underneath.** He does not weave `<?php ?>` through
the HTML. The page is: form, then one `<?php` block that does everything.

```html
<form action="radius.php" method="POST">
  <label> Enter the Radius </label>
  <input type="number" name="rad">
  <input type="submit" value="Calculate">
  <input type="reset" value="Clear">
</form>
<?php
  ...
```

**`<input type="submit">`, not `<button>`.** The text on the button is the
`value`. This matters: `value` is also what arrives in `$_POST` if the input
has a `name`.

**`action` names the file.** `action="radius.php"` — the file writes its own
name. (`action=""` posts to the same file and is the same thing; his way is
more explicit, and it is what he puts on the board.)

**`pi()` and `pow()`.** The sheet says so: *"pi() is a function predefined in
PHP"*. He uses `pow($R, 3)` for the cube rather than `$R*$R*$R`.

**One `echo`, joined with dots.**

```php
echo "Area = " . $A . " Circumference = " . $C . " Volume = " . $V;
```

**`$_POST["rad"]` straight into a variable**, with no `isset` on the board. He
used `isset($_POST['Sum'])` in the lecture file, so he knows it; on a quick
board answer he skips it. In a file you hand in, **put the guard in** — the
page throws a warning on its first load without it.

---

## The one fault in the board answer

The sheet asks you to *"identify which button was pressed"*. The board has:

```html
<input type="submit" value="Calculate">
<input type="reset"  value="Clear">
```

**A reset button never reaches PHP.** It is handled entirely by the browser:
it empties the boxes and no request is sent. So there is nothing for PHP to
identify, and `Clear` can never be detected server-side.

That is fine if Clear is only meant to empty the form — which is the normal
reason to use `type="reset"`. But if the question wants PHP to *know* that
Clear was pressed, it has to be a submit button with a name:

```html
<input type="submit" name="calc"  value="Calculate">
<input type="submit" name="clear" value="Clear">
```

and then `isset($_POST["calculate"])` tells them apart. That is what
`radius.php` does.

**Keep the form to exactly what the sheet lists.** This one says: an input
field for radius, a Calculate button, a Clear button. Three controls. Adding a
button per formula is not generosity, it is a different question to the one
that was asked, and the boxed example at the top of the sheet shows one
Calculate press printing all three results at once.

---

## Pseudocode, his conventions

From Lesson 1 of the module, and he marks against them:

- Keywords and variables in **CAPITALS**
- `<--` means "put this value in"
- `=` means "is this equal to", only inside a decision
- `[square brackets]` for a comment
- `IF ... THEN ... ELSE ... ENDIF`, `WHILE ... ENDWHILE`

```
START
  [the form has already been filled in]
  R <-- the radius from the form
  IF R is not a number OR R <= 0 THEN
      PRINT "enter a positive number"
  ELSE
      A <-- PI * R * R
      C <-- 2 * PI * R
      V <-- (4 / 3) * PI * R * R * R
      PRINT "Shape: Circle"
      PRINT "Radius: " , R
      PRINT "Area = PI x r^2 = " , A
  ENDIF
STOP
```

## Flowchart, his five shapes

Oval to start and stop, parallelogram for input and output, rectangle to do,
diamond to decide, arrows to connect. Nothing left dangling, and **Start and
Stop both drawn** — two marks that cost nothing.

```
            ( START )
                |
         /  read R  /            <- parallelogram, input
                |
             < R > 0 ? >         <- diamond, two ways out
            /         \
         no/           \yes
          /             \
  / print error /    [ A <-- PI*R*R ]      <- rectangle, process
          \             |
           \     [ C <-- 2*PI*R ]
            \           |
             \   [ V <-- 4/3*PI*R^3 ]
              \         |
               \  / print A, C, V /
                \       |
                 ( STOP )
```

Draw it on paper. Scan it. That is the deliverable, and no computer is needed
for it.

---

## The checklist before she hands anything in

1. Pseudocode written, in CAPITALS, with `<--`
2. Flowchart drawn, with Start **and** Stop, every branch labelled
3. HTML form with the right `name` on every input
4. `<?php` block that reads `$_POST`, calculates, and echoes
5. The output says **the formula used** as well as the result, if the sheet
   asks for it — this one does, and it is the easiest mark to drop
6. It actually runs on XAMPP without a warning
