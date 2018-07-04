import Vue from 'vue';
import Router from 'vue-router';
import AuthSignin from './components/auth/AuthSignin.vue';
import AuthSignup from './components/auth/AuthSignup.vue';

import store from './store/index';

const Home = (resolve) => {
  require.ensure(['./views/Home.vue'], () => {
    resolve(require('./views/Home.vue'));
  }, 'home');
};

const Dashboard = (resolve) => {
  require.ensure(['./views/Dashboard.vue'], () => {
    resolve(require('./views/Dashboard.vue'));
  }, 'dashboard');
};


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter(to, from, next) {
        if (!store.state.auth.token) {
          next();
        } else {
          next({ name: 'dashboard' });
        }
      },
      children: [
        {
          path: '',
          name: 'signin',
          component: AuthSignin,
        },
        {
          path: 'signup',
          name: 'signup',
          component: AuthSignup,
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        if (store.state.auth.token) {
          next();
        } else {
          next({ name: 'signin' });
        }
      },
    },
  ],
  linkExactActiveClass: 'is-active',
});
