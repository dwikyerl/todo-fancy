/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint-disable no-param-reassign */
import firebase from 'firebase/app';
import axios from 'axios';
import 'firebase/auth';
import firebaseApp from './../../firebase';

const state = {
  token: window.localStorage.getItem('token') || null,
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
  async signIn({ commit }, user) {
    try {
      const { data } = await axios.post('http://localhost:3000/api/signin', user);
      commit('SET_TOKEN', data.token);
      window.localStorage.setItem('token', data.token);
    } catch (e) {
      console.log(e.response);
    }
  },
  async fbSignin({ commit }, accessToken) {
    try {
      const { data } = await axios.post('http://localhost:3000/api/fbSignin', { accessToken });
      commit('SET_TOKEN', data.token);
      window.localStorage.setItem('token', data.token);
    } catch (e) {
      console.log(e.response);
    }
  },
  authenticateFb({ dispatch }) {
    const authProvider = new firebase.auth.FacebookAuthProvider();
    authProvider.addScope('email');
    firebaseApp.auth().signInWithPopup(authProvider)
      .then((authData) => {
        dispatch('fbSignin', authData.credential.accessToken);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
