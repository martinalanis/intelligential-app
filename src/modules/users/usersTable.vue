<template>
  <div>
    <div class="columns">
      <div class="column">
        <button
          class="button is-small is-info br-c"
          @click="$refs.userForm.add()"
        >
          <span class="icon mr-1">
            <fa-icon icon="plus"></fa-icon>
          </span>
          <span>
            AGREGAR USUARIO
          </span>
        </button>
      </div>
    </div>
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
            @click="$refs.userForm.edit(user)"
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
    <user-form ref="userForm" @success="loadTable"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserDetails from './userDetails'
import UserForm from './userForm'
export default {
  name: 'UsersTable',
  components: {
    UserDetails,
    UserForm
  },
  data () {
    return {
      users: [],
      loading: false
    }
  },
  async created () {
    await this.loadTable()
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getUsers',
      changeUserStatus: 'users/changeStatus',
      removeUser: 'users/remove'
    }),
    async loadTable () {
      this.loading = true
      this.users = await this.getUsers()
      this.loading = false
    },
    async changeStatus (id) {
      try {
        await this.changeUserStatus(id)
        this.loadTable()
      } catch ({ message }) {
        console.log(message)
      }
    },
    async remove (id) {
      try {
        await this.removeUser(id)
        this.loadTable()
      } catch ({ message }) {
        console.log(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
