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
  props: {
    scrollTarget: {
      type: String,
      default: ''
    },
    offset: {
      type: Number,
      default: 150
    }
  },
  data() {
    return {
      isVisible: false,
      target: null
    };
  },
  mounted() {
    this.target = this.scrollTarget ? document.querySelector(this.scrollTarget) : window;
    if (this.target === window) {
      this.scrollHandler = debounce(() => {
        this.isVisible = (document.documentElement.scrollTop || document.body.scrollTop) > this.offset;
      }, 150);
    } else {
      this.scrollHandler = debounce(() => {
        this.isVisible = this.target.scrollTop > this.offset;
      }, 150);
    }
    this.target.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    this.target.removeEventListener('scroll', this.scrollHandler);
  },
  methods: {
    scrollToTop() {
      if (typeof this.target.scrollTo === 'function') {
        this.target.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.target.scrollTop = 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.back-to-top {
  font-size: 0.9em;
  position: fixed;
  z-index: 1000;
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
