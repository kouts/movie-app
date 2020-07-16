import { debounce } from 'lodash-es';

export default {
  props: {
    scrollTarget: {
      type: String,
      default: ''
    },
    fetcher: {
      type: Function,
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fetching: false,
      target: null
    };
  },
  mounted() {
    this.target = this.scrollTarget ? document.querySelector(this.scrollTarget) : window;
    if (this.target === window) {
      this.scrollHandler = debounce(() => {
        if (this.fetching || this.isDisabled) {
          return;
        }
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
          this.fetch();
        }
      }, 150);
    } else {
      this.scrollHandler = debounce(() => {
        if (this.fetching || this.isDisabled) {
          return;
        }
        if (this.target.scrollHeight - this.target.scrollTop === this.target.clientHeight) {
          this.fetch();
        }
      }, 150);
    }
    this.target.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    this.target.removeEventListener('scroll', this.scrollHandler);
  },
  render() {
    return null;
  },
  methods: {
    async fetch() {
      this.$emit('fetch-start');
      this.fetching = true;
      const res = await this.fetcher();
      this.$emit('fetch-end', res);
      this.fetching = false;
    }
  }
};
