<script setup>
import { inject, ref } from "vue";

const props = defineProps({
  routes: Object,
});

const emit = defineEmits(["move"]);

const appRoutes = props.routes;
let currentRoute = ref("ClockView");

function movePages(routeComponent) {
  currentRoute.value = routeComponent;

  emit("move", routeComponent);
}

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
    <button
      v-for="route in appRoutes"
      :key="route"
      @click="movePages(route.component)"
      class="nav-link">
      <font-awesome-icon :icon="route.icon"></font-awesome-icon>
      {{ route.name }}
    </button>

    <button class="dark-mode" @click="setTheme">dark mode</button>
  </nav>
</template>

<style>
nav {
  outline: 1px solid var(--color-border);
  font-size: 12px;
  text-align: center;

  display: flex;
}

.nav-link {
  all: unset;
  cursor: pointer;
  padding: 1rem;
  color: var(--color-text);
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link:hover {
  color: var(--navlink-active);
}

.nav-link svg {
  font-size: 1.2rem;
}

.dark-mode {
  margin-top: auto;
  padding: 2rem;
  user-select: none;
  position: absolute;
  top: 0;
  right: 0;
}

@media screen and (min-width: 40em) {
  nav {
    flex-direction: column;
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
