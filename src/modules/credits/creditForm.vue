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
import { mapActions } from 'vuex'
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
  methods: {
    ...mapActions({
      getForm: 'users/getCreditForm',
      save: 'users/saveCreditForm'
    }),
    async submit (form) {
      this.loading = true
      try {
        await this.save(form)
        this.$refs.form.error = ''
        this.$refs.form.reset()
        this.$emit('success')
      } catch ({ message }) {
        this.$refs.form.error = message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
