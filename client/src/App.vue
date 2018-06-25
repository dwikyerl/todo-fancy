<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view class=""></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
body {
  padding-top: 3.25rem;
};
</style>
