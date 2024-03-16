<template>
  <div class="digital-clock">
    <span id="hours">{{ time.hour }}</span>
    <span id="minutes">{{ time.minute }}</span>
    <span id="seconds">{{ time.second }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  time: Object,
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

  box-shadow: var(--shadow--offset) var(--shadow-color) inset;

  // individual numbers in the clock
  & > *:not(:last-child)::after {
    content: ":";
  }
}
</style>
