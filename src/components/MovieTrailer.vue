<template>
<div>
  <div v-if="videoId" class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${videoId}?rel=0`" allowfullscreen></iframe>
  </div>
  <div v-else>
    No trailer found.
  </div>
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
