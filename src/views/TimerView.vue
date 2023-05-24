<template>
  <MainLayout>
    <template #main-content>
      <Timer
        :targetTime="selectedTargetTime"
        @timerNotDisplayed="handleDisplayInput(true)"
        @timerDisplayed="handleDisplayInput(false)"></Timer>
    </template>

    <ul class="list-container target-time-container" v-show="displayInput">
      <TargetTime
        v-for="targetTime in targetTimes"
        :key="targetTime.id"
        :targetTime="targetTime.time"
        @select="selectTargetTime(targetTime.time)" />
    </ul>
  </MainLayout>
</template>

<script setup>
import { ref } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";
import Timer from "@/components/Timer.vue";
import TargetTime from "@/components/TargetTime.vue";

const displayInput = ref(true);

function handleDisplayInput(state) {
  displayInput.value = state;
}

const targetTimes = ref([
  {
    id: 1,
    time: `00:00:10`,
  },
  {
    id: 2,
    time: `00:00:15`,
  },
  {
    id: 3,
    time: `00:00:30`,
  },
  {
    id: 4,
    time: `00:00:45`,
  },
  {
    id: 5,
    time: `00:01:00`,
  },
]);

const selectedTargetTime = ref(targetTimes.value[0].time);

function selectTargetTime(targetTime) {
  selectedTargetTime.value = targetTime;
}
</script>

<style>
.target-time-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
