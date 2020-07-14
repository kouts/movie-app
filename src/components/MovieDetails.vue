<template>
  <div>
    <Modal v-model="showModal" title="My first modal">
      <p>Modal content goes here...</p>
    </Modal>
  </div>
</template>

<script>
import Modal from '@kouts/vue-modal';

export default {
  props: {
    displayModal: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      showModal: false
    };
  },
  components: {
    Modal
  }
};
</script>
