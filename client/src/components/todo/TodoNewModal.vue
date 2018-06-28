<template>
  <div class="modal" :class="{'is-active': isAddModalOpened}">
    <div class="modal-background" @click="closeAddModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Todo</p>
        <button class="delete" aria-label="close" @click="closeAddModal"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="submitTodo">

          <div class="field">
            <div class="field">
              <label class="label">Content</label>
              <div class="control">
                <input
                class="input is-large"
                type="text" value=""
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
        >Add Todo</button>
        <button class="button" type="cancel" @click="closeAddModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TodoNewModal',
  data() {
    return {
      content: this.todo ? this.todo.content : '',
      date: new Date(),
    };
  },
  computed: {
    ...mapGetters(['isAddModalOpened']),
    yesterdayDate() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    },
  },
  methods: {
    ...mapActions(['closeAddModal', 'addNewTodo']),
    submitTodo() {
      this.addNewTodo({
        content: this.content,
        deadline: this.date,
      });
      this.content = '';
      this.date = new Date();
      this.closeAddModal();
    },
  },
};
</script>

