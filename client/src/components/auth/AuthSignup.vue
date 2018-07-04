<template>
  <div class="column is-6-tablet is-5-desktop is-4-widescreen">
    <form class="box" @submit.prevent="signUp">

      <div class="field">
        <a @click.prevent="goBack">
          <span class="back icon">
            <b-icon icon="arrow-left"></b-icon>
          </span>
        </a>
        <span class="is-size-4">Signup</span>
      </div>

      <b-field label="Username">
          <b-input
          placeholder="Username"
          v-model="userData.username"
          minLength="6"></b-input>
      </b-field>

      <b-field label="Email">
        <b-input type="email"
          placeholder="e.g. john@mail.com"
          v-model="userData.email"
        >
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password"
            placeholder="Password"
            v-model="userData.password"
            minLength="6"
        >
        </b-input>
      </b-field>

      <b-field label="Password Confirmation">
        <b-input type="password"
            placeholder="Password Confirmation"
            v-model="userData['password-confirm']"
        >
        </b-input>
      </b-field>

      <div class="field">
        <button class="button is-link is-fullwidth is-hoverable" :class="status">
          <b-icon icon="account-plus"></b-icon>
          <span>Signup</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AuthSignup',
  data() {
    return {
      userData: {
        username: '',
        email: '',
        password: '',
        'password-confirm': '',
      },
      status: '',
    };
  },
  computed: {
    isAnyFieldEmpty() {
      const props = Object.keys(this.userData);
      const empty = props.some(data => this.userData[data].trim() === '');
      return empty;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    signUp() {
      if (this.isAnyFieldEmpty) {
        this.$toast.open({
          duration: 3000,
          message: 'Fields cannot be empty',
          type: 'is-danger',
        });
      } else {
        const vm = this;
        this.status = 'is-loading';
        axios.post('http://localhost:3000/api/signup', this.userData)
          .then((result) => {
            if (result.status === 200) {
              this.status = '';
              this.$toast.open({
                duration: 1000,
                message: result.data.message,
                type: 'is-info',
              });
              vm.$router.push({ name: 'signin' });
            }
          })
          .catch((err) => {
            if (err) {
              this.$toast.open({
                duration: 3000,
                message: 'Sign up failed',
                type: 'is-danger',
              });
              this.status = '';
            }
          });
      }
    },
  },
};
</script>

<style lang="scss">
.back {
  margin-right: .5rem;
}
</style>

