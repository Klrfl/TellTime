<template>
  <nav>
    <RouterLink to="/" class="nav-link">
      <font-awesome-icon :icon="['fas', 'clock']" />
      <span>Clock</span>
    </RouterLink>
    <RouterLink to="/timer" class="nav-link">
      <font-awesome-icon :icon="['fas', 'stopwatch']" />
      <span>Timer</span>
    </RouterLink>
    <RouterLink to="/stopwatch" class="nav-link">
      <font-awesome-icon :icon="['fas', 'hourglass-start']" />
      <span>Stopwatch</span>
    </RouterLink>
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
