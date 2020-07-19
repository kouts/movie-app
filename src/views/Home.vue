<template>
  <div class="container">
    <loader :show="loading" />
    <h1 class="mb-4">Now playing in theaters</h1>
    <movies-list :movies="movies" :genres-map="genresMap" />
    <div v-if="movies.length === 0 && !loading" class="font-weight-bold text-center mt-4">
      No movies found
    </div>
    <div v-if="movies.length === totalResults && totalResults > 0" class="font-weight-bold text-center mt-4">
      There are no more results to display
    </div>
    <scroll-to-load :is-disabled="movies.length === totalResults || loading" @scrolled-to-bottom="fetchData" />
  </div>
</template>

<script>
import { fetchGenres } from '@/api/genres';
import { fetchMovies } from '@/api/movies';
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
      totalResults: 0
    };
  },
  async mounted() {
    this.loading = true;
    const data = await Promise.all([fetchGenres(), fetchMovies(1)]);
    this.genresMap = data[0];
    this.fetchEnd(data[1]);
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const nextPage = this.page + 1;
      const res = await fetchMovies(nextPage);
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
