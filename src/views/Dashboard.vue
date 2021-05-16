<template>
  <div>
    <section-title>
      BIENVENIDO
    </section-title>
    <div v-if="userRole === 'administrador'" class="columns is-multiline">
      <div class="column is-4">
        <statistic-card
          title="USUARIOS"
          type="info"
          :stats="userStats"
        >
          <template #actions>
            <div class="mt-1 has-text-right">
              <router-link :to="{ name: 'usuarios' }" class="button is-small is-text has-text-info">detalles</router-link>
            </div>
          </template>
        </statistic-card>
      </div>
      <div class="column is-4">
        <statistic-card
          title="SOLICITUDES"
          type="primary"
          :stats="creditStats"
        >
          <template #actions>
            <div class="mt-1 has-text-right">
              <router-link :to="{ name: 'solicitudes' }" class="button is-small is-text has-text-info">detalles</router-link>
            </div>
          </template>
        </statistic-card>
      </div>
    </div>
    <div v-else class="columns">
      <div class="column">
        <p class="mb-2">
          Bienvenido a Intelligential App, a través de ésta plataforma podrás solicitar tu crédito.
        </p>
        <p>
          <router-link :to="{ name: 'nuevoCredito' }">Solicitar credito</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import StatisticCard from '../components/ui/statisticCard'
export default {
  name: 'Dashboard',
  components: {
    StatisticCard
  },
  data () {
    return {
      userStats: [],
      creditStats: []
    }
  },
  computed: {
    ...mapGetters({
      userRole: 'auth/userRole'
    })
  },
  async created () {
    this.userStats = await this.userStatistics()
    this.creditStats = await this.creditStatistics()
  },
  methods: {
    ...mapActions({
      userStatistics: 'users/getStatistics',
      creditStatistics: 'credits/getStatistics'
    })
  }
}
</script>
