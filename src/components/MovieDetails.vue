<template>
<div>
  <modal
    v-model="open"
    :title="`${movieTitle} ${year ? '(' + year + ')' : ''}`"
    modal-class="movie-details-modal"
    @beforeOpen="beforeModalOpen"
    @afterOpen="afterModalOpen"
    @closing="closingModal"
  >
    <ul class="nav nav-tabs mt-1">
      <li class="nav-item position-relative">
        <a :class="['nav-link', tabActive === 'overview' && 'active']" href="#" @click="tabActive = 'overview'">Overview</a>
      </li>
      <li class="nav-item position-relative">
        <a :class="['nav-link', tabActive === 'reviews' && 'active']" href="#" @click="tabActive = 'reviews'">
          Reviews
        </a>
      </li>
      <li class="nav-item position-relative">
        <a :class="['nav-link', tabActive === 'similarMovies' && 'active']" href="#" @click="tabActive = 'similarMovies'">
          Similar movies
        </a>
      </li>
    </ul>
    <div v-if="loading" class="d-flex position-relative">
      <loader style="position: absolute; top: 85px;" />
    </div>
    <div v-else class="pt-2">
      <movie-overview
        v-show="tabActive === 'overview'"
        :title="movie.title"
        :year="year"
        :vote-average="movie.vote_average"
        :votes="movie.vote_count"
        :release-iso-date="movie.release_date"
        :duration-in-mins="movie.runtime"
        :language="movie.original_language"
        :genres="getMovieGenres(movie.genres)"
        :poster-path="movie.poster_path"
        :trailer-key="trailer.key"
        :overview="movie.overview"
      />
      <movie-reviews v-show="tabActive === 'reviews'" :reviews="reviews" class="mt-2" />
      <movie-similar-movies v-show="tabActive === 'similarMovies'" :movies="similarMovies" />
    </div>
  </modal>
</div>
</template>

<script>
import Modal from '@kouts/vue-modal';
import Loader from '@/components/Loader.vue';
import MovieOverview from '@/components/MovieOverview.vue';
import MovieReviews from '@/components/MovieReviews.vue';
import MovieSimilarMovies from '@/components/MovieSimilarMovies.vue';
import { getYearFromIsoDate } from '@/common/utils';
import { fetchMovie, fetchMovieVideos, fetchMovieReviews, fetchMovieSimilarMovies } from '@/api/movies';

export default {
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    movieId: {
      type: Number,
      default: null
    },
    movieTitle: {
      type: String,
      default: ''
    },
    movieReleaseDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
      movie: {},
      trailer: {},
      reviews: [],
      similarMovies: [],
      tabActive: 'overview' // overview, reviews, similarMovies
    };
  },
  computed: {
    open: {
      get() {
        return this.showModal;
      },
      set(newValue) {
        if (newValue === false) {
          this.$emit('modal-closed');
        }
      }
    },
    year() {
      return getYearFromIsoDate(this.movieReleaseDate);
    }
  },
  watch: {
    tabActive: {
      handler: async function(val, oldVal) {
        this.loading = true;
        if (val === 'reviews' && this.reviews.length === 0) {
          this.reviews = await fetchMovieReviews(this.movieId).then(data => data.results.slice(0, 2));
        }
        if (val === 'similarMovies' && this.similarMovies.length === 0) {
          this.similarMovies = await fetchMovieSimilarMovies(this.movieId).then(data => data.results);
        }
        this.loading = false;
      }
    }
  },
  components: {
    Modal,
    Loader,
    MovieOverview,
    MovieReviews,
    MovieSimilarMovies
  },
  methods: {
    async beforeModalOpen() {
      this.loading = true;
      this.initializeModalState();
      const data = await Promise.all([fetchMovie(this.movieId), this.fetchMovieTrailer()]);
      this.movie = data[0];
      this.trailer = data[1];
      this.loading = false;
    },
    afterModalOpen() {
      document.body.classList.add('overflow-hidden');
    },
    closingModal() {
      document.body.classList.remove('overflow-hidden');
    },
    initializeModalState() {
      this.movie = {};
      this.trailer = {};
      this.reviews = [];
      this.similarMovies = [];
      this.tabActive = 'overview';
    },
    fetchMovieTrailer() {
      return fetchMovieVideos(this.movieId).then(data => {
        return data.results.filter(o => o.type === 'Trailer' && o.site === 'YouTube')[0] || {};
      });
    },
    getMovieGenres(genresArrayOfObj) {
      return genresArrayOfObj.map(o => o.name);
    }
  }
};
</script>

<style lang="scss">
.movie-details-modal {
  max-width: 900px;
  min-height: 250px;
}
.movie-votes-box {
  line-height: 1em;
  text-align: center;
}
.vm-btn-close:focus {
  outline: thin dotted !important;
}
</style>
