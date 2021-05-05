<template>
  <div class="default-page-wrapper">
    <default-nav />
    <slot />
    <default-footer />
    <go-to-top />
  </div>
</template>

<script>
import DefaultNav from './DefaultNav.vue'
import DefaultFooter from './DefaultFooter.vue'
import GoToTop from '@/layouts/components/GoToTop.vue'

export default {
  components: {
    DefaultNav,
    DefaultFooter,
    GoToTop
  }
}
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
  background-color: $gray-200;
  text-align: center;
}
.footer .text-muted,
.footer a {
  color: darken(desaturate(adjust-hue($primary, -27), 21.63), 25.49) !important;
}
</style>
