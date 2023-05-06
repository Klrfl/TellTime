<template>
  <div class="stopwatch container">
    <section class="display-container">
      <span class="display" id="stopwatch-display">
        {{ minutes }}:{{ seconds }}:{{ miliSeconds }}
      </span>
    </section>

    <section class="button-container button-container--stopwatch">
      <button
        class="stopwatch-btn stopwatch-btn--start"
        @click="startWatch"
        v-show="isStopped">
        <font-awesome-icon :icon="['fas', 'play']" />
      </button>
      <button
        class="stopwatch-btn stopwatch-btn--pause"
        @click="pauseWatch"
        v-show="isGoing">
        <font-awesome-icon :icon="['fas', 'pause']" />
      </button>
      <button
        class="stopwatch-btn stopwatch-btn--reset"
        @click="resetWatch"
        :disabled="isGoing">
        <font-awesome-icon :icon="['fas', 'rotate-left']" />
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

let isGoing = ref(false);
let isStopped = ref(true);
let startTime = ref(0);
let currentTime = ref(0);
let stopTime = ref(0);
let delta = ref(0);
let startTimerInterval = null;

const seconds = ref(0);
const miliSeconds = ref(0);
const minutes = ref(0);

function getCurrentTime() {
  return new Date().getTime();
}

function startWatch() {
  // if timer was started after it stopped
  if (isStopped.value == true) {
    // bump up start time
    startTime.value = startTime.value + (getCurrentTime() - stopTime.value);
  }

  if (startTime.value === 0) startTime.value = getCurrentTime();

  isGoing.value = true;
  isStopped.value = false;

  startTimerInterval = setInterval(() => {
    currentTime.value = getCurrentTime();
    delta.value = new Date(currentTime.value - startTime.value);

    minutes.value = delta.value.getMinutes();
    seconds.value = delta.value.getSeconds();
    miliSeconds.value = delta.value.getMilliseconds();
  });
}

function pauseWatch() {
  clearInterval(startTimerInterval);
  isGoing.value = false;
  isStopped.value = true;
  stopTime.value = getCurrentTime();
}

function resetWatch() {
  clearInterval(startTimerInterval);
  isGoing.value = false;
  isStopped.value = true;

  startTime.value = 0;
  stopTime.value = 0;
  minutes.value = 0;
  seconds.value = 0;
  miliSeconds.value = 0;
}
</script>

<style>
.stopwatch {
  text-align: center;
}
#stopwatch-display {
  font-size: 2rem;
}

.stopwatch-btn {
  padding: 2rem;
  text-align: center;
  font-size: 1.5rem;
}
</style>
