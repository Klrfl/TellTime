import { createRouter, createWebHistory } from "vue-router";

import ClockView from "@/views/ClockView.vue";
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
    component: () => import("@/views/StopwatchView.vue"),
  },
  {
    path: "/timer",
    name: "Timer",
    component: () => import("@/views/TimerView.vue"),
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
