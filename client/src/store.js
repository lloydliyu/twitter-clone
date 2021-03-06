import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathers-client';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(FeathersVuex);
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    service('users', {
      instanceDefaults: {
        username: '',
        password: '',
        displayName: '',
        imageUrl: '',
      },
    }),
    service('posts', {
      instanceDefaults: {
        body: '',
        imageUrl: '',
      },
    }),
    service('likes', {
      instanceDefaults: {
        post: '',
        user: '',
      },
    }),
    auth({ userService: 'users' }),
  ],
});
