<template>
  <div class="field">
    <label
      v-if="label"
      :for="label"
      class="is-inline-block"
    >
      {{ label }}:
    </label>
    <div class="control">
      <div class="select is-fullwidth" :class="{ 'is-loading': loading }">
        <select
          :name="name"
          :id="label"
          :required="required"
          :disabled="loading"
        >
          <option
            v-for="({ fieldId, value, label }) in options"
            :key="fieldId"
            :value="value"
          >
            {{ label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectField',
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
  color: #646568;
}
</style>
