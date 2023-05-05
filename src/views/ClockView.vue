<template>
  <main>
    <DigitalWorldClock :hours="hours" :minutes="minutes" :seconds="seconds" />
    <WorldClock :hours="hours" :minutes="minutes" :seconds="seconds" />
  </main>
</template>

<script setup>
import { onBeforeMount, onUnmounted, ref } from "vue";

import WorldClock from "@/components/WorldClock.vue";
import DigitalWorldClock from "@/components/DigitalWorldClock.vue";

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

function getCurrentTime() {
  const now = new Date();

  hours.value = now.getHours();
  minutes.value = now.getMinutes();
  seconds.value = now.getSeconds();
}

let timerId = null;

function startClock() {
  clearInterval(timerId);
  getCurrentTime();
  timerId = setInterval(getCurrentTime, 1000);
}

function stopClock() {
  clearInterval(timerId);
}

onBeforeMount(() => {
  startClock();
});

onUnmounted(() => {
  stopClock();
  console.log("unmounted");
});
</script>
