<template>
  <div>
    <p
      v-for="(user, i) in users"
      :key="i"
    >
      {{ user }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UsersList',
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

</style>
