<template>
  <v-layout column align-center>
    <v-form
      v-if="!isCreatePending"
      v-model="valid"
      @submit.prevent="signUp">
      <v-text-field
        v-model="user.username"
        :rules="notEmptyRules"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.displayName"
        :rules="notEmptyRules"
        :counter="20"
        label="Display Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.imageUrl"
        label="Image URL"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        type="password"
        :rules="notEmptyRules"
        label="Password"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.passwordConfirm"
        type="password"
        :rules="confirmPasswordRules"
        label="Password Confirmation"
        required
      ></v-text-field>
      <v-btn type="submit" :disabled="!valid">
        <span>Sign Up</span>
      </v-btn>
    </v-form>
    <v-progress-circular
      v-if="isCreatePending"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'signup',
  data: vm => ({
    valid: false,
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: '',
    },
    notEmptyRules: [value => !!value || "This value can't be blank"],
    confirmPasswordRules: [confirmPassword => confirmPassword === vm.user.password || 'Password must match'],
  }),
  computed: {
    ...mapState('users', { isCreatePending: 'isCreatePending' }),
  },
  methods: {
    signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        user.save()
          .then(() => {
            this.$router.push('/login');
          });
      }
    },
  },
};
</script>
