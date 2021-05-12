import { User } from '@/api'

const set = key => (state, payload) => {
  state[key] = payload
}

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setUser: set('user')
  },
  actions: {
    async login ({ commit }, form) {
      const res = await User.login(form)
      // console.log(res)
      commit('setUser', res)
      return res
    }
  }
}
