<template>
  <div>
    <div class="columns">
      <div class="column is-flex is-justify-content-space-between is-align-items-center">
        <p>Creditos solicitados:</p>
        <div class="field has-addons">
          <div
            v-for="filter in filters"
            :key="filter"
            class="control"
          >
            <button
              class="button is-capitalized"
              :class="{ 'is-primary': activeFilter === filter }"
              @click="activeFilter = filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="table-list" :class="{ 'has-overlay': loading }">
      <div
        v-for="(credit, i) in credits"
        :key="i"
        class="table-list__item"
      >
        <credit-detail-simple :credit="credit" />
        <div class="table-list__actions">
          <button
            class="button is-small is-text has-text-info"
          >
            ver
          </button>
          <button
            class="button is-small is-text has-text-success"
            @click="aprove(credit.id)"
            :disabled="credit.status === 'approved'"
          >
            aprovar
          </button>
          <button
            class="button is-small is-text has-text-danger"
            @click="reject(credit.id)"
            :disabled="credit.status === 'rejected'"
          >
            rechazar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { formatDate } from '@/helpers'
import CreditDetailSimple from './creditDetailSimple'
export default {
  name: 'CreditsTable',
  components: {
    CreditDetailSimple
  },
  data () {
    return {
      items: [],
      filters: [
        'todos',
        'approved',
        'pending',
        'rejected'
      ],
      activeFilter: 'todos'
    }
  },
  async created () {
    await this.loadTable()
  },
  computed: {
    formatedCredits () {
      return this.items.map(c => ({
        ...c,
        name: `${c.name} ${c.last_name}`,
        amounts: c.amounts && `$${parseFloat(c.amounts).toFixed(2)} `,
        createdAt: formatDate(c.createdAt),
        updatedAt: formatDate(c.updatedAt)
      }))
    },
    credits () {
      return this.activeFilter === 'todos'
        ? this.formatedCredits
        : this.formatedCredits.filter(credit => credit.status === this.activeFilter)
    }
  },
  methods: {
    ...mapActions({
      getCredits: 'credits/all',
      changeStatus: 'credits/changeStatus'
    }),
    async loadTable () {
      this.loading = true
      this.items = await this.getCredits()
      this.loading = false
    },
    async aprove (id) {
      try {
        await this.changeStatus({ status: 'approved', id })
        this.loadTable()
      } catch ({ message }) {
        console.log(message)
      }
    },
    async reject (id) {
      try {
        // await this.removeUser(id)
        await this.changeStatus({ status: 'rejected', id })
        this.loadTable()
      } catch ({ message }) {
        console.log(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
