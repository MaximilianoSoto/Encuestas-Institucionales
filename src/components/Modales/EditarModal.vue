<script setup>
  import { ref, defineProps } from "vue";

  const fechaInicio = ref('');
  const fechaFin = ref('');
  const error = ref('');

  const props = defineProps({
    calendario: {
      type: Object,
      required: true,
    },
  });
 

  const validarFechas = () => {
      if (!fechaInicio.value || !fechaFin.value) {
        error.value = "Ambos campos son obligatorios.";
        return;
      }

      if (new Date(fechaInicio.value) > new Date(fechaFin.value)) {
        error.value = "La fecha de inicio no puede ser mayor que la fecha de fin.";
      } else {
        error.value = "";
        alert("Fechas válidas.");
      }
   };


</script>

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Detalles del Calendario
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="props.calendario">

          <form @submit.prevent="validarFechas">
              <div class="mb-3">
                <label for="fechaInicio" class="form-label">Fecha Inicio</label>
                <input
                  type="date"
                  id="fechaInicio"
                  v-model="fechaInicio"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="fechaFin" class="form-label">Fecha Fin</label>
                <input
                  type="date"
                  id="fechaFin"
                  v-model="fechaFin"
                  class="form-control"
                />
              </div>
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>

              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Validar Fechas</button>
                
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos opcionales */
</style>




