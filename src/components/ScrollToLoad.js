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
    const isScrolledToBottom = this.createCondition();
    this.scrollHandler = debounce(async() => {
      if (this.fetching || this.isDisabled) {
        return;
      }
      if (isScrolledToBottom()) {
        this.$emit('fetch-start');
        this.fetching = true;
        const res = await this.fetcher();
        this.$emit('fetch-end', res);
        this.fetching = false;
      }
    }, 150);
    this.target.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    this.target.removeEventListener('scroll', this.scrollHandler);
  },
  render() {
    return null;
  },
  methods: {
    createCondition() {
      if (this.target === window) {
        return () => (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2;
      } else {
        return () => this.target.scrollHeight - this.target.scrollTop === this.target.clientHeight;
      }
    }
  }
};
