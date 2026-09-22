# Lesson 1 — echo, Variables, Comments

## 1. `echo` — how PHP talks

`echo` means "print this out".

```php
<?php
echo "Hello world";
```

Two small things that matter:

- `"Hello world"` is a **string** — text wrapped in quotes.
- The `;` at the end ends the statement. Like a full stop in a sentence.

`\n` inside double quotes means "new line":

```php
echo "Line one\n";
echo "Line two\n";
```

## 2. Variables — boxes with names

A variable stores a value so you can use it later.

```php
$name = "Fatima";
$age  = 20;
```

Rules for variable names:

| Rule | Good | Bad |
|---|---|---|
| Must start with `$` | `$name` | `name` |
| After `$`: letter or `_` | `$age`, `$_id` | `$2days` |
| No spaces | `$first_name` | `$first name` |
| **Case sensitive** | `$name` and `$Name` are two *different* variables | |

`=` means **"put into"**, not "equals". Read `$age = 20;` as *"put 20 into age"*.

## 3. Printing variables

Three ways, all correct:

```php
$name = "Fatima";

echo $name;                      // just the variable
echo "Hello " . $name;           // . glues strings together (concatenation)
echo "Hello $name";              // inside DOUBLE quotes, PHP reads the variable
```

⚠️ **Single quotes don't read variables:**

```php
echo "Hello $name";   // Hello Fatima
echo 'Hello $name';   // Hello $name      <- literally!
```

Remember: **double quotes = smart, single quotes = literal.**

## 4. Comments — notes for humans

PHP ignores these. They're for you and your teacher.

```php
// one-line comment

# also a one-line comment

/*
   multi-line
   comment
*/
```

Use them to explain **why**, not what. `// add 1 to i` is useless. `// skip the header row` is useful.

## 5. Changing a variable

A variable holds the **last** thing you put in it:

```php
$x = 5;
$x = 9;
echo $x;   // 9   — the 5 is gone forever
```

---

## Watch out ⚠️

| Mistake | What happens |
|---|---|
| Forgetting `;` | `Parse error` — whole page dies |
| Forgetting `$` | `Undefined constant` error |
| `echo 'Hi $name'` | prints `$name` literally |
| `$Name` vs `$name` | two different boxes |

---

➡️ Run `examples.php`, then do `exercises.php`.

---

## 💡 Did you know

PHP was not designed to be a language. In 1994 a man called **Rasmus Lerdorf** wrote a few
small tools to count who was visiting his online CV. He called them *Personal Home Page Tools* —
that is what the P, H and P originally stood for.

Thirty years later, roughly **three quarters** of all websites whose server language is known
are running PHP. Wikipedia runs on it. WordPress runs on it. Facebook was built on it.

Every one of them starts with the same `echo` you just typed.

## 🎮 Play with it

1. **Break it on purpose.** Delete one `;` and run the file. Read the error. Put it back.
   Now you have seen the error you will meet a hundred more times — and you met it on your terms.
2. **The quote experiment.** Make `$food = "manakish";` then print it four ways:
   `echo $food;` · `echo "I want $food";` · `echo 'I want $food';` · `echo "I want " . $food;`
   Three of them do what you expect. One does not. That's the lesson.
3. **ASCII art.** Use `echo` and `str_repeat()` to draw your initials out of `#` characters.
   Silly, but you will never forget `str_repeat` again.

## 🏆 Boss challenge

Make a **receipt** that prints like this, using only variables and `echo`:

```
==============================
  CAFE PHP
==============================
  Coffee        x2     6.00
  Manakish      x1     4.50
------------------------------
  TOTAL               10.50
==============================
```

Everything must come from variables — no typing the numbers into the text.

## ▶ Practise this lesson

`games/php-arcade.html` → **Match the Words** ·
`flashcards.html` → deck 1 *Syntax & symbols* · `quizzes/mini-quizzes/lesson-01.md`
