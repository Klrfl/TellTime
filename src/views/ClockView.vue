<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import AnalogClock from "@/components/clock/AnalogClock.vue";
import WorldClock from "@/components/clock/WorldClock.vue";
import timezones from "@/assets/timezones.json";
import { computed, onMounted, ref } from "vue";
import { useClockStore } from "../stores/clock";

const clockStore = useClockStore();

const timeZones = ref(timezones.zones);

const zoneSearch = ref(null);
const searchTerm = ref("");

const filteredTimeZones = computed(() => {
  return timeZones.value.filter((zone) => {
    if (zone.location) {
      return zone.location.countryName.toLowerCase().includes(searchTerm.value);
    }
  });
});

function zoneExists(targetZone) {
  return clockStore.displayedZones.includes(targetZone);
}

onMounted(() => {
  clockStore.getDisplayedZones();
});

// dialog
const worldClockDialog = ref(null);

function openDialog() {
  worldClockDialog.value.showModal();
  zoneSearch.value.focus();
}

function closeDialog() {
  worldClockDialog.value.close();
}
</script>

<template>
  <MainLayout>
    <template #main-content>
      <AnalogClock />
    </template>

    <ul
      :class="[
        'list-container',
        { 'list-container--empty': !clockStore.displayedZones.length },
      ]">
      <TransitionGroup name="list">
        <li v-if="!clockStore.displayedZones.length" class="empty-list-message">
          Your selected time zones will show up here
        </li>
        <WorldClock
          v-for="zoneCode in clockStore.displayedZones"
          :zoneCode="zoneCode"
          :key="zoneCode" />
      </TransitionGroup>

      <div class="btn-container">
        <button
          class="btn btn-primary btn--circular"
          title="add new timezone to display"
          @click="openDialog">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
      </div>
    </ul>

    <dialog ref="worldClockDialog">
      <header>
        <button class="btn btn--circular" @click="closeDialog">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </button>

        <h2>Choose a time zone to add</h2>
        <p>
          For the moment you can only search by country, I will add city name
          later
        </p>

        <input
          type="text"
          name="zone-search"
          id="zone-search"
          ref="zoneSearch"
          v-model="searchTerm"
          placeholder="look for a zone" />
      </header>

      <ul class="world-clock-list">
        <li v-for="timezone in filteredTimeZones">
          <button
            class="time-zone"
            :disabled="zoneExists(timezone.id)"
            v-if="timezone.location"
            @click="clockStore.addDisplayedZone(timezone.id)">
            <p class="time-zone__country">
              {{ timezone.location.countryName }}
            </p>
            <span>
              {{ timezone.currentOffset }} {{ timezone.location.comment }}
            </span>
          </button>
        </li>
      </ul>
    </dialog>
  </MainLayout>
</template>

<style scoped>
dialog {
  border: 2px solid var(--color-border);
  background: inherit;
  color: inherit;
  width: min(70ch, 100%);
  height: min(75vh, 100%);
  margin-inline: auto;
  padding: 0;
}

dialog::backdrop {
  backdrop-filter: blur(1rem);
}

dialog header {
  padding: 1.5rem;
  background: var(--color-background);
}

dialog .btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
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
  padding: 1rem;
  max-height: 100%;
  overflow: auto;
}

.time-zone {
  background: var(--color-background);
  display: block;
  width: 100%;
  padding: 1rem;
}

.time-zone:hover {
  background: var(--color-background-soft);
  cursor: pointer;
}

.time-zone:disabled {
  cursor: not-allowed;
  color: var(--color-text-dark);
  background: var(--color-background);
}

.time-zone:focus-visible {
  outline: 2px solid var(--accent);
  background: var(--color-background-mute);
}

.time-zone__country {
  margin: 0;
  line-height: 1.2;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition:
    opacity 300ms ease,
    transform 300ms ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.list-leave-active {
  width: 100%;
}
</style>
