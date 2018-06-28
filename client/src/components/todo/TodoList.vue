<template>
  <div class="column is-8-tablet is-7-desktop is-6-widescreen">
    <div class="todo-list box">
      <div class="field">
        <p class="is-size-4">TodoList</p>
      </div>

      <div class="field">
        <div v-if="todos && todos.length > 0" class="columns vertical">
          <div class="column" v-for="todo in todos" :key="todo._id">
            <todo-item :todo="todo"></todo-item>
          </div>
        </div>
        <div class="section has-text-centered" v-else>
          <span class="is-size-5">
            You have no task in this section.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  computed: {
    ...mapGetters(['todos']),
  },
  props: {
    mode: String,
  },
  components: {
    TodoItem,
  },
  methods: {
    ...mapActions(['getAllTodos']),
  },
  created() {
    this.getAllTodos();
  },
};
</script>

<style lang="scss">
.vertical {
  flex-direction: column;
}

.todo-list {
  min-height: 40vh;
}
</style>

