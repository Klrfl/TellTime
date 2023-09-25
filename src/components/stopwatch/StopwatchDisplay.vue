<template>
  <div class="stopwatch">
    <section class="stopwatch-display-frame">
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

<script setup>
import { ref } from "vue";
import { useStopwatchStore } from "@/stores/stopwatch";

const stopwatchStore = useStopwatchStore();

const emit = defineEmits(["startWatch", "pauseWatch", "resetWatch", "lap"]);
const isGoing = ref(false);

const laptimeDisplay = ref("blom ada bentar ya");
const isLapping = ref(false);

function startWatch() {
  emit("startWatch");

  isGoing.value = true;
}

function pauseWatch() {
  emit("pauseWatch");
  isGoing.value = false;
}

function resetWatch() {
  emit("resetWatch");

  isGoing.value = false;
  isLapping.value = false;
}

function lap() {
  emit("lap");
  isLapping.value = true;
}
</script>

<style lang="scss" scoped>
:root {
  --stopwatch-dot: 0deg;
}

.time-display::after {
  content: "";
  background: var(--accent);
  height: 0.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  position: absolute;
  top: 0.5rem;
  left: calc(50% - 0.25rem);
  transform: rotate(var(--stopwatch-dot));
  transform-origin: 50% 105px;
}

.laptime-display {
  font-family: "Ubuntu Mono", monospace;
}

.stopwatch-display-frame {
  outline: 2px solid var(--color-border);
  background: var(--container-background);
  box-shadow: var(--shadow--offset) var(--shadow-color);
  border-radius: 50%;
  width: 29ch;
  margin: 0 auto;
  aspect-ratio: 1 / 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

@media screen and (min-width: 50em) {
  .btn-container {
    background: transparent;
    position: relative;
    bottom: unset;
  }

  .time-display::after {
    top: 0.5rem;
    transform: rotate(var(--stopwatch-dot));
  }
}
</style>
