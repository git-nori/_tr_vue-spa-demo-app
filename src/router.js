import Vue from 'vue'
import Router from 'vue-router'

// pathと対応するcomponentを格納したmap
const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/home', component: 'Home' },
  { path: '/signup', component: 'Signup' },
  { path: '/signin', component: 'Signin' },
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

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
