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
        <a :class="['nav-link', tabActive === 'overview' && 'active']" href="#" @click.prevent="tabActive = 'overview'">Overview</a>
      </li>
      <li class="nav-item position-relative">
        <a :class="['nav-link', tabActive === 'reviews' && 'active']" href="#" @click.prevent="tabActive = 'reviews'">
          Reviews
        </a>
      </li>
      <li class="nav-item position-relative">
        <a :class="['nav-link', tabActive === 'similarMovies' && 'active']" href="#" @click.prevent="tabActive = 'similarMovies'">
          Similar movies
        </a>
      </li>
    </ul>
    <loader :show="loading" style="top: 13.3em;" />
    <div class="pt-2">
      <!-- Overview tab -->
      <template v-if="tabActive === 'overview'">
        <movie-overview
          v-show="tabLoaded === 'overview'"
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
      </template>

      <!-- Reviews tab -->
      <template v-if="tabActive === 'reviews'">
        <movie-reviews v-if="tabLoaded === 'reviews'" :reviews="reviews" reviews-to-show="2" class="mt-2" />
      </template>

      <!-- Similar movies tab -->
      <template v-if="tabActive === 'similarMovies'">
        <template v-if="tabLoaded === 'similarMovies'">
          <movie-similar-movies :movies="similarMovies" class="mt-2" />
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
      </template>
    </div>
    <go-to-top scroll-target=".vm-wrapper" />
  </modal>
</template>

<script>
import Modal from '@kouts/vue-modal';
import Loader from '@/components/Loader.vue';
import MovieOverview from '@/components/MovieOverview.vue';
import GoToTop from '@/layouts/components/GoToTop.vue';
import { clone, getYearFromIsoDate } from '@/common/utils';
import { fetchMovie, fetchMovieVideos, fetchMovieReviews, fetchMovieSimilarMovies } from '@/api/movies';

const MovieReviews = () => import('@/components/MovieReviews.vue');
const MovieSimilarMovies = () => import('@/components/MovieSimilarMovies.vue');
const ScrollToLoad = () => import('@/components/ScrollToLoad');

const initialState = {
  tabActive: 'overview', // overview, reviews, similarMovies
  tabLoaded: '',
  loading: true,
  movie: {},
  trailer: {},
  reviews: [],
  similarMovies: [],
  page: 0,
  totalResults: 0,
  reviewsVisited: false,
  similarVisited: false
};

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
    return clone(initialState);
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
        if (val === 'reviews' && this.reviewsVisited === false) {
          this.reviews = await fetchMovieReviews(this.movieId).then(data => data.results);
          this.reviewsVisited = true;
        }
        if (val === 'similarMovies' && this.similarVisited === false) {
          const res = await this.fetchSimilarMovies();
          this.similarMovies = res.results;
          this.page = res.page;
          this.totalResults = res.total_results;
          this.similarVisited = true;
        }
        this.tabLoaded = val;
        this.loading = false;
      }
    }
  },
  methods: {
    async beforeModalOpen() {
      this.loading = true;
      this.initializeState();
      const data = await Promise.all([fetchMovie(this.movieId), this.fetchMovieTrailer()]);
      this.movie = data[0];
      this.trailer = data[1];
      this.tabLoaded = 'overview';
      this.loading = false;
    },
    afterModalOpen() {
      document.body.classList.add('overflow-hidden');
    },
    closingModal() {
      document.body.classList.remove('overflow-hidden');
    },
    initializeState() {
      const iState = clone(initialState);
      for (const key in iState) {
        this[key] = iState[key];
      }
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
