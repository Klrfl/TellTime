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
import { watch, ref } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";
import Timer from "@/components/Timer.vue";
import TargetTime from "@/components/TargetTime.vue";

const targetTimes = ref([
  {
    id: 1,
    time: `1970-01-01T00:00:10.000`,
  },
  {
    id: 2,
    time: `1970-01-01T00:00:15.000`,
  },
  {
    id: 3,
    time: `1970-01-01T00:00:30.000`,
  },
  {
    id: 4,
    time: `1970-01-01T00:00:45.000`,
  },
  {
    id: 5,
    time: `1970-01-01T00:01:00.000`,
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
