<script setup>
import { inject, ref, onMounted } from "vue";

const theme = inject("theme");
const darkModeToggle = ref(null);

function setTheme() {
  if (theme.value === "dark") {
    theme.value = "light";
  } else {
    theme.value = "dark";
  }

  darkModeToggle.value.classList.toggle("dark");

  localStorage.setItem("theme-preference", theme.value);
  document.body.setAttribute("data-theme", theme.value);
}

const overlay = ref(null);

function toggleOverlay(opt = null) {
  if (opt === "remove") {
    overlay.value.classList.remove("active");
  } else {
    overlay.value.classList.add("active");
  }
}

onMounted(() => {
  if (theme.value === "dark") darkModeToggle.value.classList.add("dark");
  else darkModeToggle.value.classList.remove("dark");
});
</script>

<template>
  <button class="nav-link kebab-toggle" @click="toggleOverlay">
    <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
    <span>more</span>
  </button>

  <div class="overlay" ref="overlay">
    <button class="close-overlay" @click="toggleOverlay('remove')">
      <font-awesome-icon :icon="['fas', 'square-xmark']" />
    </button>

    <button class="dark-mode-toggle" @click="setTheme" ref="darkModeToggle">
      <font-awesome-icon :icon="['fas', 'moon']" />
      <font-awesome-icon :icon="['fas', 'sun']" />
    </button>
    <RouterLink class="nav-link to-about" :to="{ name: 'About' }">
      <font-awesome-icon :icon="['fas', 'question']" />
      <span>About</span>
    </RouterLink>
  </div>
</template>

<style lang="scss">
.kebab-toggle {
  margin-top: auto;
  position: absolute;
  top: 2rem;
  right: 1rem;
}

.overlay {
  text-align: center;
  outline: 2px solid var(--color-border);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
  padding: 1rem;
  width: max-content;

  position: absolute;
  inset: 2rem 1.5rem auto auto;
  transform: translateY(-100%);
  opacity: 0%;
  transition:
    transform 200ms ease,
    opacity 200ms ease;

  &.active {
    transform: none;
    opacity: 100%;
  }
}

.close-overlay {
  font-size: 1.5rem;
  position: absolute;
  top: -20px;
  right: -10px;
  transform: scale(1.2);
}

.dark-mode-toggle {
  background: transparent;
  outline: 2px solid var(--color-border);
  margin: 0 auto;
  border-radius: 20rem;
  aspect-ratio: 2 / 1;

  display: flex;
  justify-content: center;

  position: relative;
  cursor: pointer;

  & > * {
    user-select: none;
    text-align: center;
    padding: 0.5rem;
    aspect-ratio: 1/ 1;
  }

  &::before {
    content: "";
    background: var(--accent);
    border-radius: 20rem;
    height: 100%;
    transform: scale(1.2);
    position: absolute;
    inset: 0;

    transition: transform 200ms ease;
    aspect-ratio: 1/1;
  }

  &.dark::before {
    transform: scale(1.2) translateX(100%);
  }
}

.to-about {
  display: block;
  padding: 1rem;
}

@media screen and (min-width: 50em) {
  .kebab-toggle {
    position: relative;
    inset: unset;
  }

  .overlay {
    transform: translateX(-150%);
    inset: auto 0 1rem 1rem;
  }
}
</style>
