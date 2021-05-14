<template>
  <div>
    <section-title>
      USUARIOS
    </section-title>
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
