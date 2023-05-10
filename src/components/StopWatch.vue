<template>
  <div class="stopwatch">
    <section class="display-container">
      <span class="display" id="stopwatch-display">
        {{ minutes }}:{{ seconds }}:{{ miliSeconds }}
      </span>
    </section>

    <section class="btn-container">
      <button class="btn btn--circular" @click="lap" :disabled="isStopped">
        lap
      </button>

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

const emit = defineEmits(["startWatch", "pauseWatch", "resetWatch", "lap"]);
const props = defineProps({
  minutes: Number,
  seconds: Number,
  miliSeconds: Number,
});

let isGoing = ref(false);
let isStopped = ref(true);

function startWatch() {
  emit("startWatch", isStopped.value);

  isGoing.value = true;
  isStopped.value = false;
}

function pauseWatch() {
  emit("pauseWatch");
  isGoing.value = false;
  isStopped.value = true;
}

function resetWatch() {
  emit("resetWatch");

  isGoing.value = false;
  isStopped.value = true;
}

function lap() {
  emit("lap");
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
  transform-origin: 50% 6rem;
}
</style>
