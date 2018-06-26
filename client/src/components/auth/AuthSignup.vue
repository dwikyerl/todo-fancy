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
          <b-input placeholder="Username" v-model="userData.username"></b-input>
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    signUp() {
      const vm = this;
      this.status = 'is-loading';
      axios.post('http://localhost:3000/api/signup', this.userData)
        .then((result) => {
          if (result.status === 200) {
            this.status = '';
            vm.$router.push({ name: 'signin' });
          }
        })
        .catch(err => console.log(err.response));
    },
  },
};
</script>

<style lang="scss">
.back {
  margin-right: .5rem;
}
</style>

