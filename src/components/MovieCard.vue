<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex flex-row justify-content-between">
        <h2 class="movie-card-title">
          <a href="#" @click.prevent="$emit('view-details', movieId)">{{ title }}</a> {{ year && `(${year})` }}
        </h2>
        <div>
          {{ voteAverage }}<span class="text-muted"><small>/10</small></span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-4 text-center">
          <movie-image
            :path="posterPath"
            :title="title"
            style="cursor: pointer"
            @click.native="$emit('view-details', movieId)"
          />
        </div>
        <div class="col-md-8">
          <div ref="overviewBox" :class="['overview-box', expanded && 'is-expanded']">
            <p v-if="overview" class="mb-0">{{ overview }}</p>
            <p v-else class="text-muted mb-0">No description available</p>
          </div>
          <div v-if="displayShowMore" :class="['text-muted show-more', expanded && 'is-on']" @click="toggleExpand">
            {{ expanded ? 'collapse' : '...show full description' }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <movie-genres :genres="genres" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getYearFromIsoDate } from '@/common/utils'
import MovieImage from '@/components/MovieImage.vue'
import MovieGenres from '@/components/MovieGenres.vue'

export default {
  components: {
    MovieImage,
    MovieGenres
  },
  props: {
    movieId: {
      type: Number,
      default: null
    },
    posterPath: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    releaseDate: {
      type: String,
      default: ''
    },
    genres: {
      type: Array,
      default: () => []
    },
    voteAverage: {
      type: Number,
      default: 0
    },
    overview: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      displayShowMore: false,
      expanded: false
    }
  },
  computed: {
    year() {
      return getYearFromIsoDate(this.releaseDate)
    }
  },
  mounted() {
    this.displayShowMore = this.$refs.overviewBox.scrollHeight - 10 > this.$refs.overviewBox.clientHeight
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-card-title {
  font-size: 1.25rem;
}
.overview-box {
  overflow: hidden;
  max-height: 170px;
}
.overview-box.is-expanded {
  max-height: none;
}
.show-more {
  text-align: center;
  cursor: pointer;
  padding: 25px 8px 12px 8px;
  font-size: 0.9em;
  position: relative;
  z-index: 1;
  margin-top: -25px;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, $white 40%, $white 100%);
}
.show-more.is-on {
  background-image: none;
}
</style>
