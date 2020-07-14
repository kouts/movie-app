<template>
  <div>
    <modal v-model="open" :title="movieTitle" modal-class="movie-details-modal">
      <p>Modal content goes here... {{ movieId }}</p>
    </modal>
  </div>
</template>

<script>
import Modal from '@kouts/vue-modal';

export default {
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    movieId: {
      type: Number,
      default: null
    },
    movieTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    open: {
      get() {
        return this.showModal;
      },
      set(newValue) {
        if (newValue === false) {
          this.$emit('modal-closed');
        }
      }
    }
  },
  components: {
    Modal
  }
};
</script>

<style lang="scss">
  .movie-details-modal {
    max-width: 900px;
  }
</style>
