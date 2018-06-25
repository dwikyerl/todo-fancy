<template>
  <div class="column is-6-tablet is-5-desktop is-4-widescreen">
    <form class="box">

      <div class="field">
        <a @click.prevent="goBack">
          <span class="back icon">
            <b-icon icon="arrow-left"></b-icon>
          </span>
        </a>
        <span class="is-size-4">Signup</span>
      </div>

      <b-field label="Username">
          <b-input placeholder="Username"></b-input>
      </b-field>

      <b-field label="Email">
        <b-input type="email"
            placeholder="e.g. john@mail.com">
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password"
            placeholder="Password"
        >
        </b-input>
      </b-field>

      <b-field label="Password Confirmation">
        <b-input type="password"
            placeholder="Password Confirmation"
        >
        </b-input>
      </b-field>

      <div class="field">
        <button class="button is-link is-fullwidth is-hoverable">
          <b-icon icon="account-plus"></b-icon>
          <span>Signup</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.back {
  margin-right: .5rem;
}
</style>

