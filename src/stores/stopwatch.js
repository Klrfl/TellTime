import { defineStore } from "pinia";
import { ref } from "vue";
import { DateTime } from "luxon";

export const useStopwatchStore = defineStore("stopwatch", () => {
  const startTime = ref(0);
  const elapsedTime = ref(DateTime.utc().diff(DateTime.utc()));
  let interval = null;

  function startWatch() {
    startTime.value = DateTime.utc().minus(elapsedTime.value);

    interval = setInterval(() => {
      elapsedTime.value = DateTime.utc().diff(startTime.value, [
        "hours",
        "minutes",
        "seconds",
        "milliseconds",
      ]);
    });
  }

  function pauseWatch() {
    clearInterval(interval);
  }

  const laps = ref([]);
  const lapNo = ref(1);
  const previousLapTime = ref(0);

  function resetWatch() {
    clearInterval(interval);

    startTime.value = 0;
    elapsedTime.value = DateTime.utc().diff(DateTime.utc());
    previousLapTime.value = 0;

    laps.value = [];
    lapNo.value = 1;
  }

  function lap() {
    const delta = DateTime.fromMillis(
      elapsedTime.value - previousLapTime.value,
    ).toFormat("mm:ss.SSS");

    // object for display in LapTime
    laps.value.push({
      no: lapNo.value++,

      time: {
        minutes: elapsedTime.value.minutes,
        seconds: elapsedTime.value.seconds,
        milliseconds: elapsedTime.value.milliseconds,
      },

      delta,
    });

    previousLapTime.value = elapsedTime.value; // change previousLap
  }

  return {
    startTime,
    elapsedTime,
    laps,
    startWatch,
    pauseWatch,
    resetWatch,
    lap,
  };
});
