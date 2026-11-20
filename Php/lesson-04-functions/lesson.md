# Lesson 04 — Create and use user-defined PHP functions

His six objectives for the chapter, in his order:

1. Why functions?
2. Built-in functions (String and Math)
3. Define and choose function names
4. Return values and arguments
5. Calling by value and reference
6. Variable scope

Every output on this page was produced by **running** the code on PHP 8.2,
including each of his own slide examples.

---

## 1. Why functions?

His two lines:

> PHP has lots of built-in functions that we use all the time.
> We write our own functions when our code reaches a certain level of
> complexity.

And his four rules for deciding:

- **Organise your code into "paragraphs"** — capture a complete thought and
  *name it*.
- **Don't repeat yourself** — make it work once and then reuse it.
- **If something gets too long or complex**, break it into logical chunks and
  put those chunks in functions.
- **Make a library** of the common things you do over and over.

### The use case — three students, one grade rule

This is the "don't repeat yourself" rule with a number attached to it.

**Without a function.** The grade ladder is copied once per student:

```php
$rana = 17; $sara = 11; $lina = 11;

if($rana >= 18){ $g = "A"; } else if($rana >= 16){ $g = "B"; }
else if($rana >= 14){ $g = "C"; } else if($rana >= 10){ $g = "D"; } else { $g = "F"; }
echo "Rana : ".$rana." grade ".$g."\n";

if($sara >= 18){ $g = "A"; } else if($sara >= 16){ $g = "B"; }
else if($sara >= 14){ $g = "C"; } else if($sara >= 10){ $g = "D"; } else { $g = "F"; }
echo "Sara : ".$sara." grade ".$g."\n";

if($lina >= 18){ $g = "A"; } else if($lina >= 16){ $g = "B"; }
else if($lina >= 14){ $g = "C"; } else if($lina >= 10){ $g = "D"; } else { $g = "F"; }
echo "Lina : ".$lina." grade ".$g."\n";
```

**With a function.** The ladder is written once:

```php
function letterGrade($mark){
    if($mark >= 18){ return "A"; }
    if($mark >= 16){ return "B"; }
    if($mark >= 14){ return "C"; }
    if($mark >= 10){ return "D"; }
    return "F";
}

$rana = 17; $sara = 11; $lina = 11;
echo "Rana : ".$rana." grade ".letterGrade($rana)."\n";
echo "Sara : ".$sara." grade ".letterGrade($sara)."\n";
echo "Lina : ".$lina." grade ".letterGrade($lina)."\n";
```

Both print exactly the same thing:

```
Rana : 17 grade B
Sara : 11 grade D
Lina : 11 grade D
```

So far the function has bought nothing. **The second version is even a line
longer.** Here is where it pays.

### Now the university raises the pass mark from 10 to 12

**With the function**, you change one character, on one line. Done.

**Without it**, you have to find all three copies and change each one. Change
two and miss the third — which is exactly what happens at 1am — and this is
what the page prints:

```
Rana : 17 grade B
Sara : 11 grade F
Lina : 11 grade D
```

**Sara and Lina both scored 11. Sara gets an F and Lina gets a D.** The same
mark, two different grades, on the same page, and nothing crashed to tell you.

That is the real argument for functions. Not that they are shorter — with
three students they are not. It is that **a rule written once cannot
disagree with itself.**

> The more students, the more one-sided it gets. With five students the
> function version is shorter *and* safer. With one student it is neither,
> which is why he says "when our code reaches a certain level of complexity".

---

## 2. Built-in functions

> PHP programming language has more than **1,000 built-in functions**.

His reasons for looking for one before writing your own:

- Using someone else's **tested** code saves significant development time.
- You can be confident it is **significantly less prone to error**.

They are all listed at `php.net/manual/en/indexes.functions.php`.

### His own example, and what it really prints

```php
echo strrev(" .dlrow olleH");
echo str_repeat("Hip ", 2);
echo strtoupper("hooray!");
echo strlen("intro");
echo "\n";
```

The slide shows the four answers on separate lines:

```
Hello world.
Hip Hip
HOORAY!
5
```

Run it exactly as written and you get them **all on one line**:

```
Hello world. Hip Hip HOORAY!5
```

because there is only one `"\n"` and it is at the end. The slide is showing
you what each function returns, not the literal screen output. Worth knowing
if he asks for the exact output.

| Function | What it does | Example | Result |
|---|---|---|---|
| `strrev()` | reverses a string | `strrev("abc")` | `cba` |
| `str_repeat()` | repeats a string | `str_repeat("Hip ", 2)` | `Hip Hip ` |
| `strtoupper()` | to capitals | `strtoupper("hooray!")` | `HOORAY!` |
| `strlen()` | how many characters | `strlen("intro")` | `5` |

> The String and Math function tables on his slides 13–18 are **pictures**,
> so their text could not be pulled out of the PDF. Ask him for the list, or
> read it off the slides — do not assume this page has them all.

---

## 3. Defining your own, and naming them

> We use the `function` keyword to define a function, we name the function
> and take optional argument variables. The body of the function is in a
> block of code `{ }`.

```php
function greet() {
    print "Hello\n";
}
greet();
greet();
```

```
Hello
Hello
```

### Choosing function names — his four rules

- Much like variable names, **but they do not start with a dollar sign**.
- Start with a **letter or underscore**, then letters, numbers and underscores.
- **Avoid built-in function names.**
- **Case does not matter** — *but please do not take advantage of this.*

That third rule is the one with teeth. `MixedCase()` and `mixedcase()` really
do call the same function — I checked — but write the name the same way every
time anyway.

**Watch this difference:** a *variable* is case **sensitive** (`$Name` and
`$name` are two different variables), a *function* is case **insensitive**.
That pair is exam material.

---

## 4. Return values and arguments

### Return

> Often a function will take its arguments, do some computation, and return a
> value to be used as the value of the function call in the calling
> expression. The `return` keyword is used for this.

```php
function greeting() {
    return "Hello";
}
print greeting() . " Glenn\n";
print greeting() . " Sally\n";
```

```
Hello Glenn
Hello Sally
```

**`print` and `return` are not the same thing.** `print` puts it on the
screen; `return` hands it back to whoever called the function, and they
decide what to do with it. `greet()` above printed. `greeting()` here
returns — which is why the ` . " Glenn"` can be joined onto it.

### Arguments

```php
function howdy($lang) {
    if ( $lang == 'es' ) return "Hola";
    if ( $lang == 'fr' ) return "Bonjour";
    return "Hello";
}
print howdy('es') . " Glenn\n";
print howdy('fr') . " Sally\n";
```

```
Hola Glenn
Bonjour Sally
```

Note there is no `else` anywhere. **`return` leaves the function
immediately**, so once one of them fires nothing below it can run. The last
`return "Hello"` is the default.

### Optional arguments

> Arguments can have defaults, and so can be omitted.

```php
function howdy($lang='es') {
    if ( $lang == 'es' ) return "Hola";
    if ( $lang == 'fr' ) return "Bonjour";
    return "Hello";
}
print howdy() . " Glenn\n";
print howdy('fr') . " Sally\n";
```

```
Hola Glenn
Bonjour Sally
```

`howdy()` with nothing in the brackets used the default `'es'`.

---

## 5. Call by value and call by reference

This is the pair he is most likely to ask you to trace.

### Call by value — the default

> The argument variable within the function is an "alias" to the actual
> variable. But even further, the alias is to a **copy** of the actual
> variable in the function call.

```php
function double($alias) {
    $alias = $alias * 2;
    return $alias;
}
$val = 10;
$dval = double($val);
echo "Value = $val Doubled = $dval\n";
```

```
Value = 10 Doubled = 20
```

**`$val` is still 10.** The function doubled its own copy. The only way the
answer got out was through `return`.

### Call by reference — with `&`

> Sometimes we want a function to change one of its arguments, so we indicate
> that an argument is "by reference" using `( & )`.

```php
function triple(&$realthing) {
    $realthing = $realthing * 3;
}
$val = 10;
triple($val);
echo "Triple = $val\n";
```

```
Triple = 30
```

**`$val` really changed**, and there is no `return` anywhere. The `&` in
`&$realthing` is the whole difference.

| | by value | by reference |
|---|---|---|
| written | `function f($x)` | `function f(&$x)` |
| the function gets | a **copy** | the **real variable** |
| the original | unchanged | **changed** |
| gets the answer out by | `return` | changing the variable itself |

---

## 6. Variable scope

> In general, variable names used inside of function code **do not mix** with
> the variables outside of the function, to avoid unexpected side effects if
> two programmers use the same variable name in different parts of the code.
> We call this **"name spacing"** the variables.

### Normal scope — isolated

```php
function tryzap() {
    $val = 100;
}
$val = 10;
tryzap();
echo "TryZap = $val\n";
```

```
TryZap = 10
```

The `$val` inside the function and the `$val` outside it are **two different
variables that happen to share a name**. The outer one was never touched.

### Global scope — shared

```php
function dozap() {
    global $val;
    $val = 100;
}
$val = 10;
dozap();
echo "DoZap = $val\n";
```

```
DoZap = 100
```

The word `global` says "the `$val` in here is the same `$val` as out there".

> His note on the slide: *"Use this wisely, young Jedi..."*

### Global variables — use rarely

He lists three better ways to get a value in or out:

- Passing the variable in as a **parameter**
- Passing the value back as a **return value**
- Passing the variable in **by reference**

And if you must use a global, give it a long name with a unique prefix:

```php
global $LastOAuthBodyBaseString;
global $LAST_OAUTH_BODY_BASE_STRING;
```

### The one exception — superglobals

His slide says "Except for `$_GET`". The superglobals — `$_GET`, `$_POST`,
`$_SERVER` and the rest — are visible **inside** a function without writing
`global`. I checked: reading `$_GET` inside a function works with no
declaration at all.

---

## 7. Including files

> - `include "header.php";` — pull the file in here
> - `include_once "header.php";` — pull it in unless it has already been
>   pulled in before
> - `require "header.php";` — pull in the file here **and die if it is
>   missing**
> - `require_once "header.php";` — you can guess what this means...
>
> These can look like functions — `require_once("header.php");`

**The difference that matters:** `include` carries on with a warning if the
file is missing; **`require` stops the script dead**. Use `require` for
anything the page cannot work without.

**Problem 4 of the problem sheet asks for exactly this** — two files, with
`include` for the processing stage.

---

## His summary slide

- Built-in functions
- Making new functions
- Arguments — pass by value and pass by reference
- Including and requiring files
- Checking to see if functions are present

---

## What to be able to do before the next class

1. Write a function from blank that **takes an argument and returns** a value.
2. Say the difference between `print` and `return` in one sentence.
3. Trace `double()` and `triple()` and get `10 / 20` and `30`.
4. Say why `tryzap()` prints 10 and `dozap()` prints 100.
5. Split one page into two files and wire them together with `include`.
