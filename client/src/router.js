import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue';
import AuthSignin from './components/auth/AuthSignin.vue';
import AuthSignup from './components/auth/AuthSignup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
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
    },
  ],
  linkExactActiveClass: 'is-active',
});
