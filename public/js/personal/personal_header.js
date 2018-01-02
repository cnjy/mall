$(function(){
    new Vue({
        el: '.selfHeader-box',
        data:{
            userName: '',
            userShop: [],
            sumShop: 0,
            userTotal: 0,
        },
        methods: {
            exit(){
                sessionStorage.setItem('isNo', -1);
                sessionStorage.setItem('toLogin', false);
                this.$http.get('/userExit').then((res)=>{})
            },
            toShopCart(id){
                sessionStorage.setItem('id', id);
            },
            remUserShop(userShop,id){
                let userId = sessionStorage.getItem('userID');
                for(let item of $('.shopCarList-one')){
                    if($(item).attr('data_id') == id){
                        $(item).remove();
                    };
                }
                userShop.value = 0;
                this.calculate();
                this.$http.get('/removeShop?id=' + id + '&userId=' + userId).then((res)=>{})
            },
            calculate(){
                this.sumShop = 0;
                this.userTotal = 0;
                for(let item of this.userShop){
                    this.sumShop += item.value;
                    this.userTotal += item.value * item.price;
                }
            }
        },
        mounted(){
            let id = sessionStorage.getItem('userID');
            //获取用户信息
            this.$http.get('/getUserId?id=' + id).then((res)=>{
                this.userName = res.data;
            });
            //获取用户加入到购物车里的信息
            this.$http.get('/userShopCart?id=' + id).then((res)=>{
                this.userShop = res.data[0].shopCart;
                this.calculate();
            })
        }
    })
});

$(function(){
    $("#people-small").click(function(){
        $(".self-center").slideToggle();
        $(".selfHeader-list").hide();
        $(".changelater").toggleClass('change');
        $(".changebefore").toggle();
    });
    $("#shopcar-samll").click(function(){
        $(".selfHeader-list").slideToggle();
        $(".self-center").hide();
        $(".changelater2").toggleClass('change');
        $(".changebefore2").toggle();
    });
    $('.menu-list').click(function(){
        $(this).toggleClass('menu');
        $('.panel').slideToggle();
    })

    //回到顶部
    $(window).scroll(function(){
        if($('body').scrollTop() > 260){
            $('.to-top').css('display', 'block');
        }else{
            $('.to-top').fadeOut(200);
        };
    });
    $('.to-top').click(function(){
        $('body,html').animate({
            scrollTop:'0'
        },600);
    })
});