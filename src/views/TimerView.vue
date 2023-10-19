<template>
  <MainLayout>
    <template #main-content>
      <TimerDisplay
        @timerNotDisplayed="displayInput = true"
        @timerDisplayed="displayInput = false" />
    </template>

    <ul class="list-container" v-show="displayInput">
      <li
        class="empty-list-message"
        v-show="timerStore.targetTimes.length === 0">
        No target time... yet
      </li>

      <TransitionGroup name="list">
        <TimerSelect
          v-for="targetTime in timerStore.targetTimes"
          :key="targetTime.id"
          :targetTime="targetTime"
          @delete="timerStore.deleteTargetTime(targetTime.id)"
          @click="timerStore.selectTargetTime(targetTime.id)" />
      </TransitionGroup>
    </ul>
  </MainLayout>
</template>

<script setup>
import { ref } from "vue";
import { useTimerStore } from "@/stores/timer";

import MainLayout from "@/layouts/MainLayout.vue";
import TimerDisplay from "@/components/timer/TimerDisplay.vue";
import TimerSelect from "@/components/timer/TimerSelect.vue";

const timerStore = useTimerStore();

const displayInput = ref(true);
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
