<template>
  <div class="container">
    <h1 class="mb-4">Search</h1>
    <div class="mb-4">
      <input type="text" v-model="search" class="form-control" @input="search = $event.target.value" placeholder="Enter a movie title to search..." />
    </div>
    <movies-list mode="search" :query="search" />
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue';

export default {
  components: {
    MoviesList
  },
  data: function() {
    return {
      search: ''
    };
  }
};
</script>
