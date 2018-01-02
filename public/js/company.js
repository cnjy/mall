
    $(function(){

        var jianjie=Vue.component("jianjie",{
            template:"#jianjie"
        });
        var xianshang=Vue.component("xianshang",{
            template:"#xianshang"
        });

        var routes=[
            {
                path:'/',
                redirect:"/jianjie"
            },
            {
                path:"/jianjie",
                component:jianjie
            },{
                path:"/xianshang",
                component:xianshang
            }];

        var router=new VueRouter({
            routes,
            linkActiveClass: 'to-link'

        });

        new Vue({
            el:".container-main",
            router
        });


        $(".com-img").click(function(){
            $(this).parent().siblings(".com-hide-box").show();
        })

        $(".glyphicon-remove").click(function(){
            $(this).parent().parent().hide();
        });

        // 点击放大缩小
        var big=1;
        $(".glyphicon-zoom-in").click(function(){
            $(this).parent().parent().children("img").css("transform","scale("+big+")");
            big=big+0.05;

            var small=big;
            $(".glyphicon-zoom-out").click(function(){
                // console.log($(this).parent().parent().children("img").css("width"))
                if(small===1){
                    return;
                }else{
                    $(this).parent().parent().children("img").css("transform","scale("+small+")");

                }
                small=small-0.05;
            }).trigger("click");

        }).trigger("click");

    });

//姓名
    function user(){
        if($("#username").val()==""){
            $("#username").siblings(".panduan").toggle().text("*请输入姓名");
            return false;
        }
        else if($("#username").val().search(/^\w{2,12}$/)===-1){
            $("#username").siblings(".panduan").toggle();
            return false;
        }
        else{
            $("#username").siblings(".panduan").toggle().text(" ");
            return true;
        }
    }
//职务
    function general(){
        if($("#usergeneral").val()==""){
            $("#usergeneral").siblings(".panduan").toggle().text("*请输入职务");
            return false;
        }
        else if($("#usergeneral").val().search(/^\w{2,12}$/)===-1){
            $("#usergeneral").siblings(".panduan").toggle();
            return false;
        }
        else{
            $("#usergeneral").siblings(".panduan").toggle().text(" ");
            return true;
        }
    }
//邮箱
    function emails(){
        if($("#email").val()==""){
            $("#email").siblings(".panduan").toggle().text("*请输入邮箱");
            return false;
        }
        else if($("#email").val().match(/^[\w-]+@[\w-]+(\.\w+){1,3}$/) === null){
            $("#email").siblings(".panduan").toggle().text("*邮箱格式不正确");
            return false;
        }
        else{
            $("#email").siblings(".panduan").toggle().text(" ");
            return true;
        }
    }

//联系电话
    function checkUser(){
        if($("#userInput").val()==""){
            $("#userInput").siblings(".panduan").toggle().text("*请输入联系电话");
            return false;
        }
        else if($("#userInput").val().search(/^1\d{10}$/)==-1){
            $("#userInput").siblings(".panduan").toggle().text("*电话格式不正确");
            return false;
        }
        else{
            $("#userInput").siblings(".panduan").toggle().text(" ");
            return true;
        }
    }

//单位名称
    function companyName(){
        if($("#usercompany").val()==""){
            $("#usercompany").siblings(".panduan").toggle().text("*请输入单位名称");
            return false;
        }
        else if($("#usercompany").val().search(/^\w{2,20}$/)===-1){
            $("#usercompany").siblings(".panduan").toggle();
            return false;
        }
        else{
            $("#usercompany").siblings(".panduan").toggle().text(" ");
            return true;
        }
    }

//详细地址
    function address(){
        if($("#useraddress").val()==""){
            $("#useraddress").siblings(".panduan").toggle().text("*请输入详细地址");
            return false;
        }
        else if($("#useraddress").val().search(/^\w{3,30}$/)===-1){
            $("#useraddress").siblings(".panduan").toggle();
            return false;
        }
        else{
            $("#useraddress").siblings(".panduan").toggle().text(" ");
            return true;
        }
    }

//信息描述
    function message(){
        if($("#usermessage").val()==""){
            $("#usermessage").siblings(".panduan").toggle().text("*请输入信息描述");
            return false;
        }
        else if($("#usermessage").val().search(/^\w{3,100}$/)===-1){
            $("#usermessage").siblings(".panduan").toggle();
            return false;
        }
        else{
            $("#usermessage").siblings(".panduan").toggle().text(" ");
            return true;
        }
    }

//验证码
    var anum=[["RACK"],["R75G"],["iPKQ"],["Q96Q"],["55BJ"],["NIPM"],["22KB"],["S2MA"],["5AM7"],["P2LL"],["RQR4"]];
    var address1=[["/images/about/m1.png"],
        ["/images/about/entrance1.png"],
        ["/images/about/entrance2.png"],
        ["/images/about/entrance3.png"],
        ["/images/about/entrance4.png"],
        ["/images/about/entrance5.png"],
        ["/images/about/entrance6.png"],
        ["/images/about/entrance7.png"],
        ["/images/about/entrance8.png"],
        ["/images/about/entrance9.png"],
        ["/images/about/entrance10.png"]];

    var shuzi=Math.floor(Math.random()*10)
    var src=address1[shuzi];

    setInterval(function(){
        $(".qq").attr("src",src);

	}, 1000);

    function yanzhengs(){
        if($("#yanzheng1").val()==""){
            $("#yanzheng1").siblings(".panduan").toggle().text("*请输入验证码");
            return false;
        }
        else if($("#yanzheng1").val().toString().toLowerCase()!=anum[shuzi].toString().toLowerCase()){
            $("#yanzheng1").siblings(".panduan").toggle().text("*验证码错误");
            return false;
        }
        else if($("#yanzheng1").val().trim().toString().toLowerCase()==anum[shuzi].toString().toLowerCase()){
            $("#yanzheng1").siblings(".panduan").toggle().text(" ");
            return true;
        }
    }


    $(".btn-block").click(function(){
        if(($("#username").val()=="")&&($("#email").val()=="")&&($("#usermessage").val()=="")&&($("#usergeneral").val()=="")&&($("#userInput").val()=="")&&($("#usercompany").val()=="")&&($("#useraddress").val()=="")&&($("#yanzheng1").val()=="")){
            $(".panduan").toggle().html("此项不能为空");
        }

    })

    function tijiao(){
        return user()&&general()&&checkUser()&&emails()&&companyName()&&message()&&address()&&yanzhengs();
    }

