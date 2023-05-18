import { createRouter, createWebHistory } from "vue-router";

import ClockView from "@/views/ClockView.vue";

const routes = [
  {
    path: "/",
    name: "Clock",
    component: ClockView,
  },
  {
    path: "/stopwatch",
    name: "Stopwatch",
    component: () => import("@/views/StopwatchView.vue"),
  },
  {
    path: "/timer",
    name: "Timer",
    component: () => import("@/views/TimerView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "nav-link-active",
});

export default router;
