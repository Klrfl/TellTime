<template>
  <li class="world-clock">
    <span>New York</span>
    <div class="world-clock__time">
      <span class="hour">{{ now.c.hour }}</span>
      <span class="minute">{{ now.c.minute }}</span>
      <span class="second">{{ now.c.second }}</span>
    </div>
  </li>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";

import { DateTime } from "luxon";

const now = ref("Anjing");
const timeZone = ref("");

function getTimeOfZone(zone) {
  now.value = DateTime.now().setZone(zone);
  timeZone.value = now.value._zone;
}

setInterval(() => {
  getTimeOfZone("America/New_York");
}, 1000);

onBeforeMount(() => {
  getTimeOfZone("America/New_York");
});
</script>

<style lang="scss">
.world-clock {
  padding: 2rem;
  border-radius: 0.5rem;
  outline: 2px solid var(--color-border);

  display: flex;
  justify-content: space-between;

  &__time > *:not(:last-child)::after {
    content: ":";
  }
}
</style>
