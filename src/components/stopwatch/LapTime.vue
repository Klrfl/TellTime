<template>
  <li class="lap" title="double click/tap to delete">
    <div class="lap__number">{{ lap.no }}</div>
    <div class="lap__time">
      <span class="lap__time--minute">{{ lap.time.minute }}</span>
      <span class="lap__time--second">{{ lap.time.second }}</span>
      <span class="lap__time--milliSecond">{{ lap.time.milliSecond }}</span>
    </div>
    <div class="lap--delta">{{ lap.delta }}</div>
  </li>
</template>

<script setup>
const props = defineProps({
  lap: Object,
});
</script>

<style lang="scss">
.lap {
  background: var(--laptime-background);
  padding: 1.5rem 1rem;

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
