import { User } from '@/api'

export default {
  namespaced: true,
  state: {
    user: {}
  },
  actions: {
    async login ({ commit, dispatch }, form) {
      const res = await User.login(form)
      console.log(res)
      return res
    }
  }
}
