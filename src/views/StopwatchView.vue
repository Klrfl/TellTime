<template>
  <main>
    <StopWatch></StopWatch>
  </main>
</template>

<script setup>
import StopWatch from "@/components/StopWatch.vue";
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
