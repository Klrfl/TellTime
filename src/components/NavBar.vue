<template>
  <nav>
    <RouterLink class="nav-link" :to="{ name: 'Clock' }">
      <font-awesome-icon :icon="['fas', 'clock']" />
      <span>Clock</span>
    </RouterLink>
    <RouterLink class="nav-link" :to="{ name: 'Timer' }">
      <font-awesome-icon :icon="['fas', 'hourglass-start']" />
      <span>Timer</span>
    </RouterLink>
    <RouterLink class="nav-link" :to="{ name: 'Stopwatch' }">
      <font-awesome-icon :icon="['fas', 'stopwatch']" />
      <span>Stopwatch</span>
    </RouterLink>

    <KebabMenu />
  </nav>
</template>

<script setup>
import KebabMenu from "@/components/KebabMenu.vue";
</script>

<style lang="scss">
nav {
  background: var(--color-background);
  outline: 1px solid var(--color-border);
  font-size: 0.8rem;
  text-align: center;
  z-index: 10;

  display: flex;
}

.nav-link {
  padding: 0.5rem;
  color: var(--color-text);
  flex: 1 1 0;
  cursor: pointer;
  user-select: none;

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

@media screen and (min-width: 50em) {
  nav {
    flex-direction: column;
  }

  .nav-link {
    flex-grow: 0;
    padding: 1rem;
  }
}
</style>
