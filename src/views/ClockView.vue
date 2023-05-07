<template>
  <MainLayout>
    <template #main-content>
      <WorldClock />
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import WorldClock from "@/components/WorldClock.vue";
</script>
