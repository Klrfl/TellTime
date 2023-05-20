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
  display: flex;
  flex-direction: column;
}

.container {
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}

.container--main-content {
  flex: 1 1 0;
}

.container--side-content {
  max-height: 50vh;
  overflow: auto;
  align-items: flex-start;
  flex: 2 1 0;
}

ul.list-container {
  margin: 0;
  padding: 0;
  list-style: none;
}

@media screen and (min-width: 50em) {
  .wrapper {
    flex-direction: row;
  }

  .container--side-content {
    order: -1;
    max-height: 100vh;
  }

  ul.list-container {
    margin: auto 0;
  }
}
</style>
