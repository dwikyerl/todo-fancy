/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint-disable no-param-reassign */

const state = {
  token: window.localStorage.getItem('token'),
};

const getters = {
  isLoggedIn: state => state.token !== null,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
};

const actions = {
  logout({ commit }) {
    commit('SET_TOKEN', null);
    window.localStorage.removeItem('token');
  },
  login() {
    
  },
  fbLogin() {

  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
