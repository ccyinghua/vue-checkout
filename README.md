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
- ### cart.vue 购物车
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

>  选中商品

```javascript
--> json里面没有checked这个属性,所以set方法添加;
--> this.$set(局部)/Vue.set(全局) 注册值 添加属性

selectedProduct:function(item){       
   if(typeof item.checked == "undefined"){
      //Vue.set(item,'checked',true);     // Vue.set也可以，但是本页面要import Vue...添加属性
        this.$set(item,'checked',true);   //局部
   }else{
       item.checked = !item.checked;
   }
   this.calcTotalPrice();
}

```
>  过滤器

```javascript
# 对金额格式化
//局部
<div class="item-price">{{item.productPrice | formatMoney}}</div>

filters:{
   formatMoney:function(value){
        return "￥ "+value.toFixed(2);  //两位小数
   }
}

//全局
Item total: <span class="total-price">{{totalMoney | money("元")}}</span>

import Vue from 'vue'
Vue.filter('money',function(value,type){
    return "￥ "+value.toFixed(2)+type;
})

```
- ### address.vue 地址选择页面
>  v-if

```html
> v-if 判断
> item的isDefault属性为 true 时，显示"默认地址"
> item的isDefault属性为 false 时，显示"设为默认"

<div class="addr-opration addr-default" v-if="item.isDefault">默认地址</div>

<div class="addr-opration addr-set-default" v-if="!item.isDefault">
     <a href="javascript:;" class="addr-set-default-btn" @click="setDefault(item.addressId)"><i>设为默认</i></a>
</div>

```
>  computed 计算属性(限制显示三个地址)

```javascript
// 本来是<li v-for="(item,index) in addressList">显示全部
<li v-for="(item,index) in filterAddress">    

data() {
    return {
        limitNum:3,   // 限制显示3条
        addressList: []   // 地址数组
    }
},
mounted() {
    this.$nextTick(() => {
        this.getAddressList()
    })
},
computed: {
    filterAddress() {    // 数组里面过滤，显示前三个
        return this.addressList.slice(0, this.limitNum)   // 返回一个新的数组
    }
},
methods: {
    getAddressList() {
        this.$http.get('http://localhost:8080/src/data/address.json').then((response) => {
            var res = response.data;
            if (res.status == "1") {
                this.addressList = res.result;
                console.log(this.addressList)
            }
        })
    }
}

```
>  点击类名切换

<html>
    <!--在这里插入内容-->
    <p style="font-size:13px;"># li标签 <span style="color:#E45944;">默认地址的索引值(currentIndex)==当前li的索引(index)</span>时，添加check类名</p>
    <p style="font-size:13px;"># li点击时，将当前li的index赋值给 currentIndex</p>
</html>

```javascript

<li v-for="(item,index) in filterAddress" v-bind:class="{'check':index==currentIndex}" @click="currentIndex=index">

data() {
    return {
        currentIndex: 0	// 默认选中地址索引
    }
},
methods: {
    setDefault(addressId) {   // 设置默认地址，设置默认同时把之前的默认地址取消
        this.addressList.forEach((address, index) => {
            if (address.addressId == addressId) {
                address.isDefault = true;
            } else {
                address.isDefault = false;
            }
        })
    }
}

```













