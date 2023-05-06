<template>
  <DigitalWorldClock :hours="hours" :minutes="minutes" :seconds="seconds" />
  <div class="clock">
    <div class="clock__indicator-container--small">
      <span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span>
    </div>
    <div class="clock__indicator-container">
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
    </div>
    <div class="clock__dot"></div>
    <div class="clock__hand clock__hand--hours"></div>
    <div class="clock__hand clock__hand--minutes"></div>
    <div class="clock__hand clock__hand--seconds"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import DigitalWorldClock from "@/components/DigitalWorldClock.vue";

let root = document.querySelector(":root");
const date0 = new Date().setHours(0, 0, 0, 0);

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

function getCurrentTime() {
  const now = new Date();

  hours.value = now.getHours();
  minutes.value = now.getMinutes();
  seconds.value = now.getSeconds();
}

function setMinuteSecondHands() {
  root.style.setProperty("--minutes", `${(minutes.value / 60) * 360}deg`);
  root.style.setProperty("--seconds", `${(seconds.value / 60) * 360}deg`);
}

function setHourHand() {
  const newDate = new Date();

  root.style.setProperty(
    "--hours",
    `${((newDate - date0) / 86400000) * 720}deg`
  );
}

// set hours, minutes and seconds to rotate clock
setInterval(() => {
  getCurrentTime();
  setMinuteSecondHands();
}, 1000);

setInterval(setHourHand, 60000);

onMounted(() => {
  getCurrentTime();
  setMinuteSecondHands();
  setHourHand();
});
</script>

<style>
:root {
  --hours: 60;
  --minutes: 60;
  --seconds: 60;
}

.clock {
  background: #323232;
  width: 22rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  position: relative;
}

.clock > * {
  position: absolute;
  bottom: 50%;
  left: 50%;
}

.clock__indicator-container,
.clock__indicator-container--small {
  position: absolute;
  inset: 0;
}

.clock__indicator,
.clock__indicator--small {
  background: transparent;
  position: absolute;
  bottom: 50%;
  width: 100%;
}

.clock__indicator {
  height: 0.2rem;
  border-left: 7vmin solid #444;
  border-right: 7vmin solid #444;
}

.clock__indicator--small {
  height: 0.1rem;
  background: transparent;
  position: absolute;
  bottom: 50%;
  width: 100%;
}

.clock__indicator:nth-child(2) {
  transform: rotate(30deg);
}

.clock__indicator:nth-child(3) {
  transform: rotate(60deg);
}

.clock__indicator:nth-child(4) {
  transform: rotate(90deg);
}

.clock__indicator:nth-child(5) {
  transform: rotate(120deg);
}

.clock__indicator:nth-child(6) {
  transform: rotate(150deg);
}

.clock__dot,
.clock__hand {
  box-shadow: 5px 5px 15px #323232;
}

.clock__dot {
  background: #aaa;
  width: 2rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  transform: translate(-50%, 50%);
  z-index: 1;
}

.clock__hand {
  background: #ddd;
  width: 0.25rem;
  border-top-left-radius: 30%;
  border-top-right-radius: 30%;
  /* transition: transform 200ms cubic-bezier(0.1, 2.7, 0.58, 1); */
}

.clock__hand--hours {
  aspect-ratio: 1 / 32;
  transform: translate(-50%, 25%) rotate(var(--hours));

  /* origin formula: 0 calc(width * (height - (height * 25%))) */
  transform-origin: 50% calc(0.25rem * 24);
}

.clock__hand--minutes {
  aspect-ratio: 1 / 48;
  transform: translate(-50%, 25%) rotate(var(--minutes));
  transform-origin: 50% calc(0.25rem * 36);
}

.clock__hand--seconds {
  background: var(--accent);
  width: 0.25rem;
  aspect-ratio: 1 / 48;
  transform: translate(-50%, 25%) rotate(var(--seconds));
  transform-origin: 50% calc(0.25rem * 36);
}
</style>
