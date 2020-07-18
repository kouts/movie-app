<template>
  <div class="container">
    <loader :show="loading" />
    <h1 class="mb-4">Now playing in theaters</h1>
    <movies-list :movies="movies" :genres-map="genresMap" />
    <div v-if="movies.length === totalResults && totalResults > 0" class="font-weight-bold text-center mt-4">
      There are no more results to display
    </div>
    <scroll-to-load
      :fetcher="fetchData"
      :is-disabled="movies.length === totalResults"
      @fetch-start="loading = true"
      @fetch-end="fetchEnd"
    />
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
  mounted() {
    return Promise.all([fetchGenres(), fetchMovies(1)]).then(data => {
      this.genresMap = data[0];
      this.fetchEnd(data[1]);
    });
  },
  methods: {
    fetchData() {
      const nextPage = this.page + 1;
      return fetchMovies(nextPage);
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
