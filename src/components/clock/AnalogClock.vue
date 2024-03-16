<template>
  <div class="clock">
    <DigitalClock :time="now.c" />
    <div class="clock__indicator-container">
      <span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span
      ><span class="clock__indicator"></span>
    </div>
    <div class="clock__dot"></div>
    <div class="clock__hand clock__hand--hours"></div>
    <div class="clock__hand clock__hand--minutes"></div>
    <div class="clock__hand clock__hand--seconds"></div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import DigitalClock from "@/components/clock/DigitalClock.vue";
import { useClockStore } from "@/stores/clock";

const clockStore = useClockStore();

const now = ref(null);
onBeforeMount(() => {
  now.value = clockStore.currentTime;
});

setInterval(() => {
  now.value = clockStore.currentTime;
}, 200);

const root = document.querySelector(":root");
function setMinuteSecondHands() {
  root.style.setProperty(
    "--minutesDeg",
    `${(now.value.c.minute / 60) * 360}deg`,
  );
  root.style.setProperty(
    "--secondsDeg",
    `${(now.value.c.second / 60) * 360}deg`,
  );
}

const date0 = new Date().setHours(0, 0, 0, 0);
function setHourHand() {
  root.style.setProperty(
    "--hoursDeg",
    `${((new Date() - date0) / 86_400_000) * 720}deg`,
  );
}

// set hours, minutes and seconds to rotate clock
setInterval(() => {
  setMinuteSecondHands();
  setHourHand();
}, 200);

onBeforeMount(() => {
  setMinuteSecondHands();
  setHourHand();
});
</script>

<style lang="scss">
$clock-hand-width: 0.2rem;

/* origin formula: 0 calc(width * (height - (height * 25%))) */
@mixin center-clock-hands($width, $height) {
  aspect-ratio: calc(1 / $height);
  transform-origin: 50% calc($width * ($height * 75 / 100));
}

@mixin display-indicator($thickness, $color) {
  border-left: $thickness solid $color;
}

.clock {
  outline: 2px solid var(--color-border);
  background: var(--container-background);
  box-shadow: var(--shadow--offset) var(--shadow-color);
  max-width: 24rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  flex-basis: 22rem;
  position: relative;

  & > * {
    position: absolute;
    bottom: 50%;
    left: 50%;
  }

  &__indicator-container {
    inset: 0;
  }

  &__indicator {
    background: transparent;
    position: absolute;
    inset: auto 0 50% 0;
    height: 0.25rem;
    @include display-indicator(2vmin, var(--indicator-color-small));
  }

  // rotate thick clock indicator
  @for $i from 1 through 60 {
    &__indicator:nth-child(#{$i}) {
      $degree: calc($i * 6);
      transform: translateY(50%) rotate(#{$degree}deg);

      // if is multiple of 5
      @if $i % 5 == 0 {
        @include display-indicator(5vmin, var(--indicator-color-big));
      }
    }
  }

  &__dot,
  &__hand {
    box-shadow: var(--shadow--offset) var(--shadow-color);
  }

  &__dot {
    background: var(--clock-dot-color);
    width: 1rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    transform: translate(-50%, 50%);
    z-index: 1;
  }

  &__hand {
    background: var(--clock-hand-color);
    width: $clock-hand-width;
    border-radius: 30% 30% 0 0;
    @include center-clock-hands($clock-hand-width, 42);

    &--hours {
      @include center-clock-hands($clock-hand-width, 30);
    }

    &--seconds {
      background: var(--accent);
    }

    @supports (translate: -50%) {
      translate: -50% 25%;
      // transition: rotate 200ms cubic-bezier(0.1, 2.7, 0.58, 1);

      &--hours {
        rotate: var(--hoursDeg);
      }
      &--minutes {
        rotate: var(--minutesDeg);
      }
      &--seconds {
        rotate: var(--secondsDeg);
      }
    }

    @supports not (translate: -50%) {
      &--hours {
        transform: translate(-50%, 25%) rotate(var(--hoursDeg));
      }

      &--minutes {
        transform: translate(-50%, 25%) rotate(var(--minutesDeg));
      }

      &--seconds {
        transform: translate(-50%, 25%) rotate(var(--secondsDeg));
      }
    }
  }
}
</style>
