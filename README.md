# vue-checkout-npm

> vue2.0简易购物车和地址选配功能

## 创建

```javascript
> vue init webpack-simple vue-checkout

> cnpm install

> npm run dev

> cnpm install style-loader css-loader --save-dev   // 样式加载
        --> webpack.config.js     配置
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                }
> cnpm install vue-router --save    // 引入路由
        --> main.js   import VueRouter from 'vue-router'
                      vue.use(VueRouter)
                      
> cnpm install vue-resource --save                       
        --> main.js   import VueResource from 'vue-resource'
                      Vue.use(VueResource)

```
## 运行

```javascript
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
>  vue-router 路由配置

```javascript
main.js

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入组件
import cart from './components/cart.vue'
import address from './components/address.vue'

//配置路由
const routes=[
    {path:'/cart', component:cart},
    {path:'/adress', component:address},
    {path:'*', redirect:'/cart'}
];

//生成路由实例
const router=new VueRouter({
    routes    // （缩写）相当于 routes: routes
});

// 路由挂载到vue上
new Vue({
  router  
})

```

```javascript
App.vue

<router-view></router-view>

import cart from './components/cart.vue'
import address from './components/address.vue'

// 注册组件
coponents: {
    cart,
    address
}

```
>  vue-resource获取json数组

```javascript
说明：
-> resource插件返回的不是直接的数据  
-> cartView:function(){     // ES5
        var _this = this;   
        // 在vue实例里面，所有的this都指向是vm的实例，但是在某个函数作用域内部，他的作用域已经发生了变化，所有不能直接使用this
        this.$http.get("data/cart.json",{"id":123}).then(function( res ){ 
            _this.productList = res.body.result.productList;
        });
    }
    cartView:function(){  // ES6
        // ES6的写法，作用域已经指向了外层，this可以直接用了，不再是函数方法内部的this
        this.$http.get("data/cart.json",{"id":123}).then(res=>{
            this.productList = res.body.result.productList;
        });
    }


# code:

data() {
	return {
    	productList:[]  // 产品数组
	}
},
mounted:function(){    //DOM编译之后执行,代替vue1.0的ready:function(){}
    // 异步
    this.$nextTick(function(){
        this.cartView();
    });
},
methods:{
	cartView() {   // vue-resource插件获取json产品数据
		this.$http.get('http://localhost:8080/src/data/cart.json', {"id":123}).then((res) => {
			this.productList = res.body.result.productList;
			console.log(this.productList)
		});
	}
}	


```


















