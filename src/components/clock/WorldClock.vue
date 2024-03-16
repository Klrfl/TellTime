<template>
  <li class="world-clock">
    <span>{{ cityName }}</span>

    <div class="world-clock__time">
      <span class="hour">{{ now.c.hour }}</span>
      <span class="minute">{{ now.c.minute }}</span>
      <span class="second">{{ now.c.second }}</span>
    </div>
  </li>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useClockStore } from "../../stores/clock";

const props = defineProps({
  zoneCode: {
    type: String,
    required: true,
  },
});

const clockStore = useClockStore();
const now = ref(null);

setInterval(() => {
  now.value = clockStore.getLocalCurrentTime(props.zoneCode);
}, 200);

onBeforeMount(() => {
  now.value = clockStore.getLocalCurrentTime(props.zoneCode);
});

const cityName = props.zoneCode.split("/")[1].replace("_", " ");
</script>

<style lang="scss">
.world-clock {
  outline: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 2rem;

  display: flex;
  justify-content: space-between;

  &__time > *:not(:last-child)::after {
    content: ":";
  }
}
</style>
