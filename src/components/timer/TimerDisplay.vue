<template>
  <div class="timer">
    <section class="time-display" v-show="displayTimer">
      <span class="time-display__hours">{{ timerStore.time.hours }}:</span>
      <span class="time-display__minutes">{{ timerStore.time.minutes }}:</span>
      <span class="time-display__seconds">{{ timerStore.time.seconds }}:</span>
      <span class="time-display__milliseconds">
        {{ timerStore.time.milliseconds }}
      </span>
    </section>

    <TimePicker
      size="large"
      v-model:value="timerStore.targetTimeString"
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
import { ref } from "vue";
import { TimePicker } from "ant-design-vue";
import { useTimerStore } from "@/stores/timer";

const timerStore = useTimerStore();

const emit = defineEmits(["timerDisplayed", "timerNotDisplayed"]);

const isPaused = ref(true);
const displayTimer = ref(false);

function addNewTargetTime() {
  timerStore.addTargetTime();
}

function startTimer() {
  if (timerStore.targetTime == null) {
    alert("Please select target time before starting the timer.");
    return;
  }

  emit("timerDisplayed");
  displayTimer.value = true;
  isPaused.value = false;
  timerStore.startTimer();
}

function pauseTimer() {
  isPaused.value = true;
  timerStore.pauseTimer();
}

function resetTimer() {
  emit("timerNotDisplayed");
  isPaused.value = true;
  displayTimer.value = false;
  timerStore.resetTimer();
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