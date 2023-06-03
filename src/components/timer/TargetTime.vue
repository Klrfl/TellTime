<template>
  <li
    class="target-time"
    @click="selectTargetTime"
    @dblclick="deleteTargetTime">
    <span>{{ targetTime.time }}</span>
  </li>
</template>

<script setup>
const props = defineProps({
  targetTime: Object,
});

const emit = defineEmits(["select", "delete"]);

function selectTargetTime() {
  emit("select");
}

function deleteTargetTime() {
  emit("delete", props.targetTime.id);
}
</script>

<style lang="scss">
.target-time {
  background: var(--target-time-background);
  border-radius: 0.5rem;
  padding: 1.5rem 1rem;
  user-select: none;

  &:hover {
    background: var(--target-time-background-hover);
    cursor: pointer;
  }
}
</style>
