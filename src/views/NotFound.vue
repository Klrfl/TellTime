<template>
  <div class="not-found">
    <h1>Where am I?</h1>
    <p>We could'nt find what you're looking for. Sorry.</p>
    <p>
      Go back to
      <router-link to="/">home</router-link>
    </p>
  </div>
</template>

<style>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
