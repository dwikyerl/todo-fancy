<template>
  <div class="column is-6-tablet is-5-desktop is-4-widescreen">
    <form class="box">

      <div class="field has-text-centered">
        <span class="icon">
          <b-icon icon="playlist-check"></b-icon>
        </span>
        <span class="is-size-4">Fancy Todo</span>
      </div>

      <div class="field">
        <button class="button is-info is-fullwidth is-hoverable">
          <b-icon icon="facebook"></b-icon>
          <span>Sign In with Facebook</span>
        </button>
      </div>

      <div class="field has-text-centered">
        <p class="is-5">Or</p>
      </div>

      <b-field label="Username or Email">
          <b-input placeholder="Username or Email" v-model="user.loginData"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password"
            placeholder="Password"
            password-reveal
            v-model="user.password">
        </b-input>
      </b-field>

      <div class="field">
        <button class="button is-success is-fullwidth is-hoverable">
          <b-icon icon="login-variant"></b-icon>
          <span>Sign In</span>
        </button>
      </div>

      <div class="field has-text-centered">
        <span>Not registered yet ? </span>
        <router-link to="/signup">Signup</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        loginData: '',
        password: '',
      },
    };
  },
  methods: {

  },
};
</script>

