<template>
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
    <loader :show="loading" style="top: 11.5em;" />
    <div class="pt-2">
      <!-- Overview -->
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
      <!-- Reviews -->
      <movie-reviews v-if="tabActive === 'reviews'" :reviews="reviews" reviews-to-show="2" class="mt-2" />
      <!-- Similar Movies -->
      <template v-if="tabActive === 'similarMovies'">
        <movie-similar-movies :movies="similarMovies" />
        <div v-if="similarMovies === totalResults && totalResults > 0" class="font-weight-bold text-center mt-2">
          There are no more similar movies to display
        </div>
        <scroll-to-load
          scroll-target=".vm-wrapper"
          :fetcher="fetchSimilarMovies"
          :is-disabled="similarMovies.length === totalResults"
          @fetch-start="loading = true"
          @fetch-end="fetchEnd"
        />
      </template>
    </div>
    <go-to-top scroll-target=".vm-wrapper" style="right: 40px;" />
  </modal>
</template>

<script>
import Modal from '@kouts/vue-modal';
import Loader from '@/components/Loader.vue';
import MovieOverview from '@/components/MovieOverview.vue';
import GoToTop from '@/layouts/components/GoToTop.vue';
import { getYearFromIsoDate } from '@/common/utils';
import { fetchMovie, fetchMovieVideos, fetchMovieReviews, fetchMovieSimilarMovies } from '@/api/movies';

const MovieReviews = () => import('@/components/MovieReviews.vue');
const MovieSimilarMovies = () => import('@/components/MovieSimilarMovies.vue');
const ScrollToLoad = () => import('@/components/ScrollToLoad');

export default {
  components: {
    Modal,
    Loader,
    MovieOverview,
    MovieReviews,
    MovieSimilarMovies,
    GoToTop,
    ScrollToLoad
  },
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
      tabActive: 'overview', // overview, reviews, similarMovies
      loading: true,
      movie: {},
      trailer: {},
      reviews: [],
      similarMovies: [],
      page: 0,
      totalResults: 0
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
          this.reviews = await fetchMovieReviews(this.movieId).then(data => data.results);
        }
        if (val === 'similarMovies' && this.similarMovies.length === 0) {
          const res = await this.fetchSimilarMovies();
          this.similarMovies = res.results;
          this.page = res.page;
          this.totalResults = res.total_results;
        }
        this.loading = false;
      }
    }
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
    fetchSimilarMovies() {
      const nextPage = this.page + 1;
      return fetchMovieSimilarMovies(this.movieId, nextPage);
    },
    fetchEnd(res) {
      this.similarMovies = this.similarMovies.concat(res.results);
      this.page = res.page;
      this.totalResults = res.total_results;
      this.loading = false;
    },
    getMovieGenres(genresArrayOfObj) {
      return genresArrayOfObj ? genresArrayOfObj.map(o => o.name) : [];
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
