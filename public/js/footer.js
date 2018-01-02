//页面底部
$(function(){
    new Vue({
        el: '.foo-box',
        data: {
            isNo: false,
            fooList: [
                {
                    h4: ['关于公司', '/dcl/company/'],
                    li01: ['公司简介', '/dcl/company/'],
                    li02: ['线上反馈', '/dcl/company#/xianshang'],
                    li03: ['加入我们', '/dcl/join'],
                    li04: ['联系我们', '/dcl/contact']
                },
                {
                    h4: ['最新活动', ''],
                    li01: ['配件周边', '/accessoryRim'],
                    li02: ['热门产品', ''],
                    li03: ['线下聚会', '/ksy/upline'],
                    li04: ['旅行活动', '/ksy/travel']
                },
                {
                    h4: ['电子产品', '/shopElectronics'],
                    li01: ['热门手机', '/shopElectronics#/phoneHot'],
                    li02: ['耳机音响', '/shopElectronics#/monitor'],
                    li03: ['手机配件', '/shopElectronics#/phoneParts'],
                    li04: ['周边产品', '/shopElectronics#/products']
                },
                {
                    h4: ['新闻中心', '/ksy/new-center'],
                    li01: ['新闻动态', '/ksy/new_center#/news'],
                    li02: ['官网新闻', '/ksy/new_center#/guan'],
                    li03: ['最新资讯', '/ksy/new_center#/zixun'],
                    li04: ['图片展示', '/ksy/new_center#/imgshow']
                },
                {
                    h4: ['关注我们', ''],
                    li01: ['客服 QQ', ''],
                    li02: ['新浪微博', ''],
                    li03: ['官方微信', ''],
                    li04: ['官方邮箱', '']
                },
            ],
        },
        methods: {
            icon(index){
                if(index == 4){
                    let i = 0;
                    for(let item of $('.left-list').eq(4).children()){
                        switch (i){
                            case 0:
                                $(item).children().children().eq(0).addClass('icon-QQ');
                                break;
                            case 1:
                                $(item).children().children().eq(0).addClass('icon-iconfontweibowukuang-copy');
                                $(item).children().mouseenter(function(){
                                    $(this).css('color', '#eb7350')
                                }).mouseleave(function(){
                                    $(this).css('color', '#969696')
                                });
                                break;
                            case 2:
                                let  j = 0;
                                $(item).children().children().eq(0).addClass('icon-weixin');
                                $(item).children().mouseenter(function(){
                                    for(let item of $('.foo-img')){
                                        if(j == 4){
                                            $(item).css('display', 'block');
                                            j = -1;
                                        }
                                        j ++;
                                    };
                                    $(this).css('color', '#609700')
                                }).mouseleave(function(){
                                    for(let item of $('.foo-img')){
                                        if(j == 4){
                                            $(item).css('display', 'none');
                                            j = -1;
                                        }
                                        j ++;
                                    };
                                    $(this).css('color', '#969696')
                                });
                                break;
                            case 3:
                                $(item).children().children().eq(0).addClass('icon-youjian');
                                $(item).children().mouseenter(function(){
                                    $(this).css('color', '#354b66')
                                }).mouseleave(function(){
                                    $(this).css('color', '#969696');
                                });
                                break;
                        };
                        i ++;
                    }
                }

            },
            //y
            footerNavList(index){
                $('.left-list').eq(index).slideToggle();
            }
        }
    })
});
$(function(){
    $('.stop').click(function(ev){
        let e = ev || window.event;
        e.stopPropagation();
    })
})