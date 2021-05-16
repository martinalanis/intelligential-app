<template>
  <dialog ref="modal" :style="{ width: size }">
    <button
      class="close"
      @click="close"
    >
      <span class="icon">
        <fa-icon icon="times"></fa-icon>
      </span>
    </button>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <slot></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    size: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: 0
    }
  },
  methods: {
    async show () {
      this.$refs.modal.showModal()
      if (this.timeout) {
        return new Promise(resolve => {
          setTimeout(() => {
            this.close()
            resolve(true)
          }, this.timeout)
        })
      }
    },
    close () {
      this.$refs.modal.close()
    }
  }
}
</script>
