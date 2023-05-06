import { createApp } from "vue";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faClock,
  faStopwatch,
  faHourglassStart,
  faPlay,
  faRotateLeft,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faClock,
  faStopwatch,
  faHourglassStart,
  faPlay,
  faRotateLeft,
  faPause
);

import "./assets/main.css";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
