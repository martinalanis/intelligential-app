<template>
  <aside class="menu">
    <header class="menu__header">
      <img
        src="@/assets/user.png"
        alt="user"
        class="menu__header-image"
      >
      <div class="menu__header-info">
        <h3 class="name">
          {{ user.name }}
        </h3>
        <p class="role">
          {{ user.role }}
        </p>
      </div>
    </header>
    <div class="menu__content px-2">
      <ul class="menu-list">
        <li
          v-for="({ to, icon, name }, i) in links"
          :key="i"
        >
          <router-link
            class="py-3"
            :to="to"
            :class="{ 'active has-background-primary': $route.name === name.toLowerCase() }"
          >
            <fa-icon :icon="icon" class="mr-5" />
            {{ name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="menu__footer">
      <button
        class="button is-small is-fullwidth is-info is-outlined"
        @click="closeSession"
      >
        <span>
          CERRAR SESIÓN
        </span>
        <span class="icon">
          <fa-icon icon="sign-out-alt" class="ml-3"></fa-icon>
        </span>
      </button>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'NavigationDrawer',
  data () {
    return {
      links: [
        {
          to: '/',
          icon: 'columns',
          name: 'Dashboard'
        },
        {
          to: '/usuarios',
          icon: 'user',
          name: 'Usuarios'
        },
        {
          to: '/solicitudes',
          icon: 'columns',
          name: 'Solicitudes'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    closeSession () {
      this.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  background: #FFF;
  top: 0;
  left: -$drawer-width;
  width: $drawer-width;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow;
  @media screen and ($media-desktop) {
    transform: translateX($drawer-width);
  }
  &__header {
    padding: 1rem;
    display: flex;
    align-items: center;
    // margin-bottom: 1.5rem;
    background: $blue-darken;
    &-image {
      width: 40px;
      margin-right: 1rem;
    }
    &-info {
      line-height: 1.2;
      .name {
        font-size: 1.1rem;
        font-weight: 600;
        color: #FFF;
      }
      .role {
        color: #e2e2e2;
        font-size: 0.85rem;
        text-transform: capitalize;
      }
    }
  }
  &__content {
    flex: 1;
    padding-top: 1.5rem;
    background: #FFF;
    a {
      color: #545657;
      font-weight: 500;
      font-size: 1rem;
      // padding-left: 1rem;
      // padding-right: 1rem;
      &.active {
        color: #ffffff;
        // background: lighten(purple, 15%);
      }
    }
  }
}
</style>
