<template>
  <form
    class="content"
    @submit.prevent="submit"
  >
    <p>
      Ingresa tus datos
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
</template>

<script>
import { mapActions } from 'vuex'
import InputField from '@/components/form/inputField'
import CheckboxField from '@/components/form/checkboxField'

export default {
  name: 'LoginForm',
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
  methods: {
    ...mapActions({
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
    }
  }
}
</script>
