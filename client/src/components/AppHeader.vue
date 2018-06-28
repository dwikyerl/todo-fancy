<template>
  <nav class="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'dashboard' }" class="navbar-item">
        <span class="icon">
          <b-icon icon="playlist-check"></b-icon>
        </span>
        <span class="is-size-4">Fancy Todo</span>
      </router-link>

      <a @click="isBurgerActive = !isBurgerActive" v-if="isLoggedIn"
        role="button" class="navbar-burger" :class="{ 'is-active': isBurgerActive}"
        aria-label="menu" aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" v-if="isLoggedIn" :class="{ 'is-active': isBurgerActive}">
      <div class="navbar-end">
        <div class="navbar-item">
          <button @click="openAddModal" class="button is-primary">
            <b-icon icon="library-plus"></b-icon>
            <span>Add Todo</span>
          </button>
        </div>
        <hr class="navbar-divider">
        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link">
            {{ username }}
          </div>

          <div class="navbar-dropdown is-right">
            <a @click.prevent="submitSignOut" class="navbar-item">
              <div>
                <b-icon icon="logout" size="is-small"></b-icon>
                <span>Sign Out</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  data() {
    return {
      isBurgerActive: false,
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'username', 'email']),
  },
  methods: {
    ...mapActions(['signOut', 'getUserInfo', 'openAddModal']),
    submitSignOut() {
      this.isBurgerActive = false;
      this.signOut();
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style lang="scss">

</style>
