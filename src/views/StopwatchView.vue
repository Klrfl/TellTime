<template>
  <MainLayout>
    <template #main-content>
      <StopwatchDisplay
        @pauseWatch="pauseWatch"
        @startWatch="startWatch"
        @resetWatch="resetWatch"
        @lap="stopwatchStore.lap" />
    </template>

    <ul class="list-container">
      <li class="empty-list-message" v-show="stopwatchStore.laps.length === 0">
        No laps... yet
      </li>

      <TransitionGroup name="list">
        <StopwatchLapTime
          v-for="lap in stopwatchStore.laps"
          :key="lap.no"
          :lap="lap" />
      </TransitionGroup>
    </ul>
  </MainLayout>
</template>

<script setup>
import { useStopwatchStore } from "@/stores/stopwatch";

import MainLayout from "@/layouts/MainLayout.vue";
import StopwatchDisplay from "@/components/stopwatch/StopwatchDisplay.vue";
import StopwatchLapTime from "@/components/stopwatch/StopwatchLapTime.vue";

const stopwatchStore = useStopwatchStore();
const root = document.querySelector(":root");

let interval = null;

function startWatch() {
  stopwatchStore.startWatch();

  // rotate dot
  interval = setInterval(() => {
    root.style.setProperty(
      "--stopwatch-dot",
      `${(stopwatchStore.elapsedTime.toMillis() / 60000) * 360}deg`,
    );
  });
}

function pauseWatch() {
  stopwatchStore.pauseWatch();
  clearInterval(interval);
}

function resetWatch() {
  stopwatchStore.resetWatch();
  clearInterval(interval);
  root.style.removeProperty("--stopwatch-dot");
}
</script>

<style scoped>
/* transitions for laptimes*/
.list-move,
.list-enter-active,
.list-leave-active {
  transition:
    opacity 300ms ease,
    transform 300ms ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.list-leave-active {
  width: 100%;
}

.list-container {
  flex-direction: column-reverse;
}
</style>
