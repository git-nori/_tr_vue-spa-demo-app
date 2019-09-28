<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app></v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="sidebar = !sidebar" class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{ appTitle }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content></v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false
    };
  }
};
</script>
