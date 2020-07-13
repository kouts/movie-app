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
import { fetchMovies, searchMovies } from '@/api/movies';
import { mapState } from 'vuex';
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
        this.fetching = true;
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
        this.fetching = false;
      }
    }
  },
  created() {
    this.debouncedScroll = debounce(this.scroll, 150);
  },
  async mounted() {
    await this.$store.dispatch('fetchGenres');
    if (this.mode === 'list') {
      this.loading = true;
      const res = await fetchMovies(1);
      if (res.results.length) {
        this.movies = [...this.movies, ...res.results];
        this.page = res.page;
        this.totalResults = res.total_results;
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
        let res = {};
        if (this.query) {
          res = await searchMovies(this.query, page);
        } else {
          res = await fetchMovies(page);
        }
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
