<template>
<div>
  <h1 class="mb-4">Now playing in theaters</h1>
  <div v-if="loading" class="row">
    <div class="col">Loading</div>
  </div>
  <div v-else class="row" ref="list">
    <div v-for="movie in movies" :key="movie.id" class="col-md-6">
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
import { request } from '@/common/request';
import { mapState } from 'vuex';
import MovieCard from '@/components/MovieCard.vue';

export default {
  name: 'MoviesList',
  data: function() {
    return {
      movies: [],
      loading: true,
      fetching: true,
      page: 0
    };
  },
  components: {
    MovieCard
  },
  async mounted() {
    await this.$store.dispatch('fetchGenres');
    await this.fetchMovies(1);
    this.loading = false;
    this.fetching = false;
    // Detect when scrolled to bottom.
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scroll);
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll);
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
      if (this.fetching) {
        return;
      }
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.fetching = true;
        const page = this.page + 1;
        await this.fetchMovies(page);
        this.fetching = false;
      }
    },
    fetchMovies(page) {
      console.log('fired');
      return request({
        url: 'movie/now_playing',
        params: {
          page: page
        }
      }).then(res => {
        if (res.results.length) {
          this.movies = [...this.movies, ...res.results];
          this.page = res.page;
        }
      });
    }
  }
};
</script>
