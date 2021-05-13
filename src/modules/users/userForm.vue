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
    <form class="card" @submit.prevent="submit">
      <div class="card-content">
        <div
          v-for="({ sectionId, sectionName, fields }) in sections"
          :key="sectionId"
        >
          <p class="section-header">
            <span>{{ sectionName }}</span>
            <span class="line"></span>
          </p>
          <input-field
            v-for="({ fieldId, key, type, label, required }) in fields"
            :key="fieldId"
            :name="key"
            :label="label"
            :type="type"
            :loading="loading"
            :required="required"
          />
          <div
            v-if="error"
            class="alert error mb-2"
          >
            {{ error }}
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button type="reset" class="button is-fullwidth is-ghost" @click="close">cancelar</button>
        <button type="submit" class="button is-fullwidth is-primary">GUARDAR</button>
      </footer>
    </form>
  </dialog>
</template>

<script>
import { mapActions } from 'vuex'
import InputField from '@/components/inputField'
export default {
  name: 'UserForm',
  components: {
    InputField
  },
  data () {
    return {
      dialog: false,
      loading: false,
      showPassword: false,
      form: {},
      error: ''
    }
  },
  async created () {
    this.form = await this.getForm().then(r => r.form)
  },
  computed: {
    sections () {
      return this.form.sections || []
    }
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
    async submit () {
      console.log('submit')
      const form = Object.fromEntries(new FormData(event.target))
      this.loading = true
      try {
        await this.saveUser(form)
        this.error = ''
        this.$emit('success')
        this.close()
      } catch ({ message }) {
        this.error = message
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
  .section-header {
    position: relative;
    // text-align: right;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    // color: $blue-darken;
    color: #757476;
    .line {
      flex: 1;
      position: relative;
      margin-left: 1rem;
      // border-left: 1px solid rgba(0,0,0,0.15);
      // height: 0.8rem;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 1px;
        background: rgba(0,0,0,0.15);
      }
    }
  }
}
</style>
