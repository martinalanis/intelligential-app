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
      form: {},
      isEdit: false,
      userId: null
    }
  },
  async created () {
    this.form = await this.getForm().then(r => r.form)
  },
  methods: {
    ...mapActions({
      getForm: 'users/getForm',
      saveUser: 'users/saveUser',
      updateUser: 'users/updateUser'
    }),
    add () {
      // this.dialog = true
      this.$refs.modal.showModal()
    },
    edit (user) {
      this.isEdit = true
      this.userId = user.id
      this.$refs.modal.showModal()
      Object.keys(user).forEach(key => {
        const el = document.getElementById(key)
        if (el) el.value = user[key]
      })
    },
    close () {
      this.$refs.modal.close()
      this.isEdit = false
      this.userId = null
    },
    async submit (form) {
      this.loading = true
      try {
        if (this.isEdit) {
          await this.updateUser({ form, id: this.userId })
        } else {
          await this.saveUser(form)
        }
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
