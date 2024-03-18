<template>
  <li class="world-clock">
    <section>
      <p class="world-clock__city">{{ cityName }}</p>

      <time class="world-clock__time">
        <span class="hour">{{ now.c.hour }}</span>
        <span class="minute">{{ now.c.minute }}</span>
        <span class="second">{{ now.c.second }}</span>
      </time>
    </section>

    <section>
      <button class="world-clock__delete" @click="deleteZoneCode">
        <font-awesome-icon :icon="['fas', 'square-xmark']" />
      </button>
    </section>
  </li>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useClockStore } from "@/stores/clock";

const props = defineProps({
  zoneCode: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["deleteZone"]);

const clockStore = useClockStore();
const now = ref(null);

setInterval(() => {
  now.value = clockStore.getLocalCurrentTime(props.zoneCode);
}, 200);

onBeforeMount(() => {
  now.value = clockStore.getLocalCurrentTime(props.zoneCode);
});

const cityName = props.zoneCode.split("/")[1].replace("_", " ");

function deleteZoneCode() {
  clockStore.deleteTimeZoneCode(props.zoneCode);
}
</script>

<style lang="scss">
.world-clock {
  outline: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__city {
    margin: 0;
  }

  &__time {
    font-weight: bold;
  }

  &__time > *:not(:last-child)::after {
    content: ":";
  }

  @media (hover: hover) {
    &__delete {
      opacity: 0;
      transition: opacity 200ms ease;
    }

    &:hover &__delete {
      opacity: 1;
    }
  }

  &__delete {
    font-size: 1.5rem;
  }
}
</style>
