<template>
<div class="position-relative">
  <div v-if="mode === 'search' && query && movies.length === 0" class="col">No results found</div>
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
import { fetchGenres } from '@/api/genres';
import { fetchMovies, searchMovies } from '@/api/movies';
import MovieCard from '@/components/MovieCard.vue';
import MoviesLoader from '@/components/MoviesLoader.vue';

export default {
  props: {
    mode: {
      type: String,
      default: 'list'
    },
    query: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      movies: [],
      genres: [],
      loading: false,
      fetching: false,
      page: 0,
      totalResults: 0
    };
  },
  components: {
    MovieCard,
    MoviesLoader
  },
  watch: {
    query: {
      handler: async function(val, oldVal) {
        this.loading = true;
        const page = 1;
        let res = {};
        if (val) {
          res = await searchMovies(this.query, page);
        } else {
          res.results = [];
        }
        if (res.results.length) {
          this.movies = res.results;
          this.page = res.page;
          this.totalResults = res.total_results;
        } else {
          this.movies = res.results;
          this.page = 0;
          this.totalResults = 0;
        }
        this.loading = false;
      }
    }
  },
  created() {
    this.debouncedScroll = debounce(this.scroll, 150);
  },
  async mounted() {
    this.genres = await fetchGenres();
    if (this.mode === 'list') {
      this.loading = true;
      const res = await fetchMovies(1);
      if (res.results.length) {
        this.updateMoviesAndPagingInfo(res.results, res.page, res.total_results);
      }
      this.loading = false;
    }
    this.$nextTick(() => {
      window.addEventListener('scroll', this.debouncedScroll);
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.debouncedScroll);
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
        let res = {};
        if (this.mode === 'list') {
          res = await fetchMovies(page);
        } else if (this.mode === 'search') {
          res = await searchMovies(this.query, page);
        }
        if (res.results.length) {
          this.updateMoviesAndPagingInfo(res.results, res.page, res.total_results);
        }
        this.fetching = false;
      }
    },
    updateMoviesAndPagingInfo(movies, page, totalResults) {
      this.movies = this.movies.concat(movies);
      this.page = page;
      this.totalResults = totalResults;
    }
  }
};
</script>
