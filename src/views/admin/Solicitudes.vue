<template>
  <div>
    <section-title>
      SOLICITUDES
    </section-title>
    <div class="columns">
      <div class="column is-12">
        <credits-table />
      </div>
    </div>
  </div>
</template>

<script>
import CreditsTable from '@/modules/credits/creditsTable'
export default {
  name: 'Usuarios',
  components: {
    CreditsTable
  }
}
</script>
