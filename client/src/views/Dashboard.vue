<template>
  <div>
    <div class="tabs is-centered is-toggle is-fullwidth">
      <ul>
        <li
          v-for="(listMode, index) in modes"
          :class="{ 'is-active': mode === listMode.type }"
          :key="index"
          @click="mode = listMode.type"
        >
          <a>{{ listMode.name }}</a>
        </li>
      </ul>
    </div>
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <TodoList :mode="mode"></TodoList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoList from './../components/todo/TodoList.vue';

export default {
  name: 'Dashboard',
  data() {
    return {
      mode: 'all',
      modes: [
        {
          type: 'all',
          name: 'All Tasks',
        },
        {
          type: 'today',
          name: 'Today',
        },
        {
          type: 'tommorow',
          name: 'Tommorow',
        },
        {
          type: 'overdue',
          name: 'Overdue',
        },
        {
          type: 'completed',
          name: 'Completed',
        },
      ],
    };
  },
  components: {
    TodoList,
  },
};
</script>


<style lang="scss">
</style>

