<template>
  <div class="credit">
    <div class="columns">
      <div class="column is-4">
        <h3 class="credit__name mb-1">
          {{ credit.name }}
        </h3>
        <div class="is-flex is-align-items-center">
          <small class="mr-1">Ingresos:</small>
          <span>
            {{ credit.amounts }}
          </span>
        </div>
        <div class="is-flex is-align-items-center mb-1">
          <small class="mr-1">Estatus:</small>
          <span class="tag" :class="{ [`status-${credit.status}`]: true }">
            {{ credit.status }}
          </span>
        </div>
      </div>
      <div class="column credit__status">
        <p class="credit__date">
          <small>Creado:</small>
          <span class="date">{{ credit.createdAt }}</span>
        </p>
        <p class="credit__date">
          <small>Ultima actualización:</small>
          <span class="date">{{ credit.updatedAt }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditDetailSimple',
  props: {
    credit: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.credit {
  padding: 1rem;
  .column > * {
    line-height: 1.2;
  }
  &__name {
    font-size: 1.1rem;
    font-weight: 600;
  }
  &__date {
    font-size: 0.85rem;
  }
  &__status {
    display: flex;
    align-items: flex-end;
  }
  &__date {
    min-width: 8rem;
    margin-right: 3rem;
    small {
      font-size: 0.75rem;
      letter-spacing: 0.05rem;
      color: $blue-darken;
      font-weight: 500;
      display: block;
      margin-bottom: 0.5rem;
    }
    color: #646564;
    text-transform: capitalize;
    .date {
      font-size: 1rem;
    }
  }
}
</style>
