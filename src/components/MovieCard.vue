<template>
<div class="card mb-3">
  <!-- <img :src="`https://image.tmdb.org/t/p/w500/${posterPath}`" class="card-img-top" :alt="originalTitle"> -->
  <div class="card-body">
    <div class="d-flex flex-row justify-content-between">
      <h5>{{ originalTitle }}</h5>
      <div class="rating">
        {{ voteAverage }}<span class="text-muted"><small>/10</small></span>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md-4">
        <img :src="`https://image.tmdb.org/t/p/w500/${posterPath}`" class="img-fluid" :alt="originalTitle">
      </div>
      <div class="col-md-8">
        <p>{{ overview }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        Genre(s): <span v-for="(genre, index) in genres" :key="index" class="badge badge-pill badge-info ml-1">{{ genre }}</span>
      </div>
    </div>
    <!-- <p class="card-text" :title="overview">{{ overview }}</p> -->
  </div>
</div>
</template>

<script>
import { chop } from '@/common/utils';

export default {
  props: {
    posterPath: {
      type: String,
      default: ''
    },
    originalTitle: {
      type: String,
      default: ''
    },
    releaseDate: {
      type: String,
      default: ''
    },
    genres: {
      type: Array,
      default: () => []
    },
    voteAverage: {
      type: Number,
      default: 0
    },
    overview: {
      type: String,
      default: ''
    }
  },
  computed: {
    shortOverview() {
      return chop(this.overview, 60);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
