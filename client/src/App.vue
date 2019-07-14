<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Twitter Clone</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn :to="{ name: 'login' }" flat><span>Login</span></v-btn>
        <v-btn :to="{ name: 'signup' }" flat><span>Sign Up</span></v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="user">
        <v-layout justify-content align-center v-if="user.user">
          <v-avatar color="grey darken-3" v-if="user.user.imageUrl">
            <img
              class="elevation-6"
              :src="user.user.imageUrl"
            />
          </v-avatar>
          <v-avatar v-if="!user.user.imageUrl" color="red" size=40>
            <span class="white--text headline">{{ user.user.displayName[0].toUpperCase() }}</span>
          </v-avatar>
        </v-layout>
        <v-btn flat @click="logout"><span>Logout</span></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    
    <v-footer app>
      <span>&copy; Made by Lloyd 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout().then(() => this.$router.push('/login'));
    },
  },
};
</script>
