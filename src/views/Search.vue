<template>
  <div class="container">
    <h1 class="mb-4">Search a movie</h1>
    <div class="mb-4">
      <input type="text" :value="search" ref="search" class="form-control" @input="searchHandler($event)" placeholder="Enter a movie title to search..." />
    </div>
    <movies-list mode="search" :query="search" />
  </div>
</template>

<script>
import { debounce } from 'lodash-es';
import MoviesList from '@/components/MoviesList.vue';

export default {
  components: {
    MoviesList
  },
  data() {
    return {
      search: ''
    };
  },
  created() {
    this.searchHandler = debounce((event) => {
      this.search = event.target.value;
    }, 100);
  },
  mounted() {
    this.$refs.search.focus();
  }
};
</script>
