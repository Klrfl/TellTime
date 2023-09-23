<template>
  <div class="timer">
    <section class="time-display" v-show="displayTimer">
      {{ time.hours }}:{{ time.minutes }}:{{ time.seconds }}.<span
        class="time-display__ms">
        {{ time.milliseconds }}
      </span>
    </section>

    <TimePicker
      size="large"
      v-model:value="targetTimeString"
      value-format="HH:mm:ss"
      v-show="!displayTimer" />

    <section class="btn-container">
      <button
        class="btn btn-primary btn--circular"
        @click="startTimer"
        v-show="isPaused">
        <font-awesome-icon :icon="['fas', 'play']" />
      </button>

      <button class="btn btn--circular" @click="pauseTimer" v-show="!isPaused">
        <font-awesome-icon :icon="['fas', 'pause']" />
      </button>

      <button
        class="btn btn--circular"
        @click="resetTimer"
        :disabled="displayTimer && !isPaused">
        <font-awesome-icon :icon="['fas', 'rotate-left']" />
      </button>

      <button
        class="btn btn--circular"
        title="add new target time"
        @click="addNewTargetTime"
        :disabled="displayTimer">
        <font-awesome-icon :icon="['fas', 'plus']" />
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

const emit = defineEmits([
  "timerDisplayed",
  "timerNotDisplayed",
  "addNewTargetTime",
]);

const targetTime = ref(null);
const targetTimeString = ref(`00:00:10`);

function updateTargetTime(target) {
  targetTime.value = DateTime.fromISO(`1970-01-01T${target}`, { zone: "utc" });
}

// set targetTime on mount
updateTargetTime(targetTimeString.value);

watch(
  () => props.targetTime,
  () => (targetTimeString.value = props.targetTime),
);

watch(
  () => targetTimeString.value,
  () => updateTargetTime(targetTimeString.value),
);

const time = ref({
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});

const startTime = ref(0);
let interval = null;
const initialDelta = ref(0);
const finalDelta = ref(0);

const isPaused = ref(true);
const displayTimer = ref(false);

function addNewTargetTime() {
  emit("addNewTargetTime", targetTimeString.value);
}

function startTimer() {
  if (targetTime.value.c == null) {
    alert("Please select target time before starting the timer.");
    return;
  }

  startTime.value = DateTime.utc();

  emit("timerDisplayed");
  isPaused.value = false;
  displayTimer.value = true;

  // calculate difference between startTime and now, every millisecond
  interval = setInterval(() => {
    initialDelta.value = DateTime.utc().diff(startTime.value, [
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ]);

    // calculate again to take pausing time into account
    finalDelta.value = targetTime.value.diff(initialDelta.value, [
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ]);

    time.value = finalDelta.value;

    // stop timer when 0
    if (finalDelta.value.toMillis() <= 0) {
      clearInterval(interval);
      time.value = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
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
  align-items: center;
  gap: 1rem;
}

.ant-picker {
  background: var(--container-background);
  border-radius: 0.5rem;
  border: none;
  outline: 2px solid var(--color-border);
  box-shadow: var(--shadow--offset) var(--shadow-color);
  color: unset;
  padding: 1rem 2rem;

  &-clear {
    background: var(--container-background);

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
