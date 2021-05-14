<template>
  <div>
    <section-title>
      CRÉDITOS
    </section-title>
    <div class="columns">
      <div class="column">
        <router-link
          class="button is-small is-info"
          :to="{ name: 'nuevoCredito' }"
        >
          <span class="icon mr-1">
            <fa-icon icon="plus"></fa-icon>
          </span>
          <span>
            SOLICITAR CRÉDITO
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Creditos'
}
</script>

<style lang="scss" scoped>

</style>
