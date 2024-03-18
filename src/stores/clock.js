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

  const timeZoneStorageKey = "telltime-zones";
  const timeZoneCodes = ref(["America/New_York"]);

  function getTimeZoneCodes() {
    const fromLocalStorage = JSON.parse(
      localStorage.getItem(timeZoneStorageKey),
    );

    if (fromLocalStorage !== null || Array.isArray(fromLocalStorage)) {
      timeZoneCodes.value = fromLocalStorage;
    }
  }

  /**
   * add new time zone code.
   * this function also automatically store codes in localStorage.
   */
  function addTimeZoneCode(code) {
    if (timeZoneCodes.value.includes(code)) return;
    timeZoneCodes.value.push(code);
    storeTimeZoneCodes();
  }

  function storeTimeZoneCodes() {
    localStorage.setItem(
      timeZoneStorageKey,
      JSON.stringify(timeZoneCodes.value),
    );
  }

  function deleteTimeZoneCode(deletedZone) {
    timeZoneCodes.value = timeZoneCodes.value.filter((zone) => {
      return zone !== deletedZone;
    });

    storeTimeZoneCodes();
  }

  return {
    timeZoneCodes,
    currentTime,
    getLocalCurrentTime,
    getTimeZoneCodes,
    storeTimeZoneCodes,
    addTimeZoneCode,
    deleteTimeZoneCode,
  };
});
