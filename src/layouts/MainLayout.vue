<template>
  <main class="wrapper">
    <div class="container">
      <slot></slot>
    </div>
    <div class="container">
      <slot name="main-content"></slot>
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
}

.container:first-child {
  order: 1;
}

@media screen and (min-width: 50em) {
  .wrapper {
    flex-direction: row;
  }

  .container:first-child {
    order: -1;
  }
}
</style>
