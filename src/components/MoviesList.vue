<template>
<div>
  <h1 class="mb-4">Now playing in theaters</h1>
  <div v-if="loading" class="row">
    <div class="">Loading</div>
  </div>
  <div v-else class="row">
    <div v-for="movie in movies" :key="movie.id" class="col-md-6">
      <movie-card
        :poster-path="movie.poster_path"
        :original-title="movie.original_title"
        :release-date="movie.release_date"
        :genre-ids="movie.genre_ids"
        :vote-average="movie.vote_average"
        :overview="movie.overview"
        :genres="getMovieGenres(movie.genre_ids)"
      />
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import MovieCard from '@/components/MovieCard.vue';

export default {
  name: 'MoviesList',
  data: function() {
    return {
      loading: true
    };
  },
  components: {
    MovieCard
  },
  async created() {
    await this.$store.dispatch('fetchGenres');
    await this.$store.dispatch('fetchMovies', { page: 1 });
    this.loading = false;
  },
  computed: {
    ...mapState({
      genres: 'genres',
      movies: 'movies'
    })
  },
  methods: {
    getMovieGenres(genreIds) {
      return genreIds.map(id => this.genres[id]);
    }
  }
};
</script>
