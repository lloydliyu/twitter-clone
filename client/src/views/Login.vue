<template>
  <v-layout column align-center>
    <v-form
      v-if="!isAuthenticatePending"
      v-model="valid"
      @submit.prevent="login">
      <v-text-field
        v-model="user.username"
        :rules="notEmptyRules"
        label="Username"
        required
      ></v-text-field>
      <v-layout class="text-xs-center">
      <v-text-field
        v-model="user.password"
        type="password"
        :rules="notEmptyRules"
        label="Password"
        required
      ></v-text-field>
      <v-btn type="submit" :disabled="!valid">
        <span>Login</span>
      </v-btn>
    </v-layout>
    </v-form>
    <v-progress-circular
      v-if="isAuthenticatePending"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'login',
  data: () => ({
    valid: false,
    user: {
      username: '',
      password: '',
    },
    notEmptyRules: [value => !!value || "This value can't be blank"],
  }),
  computed: {
    ...mapState('auth', { isAuthenticatePending: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    login() {
      if (this.valid) {
        this.authenticate({
          strategy: 'local',
          ...this.user,
        }).then(() => {
          this.$router.push('/post');
        }).catch(() => {
          this.$router.push('/login');
        });
      }
    },
  },
};
</script>
