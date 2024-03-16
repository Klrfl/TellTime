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

  return { currentTime, getLocalCurrentTime };
});
