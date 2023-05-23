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
        v-show="isStopped">
        <font-awesome-icon :icon="['fas', 'play']" />
      </button>

      <button
        class="btn btn--circular"
        @click="stopTimer"
        v-show="isStopped === false">
        <font-awesome-icon :icon="['fas', 'pause']" />
      </button>

      <button
        class="btn btn--circular"
        @click="resetTimer"
        :disabled="isStopped === false">
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

const emit = defineEmits(["displayTimer", "dontDisplayTimer"]);

const targetTime = ref(DateTime.fromISO(props.targetTime, { zone: "utc" }));

const targetTimeString = ref(0);

function updateTargetTime(target) {
  targetTime.value = DateTime.fromISO(target, { zone: "utc" });
}

watch(
  () => props.targetTime,
  () => {
    targetTimeString.value = props.targetTime;
  }
);

watch(
  () => targetTimeString.value,
  () => {
    updateTargetTime(`1970-01-01T${targetTimeString.value}`);
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

const isStopped = ref(true);
const displayTimer = ref(false);

function startTimer() {
  startTime.value = DateTime.utc();

  displayTimer.value = true;
  isStopped.value = false;
  emit("dontDisplayTimer");

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

    if (finalDelta.value.toMillis() <= 0) {
      clearInterval(interval);
      milliseconds.value = 0;
      isStopped.value = true;
    }
  });
}

function stopTimer() {
  isStopped.value = true;
  clearInterval(interval);

  const newTargetTime = ref(finalDelta.value.toFormat("hh:mm:ss.SSS"));
  updateTargetTime(`1970-01-01T${newTargetTime.value}`);
}

function resetTimer() {
  emit("displayTimer");
  isStopped.value = true;
  displayTimer.value = false;
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
  background: transparent;
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
