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
import { computed, onBeforeMount, ref } from "vue";

import { DateTime } from "luxon";

const props = defineProps({
  zoneCode: {
    type: String,
    required: true,
  },
});

const now = ref("Anjing");
const timeZone = ref("");

const cityName = computed(() => {
  return props.zoneCode.split("/")[1].replace("_", " ");
});

function getTimeOfZone(zone) {
  now.value = DateTime.now().setZone(zone);
  timeZone.value = now.value._zone;
}

setInterval(() => {
  getTimeOfZone(props.zoneCode);
}, 1000);

onBeforeMount(() => {
  getTimeOfZone(props.zoneCode);
});
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
