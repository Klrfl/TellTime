<script setup>
import { ref } from "vue";
import { useStopwatchStore } from "@/stores/stopwatch";

const stopwatchStore = useStopwatchStore();

const laptimeDisplay = ref("blom ada bentar ya");

const root = document.querySelector(":root");
let interval = null;

const isGoing = ref(false);
const isLapping = ref(false);

function startWatch() {
  // rotate dot
  interval = setInterval(() => {
    root.style.setProperty(
      "--stopwatch-dot",
      `${(stopwatchStore.elapsedTime.toMillis() / 60000) * 360}deg`,
    );
  });

  isGoing.value = true;

  stopwatchStore.startWatch();
}

function pauseWatch() {
  clearInterval(interval);
  isGoing.value = false;

  stopwatchStore.pauseWatch();
}

function resetWatch() {
  pauseWatch();
  root.style.removeProperty("--stopwatch-dot");
  isLapping.value = false;

  stopwatchStore.resetWatch();
}

function lap() {
  isLapping.value = true;
  stopwatchStore.lap();
}
</script>

<template>
  <div class="stopwatch">
    <section class="stopwatch-display">
      <div class="stopwatch-display__indicator-container">
        <span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span
        ><span class="stopwatch-display__indicator"></span>
      </div>
      <div class="time-display">
        <span class="time-display__minutes">
          {{ stopwatchStore.elapsedTime.minutes }}:</span
        >
        <span class="time-display__seconds">
          {{ stopwatchStore.elapsedTime.seconds }}.</span
        >
        <span class="time-display__milliseconds">
          {{ stopwatchStore.elapsedTime.milliseconds }}
        </span>
      </div>
      <span class="laptime-display" v-show="isLapping">
        {{ laptimeDisplay }}
      </span>
    </section>

    <section class="btn-container">
      <button class="btn btn--circular" @click="lap" :disabled="!isGoing">
        <font-awesome-icon :icon="['fas', 'flag']" />
      </button>

      <button
        class="btn btn-primary btn--circular"
        @click="startWatch"
        v-show="!isGoing">
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

<style lang="scss" scoped>
:root {
  --stopwatch-dot: 0deg;
}

.laptime-display {
  font-family: "Ubuntu Mono", monospace;
}

.stopwatch-display {
  outline: 2px solid var(--color-border);
  background: var(--container-background);
  box-shadow: var(--shadow--offset) var(--shadow-color);
  border-radius: 50%;
  width: 30ch;
  height: 30ch;
  aspect-ratio: 1 / 1;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  &__indicator-container {
    position: absolute;
    inset: 0;
  }

  &__indicator {
    position: absolute;
    inset: auto 0 50% 0;
    border-left: 1rem solid var(--color-border);
    height: 0.2rem;
    width: 100%;

    translate: 0 50%;
  }

  @for $i from 1 through 60 {
    &__indicator:nth-child(#{$i}) {
      rotate: #{$i * 6}deg;
    }
  }

  &::after {
    content: "";
    background: var(--accent);
    height: 0.5rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;

    position: absolute;
    top: 1rem;
    transform: rotate(var(--stopwatch-dot));
    transform-origin: 50% calc(15ch - 1rem);
  }
}

@media screen and (min-width: 50em) {
  .btn-container {
    background: transparent;
    position: relative;
    bottom: unset;
  }
}
</style>
