//全部产品
$(function(){
    let id = 0;
    setInterval(function(){
        $('.shop-single-li').click(function(){
            id = $(this).attr('allid');
            sessionStorage.setItem('id', id);
            $.post('/getCartData', {id: id});
        });
        $('.pager-sp a').click(function(){
            $('body,html').animate({
                scrollTop:'0'
            },100);
        });
    }, 500);

});
