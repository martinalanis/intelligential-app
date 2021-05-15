<template>
  <div>
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
          <credit-card-details :credit="credit" />
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { formatDate } from '@/helpers'
import CreditCardDetails from '@/modules/credits/creditCardDetails'
export default {
  name: 'CreditsGrid',
  components: {
    CreditCardDetails
  },
  data () {
    return {
      items: [],
      loading: false,
      filters: [
        'todos',
        'accepted',
        'pending',
        'declined'
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
  },
  methods: {
    ...mapActions({
      getCredits: 'users/getCredits'
    }),
    async loadData () {
      this.loading = true
      this.items = await this.getCredits()
      this.loading = false
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
