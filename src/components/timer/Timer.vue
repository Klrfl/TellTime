<template>
  <div class="timer">
    <section class="timer-display" v-show="displayTimer">
      {{ hours }} : {{ minutes }} : {{ seconds }} : {{ milliseconds }}
    </section>

    <TimePicker
      size="large"
      v-model:value="targetTimeString"
      value-format="HH:mm:ss"
      v-show="displayTimer === false" />

    <section class="btn-container">
      <button
        class="btn btn-primary btn--circular"
        @click="startTimer"
        v-show="isPaused">
        <font-awesome-icon :icon="['fas', 'play']" />
      </button>

      <button
        class="btn btn--circular"
        @click="pauseTimer"
        v-show="isPaused === false">
        <font-awesome-icon :icon="['fas', 'pause']" />
      </button>

      <button
        class="btn btn--circular"
        @click="resetTimer"
        :disabled="isPaused === false">
        <font-awesome-icon :icon="['fas', 'rotate-left']" />
      </button>
    </section>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";

import { TimePicker } from "ant-design-vue";

import { DateTime } from "luxon";

const props = defineProps({
  targetTime: String,
});

const emit = defineEmits(["timerDisplayed", "timerNotDisplayed"]);

const targetTime = ref(null);
const targetTimeString = ref(`00:00:10`);

function updateTargetTime(target) {
  targetTime.value = DateTime.fromISO(`1970-01-01T${target}`, { zone: "utc" });
}

// set targetTime on mount
updateTargetTime(targetTimeString.value);

watch(
  () => props.targetTime,
  () => {
    targetTimeString.value = props.targetTime;
  }
);

watch(
  () => targetTimeString.value,
  () => {
    updateTargetTime(targetTimeString.value);
  }
);

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const milliseconds = ref(0);

const startTime = ref(0);
let interval = null;
const initialDelta = ref(0);
const finalDelta = ref(0);

const isPaused = ref(true);
const displayTimer = ref(false);

function startTimer() {
  startTime.value = DateTime.utc();

  displayTimer.value = true;
  isPaused.value = false;
  emit("timerDisplayed");

  // calculate difference between startTime and now, every millisecond
  interval = setInterval(() => {
    initialDelta.value = DateTime.utc().diff(startTime.value, [
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ]);

    finalDelta.value = targetTime.value.diff(initialDelta.value, [
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ]);

    hours.value = finalDelta.value.hours;
    minutes.value = finalDelta.value.minutes;
    seconds.value = finalDelta.value.seconds;
    milliseconds.value = finalDelta.value.milliseconds;

    // stop timer when 0
    if (finalDelta.value.toMillis() <= 0) {
      clearInterval(interval);
      milliseconds.value = 0;
      isPaused.value = true;
    }
  });
}

function pauseTimer() {
  isPaused.value = true;
  clearInterval(interval);

  updateTargetTime(finalDelta.value.toFormat("hh:mm:ss.SSS"));
}

function resetTimer() {
  emit("timerNotDisplayed");
  isPaused.value = true;
  displayTimer.value = false;

  updateTargetTime(props.targetTime);
}
</script>

<style lang="scss">
.timer-container {
  text-align: center;
  font-size: 2rem;
}

.timer {
  display: flex;
  flex-direction: column;
}

.timer-display {
  text-align: center;
  font-size: 2rem;
}

.ant-picker {
  color: unset;
  background: var(--picker-background);
  border: 1px solid var(--vt-c-divider-light-1);

  &-clear {
    background: var(--picker-background);

    &:hover {
      color: unset;
    }
  }
}

.ant-picker-panel-container {
  background: transparent;
  backdrop-filter: blur(10px);
}

[data-theme="dark"] {
  .ant-picker-input > input {
    color: #ddd;
  }

  .ant-picker-time-panel-column
    > li.ant-picker-time-panel-cell
    .ant-picker-time-panel-cell-inner {
    &:hover {
      background: #8882;
    }
    color: #ddd;
  }

  .ant-picker-time-panel-column
    > li.ant-picker-time-panel-cell-selected
    .ant-picker-time-panel-cell-inner {
    background: #aaa2;
  }
}
</style>
