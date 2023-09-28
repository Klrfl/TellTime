import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { DateTime } from "luxon";

export const useTimerStore = defineStore("timer", () => {
  const targetTimes = ref([
    {
      id: 1,
      time: `00:00:10`,
    },
    {
      id: 2,
      time: `00:00:15`,
    },
    {
      id: 3,
      time: `00:00:30`,
    },
    {
      id: 4,
      time: `00:00:45`,
    },
    {
      id: 5,
      time: `00:01:00`,
    },
  ]);

  const selectedTargetTimeID = ref(null);
  const selectedTargetTime = computed(() =>
    targetTimes.value.find(
      (targetTime) => targetTime.id === selectedTargetTimeID.value,
    ),
  );

  function selectTargetTime(targetTimeID) {
    selectedTargetTimeID.value = targetTimeID;
    setTargetTime(selectedTargetTime.value.time);
  }

  const newID = ref(100);

  function addTargetTime() {
    const newTargetTime = {
      id: (newID.value += 1),
      time: targetTimeString.value,
    };

    targetTimes.value.push(newTargetTime);
  }

  function deleteTargetTime(targetTimeId) {
    const found = targetTimes.value.find(
      (targetTime) => targetTime.id === targetTimeId,
    );

    targetTimes.value.splice(targetTimes.value.indexOf(found), 1);
  }

  //main timer logic
  const isPaused = ref(true);

  const targetTime = ref(
    DateTime.fromISO(`1970-01-01T${selectedTargetTime.time}`, {
      zone: "utc",
    }),
  );

  const targetTimeString = ref(targetTimes.value[0].time);

  function setTargetTime(target) {
    targetTime.value = DateTime.fromISO(`1970-01-01T${target}`, {
      zone: "utc",
    });
  }

  watch(
    () => selectedTargetTime.value,
    () =>
      (targetTimeString.value = targetTime.value.toLocaleString(
        DateTime.TIME_24_WITH_SECONDS,
      )),
  );

  watch(
    () => targetTimeString.value,
    () => {
      setTargetTime(targetTimeString.value);
      selectedTargetTimeID.value = null;
    },
  );

  const time = ref({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const startTime = ref(0);
  let interval = null;
  const initialDelta = ref(0);
  const finalDelta = ref(0);

  function startTimer() {
    isPaused.value = false;
    startTime.value = DateTime.utc();
    // calculate difference between startTime and now, every millisecond
    interval = setInterval(() => {
      initialDelta.value = DateTime.utc().diff(startTime.value, [
        "hours",
        "minutes",
        "seconds",
        "milliseconds",
      ]);

      // calculate again to take pausing time into account
      finalDelta.value = targetTime.value.diff(initialDelta.value, [
        "hours",
        "minutes",
        "seconds",
        "milliseconds",
      ]);

      time.value = finalDelta.value;

      // stop timer when 0
      if (finalDelta.value.toMillis() <= 0) {
        pauseTimer();
        time.value = {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        };
      }
    });
  }

  function pauseTimer() {
    isPaused.value = true;
    clearInterval(interval);
    setTargetTime(finalDelta.value.toFormat("hh:mm:ss.SSS"));
  }

  function resetTimer() {
    isPaused.value = true;
    clearInterval(interval);
    setTargetTime(targetTimeString.value);
  }

  return {
    targetTimes,
    selectedTargetTimeID,
    selectedTargetTime,
    targetTime,
    targetTimeString,
    time,
    isPaused,
    selectTargetTime,
    addTargetTime,
    deleteTargetTime,
    startTimer,
    pauseTimer,
    resetTimer,
  };
});
