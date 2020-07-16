<template>
<transition name="fade">
  <a v-show="isVisible" class="btn btn-info back-to-top" @click="scrollToTop">
    ^ Top
  </a>
</transition>
</template>

<script>
import { debounce } from 'lodash-es';

export default {
  data() {
    return {
      isVisible: false
    };
  },
  created() {
    this.scrollHandler = debounce(() => {
      this.isVisible = (document.documentElement.scrollTop || document.body.scrollTop) > 150;
    }, 150);
    window.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style lang="scss" scoped>
.back-to-top {
  font-size: 0.9em;
  position: fixed;
  z-index: 2000;
  bottom: 20px;
  right: 20px;
  color: $white !important;
  cursor: pointer;
  border-radius: 25px !important;
  text-align: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
