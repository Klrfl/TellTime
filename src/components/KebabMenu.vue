<template>
  <button class="nav-link kebab-toggle">
    <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
    <span>more</span>

    <div class="overlay">
      <button class="dark-mode-toggle" @click="setTheme">dark mode</button>
      <RouterLink :to="{ name: 'About' }">About</RouterLink>
    </div>
  </button>
</template>

<script setup>
import { inject } from "vue";

let theme = inject("theme");

function setTheme() {
  if (theme === "dark") {
    theme = "light";
    localStorage.setItem("theme-preference", "light");
  } else {
    theme = "dark";
    localStorage.setItem("theme-preference", "dark");
  }

  document.body.setAttribute("data-theme", theme);
}
</script>

<style>
.kebab-toggle {
  margin-top: auto;
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0;
}

.dark-mode-toggle {
  padding: 2rem;
  user-select: none;

  position: absolute;
  top: -100%;
  right: 0;
}

.toggle {
  background: #bdbdbd;
  border-radius: 20rem;
  aspect-ratio: 2 / 1;
  position: relative;

  display: flex;
  justify-content: center;

  cursor: pointer;
}

.toggle > * {
  user-select: none;
  text-align: center;
  padding: 1.5rem;
  aspect-ratio: 1/ 1;
}

.toggle::before {
  content: "";
  background: blue;
  position: absolute;
  inset: 0;
  border-radius: 20rem;
  transform: scale(1.2);
  height: 100%;

  transition: transform 200ms ease;
  aspect-ratio: 1/1;
}

.toggle.dark::before {
  transform: scale(1.2) translateX(100%);
}

@media screen and (min-width: 50em) {
  .dark-mode-toggle {
    position: relative;
    top: unset;
    padding: 2rem 0;
  }
}
</style>
