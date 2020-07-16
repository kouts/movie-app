<template>
  <div>
    <img v-if="path" loading="lazy" :src="`https://image.tmdb.org/t/p/${widthApi}/${path}`" :class="posterClass" :alt="title" :style="{width: width}">
    <img v-else src="@/assets/poster-not-available.png" class="img-fluid border" alt="Poster not available" :style="{width: width}" />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    posterClass: {
      type: String,
      default: 'img-fluid'
    },
    width: {
      type: String,
      default: 'auto'
    },
    widthApi: {
      type: String,
      default: 'w185'
    }
  }
};
</script>
