<template>
  <div>
    <h1 class="title">
      Usuarios
    </h1>
    <div class="columns">
      <div class="column is-7">
        <users-list />
      </div>
    </div>
  </div>
</template>

<script>
import UsersList from '../modules/users/usersList'
export default {
  name: 'Usuarios',
  components: {
    UsersList
  }
}
</script>
