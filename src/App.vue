<script setup>
import { inject, onMounted } from "vue";

import NavBar from "@/components/NavBar.vue";

const theme = inject("theme");

onMounted(() => {
  document.body.setAttribute("data-theme", theme.value);
});
</script>

<template>
  <NavBar />
  <RouterView v-slot="{ Component }">
    <Transition name="slide" mode="out-in">
      <KeepAlive>
        <component :is="Component"></component>
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

nav {
  order: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 500ms, transform 500ms;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(80%);
}

.slide-leave-to {
  transform: translateY(-80%);
}

@media screen and (min-width: 50em) {
  #app {
    flex-direction: row;
  }

  nav {
    order: 0;
  }
}
</style>
