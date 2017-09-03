var vm = new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        delFlag:false,
        curProduct:''
    },
    filters:{
        formatMoney:function(value){
            return "￥ "+value.toFixed(2);
        }
    },
    mounted:function(){   //vue1.0的ready:function(){}
        this.$nextTick(function(){
            this.cartView();
        });
    },
    methods:{
        cartView:function(){
            var _this = this;   //在vue实例里面，所有的this都指向是vm的实例，但是在某个函数作用域内部，他的作用域已经发生了变化，所有不能直接使用this
            this.$http.get("data/cart.json",{"id":123}).then(function( res ){       //vue-resource插件获取json数据
                _this.productList = res.body.result.productList;
            });
        },
        // cartView:function(){
        //     this.$http.get("data/cart.json",{"id":123}).then(res=>{//ES6的写法，作用域已经指向了外层，this可以直接用了，不再是函数方法内部的this
        //         this.productList = res.body.result.productList;
        //     });
        // },
        changeMoney:function(product,way){     //商品数量加减方法
            if(way>0){
                product.productQuentity++;
            }else{
                product.productQuentity--;
                if(product.productQuentity<1){
                    product.productQuentity=1;
                }
            }
            this.calcTotalPrice()
        },
        selectedProduct:function(item){       //json里面没有checked这个变量,所以方法添加*********
            if(typeof item.checked == "undefined"){
                //Vue.set(item,'checked',true);
                this.$set(item,'checked',true);   //局部
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll:function(flag){        //全选，取消全选
            this.checkAllFlag = flag;
            var _this  = this;
            this.productList.forEach(function(item,index){
                if(typeof item.checked == "undefined"){
                    _this.$set(item,'checked', _this.checkAllFlag);   //局部
                }else{
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice:function(){      //总金额计算
            var _this = this;
            this.totalMoney = 0;  //防止累加
            this.productList.forEach(function(item,index){
                if(item.checked){
                    _this.totalMoney += item.productPrice*item.productQuentity;
                }
            })
        },
        delConfirm:function(item){
            this.delFlag = true;
            this.curProduct = item;    //curProduct存储要删除的是哪一个
        },
        delProduct:function(){    //点击Yes
            var index = this.productList.indexOf(this.curProduct);    //获取要删除的索引
            this.productList.splice(index,1);    //从当前索引开始删除，删除一个
            this.delFlag = false;
        }
    }
});
Vue.filter('money',function(value,type){   //全局过滤器
    return "￥ "+value.toFixed(2)+type;
})






















