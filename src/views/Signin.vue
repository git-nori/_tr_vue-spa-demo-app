<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center mt-5">
        <h1>Sing in</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" class="text-center offset-sm3 mt-3">
        <v-form>
          <v-text-field
            name="email"
            label="E-mail"
            type="email"
            id="email"
            required
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            name="password"
            label="password"
            type="password"
            id="password"
            required
            :rules="passwordRules"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" class="text-center mt-5">
        <v-btn color="primary" text>SIGN IN</v-btn>
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
      confirmPasswordRules: [v => !!v || "password is required"]
    };
  }
};
</script>