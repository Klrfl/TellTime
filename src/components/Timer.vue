<template>
  <div class="timer">
    <section class="timer-display">
      {{ hours }} : {{ minutes }} : {{ seconds }} : {{ milliseconds }}
    </section>

    <section class="picker-container">
      <TimePicker v-model:value="customTargetTime" value-format="HH:mm:ss" />
    </section>

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
import { onMounted, watch, ref } from "vue";

import { TimePicker } from "ant-design-vue";

import { DateTime } from "luxon";

const props = defineProps({
  targetTime: String,
});

const targetTime = ref(DateTime.fromISO(props.targetTime, { zone: "utc" }));

const customTargetTime = ref(0);

function updateTargetTime(target) {
  targetTime.value = DateTime.fromISO(target, { zone: "utc" });
}

// watch props
watch(
  () => props.targetTime,
  () => {
    updateTargetTime(props.targetTime);
    resetTimer();
  }
);

// watch from picker
watch(
  () => customTargetTime.value,
  () => {
    updateTargetTime(`1970-01-01T${customTargetTime.value}`);
    resetTimer();
  }
);

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const milliseconds = ref(0);

const isStopped = ref(true);

const startTime = ref(0);
const deltaFromStartTime = ref(0);

let interval = null;
const finalDelta = ref(0);

function startTimer() {
  startTime.value = DateTime.utc();

  isStopped.value = false;

  interval = setInterval(() => {
    deltaFromStartTime.value = DateTime.utc().diff(startTime.value, [
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ]);

    finalDelta.value = targetTime.value.diff(deltaFromStartTime.value, [
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
  clearInterval(interval);
  isStopped.value = true;
}

function resetTimer() {
  hours.value = targetTime.value.c.hour;
  minutes.value = targetTime.value.c.minute;
  seconds.value = targetTime.value.c.second;
  milliseconds.value = targetTime.value.c.millisecond;
}

onMounted(resetTimer);
</script>

<style>
.timer-container {
  text-align: center;
  font-size: 2rem;
}

.timer-display {
  text-align: center;
  font-size: 2rem;
}
</style>
