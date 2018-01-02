$(function(){
    //定义组件
    let all = Vue.component('all', {
        template: '#electronics-all',
        data(){
            return {
                allElectronics: []
            }
        },
        methods: {
            allEleId(index){
                $('.shop-single-li').eq(0).attr('allid', 6);
                $('.shop-single-li').eq(1).attr('allid', 7);
                $('.shop-single-li').eq(2).attr('allid', 9);
                $('.shop-single-li').eq(3).attr('allid', 8);
                $('.shop-single-li').eq(4).attr('allid', 10);
                $('.shop-single-li').eq(5).attr('allid', 5);
            }
        },
        mounted(){
            this.$http.get('/shopData').then((res)=>{
                this.allElectronics = res.data;
            })
        }
    });
    let mon = Vue.component('mon', {
        template: '#electronics-mon',
        data(){
            return {
                monShop: [
                    {
                        img: './images/all/1494318045.jpg',
                        tit: '入耳式耳机',
                        txt: '卓越发音 三按键线控',
                        price: '199.00元'
                    },
                    {
                        img: './images/all/1494317248.jpg',
                        tit: '智能蓝牙无限降噪耳机',
                        txt: '手势触控 强力降噪',
                        price: '149.00元'
                    },
                ]
            }
        },
        methods: {
            monEleId(index){
                $('.shop-single-li').eq(0). attr('allid', 4);
                $('.shop-single-li').eq(1). attr('allid', 6);
            }
        }
    });
    let par = Vue.component('par', {
        template: '#electronics-par',
        data(){
            return {
                parShop: [
                    {
                        img: './images/all/1494318188.jpg',
                        tit: '车载充电器',
                        txt: '铝合金机身 智能调节',
                        price: '249.00元'
                    },
                    {
                        img: './images/all/1494318266.jpg',
                        tit: '快充移动电源',
                        txt: '双向快充 轻盈便携',
                        price: '128.00元'
                    }
                ]
            }
        },
        methods: {
            parEleId(index){
                $('.shop-single-li').eq(0). attr('allid', 2);
                $('.shop-single-li').eq(1). attr('allid', 7);
            }
        }
    });
    let pro = Vue.component('pro', {
        template: '#electronics-pro',
        data(){
            return {
                proShop: [
                    {
                        img: './images/all/1495780766.jpg',
                        tit: '官方T恤',
                        txt: '100%进口 SUMPIMA棉',
                        price: '149.00元'
                    },
                ]
            }
        },
        methods: {
            proEleId(index){
                if(index == 0){
                    $('.shop-single-li').eq(0). attr('allid', 3);
                }
            }
        }
    });
    let nextAll = Vue.component('nextAll', {
        template: '#next-all',
        data(){
            return {
                proShop: [
                    {
                        img: './images/shopCartImg/1495611390.jpg',
                        tit: '影子无线耳机',
                        txt: '这是耳机的方式应该是,像你一样好。影子特征与雅致的简约设计口音混合与任何风格。其灵活的生物形态的衬衫领子休息舒适光在你的脖子上,所以你会忘记它的存在。8个小时的充电电池,你可以穿它,整天播放音乐。你会听到…低,丰富的低音和惊人的清晰,听起来比大多数有线耳机。',
                        price: '399.00元'
                    },
                ]
            }
        },
        methods: {
            proEleId(index){
                if(index == 0){
                    $('.shop-single-li').eq(0). attr('allid', 8);
                }
            }
        }
    });

    //定义路由组
    let routes =[
        {
            path: '/',
            redirect:"/home"
        },
        {
            path: '/home',
            component: all
        },
        {
            path: '/monitor',
            component: mon
        },
        {
            path: '/phoneParts',
            component: par
        },
        {
            path: '/products',
            component: pro
        },
        {
            path: '/nextAll',
            component: nextAll
        }
    ];

    //声明路由实例
    let router = new VueRouter({
        routes,
        linkActiveClass: 'select-to-link'
    });

    new Vue({
        el: '.electronics',
        router: router,
    });
});