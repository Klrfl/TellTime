<template>
  <li class="target-time" @click="select">
    <span>{{ targetTime }}</span>
  </li>
</template>

<script setup>
const props = defineProps({
  targetTime: String,
});

const emit = defineEmits(["select"]);

function select() {
  emit("select");
}
</script>

<style lang="scss">
.target-time {
  background: var(--target-time-background);
  border-radius: 0.5rem;
  padding: 2rem;

  &:hover {
    background: var(--target-time-background-hover);
    cursor: pointer;
  }
}
</style>
