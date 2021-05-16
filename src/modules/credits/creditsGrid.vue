<template>
  <div>
    <template v-if="!loadingInfo">
      <template v-if="items.length">
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
        <div class="columns is-multiline">
          <div
            v-for="(credit, i) in credits"
            :key="i"
            class="column is-4"
          >
            <credit-card-details :credit="credit" @show="show" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="columns">
          <div class="column">
            <div class="not-found-label">
              <p>Aún no haz solicitado créditos</p>
            </div>
          </div>
        </div>
      </template>
    </template>
    <message-dialog
      ref="dialog"
      size="400px"
    >
      <credit-details :credit="activeCreditToShow"/>
    </message-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { formatDate } from '@/helpers'
import CreditCardDetails from '@/modules/credits/creditCardDetails'
import CreditDetails from '@/modules/credits/creditDetails'
import MessageDialog from '@/components/ui/dialog'
export default {
  name: 'CreditsGrid',
  components: {
    CreditCardDetails,
    CreditDetails,
    MessageDialog
  },
  data () {
    return {
      items: [],
      loading: false,
      loadingInfo: true,
      activeCreditToShow: {},
      filters: [
        'todos',
        'approved',
        'pending',
        'rejected'
      ],
      activeFilter: 'todos'
    }
  },
  computed: {
    formatedCredits () {
      return this.items.map(c => ({
        ...c,
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
  async mounted () {
    await this.loadData()
    this.loadingInfo = false
  },
  methods: {
    ...mapActions({
      getCredits: 'credits/currentUserCredits'
    }),
    async loadData () {
      this.loading = true
      this.items = await this.getCredits()
      this.loading = false
    },
    show (credit) {
      this.activeCreditToShow = credit
      this.$refs.dialog.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found-label {
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  background: #fcfcfc;
  box-shadow: $box-shadow;
  border-radius: $border-radius;
  border-top: 5px solid #00d1b2;
}
</style>
