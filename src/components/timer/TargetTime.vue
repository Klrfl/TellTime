<template>
  <li class="target-time" @click="selectTargetTime">
    <span>{{ targetTime.time }}</span>
    <button class="target-time__close" @click="deleteTargetTime">
      <font-awesome-icon :icon="['fas', 'square-xmark']"></font-awesome-icon>
    </button>
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
  outline: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem 2rem;
  user-select: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: var(--target-time-background-hover);
    cursor: pointer;
  }

  &__close {
    font-size: 1.25rem;
  }
}

@media (hover: hover) {
  .target-time__close {
    opacity: 0;
    transition: opacity 200ms ease;

    &:focus-visible {
      opacity: 1;
    }
  }

  .target-time:hover .target-time__close {
    opacity: 1;
  }
}
</style>
