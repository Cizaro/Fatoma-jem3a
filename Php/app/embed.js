/* ---------------------------------------------------------------
   Loaded by every page that can appear inside the app shell.

   Standalone, it does nothing visible. Inside the shell it hides the
   page's own header, footer and theme button (the rail already has
   them), and keeps the theme in step with the shell.

   Keeping the pages standalone matters: they still work opened on
   their own from the repo folder, which is how they get tested.
--------------------------------------------------------------- */
(function () {
  var embedded = false;
  try { embedded = window.self !== window.top; } catch (e) { embedded = true; }

  function applyTheme(t) {
    if (t === "dark" || t === "light") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }

  // the shell and every page share one theme key
  try {
    var saved = localStorage.getItem("course_theme");
    if (saved) applyTheme(saved);
  } catch (e) {}

  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!d || !d.course) return;
    if ("theme" in d) applyTheme(d.theme);
  });

  if (!embedded) return;

  document.documentElement.classList.add("embedded");

  var css = document.createElement("style");
  css.textContent =
    /* the shell supplies the chrome, so the page drops its own */
    ".embedded body > header, .embedded .wrap > header, .embedded footer," +
    ".embedded .theme-btn, .embedded #themeBtn { display: none !important; }" +
    ".embedded body { padding-top: 6px; }" +
    /* the frame scrolls, so the page should not fight it for height */
    ".embedded html, .embedded body { height: auto; }";
  document.head.appendChild(css);

  // a lesson link becomes a rail move, so the shell stays in charge of
  // where you are instead of a page loading inside a page
  var LESSON = /(?:^|\/)app\/lessons\/([a-z]+)\.html$/;

  // links that leave this page should move the shell, not nest a frame
  var MAP = {
    "index.html": "home", "../index.html": "home",
    "roadmap.html": "roadmap", "../roadmap.html": "roadmap",
    "flashcards.html": "cards", "../flashcards.html": "cards",
    "stages.html": "stages", "../stages.html": "stages",
    "code-lab.html": "lab", "../code-lab.html": "lab",
    "exam-simulator.html": "exam", "../exam-simulator.html": "exam",
    "games/php-arcade.html": "arcade", "../games/php-arcade.html": "arcade"
  };
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    var raw = a.getAttribute("data-path") || a.getAttribute("href") || "";
    var lesson = LESSON.exec(raw);
    var id = lesson ? lesson[1] : MAP[raw];
    if (!id) return;
    e.preventDefault();
    parent.postMessage({ course: true, go: id }, "*");
  });
})();
