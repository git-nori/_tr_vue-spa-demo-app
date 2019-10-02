import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'My Awesom App',
    user: null, // 認証をしたユーザーオブジェクト
    error: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    userSignUp ({ commit }, payload) {
      commit('setLoading', true)
      // firebaseを用いてユーザーの新規作成
      // 新しく作成されたユーザーに関するデータを含むPromiseをfirebaseUserで受け取る
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email })
          commit('setLoading', false)
          router.push('/home') // home画面にリダイレクトするよう設定
        }).catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    }
  }
})
