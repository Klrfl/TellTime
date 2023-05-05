<script setup>
import { ref } from "vue";

const props = defineProps({
  routes: Object,
});

const emit = defineEmits(["move"]);

const appRoutes = props.routes;
let currentRoute = ref("WorldClock");

function movePages(routeComponent) {
  currentRoute.value = routeComponent;

  emit("move", routeComponent);
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
  </nav>
</template>

<style>
nav {
  outline: 1px solid var(--color-border);
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  display: flex;
  justify-content: center;
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

nav a.router-link-exact-active {
  color: var(--navlink-active);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 1rem;
}

nav a:first-of-type {
  border: 0;
}
</style>
