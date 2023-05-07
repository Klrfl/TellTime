<template>
  <div class="timer">
    <section class="timer-display">
      {{ hours }} : {{ minutes }} : {{ seconds }}
    </section>
    <section class="btn-container">
      <button class="btn btn--circular" @click="startTimer">
        <font-awesome-icon :icon="['fas', 'play']" />
      </button>
      <button class="btn btn--circular" @click="stopTimer">
        <font-awesome-icon :icon="['fas', 'rotate-left']" />
      </button>
    </section>

    <!-- <form class="timer-input">
      <input type="number" min="0" max="3600" v-model="hours" />
      <input type="number" min="0" max="60" v-model="minutes" />
      <input type="number" min="0" max="60" v-model="seconds" />
      <button @click.prevent="print">print</button>
    </form> -->
  </div>
</template>

<script setup>
import { ref } from "vue";

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const isStopped = ref(true);

const startTime = ref(0);
const currentTime = ref(0);
const delta = ref(0);
const targetTime = new Date(35000);

let interval = null;

function getCurrentTime() {
  return new Date().getTime();
}

function startTimer() {
  if (isStopped.value === true) {
    // startTime.value = startTime.
  }
  startTime.value = getCurrentTime();

  isStopped.value = false;

  interval = setInterval(() => {
    currentTime.value = getCurrentTime();
    delta.value = new Date(currentTime.value - startTime.value);

    console.log(delta.value);
    hours.value = delta.value.getHours();
    minutes.value = delta.value.getMinutes();
    seconds.value = delta.value.getSeconds();
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}
</script>

<style>
.timer-container {
  text-align: center;
  font-size: 2rem;
}
</style>
