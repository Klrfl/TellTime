<template>
  <main>
    <slot></slot>
  </main>
</template>

<style scoped>
main {
  flex-grow: 1;
  max-width: 85ch;
  padding: 2rem;
  margin-inline: auto;
}
</style>
