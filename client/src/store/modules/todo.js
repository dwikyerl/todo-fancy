/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import axios from 'axios';

const state = {
  todos: [],
  openAddModal: false,
};

const getters = {
  todos: state => state.todos,
  isAddModalOpened: state => state.openAddModal,
};

const mutations = {
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
  ADD_TODO(state, todo) {
    state.todos = [...state.todos, todo];
  },
  DELETE_TODO(state, todoId) {
    state.todos = state.todos.filter(todo => todo._id !== todoId);
  },
  UPDATE_TODO(state, updatedTodo) {
    state.todos = state.todos.map((todo) => {
      if (todo._id === updatedTodo._id) return updatedTodo;
      return todo;
    });
  },
  SHOW_MODAL(state) {
    state.openAddModal = true;
  },
  CLOSE_MODAL(state) {
    state.openAddModal = false;
  },
};

const actions = {
  async getAllTodos({ commit, rootState }) {
    const { token } = rootState.auth;
    const { data } = await axios.get('http://localhost:3000/api/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit('SET_TODOS', data.todos);
  },
  async addNewTodo({ commit, rootState }, newTodo) {
    const { token } = rootState.auth;
    const { data } = await axios.post('http://localhost:3000/api/todos', newTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit('ADD_TODO', data.todo);
  },
  async completeTodo({ commit, rootState }, { todoId, completed }) {
    const { token } = rootState.auth;
    const { data } = await axios.put(`http://localhost:3000/api/todos/${todoId}`, { completed }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit('UPDATE_TODO', data.todo);
  },
  async deleteTodo({ commit, rootState }, todoId) {
    const { token } = rootState.auth;
    const { data } = await axios.delete(`http://localhost:3000/api/todos/${todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit('DELETE_TODO', data.deletedTodo._id);
  },
  updateTodo() {},
  openAddModal({ commit }) {
    commit('SHOW_MODAL');
  },
  closeAddModal({ commit }) {
    commit('CLOSE_MODAL');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
