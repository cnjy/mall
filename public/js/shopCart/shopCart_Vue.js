$(function(){
    new Vue({
        el: '.shopDetail',
        data: {
            num: 0,
            shopCart: [
                {
                    phoneImg:[],
                    shopDetails: [],
                    content:{}
                }
            ],
            sidebarImg: [
                {
                    img: './images/index/1495851624.jpg',
                    title: '坚果Pro',
                    price: '1499.00元'
                },
                {
                    img: './images/index/1495701956.jpg',
                    title: '矩形孔入耳式耳机',
                    price: '149.00元'
                },
                {
                    img: './images/index/1494318188.jpg',
                    title: '车载充电器',
                    price: '249.00元'
                },
                {
                    img: './images/index/1494317057.jpg',
                    title: '官方T恤',
                    price: '149.00元'
                },
                {
                    img: './images/index/1495780766.jpg',
                    title: '官方T恤',
                    price: '149.00元'
                },
            ],
        },
        methods: {
            pImg(){
                //加载大图
                $('.phone-single').children().eq(0).addClass('show-img');
                $('.shopCart-phone').children().eq(0).addClass('sel');
                $('.shopCart-phone').eq(0).addClass('sel-img');
            },
            sImg(index){
                //小图点击
                let i = 0;
                $('.phone-single').children().eq(index).addClass('show-img').siblings().removeClass('show-img');
                $('.shopCart-phone').eq(index).addClass('sel-img').siblings().removeClass('sel-img');
                for(let item of $('.shopCart-phone img')){
                    if(i == index){
                        $(item).addClass('sel');
                    }else{
                        $(item).removeClass('sel');
                    }
                    i ++;
                }
                this.num = index;
            },
            changeLeft(){
                //左点击
                let i = 0;
                if(this.num > 0){
                    $('.phone-single').children().eq(this.num - 1).addClass('show-img').siblings().removeClass('show-img');
                    $('.shopCart-phone').eq(this.num - 1).addClass('sel-img').siblings().removeClass('sel-img');
                    for(let item of $('.shopCart-phone img')){
                        if(i == this.num - 1){
                            $(item).addClass('sel');
                        }else{
                            $(item).removeClass('sel');
                        }
                        i ++;
                    }
                    this.num --;
                }
                if(this.num < 0){
                    this.num == 0;
                }
            },
            changeRight(){
                //右点击
                let i = 0;
                if(this.num < 5 && this.num >= 0){
                    $('.phone-single').children().eq(this.num + 1).addClass('show-img').siblings()
                        .removeClass('show-img');
                    $('.shopCart-phone').eq(this.num + 1).addClass('sel-img').siblings()
                        .removeClass('sel-img');
                    for(let item of $('.shopCart-phone img')){
                        if(i == this.num + 1){
                            $(item).addClass('sel');
                        }else{
                            $(item).removeClass('sel');
                        }
                        i ++;
                    }
                    this.num ++;
                };
                if(this.num >= i){
                    this.num = i-1;
                };
            },
            subShop(){
                //减商品数量
                let num = $('.input').val();
                if($('.input').val() > 1){
                    num --;
                }else{
                    num = 1;
                }
                $('.input').val(num);
                let id = sessionStorage.getItem('id');
                this.$http.post('/changeShop', {
                    id: id,
                    value: num
                }).then((res)=>{});
            },
            addShop(){
                //加商品数量
                let num = $('.input').val();
                num ++;
                $('.input').val(num);
                let id = sessionStorage.getItem('id');
                this.$http.post('/changeShop', {
                    id: id,
                    value: num
                }).then((res)=>{});
            },
            //给其他商品添加ID
            restTo(index){
                if(index == 0){
                    $('.mob-single').eq(0).attr('restId', 0);
                    $('.mob-single').eq(1).attr('restId', 1);
                    $('.mob-single').eq(2).attr('restId', 2);
                    $('.mob-single').eq(3).attr('restId', 9);
                    $('.mob-single').eq(4).attr('restId', 3);

                    for(let item of $('.mob-single')){
                        $(item).click(function(){
                            let id = $(this).attr('restid');
                            sessionStorage.setItem('id', id);
                            window.location.href = './shopCart';
                        });
                    }
                }
            },
            //加入到购物车,存储到数据库
            addShopCart(){
                let value = $('.input').val();
                let isNo = sessionStorage.getItem('isNo');
                let userId = sessionStorage.getItem('userID');
                if(isNo == 0){
                    this.$http.post('/upDateShop', {
                        userId: userId,
                        value: value,
                        id: this.shopCart[0].id,
                        img: this.shopCart[0].phoneImg[0].img,
                        title: this.shopCart[0].content.title,
                        txt: this.shopCart[0].content.txt,
                        price: this.shopCart[0].content.price
                    }).then((res)=>{
                        window.location.href = './addShopCart';
                    })
                }else{
                    $('.alertify').css('display', 'block');
                }

            },
            collect(ev){
                let id = sessionStorage.getItem('id');
                let e = ev || window.event;
                if( e && e.preventDefault ){ 
                  e.preventDefault(); 
                }else{
                    window.event.returnValue = false;  
                }
                if($('.collect').hasClass('btn-warning')){
                    $('.collect').removeClass('btn-warning').addClass('btn-success').text('已收藏');
                    this.$http.get('/collectShop?id=' + id).then((res)=>{});
                }else{
                    $('.collect').addClass('btn-warning').removeClass('btn-success').text('加入收藏');
                    this.$http.get('/reCollect?id=' + id).then((res)=>{});
                }
            },
            cancel(){
                $('.alertify').css('display', 'none');
            },
            toLogin(){
                sessionStorage.setItem('toLogin', 'true');
                window.location.href = './login';
            }
        },
        //请求数据
        created(){
            let id = sessionStorage.getItem("id");
            this.$http.post('/getCartData', {id: id}).then(function(res){
                this.shopCart = res.data;
            });
            this.$http.post('/isNoCollect', {id: id}).then((res)=>{
                if(res.data == 'true'){
                    $('.collect').removeClass('btn-warning').addClass('btn-success').text('已收藏');
                }else{
                    $('.collect').addClass('btn-warning').removeClass('btn-success').text('加入收藏');
                }
            })
        },
        filters: {
            myFil(value){
                return value + '.00元';
            }
        }
    })
});

