<template>
  <div>
    <div class="table-list" :class="{ 'has-overlay': loading }">
      <div
        v-for="(user, i) in users"
        :key="i"
        class="table-list__item"
        :class="{ 'disabled': !user.status }"
      >
        <user-details :user="user" />
        <div class="table-list__actions">
          <button
            class="button is-small is-text has-text-info"
          >
            editar
          </button>
          <button
            class="button is-small is-text"
            :class="{ 'has-text-success': !user.status }"
            @click="changeStatus(user.id)"
            :disabled="currentUser.id === user.id"
          >
            {{ user.status ? 'desactivar' : 'activar' }}
          </button>
          <button
            class="button is-small is-text has-text-danger"
            @click="remove(user.id)"
            :disabled="currentUser.id === user.id"
          >
            eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserDetails from './userDetails'
export default {
  name: 'UsersTable',
  components: {
    UserDetails
  },
  data () {
    return {
      items: []
    }
  },
  async created () {
    await this.loadTable()
  },
  methods: {
    ...mapActions({
      getCredits: 'users/getAllCredits'
    }),
    async loadTable () {
      this.loading = true
      this.items = await this.getCredits()
      this.loading = false
    }
    // async changeStatus (id) {
    //   try {
    //     await this.changeUserStatus(id)
    //     this.loadTable()
    //   } catch ({ message }) {
    //     console.log(message)
    //   }
    // },
    // async remove (id) {
    //   try {
    //     await this.removeUser(id)
    //     this.loadTable()
    //   } catch ({ message }) {
    //     console.log(message)
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
