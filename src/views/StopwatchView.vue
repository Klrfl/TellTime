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
import TheStopwatch from "@/components/stopwatch/TheStopwatch.vue";
import LapTime from "@/components/stopwatch/LapTime.vue";

import { ref } from "vue";

import { DateTime } from "luxon";

const root = document.querySelector(":root");

let startTime = ref(0);
let elapsedTime = ref(0);
let interval;

const seconds = ref(0);
const miliSeconds = ref(0);
const minutes = ref(0);

function startWatch() {
  startTime.value = DateTime.utc().minus(elapsedTime.value);

  interval = setInterval(() => {
    elapsedTime.value = DateTime.now().diff(
      startTime.value,
      ["hours", "minutes", "seconds", "milliseconds"],
      { zone: "utc" }
    );

    minutes.value = elapsedTime.value.minutes;
    seconds.value = elapsedTime.value.seconds;
    miliSeconds.value = elapsedTime.value.milliseconds;

    // rotate dot
    root.style.setProperty(
      "--stopwatch-dot",
      `${(elapsedTime.value.toMillis() / 60000) * 360}deg`
    );
  });
}

function pauseWatch() {
  clearInterval(interval);
}

function resetWatch() {
  clearInterval(interval);

  startTime.value = 0;
  elapsedTime.value = 0;
  minutes.value = 0;
  seconds.value = 0;
  miliSeconds.value = 0;

  root.style.removeProperty("--stopwatch-dot");

  laps.value = [];
  lapNo.value = 1;
}

const laps = ref([]);
const lapNo = ref(1);

const previousLap = ref(0);

function lap() {
  const deltaBetweenLaps = DateTime.fromMillis(
    elapsedTime.value - previousLap.value
  ).toFormat("mm:ss.SSS");

  // object for display in LapTime
  laps.value.push({
    no: lapNo.value++,

    time: {
      minute: elapsedTime.value.minutes,
      second: elapsedTime.value.seconds,
      milliSecond: elapsedTime.value.milliseconds,
    },

    delta: deltaBetweenLaps,
  });

  previousLap.value = elapsedTime.value; // change previousLap
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

.laptimes-container {
  width: 100%;

  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
}

.no-laptime {
  text-align: center;
  font-size: 1.2rem;
}

@media screen and (min-width: 50em) {
  .laptimes {
    margin: auto 0;
  }
}
</style>
