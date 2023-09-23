<template>
  <MainLayout>
    <template #main-content>
      <Timer
        @timerNotDisplayed="handleDisplayInput(true)"
        @timerDisplayed="handleDisplayInput(false)" />
    </template>

    <ul class="list-container" v-show="displayInput">
      <li
        class="empty-list-message"
        v-show="timerStore.targetTimes.length === 0">
        No target time... yet
      </li>

      <TransitionGroup name="list">
        <TargetTime
          v-for="targetTime in timerStore.targetTimes"
          :key="targetTime.id"
          :targetTime="targetTime"
          @delete="timerStore.deleteTargetTime(targetTime.id)"
          @click="selectTargetTime(targetTime.id)" />
      </TransitionGroup>
    </ul>
  </MainLayout>
</template>

<script setup>
import { ref } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";
import Timer from "@/components/timer/Timer.vue";
import TargetTime from "@/components/timer/TargetTime.vue";
import { useTimerStore } from "@/stores/timer";

const timerStore = useTimerStore();

const displayInput = ref(true);

function handleDisplayInput(state) {
  displayInput.value = state;
}

function selectTargetTime(targetTimeID) {
  timerStore.selectTargetTime(targetTimeID);
}
</script>

<style>
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
</style>
