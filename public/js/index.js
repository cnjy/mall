//滚动监听
$(function(){
    $(window).scroll(function(){
        if($(document).scrollTop() < 60){
            $('.met-nav-sec').css('display', 'none');
        }else{
            $('.met-nav-sec').css('display', 'block');
        }; 

        // if($(document).scrollTop() > 300){
        //     for(let item of $('.phone-box img')){
        //         let src = $(item).attr('data_src');
        //         $(item).prop('src', src);
        //     };
        // };
        //  if($(document).scrollTop() > 900){
        //     for(let item of $('.select-phone-box img')){
        //         let src = $(item).attr('data_src');
        //         $(item).prop('src', src);
        //     };
        // };
    });
});

//热门商品
$(function(){
    //图片旋转
    $('.carousel').mouseenter(function(){
        let bX = $(this).innerWidth();
        $(this).mousemove(function(e){
            let ev = e || window.enent;
            let x = ev.clientX;
            if(x < bX / 2) {
                $(this).css({
                    '-webkit-transform': 'perspective(1000px) rotateY(' + - (bX - x) / 600 + 'deg)',
                    '-moz-transform': 'perspective(1000px) rotateY(' + - (bX - x) / 600 + 'deg)',
                    '-ms-transform': 'perspective(1000px) rotateY(' + - (bX - x) / 600 + 'deg)',
                    '-o-transform': 'perspective(1000px) rotateY(' + - (bX - x) / 600 + 'deg)',
                    'transform': 'perspective(1000px) rotateY(' + - (bX - x) / 600 + 'deg)',
                })
            }else{
                $(this).css({
                    '-webkit-transform': 'perspective(1000px) rotateY(' + (x - (bX / 3)) / 600 + 'deg)',
                    '-moz-transform': 'perspective(1000px) rotateY(' + (x - (bX / 3)) / 600 + 'deg)',
                    '-ms-transform': 'perspective(1000px) rotateY(' + (x - (bX / 3)) / 600 + 'deg)',
                    '-o-transform': 'perspective(1000px) rotateY(' + (x - (bX / 3)) / 600 + 'deg)',
                    'transform': 'perspective(1000px) rotateY(' + (x - (bX / 3)) / 600 + 'deg)',
                })
            }
        }).mouseleave(function(){
            $(this).css({
                transform : 'rotateY(0deg)'
            });
        })
    });

    //更多 hot
    setInterval(function(){
        $('.phone-list li').click(function(){
            let index = $(this).index();
            console.log($(this).closest('ul').prev().children().eq(0)
                .children().eq(index));
            $(this).closest('ul').prev().children().eq(0)
                .children().eq(index).addClass('show-phone').siblings().removeClass('show-phone');
            $(this).addClass('phone-cli').siblings().removeClass('phone-cli');
        });
    }, 300);
      

    let left= -101;
    $('.shop-m span').eq(1).click(function(){
        if(document.body.clientWidth>550){
            $('.shop-phone-list01').animate({
                'margin-left' : '-51%'
            },500);
        }
        else{
            $('.shop-phone-list01').animate({
                'margin-left' : left+'%'
            },500);
            left += -101;
            if(left < -202){
                left = -202;
            }
        }
    });   
    $('.shop-m span').eq(0).click(function(){
        if(document.body.clientWidth>550){
            $('.shop-phone-list01').animate({
                'margin-left' : 0
            },500);          
        }
        else{
            left += 101;
            $('.shop-phone-list01').animate({
                'margin-left' : left + '%',
            },500);
            if(left > -102){
                left = -101;
            }
        }
    });
    
});


