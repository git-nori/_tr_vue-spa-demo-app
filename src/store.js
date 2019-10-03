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
  getters: {
    // userが認証済みか判定し、結果をbooleanで返す
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
  ,
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
          commit('setError', null)
          router.push('/home') // home画面にリダイレクトするよう設定
        }).catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSingIn ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { emial: firebaseUser.user.email })
          commit('setLoading', false)
          commit('setError', null)
          router.push('/home')
        }).catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', payload.email)
    },
    userSignOut ({ commit }) {
      firebase.auth().signOut().then(() => {
        commit('setUser', null)
        router.push('/')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
})
