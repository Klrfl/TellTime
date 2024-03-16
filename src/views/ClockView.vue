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

    <dialog ref="worldClockDialog" @close="closeDialog">
      <form method="dialog">
        <h2>Hello!</h2>
        <p>I am going to make a list here but bear with me</p>

        <ul class="world-clock-list">
          <li></li>
        </ul>
        <button class="btn btn--circular">close</button>
      </form>
    </dialog>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import AnalogClock from "@/components/clock/AnalogClock.vue";
import WorldClock from "@/components/clock/WorldClock.vue";
import { onMounted, ref } from "vue";

// dialog
const worldClockDialog = ref(null);

function openDialog() {
  worldClockDialog.value.showModal();
}

function closeDialog() {
  worldClockDialog.value.close();
}

// world clock list
// const worldClockListKey = "telltime-world-clock-list";
// const worldClockList = ref(localStorage.getItem(worldClockListKey)) || ref([]);
const worldClockList = ref([]);

async function getWorldClockList() {
  try {
    const data = await fetch(
      "https://nodatime.org/timezones?version=2023c&format=json",
    );
    const response = await data.json();
    console.log(data);
    return response;
  } catch (err) {
    console.error(err.message);
  }

  // JSON.stringify(localStorage.setItem(worldClockListKey, worldClockList));
}

onMounted(async () => {
  worldClockList.value = await getWorldClockList();
  console.log(worldClockList.value);
});
</script>
