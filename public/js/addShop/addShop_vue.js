$(function(){

    new Vue({
        el: '.shop-page',
        data: {
            sum: 0,
            num: 0,
            shopSingle: [],
            shopList: [],
            shopAll: [],
            price: 0,
            shopTotal: 0
        },
        methods: {
            //商品更多进入购物车
            toShop(index){
                if(index == 0){
                    for(let item of  $('.single-body')){
                        $(item).click(function(){
                            let id = $(this).children().eq(0).html();
                            sessionStorage.setItem('id', id);
                        })
                    }
                }
            },
            //进入确定商品页面
            goSettle(){
                $('.panel-body').addClass('shop-hide');
                $('.settle-shop').removeClass('shop-hide');
                $('.cart-total').removeClass('shop-hide');
            },
            //增减商品
            changeShop(item, index){
                if(index) {
                    item.value ++;
                }else{
                    item.value --;
                    if(item.value < 1){
                        item.value = 1;
                    }
                }
                this.total();
                this.$http.post('/changeShop', {
                    id: item.id,
                    value: item.value
                }).then((res)=>{});
                this.$http.post('/changeCart', {
                    id: item.id,
                    value: item.value
                }).then((res)=>{});
            },
            //是否选中商品
            check(item,index){
                if(item.checked == undefined){
                    this.$set(item, 'checked', true);
                }else{
                    item.checked = !item.checked;
                }
                if(item.checked){
                    $('.sel-ico').eq(index).addClass('icon-check-box_fill');
                    this.num ++;
                }else{
                    $('.sel-ico').eq(index).removeClass('icon-check-box_fill');
                    this.num --;
                }
                this.total();
            },
            total(){
                this.shopTotal = 0;
                this.shopAll.forEach((item, index)=>{
                    if(item.checked){
                        this.shopTotal += item.price * item.value;
                    }
                });
                if(this.sum / this.num == 1){
                    $('.all').addClass('icon-check-box_fill');
                }else{
                    $('.all').removeClass('icon-check-box_fill');
                }
            },
            checkAll(){
                this.shopTotal = 0;
                this.shopAll.forEach((item)=>{
                    if(typeof item.checked == 'undefined'){
                        this.$set(item, 'checked', true);
                    }else{
                        item.checked = true;
                    }
                    if(item.checked){
                        this.num = this.sum;
                        $('.ico').addClass('icon-check-box_fill');
                        this.shopTotal += item.price * item.value;
                    }
                });
            },
            callAll(){
                $('.ico').removeClass('icon-check-box_fill');
                this.shopAll.forEach((item)=>{
                    if(typeof item.checked == 'undefined'){
                        this.$set(item, 'checked', false);
                    }else{
                        item.checked = false;
                    }
                });
                this.num = 0;
                this.shopTotal = 0;
            },
            //商品进入商品详情页
            toShopCart(index, id){
                sessionStorage.setItem('id', id);
            },
            removeShop(index,id){
               const trList = $(".shop-tr");
               let userId = sessionStorage.getItem('userID');
               for( let item of trList){
                    if($(item).attr('_id') == id){
                        $(item).remove();
                        this.sum --;
                    }
               }
                this.$http.get('/removeShop?id=' + id + '&userId=' + userId).then(function(res){});
            },
            toPay(){
                let num = 0, sum = 0;
                let userId = sessionStorage.getItem('userID');
                this.shopAll.forEach((item, index)=>{
                    sum = index + 1;
                    item.userId = userId;
                    if(item.checked){
                        this.$http.post('/saveOrder',item).then((res)=>{
                            window.location.href = '/goPay';
                        });
                    }else{
                        num ++;
                    }
                });
                if(num == sum){
                    alert('请选择商品');
                }
            }
        },
        created(){
            //获取添加到购物车的全部商品
            let userId = sessionStorage.getItem('userID');
            this.$http.get('/shopAll?id=' + userId).then((res)=>{
                this.shopAll = res.data;
                this.shopAll.forEach((item, index)=>{
                    this.sum = index + 1;
                })
            });
            //判断是否登录
            this.$http.get('/addShopCart').then((res)=>{});
        },
        mounted(){
            this.$http.get('/getShopData').then((res)=>{
                this.shopList = res.data;
            });

            //自动匹配商品
            let id = sessionStorage.getItem('id');
            this.$http.post('/storeShop', {id: id}).then((res)=>{
                this.shopSingle = res.data[0];
            });

            //总价
        },
        filters: {
            filPrice(value){
                return value + '.00元';
            }
        }
    })
});
