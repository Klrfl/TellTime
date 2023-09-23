<template>
  <div class="stopwatch">
    <section class="stopwatch-display-frame">
      <span class="time-display">
        {{ elapsedTime.minutes }}:{{ elapsedTime.seconds }}.<span
          class="time-display__ms">
          {{ elapsedTime.milliseconds }}
        </span>
      </span>
      <span class="laptime-display" v-show="isLapping">
        {{ laptimeDisplay }}
      </span>
    </section>

    <section class="btn-container">
      <button class="btn btn--circular" @click="lap" :disabled="isStopped">
        <font-awesome-icon :icon="['fas', 'flag']" />
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
import { ref, computed } from "vue";

const emit = defineEmits(["startWatch", "pauseWatch", "resetWatch", "lap"]);
const props = defineProps({
  elapsedTime: [Object, Number],
});

const isGoing = ref(false);
const isStopped = computed(() => !isGoing.value);

function startWatch() {
  emit("startWatch", isStopped.value);

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

const isLapping = ref(false);

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
