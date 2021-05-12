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
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard'),
        meta: {
          role: 'administrador'
        }
      },
      {
        name: 'usuarios',
        path: '/usuarios',
        component: () => import(/* webpackChunkName: "usuarios" */ '@/views/Usuarios'),
        meta: {
          role: 'administrador'
        }
      },
      {
        name: 'solicitudes',
        path: '/solicitudes',
        component: () => import(/* webpackChunkName: "solicitudes" */ '@/views/Solicitudes'),
        meta: {
          role: 'cliente'
        }
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
  const userRole = store.getters['auth/userRole']
  const authorization = to.matched.some(record => record.meta.requiresAuth)
  const hasPermission = to.matched.some(record => record.meta.role === userRole)
  console.log(to.matched)
  console.log('user role', userRole)
  const goToLogin = to.name === 'login'

  // if (
  //   (!authorization) ||
  //   (!authorization && isLogged && !goToLogin) ||
  //   (authorization && isLogged && !goToLogin && hasPermission)
  // ) {
  //   next()
  //   return
  // }

  // if (
  //   (authorization && isLogged && !hasPermission) ||
  //   (isLogged && goToLogin)
  // ) {
  //   next({ name: 'dashboard' })
  // } else if (authorization && !isLogged) {
  //   next({ name: 'login' })
  // } else {
  //   next()
  // }

  if (authorization && !isLogged) {
    next({ name: 'login' })
  } else if (
    (authorization && isLogged && !hasPermission) ||
    (isLogged && goToLogin)
  ) {
    next({ name: 'dashboard' })
  } else {
    next()
  }

  // if (authorization && !isLogged) {
  //   // redirect to login if tries enter into a protected route without been logged in
  //   next({ name: 'login' })
  // } else if (!authorization && isLogged) {
  //   // redirect to home if is already logged in and tries to go to login
  //   next('dashboard')
  // } else {
  //   /**
  //    * 2 posibles cases:
  //    * Tries to go to protected route and is logged in
  //    * Tries to go to login and isn't logged in
  //    */
  //   next()
  // }
})

// const hasPermission = ()

export default router
