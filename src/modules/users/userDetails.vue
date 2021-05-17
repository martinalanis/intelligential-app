<template>
  <div class="user">
    <div class="columns is-multiline">
      <div class="column is-4">
        <h3 class="user__name">
          {{ user.name }}
        </h3>
        <h5 class="user__email">
          {{ user.email }}
        </h5>
      </div>
      <div class="column user__role-status">
        <p class="user__role">
          <small>ROL:</small><br>
          <span class="role">{{ user.role }}</span>
        </p>
        <p>
          <span
            class="tag is-small"
            :class="{ 'is-primary': user.status, 'has-background-grey-lighter': !user.status }"
          >
            <span class="dot" :class="{ 'active': user.status }"></span>
            {{ user.status ? 'activo' : 'inactivo' }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  // background: #FFF;
  padding: 1rem;
  .column > * {
    line-height: 1.2;
  }
  &__name {
    font-size: 1.1rem;
    font-weight: 600;
  }
  &__email {
    font-size: 0.85rem;
  }
  &__role-status {
    display: flex;
    align-items: center;
  }
  &__role {
    min-width: 8rem;
    margin-right: 3rem;
    small {
      font-size: 0.8rem;
      letter-spacing: 0.15rem;
    }
    color: #646564;
    text-transform: capitalize;
  }
}
</style>
