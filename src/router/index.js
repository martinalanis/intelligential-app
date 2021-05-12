import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    component: () => import('@/layouts/default'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard')
      },
      {
        name: 'usuarios',
        path: '/usuarios',
        component: () => import(/* webpackChunkName: "usuarios" */ '@/views/Usuarios')
      },
      {
        name: 'solicitudes',
        path: '/solicitudes',
        component: () => import(/* webpackChunkName: "solicitudes" */ '@/views/Solicitudes')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogged = store.getters['auth/isLogged']
  const authorization = to.matched.some(record => record.meta.requiresAuth)

  if (authorization && !isLogged) {
    // redirect to login if tries enter into a protected route without been logged in
    next({ name: 'login' })
  } else if (!authorization && isLogged) {
    // redirect to home if is already logged in and tries to go to login
    next('dashboard')
  } else {
    /**
     * 2 posibles cases:
     * Tries to go to protected route and is logged in
     * Tries to go to login and isn't logged in
     */
    next()
  }
})

export default router
