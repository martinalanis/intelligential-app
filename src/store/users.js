import { User } from '@/api'

export default {
  namespaced: true,
  actions: {
    async getUsers ({ commit }) {
      return await User.all()
    }
  }
}
