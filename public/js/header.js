$(function(){
    //图片防止拖拽
    $('img').on('dragstart', function(){
        return false;
    });
    //头部
    $('.show-list').mouseenter(function(){
        $(this).children().eq(0).addClass('show-box');
        $(this).children().eq(1).fadeIn(200);
    }).mouseleave(function(){
        $(this).children().eq(0).removeClass('show-box');
        $(this).children().eq(1).fadeOut(200);
    });

    //导航
    $('.met-show-list').mouseenter(function(){
        $(this).children().eq(0).addClass('met-show-box');
        $(this).children().eq(1).fadeIn(200);
    }).mouseleave(function(){
        $(this).children().eq(0).removeClass('met-show-box');
        $(this).children().eq(1).fadeOut(200);
    });

    //回到顶部
    $(window).scroll(function(){
        if($('body').scrollTop() > 400){
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