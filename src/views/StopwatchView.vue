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
        @lap="lap" />
    </template>

    <ul class="list-container laptimes-container">
      <li class="no-laptime" key="no-laps" v-show="laps.length == 0">
        No laps yet
      </li>
      <TransitionGroup name="list">
        <LapTime v-for="lap in laps" :key="lap.no" :lap="lap"></LapTime>
      </TransitionGroup>
    </ul>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import TheStopwatch from "@/components/TheStopwatch.vue";
import LapTime from "@/components/LapTime.vue";

import { ref } from "vue";

import { DateTime } from "luxon";

const root = document.querySelector(":root");

let startTime = ref(0);
let stopTime = ref(0);
let delta = ref(0);
let interval = null;

const isStopped = ref(null);
const seconds = ref(0);
const miliSeconds = ref(0);
const minutes = ref(0);

function startWatch() {
  if (isStopped.value == true) {
    const delta = DateTime.utc().diff(stopTime.value).toObject().milliseconds;
    startTime.value = startTime.value.plus(delta);
  }

  if (startTime.value === 0) startTime.value = DateTime.utc();

  interval = setInterval(() => {
    delta.value = DateTime.utc().diff(startTime.value, [
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ]);

    minutes.value = delta.value.minutes;
    seconds.value = delta.value.seconds;
    miliSeconds.value = delta.value.milliseconds;

    // rotate dot
    root.style.setProperty(
      "--stopwatch-dot",
      `${(delta.value.toMillis() / 60000) * 360}deg`
    );
  });
}

function pauseWatch() {
  clearInterval(interval);
  stopTime.value = DateTime.utc();
  isStopped.value = true;
}

function resetWatch() {
  clearInterval(interval);

  startTime.value = 0;
  stopTime.value = 0;
  minutes.value = 0;
  seconds.value = 0;
  miliSeconds.value = 0;

  isStopped.value = null;

  root.style.removeProperty("--stopwatch-dot");

  laps.value = [];
  lapNo.value = 1;
}

const laps = ref([]);
const lapNo = ref(1);

const previousLap = ref(new Date(0));

function lap() {
  const deltaBetweenLaps = DateTime.fromMillis(delta.value - previousLap.value)
  .toFormat("hh:mm:ss.SSS");

  // object for display in LapTime
  laps.value.push({
    no: lapNo.value++,

    time: {
      minute: delta.value.minutes,
      second: delta.value.seconds,
      milliSecond: delta.value.milliseconds,
    },

    delta: deltaBetweenLaps,
  });

  previousLap.value = delta.value; // change previousLap
}
</script>

<style>
/* transitions for laptimes*/
.list-move,
.list-enter-active,
.list-leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.list-leave-active {
  width: 100%;
}

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
  gap: 0.5rem;
}

.no-laptime {
  text-align: center;
  width: 100%;
  font-size: 1.2rem;
}

.lap:nth-child(2) {
  margin-block-end: 10rem;
}

@media screen and (min-width: 50em) {
  .stopwatch {
    position: relative;
    padding: 0;
  }

  .laptimes {
    margin: auto 0;
  }
}
</style>
