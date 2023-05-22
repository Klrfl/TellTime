<template>
  <li class="target-time" @click="select">
    <span>{{ displayTargetTime }}</span>
  </li>
</template>

<script setup>
import { computed } from "vue";

import { DateTime } from "luxon";

const props = defineProps({
  targetTime: String,
});

const emit = defineEmits(["select"]);

function select() {
  emit("select");
}

const displayTargetTime = computed(() => {
  return DateTime.fromISO(props.targetTime, { zone: "utc" }).toLocaleString(
    DateTime.TIME_24_WITH_SECONDS
  );
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
