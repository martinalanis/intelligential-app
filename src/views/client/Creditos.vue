<template>
  <div>
    <section-title>
      CRÉDITOS
    </section-title>
    <div class="columns">
      <div class="column">
        <button
          class="button is-small is-info br-c"
          @click="$router.push({ name: 'nuevoCredito' })"
        >
          <span class="icon mr-1">
            <fa-icon icon="plus"></fa-icon>
          </span>
          <span>
            SOLICITAR CRÉDITO
          </span>
        </button>
      </div>
    </div>
    <credits-grid />
  </div>
</template>

<script>
import CreditsGrid from '@/modules/credits/creditsGrid'
export default {
  name: 'Creditos',
  components: {
    CreditsGrid
  }
}
</script>

<style lang="scss" scoped>

</style>
