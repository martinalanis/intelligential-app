<template>
  <div class="list-container">
    <div class="columns">
      <div
        class="column is-12"
        v-for="(user, i) in users"
        :key="i"
      >
        <user-details :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserDetails from './userDetails'
export default {
  name: 'UsersTable',
  components: {
    UserDetails
  },
  data () {
    return {
      users: []
    }
  },
  async created () {
    this.users = await this.getUsers()
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getUsers'
    })
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  overflow: hidden;
}
</style>
