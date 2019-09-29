<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center mt-5">
        <h1>Welcom to Awesome App</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" class="text-center offset-sm3 mt-3">
        <!-- blockquote => 引用・転載であることを表す -->
        <blockquote class="blockquote text-xs-center">
          It's a basic Single Page application
          <br />with Google Firebase authentication
        </blockquote>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" class="text-center offset-sm3 mt-3">
        <v-btn color="info" text to="/signup">Sign up</v-btn>
        <v-btn color="info" text to="/signin">Sign in</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>