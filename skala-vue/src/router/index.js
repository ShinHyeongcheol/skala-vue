import { createRouter, createWebHistory } from 'vue-router'
import CodeChallengeView from '../views/CodeChallengeView.vue'
import HandsOnView from '../views/HandsOnView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/hands-on' },
    { path: '/challenges', name: 'code-challenge', component: CodeChallengeView },
    { path: '/hands-on', name: 'hands-on', component: HandsOnView },
    { path: '/:pathMatch(.*)*', redirect: '/hands-on' },
  ],
})

export default router
