<template>
  <div class="field">
    <label class="checkbox">
      <input v-model="localValue" type="checkbox">
      {{ label }}
    </label>
  </div>
</template>

<script>
import vmodelMixin from '@/mixins/vmodelMixin'
export default {
  name: 'CheckboxField',
  mixins: [vmodelMixin],
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
