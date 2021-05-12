<template>
  <div id="app">
    <navigation-drawer />
    <div class="dashboard-wrapper">
      <div class="p-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NavigationDrawer from '@/components/layout/navigationDrawer'
export default {
  name: 'DefaultLayout',
  components: {
    NavigationDrawer
  },
  async created () {
    await this.getUser()
  },
  methods: {
    ...mapActions({
      getUser: 'auth/getUser'
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
  @media screen and ($media-desktop) {
    padding-left: $drawer-width;
  }
}
</style>
