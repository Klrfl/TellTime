<template>
  <div class="stopwatch">
    <section class="display-container">
      <span class="display" id="stopwatch-display">
        {{ minutes }}:{{ seconds }}:{{ miliSeconds }}
      </span>
    </section>

    <section class="btn-container">
      <button
        class="btn btn-primary btn--circular"
        @click="startWatch"
        v-show="isStopped">
        <font-awesome-icon :icon="['fas', 'play']" />
      </button>
      <button class="btn btn--circular" @click="pauseWatch" v-show="isGoing">
        <font-awesome-icon :icon="['fas', 'pause']" />
      </button>
      <button class="btn btn--circular" @click="resetWatch" :disabled="isGoing">
        <font-awesome-icon :icon="['fas', 'rotate-left']" />
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const root = document.querySelector(":root");

let isGoing = ref(false);
let isStopped = ref(true);
let startTime = ref(0);
let currentTime = ref(0);
let stopTime = ref(0);
let delta = ref(0);
let interval = null;

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

  interval = setInterval(() => {
    currentTime.value = getCurrentTime();
    delta.value = new Date(currentTime.value - startTime.value);

    minutes.value = delta.value.getMinutes();
    seconds.value = delta.value.getSeconds();
    miliSeconds.value = delta.value.getMilliseconds();
    // console.log(delta.value.getTime());
    root.style.setProperty(
      "--stopwatch-dot",
      `${(delta.value.getTime() / 60000) * 360}deg`
    );
  });
}

function pauseWatch() {
  clearInterval(interval);
  isGoing.value = false;
  isStopped.value = true;
  stopTime.value = getCurrentTime();
}

function resetWatch() {
  clearInterval(interval);
  isGoing.value = false;
  isStopped.value = true;

  startTime.value = 0;
  stopTime.value = 0;
  minutes.value = 0;
  seconds.value = 0;
  miliSeconds.value = 0;

  root.style.removeProperty("--stopwatch-dot");
}
</script>

<style>
:root {
  --stopwatch-dot: 0deg;
}

.stopwatch {
  text-align: center;
  max-width: 50ch;
}

#stopwatch-display {
  font-size: 2rem;
}

.display-container {
  outline: 2px solid #333;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  max-width: 100%;

  display: grid;
  place-items: center;
  position: relative;
}

.display-container::after {
  content: "";
  background: var(--accent);
  height: 1rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  position: absolute;
  top: 0;
  left: calc(50% - 0.5rem);
  transform: rotate(var(--stopwatch-dot));
  transform-origin: 50% 5rem;
}
</style>
