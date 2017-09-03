new Vue({
    el:".container",
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed:{                    //数组里面过滤，显示前三个
        filterAddress: function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function(){      //resource获取json数据的方法
            var _this = this;
            this.$http.get('data/address.json').then(function(response){
                var res = response.data;
                if(res.status == "1"){
                    _this.addressList = res.result;
                }
            });
        },
        loadMore:function(){
                    //点击more显示全部 = HTML中@click="limitNum=addressList.length"
                    //注意：不可以 @click="limitNum=this.addressList.length",html中当前的作用域已经是this了
            this.limitNum = this.addressList.length;
        },
        setDefault:function(addressId){       //设置默认地址，，设置默认同时把之前的默认地址取消
            this.addressList.forEach(function(address,index){
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        }
    }
})
























