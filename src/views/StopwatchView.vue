<template>
  <MainLayout>
    <template #main-content>
      <Stopwatch></Stopwatch>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import Stopwatch from "@/components/Stopwatch.vue";
</script>
