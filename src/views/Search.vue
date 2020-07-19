<template>
  <div class="container">
    <loader :show="loading" />
    <h1 class="mb-4">Search a movie</h1>
    <div class="mb-4">
      <input ref="search" type="search" class="form-control" placeholder="Enter a movie title to search..." @input="searchHandler($event)" />
    </div>
    <movies-list :movies="movies" :genres-map="genresMap" />
    <div v-if="searchQuery && movies.length === 0 && !loading" class="font-weight-bold text-center">
      No results found
    </div>
    <div v-if="movies.length === totalResults && totalResults > 0" class="font-weight-bold text-center mt-4">
      There are no more results to display
    </div>
    <scroll-to-load :is-disabled="movies.length === totalResults || loading" @scrolled-to-bottom="fetchData" />
  </div>
</template>

<script>
import { debounce } from 'lodash-es';
import { fetchGenres } from '@/api/genres';
import { searchMovies } from '@/api/movies';
import Loader from '@/components/Loader.vue';
import ScrollToLoad from '@/components/ScrollToLoad';
import MoviesList from '@/components/MoviesList.vue';

export default {
  components: {
    Loader,
    ScrollToLoad,
    MoviesList
  },
  data() {
    return {
      movies: [],
      genresMap: {},
      loading: true,
      page: 0,
      totalResults: 0,
      searchQuery: ''
    };
  },
  created() {
    this.searchHandler = debounce(async(event) => {
      this.searchQuery = event.target.value;
      this.movies = [];
      this.page = 0;
      this.totalResults = 0;
      if (this.searchQuery) {
        this.loading = true;
        const data = await searchMovies(this.searchQuery, 1);
        this.fetchEnd(data);
      };
    }, 350);
  },
  async mounted() {
    this.loading = true;
    this.$refs.search.focus();
    this.genresMap = await fetchGenres();
    this.loading = false;
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const nextPage = this.page + 1;
      const res = await searchMovies(this.searchQuery, nextPage);
      this.fetchEnd(res);
    },
    fetchEnd(res) {
      this.movies = this.movies.concat(res.results);
      this.page = res.page;
      this.totalResults = res.totalResults;
      this.loading = false;
    }
  }
};
</script>
