<script setup>
const props = defineProps({
  lap: Object,
});
</script>

<template>
  <li class="lap" title="double click/tap to delete">
    <div class="lap__number">{{ lap.no }}</div>
    <div class="lap__time">
      <span class="lap__time--minute">{{ lap.time.minutes }}</span>
      <span class="lap__time--second">{{ lap.time.seconds }}</span>
      <span class="lap__time--milliSecond">{{ lap.time.milliseconds }}</span>
    </div>
    <div class="lap--delta">{{ lap.delta }}</div>
  </li>
</template>

<style lang="scss" scoped>
.lap {
  background: var(--container-background);
  outline: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__time {
    font-weight: bold;
    margin-left: 0.5rem;

    & > *:not(:last-child)::after {
      content: ":";
    }
  }
}
</style>
