export function getTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme:dark)");

  if (prefersDark) {
    localStorage.setItem("theme-preference", "dark");
  } else {
    localStorage.setItem("theme-preference", "light");
  }

  return localStorage.getItem("theme-preference");
}
