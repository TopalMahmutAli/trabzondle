import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import ModeClassique from '../views/ModeClassique.vue'

const routes = [
  { path: '/', name: 'Accueil', component: Accueil },
  { path: '/classique', name: 'ModeClassique', component: ModeClassique },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
