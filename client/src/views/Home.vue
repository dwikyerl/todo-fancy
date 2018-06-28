<template>
  <div class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthSignin from '../components/auth/AuthSignin.vue';

export default {
  name: 'Home',
  components: {
    AuthSignin,
  },
};
</script>

<style lang="scss">
</style>
