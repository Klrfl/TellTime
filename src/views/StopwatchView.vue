<template>
  <MainLayout>
    <template #main-content>
      <Stopwatch
        :minutes="minutes"
        :seconds="seconds"
        :miliSeconds="miliSeconds"
        @pauseWatch="pauseWatch"
        @startWatch="startWatch"
        @resetWatch="resetWatch" />
    </template>

    <LapTime></LapTime>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import Stopwatch from "@/components/Stopwatch.vue";
import LapTime from "@/components/LapTime.vue";

import { ref } from "vue";

const root = document.querySelector(":root");

let startTime = ref(0);
let currentTime = ref(0);
let stopTime = ref(0);
let delta = ref(0);
let interval = null;

function getCurrentTime() {
  return new Date().getTime();
}

const seconds = ref(0);
const miliSeconds = ref(0);
const minutes = ref(0);

function startWatch(isStopped) {
  // if timer was started after it stopped
  if (isStopped == true) {
    // bump up start time
    startTime.value = startTime.value + (getCurrentTime() - stopTime.value);
  }

  if (startTime.value === 0) startTime.value = getCurrentTime();

  interval = setInterval(() => {
    currentTime.value = getCurrentTime();
    delta.value = new Date(currentTime.value - startTime.value);

    minutes.value = delta.value.getMinutes();
    seconds.value = delta.value.getSeconds();
    miliSeconds.value = delta.value.getMilliseconds();

    root.style.setProperty(
      "--stopwatch-dot",
      `${(delta.value.getTime() / 60000) * 360}deg`
    );
  });
}

function pauseWatch() {
  clearInterval(interval);
  stopTime.value = getCurrentTime();
}

function resetWatch() {
  clearInterval(interval);

  startTime.value = 0;
  stopTime.value = 0;
  minutes.value = 0;
  seconds.value = 0;
  miliSeconds.value = 0;

  root.style.removeProperty("--stopwatch-dot");
}

// const laps = ref([]);
// const currentLap = ref(1);

// function lap() {
//   laps.value.push({
//     lapNo: currentLap.value++,
//     lapTime: getCurrentTime(),
//     lapDelta: {
//       // minute:
//     },
//   });

//   console.log(laps.value);
// }
</script>
