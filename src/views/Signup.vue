<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center mt-5">
        <h1>Sing up</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" class="text-center offset-sm3 mt-3">
        <!-- @submit.prevent => POSTリクエストの際にページのリロードを防ぐ -->
        <v-form @submit.prevent="userSignUp">
          <!-- dismissible => アラートに対して閉じるボタンが表示するよう設定 -->
          <v-alert type="error" dismissible v-model="alert">{{ error }}</v-alert>
          <v-text-field
            name="email"
            label="E-mail"
            type="email"
            id="email"
            required
            :rules="emailRules"
            v-model="email"
          ></v-text-field>
          <v-text-field
            name="password"
            label="password"
            type="password"
            id="password"
            required
            :rules="passwordRules"
            v-model="password"
          ></v-text-field>
          <v-text-field
            name="confirmPassword"
            label="confirmPassword"
            type="password"
            id="confirmPassword"
            required
            :rules="[comparePassword]"
            v-model="confirmPassword"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" class="text-center mt-5">
        <v-btn color="primary" text @click="userSignUp" :disabled="loading">SIGN UP</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "password is required"],
      alert: false
    };
  },
  computed: {
    // パスワードと確認用パスワードの合致判定
    comparePassword() {
      return this.password === this.confirmPassword
        ? true
        : "Passwords don't match";
    },
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    userSignUp() {
      if (this.comparePassword !== true) {
        return;
      }

      let userData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("userSignUp", userData); // actionsのuserSignUpを呼び出す
    }
  },
  watch: {
    // エラーが存在する場合、alertにtrueを格納
    // 引数のvalueには、errorの値(エラーメッセージ)が格納されている
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    // alertがfalseの場合stateのerrorにnullを格納
    // 引数のvalueには、alertの値(true/false)が格納されている
    alert(value) {
      if (!value) {
        this.$store.commit("setError", null); // mutationsのsetErrorに対してcommitをし、stateのerrorにnullを格納
      }
    }
  }
};
</script>