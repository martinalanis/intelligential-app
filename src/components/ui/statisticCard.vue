<template>
  <article
    class="panel h-100"
    :class="{ [`is-${type}`]: true }"
  >
    <p class="panel-heading">
      {{ title }}
    </p>
    <div class="box h-100 is-flex is-flex-direction-column is-justify-content-space-between">
      <ul>
        <li
          v-for="({ item, value }, i) in stats"
          :key="i"
        >
          <span class="item">{{ item }}</span>
          <span class="value">{{ value }}</span>
        </li>
      </ul>
      <slot name="actions"></slot>
    </div>
  </article>
</template>

<script>
export default {
  name: 'StatisticCard',
  props: {
    title: {
      type: String,
      defaul: ''
    },
    type: {
      type: String,
      defaul: ''
    },
    stats: {
      type: Array,
      defaul: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  .item {
    display: inline-block;
    flex: 1;
    font-weight: 500;
    line-height: 1.2;
    margin-right: 1rem;
    padding-right: 0.5rem;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
    color: #656869;
  }
  .value {
    padding: 0 0.5rem;
  }
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0,0,0,0.15);
  }
}
</style>
