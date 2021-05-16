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
            @click="show(credit)"
          >
            ver
          </button>
          <button
            class="button is-small is-text has-text-success"
            @click="updateStatus('approved', credit)"
            :disabled="credit.status === 'approved'"
          >
            aprobar
          </button>
          <button
            class="button is-small is-text has-text-danger"
            @click="updateStatus('rejected', credit)"
            :disabled="credit.status === 'rejected'"
          >
            rechazar
          </button>
        </div>
      </div>
    </div>
    <message-dialog
      ref="dialog"
      size="400px"
    >
      <credit-details :credit="activeCreditToShow"/>
      <template #footer>
        <!-- <p>Aquí va alguna información de contacto</p> -->
        <div class="card-footer mt-4">
          <button
            v-if="activeCreditToShow && activeCreditToShow.status !== 'approved'"
            class="button is-fullwidth is-success"
            @click="updateStatus('approved', activeCreditToShow);$refs.dialog.close()"
            :disabled="activeCreditToShow && activeCreditToShow.status === 'approved'"
          >
            aprobar
          </button>
          <button
            v-if="activeCreditToShow && activeCreditToShow.status !== 'rejected'"
            class="button is-fullwidth is-danger"
            @click="updateStatus('rejected', activeCreditToShow);$refs.dialog.close()"
            :disabled="activeCreditToShow && activeCreditToShow.status === 'rejected'"
          >
            rechazar
          </button>
        </div>
      </template>
    </message-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { formatDate } from '@/helpers'
import CreditDetailSimple from './creditDetailSimple'
import CreditDetails from '@/modules/credits/creditDetails'
import MessageDialog from '@/components/ui/dialog'
export default {
  name: 'CreditsTable',
  components: {
    CreditDetailSimple,
    CreditDetails,
    MessageDialog
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
      activeFilter: 'todos',
      activeCreditToShow: {},
      loading: false
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
    async updateStatus (status, credit) {
      const id = credit?.id
      try {
        await this.changeStatus({ status, id })
        this.loadTable()
      } catch ({ message }) {
        console.log(message)
      }
    },
    show (credit) {
      this.activeCreditToShow = credit
      this.$refs.dialog.show()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
