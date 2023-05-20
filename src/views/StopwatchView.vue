<template>
  <MainLayout>
    <template #main-content>
      <TheStopwatch
        :minutes="minutes"
        :seconds="seconds"
        :miliSeconds="miliSeconds"
        @pauseWatch="pauseWatch"
        @startWatch="startWatch"
        @resetWatch="resetWatch"
        @lap="lap(delta)" />
    </template>

    <ul class="list-container laptimes-container">
      <li class="no-laptime" v-show="laps.length == 0">No laptimes yet</li>
      <LapTime v-for="lap in laps" :id="lap.lapNo" :lap="lap"></LapTime>
    </ul>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import TheStopwatch from "@/components/TheStopwatch.vue";
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
    startTime.value += getCurrentTime() - stopTime.value;
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

  laps.value = [];
  currentLap.value = 1;
}

const laps = ref([]);
const currentLap = ref(1);

function lap(delta) {
  laps.value.push({
    no: currentLap.value++,
    time: {
      minute: delta.getMinutes(),
      second: delta.getSeconds(),
      milliSecond: delta.getMilliseconds(),
    },
    // delta,
  });
}
</script>

<style>
.stopwatch {
  position: absolute;
  inset: 0;
  padding: 2rem; /* bc we used absolute, the padding on .container doesn't affect .stopwatch*/
  text-align: center;
}

.laptimes-container {
  width: 100%;

  display: flex;
  flex-direction: column-reverse;
}

.no-laptime {
  text-align: center;
  font-size: 1.2rem;
}

@media screen and (min-width: 50em) {
  .stopwatch {
    position: relative;
  }

  .laptimes {
    margin: auto 0;
  }
}
</style>
