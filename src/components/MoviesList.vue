<template>
<div>
  <movie-details />
  <loader v-if="loading" />
  <div class="font-weight-bold text-center" v-if="mode === 'search' && query && movies.length === 0">
    No results found
  </div>
  <div class="row">
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
  <div class="font-weight-bold text-center mt-4" v-if="movies.length === totalResults && totalResults > 0">
    There are no more results to display
  </div>
</div>
</template>

<script>
import { debounce } from 'lodash-es';
import { fetchGenres } from '@/api/genres';
import { fetchMovies, searchMovies } from '@/api/movies';
import MovieCard from '@/components/MovieCard.vue';
import MovieDetails from '@/components/MovieDetails.vue';
import Loader from '@/components/Loader.vue';

export default {
  props: {
    mode: {
      type: String,
      default: 'list' // 'list' or 'search'
    },
    query: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      movies: [],
      genresMap: [],
      loading: true,
      page: 0,
      totalResults: 0
    };
  },
  components: {
    Loader,
    MovieCard,
    MovieDetails
  },
  watch: {
    query: {
      handler: async function(val, oldVal) {
        this.loading = true;
        let res = { results: [], page: 0, total_results: 0 };
        if (val !== '') {
          res = await searchMovies(this.query, 1);
        }
        this.movies = res.results;
        this.updatePagingInfo(res.page, res.total_results);
        this.loading = false;
      }
    }
  },
  async mounted() {
    this.genresMap = await fetchGenres();
    if (this.mode === 'list') {
      const res = await fetchMovies(1);
      this.movies = this.movies.concat(res.results);
      this.updatePagingInfo(res.page, res.total_results);
    }
    window.addEventListener('scroll', this.scrollHandler);
    this.loading = false;
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  methods: {
    getMovieGenres(genreIds) {
      return genreIds.map(id => this.genresMap[id]);
    },
    scrollHandler: debounce(async function() {
      if (this.loading || this.movies.length === this.totalResults) {
        return;
      }
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.loading = true;
        const nextPage = this.page + 1;
        let res = {};
        if (this.mode === 'list') {
          res = await fetchMovies(nextPage);
        } else if (this.mode === 'search') {
          res = await searchMovies(this.query, nextPage);
        }
        this.movies = this.movies.concat(res.results);
        this.updatePagingInfo(res.page, res.total_results);
        this.loading = false;
      }
    }, 150),
    updatePagingInfo(page, totalResults) {
      this.page = page;
      this.totalResults = totalResults;
    }
  }
};
</script>
