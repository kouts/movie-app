<template>
<div class="card mb-3">
  <div class="card-body">
    <div class="d-flex flex-row justify-content-between">
      <h5>{{ originalTitle }}</h5>
      <div class="rating">
        {{ voteAverage }}<span class="text-muted"><small>/10</small></span>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md-4">
        <img v-if="posterPath" :src="`https://image.tmdb.org/t/p/w500/${posterPath}`" class="img-fluid" :alt="originalTitle">
        <img v-else src="@/assets/not-available.png" class="img-fluid border" alt="Poster not available">
      </div>
      <div class="col-md-8">
        <p v-if="overview">{{ overview }}</p>
        <p v-else class="text-muted">No description available</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        Genres: <span v-for="(genre, index) in genres" :key="index" class="badge badge-pill badge-info ml-1">{{ genre }}</span>
        <span v-if="genres.length === 0" class="text-muted">N/A</span>
      </div>
    </div>
    <!-- <p class="card-text" :title="overview">{{ overview }}</p> -->
  </div>
</div>
</template>

<script>
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
  }
};
</script>

<style lang="scss" scoped>

</style>
