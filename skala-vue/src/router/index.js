import { createRouter, createWebHistory } from 'vue-router'

const WeatherHomeView = () => import('@/views/WeatherHomeView.vue')
const WeatherDetailView = () => import('@/views/WeatherDetailView.vue')
const WeatherAboutView = () => import('@/views/WeatherAboutView.vue')
const WeatherHourlyView = () => import('@/views/WeatherHourlyView.vue')
const HandsOnLayoutView = () => import('@/views/HandsOnLayoutView.vue')
const CodeChallengeView = () => import('@/views/CodeChallengeView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/hands-on' },
    {
      path: '/hands-on',
      component: HandsOnLayoutView,
      children: [
        { path: '', name: 'weather-home', component: WeatherHomeView },
        { path: 'hourly', name: 'weather-hourly', component: WeatherHourlyView },
        { path: 'about', name: 'weather-about', component: WeatherAboutView },
      ],
    },
    { path: '/weather/:cityId', name: 'weather-detail', component: WeatherDetailView },
    { path: '/challenges', name: 'code-challenge', component: CodeChallengeView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
