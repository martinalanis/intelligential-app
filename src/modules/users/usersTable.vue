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
    <div class="list">
      <div
        v-for="(user, i) in users"
        :key="i"
        class="list__item"
        :class="{ 'disabled': !user.status }"
      >
        <user-details :user="user" />
        <div class="list__actions">
          <button
            class="button is-small is-text has-text-info"
          >
            editar
          </button>
          <button
            class="button is-small is-text"
            :class="{ 'has-text-success': !user.status }"
            @click="changeStatus(user.id)"
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
      users: []
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
      this.users = await this.getUsers()
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
.list {
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  // overflow: hidden;
  &__item {
    background: #FFF;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    &.disabled {
      background: #f5f5f5;
    }
    div:first-child {
      flex: 1;
    }
    &:hover {
      background: #efefef;
    }
  }
  &__actions {
    // width: 100px;
    // border-left: 1px solid rgba(0,0,0,0.15);
    width: 210px;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.button.is-small {
  border-radius: $border-radius;
}
</style>
