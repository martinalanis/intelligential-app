export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      localValue: this.value
    }
  },
  watch: {
    localValue (value) {
      this.$emit('input', value)
    },
    value (value) {
      this.localValue = value
    }
  }
}
