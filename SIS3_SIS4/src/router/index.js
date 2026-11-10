import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue'), meta: { guest: true } },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', name: 'Dashboard', component: () => import('../views/Dashboard.vue') },
      { path: 'students', name: 'Students', component: () => import('../views/Students.vue') },
      { path: 'assignments', name: 'Assignments', component: () => import('../views/Assignments.vue') },
      { path: 'assignments/:id', name: 'AssignmentDetails', component: () => import('../views/AssignmentDetails.vue'), props: true },
      { path: 'profile', name: 'Profile', component: () => import('../views/Profile.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({ history: createWebHistory(), routes, scrollBehavior: () => ({ top: 0 }) })

router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem('studenthub-auth') === 'true'
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) return '/login'
  if (to.meta.guest && isAuthenticated) return '/dashboard'
})

export default router
