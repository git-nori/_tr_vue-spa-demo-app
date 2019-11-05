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

// ユーザーがページをリロードするたびに、再度サインインする必要がないよう設定
// onAuthStateChangedオブザーバーはユーザーが既にサインインしていることを認識するとすぐにFirebaseユーザーに戻る
// オブザーバーをアタッチをし、ユーザーが正常にログインしていたらオブザーバーでユーザーに関する情報を取得する
const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: h => h(App),
      created () {
        if (firebaseUser) {
          store.dispatch('autoSignIn', firebaseUser)
        }
      }
    })
    unsubscribe()
  })