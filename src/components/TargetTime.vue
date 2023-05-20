<template>
  <li class="target-time" @click="select">
    <span>{{ targetTime }}</span>
  </li>
</template>

<script setup>
const props = defineProps({
  targetTime: Number,
});

const emit = defineEmits(["select"]);

function select() {
  emit("select");
}
</script>

<style>
.target-time {
  background: #2d2d2d;
  border-radius: 0.5rem;
  padding: 2rem;
}

.target-time:hover {
  background: #343434;
  cursor: pointer;
}
</style>
