<template>
  <div class="container h-full">
    <div class="columns is-centered is-vcentered h-100">
      <div class="column is-4">
        <h4 class="has-text-grey">Finantial App</h4>
        <h1 class="title has-text-primary-dark mb-5">INTELLIGENTIAL</h1>
        <div class="card mb-5">
          <div class="tabs">
            <button
              class="button"
              :class="{ 'is-primary': active === 'login' }"
              @click="active = 'login'"
            >
              LOGIN
            </button>
            <button
              class="button"
              :class="{ 'is-primary': active === 'register' }"
              @click="active = 'register'"
            >
              REGISTRO
            </button>
          </div>
          <div class="card-content">
            <transition name="fade" mode="out-in">
              <login-form v-if="active === 'login'"/>
              <register-form v-if="active === 'register'"/>
            </transition>
          </div>
        </div>
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
import LoginForm from '../modules/users/loginForm'
import RegisterForm from '../modules/users/registerForm'

export default {
  name: 'Login',
  components: {
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      active: 'login'
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
      checkDatabase: 'checkDatabase'
    }),
    loadInitialDb () {
      this.initDB(db)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  margin-bottom: 0;
  button {
    flex: 1;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    &:first-child {
      margin-right: -1px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .15s ease;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
