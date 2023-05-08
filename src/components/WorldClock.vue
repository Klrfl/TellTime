<template>
  <div class="clock">
    <DigitalWorldClock :hours="hours" :minutes="minutes" :seconds="seconds" />
    <div class="clock__indicator-container">
      <span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span>
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

<style lang="scss">
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

  & > * {
    position: absolute;
    bottom: 50%;
    left: 50%;
  }
}

.clock__indicator-container {
  position: absolute;
  inset: 0;
}

.clock__indicator {
  background: transparent;
  position: absolute;
  bottom: 50%;
  width: 100%;
  height: 0.25rem;
  border-left: 2vmin solid #5b5b5b;
  border-right: 2vmin solid #5b5b5b;
}

// rotate thick clock indicator
@for $i from 1 through 60 {
  .clock__indicator:nth-child(#{$i}) {
    $degree: calc($i * 6);
    transform: rotate(#{$degree}deg);

    // if is multiple of 5
    @if $i % 5 == 0 {
      border-left: 5vmin solid #828282;
      border-right: 5vmin solid #828282;
    }
  }
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
