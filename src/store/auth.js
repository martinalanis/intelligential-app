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
      const res = await User.login(form)
      commit('setUser', res)
      dispatch('setSessionToken', Date.now().toString())
      return res
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
