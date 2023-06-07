<template>
  <MainLayout>
    <h1>Placeholder content</h1>
    <template #main-content>
      <AnalogClock />
    </template>

    <WorldClock />
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import AnalogClock from "@/components/clock/AnalogClock.vue";
import WorldClock from "@/components/clock/WorldClock.vue";
</script>
