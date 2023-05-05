<template>
  <div class="timer-container">{{ hours }} : {{ minutes }} : {{ seconds }}</div>
</template>

<script setup>
import { ref } from "vue";

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
</script>

<style>
.timer-container {
  text-align: center;
}
</style>
