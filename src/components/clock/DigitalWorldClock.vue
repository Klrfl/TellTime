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

  box-shadow: var(--shadow) rgba(60, 60, 60, 0.22) inset;

  // individual numbers in the clock
  & > *:not(:last-child)::after {
    content: ":";
  }
}
</style>
