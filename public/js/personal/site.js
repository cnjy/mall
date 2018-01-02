$(function(){
    let time = new Date();
    let key = true, isNo = false, i = 0;
    $('.add').click(function(){
        $('.name').attr('placeholder', '收货人姓名');
        $('.phone').attr('placeholder', '收货人电话');
        $('.site-sel').children().eq(0).prop('selected', true);
        $('textarea').attr('placeholder', '详细地址');
        let id = time.getTime();
        $('.add-site-body').css('display','block');
        sessionStorage.setItem('siteID', id);
        isNo = true;
    });
    $('.glyphicon-remove').click(function(){
        $('.add-site-body').css('display','none');
    });

    $('.rem-btn').click(function(){
        $('.add-site-body').css('display','none');
    });

    $('.form-control').blur(function(){
        let num = $(this).val();
        if(num === ''){
            $(this).next().css({
                opacity: 1,
                visibility: 'visible'
            });
        }
        if(num !== ''){
            $(this).next().css({
                opacity: 0,
                visibility: 'hidden'
            });
        }
    });
    $('.phone').blur(function(){
        let num = $(this).val();
        if(num.search(/^\d{4,11}$/) === -1){
            $(this).next().css({
                opacity: 1,
                visibility: 'visible'
            }).html('号码格式不正确');
            key = false;
        }else{
            key = true;
        }
        if(num === ''){
            $(this).next().css({
                opacity: 1,
                visibility: 'visible'
            }).html('此项不能为空');
        }
    });
    $('.site-sel').blur(function(){
        if($('.site-sel option:selected').attr('value') == ''){
            $(this).next().css({
                opacity: 1,
                visibility: 'visible'
            });   
        }else{
            $(this).next().css({
                opacity: 0,
                visibility: 'hidden'
            });
        }
    });

    

    $('#myForm').submit(function(){
        let name = $('.name').val();
        let phone = $('.phone').val();
        let site = $('.site-sel option:selected').val();
        let text = $('textarea').val();
        let id = sessionStorage.getItem('siteID');
        let userId = sessionStorage.getItem('userID');

        if(name === ''){
            $('.form-control-label').eq(0).css({
                opacity: 1,
                visibility: 'visible'
            });
        }
        if(phone === ''){
            $('.form-control-label').eq(1).css({
                opacity: 1,
                visibility: 'visible'
            });
        }
        if(text === ''){
            $('.form-control-label').eq(3).css({
                opacity: 1,
                visibility: 'visible'
            });
        }
        if(name && phone && site && text && key){
            let user = {
                id: id,
                userId: userId,
                name: name,
                phone: phone,
                site: site,
                text: text
            };
            if(isNo){
                $.post('/user',user, function(data){
                    window.location.href = '/site';
                })
            }else{
                $.post('/userChange', user, function(data){
                    window.location.href = '/site';
                })
            }
            $('.add-site-body').css('display','none');
            return;
        }
        return false;
    })
});
//设置id
    function changeSite(id, name, phone, site, text){
        sessionStorage.setItem('siteID', id);
        $('.name').attr('placeholder', name);
        $('.phone').attr('placeholder', phone);
        $('.site-sel').val(site);
        $('textarea').attr('placeholder', text);
        $('.add-site-body').css('display','block');
    }
//删除指定地址
    function remSite(index, id){
        let userId = sessionStorage.getItem('userID');
        for(let item of $('.rem')){
            let siteId = $(item).attr('data_id');
            if(siteId == id){
                $(item).remove();
            }
        }
        $.get('/remSite?id=' + id + '&userId=' +userId, (data)=>{})
    }

