<template>
<div class="card mb-3">
  <div class="card-body">
    <div class="d-flex flex-row justify-content-between">
      <h5><a href="#" @click.prevent="$emit('view-details', movieId)">{{ title }}</a> ({{ year || 'N/A'  }})</h5>
      <div>
        {{ voteAverage }}<span class="text-muted"><small>/10</small></span>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md-4 text-center">
        <movie-image :path="posterPath" :title="title" />
      </div>
      <div class="col-md-8">
        <div :class="['overview-box', expanded && 'is-expanded']" ref="overviewBox">
          <p v-if="overview" class="mb-0">{{ overview }}</p>
          <p v-else class="text-muted mb-0">No description available</p>
        </div>
        <div v-if="displayShowMore" :class="['text-muted show-more', expanded && 'is-on']" @click="toggleExpand">{{ expanded ? 'collapse' : '...show full description' }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        Genres: <span v-for="(genre, index) in genres" :key="index" class="badge badge-pill badge-info ml-1">{{ genre }}</span>
        <span v-if="genres.length === 0" class="text-muted">N/A</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getYearFromIsoDate } from '@/common/utils';
import MovieImage from '@/components/MovieImage.vue';

export default {
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
  components: {
    MovieImage
  },
  computed: {
    year: function() {
      return getYearFromIsoDate(this.releaseDate);
    }
  },
  data: function() {
    return {
      displayShowMore: false,
      expanded: false
    };
  },
  mounted() {
    this.displayShowMore = this.$refs.overviewBox.scrollHeight - 10 > this.$refs.overviewBox.clientHeight;
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style lang="scss" scoped>
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
  background-image: linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, #fff 40%, #fff 100%);
}
.show-more.is-on {
  background-image:none;
}
</style>
