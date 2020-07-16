<template>
  <div>
    <span v-for="(genre, index) in genres" :key="index" class="badge badge-pill badge-genre ml-1">{{ genre }}</span>
    <span v-if="genres.length === 0" class="text-muted">Unknown genre</span>
  </div>
</template>

<script>
export default {
  props: {
    genres: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.badge-genre {
  background-color: lighten($purple, 8%);
  font-weight: normal;
  color: $white;
  font-size: 0.8em;
  line-height: 1em;
}
</style>
