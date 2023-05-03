import { createRouter, createWebHistory } from "vue-router";
import ClockView from "../views/ClockView.vue";

const routes = [
  {
    path: "/",
    name: "clock",
    component: ClockView,
  },
  {
    path: "/timer",
    name: "timer",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/TimerView.vue"),
  },
  {
    path: "/stopwatch",
    name: "stopwatch",
    component: () => import("../views/StopwatchView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
