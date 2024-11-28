<script setup>
import { ref, defineProps, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// Props que recibe el calendario
const props = defineProps({
  calendario: {
    type: Object,
    required: false,
    default: null, // Valor predeterminado si no se pasa nada
  },
});


const fechaInicio = ref("");

// DATOS DESDE LA TABLA
const fechaFin = ref("");
const fechaFinFormateada = ref("");
const IDCalendario = ref("");
const IDInstrumento = ref("");


const error = ref("");


// Función para formatear la fecha (solo para mostrarla)

const formatearFecha = (fecha) => {
  if (!fecha) return ""; 
  const [year, month, day] = fecha.split("-"); 
  return `${day}/${month}/${year}`; 
};



const enviarFechaFin = async (fechaFin,IDCalendario,IDInstrumento) => {

  
  try {
    const response = await axios.post('https://portalonlinedev.unap.cl/base_encuesta/api/extenderPeriodo', {
    "nuevaFecha": fechaFin,
    "idCalendario": IDCalendario.value,
    "idInstrumento": IDInstrumento.value

    });
   
    Swal.fire({
      icon: 'success',
      title: 'Fecha enviada correctamente',
      text: `La fecha de fin ${fechaFin} se ha enviado exitosamente.`,
    });


  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al enviar la fecha. Intenta nuevamente.',
    });
  }
};

watch(
  () => props.calendario,
  (newVal) => {
    if (newVal) {
      fechaInicio.value = newVal.FECHA_INI || ""; // Maneja posibles valores vacíos
      IDCalendario.value = newVal.ID_CALENDARIO;
      IDInstrumento.value = newVal.ID_INST;
    }
  },
  { immediate: true }
);


const validarFechas = () => {
 
  if (!fechaFin.value) {
    error.value = "Debe selecciona fecha fin.";
    return;
  }

  const convertirAISO = (fecha) => {
    const [day, month, year] = fecha.split("/"); // Dividir DD/MM/YY
    return `${day}-${month}-${year}`; // Convertir a formato YYYY-MM-DD
  };



  const fechaInicioISO = convertirAISO(fechaInicio.value);

 

  // Crear objetos Date para comparación
  const fechaInicioDate = new Date(fechaInicioISO);
  const fechaFinDate = new Date(fechaFin.value);


  if (fechaFinDate < fechaInicioDate) {
    error.value = "La fecha de fin debe ser posterior a la fecha de inicio.";
  } else {
    alert("ENTRO")

    fechaFinFormateada.value = formatearFecha(fechaFin.value)

    enviarFechaFin(fechaFinFormateada.value,IDCalendario,IDInstrumento)
    error.value = "";
    fechaFin
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
          <h5 class="modal-title" id="exampleModalLabel">Extender calendario</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">   
          <form @submit.prevent="validarFechas">
            <div class="mb-3">
              <label for="fechaInicio" class="form-label">Fecha Inicio</label>
              <input
                type="text"
                id="fechaInicio"
                :value="fechaInicio"
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
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
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





