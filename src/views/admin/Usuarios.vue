<template>
  <div>
    <div class="columns">
      <div class="column">
        <h1 class="title mb-5">
          Usuarios
        </h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <users-table />
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from '@/modules/users/usersTable'
export default {
  name: 'Usuarios',
  components: {
    UsersTable
  }
}
</script>
