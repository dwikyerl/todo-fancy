<template>
  <div class="modal" :class="{'is-active': isTodoModalOpened}">
    <div class="modal-background" @click="closeTodoModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ currentTodo ? 'Edit' : 'Add'}} Todo</p>
        <button class="delete" aria-label="close" @click="closeTodoModal"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="submitTodo">

          <div class="field">
            <div class="field">
              <label class="label">Content</label>
              <div class="control">
                <input
                class="input is-large"
                type="text"
                placeholder="Todo Content"
                v-model="content"
                required>
              </div>
            </div>
          </div>

          <div class="field">
            <b-field label="Select a deadline date">
              <template>
                <b-datepicker v-model="date"
                    inline
                    :min-date="yesterdayDate">
                </b-datepicker>
              </template>
            </b-field>
          </div>

        </form>
      </section>
      <footer class="modal-card-foot">
        <button
          @click.prevent="submitTodo"
          class="button is-success"
          type="button"
        >{{ currentTodo ? 'Edit' : 'Add'}} Todo</button>
        <button class="button" type="cancel" @click="closeTodoModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TodoFormModal',
  data() {
    return {
      content: '',
      date: new Date(),
    };
  },
  computed: {
    ...mapGetters(['isTodoModalOpened', 'currentTodo']),
    yesterdayDate() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    },
  },
  methods: {
    ...mapActions(['closeTodoModal', 'addNewTodo', 'updateTodo']),
    submitTodo() {
      const todoData = {
        content: this.content,
        deadline: this.date,
      };
      if (this.currentTodo) {
        todoData.id = this.currentTodo._id;
        this.updateTodo(todoData);
      } else {
        this.addNewTodo(todoData);
      }
      this.content = '';
      this.date = new Date();
      this.closeTodoModal();
    },
  },
  created() {
    if (this.currentTodo) {
      this.content = this.currentTodo.content;
      this.date = new Date(this.currentTodo.deadline);
    }
  },
};
</script>

