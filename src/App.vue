<script setup>
import { shallowRef, inject, onMounted } from "vue";

import NavBar from "@/components/NavBar.vue";

const theme = inject("theme");

onMounted(() => {
  document.body.setAttribute("data-theme", theme.value);
});
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

nav {
  order: 1;
}
@media screen and (min-width: 40em) {
  #app {
    flex-direction: row;
  }

  nav {
    order: 0;
  }
}
</style>
