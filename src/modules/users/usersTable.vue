<template>
  <div>
    <div class="columns">
      <div class="column">
        <button
          class="button is-small is-info"
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
    <div class="list-container">
      <div class="columns is-multiline">
        <div
          class="column is-12 py-0"
          v-for="(user, i) in users"
          :key="i"
        >
          <user-details :user="user" />
        </div>
      </div>
    </div>
    <user-form ref="userForm" @success="loadTable"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      users: []
    }
  },
  async created () {
    await this.loadTable()
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getUsers'
    }),
    async loadTable () {
      this.users = await this.getUsers()
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  overflow: hidden;
  .column {
    border-bottom: 1px solid rgba(0,0,0,0.15);
  }
}
.button.is-small {
  border-radius: $border-radius;
}
</style>
