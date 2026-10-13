# Practice — the same question, eight more times

Every one of these is the circle exercise wearing different clothes: **a form,
a number or two, a choice of buttons, and an answer that prints the formula as
well as the result.** If you can do the circle, you can do all eight. If you
cannot do these, you cannot really do the circle.

For each one, hand in the four parts:

1. **Pseudocode** — CAPITALS, `<--`, `IF ... THEN ... ELSE ... ENDIF`
2. **Flowchart** — on paper, Start and Stop, every branch labelled
3. **HTML form** — the inputs and the buttons
4. **PHP script** — reads `$_POST`, calculates, echoes the formula and the answer

Copy `template.php` and work inside it. The expected numbers are given so you
can check yourself — if your answer differs in the third decimal place, you
rounded somewhere you should not have.

---

## 1. Rectangle calculator

Enter a **length** and a **width**. Buttons: **Area**, **Perimeter**,
**Diagonal**, **Clear**.

- Area = L × W
- Perimeter = 2 × (L + W)
- Diagonal = √(L² + W²) &nbsp; — `sqrt()` and `pow()`

**Check with L = 8, W = 5**

```
Shape: Rectangle
Length: 8   Width: 5
Area = L x W = 40
Perimeter = 2 x (L + W) = 26
Diagonal = sqrt(L^2 + W^2) = 9.4339811320566
```

---

## 2. Triangle calculator

Enter a **base** and a **height** for the area, or **three sides** for the
perimeter. Buttons: **Area**, **Perimeter**, **Clear**.

- Area = ½ × b × h
- Perimeter = a + b + c
- Harder, if you want it: Heron's area = √(s(s−a)(s−b)(s−c)) where s = (a+b+c)/2

**Check with b = 10, h = 6** → Area = 30
**Check with a = 3, b = 4, c = 5** → Perimeter = 12, Heron's area = 6

---

## 3. Cylinder calculator

Enter a **radius** and a **height**. Buttons: **Volume**, **Curved surface**,
**Total surface**, **Clear**.

- Volume = π r² h
- Curved surface = 2 π r h
- Total surface = 2 π r (r + h)

**Check with r = 3, h = 7**

```
Shape: Cylinder
Radius: 3   Height: 7
Volume = PI x r^2 x h = 197.92033717616
Curved surface = 2 x PI x r x h = 131.94689145077
Total surface = 2 x PI x r x (r + h) = 188.49555921539
```

---

## 4. Cone calculator

Enter a **radius** and a **height**. Buttons: **Volume**, **Slant height**,
**Total surface**, **Clear**.

- Volume = ⅓ π r² h
- Slant height l = √(r² + h²)
- Total surface = π r (r + l)

**Check with r = 3, h = 4** → Volume = 37.699111843078, slant = 5,
total surface = 75.398223686155

The slant comes out as exactly 5 because 3, 4, 5 is a right triangle. Good test
numbers are the ones where you already know the answer.

---

## 5. Temperature converter

Enter a temperature in **Celsius**. Buttons: **Fahrenheit**, **Kelvin**,
**Clear**.

- F = C × 9 / 5 + 32
- K = C + 273.15

**Check with C = 25** → 77 °F, 298.15 K
**Then check with C = −40** → −40 °F. The one temperature where both scales
agree, which is why it catches a formula written the wrong way round.

---

## 6. Interest calculator

Enter a **principal**, a **rate** and a number of **years**. Buttons:
**Simple**, **Compound**, **Clear**.

- Simple interest = P × R × T / 100
- Compound interest = P × (1 + R/100)^T − P &nbsp; — `pow()` again

**Check with P = 1000, R = 5, T = 3** → simple 150, compound 157.625

Show money with `number_format($x, 2)` so 157.625 reads as 157.63, and say in
one line why `round()` would have been wrong there.

---

## 7. Ohm's law calculator

Enter any **two** of voltage, current and resistance. Buttons: **Voltage**,
**Power**, **Resistance**, **Clear**.

- V = I × R
- P = V × I
- R = V / I  — and guard the divide by zero

**Check with I = 2, R = 10** → V = 20
**Check with V = 20, I = 2** → P = 40

---

## 8. BMI and body surface area

Enter a **weight** in kg and a **height** in metres. Buttons: **BMI**,
**Surface area**, **Clear**.

- BMI = weight ÷ height²
- Surface area (Mosteller) = √(height in cm × weight ÷ 3600)

**Check with weight = 70, height = 1.75** → BMI 22.857142857143,
surface area 1.8446619684316

Then add the band: under 18.5 Underweight, under 25 Normal, under 30
Overweight, otherwise Obese. That is the `elseif` ladder, inside the same
shape of answer.

---

## The traps that cost marks on all eight

**`type="reset"` sends nothing.** If the question wants PHP to know a button
was pressed, it must be `type="submit"` with a `name`.

**A missing `name=` sends nothing either**, and nothing warns you. `id` is for
CSS and JavaScript; the server never sees it.

**No `isset` means a warning on the first load**, before anyone has typed. The
guard is one line.

**Brackets.** `(4/3) * pi() * pow($R,3)` is right; `4/3 * pi() * pow($R,3)`
happens to be right too, but `$w / $h * $h` gives you back the weight. When in
doubt, bracket it — nobody ever lost a mark for a bracket.

**Print the formula, not just the number.** Every one of these sheets asks for
it, and it is the easiest mark in the question to drop.
