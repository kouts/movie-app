<template>
  <div class="container">
    <h1 class="mb-4">Now playing in theaters</h1>
    <movies-list />
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue';

export default {
  components: {
    MoviesList
  }
};
</script>
