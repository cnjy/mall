$(function(){
    new Vue({
        el: '.main-right',
        data: {
            shopDetail: {},
            orderTotal: 0,
        },
        methods: {
            remOrder(){
                let orderId = sessionStorage.getItem('orderId');
                this.$http.get('/removeShop?id=' + orderId).then((res)=>{})
            },
            toShop(id){
                sessionStorage.setItem('id', id);
            }
        },
        mounted(){
            let orderId = sessionStorage.getItem('orderId');
            let userId = sessionStorage.getItem('userID');
            this.$http.get('/shopDetail?orderId=' + orderId + '&userId=' + userId).then((res)=>{
                this.shopDetail = res.body;
                this.orderTotal = res.body.value * res.body.price;
            })
        }
    })
});