/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint-disable no-param-reassign */
import axios from '@/axios';

const state = {
  username: '',
  email: '',
};

const getters = {
  username: state => state.username,
  email: state => state.email,
};

const mutations = {
  SET_USERNAME(state, username) {
    state.username = username;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  RESET_USER_STATE(state) {
    state.username = '';
    state.email = '';
  },
};

const actions = {
  async getUserInfo({ commit }) {
    const { data } = await axios.get('/me');
    commit('SET_USERNAME', data.user.username);
    commit('SET_EMAIL', data.user.email);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
