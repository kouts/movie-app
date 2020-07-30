<template>
  <div class="container">
    <loader :show="loading" />
    <h1 class="mb-4">Now playing in theaters</h1>
    <movies-list :movies="movies" :genres-map="genresMap" />
    <div v-if="movies.length === 0 && loading" class="row">
      <div v-for="item in [1, 2, 3, 4]" :key="item" class="col-md-6">
        <div class="card mb-3" style="min-height: 324px;"></div>
      </div>
    </div>
    <div v-if="movies.length === 0 && !loading" class="font-weight-bold text-center mt-4">
      No movies found
    </div>
    <div v-if="movies.length === totalResults && totalResults > 0" class="font-weight-bold text-center mt-4">
      There are no more results to display
    </div>
    <scroll-to-load :is-disabled="movies.length === totalResults || loading" @scrolled-to-bottom="fetchMovies(page + 1)" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Loader from '@/components/Loader.vue';
import ScrollToLoad from '@/components/ScrollToLoad';
import MoviesList from '@/components/MoviesList.vue';

export default {
  components: {
    Loader,
    ScrollToLoad,
    MoviesList
  },
  computed: {
    ...mapState('moviesHome', {
      movies: state => state.movies,
      loading: state => state.loading,
      page: state => state.page,
      totalResults: state => state.totalResults
    }),
    ...mapGetters('moviesHome', [
      'genresMap'
    ])
  },
  mounted() {
    Promise.all([this.fetchGenres(), this.fetchMovies(1)]);
  },
  methods: {
    ...mapActions('moviesHome', [
      'fetchMovies',
      'fetchGenres'
    ])
  }
};
</script>
