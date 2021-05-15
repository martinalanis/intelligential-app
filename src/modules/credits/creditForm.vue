<template>
  <div class="bordered">
    <dynamic-form
      ref="form"
      :form="form"
      :loading="loading"
      @cancel="$router.back()"
      @submit="submit"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DynamicForm from '@/components/form/dynamicForm'
export default {
  name: 'CreditForm',
  components: {
    DynamicForm
  },
  data () {
    return {
      loading: false,
      form: {}
    }
  },
  async created () {
    this.form = await this.getForm().then(r => r.form)
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      getForm: 'users/getCreditForm',
      save: 'users/saveCredit'
    }),
    async submit (form) {
      this.loading = true
      form.userId = this.user.id
      try {
        await this.save(form)
        this.$refs.form.error = ''
        this.$refs.form.reset()
        console.log('creado')
      } catch ({ message }) {
        this.$refs.form.error = message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
