import Vue from 'vue'
import App from './App.vue'

import './assets/css/base2.css'
import './assets/css/checkout.css'
import './assets/css/modal.css'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import cart from './components/cart.vue'
import address from './components/address.vue'

//配置路由
const routes=[
    {path:'/cart', component:cart},
    {path:'/address', component:address},
    {path:'*', redirect:'/cart'}
];

//生成路由实例
const router=new VueRouter({
    routes    // （缩写）相当于 routes: routes
});


new Vue({
  el: '#app',
  render: h => h(App),
  router  // 路由挂载到vue上
})
