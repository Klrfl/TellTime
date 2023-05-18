<template>
  <main class="wrapper">
    <div class="container">
      <slot name="main-content"></slot>
    </div>

    <div class="container container--side-content">
      <slot></slot>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.container {
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;

  position: relative;
}

.container--side-content {
  max-height: 50vh;
  overflow: auto;
  align-items: flex-start;
}

@media screen and (min-width: 50em) {
  .wrapper {
    flex-direction: row;
  }

  .container--side-content {
    order: -1;
    max-height: 100vh;
  }
}
</style>
