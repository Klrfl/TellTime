<template>
  <div class="stopwatch container">
    <section class="display-container">
      <span class="display" id="stopwatch-display"
        >{{ minutes }}:{{ seconds }}:{{ miliSeconds }}</span
      >
    </section>

    <section class="button-container button-container--stopwatch">
      <button id="stopwatch-start" @click="startWatch">start stopwatch</button>
      <button id="stopwatch-stop" @click="stopWatch">stop stopwatch</button>
      <button id="stopwatch-reset" @click="resetWatch">reset stopwatch</button>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

let startTime = ref(0);
let currentTime = ref(0);
let startTimerInterval = ref(0);
let delta = ref(0);
let isStopped = ref(false);
let stopTime = ref(0);

const seconds = ref(0);
const miliSeconds = ref(0);
const minutes = ref(0);

function getCurrentTime() {
  return new Date().getTime();
}

function startWatch() {
  if (startTime === 0) startTime.value = getCurrentTime();

  // if timer was started after it stopped
  if (isStopped.value == true) {
    // bump up start time
    startTime = startTime + (getCurrentTime() - stopTime);
    isStopped = false;
  }

  startTimerInterval.value = setInterval(() => {
    currentTime.value = getCurrentTime();
    delta.value = new Date(currentTime.value - startTime.value);

    // format the numbers
    minutes.value = delta.getMinutes();
    seconds.value = delta.getSeconds();
    miliSeconds.value = delta.getMilliseconds();
  });
}

// function stopWatch() {
//   clearInterval(startTimerInterval);
//   if (isStopped || isStopped == null || isStopped == false) isStopped = true;
//   stopTime = getCurrentTime();
// }

// function resetWatch() {
//   clearInterval(startTimerInterval);
//   startTime =
//     isStopped =
//     currentTime =
//     delta =
//     second =
//     miliSecond =
//     minute =
//       null;
// }
</script>
