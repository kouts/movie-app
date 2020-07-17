<template>
  <div>
    <movie-details
      :show-modal="showDetailsModal"
      :movie-id="selectedMovieId"
      :movie-title="selectedMovieTitle"
      :movie-release-date="selectedMovieReleaseDate"
      @modal-closed="showDetailsModal = false"
    />
    <loader :show="loading" />
    <div v-if="mode === 'search' && query && movies.length === 0 && !loading" class="font-weight-bold text-center">
      No results found
    </div>
    <div class="row">
      <div v-for="(movie, index) in movies" :key="`${movie.id}-${index}`" class="col-md-6">
        <movie-card
          :movie-id="movie.id"
          :poster-path="movie.poster_path"
          :title="movie.title"
          :release-date="movie.release_date"
          :genre-ids="movie.genre_ids"
          :vote-average="movie.vote_average"
          :overview="movie.overview"
          :genres="getMovieGenres(movie.genre_ids)"
          @view-details="viewDetails"
        />
      </div>
    </div>
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
import { fetchMovies, searchMovies } from '@/api/movies';
import MovieCard from '@/components/MovieCard.vue';
import MovieDetails from '@/components/MovieDetails.vue';
import Loader from '@/components/Loader.vue';
import ScrollToLoad from '@/components/ScrollToLoad';

export default {
  components: {
    Loader,
    MovieCard,
    MovieDetails,
    ScrollToLoad
  },
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
  data() {
    return {
      movies: [],
      genresMap: [],
      loading: true,
      page: 0,
      totalResults: 0,
      showDetailsModal: false,
      selectedMovieId: null,
      selectedMovieTitle: '',
      selectedMovieReleaseDate: null
    };
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
  mounted() {
    return Promise.all([
      fetchGenres(),
      this.mode === 'list' ? fetchMovies(1) : Promise.resolve({
        results: [],
        page: 0,
        total_results: 0
      })
    ]).then(data => {
      this.genresMap = data[0];
      this.movies = this.movies.concat(data[1].results);
      this.updatePagingInfo(data[1].page, data[1].total_results);
      this.loading = false;
    });
  },
  methods: {
    fetchData() {
      const nextPage = this.page + 1;
      if (this.mode === 'list') {
        return fetchMovies(nextPage);
      } else if (this.mode === 'search') {
        return searchMovies(this.query, nextPage);
      }
    },
    fetchEnd(res) {
      this.movies = this.movies.concat(res.results);
      this.updatePagingInfo(res.page, res.total_results);
      this.loading = false;
    },
    getMovieGenres(genreIds) {
      return genreIds.map(id => this.genresMap[id]);
    },
    updatePagingInfo(page, totalResults) {
      this.page = page;
      this.totalResults = totalResults;
    },
    viewDetails(movieId) {
      const selectedMovie = this.movies.find(movie => movie.id === movieId);
      this.selectedMovieId = selectedMovie.id;
      this.selectedMovieTitle = selectedMovie.title;
      this.selectedMovieReleaseDate = selectedMovie.release_date;
      this.showDetailsModal = true;
    }
  }
};
</script>
