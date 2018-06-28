/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */

import axios from 'axios';
import moment from 'moment';

const state = {
  todos: [],
  openTodoModal: false,
  mode: 'all',
  currentTodo: null,
};

const getters = {
  todos: (state, getters) => {
    const { mode } = getters;
    let returnedTodos;
    switch (mode) {
      case ('today'): {
        const today = moment();
        returnedTodos = state.todos.filter((todo) => {
          const deadline = moment(todo.deadline);
          const diff = deadline.endOf('day').diff(today, 'days');
          if (diff === 0 && !todo.completed) return true;
          return false;
        });
        break;
      }
      case ('tommorow'): {
        const today = moment();
        returnedTodos = state.todos.filter((todo) => {
          const deadline = moment(todo.deadline);
          const diff = deadline.endOf('day').diff(today, 'days');
          if (diff === 1 && !todo.completed) return true;
          return false;
        });
        break;
      }
      case ('overdue'): {
        const today = moment();
        returnedTodos = state.todos.filter((todo) => {
          const deadline = moment(todo.deadline);
          const diff = deadline.endOf('day').diff(today, 'days');
          if (diff < 0 && !todo.completed) return true;
          return false;
        });
        break;
      }
      case ('completed'): {
        returnedTodos = state.todos.filter(todo => todo.completed);
        break;
      }
      default: {
        returnedTodos = state.todos.filter(todo => !todo.completed);
      }
    }

    return returnedTodos;
  },
  isTodoModalOpened: state => state.openTodoModal,
  mode: state => state.mode,
  currentTodo: state => state.currentTodo,
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
    state.openTodoModal = true;
  },
  CLOSE_MODAL(state) {
    state.openTodoModal = false;
  },
  CHANGE_MODE(state, mode) {
    state.mode = mode;
  },
  RESET_TODO_STATE(state) {
    state.openTodoModal = false;
    state.todos = [];
    state.mode = 'all';
  },
  SET_CURRENT_TODO(state, todo) {
    state.currentTodo = todo;
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
  async updateTodo({ commit, rootState }, todoData) {
    const updatedData = {
      content: todoData.content,
      deadline: todoData.deadline,
    };

    const { token } = rootState.auth;
    const { data } = await axios.put(`http://localhost:3000/api/todos/${todoData.id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit('UPDATE_TODO', data.todo);
  },
  openTodoModal({ commit }) {
    commit('SHOW_MODAL');
  },
  closeTodoModal({ commit }) {
    commit('CLOSE_MODAL');
    commit('SET_CURRENT_TODO', null);
  },
  changeTodoFilterMode({ commit }, mode) {
    commit('CHANGE_MODE', mode);
  },
  setCurrentTodo({ commit }, todo) {
    commit('SET_CURRENT_TODO', todo);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
