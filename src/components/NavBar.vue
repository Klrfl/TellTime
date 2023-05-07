<script setup>
import { ref } from "vue";

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

@media screen and (min-width: 40em) {
  nav {
    flex-direction: column;
  }

  .nav-link {
    flex-grow: 0;
  }
}
</style>
