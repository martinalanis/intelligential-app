<template>
  <dialog ref="modal">
    <button
      class="close"
      @click="close"
    >
      <span class="icon">
        <fa-icon icon="times"></fa-icon>
      </span>
    </button>
    <div class="modal-content">
      <dynamic-form
        ref="form"
        :form="form"
        :loading="loading"
        @cancel="close"
        @submit="submit"
      />
    </div>
  </dialog>
</template>

<script>
import { mapActions } from 'vuex'
import DynamicForm from '@/components/form/dynamicForm'
export default {
  name: 'UserForm',
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
      getForm: 'users/getForm',
      saveUser: 'users/saveUser'
    }),
    add () {
      // this.dialog = true
      this.$refs.modal.showModal()
    },
    close () {
      this.$refs.modal.close()
    },
    async submit (form) {
      this.loading = true
      try {
        await this.saveUser(form)
        this.$refs.form.error = ''
        this.$refs.form.reset()
        this.$emit('success')
        this.close()
      } catch ({ message }) {
        this.$refs.form.error = message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
