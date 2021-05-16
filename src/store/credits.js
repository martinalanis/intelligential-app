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
    async getAllCredits ({ commit }) {
      return await Credit.getAllCredits()
    }
  }
}
