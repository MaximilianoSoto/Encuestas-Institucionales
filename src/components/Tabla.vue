<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import Modal from '@/components/Modales/EditarModal.vue'
import axios from 'axios';
import { mdiArrowUpDown } from "@mdi/js";
import { ref, onMounted } from 'vue';

const listaCalendarios = ref([]);
const calendarioSeleccionado = ref({});
const isDescending = ref(true);
const mostrarEstado = ref("N");
const filteredCalendarios = ref([]); 

const actualizarCalendarios = () => {
  filteredCalendarios.value = listaCalendarios.value.filter(
    (item) => item.ESTADO === mostrarEstado.value
  );
};


// Función para alternar el estado
const toggleEstado = () => {
  mostrarEstado.value = mostrarEstado.value === "S" ? "N" : "S";
  actualizarCalendarios(); 
};

// Función para alternar el orden de las fechas
const toggleOrder = () => {
   // Alternar el estado entre true y false
   isDescending.value = !isDescending.value;

    // Ordenar la lista según el estado actual
    filteredCalendarios.value.sort((a, b) => {
    const dateA = new Date(a.FECHA_FIN);
    const dateB = new Date(b.FECHA_FIN);
    return isDescending.value ? dateB - dateA : dateA - dateB;
    });
};

// Obtener los calendarios desde la API
const getCalendarios = async () => {
  try {
    const response = await axios.get("https://portalonlinedev.unap.cl/base_encuesta/api/getCalendarios/?instrumento=1070");
    listaCalendarios.value = response.data.message;
    actualizarCalendarios()
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  getCalendarios();
});

const abrirModal = (calendario) => {
  calendarioSeleccionado.value = calendario;
};

const getStatusClass = (status) => {
  const classes = {
    S: 'badge bg-success bg-sucess-opacity',
    N: 'badge bg-danger bg-danger-opacity',
  };
  return classes[status] || 'badge bg-secondary';
};

</script>

<template>
  <div class="container-tabla">
    <div class="p-2 d-flex justify-content-between">
        <aside>
            <h3 class="fw-bold">Listado De Calendario</h3>
            <h5 class="text-secondary">Instrumento N° 1153 - Autoevaluacion Academica</h5>
        </aside>
        <aside class="d-flex flex-column gap-2 mt-3">
            <div class="btn-group" role="group" aria-label="Botones">
                <button type="button" class="btn btn-vigente" @click="toggleEstado('S')">Vigente</button>
                <button type="button" class="btn btn-no-vigente"  @click="toggleEstado('N')">No Vigente</button>
            </div>
        </aside>      
    </div>


    <!-- Tabla de datos -->
    <div class="table-responsive">
        <table class="table table-hover align-middle text-center fs-6 mb-1 mt-2">
            <thead>
                <tr>
                <th class="text-center header">
                    Usuario
                    <svg-icon type="mdi" :path="mdiArrowUpDown" class="arrow-icon" size="18" @click="toggleOrder"></svg-icon>
                </th>
                <th class="text-center header">
                    Calendario
                    <svg-icon type="mdi" :path="mdiArrowUpDown" class="arrow-icon" size="18" @click="toggleOrder"></svg-icon>
                </th>
                <th class="text-center header">
                    Instrumento
                    <svg-icon type="mdi" :path="mdiArrowUpDown" class="arrow-icon" size="18" @click="toggleOrder" ></svg-icon>
                </th>
                <th class="text-center header">
                    Fecha
                    <svg-icon type="mdi" :path="mdiArrowUpDown" class="arrow-icon" size="18" @click="toggleOrder"></svg-icon>
                </th>
                <th class="text-center header">
                    Fecha Fin
                    <svg-icon type="mdi" :path="mdiArrowUpDown" class="arrow-icon" size="18" @click="toggleOrder"></svg-icon>
                    
                </th>
                <th class="text-center header">
                    Oportunidades
                    <svg-icon type="mdi" :path="mdiArrowUpDown" class="arrow-icon" size="18" @click="toggleOrder"></svg-icon>
                </th>
                <th class="text-center header">
                    Anonima
                    <svg-icon type="mdi" :path="mdiArrowUpDown" class="arrow-icon" size="18" @click="toggleOrder"></svg-icon>
                </th>
                <th class="text-center header">
                    Estado
                    <svg-icon type="mdi" :path="mdiArrowUpDown" class="arrow-icon" size="18" @click="toggleOrder"></svg-icon>
                </th>
                <th class="text-center header">
                    Acciones
                    <svg-icon type="mdi" :path="mdiArrowUpDown" class="arrow-icon" size="18" @click="toggleOrder"></svg-icon>
                </th>
                </tr>
            </thead>
            <tbody>
                <!-- Usar filteredCalendarios en lugar de listaCalendarios -->
                <tr v-for="item in filteredCalendarios" :key="item.ID_CALENDARIO">
                <td class="py-3">{{ item.USUARIOS }}</td>
                <td class="py-3">{{ item.ID_CALENDARIO }}</td>
                <td class="py-3 fw-semibold">{{ item.ID_INST }}</td>
                <td class="py-3">{{ item.FECHA_INI }}</td>
                <td class="py-3">{{ item.FECHA_FIN }}</td>
                <td class="py-3">{{ item.NRO_OPORTUNIDADES }}</td>
                <td class="py-3">{{ item.ANONIMA }}</td>
                <td class="py-3">
                    <span class="p-2" :class="getStatusClass(item.ESTADO)">
                    <div v-if="item.ESTADO === 'N'">No Vigente</div>
                    <div v-else-if="item.ESTADO === 'S'">Vigente</div>
                    </span>
                </td>
                <td class="py-3">
                    <!-- Botón que abre el modal -->
                    <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="abrirModal(item)"
                    >
                    Ver Detalles
                    </button>
                </td>
                </tr>
            </tbody>
        </table>

    </div>
  </div>

  <!-- Componente Modal -->
  <Modal v-if="calendarioSeleccionado" :calendario="calendarioSeleccionado" />
</template>

<style scoped>

    .arrow-icon{
        color: #007bff;
        margin-bottom:2px;
        cursor: pointer;
    }

    .arrow-icon:hover{
        scale: 102%;
    }

    .container-tabla{
        background-color: white;
        margin-top: 15vh;
        width: 77%;
        padding:10px;
        border-radius: 5px;
    }

    .btn-vigente {
        background-color: #0FAEC0;
        color: white;
    }

    .btn-vigente.active {
        background-color: #088b96;
        border: 2px solid #056b72;
    }

    .btn-no-vigente {
        background-color: #b72f63;
        color: white;
    }

    .btn-no-vigente.active {
        background-color: #a12453;
        border: 2px solid #8a1c44;
    }

    .btn {
        transition: background-color 0.3s, border 0.3s;
    }



    @media (width < 990px){
        .container-tabla{
            margin-top: 25vh;
        }
    }
    
    @media (width < 768px){
        .container-tabla{
            margin-top: 3vh;
        }
    }
       
        .edit-button{
            transition: all 300ms;
            cursor: pointer;
        }

        .edit-button:hover{
            scale: 105%;
        }

        .header{
            border-bottom: 4px solid #ccc;
        }

        .btn:focus, .btn {
            outline: none;
            box-shadow: none;
            color: #FFFFFFFF; /* Elimina el efecto de sombra */
        }

       /* Paginador */
        .pagination-container {
            margin-top: 20px;
        }

        .pagination {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .page-item {
            margin: 0 5px; /* Espaciado entre elementos */
        }

        .page-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%; /* Bordes redondeados */
            text-decoration: none;
            color: #333;
            font-size: 14px;
            transition: all 0.3s ease;
            border: 1px solid transparent; /* Borde transparente por defecto */
        }

        .page-item.active .page-link {
            background-color: #f0f0f0; /* Color de fondo activo */
            color: #0faec0; /* Color del texto activo */
            font-weight: bold; /* Negrita para el texto activo */
        }

        .page-item:not(.active) .page-link:hover {
            background-color: #e6f7f9; /* Color de fondo al pasar el mouse */
        }

        .page-item.disabled .page-link {
            color: #ccc; /* Color de texto deshabilitado */
            pointer-events: none; /* Sin eventos de puntero */
        }

        /* Estilos para las flechas */
        .page-item:first-child .page-link,
        .page-item:last-child .page-link {
            font-size: 18px;
            font-weight: bold;
            border: 1px solid #ccc;
            padding: 0; /* Sin padding adicional */
            line-height: 28px; /* Ajustado para centrar verticalmente */
        }

        .page-link:focus{
            outline: none;
            box-shadow: none;
        }


        .btn-outline-primary {
            border: 1px solid #007bff;
            color: #007bff;
            background-color: transparent;
            padding: 4px 8px;
            font-size: 12px;
            border-radius: 4px;
            transition: all 0.2s;
            }

            .btn-outline-primary:hover {
            background-color: #007bff;
            color: white;
            }

        @media (max-width: 768px) {
            .page-link,
            .page-item:first-child .page-link,
            .page-item:last-child .page-link {
                width: 25px;
                height: 25px;
                font-size: 12px;
                line-height: 23px; /* Ajustado para dispositivos móviles */
            }
        }

        @media (max-width: 768px) {
            .page-link,
            .page-item:first-child .page-link,
            .page-item:last-child .page-link {
                width: 25px;
                height: 25px;
                font-size: 12px;
                line-height: 23px; /* Ajustado para dispositivos móviles */
            }
        }

        /* Estilos de la tabla */
        .table th {
            font-weight: bold; /* Negrita para encabezados de la tabla */
        }

        /* Estilos de progreso */
        .progress {
            max-width: 100px; /* Limita el ancho de la barra de progreso */
        }

        /* Iconos */
        .icon-size {
            font-size: 1.5rem; /* Tamaño de iconos */
        }

        .icon-size:hover {
            scale: 110%; /* Escala al pasar el mouse */
            cursor: pointer; /* Cambiar cursor al pasar el mouse */
        }

        .mdi-eye-outline:hover {
            color: #046cae; /* Color al pasar el mouse */
        }

        .mdi-pencil-outline:hover {
            color: #fab736; /* Color al pasar el mouse */
        }

        .mdi-delete-outline:hover {
            color: #b72f63; /* Color al pasar el mouse */
        }

        /* Estilo de búsqueda */
        .buscar {
            position: relative; /* Posición relativa para el ícono de búsqueda */
        }

        .form-control {
            padding-left: 30px; /* Padding para el campo de búsqueda */
        }

        .mdi-magnify {
            position: absolute; /* Posición absoluta para el ícono de búsqueda */
            padding: 4px; /* Padding alrededor del ícono */
            font-size: 1.3rem; /* Tamaño del ícono */
            color: gray; /* Color del ícono */
        }

        /* Estilos de tarjetas */
        .card {
            height: 20px; /* Altura de la tarjeta */
            width: 20px; /* Ancho de la tarjeta */
        }

        /* Colores personalizados */
        .bg-blue-dark {
            background-color: #046cae;
            color: #046cae;
        }

        .bg-gray-blue {
            background-color: #445267;
            color: #445267;
        }

        .bg-aqua {
            background-color: #0faec0;
            color: #0faec0;
        }

        .bg-indigo {
            background-color: #565fa7;
            color: #565fa7;
        }

        .bg-yellow {
            background-color: #fab736;
            color: #fab736;
        }

        .bg-pink {
            background-color: #b72f63;
            color: #b72f63;
        }

        /* Colores al 60% de opacidad */
        .bg-blue-dark-opacity {
            background-color: rgba(4, 108, 174, 0.4);
        }

        .bg-gray-blue-opacity {
            background-color: rgba(68, 82, 103, 0.4);
        }

        .bg-aqua-opacity {
            background-color: rgba(15, 174, 192, 0.4);
        }

        .bg-indigo-opacity {
            background-color: rgba(86, 95, 167, 0.4);
        }

        .bg-yellow-opacity {
            background-color: rgba(250, 183, 54, 0.4);
        }

        .bg-pink-opacity {
            background-color: rgba(183, 47, 99, 0.4);
        }

        @media (max-width: 768px) {
            .table td, .table th {
                font-size: 0.875rem; /* Reduce el tamaño de la fuente en pantallas pequeñas */
                padding-right: 0.5rem; /* Reduce el espacio entre columnas en pantallas pequeñas */
            }
        }


</style>
