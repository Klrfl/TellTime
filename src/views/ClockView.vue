<template>
  <MainLayout>
    <template #main-content>
      <AnalogClock />
    </template>

    <ul class="list-container">
      <WorldClock />

      <li>
        <button
          class="btn btn-primary btn--circular"
          title="add new timezone to display"
          @click="openDialog">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
      </li>
    </ul>

    <dialog ref="worldClockDialog" @close="closeDialog" @click="closeDialog">
      <header>
        <h2>Choose a time zone to add</h2>
        <p>
          For the moment you can only search by country, I will add city name
          later
        </p>

        <input
          type="text"
          name="zone-search"
          id="zone-search"
          v-model="searchTerm"
          placeholder="look for a zone" />
      </header>

      <ul class="world-clock-list">
        <li class="time-zone" v-for="timezone in filteredWorldClockList">
          <div v-if="timezone.location">
            <p class="time-zone__country">
              {{ timezone.location.countryName }}
            </p>
            <span>
              {{ timezone.currentOffset }} {{ timezone.location.comment }}
            </span>
          </div>
        </li>
      </ul>

      <form method="dialog">
        <button class="btn btn--circular">close</button>
      </form>
    </dialog>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import AnalogClock from "@/components/clock/AnalogClock.vue";
import WorldClock from "@/components/clock/WorldClock.vue";
import timezones from "../assets/timezones.json";
import { computed, onMounted, ref } from "vue";

// dialog
const worldClockDialog = ref(null);

function openDialog() {
  worldClockDialog.value.showModal();
}

function closeDialog() {
  worldClockDialog.value.close();
}

const searchTerm = ref("");

const worldClockList = ref([]);
const filteredWorldClockList = computed(() => {
  return worldClockList.value.filter((zone) => {
    if (zone.location) {
      return zone.location.countryName.toLowerCase().includes(searchTerm.value);
    }
  });
});

onMounted(async () => {
  worldClockList.value = timezones.zones;
  console.log(worldClockList.value);
});
</script>

<style scoped>
dialog {
  border: 2px solid var(--color-border);
  background: inherit;
  color: inherit;
  backdrop-filter: blur(1rem);
  width: min(70ch, 100%);
  height: 50%;
  margin-inline: auto;
  padding: 0;
}

dialog header {
  padding: 1.5rem;
  position: sticky;
  top: 0;
  background: var(--color-background);
}

#zone-search {
  background: var(--color-background-soft);
  padding: 1rem;
  width: 100%;
}

.world-clock-list {
  padding: 0;
  margin: 0;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.time-zone {
  padding: 1rem;
}

.time-zone__country {
  margin: 0;
  line-height: 1.2;
}
</style>
