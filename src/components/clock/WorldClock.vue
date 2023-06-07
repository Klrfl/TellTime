<template>
  <li class="world-clock">
    <span>New York</span>
    <div class="time">
      <span class="hour">{{ now.c.hour }}</span
      >: <span class="minute">{{ now.c.minute }}</span
      >:
      <span class="second">{{ now.c.second }}</span>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";

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
</script>

<style>
.world-clock {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>
