<template>
  <div>
    <div
      v-for="({ fieldId, key, type, label, options, required }) in fields"
      :key="fieldId"
      class="mb-2"
    >
      <select-field
        v-if="type === 'dropdown'"
        :name="key"
        :label="label"
        :options="options"
        :loading="loading"
        :required="required"
      />
      <input-field
        v-else
        :name="key"
        :label="label"
        :type="type"
        :loading="loading"
        :required="required"
      />
    </div>
  </div>
</template>

<script>
import InputField from '@/components/form/inputField'
import SelectField from '@/components/form/selectField'
export default {
  name: 'FieldsComponent',
  components: {
    InputField,
    SelectField
  },
  props: {
    fields: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
