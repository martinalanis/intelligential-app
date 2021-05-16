<template>
  <div class="credit">
    <div class="credit__icon" :class="{ [`status-${credit.status}`]: true }">
      <fa-icon icon="file-alt" size="2x" />
    </div>
    <div class="credit__content">
      <a class="credit__see-details" @click.prevent="$emit('show', credit)">
        detalles <fa-icon icon="long-arrow-alt-right" />
      </a>
      <ul class="credit__list">
        <li>
          <strong>Nombre: </strong>
          {{ credit.name }}
        </li>
        <li>
          <strong>Ingresos: </strong>
          {{ credit.amounts }}
        </li>
        <li>
          <strong>Creada: </strong>
          {{ credit.createdAt }}
        </li>
      </ul>
      <span class="tag" :class="{ [`status-${credit.status}`]: true }">
        {{ credit.status }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditCardDetails',
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
  position: relative;
  padding-top: 2rem;
  height: 100%;
  &__icon {
    display: inline-block;
    padding: 0.85rem;
    color: #fafafa;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: $box-shadow;
    position: absolute;
    top: 0;
    left: 0.8rem;
    z-index: 1;
  }
  &__see-details {
    position: absolute;
    top: 0.5rem;
    right: 1.2rem;
    font-size: 0.9rem;
    color: $blue-darken;
  }
  &__content {
    position: relative;
    height: 100%;
    padding: 2.8rem 1.2rem 1.2rem;
    background: #FFF;
    box-shadow: $box-shadow;
    border-radius: $border-radius;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
    transition: all 0.2s ease;
    &:hover {
      box-shadow: 0 3px 8px -2px rgba(0,0,0,.2),0 2px 9px 0 rgba(0,0,0,.14),0 1px 11px 0 rgba(0,0,0,.12);;
    }
  }
  &__list {
    li {
      display: flex;
      strong {
        display: inline-block;
        width: 4.5rem;
      }
      padding: 0.3rem 0;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(0,0,0,0.15);
      }
    }
  }
}
</style>
