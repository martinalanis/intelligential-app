import Cookies from 'js-cookie'
import { User } from '@/api'

const set = key => (state, payload) => {
  state[key] = payload
}

export default {
  namespaced: true,
  state: {
    sessionToken: Cookies.get('it_session') || '',
    user: {}
  },
  getters: {
    isLogged (state) {
      return !!state.sessionToken
    }
  },
  mutations: {
    setUser: set('user'),
    setToken: set('sessionToken')
  },
  actions: {
    async login ({ commit, dispatch }, form) {
      const { user, sessionToken } = await User.login(form)
      commit('setUser', user)
      dispatch('setSessionToken', sessionToken)
      return user
    },
    setSessionToken ({ commit }, token) {
      const params = {
        expires: 1 / 12 // expires in 2 hours
      }
      Cookies.set('it_session', token, params)
      commit('setToken', token)
    }
  }
}
