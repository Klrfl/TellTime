<script setup>
import ContentOnly from "@/layouts/ContentOnly.vue";
</script>

<template>
  <ContentOnly>
    <h1>Where am I?</h1>
    <p>We could'nt find what you're looking for. Sorry.</p>
    <p>
      Go back to
      <RouterLink :to="{ name: 'Home' }">home</RouterLink>
    </p>
  </ContentOnly>
</template>
