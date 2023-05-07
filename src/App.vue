<script setup>
import { shallowRef } from "vue";

import NavBar from "@/components/NavBar.vue";

import ClockView from "@/views/ClockView.vue";
import TimerView from "@/views/TimerView.vue";
import StopwatchView from "@/views/StopwatchView.vue";

const routes = {
  ClockView: {
    name: "Clock",
    component: ClockView,
    icon: ["fas", "clock"],
  },
  Timer: {
    name: "Timer",
    component: TimerView,
    icon: ["fas", "stopwatch"],
  },
  Stopwatch: {
    name: "Stopwatch",
    component: StopwatchView,
    icon: ["fas", "hourglass-start"],
  },
};

const currentRoute = shallowRef(ClockView);

function movePages(targetRoute) {
  currentRoute.value = targetRoute;
}
</script>

<template>
  <NavBar :routes="routes" @move="movePages" />
  <component :is="currentRoute"></component>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

nav {
  order: 1;
}
@media screen and (min-width: 40em) {
  #app {
    flex-direction: row;
  }

  nav {
    order: 0;
  }
}
</style>
