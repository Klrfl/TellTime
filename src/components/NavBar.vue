<script setup>
import { inject, ref } from "vue";

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

<template>
  <nav>
    <RouterLink class="nav-link" :to="{ name: 'Clock' }">
      <font-awesome-icon :icon="['fas', 'clock']" />
      Clock
    </RouterLink>
    <RouterLink class="nav-link" :to="{ name: 'Timer' }">
      <font-awesome-icon :icon="['fas', 'hourglass-start']" />
      Timer
    </RouterLink>
    <RouterLink class="nav-link" :to="{ name: 'Stopwatch' }">
      <font-awesome-icon :icon="['fas', 'stopwatch']" />
      Stopwatch
    </RouterLink>

    <button class="dark-mode" @click="setTheme">dark mode</button>
  </nav>
</template>

<style lang="scss">
nav {
  background: var(--color-background);
  outline: 1px solid var(--color-border);
  font-size: 12px;
  text-align: center;

  display: flex;

  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 10;
}

.nav-link {
  padding: 1rem;
  color: var(--color-text);
  flex: 1 1 0;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: color 200ms ease, background-color 200ms ease;

  &:hover {
    background: var(--navlink-hover);
  }

  &:hover,
  &-active {
    color: var(--navlink-active);
  }
}

.nav-link svg {
  font-size: 1.1rem;
}

.dark-mode {
  margin-top: auto;
  padding: 2rem;
  user-select: none;
  position: absolute;
  top: -100%;
  right: 0;
}

@media screen and (min-width: 40em) {
  nav {
    flex-direction: column;
    position: sticky;
    width: unset;
  }

  .nav-link {
    flex-grow: 0;
  }

  .dark-mode {
    position: relative;
    padding: 2rem 0;
  }
}
</style>
