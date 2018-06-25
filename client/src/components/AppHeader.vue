<template>
  <nav class="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'dashboard' }" class="navbar-item">
        <span class="icon">
          <b-icon icon="playlist-check"></b-icon>
        </span>
        <span class="is-size-4">Fancy Todo</span>
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <button class="button is-primary">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style lang="scss">

</style>
