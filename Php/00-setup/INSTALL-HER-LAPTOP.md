# Setting up her laptop — the AnyDesk checklist

**For me, not for her.** Work down this list in order. It takes about 40 minutes, most of
which is XAMPP downloading.

Target: everything in the course runs on her machine with no internet, and `git pull` brings
her my updates.

---

## What to install (4 things)

| # | What | Where | Why |
|---|---|---|---|
| 1 | **XAMPP** (PHP 8.2) | [apachefriends.org](https://www.apachefriends.org/download.html) | Apache + PHP + MySQL + phpMyAdmin in one installer. **Her uni lab uses XAMPP**, so this matches her exam environment. |
| 2 | **VS Code** | [code.visualstudio.com](https://code.visualstudio.com/) | The editor. |
| 3 | **PHP Intelephense** | VS Code extension | Underlines her mistakes *before* she runs the file. Cuts her error rate massively in week 1. |
| 4 | **Git for Windows** | [git-scm.com](https://git-scm.com/download/win) | So `git pull` gets her my updates instead of me re-sending a zip. |

That's it. **No Composer, no Node, no Docker.** She doesn't need them for this course and
every extra thing is another thing that can break.

> **Version note:** pick the XAMPP build with **PHP 8.2** (8.3 is fine too). The whole course
> was written and tested against PHP 8.2.12. Avoid anything PHP 7 — the lessons use `?:`
> null-coalescing and PHP 8 comparison rules, and old PHP will behave differently in ways
> that will confuse her.

---

## Install order and settings

### 1. XAMPP

- Install to **`C:\xampp`** (the default). **Do not** put it in `Program Files` — the
  permissions cause weird failures later.
- In the components screen you only need: **Apache**, **MySQL**, **PHP**, **phpMyAdmin**.
  Untick Filezilla, Mercury and Tomcat.
- If Windows Defender / the firewall asks, **allow it on private networks**.

**Then start it once and check:** open the XAMPP Control Panel, press **Start** on Apache
and on MySQL. Both should go green.

<details>
<summary><b>If Apache won't start</b> — the two usual causes</summary>

**Port 80 is taken** (usually by IIS, Skype, or VMware). In the control panel:
`Config → Apache (httpd.conf)`, change `Listen 80` to `Listen 8080` and
`ServerName localhost:80` to `localhost:8080`. Everything below then uses
`http://localhost:8080/...` instead.

**Port 3306 taken for MySQL** — she has another MySQL already. Easiest fix is to uninstall
the other one; she won't need two.
</details>

### 2. Put PHP on the PATH

Lessons 1–7 are run from a terminal with `php file.php`. Without this, that command
doesn't exist.

- Windows key → type `environment` → **Edit the system environment variables**
- **Environment Variables** → under *System variables* select **Path** → **Edit** → **New**
- Add: `C:\xampp\php`
- OK out of all three dialogs, then **open a new terminal** (old ones keep the old PATH)

**Check:** `php -v` should print `PHP 8.2.x`.

### 3. VS Code

- Install normally. **Tick "Add to PATH"** and both "Open with Code" context-menu boxes
  during setup — she'll use the right-click → Open with Code a lot.
- Extensions (the blocks icon in the left bar, or `Ctrl+Shift+X`):
  - **PHP Intelephense** — by Ben Mewburn. The important one.
  - *(optional)* **Error Lens** — puts the error text on the line itself instead of
    hiding it in the Problems panel. Genuinely helps a beginner.

### 4. Git, and get the course

Install Git with all defaults. Then, in a terminal:

```bash
cd C:\xampp\htdocs
git clone https://github.com/Cizaro/Fatoma-jem3a.git fatoma
```

**Why inside `htdocs`:** that's Apache's web folder, so the PHP lessons, the games and the
database pages all work at a `http://localhost/...` address with nothing else to set up.

> It's a public repo, so cloning needs no login. She can pull my updates but not push —
> which is what we want.

---

## Set up the database (10 minutes, do it now not at lesson 9)

With MySQL running:

1. Open **http://localhost/phpmyadmin**
2. **Import** tab → Choose File → `C:\xampp\htdocs\fatoma\Php\09-mysql\school.sql` → **Go**
3. Import again with `C:\xampp\htdocs\fatoma\Php\10-dynamic-page\courses.sql`

You should end up with two databases in the left sidebar: **school** and **mini_site**.

Doing this now means lesson 9 starts with working code instead of 20 minutes of setup.

---

## Verify everything (run through all six)

| # | Do this | Should give |
|---|---|---|
| 1 | Terminal: `php -v` | `PHP 8.2.x` |
| 2 | Terminal: `php C:\xampp\htdocs\fatoma\Php\00-setup\hello.php` | a greeting, no errors |
| 3 | Browser: **http://localhost/fatoma/Php/app/** | the course app, with the rail on the left |
| 4 | Browser: **http://localhost/fatoma/Php/games/php-quest.php** | the escape room, door 1 of 7 |
| 5 | Browser: **http://localhost/fatoma/Php/09-mysql/02-select.php** | a table of 5 students |
| 6 | Double-click `Php\code-lab.html` in Explorer | the code lab opens, Run works |

If #5 fails, MySQL isn't running or the import didn't happen. If #3 works but #5 doesn't,
everything except the database is fine.

---

## Three small things that save her hours

### Show file extensions
File Explorer → **View** → tick **File name extensions**.

Without this she cannot tell `form.php` from `form.php.txt`, and Notepad silently creates the
second one. This wastes an entire evening the first time it happens, every time.

### Desktop shortcuts
Make two on her desktop:
- **PHP Course** → `http://localhost/fatoma/Php/app/`
- **XAMPP Control Panel** → `C:\xampp\xampp-control.exe`

She has to start Apache and MySQL before the course pages work, so put the control panel
somewhere she'll see it.

### Pin the folder in VS Code
Open VS Code → `File → Open Folder` → `C:\xampp\htdocs\fatoma` → then
`File → Preferences → Settings`, search `restore`, and make sure it reopens the last folder.
She should never have to go hunting for the folder.

---

## How she gets my updates afterwards

Put this in a note on her desktop:

```bash
cd C:\xampp\htdocs\fatoma
git pull
```

That's the whole thing. It overwrites nothing she has written **as long as** her own work
lives outside the repo — so tell her: **her own practice files go in a folder of her own**,
for example `C:\xampp\htdocs\fatoma-my-work\`, not inside the course folder.

> If she ever does edit a course file and `git pull` complains, the fix is
> `git stash` then `git pull`. Don't teach her that on day one.

---

## What she does NOT need

- **Composer** — comes later, in the advanced phase. Not now.
- **Node / npm** — never, for this course.
- **A GitHub account** — the repo is public; cloning is read-only.
- **Internet** — once this is done, every page, game and exercise runs offline. Two small
  caveats: the pages pull their fonts from Google Fonts, so offline they fall back to the
  system font (it still looks fine, just plainer), and the YouTube links in
  `resources/youtube.md` obviously need a connection.

---

## Where to point her first

Once it all works, open **http://localhost/fatoma/Php/app/** and leave it on her screen.

Then, in this order:
1. **Lesson 0A — Algorithms** (no PHP at all; it's what her lecturer starts with)
2. **`stages.html`** if she's never typed code — 30 three-minute syntax stages
3. **`code-lab.html`** to actually write and run code with instant marking

And take `quizzes/quiz-00-intro.md` with her on the first call. It has no code in it and it
tells you what she already knows.
