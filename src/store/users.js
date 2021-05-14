import { User } from '@/api'

export default {
  namespaced: true,
  actions: {
    async getUsers ({ commit }) {
      return await User.all()
    },
    async getForm ({ commit }) {
      return await User.getForm()
    },
    async saveUser ({ commit }, form) {
      return await User.save(form)
    },
    async changeStatus ({ commit }, id) {
      return await User.changeStatus(id)
    },
    async remove ({ commit }, id) {
      return await User.remove(id)
    },
    async getCreditForm ({ commit }, id) {
      return await User.getCreditForm()
    }
  }
}
