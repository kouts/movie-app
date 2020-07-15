<template>
<div>
  <div class="d-flex flex-sm-row flex-column justify-content-between">
    <div>
      <h2 class="d-inline-flex mb-1">{{ title }}</h2> <h3 v-if="year" class="d-inline-flex text-muted mb-1">({{ year }})</h3>
    </div>
    <div class="d-flex align-items-center">
      <div class="border-right pr-2">
        <h3 class="d-inline">{{ voteAverage }}</h3><span class="text-muted">/10</span>
      </div>
      <div class="pl-2 movie-votes-box">
        <div>{{ votes }}</div>
        <div><small>votes</small></div>
      </div>
    </div>
  </div>
  <div class="d-flex flex-sm-row flex-column justify-content-between mb-2">
    <movie-genres :genres="genres" />
    <div>
      {{ releaseDateInText ? releaseDateInText + ' •' : ''}} {{ durationInHoursAndMinutes }} • {{language.toUpperCase()}}
    </div>
  </div>
  <div class="row">
    <div class="col-sm-3">
      <movie-image :path="posterPath" :title="title" class="mb-2 text-center" />
    </div>
    <div class="col-sm-9">
      <movie-trailer :video-id="trailerKey" />
    </div>
  </div>
  <div class="row">
    <div class="col pt-3 px-4">
      <p v-if="overview" class="mb-0">{{ overview }}</p>
      <span v-else class="text-muted">No description available</span>
    </div>
  </div>
</div>
</template>

<script>
import MovieGenres from '@/components/MovieGenres.vue';
import MovieTrailer from '@/components/MovieTrailer.vue';
import MovieImage from '@/components/MovieImage.vue';

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    year: {
      type: String,
      default: ''
    },
    voteAverage: {
      type: Number,
      default: 0
    },
    votes: {
      type: Number,
      default: 0
    },
    genres: {
      type: Array,
      default: () => []
    },
    posterPath: {
      type: String,
      default: ''
    },
    trailerKey: {
      type: String,
      default: ''
    },
    releaseIsoDate: {
      type: String,
      default: ''
    },
    durationInMins: {
      type: Number,
      default: 0
    },
    language: {
      type: String,
      default: ''
    },
    overview: {
      type: String,
      default: ''
    }
  },
  computed: {
    durationInHoursAndMinutes() {
      const hours = Math.floor(this.durationInMins / 60);
      const minutes = this.durationInMins % 60;
      return `${hours}h ${minutes}m`;
    },
    releaseDateInText() {
      if (!this.releaseIsoDate) {
        return '';
      }
      const date = new Date(this.releaseIsoDate);
      const month = date.toLocaleString('en-GB', { month: 'long' });
      return `${date.getDate()} ${month} ${date.getFullYear()}`;
    }
  },
  components: {
    MovieGenres,
    MovieTrailer,
    MovieImage
  }
};
</script>
