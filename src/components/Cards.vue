<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiSortDescending } from "@mdi/js";


defineProps({
  reportCount: { type: Number, required: true },
  reportTitle: { type: String, required: true },
  cardSubtitle: { type: String, required: true },
  contSubtitle: { type: Number, required: true },
  pathIcon: { type: String, required: true },
  badgeBackground: { // Prop para fondo dinámico
    type: String,
    required: true
  },
  badgeColor: { // Prop para texto dinámico
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="card shadow-sm rounded border-0 ">
    <div class="card-body d-flex align-items-center">
      <div class="bg-dark text-white d-flex align-items-center justify-content-center rounded-circle me-3 p-2" >
        <svg-icon :type="'mdi'" :path="pathIcon" size="32"></svg-icon>
      </div>
      <div>
        <h4 class="mb-0 fs-2">{{ reportCount }}</h4>
        <small class="fs-5 text-nowrap">{{ reportTitle }}</small>
      </div>
    </div>
    <hr class="my-2">
    <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center mb-2">
      <small class="fs-6 inline text-nowrap fw-semibold">{{ cardSubtitle }}</small>
      <div 
        class="baddge d-flex align-items-center" 
        :style="{ backgroundColor: badgeBackground, color: badgeColor, padding: '5px 10px', borderRadius: '5px' }">
        <svg-icon :type="'mdi'" :path="mdiSortDescending" class="me-2"></svg-icon>
        <span class="fs-6 fw-semibold">{{ contSubtitle }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.baddge{
  border-radius: 10%;
  display: flex;
  align-items: center;
  background-color: var(--azul-violeta-40);
  color: var(--azul-violeta);
}

.card {
  min-width: 200px;
  transition: transform 300ms ease;

}
.card:hover {
  transform: scale(1.05);
}

@media (width < 1395px){
  .card-footer{
   display: none !important;

  }
}

</style>
