//商品主体栏 vue
$(function(){
    new Vue({
        isNo: false,
        el: '#container',
        data: {
            i: 5,
            shops: [
                {
                    href: '/accessoryRim',
                    img: './images/shopCartImg/1495693824.png',
                    tit: '配件周边',
                    txt: "  开售提醒 参与抽奖  "
                },
                {
                    href:'/ksy/hotProduct',
                    img: './images/shopCartImg/1495697648.png',
                    tit: '热门产品',
                    txt: '  周一上午10：00 限量开抢  '
                },
                {
                    href: '/ksy/upline',
                    img: './images/shopCartImg/1495693914.png',
                    tit: '线下聚会',
                    txt: '  来自五湖四海 志趣相投  ',
                },
                {
                    href: '/ksy/travel',
                    img: './images/shopCartImg/1495693941.png',
                    tit: '旅行活动',
                    txt: '  带上PRO 放下单反  '
                },
            ],
            shopHot: [],
            apply:[
                {
                    img: './images/shopCartImg/1495609372.jpg',
                    tit01: 'One',
                    tit02: '一个就够了'
                },
                {
                    img: './images/shopCartImg/1495794368.png',
                    tit01: 'LIVE',
                    tit02: '看你最喜爱的'
                },
                {
                    img: './images/shopCartImg/1495609812.jpg',
                    tit01: 'Ideas',
                    tit02: '人脑每天差生6000个念头，如何储存？'
                },
                {
                    img: './images/shopCartImg/1495701022.png',
                    tit01: 'OS',
                    tit02: '更新到最安全'
                },
            ],
            newScience: [
                {
                    img: './images/shopCartImg/thumb.jpg',
                    newTit: '1MORE“大师对话·中国声”主题发布会',
                    newTxt: '价格更低：网站建设公司自行开发系统，一般的开发成本都会在千元以上，就算网站建设公.....'
                },
                {
                    img: './images/shopCartImg/thumb1.jpg',
                    newTit: '无人机的下一个时代 将由“群”定义',
                    newTxt: '当你想到无人机的时候你会觉得它是什么样子的?一个单独的遥控玩具，有螺旋桨，还是一.....'
                },
                {
                    img: './images/shopCartImg/thumb2.jpg',
                    newTit: '官方最新MX59-365头戴式耳机发布',
                    newTxt: '5月26日消息，今天，传闻已久的华为荣耀9现身工信部，关于荣耀9什么时候发布以及.....'
                },
                {
                    img: './images/shopCartImg/thumb3.jpg',
                    newTit: '如何让你心爱的耳机焕发青春',
                    newTxt: '越来越多的人选择耳机来作为音响发烧的一个手段和娱乐项目。而且这东西用途很广，可以.....'
                }
            ],
        },
        methods: {
            change(index){
                $('.pro').eq(index).css('display','block');
                $('.phone-price').eq(index).css('display','none');
                $('.pro-select').eq(index).css('display','block');
                $('.phone-price-sel').eq(index).css('display','none');
            },
            recover(index){
                $('.pro').eq(index).css('display','none');
                $('.phone-price').eq(index).css('display','block');
                $('.pro-select').eq(index).css('display','none');
                $('.phone-price-sel').eq(index).css('display','block');
            },
            posImg(index){
                if(index == 0){
                    $('.phone-box').each(function(index,item){
                        $(this).children().eq(0).addClass('show-phone');
                        $(this).closest('a').next().children().eq(0).addClass('phone-cli');
                    });
                    $('.select-phone-box').each(function(index,item){
                        $(this).children().eq(0).addClass('show-phone');
                        $(this).closest('a').next().children().eq(0).addClass('phone-cli');
                    });
                    for(item of $('.phone-box')){
                        this.addId();
                        this.i ++;
                    }
                    this.i = 5;
                    for(item of $('.select-phone-box')){
                        this.addId();
                        this.i ++;
                    }
                    
                }
            },
            addId(){
                switch(this.i){
                    case 5:
                        $(item).attr('imgId', 2); 
                        break;
                    case 6:
                        $(item).attr('imgId', 3); 
                        break;
                    case 7:
                        $(item).attr('imgId', 1); 
                        break;
                    case 8:
                        $(item).attr('imgId', 0); 
                        break;
                    case 9:
                        $(item).attr('imgId', 4); 
                        break;
                    case 10:
                        $(item).attr('imgId', 5); 
                        break;
                }
            },
            showTxt(index){
                $('.txt-a').eq(index).css('opacity', '1');
                $('.app-p01').eq(index).css('opacity', '0');
                $('.app-p02').eq(index).css('opacity', '0');
                $('.txt-i').eq(index).animate({
                    'margin-left': '5px'
                },500);
            },
            hideTxt(index){
                $('.txt-a').eq(index).css('opacity', '0');
                $('.app-p01').eq(index).css('opacity', '1');
                $('.app-p02').eq(index).css('opacity', '1');
                $('.txt-i').eq(index).animate({
                    'margin-left': '0px'
                },300);
            },

            //进入购物车
            intoCart(index){
                let id = $('.phone-box').eq(index).attr('imgId');
                sessionStorage.setItem("id", id);
            },
            offCart(index){
                let id = $('.select-phone-box').eq(index).attr('imgId');
                sessionStorage.setItem("id", id);
            }
        },
        mounted(){
            this.$http.get('/shopData').then((res)=>{
                this.shopHot = res.data;
            })
        },
        filters: {
            filterPrice(val){
                return val + '.00 元';
            }
        }
    })
});





