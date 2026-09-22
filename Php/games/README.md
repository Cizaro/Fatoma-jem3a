# 🎮 The Games

Not decoration. Every one of these drills something you'll be marked on — they're just
built so it doesn't feel like revision.

---

## 🕹 PHP Arcade — `php-arcade.html`
**Just double-click it. No server, no internet.**

Six games, **133 questions**, and it remembers your XP and badges between sessions.

| Game | What it drills |
|---|---|
| 🔮 **Guess the Output** | reading code in your head before running it |
| 🐞 **Fix the Bug** | spotting the broken line — the actual skill of debugging |
| 🔗 **Match the Words** | vocabulary: functions, SQL keywords, symbols |
| ✍️ **Fill the Blank** | producing code from memory, not recognising it |
| ⚡ **Speed Round** | 45 seconds, true or false, no thinking time |
| 🧩 **Code Builder** | putting lines in the order they must run |

You earn **XP** for every right answer, level up from *Newborn* to *Legend*, and unlock
**8 badges** — including ⭐ First Blood, 🔥 On Fire (5 in a row), 💎 Flawless, and
👑 PHP Royalty at 1000 XP.

> Adding your own questions is easy — the question lists are at the top of the `<script>`
> block with a comment showing the shape. Copy one, change the words.

---

## 🗝 PHP Quest — `php-quest.php`
**Needs the server.** `php -S localhost:8000` then open `/games/php-quest.php`

You're locked in the server room. **Seven doors.** Each one opens only when you can read
the code on the wall. Collect the keys, get out.

Get one wrong twice and the door gives you a hint. Nobody stays stuck.

The doors go in course order — door 1 is `echo`, door 5 is the `=` vs `==` bug,
door 7 is `htmlspecialchars()`. If you can escape, you know the course.

> **Add an eighth door.** The `$ROOMS` array is at the top of the file. Copy one room,
> change the words. The progress dots, the keys and the ending all count themselves.

---

## 🎯 Guess the Number — `guess-number.php`
**Needs the server.**

PHP picks a number from 1 to 100 and you have to find it. Simple — but it teaches you
**binary search**: always guess the middle, and you can find *any* number in 7 tries maximum.

That's not a party trick. It's why a database can find one row among a million instantly.

Read the code afterwards: `$_SESSION` is how PHP remembers the secret number even though
the page completely reloads after every guess.

---

## 💀 Hangman — `hangman.php`
**Needs the server.**

Guess the programming word before the drawing finishes. 14 words, all from the course.

The code has a trap in it worth finding: `strpos()` returns `0` when the letter is the
**first** one — and `0` is falsy. That's why the code says `=== false` and not `!`.
This exact bug catches professional developers.

---

## 🃏 Flashcards — `../flashcards.html`
**Double-click it.** Not in this folder — it's one level up, with the course.

**102 cards in 6 decks.** Cards you get wrong come back until you've got them right twice.
There's a *"only the ones I keep missing"* button, which is the one you'll use most.

---

## How to use these properly

- **10 minutes of arcade beats 40 minutes of re-reading.** Recall is what builds memory;
  re-reading just feels productive.
- Play the round that matches the lesson you just did — each `lesson.md` names one at the bottom.
- **Play before the quiz, not instead of it.**
- Beat your own score. Then beat your instructor's. 😏
