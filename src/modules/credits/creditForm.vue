<template>
  <div class="bordered">
    <dynamic-form
      ref="form"
      :form="form"
      :loading="loading"
      @cancel="$router.back()"
      @submit="submit"
    />
    <message-dialog
      ref="dialog"
      size="300px"
      :timeout="2500"
    >
      <div class="confirmation">
        <div class="confirmation__icon">
          <fa-icon icon="check" class="has-text-success" size="3x" /><br>
        </div>
        <h2 class="confirmation__text">
          SOLICITUD REGISTRADA
        </h2>
      </div>
    </message-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DynamicForm from '@/components/form/dynamicForm'
import MessageDialog from '@/components/ui/dialog'
export default {
  name: 'CreditForm',
  components: {
    MessageDialog,
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
        await this.$refs.dialog.show()
        this.$router.push({ name: 'creditos' })
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
.confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__icon {
    display: inline-block;
    margin-bottom: 1.2rem;
    box-shadow: $box-shadow;
    padding: 1.2rem;
    border-radius: 50%;
    background: #48c77415 ;
  }
  &__text {
    font-weight: 300;
    letter-spacing: 1px;
  }
}
</style>
