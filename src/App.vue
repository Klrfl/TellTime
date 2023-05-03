<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <RouterView />
  <NavBar />
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

main {
  flex: 1 1 0;
  display: grid;
  place-items: center;
}
</style>
