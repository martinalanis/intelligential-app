import Cookies from 'js-cookie'
import router from '@/router'
import { User } from '@/api'

const set = key => (state, payload) => {
  state[key] = payload
}

const getUserRoleFromCookie = () => {
  const cookie = Cookies.get('it_session')
  if (cookie) {
    return Cookies.get('it_session').split('-')[1]
  }
  return ''
}

export default {
  namespaced: true,
  state: {
    sessionToken: Cookies.get('it_session') || '',
    user: {},
    userRole: getUserRoleFromCookie()
  },
  getters: {
    isLogged (state) {
      return !!state.sessionToken
    },
    user (state) {
      return state.user
    },
    userRole (state) {
      return state.userRole || ''
    }
  },
  mutations: {
    setUser: set('user'),
    setToken: set('sessionToken'),
    setRole: set('userRole')
  },
  actions: {
    async login ({ commit, dispatch }, form) {
      const { user, sessionToken } = await User.login(form)
      commit('setUser', user)
      commit('setRole', user.role)
      dispatch('setSessionToken', sessionToken)
      return user
    },
    /**
     * For readablity purpose
     * In this case applys same logic that login but can implements
     * additional features in case its needed
     */
    async register ({ commit, dispatch }, form) {
      const { user, sessionToken } = await User.register(form)
      commit('setUser', user)
      commit('setRole', user.role)
      dispatch('setSessionToken', sessionToken)
      return user
    },
    setSessionToken ({ commit }, token) {
      const params = {
        expires: 1 / 12 // expires in 2 hours
      }
      Cookies.set('it_session', token, params)
      commit('setToken', token)
    },
    async getUser ({ commit }) {
      const id = parseInt(Cookies.get('it_session').split('-')[0])
      const user = await User.getUser(id)
      commit('setUser', user)
      commit('setRole', user.role)
    },
    logout ({ commit }) {
      commit('setUser', {})
      commit('setToken', '')
      Cookies.remove('it_session')
      router.go()
    }
  }
}
