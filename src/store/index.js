import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hideInitializeButton: false
  },
  mutations: {
    setHideInitializeButton (state, payload) {
      state.hideInitializeButton = payload
    }
  },
  actions: {
    initDB ({ dispatch }, data) {
      const stored = JSON.parse(localStorage.getItem('intelligentialDB'))
      // Preventing delete stored data we only overwrite admins collection
      localStorage.setItem(
        'intelligentialDB',
        JSON.stringify({ ...stored, ...data })
      )
      dispatch('checkDatabase')
    },
    checkDatabase ({ commit }) {
      commit('setHideInitializeButton', !!JSON.parse(localStorage.getItem('intelligentialDB'))?.administradores)
    }
  },
  modules: {
  }
})
