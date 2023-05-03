<template>
  <nav>
    <RouterLink to="/">Clock</RouterLink>
    <RouterLink to="/timer">Timer</RouterLink>
    <RouterLink to="/stopwatch">Stopwatch</RouterLink>
  </nav>
</template>

<style>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  display: flex;
  justify-content: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
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
