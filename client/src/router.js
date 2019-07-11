import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignUp from './views/SignUp.vue';
import Login from './views/Login.vue';
import Post from './views/Post.vue';

import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate').then(() => {
          next('/post');
        }).catch(() => {
          next('/login');
        });
      },
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate').then(() => {
          next();
        }).catch(() => {
          next('/login');
        });
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
  ],
});
