<template>
  <MainLayout>
    <template #main-content>
      <Timer
        :targetTime="selectedTargetTime"
        @timerNotDisplayed="handleDisplayInput(true)"
        @timerDisplayed="handleDisplayInput(false)"
        @addNewTargetTime="addNewTargetTime" />
    </template>

    <ul class="list-container" v-show="displayInput">
      <li class="empty-list-message" v-show="targetTimes.length === 0">
        No target time... yet
      </li>

      <TransitionGroup name="list">
        <TargetTime
          v-for="targetTime in targetTimes"
          :key="targetTime.id"
          :targetTime="targetTime"
          @select="selectTargetTime(targetTime.time)"
          @delete="deleteTargetTime" />
      </TransitionGroup>
    </ul>
  </MainLayout>
</template>

<script setup>
import { ref } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";
import Timer from "@/components/timer/Timer.vue";
import TargetTime from "@/components/timer/TargetTime.vue";

const displayInput = ref(true);

function handleDisplayInput(state) {
  displayInput.value = state;
}

const currentId = ref(5);

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

const selectedTargetTime = ref(targetTimes.value[0].time);

function selectTargetTime(targetTime) {
  selectedTargetTime.value = targetTime;
}

function addNewTargetTime(targetTime) {
  const newTargetTime = {
    id: (currentId.value += 1),
    time: `${targetTime}`,
  };

  targetTimes.value.push(newTargetTime);
}

function deleteTargetTime(targetTimeId) {
  const found = targetTimes.value.find(
    (targetTime) => targetTime.id === targetTimeId,
  );

  targetTimes.value.splice(targetTimes.value.indexOf(found), 1);
}
</script>

<style>
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
