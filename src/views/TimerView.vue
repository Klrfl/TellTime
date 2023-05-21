<template>
  <MainLayout>
    <template #main-content>
      <Timer :targetTime="selectedTargetTime"></Timer>
      <TimePicker
        v-model:value="time"
        value="0"
        value-format="HH:mm:ss"></TimePicker>
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

import { TimePicker } from "ant-design-vue";

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

const time = ref(0);

watch(
  () => time.value,
  () => {
    console.log(time.value);
  }
);

const selectedTargetTime = ref();
selectedTargetTime.value = targetTimes.value[0].time;

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
