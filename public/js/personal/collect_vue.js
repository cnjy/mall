$(function(){
    new Vue({
        el: '.shop-collect-list',
        data: {
            shopList: []
        },
        methods: {
            //删除收藏
            reShop(index, id){
                for(let item of $('.collect-single')){
                   if($(item).attr('data_id') == id){
                        $(item).remove();
                        this.$http.get('/reCollect?id=' + id).then((res)=>{})
                   };
                }
            },
            //购买
            toShopCart(id){
                sessionStorage.setItem('id', id);
                window.location.href = '/shopCart';
            }
        },
        mounted(){
            this.$http.get('/getCollect').then((res)=>{
                this.shopList = res.data;
            })
        }
    })
})