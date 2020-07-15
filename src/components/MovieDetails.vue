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
        <a :class="['nav-link', tabActive === 'trailer' && 'active']" href="#" @click="tabActive = 'trailer'">Trailer</a>
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
    <div v-else class="pt-3">
      <movie-trailer v-show="tabActive === 'trailer'" :video-id="trailer.key" />
      <movie-reviews v-show="tabActive === 'reviews'" :reviews="reviews" />
      <movie-similar-movies v-show="tabActive === 'similarMovies'" :movies="similarMovies" />
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
import { isEmptyObject, getYearFromIsoDate } from '@/common/utils';
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
      tabActive: 'trailer' // trailer, reviews, similarMovies
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
  watch: {
    tabActive: {
      handler: async function(val, oldVal) {
        this.loading = true;
        if (val === 'trailer' && isEmptyObject(this.trailer)) {
          this.trailer = await this.fetchMovieTrailer();
        }
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
    MovieTrailer,
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
      this.tabActive = 'trailer';
    },
    fetchMovieTrailer() {
      return fetchMovieVideos(this.movieId).then(data => {
        return data.results.filter(o => o.type === 'Trailer' && o.site === 'YouTube')[0] || {};
      });
    }
  }
};
</script>

<style lang="scss">
.movie-details-modal {
  max-width: 900px;
  min-height: 250px;
}
</style>
