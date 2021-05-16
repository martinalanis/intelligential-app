import { Credit } from '@/api'

export default {
  namespaced: true,
  actions: {
    async getForm ({ commit }, id) {
      return await Credit.getForm()
    },
    async saveCredit ({ commit }, form) {
      return await Credit.saveCredit(form)
    },
    async currentUserCredits ({ commit }) {
      return await Credit.currentUserCredits()
    },
    async all ({ commit }) {
      return await Credit.all()
    },
    async changeStatus ({ commit }, { status, id }) {
      return await Credit.changeStatus(status, id)
    }
  }
}
