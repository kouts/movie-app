<template>
  <div>
    <div v-if="filteredReviews.length !== 0" class="row">
      <div class="col-3">
        <div v-for="(review, index) in filteredReviews" :key="review.id" class="nav flex-column nav-pills" role="tablist">
          <a
            href="#"
            :class="['nav-link', index === selectedReviewIndex && 'active']"
            role="tab"
            :aria-selected="index === selectedReviewIndex && 'true'"
            @click.prevent="selectedReviewIndex = index"
          >
            {{ review.author }}
          </a>
        </div>
      </div>
      <div class="col-9">
        <div class="tab-content">
          <div v-for="(review, index) in filteredReviews" :key="review.id" class="tab-pane active" role="tabpanel">
            <p v-if="index === selectedReviewIndex" class="mb-0" style="white-space: pre-line">{{ review.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>No reviews found</div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      default: () => []
    },
    reviewsToShow: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      selectedReviewIndex: 0
    }
  },
  computed: {
    filteredReviews() {
      return this.reviewsToShow ? this.reviews.slice(0, this.reviewsToShow) : this.reviews
    }
  }
}
</script>

<style lang="scss" scoped>
.card-body {
  overflow-y: auto;
  max-height: 250px;
}
</style>
