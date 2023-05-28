import { createRouter, createWebHistory } from "vue-router";

import ClockView from "@/views/ClockView.vue";
import StopwatchView from "@/views/StopwatchView.vue";
import TimerView from "@/views/TimerView.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Clock",
    component: ClockView,
  },
  {
    path: "/stopwatch",
    name: "Stopwatch",
    component: StopwatchView,
  },
  {
    path: "/timer",
    name: "Timer",
    component: TimerView,
  },
  {
    path: "/about-us",
    name: "About",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "nav-link-active",
});

export default router;
