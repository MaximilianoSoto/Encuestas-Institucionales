import { createRouter, createWebHistory } from 'vue-router'
import VistaCalendario from '@/views/VistaCalendario.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tablaCalendario',
      component: VistaCalendario,
    },
  ],
})

export default router
