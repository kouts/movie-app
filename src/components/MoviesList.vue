<template>
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
    <movie-details
      :show-modal="showDetailsModal"
      :movie-id="selectedMovieId"
      :movie-title="selectedMovieTitle"
      :movie-release-date="selectedMovieReleaseDate"
      @modal-closed="showDetailsModal = false"
    />
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import MovieDetails from '@/components/MovieDetails.vue'

export default {
  components: {
    MovieCard,
    MovieDetails
  },
  props: {
    movies: {
      type: Array,
      default: () => []
    },
    genresMap: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showDetailsModal: false,
      selectedMovieId: null,
      selectedMovieTitle: '',
      selectedMovieReleaseDate: null
    }
  },
  methods: {
    getMovieGenres(genreIds) {
      return genreIds.map((id) => this.genresMap[id])
    },
    viewDetails(movieId) {
      const selectedMovie = this.movies.find((movie) => movie.id === movieId)
      this.selectedMovieId = selectedMovie.id
      this.selectedMovieTitle = selectedMovie.title
      this.selectedMovieReleaseDate = selectedMovie.release_date
      this.showDetailsModal = true
    }
  }
}
</script>
