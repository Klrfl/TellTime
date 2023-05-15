<template>
  <div class="timer">
    <section class="timer-display">
      {{ hours }} : {{ minutes }} : {{ seconds }} : {{ milliseconds }}
    </section>

    <section class="btn-container">
      <button class="btn btn--circular" @click="startTimer" v-show="isStopped">
        <font-awesome-icon :icon="['fas', 'play']" />
      </button>
      <button
        class="btn btn--circular"
        @click="stopTimer"
        v-show="isStopped == false">
        <font-awesome-icon :icon="['fas', 'rotate-left']" />
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { DateTime } from "luxon";

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const milliseconds = ref(0);

const isStopped = ref(true);

const startTime = ref(0);
const deltaFromStartTime = ref(0);

const targetTime = DateTime.fromJSDate(new Date(35000));

const finalDelta = ref(0);

let interval = null;

function startTimer() {
  startTime.value = DateTime.utc();

  isStopped.value = false;

  interval = setInterval(() => {
    deltaFromStartTime.value = DateTime.utc().diff(startTime.value, [
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ]);

    finalDelta.value = targetTime.diff(deltaFromStartTime.value, [
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ]);

    hours.value = finalDelta.value.hours;
    minutes.value = finalDelta.value.minutes;
    seconds.value = finalDelta.value.seconds;
    milliseconds.value = finalDelta.value.milliseconds;
  });
}

function stopTimer() {
  clearInterval(interval);
  isStopped.value = true;
}
</script>

<style>
.timer-container {
  text-align: center;
  font-size: 2rem;
}

.timer-display {
  text-align: center;
  font-size: 2rem;
}
</style>
