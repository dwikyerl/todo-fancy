<template>
   <b-collapse class="card" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title is-flex todo-item__header">
            <span>
              <b-icon icon="equal-box" size="is-small"></b-icon>
              <span
                class="todo-item__text"
                :class="{'is-completed': todo.completed }"
              >{{ todo.content }}</span>
            </span>
            <span class="subtitle is-size-6">Deadline {{ relativeDeadlineDate }}</span>
        </p>
        <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-up' : 'menu-down'">
            </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <p>
            <strong>Deadline date: </strong>
            <span>{{ completeDeadlineDate }}</span>
          </p>
        </div>
      </div>
      <footer class="card-footer">
          <a class="card-footer-item" @click.prevent="submitCompleteTodo">
            <b-icon
              :icon="todo.completed ? 'emoticon-sad' : 'emoticon'"
            ></b-icon>
            {{ todo.completed ? 'Uncomplete' : 'Complete' }}
          </a>
          <a class="card-footer-item">
            <b-icon icon="pencil"></b-icon>
            Edit
          </a>
          <a class="card-footer-item" @click.prevent="() => deleteTodo(todo._id)">
            <b-icon icon="delete"></b-icon>
            Delete
          </a>
      </footer>
  </b-collapse>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import { mapActions } from 'vuex';

export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    completeDeadlineDate() {
      return moment(this.todo.deadline).format('dddd, MMMM Do YYYY');
    },
    relativeDeadlineDate() {
      return moment(this.todo.deadline).fromNow();
    },
  },
  methods: {
    ...mapActions(['deleteTodo', 'completeTodo']),
    submitCompleteTodo() {
      const todoData = {
        todoId: this.todo._id,
        completed: !this.todo.completed,
      };
      this.completeTodo(todoData);
    },
  },
};
</script>

<style lang="scss">
.todo-item__text {
  margin-left: .5rem;
  margin-right: 1rem;
}
.is-completed {
  text-decoration: line-through;
  color: #ccc;
}
.todo-item__header {
  justify-content: space-between;
}
</style>

