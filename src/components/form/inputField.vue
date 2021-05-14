<template>
  <div class="field">
    <label
      v-if="label"
      :for="label"
      class="is-inline-block"
    >
      {{ label }}:
    </label>
    <div class="control" :class="{ 'has-icons-left': icon, 'is-loading': loading }">
      <input
        :id="label"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        class="input"
        :required="required"
        :disabled="loading"
      />
      <span v-if="icon" class="icon is-left">
        <fa-icon :icon="icon"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
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
