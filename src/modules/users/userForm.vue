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

<style lang="scss" scoped>
dialog {
  border: none;
  background: transparent;
  padding: 1rem;
  width: 90%;
  @media screen and ($media-desktop) {
    max-width: 500px;
  }
  &::backdrop {
    background-color: rgba(0,0,0,0.1);
    backdrop-filter: blur(1px);
  }
  .close {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    border: 1px solid $blue-darken;
    border-radius: 50%;
    width: 2.3rem;
    height: 2.3rem;
    padding: 0;
    color: $blue-darken;
    background: transparent;
    cursor: pointer;
    &:hover {
      background: $blue-darken;
      border-color: lighten($blue-darken, 5%);
      color: #FFF;
    }
  }
  .button {
    border-radius: 0;
  }
  .modal-content {
    width: 100%;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
  }
}
</style>
