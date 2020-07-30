<template>
  <div class="container">
    <loader :show="loading" />
    <h1 class="mb-4">Search a movie</h1>
    <div class="mb-4">
      <input
        ref="search"
        type="search"
        class="form-control"
        placeholder="Enter a movie title to search..."
        :disabled="searchDisabled"
        @input="searchHandler($event)"
      />
    </div>
    <movies-list :movies="movies" :genres-map="genresMap" />
    <div v-if="searchQuery && movies.length === 0 && !loading" class="font-weight-bold text-center">
      No results found
    </div>
    <div v-if="movies.length === totalResults && totalResults > 0" class="font-weight-bold text-center mt-4">
      There are no more results to display
    </div>
    <scroll-to-load
      :is-disabled="movies.length === totalResults || loading"
      @scrolled-to-bottom="searchMovies({ clear: false, query: searchQuery, page: page + 1 })"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash-es';
import { mapState, mapActions, mapGetters } from 'vuex';
import Loader from '@/components/Loader.vue';
import ScrollToLoad from '@/components/ScrollToLoad';
import MoviesList from '@/components/MoviesList.vue';

export default {
  components: {
    Loader,
    ScrollToLoad,
    MoviesList
  },
  data() {
    return {
      searchQuery: '',
      searchDisabled: true
    };
  },
  computed: {
    ...mapState('moviesSearch', {
      movies: state => state.movies,
      loading: state => state.loading,
      page: state => state.page,
      totalResults: state => state.totalResults
    }),
    ...mapGetters('moviesSearch', [
      'genresMap'
    ])
  },
  created() {
    this.searchHandler = debounce(async(event) => {
      this.searchQuery = event.target.value;
      if (this.searchQuery) {
        this.searchMovies({ clear: true, query: this.searchQuery, page: 1 });
      };
    }, 350);
  },
  async mounted() {
    await this.fetchGenres();
    this.searchDisabled = false;
    this.$nextTick(() => {
      this.$refs.search.focus();
    });
  },
  methods: {
    ...mapActions('moviesSearch', [
      'searchMovies',
      'fetchGenres'
    ])
  }
};
</script>
