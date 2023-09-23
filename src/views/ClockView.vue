<template>
  <MainLayout>
    <template #main-content>
      <AnalogClock />
    </template>

    <ul class="list-container">
      <WorldClock />
    </ul>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import AnalogClock from "@/components/clock/AnalogClock.vue";
import WorldClock from "@/components/clock/WorldClock.vue";
</script>
