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
                  required
                />
                <input-field
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="******"
                  icon="lock"
                  required
                />
                <button
                  class="button is-primary mt-3"
                  type="submit"
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
            ¿Restaurar administradores por defecto?
          </p>
          <a
            @click.prevent="loadInitialDb">
            Restaurar
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

export default {
  name: 'Login',
  components: {
    InputField
  },
  data () {
    return {
      form: null
    }
  },
  created () {
    this.checkDatabase()
  },
  computed: {
    ...mapState(['hideInitializeButton'])
  },
  methods: {
    ...mapActions(['initDB', 'checkDatabase']),
    submit (event) {
      console.log(event.target)
      const form = Object.fromEntries(new FormData(event.target))
      console.log(form)
    },
    loadInitialDb () {
      this.initDB(db)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
