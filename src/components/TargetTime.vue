<template>
  <li class="target-time" @click="select">
    <p>{{ targetTime }}</p>
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
  outline: 1px solid;
  padding: 2rem;
}

.target-time:hover {
  background: #343434;
  cursor: pointer;
}
</style>
