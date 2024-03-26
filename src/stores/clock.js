import { DateTime } from "luxon";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useClockStore = defineStore("clock", () => {
  const currentTime = ref(DateTime.now());

  setInterval(() => {
    currentTime.value = DateTime.now();
  }, 1000);

  function getLocalCurrentTime(zone) {
    return currentTime.value.setZone(zone);
  }

  const displayedZonesStorageKey = "telltime-zones";
  const displayedZones = ref(["America/New_York"]);

  function getDisplayedZones() {
    const fromLocalStorage = JSON.parse(
      localStorage.getItem(displayedZonesStorageKey),
    );

    if (fromLocalStorage !== null || Array.isArray(fromLocalStorage)) {
      displayedZones.value = fromLocalStorage;
    }
  }

  /**
   * add new time zone code.
   * this function also automatically store codes in localStorage.
   */
  function addDisplayedZone(code) {
    if (displayedZones.value.includes(code)) return;
    displayedZones.value.push(code);
    storeDisplayedZones();
  }

  function storeDisplayedZones() {
    localStorage.setItem(
      displayedZonesStorageKey,
      JSON.stringify(displayedZones.value),
    );
  }

  function deleteDisplayedZone(deletedZone) {
    displayedZones.value = displayedZones.value.filter((zone) => {
      return zone !== deletedZone;
    });

    storeDisplayedZones();
  }

  return {
    displayedZones,
    currentTime,
    getLocalCurrentTime,
    getDisplayedZones,
    storeDisplayedZones,
    addDisplayedZone,
    deleteDisplayedZone,
  };
});
