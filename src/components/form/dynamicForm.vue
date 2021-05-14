<template>
  <form class="dynamic-form has-background-white py-4" @submit.prevent="submit" ref="form">
    <div
      v-for="({ sectionId, sectionName, fields, subgroups }, i) in sections"
      :key="sectionId"
      class="section-form"
    >
      <p class="section-header">
        <span class="section-header__title">
          <span
            v-if="sections.length > 1"
          >
            {{ i + 1 }}
          </span>
          {{ sectionName }}
        </span>
        <span class="line"></span>
      </p>
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
      <div
        v-for="({ subgroupId, name, description, fields }) in subgroups"
        :key="`sub-${subgroupId}`"
        class="mb-3"
      >
        <h4 class="subgroup-title">
          {{ name }}
        </h4>
        <p class="mb-4">
          {{ description }}
        </p>
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
    </div>
    <div
      v-if="error"
      class="alert error mb-2"
    >
      {{ error }}
    </div>
    <div class="actions">
      <button
        type="reset"
        class="button is-ghost" @click="$emit('cancel')"
      >cancelar</button>
      <button
        type="submit"
        class="button is-primary"
      >GUARDAR</button>
    </div>
  </form>
</template>

<script>
import InputField from '@/components/form/inputField'
import SelectField from '@/components/form/selectField'
export default {
  name: 'DynamicForm',
  components: {
    InputField,
    SelectField
  },
  props: {
    form: {
      type: Object,
      default: () => {},
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      error: ''
    }
  },
  computed: {
    sections () {
      return this.form.sections || []
    }
  },
  methods: {
    submit (event) {
      this.$emit('submit', Object.fromEntries(new FormData(event.target)))
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
