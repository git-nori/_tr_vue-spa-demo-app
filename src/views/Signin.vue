<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center mt-5">
        <h1>Sing in</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" class="text-center offset-sm3 mt-3">
        <v-form @submit.prevent="userSignIn">
          <v-alert type="error" dismissible v-model="alert">{{ error }}</v-alert>
          <v-text-field
            name="email"
            label="E-mail"
            type="email"
            id="email"
            required
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            name="password"
            label="password"
            type="password"
            id="password"
            required
            v-model="password"
            :rules="passwordRules"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" class="text-center mt-5">
        <v-btn color="primary" text @click="userSignIn" :disabled="loading">SIGN IN</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "password is required"],
      confirmPasswordRules: [v => !!v || "password is required"],
      email: "",
      password: "",
      alert: false
    };
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    userSignIn() {
      let userData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("userSingIn", userData);
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    alert(value) {
      if (!value) {
        this.$store.commit("setError", null);
      }
    }
  }
};
</script>