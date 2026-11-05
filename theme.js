(() => {
  const root = document.documentElement;
  const button = document.querySelector(".theme-toggle");
  const meta = document.querySelector('meta[name="theme-color"]');
  const preference = window.matchMedia("(prefers-color-scheme: dark)");

  function isDark() {
    return root.dataset.theme ? root.dataset.theme === "dark" : preference.matches;
  }

  function updateButton() {
    button.setAttribute("aria-pressed", String(isDark()));
    button.title = isDark() ? "Switch to light theme" : "Switch to dark theme";
    meta.content = getComputedStyle(root).getPropertyValue("--bg").trim();
  }

  button.addEventListener("click", () => {
    const theme = isDark() ? "light" : "dark";
    root.dataset.theme = theme;
    try {
      localStorage.setItem("msms-theme", theme);
    } catch {}
    updateButton();
  });

  preference.addEventListener("change", updateButton);
  window.addEventListener("storage", (event) => {
    if (event.key !== "msms-theme" && event.key !== null) return;
    if (event.newValue === "light" || event.newValue === "dark") {
      root.dataset.theme = event.newValue;
    } else {
      delete root.dataset.theme;
    }
    updateButton();
  });

  updateButton();
  button.hidden = false;
})();
