<template>
  <MainLayout>
    <template #main-content>
      <Timer :targetTime="selectedTargetTime"></Timer>
    </template>

    <ul class="list-container target-time-container">
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

const targetTimes = ref([
  {
    id: 1,
    time: 10000,
  },
  {
    id: 2,
    time: 15000,
  },
  {
    id: 3,
    time: 30000,
  },
  {
    id: 5,
    time: 60000,
  },
]);

const selectedTargetTime = ref();
selectedTargetTime.value = targetTimes.value[0].time;

function selectTargetTime(targetTime) {
  selectedTargetTime.value = targetTime;
  console.log(selectedTargetTime.value);
}
</script>

<style>
.target-time-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.target-time {
  flex: 0 1 0;
}
</style>
