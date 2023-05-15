<template>
  <li class="target-time">
    <p>{{ targetTime }}</p>
  </li>
</template>

<script setup>
const props = defineProps(["targetTime"]);
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
