<template>
  <li>
    <button
      class="target-time"
      @click.self="selectTargetTime"
      title="select this time">
      <span>{{ targetTime.time }}</span>
      <button
        class="target-time__close"
        @click.stop="deleteTargetTime"
        title="delete this time">
        <font-awesome-icon :icon="['fas', 'square-xmark']" />
      </button>
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
  emit("delete");
}
</script>

<style lang="scss">
.target-time {
  outline: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem 2rem;
  user-select: none;

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: var(--container-background);
    cursor: pointer;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
  }

  &__close {
    font-size: 1.5rem;
  }

  &.active {
    scale: 1.04 1.04;
  }
}

@media (hover: hover) {
  .target-time__close {
    opacity: 0;
    transition: opacity 200ms ease;

    &:focus-visible {
      opacity: 1;
      outline: 2px solid var(--accent);
    }
  }

  .target-time:hover .target-time__close {
    opacity: 1;
  }
}
</style>
