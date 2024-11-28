<script setup>
import { onMounted } from "vue";
import { mdiChartPie,  mdiFileDocumentOutline,mdiAccount,mdiCalendarBlank } from "@mdi/js"

import Navbar from '@/components/Navbar.vue';
import Cards from '@/components/Cards.vue';
import Tabla from "@/components/Tabla.vue";

  onMounted(() => {
    const cards = document.querySelectorAll('.carta');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('card-animate');
      }, index * 300); // Retraso secuencial
    });
  });


</script>

<template>

  <Navbar/>
 
 
  <main class="d-flex  justify-content-center">
    <!-- Cards Section -->
    <div class="container d-flex justify-content-center align-items-center min-vh-50 absoluto">
      <div class="row w-100 justify-content-center">
        <div class="col-md-6 col-lg-3 mb-4 carta">
          <Cards
            :reportCount="140"
            :reportTitle="'Total Reportes'"
            :cardSubtitle="'Reportes activos'"
            :contSubtitle="40"
            :pathIcon="mdiChartPie"
            :badgeBackground="'var(--azul-principal-40)'"
            :badgeColor="'#046cae'"
          />
        </div>
        <div class="col-md-6 col-lg-3 mb-4 carta">
          <Cards
            :reportCount="120"
            :reportTitle="'Documentos'"
            :cardSubtitle="'Archivos pendientes'"
            :contSubtitle="30"
            :pathIcon="mdiFileDocumentOutline"
            :badgeBackground="'var(--turquesa-40)'"
            :badgeColor="'var(--turquesa)'"
          />
        </div>
        <div class="col-md-6 col-lg-3 mb-4 carta">
          <Cards
            :reportCount="50"
            :reportTitle="'Usuarios'"
            :cardSubtitle="'Usuarios activos'"
            :contSubtitle="20"
            :pathIcon="mdiAccount"
            :badgeBackground="'var(--azul-violeta-40)'"
            :badgeColor="'var(--azul-violeta)'"
          />
        </div>
        <div class="col-md-6 col-lg-3 mb-4 carta">
          <Cards
            :reportCount="200"
            :reportTitle="'Eventos'"
            :cardSubtitle="'Próximos eventos'"
            :contSubtitle="15"
            :pathIcon="mdiCalendarBlank"
            :badgeBackground="'var(--amarillo-40)'"
            :badgeColor="'var(--amarillo)'"
          />
        </div>
      </div>
  </div>

  <Tabla/>
    

  </main>
  
  
</template>
<style scoped>

  .absoluto{
    max-width: 80% !important;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10vh);
    z-index: 0;
    top: 25px;
    transition: all 500ms ease;
  }

  .row > div {
    transition: all 1s ease; /* Aplica transición a las columnas */
  }

  /* Inicialmente, ocultamos las tarjetas y las colocamos más abajo */
  .carta {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease, transform 1s ease;
  }

  /* Clase para activar la animación */
  .card-animate {
    opacity: 1;
    transform: translateY(0);
  }

  @media (width < 990px){
    .container-tabla{
      margin-top: 20vh;
    }
  }

  /* Animación para retrasar cada tarjeta */
  @keyframes slideInFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .card-body {
    animation: slideInFromLeft 1s ease forwards;
  }

</style>
