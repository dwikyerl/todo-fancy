<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view class=""></router-view>
    <todo-form-modal v-if="isTodoModalOpened"></todo-form-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from './components/AppHeader.vue';
import TodoFormModal from './components/todo/TodoFormModal.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    TodoFormModal,
  },
  computed: {
    ...mapGetters(['isTodoModalOpened']),
  },
};
</script>

<style lang="scss">
body {
  padding-top: 3.5rem;
};
</style>
