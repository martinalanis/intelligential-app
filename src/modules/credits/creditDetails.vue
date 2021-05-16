<template>
  <div>
    <p class="is-size-5 mb-5 has-text-success">Detalles de solicitud de crédito</p>
    <!-- <hr class="mt-2"> -->
    <ul>
      <li
        v-for="({ label, value }, i) in list"
        :key="i"
      >
        <span>{{ label }}</span>
        {{ value }}
      </li>
      <li>
        <span>status</span>
        <span class="tag" :class="{ [`status-${credit.status}`]: true }">
          {{ credit.status }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CreditDetails',
  props: {
    credit: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: {}
    }
  },
  async created () {
    this.form = await this.getForm().then(r => r.form)
  },
  computed: {
    list () {
      const arr = []
      if (Object.keys(this.credit).length) {
        Object.keys(this.credit).forEach(key => {
          const label = this.getLabelFromFormKey(key)
          if (label) arr.push({ label, value: this.credit[key] })
        })
      }
      return arr
    }
  },
  methods: {
    ...mapActions({
      getForm: 'users/getCreditForm'
    }),
    getLabelFromFormKey (key) {
      // Helper funtions
      const inFields = (e) => e.fields.some(field => field.key === key)
      const isInSubgroup = e => e.subgroups && e.subgroups.find(inFields)
      const getLabel = ({ fields }, key) => fields.find(field => field.key === key).label
      // Local variables
      const { sections } = this.form
      if (!sections) return ''
      let section = sections ? sections.find(inFields) : null

      return section
        ? getLabel(section, key)
        : (() => {
          section = sections.find(isInSubgroup)
          return section ? getLabel(section.subgroups.find(inFields), key) : ''
        })()

      /**
       * Initial aproach
       */
      // const section = this.form.sections.find(e => e.fields.some(field => field.key === key))
      // if (section) {
      //   return section.fields.find(field => field.key === key).label
      // } else {
      //   const insubgroup = this.form.sections.find(e => e.subgroups?.find(subgroup => subgroup.fields.some(field => field.key === key)))
      //   if (insubgroup) {
      //     // console.log(insubgroup.fields.find(field => field.key === key))
      //     const fields = insubgroup.subgroups.find(s => s.fields.some(field => field.key === key)).fields.find(field => field.key === key)
      //     return fields.label
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  span:not(.tag) {
    font-size: 0.9rem;
    text-transform: uppercase;
    display: inline-block;
    font-weight: 500;
    line-height: 1.2;
    width: 8rem;
    margin-right: 1rem;
    padding-right: 0.5rem;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
    border-right: 1px solid rgba(0,0,0,0.15);
  }
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0,0,0,0.15);
  }
}
</style>
