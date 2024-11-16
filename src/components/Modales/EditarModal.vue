<script setup>
import { ref } from 'vue';

// Props
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(['close']);

// State
const show = ref(true);

// Methods
const closeModal = () => {
  show.value = false;
  emit('close');
};
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" :class="{ show: show }" tabindex="-1" style="display: block;" v-if="show" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Item</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>Editing item: {{ item }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Backdrop -->
  <div class="modal-backdrop fade show" v-if="show"></div>
</template>
