<template>
  <li class="target-time" @click="select">
    <span>{{ displayTargetTime }}</span>
  </li>
</template>

<script setup>
import { computed } from "vue";

import { DateTime } from "luxon";

const props = defineProps({
  targetTime: Number,
});

const emit = defineEmits(["select"]);

function select() {
  emit("select");
}

const displayTargetTime = computed(() => {
  const displayedTargetTime = DateTime.fromJSDate(
    new Date(props.targetTime)
  ).toUTC();
  return displayedTargetTime.toFormat("HH:mm:ss");
});
</script>

<style lang="scss">
.target-time {
  background: var(--target-time-background);
  border-radius: 0.5rem;
  padding: 2rem;

  &:hover {
    background: var(--target-time-background-hover);
    cursor: pointer;
  }
}
</style>
