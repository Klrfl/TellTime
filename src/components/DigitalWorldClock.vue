<template>
  <div class="digital-clock">
    <span id="hours">{{ hours }}</span>
    <span id="minutes">{{ minutes }}</span>
    <span id="seconds">{{ seconds }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  hours: Number,
  minutes: Number,
  seconds: Number,
});
</script>

<style lang="scss" scoped>
:root {
  --clock-bg: var(--vt-c-black-soft);
}

.digital-clock {
  background: var(--clock-bg);
  padding: 1rem;
  border-radius: 0.5rem;

  position: absolute;
  top: 20%;
  left: 50%;
  bottom: unset;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  gap: 0.2rem;

  box-shadow: 2px 2px 10px black inset;

  // individual numbers in the clock
  & > *:not(:last-child)::after {
    content: ":";
  }
}
</style>
