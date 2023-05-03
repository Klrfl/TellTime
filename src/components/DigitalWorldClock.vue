<template>
  <div class="digital-clock">
    <div id="hours">{{ hours }}</div>
    <div id="minutes">{{ minutes }}</div>
    <div id="seconds">{{ seconds }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  hours: Number,
  minutes: Number,
  seconds: Number,
});
</script>

<style>
.watch-display {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.watch-display__displays {
  outline: 1px solid #aaa;
  padding: 2rem;
}
</style>
