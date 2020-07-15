<template>
  <div class="default-page-wrapper">
    <default-nav />
    <slot />
    <default-footer />
  </div>
</template>

<script>
import DefaultNav from './DefaultNav.vue';
import DefaultFooter from './DefaultFooter.vue';

export default {
  components: {
    DefaultNav,
    DefaultFooter
  }
};
</script>

<style lang="scss">
  /* Sticky footer */
  html {
    position: relative;
    min-height: 100%;
  }
  body {
    margin-bottom: 60px !important; /* Margin bottom equal to footer height */
  }
  .default-page-wrapper {
    padding: 5em 0em 3em 0em;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px; /* Footer height */
    line-height: 60px; /* Vertically center the text */
    background-color: #f5f5f5;
    text-align: center;
  }
</style>
