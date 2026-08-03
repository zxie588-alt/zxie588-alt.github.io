/* Theme handling: dark/light with persistence + system-preference default.
   Runs synchronously in <head> so data-theme is set before first paint
   (no flash), then injects the nav toggle button once the DOM is ready. */
(function () {
  var root = document.documentElement;

  function resolveInitial() {
    try {
      var stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
    } catch (e) {}
    try {
      if (window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch (e) {}
    return "light";
  }

  // Apply immediately to avoid a flash of the wrong theme.
  root.setAttribute("data-theme", resolveInitial());

  function buildToggle() {
    var nav = document.querySelector(".nav-links");
    if (!nav || document.querySelector(".theme-toggle")) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Toggle dark mode");
    btn.title = "Toggle dark / light mode";

    function sync() {
      var dark = root.getAttribute("data-theme") === "dark";
      btn.textContent = dark ? "☀" : "☾"; // sun when dark (to go light), moon when light
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
    }

    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });

    sync();
    nav.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildToggle);
  } else {
    buildToggle();
  }
})();
