<template>
  <div class="container">
    <h1 class="mb-4">Now playing in theaters</h1>
    <movies-list />
    <go-to-top />
  </div>
</template>

<script>
import GoToTop from '@/components/GoToTop.vue';
import MoviesList from '@/components/MoviesList.vue';

export default {
  components: {
    GoToTop,
    MoviesList
  }
};
</script>
