<template>
  <div>
    <modal
      v-model="open"
      :title="`${movieTitle} (${year || 'N/A'})`"
      modal-class="movie-details-modal"
      @beforeOpen="beforeModalOpen"
      @afterOpen="afterModalOpen"
      @closing="closingModal"
    >
      <ul class="nav nav-tabs mt-1">
        <li class="nav-item position-relative">
          <a :class="['nav-link', tabActive === 1 && 'active']" href="#" @click="tabActive = 1">Trailer</a>
        </li>
        <li class="nav-item position-relative">
          <a :class="['nav-link', tabActive === 2 && 'active']" href="#" @click="tabActive = 2">
            Reviews <span :class="['badge badge-tab', tabActive === 2 ? 'badge-primary' : 'badge-secondary']">{{reviews.length}}</span>
          </a>
        </li>
        <li class="nav-item position-relative">
          <a :class="['nav-link', tabActive === 3 && 'active']" href="#" @click="tabActive = 3">
            Similar movies <span :class="['badge badge-tab', tabActive === 3 ? 'badge-primary' : 'badge-secondary']">{{similarMovies.length}}</span>
          </a>
        </li>
      </ul>
      <div v-if="loading" class="d-flex position-relative">
        <loader style="position: absolute; top: 85px;" />
      </div>
      <div v-else class="pt-3">
        <movie-trailer v-show="tabActive === 1" :video-id="trailer.key" />
        <movie-reviews v-show="tabActive === 2" :reviews="reviews" />
        <movie-similar-movies v-show="tabActive === 3" :movies="similarMovies" />
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@kouts/vue-modal';
import Loader from '@/components/Loader.vue';
import MovieTrailer from '@/components/MovieTrailer.vue';
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
  data: function() {
    return {
      loading: true,
      movie: {},
      trailer: {},
      reviews: [],
      similarMovies: [],
      tabActive: 1
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
    year: function() {
      return getYearFromIsoDate(this.movieReleaseDate);
    }
  },
  components: {
    Modal,
    Loader,
    MovieTrailer,
    MovieReviews,
    MovieSimilarMovies
  },
  methods: {
    async beforeModalOpen() {
      this.loading = true;
      this.initializeModalState();
      const data = await this.fetchMovieDetails();
      this.movie = data[0];
      this.trailer = data[1].results.filter(o => o.type === 'Trailer' && o.site === 'YouTube')[0] || {};
      this.reviews = data[2].results.slice(0, 2);
      this.similarMovies = data[3].results;
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
      this.tabActive = 1;
    },
    fetchMovieDetails() {
      return Promise.all([
        fetchMovie(this.movieId),
        fetchMovieVideos(this.movieId),
        fetchMovieReviews(this.movieId),
        fetchMovieSimilarMovies(this.movieId)
      ]);
    }
  }
};
</script>

<style lang="scss">
  .movie-details-modal {
    max-width: 900px;
    min-height: 250px;
  }
  .badge-tab {
    position: absolute;
    z-index: 1;
    right: -0.6em;
    top: -0.6em;
  }
</style>
