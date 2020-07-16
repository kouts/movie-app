import { debounce } from 'lodash-es';

export default {
  props: {
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
      fetching: false
    };
  },
  mounted() {
    this.scrollHandler = debounce(async() => {
      if (this.fetching || this.isDisabled) {
        return;
      }
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
        this.$emit('fetch-start');
        this.fetching = true;
        const res = await this.fetcher();
        this.$emit('fetch-end', res);
        this.fetching = false;
      }
    }, 150);
    window.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  render() {
    return null;
  }
};
