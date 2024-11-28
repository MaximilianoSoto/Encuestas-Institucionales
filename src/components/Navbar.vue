<script setup>
</script>

<template>
  <div class="fondo">
    
      <aside>
        <img class="mt-3" src="../assets/img/unap_aniversario2 (3).png" alt="logo_unap" width="80%">
      </aside>
      <aside class="d-flex align-item-center justify-content-center gap-2 text-light">
        <div class="mt-3">
          <h4 class="fs-6 fw-bold">Sandra Arevalos </h4>
          <h4 class="fs-6 ">25.235.287-2</h4>
        </div>
        <div>
          <img class="avatar" src="../assets/img/logo_avatar.jpg" alt="">
        </div>
      </aside>
    
  </div>
</template>

<style scoped>

.avatar {
    width: 60px; /* Define un ancho fijo */
    height: 60px; /* Define una altura fija para que sea cuadrada */
    object-fit: cover; /* Asegura que la imagen se recorte correctamente si es más grande */
    border-radius: 50%; /* Hace que la imagen sea circular */
    transition: all 300ms;
}

.avatar:hover{
    scale: 105%;
}

@media (width < 770px){
  .avatar{
    display: none;
  }
}


.logo {
  padding: 4rem;
}

.nav-link {
  margin-right: 2rem;
}

.fondo {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(135deg, #046cae, #0faec0);
  height: 11rem;
  z-index: 0;
}

</style>
