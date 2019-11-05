import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

// pathと対応するcomponentを格納したmap
const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/home', component: 'Home', meta: { requiresAuth: true } }, // 認証済みのユーザーしかアクセスできないよう設定
  { path: '/signup', component: 'Signup' },
  { path: '/signin', component: 'Signin' },
  { path: '*', component: 'NotFound' }
]

// 初期ロードの負荷を抑えるためにWebpackのCode Splittingを用いたDynamic Importを使い、routeに応じたコンポーネントをインポートする
// 参照 => https://qiita.com/seya/items/06b160adb7801ae9e66f
// 
// ex. 下記と同様の処理を行っている
// routes: [
//   {
//     path: '/',
//     component: () => import('./views/Landing.vue')
//   }
// ]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`./views/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  moed: 'history',
  routes
})

// beforeEach => 全てのルートの遷移前、コンポーネントガードの解決前に処理をかける
router.beforeEach((to, from, next) => {
  // some()メソッド => 配列(to.matched)の中から真になる要素を返す
  // to => アクセスするURLに合致するルートレコード(routerOptionsの配列内のオブジェクトのコピー)
  // 画面の遷移先が「meta」情報の「requiresAuth」の値を格納
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/signin')// /signinにリダイレクトをする
  } else {
    next()
  }
})

export default router
