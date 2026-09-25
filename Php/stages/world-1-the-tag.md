# 🟢 World 1 — The Tag
### Stages 1–5 · about 20 minutes

You will not learn *programming* in this world. You'll learn **where things go**: the tag, the
quotes, the semicolon. Boring. Also the reason most beginners give up, so we do it first and
slowly.

Practice file: `stages/practice/world-1.php` — run it with `php stages/practice/world-1.php`

---

## 🟢 Stage 1 — Open the door

**🎯 Goal:** get PHP to notice your file at all.

**⌨️ The syntax**

```php
<?php
```

That's it. That's the whole stage. Every PHP file starts with those five characters.
Anything you write *before* it gets sent out as plain text; anything after it is code.

You don't need a closing `?>` if the file is only PHP. Leaving it off is actually the
professional habit — a stray blank line after `?>` causes a real bug you'll meet in lesson 8.

**✅ Clear the stage**
Open `practice/world-1.php`. Check the very first line is `<?php`. Run the file.
Nothing happens — **and that's a pass.** No error means PHP read your file happily.

**💀 If it breaks**
Seeing your code printed in the terminal like text? Your `<?php` is missing or misspelled.
It is lowercase. There is no space between `<?` and `php`.

---

## 🟢 Stage 2 — Make it speak

**🎯 Goal:** print something.

**⌨️ The syntax**

```php
echo "Hello";
```

Four pieces, and every one matters:

| Piece | What it is |
|---|---|
| `echo` | the command — "print this" |
| a space | between the command and what you're printing |
| `"Hello"` | the text, **in double quotes** |
| `;` | the full stop |

**✅ Clear the stage**
Print your own name. One line.

**💀 If it breaks**
`Parse error: syntax error, unexpected ...` → you lost a quote or the semicolon.
Look at the line number, then look at the *end* of that line.

---

## 🟢 Stage 3 — The full stop

**🎯 Goal:** understand why one missing character kills the whole page.

**⌨️ The syntax**

```php
echo "one";
echo "two";
echo "three";
```

Three statements. Three semicolons. PHP reads `;` as "this instruction is finished".
Without it, PHP glues your two lines into one nonsense instruction and refuses to run —
**and it refuses to run the whole file**, not just that line.

That's why a blank page usually means a missing `;`.

**✅ Clear the stage**
Write three `echo` lines. Run it — they all print, stuck together on one line.
Now **delete the semicolon on line 2** and run it again. Read the error carefully.
Notice it points at line **3**, not line 2 — because that's where PHP got confused.
Put it back.

> That trick — "the error says line 3, so look at line 2" — will save you hours this year.

**💀 If it breaks**
It's *supposed* to break in the middle of this stage. That's the point.

---

## 🟢 Stage 4 — New lines

**🎯 Goal:** stop everything printing on one line.

**⌨️ The syntax**

```php
echo "one\n";
echo "two\n";
```

`\n` means "new line". It only works inside **double** quotes. Inside single quotes it
prints the characters `\` and `n` literally.

**✅ Clear the stage**
Print three lines that each appear on their own row:

```
Name: <your name>
City: <your city>
Year: 2026
```

**💀 If it breaks**
Seeing a literal `\n` in your output? You used single quotes. Swap to `"` and it works.

---

## 🟢 Stage 5 — Notes to yourself

**🎯 Goal:** write something PHP ignores.

**⌨️ The syntax**

```php
// this is a comment

# this is also a comment

/*
   this comment
   covers several lines
*/
```

Comments are for humans. PHP skips them completely. You'll use them to label your work,
and — more often — to **switch a line off** without deleting it:

```php
echo "this runs";
// echo "this does not";
```

**✅ Clear the stage**
Add a comment at the top of your practice file with your name and today's date.
Then comment out one of your `echo` lines, run it, and check it disappeared.

**💀 If it breaks**
A comment can't break. If something broke, it's a leftover `;` or quote from an earlier stage.

---

## 👑 WORLD 1 BOSS

Using **only** what's in this world — `<?php`, `echo`, `"..."`, `\n`, `;`, `//` — produce
exactly this output:

```
==============================
        MY FIRST PHP
==============================
Name : <your name>
City : <your city>
==============================
```

Rules: one comment at the top saying what the file does, and every line of output must come
from its own `echo`.

**Cleared it?** Tick World 1 in `../stages.html` and go to World 2.

---

◀ [back to the map](README.md) · ▶ [World 2 — Boxes](world-2-boxes.md)
