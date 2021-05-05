import { debounce } from 'lodash-es'

export default {
  props: {
    scrollTarget: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      target: null
    }
  },
  mounted() {
    this.target = this.scrollTarget ? document.querySelector(this.scrollTarget) : window
    const isScrolledToBottom = this.createCondition()
    this.scrollHandler = debounce(async () => {
      if (isScrolledToBottom() && !this.isDisabled) {
        this.$emit('scrolled-to-bottom')
      }
    }, 150)
    this.target.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy() {
    this.target.removeEventListener('scroll', this.scrollHandler)
  },
  render() {
    return null
  },
  methods: {
    createCondition() {
      if (this.target === window) {
        return () => window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
      } else {
        return () => this.target.scrollHeight - this.target.scrollTop === this.target.clientHeight
      }
    }
  }
}
