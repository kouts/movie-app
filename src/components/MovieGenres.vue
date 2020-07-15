<template>
<div>
  <span v-for="(genre, index) in genres" :key="index" class="badge badge-pill badge-info ml-1">{{ genre }}</span>
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
