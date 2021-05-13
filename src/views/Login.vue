<template>
  <div class="container h-full">
    <div class="columns is-centered is-vcentered h-100">
      <div class="column is-4">
        <h4 class="has-text-grey">Finantial App</h4>
        <h1 class="title has-text-primary-dark mb-5">INTELLIGENTIAL</h1>
        <form
          class="box content"
          @submit.prevent="submit"
        >
          <p>
            Ingrese sus datos
          </p>
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
          <div
            v-if="error"
            class="alert error mb-2"
          >
            {{ error }}
          </div>
          <button
            type="submit"
            class="button is-primary mt-2"
            :class="{ 'is-loading': loading }"
          >
            INGRESAR
          </button>
        </form>
        <p class="is-italic is-size-7 mb-3">
          * Todos los campos son requeridos
        </p>
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
import InputField from '@/components/inputField'
import CheckboxField from '@/components/checkboxField'

export default {
  name: 'Login',
  components: {
    InputField,
    CheckboxField
  },
  data () {
    return {
      loading: false,
      showPassword: false,
      error: ''
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
        this.error = ''
        this.$router.push({ name: 'dashboard' })
      } catch ({ message }) {
        this.error = message
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
