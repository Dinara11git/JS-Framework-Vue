
import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import CampaignsView from '../views/CampaignsView.vue'
import CampaignDetailsView from '../views/CampaignDetailsView.vue'
import ClientsView from '../views/ClientsView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'

const routes = [
  {
    path: '/login',
    component: LoginView,
    meta: { public: true }
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/campaigns',
    component: CampaignsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/campaigns/:id',
    component: CampaignDetailsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/clients',
    component: ClientsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/analytics',
    component: AnalyticsView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const isAuthenticated =
    localStorage.getItem('adflow-authenticated') === 'true'

  if (to.matched.some(route => route.meta.requiresAuth) && !isAuthenticated) {
    return '/login'
  }

  if (to.path === '/login' && isAuthenticated) {
    return '/dashboard'
  }

  return true
})

export default router
