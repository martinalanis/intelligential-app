<template>
  <div class="container h-full">
    <div class="columns is-centered is-vcentered h-100">
      <div class="column is-4">
        <h4 class="">Panel de Administración</h4>
        <h1 class="title is-text mb-5">LOGIN</h1>
        <div class="card">
          <div class="card-content">
            <div class="content">
              <form @submit.prevent="login">
                <input type="email" placeholder="Email" v-model="form.email">
                <input type="password" placeholder="Password" v-model="form.password">
                <button type="submit">Ingresar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.log('login')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
