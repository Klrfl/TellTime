export function getTheme() {
  const theme = localStorage.getItem("theme-preference");

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  if (theme !== "dark" && theme !== "light") {
    if (prefersDark.matches) {
      localStorage.setItem("theme-preference", "dark");
    } else {
      localStorage.setItem("theme-preference", "light");
    }
  }

  return localStorage.getItem("theme-preference");
}
