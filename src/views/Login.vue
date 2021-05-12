<template>
  <div class="container h-full">
    <div class="columns is-centered is-vcentered h-100">
      <div class="column is-4">
        <h4 class="has-text-grey">Panel de Administración</h4>
        <h1 class="title has-text-primary-dark is-text mb-5">INTELLIGENTIAL APP</h1>
        <div class="card">
          <div class="card-content">
            <div class="content">
              <p>
                Ingrese sus datos
              </p>
              <form @submit.prevent="submit">
                <input-field
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="admin@example.com"
                  icon="envelope"
                  :loading="loading"
                  required
                />
                <input-field
                  name="password"
                  label="Password"
                  :type="!showPassword ? 'password' : 'text'"
                  placeholder="******"
                  icon="lock"
                  :loading="loading"
                  required
                />
                <checkbox-field
                  v-model="showPassword"
                  label="Mostrar contraseña"
                />
                <button
                  type="submit"
                  class="button is-primary mt-2"
                  :class="{ 'is-loading': loading }"
                >
                  INGRESAR
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          class="is-italic mt-6 is-size-7 has-text-centered"
          v-if="!hideInitializeButton"
        >
          <p>
            Inicializar administradores por defecto?
          </p>
          <a
            @click.prevent="loadInitialDb">
            Inicializar
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/db.json'
import { mapActions, mapState } from 'vuex'
import InputField from '@/components/InputField'
import CheckboxField from '@/components/CheckboxField'

export default {
  name: 'Login',
  components: {
    InputField,
    CheckboxField
  },
  data () {
    return {
      loading: false,
      showPassword: false
    }
  },
  created () {
    this.checkDatabase()
  },
  computed: {
    ...mapState(['hideInitializeButton'])
  },
  methods: {
    ...mapActions({
      initDB: 'initDB',
      checkDatabase: 'checkDatabase',
      login: 'auth/login'
    }),
    async submit (event) {
      const form = Object.fromEntries(new FormData(event.target))
      this.loading = true
      try {
        await this.login(form)
      } catch ({ message }) {
        // console.log()
        console.log(message)
      } finally {
        this.loading = false
      }
    },
    loadInitialDb () {
      this.initDB(db)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
