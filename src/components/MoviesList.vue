<template>
<div class="position-relative">
  <movies-loader v-if="loading || fetching" :style="{top: loading ? '1em' : 'auto' , bottom: fetching ? '2em' : 'auto'}" />
  <div v-if="!loading" class="row" ref="list">
    <div v-for="(movie, index) in movies" :key="`${movie.id}-${index}`" class="col-md-6">
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
import { debounce } from 'lodash-es';
import { fetchMovies } from '@/api/movies';
import { mapState } from 'vuex';
import MovieCard from '@/components/MovieCard.vue';
import MoviesLoader from '@/components/MoviesLoader.vue';

export default {
  data: function() {
    return {
      movies: [],
      loading: true,
      fetching: true,
      page: 0,
      totalResults: 0
    };
  },
  components: {
    MovieCard,
    MoviesLoader
  },
  created() {
    this.debouncedScroll = debounce(this.scroll, 150);
  },
  async mounted() {
    await this.$store.dispatch('fetchGenres');
    const res = await fetchMovies(1);
    if (res.results.length) {
      this.movies = [...this.movies, ...res.results];
      this.page = res.page;
      this.totalResults = res.total_results;
    }
    this.loading = false;
    this.fetching = false;
    // Detect when scrolled to bottom.
    this.$nextTick(() => {
      window.addEventListener('scroll', this.debouncedScroll);
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.debouncedScroll);
  },
  computed: {
    ...mapState({
      genres: 'genres'
    })
  },
  methods: {
    getMovieGenres(genreIds) {
      return genreIds.map(id => this.genres[id]);
    },
    async scroll(e) {
      if (this.fetching || this.movies.length === this.totalResults) {
        return;
      }
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.fetching = true;
        const page = this.page + 1;
        const res = await fetchMovies(page);
        if (res.results.length) {
          this.movies = [...this.movies, ...res.results];
          this.page = res.page;
          this.totalResults = res.total_results;
        }
        this.fetching = false;
      }
    }
  }
};
</script>
