import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAPqmtJ_Nf5ipoCqXCD-vOxn96rwRfOAD4",
  authDomain: "fir-app-e8ff2.firebaseapp.com",
  databaseURL: "https://fir-app-e8ff2.firebaseio.com",
  projectId: "fir-app-e8ff2",
  storageBucket: "",
  messagingSenderId: "61582338246",
  appId: "1:61582338246:web:7dc7d4d5627dbfce2a0fc7",
  measurementId: "G-RBWSF2FL0G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
