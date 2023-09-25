<template>
  <MainLayout>
    <template #main-content>
      <StopwatchDisplay
        :elapsedTime="elapsedTime"
        @pauseWatch="pauseWatch"
        @startWatch="startWatch"
        @resetWatch="resetWatch"
        @lap="lap" />
    </template>

    <ul class="list-container">
      <li class="empty-list-message" key="no-laps" v-show="laps.length === 0">
        No laps... yet
      </li>

      <TransitionGroup name="list">
        <StopwatchLapTime v-for="lap in laps" :key="lap.no" :lap="lap" />
      </TransitionGroup>
    </ul>
  </MainLayout>
</template>

<script setup>
import { ref } from "vue";
import { DateTime } from "luxon";

import MainLayout from "@/layouts/MainLayout.vue";
import StopwatchDisplay from "../components/stopwatch/StopwatchDisplay.vue";
import StopwatchLapTime from "@/components/stopwatch/StopwatchLapTime.vue";

const root = document.querySelector(":root");

const startTime = ref(0);
const elapsedTime = ref(DateTime.utc().diff(DateTime.utc()));
let interval;

function startWatch() {
  startTime.value = DateTime.utc().minus(elapsedTime.value);

  interval = setInterval(() => {
    elapsedTime.value = DateTime.utc().diff(startTime.value, [
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ]);

    // rotate dot
    root.style.setProperty(
      "--stopwatch-dot",
      `${(elapsedTime.value.toMillis() / 60000) * 360}deg`,
    );
  });
}

function pauseWatch() {
  clearInterval(interval);
}

function resetWatch() {
  clearInterval(interval);

  startTime.value = 0;
  elapsedTime.value = DateTime.utc().diff(DateTime.utc());
  previousLap.value = 0;

  root.style.removeProperty("--stopwatch-dot");

  laps.value = [];
  lapNo.value = 1;
}

const laps = ref([]);
const lapNo = ref(1);
const previousLap = ref(0);

function lap() {
  const deltaBetweenLaps = DateTime.fromMillis(
    elapsedTime.value - previousLap.value,
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

<style scoped>
/* transitions for laptimes*/
.list-move,
.list-enter-active,
.list-leave-active {
  transition:
    opacity 300ms ease,
    transform 300ms ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.list-leave-active {
  width: 100%;
}

.list-container {
  flex-direction: column-reverse;
}
</style>
