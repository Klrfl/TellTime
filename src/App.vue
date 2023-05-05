<script setup>
import { shallowRef } from "vue";
import NavBar from "@/components/NavBar.vue";
import WorldClock from "@/components/WorldClock.vue";
import Timer from "@/components/Timer.vue";
import Stopwatch from "@/components/StopWatch.vue";

const routes = {
  WorldClock: {
    name: "Clock",
    component: WorldClock,
    icon: ["fas", "clock"],
  },
  Timer: {
    name: "Timer",
    component: Timer,
    icon: ["fas", "stopwatch"],
  },
  Stopwatch: {
    name: "Stopwatch",
    component: Stopwatch,
    icon: ["fas", "hourglass-start"],
  },
};

const currentRoute = shallowRef(WorldClock);

function movePages(targetRoute) {
  currentRoute.value = targetRoute;
}
</script>

<template>
  <NavBar :routes="routes" @move="movePages" />

  <main>
    <component :is="currentRoute"></component>
  </main>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

nav {
  order: 1;
}
/* 
main {
  flex: 1 1 0;
  display: grid;
  place-items: center;
} */
</style>
