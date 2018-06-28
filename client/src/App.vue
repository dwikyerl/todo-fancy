<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view class=""></router-view>
    <TodoNewModal></TodoNewModal>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import TodoNewModal from './components/todo/TodoNewModal.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    TodoNewModal,
  },
};
</script>

<style lang="scss">
body {
  padding-top: 3.5rem;
};
</style>
