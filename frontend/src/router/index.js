import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'

const routes = [
  { path: '/', name: 'Accueil', component: Accueil },
  // On ajoutera d'autres routes plus tard
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
