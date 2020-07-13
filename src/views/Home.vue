<template>
  <div class="container">
    <movies-list />
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue';

export default {
  name: 'Home',
  components: {
    MoviesList
  }
};
</script>
