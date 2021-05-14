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
          role: ['administrador', 'cliente']
        }
      },
      {
        name: 'usuarios',
        path: '/usuarios',
        component: () => import(/* webpackChunkName: "usuarios" */ '@/views/admin/Usuarios'),
        meta: {
          role: ['administrador']
        }
      },
      {
        name: 'solicitudes',
        path: '/solicitudes',
        component: () => import(/* webpackChunkName: "solicitudes" */ '@/views/admin/Solicitudes'),
        meta: {
          role: ['administrador']
        }
      },
      {
        name: 'creditos',
        path: '/creditos',
        component: () => import(/* webpackChunkName: "solicitudes" */ '@/views/client/Creditos'),
        meta: {
          role: ['cliente']
        }
      },
      {
        name: 'nuevoCredito',
        path: '/creditos/solicitar',
        component: () => import(/* webpackChunkName: "solicitudes" */ '@/views/client/SolicitarCredito'),
        meta: {
          role: ['cliente']
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
  const hasPermission = to.matched.some(record => record.meta.role?.includes(userRole))
  const goToLogin = to.name === 'login'

  // console.log(hasPermission)

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
})

export default router
