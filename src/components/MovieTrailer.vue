<template>
<div>
  <div v-if="videoId" class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${videoId}?rel=0`" allowfullscreen></iframe>
  </div>
  <img v-else src="@/assets/trailer-not-available.png" class="img-fluid" alt="Trailer not available" />
</div>
</template>

<script>
export default {
  props: {
    videoId: {
      type: String,
      default: ''
    }
  }
};
</script>
