$(function(){
    //定义组件
    let order = Vue.component('order', {
        template: '#order',
        data(){
            return {
                shopAll: [],
                total: 0
            }
        },
        methods: {
            shopTotal(){
                this.shopAll.forEach((item)=>{
                    this.total += item.price * item.value;
                })
            },
            toShopCart(id){
                sessionStorage.setItem('id', id);
            },
            toDetail(id){
                sessionStorage.setItem('orderId', id);
            }
        },
        mounted(){
            let id = sessionStorage.getItem('userID');
            this.$http.get('/shopAll?id=' + id).then((res)=>{
                console.log(res);
                this.shopAll = res.data;
                this.shopTotal();
            });
        }
    });
    let take = Vue.component('take', {
        template: '#take'
    });
    let close = Vue.component('close', {
        template: '#close'
    });

    //定义路由组
    let routes = [
        {
            path: '/',
            redirect: '/order'
        },
        {
            path: '/order',
            component: order
        },
        {
            path: '/pay',
            component: order
        },
        {
            path: '/take',
            component: take
        },
        {
            path: '/close',
            component: close
        }
    ];

    //创建路由实例
    let router = new VueRouter({
        routes,
        linkActiveClass: 'sel-to'
    });

    //挂载路由
    new Vue({
        el: '.shop-order',
        router
    })
});