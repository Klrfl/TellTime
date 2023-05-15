<template>
  <MainLayout>
    <template #main-content>
      <Timer></Timer>
    </template>

    <ul class="target-time-container">
      <TargetTime
        v-for="targetTime in targetTimes"
        :key="targetTime.id"
        :targetTime="targetTime.time" />
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
]);
</script>

<style>
.target-time-container {
  list-style: none;
}
</style>
