<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="userSignOut">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="sidebar = !sidebar" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <div>
        <!-- style="cursor: pointer" => linkとしてクリックできるよう設定
        tag="span" => linkの表示をspanに設定-->
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-home</v-icon>
            </template>
            <span>Go to Landing</span>
          </v-tooltip>
        </router-link>
      </div>
      <v-toolbar-title class="headline text-uppercase">
        <span class="mx-3">{{ appTitle }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="(item, index) in menuItems" :key="index" :to="item.path">
          <v-icon left>{{ item.icon }}</v-icon>
          <span>{{ item.title }}</span>
        </v-btn>
        <v-btn text @click="userSignOut">
          <v-icon left>mdi-exit-to-app</v-icon>
          <span>SIGN OUT</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/home", icon: "mdi-home" },
        { title: "Sign Up", path: "/signup", icon: "mdi-account-plus" },
        { title: "Sign In", path: "/signin", icon: "mdi-account-key" }
      ]
    };
  },
  computed: {
    appTitle() {
      return this.$store.state.appTitle;
    }
  },
  methods: {
    userSignOut() {
      this.$store.dispatch("userSignOut");
    }
  }
};
</script>
