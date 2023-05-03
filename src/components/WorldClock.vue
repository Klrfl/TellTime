<template>
  <div class="clock">
    <div class="clock__indicator-container--small">
      <span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span
      ><span class="clock__indicator--small"></span>
    </div>
    <div class="clock__indicator-container">
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
      <span class="clock__indicator"></span>
    </div>
    <div class="clock__dot"></div>
    <div class="clock__hand clock__hand--hours"></div>
    <div class="clock__hand clock__hand--minutes"></div>
    <div class="clock__hand clock__hand--seconds"></div>
  </div>
</template>

<script>
let root = document.querySelector(":root");

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const initialDate = new Date();
const date0 = new Date().setHours(0, 0, 0, 0);

window.addEventListener("load", () => {
  hoursEl.innerText = initialDate.getHours();
  minutesEl.innerText = initialDate.getMinutes();
  secondsEl.innerText = initialDate.getSeconds();
});

// update clock display every 1 second
setInterval(() => {
  const newDate = new Date();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let seconds = newDate.getSeconds();

  // format
  // if (hours < 10) {
  //   hours = `0${hours}`;
  // }
  // if (minutes < 10) {
  //   minutes = `0${minutes}`;
  // }
  // if (seconds < 10) {
  //   seconds = `0${seconds}`;
  // }

  // hoursEl.innerText = hours;
  // minutesEl.innerText = minutes;
  // secondsEl.innerText = seconds;

  // set hours, minutes and seconds to rotate clock

  root.style.setProperty(
    "--hours",
    `${((newDate - date0) / 86400000) * 720}deg`
  );
  root.style.setProperty("--minutes", `${(minutes / 60) * 360}deg`);
  root.style.setProperty("--seconds", `${(seconds / 60) * 360}deg`);

  // get current time in ms
  // console.log(((newDate - date0) / 86400000) * 720);
}, 1000);

// setInterval(() => {
//   const newDate = new Date();
//   // hours have a different formula for smooth rotation
//   root.style.setProperty(
//     "--hours",
//     `${ * 360}deg`
//   );
// });
</script>

<style>
:root {
  --hours: 60;
  --minutes: 60;
  --seconds: 60;
}

/* .watch-display {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.watch-display__displays {
  outline: 1px solid #aaa;
  padding: 2rem;
}
 */

.clock {
  background: #ccc;
  width: 22rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  position: relative;
}

.clock > * {
  position: absolute;
  bottom: 50%;
  left: 50%;
}

.clock__indicator-container,
.clock__indicator-container--small {
  position: absolute;
  inset: 0;
}

.clock__indicator,
.clock__indicator--small {
  background: transparent;
  position: absolute;
  bottom: 50%;
  width: 100%;
}

.clock__indicator {
  height: 0.2rem;
  border-left: 7vmin solid rgb(30, 30, 30);
  border-right: 7vmin solid rgb(30, 30, 30);
}

.clock__indicator--small {
  height: 0.1rem;
  background: transparent;
  position: absolute;
  bottom: 50%;
  width: 100%;
}

.clock__indicator:nth-child(2) {
  transform: rotate(30deg);
}

.clock__indicator:nth-child(3) {
  transform: rotate(60deg);
}

.clock__indicator:nth-child(4) {
  transform: rotate(90deg);
}

.clock__indicator:nth-child(5) {
  transform: rotate(120deg);
}

.clock__indicator:nth-child(6) {
  transform: rotate(150deg);
}

.clock__dot,
.clock__hand {
  box-shadow: 5px 5px 15px #444;
}

.clock__dot {
  background: black;
  width: 2rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  transform: translate(-50%, 50%);
  z-index: 1;
}

.clock__hand {
  background: #222;
  width: 0.25rem;
  border-top-left-radius: 30%;
  border-top-right-radius: 30%;
  transition: transform 200ms cubic-bezier(0.1, 2.7, 0.58, 1);
}

.clock__hand--hours {
  aspect-ratio: 1 / 32;
  transform: translate(-50%, 25%) rotate(var(--hours));

  /* origin formula: 0 calc(width * (height - (height * 25%))) */
  transform-origin: 50% calc(0.25rem * 24);
}

.clock__hand--minutes {
  aspect-ratio: 1 / 48;
  transform: translate(-50%, 25%) rotate(var(--minutes));
  transform-origin: 50% calc(0.25rem * 36);
}

.clock__hand--seconds {
  background: red;
  width: 0.25rem;
  aspect-ratio: 1 / 48;
  transform: translate(-50%, 25%) rotate(var(--seconds));
  transform-origin: 50% calc(0.25rem * 36);
}
</style>
