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
        <p class="email">
          {{ user.email }}
        </p>
      </div>
    </header>
    <div class="menu__content">
      <ul class="menu-list">
        <li
          v-for="({ to, icon, name }, i) in links"
          :key="i"
        >
          <router-link
            class="py-3"
            :to="to"
            :class="{ 'active': $route.name === name.toLowerCase() }"
          >
            <fa-icon :icon="icon" class="mr-4" />
            {{ name }}
          </router-link>
        </li>
      </ul>
      <!-- <p class="menu-label">
        Administration
      </p> -->
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
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important;
  @media screen and ($media-desktop) {
    transform: translateX($drawer-width);
  }
  &__header {
    padding: 1rem;
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    background: #01579b;
    &-image {
      width: 40px;
      margin-right: 1rem;
    }
    &-info {
      line-height: 1.2;
      .name {
        font-size: 1.1rem;
        font-weight: 600;
        color: #f2f2f2;
      }
      .email {
        color: #FFFFFF90;
        font-size: 0.9rem;
      }
    }
  }
  &__content {
    flex: 1;
  }
  .active {
    background: #f2f2f2;
    font-weight: 600;
  }
}
</style>
