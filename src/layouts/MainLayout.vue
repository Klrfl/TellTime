<template>
  <main class="wrapper">
    <div class="container container--main-content">
      <slot name="main-content"></slot>
    </div>

    <div class="container container--side-content">
      <slot></slot>
    </div>
  </main>
</template>

<style>
.wrapper {
  flex-grow: 1;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  position: relative;
}

.container {
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
}

.container--main-content {
  flex: 1 1 0;
}

.container--side-content {
  box-shadow: 0 4px 4px 2px var(--shadow-color) inset;
  max-height: 50vh;
  overflow: auto;
  align-items: flex-start;
  flex: 2 1 0;
}

@media screen and (min-width: 50em) {
  .wrapper {
    flex-direction: row;
  }

  .container--side-content {
    order: -1;
    max-height: unset;
    flex: 1 1 0;
  }
}
</style>
