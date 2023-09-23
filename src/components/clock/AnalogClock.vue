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
import DigitalWorldClock from "@/components/clock/DigitalWorldClock.vue";
import { DateTime } from "luxon";

const root = document.querySelector(":root");
const date0 = new Date().setHours(0, 0, 0, 0);

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

function getCurrentTime() {
  const now = ref(DateTime.now());

  hours.value = now.value.c.hour;
  minutes.value = now.value.c.minute;
  seconds.value = now.value.c.second;
}

function setMinuteSecondHands() {
  root.style.setProperty("--minutesDeg", `${(minutes.value / 60) * 360}deg`);
  root.style.setProperty("--secondsDeg", `${(seconds.value / 60) * 360}deg`);
}

function setHourHand() {
  root.style.setProperty(
    "--hoursDeg",
    `${((new Date() - date0) / 86_400_000) * 720}deg`,
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
$clock-hand-width: 0.2rem;

/* origin formula: 0 calc(width * (height - (height * 25%))) */
@mixin center-clock-hands($width, $height) {
  aspect-ratio: calc(1 / $height);
  transform-origin: 50% calc($width * ($height * 75 / 100));
}

@mixin display-indicator($thickness, $color) {
  border-left: $thickness solid $color;
  border-right: $thickness solid $color;
}

.clock {
  outline: 2px solid var(--color-border);
  background: var(--container-background);
  box-shadow: var(--shadow--offset) var(--shadow-color);
  max-width: 24rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  flex-basis: 22rem;
  position: relative;

  & > * {
    position: absolute;
    bottom: 50%;
    left: 50%;
  }

  &__indicator-container {
    inset: 0;
  }

  &__indicator {
    background: transparent;
    position: absolute;
    inset: auto 0 50% 0;
    height: 0.25rem;
    @include display-indicator(2vmin, var(--indicator-color-small));
  }

  // rotate thick clock indicator
  @for $i from 1 through 60 {
    &__indicator:nth-child(#{$i}) {
      $degree: calc($i * 6);
      transform: translateY(50%) rotate(#{$degree}deg);

      // if is multiple of 5
      @if $i % 5 == 0 {
        @include display-indicator(5vmin, var(--indicator-color-big));
      }
    }
  }

  &__dot,
  &__hand {
    box-shadow: var(--shadow--offset) var(--shadow-color);
  }

  &__dot {
    background: #aaa;
    width: 1rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    transform: translate(-50%, 50%);
    z-index: 1;
  }

  &__hand {
    background: var(--clock-hand-color);
    width: $clock-hand-width;
    border-radius: 30% 30% 0 0;
    /* transition: transform 200ms cubic-bezier(0.1, 2.7, 0.58, 1); */

    &--hours {
      transform: translate(-50%, 25%) rotate(var(--hoursDeg));
      @include center-clock-hands($clock-hand-width, 30);
    }

    &--minutes {
      transform: translate(-50%, 25%) rotate(var(--minutesDeg));
      @include center-clock-hands($clock-hand-width, 42);
    }

    &--seconds {
      background: var(--accent);
      transform: translate(-50%, 25%) rotate(var(--secondsDeg));
      @include center-clock-hands($clock-hand-width, 42);
    }
  }
}
</style>
