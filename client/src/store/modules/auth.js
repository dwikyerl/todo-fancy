/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint-disable no-param-reassign */
import firebase from 'firebase/app';
import axios from 'axios';
import 'firebase/auth';
import firebaseApp from './../../firebase';
import router from './../../router';

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
  signOut({ commit }) {
    commit('SET_TOKEN', null);
    window.localStorage.removeItem('token');
    router.push({ name: 'signin' });
  },
  async signIn({ commit, dispatch }, user) {
    try {
      const { data } = await axios.post('http://localhost:3000/api/signin', user);
      commit('SET_TOKEN', data.token);
      window.localStorage.setItem('token', data.token);
      dispatch('getUserInfo', null, { root: true });
      router.push({ name: 'dashboard' });
    } catch (e) {
      console.log(e.response);
    }
  },
  async fbSignin({ commit, dispatch }, accessToken) {
    try {
      const { data } = await axios.post('http://localhost:3000/api/fbSignin', { accessToken });
      commit('SET_TOKEN', data.token);
      window.localStorage.setItem('token', data.token);
      dispatch('getUserInfo', null, { root: true });
      router.push({ name: 'dashboard' });
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
