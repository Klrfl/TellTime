<template>
  <div class="timer-container">
    <section class="timer-display">
      {{ hours }} : {{ minutes }} : {{ seconds }}
    </section>
    <section class="timer-button-container">
      <button class="start-timer">Start timer</button>
      <button class="end-timer">End timer</button>
    </section>

    <form class="timer-input">
      <input type="number" min="0" max="3600" v-model="hours" />
      <input type="number" min="0" max="60" v-model="minutes" />
      <input type="number" min="0" max="60" v-model="seconds" />
      <button @click.prevent="print">print</button>
    </form>
  </div>
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
