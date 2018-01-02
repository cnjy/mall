    $(function(){
        let All = Vue.component("All", {
        template: "#all",
        created (){
            this.$http.get("/ksy/getall").then(function(res){
            this.article=res.body.article;
            this.$nextTick(()=>{
                 aaa()
            })
          })
        
        },
        data:function(){
           return {
                isPage:true,
                head:"新闻中心",
                article:[]
           }
        },
        methods: {
          
        }
    });
    let News = Vue.component("News", {
        template: "#all",
         created (){
            this.$http.get("/ksy/getnews").then(function(res){
            this.article=res.body.article;
            this.$nextTick(()=>{
                 aaa()
            })
          })
        },
        data:function(){
           return {
                isPage:false,
                head:"新闻动态",
                article:[]

           }
        },
        methods: {
           
        }
    });
    let Guan=Vue.component("Guan",{
        template:"#all",
        created (){
            this.$http.get("/ksy/getguan").then(function(res){
            this.article=res.body.article;
            this.$nextTick(()=>{
                 aaa()
            })
          })
        },
        data:function(){
            return{
                isPage:false,
                head:"官网新闻",
                article:[]
            }
        },
        methods: {
           
        }
    });
    let Zixun=Vue.component("Zixun",{
        template:"#all",
        created (){
            this.$http.get("/ksy/getZixun").then(function(res){
            this.article=res.body.article;
            this.$nextTick(()=>{
                 aaa()
            })
          })
        },
        data:function(){
            return{
                isPage:false,
                head:"最新资讯",
                article:[]
            }
        },
        methods: {
          
        }
    });
    let Imgshow=Vue.component("Imgshow",{
        template:"#all",
        created (){
            this.$http.get("/ksy/getImgshow").then(function(res){
            this.article=res.body.article;
            this.$nextTick(()=>{
                 aaa()
            })
          })
        },
        data:function(){
            return{
                isPage:false,
                head:"图片展示",
                article:[]

            }
        },
        methods: {
          
        }
    });

    //分页组件
    let Page2=Vue.component("Page2",{
        template: "#all",
        created (){
            this.$http.get("/ksy/getPage2").then(function(res){
            this.article=res.body.article;
            this.$nextTick(()=>{
                 aaa()
            })
          })
        },
        data:function(){
           return {
                isPage:true,
                head:"新闻中心",
                article:[]

           }
        },
        methods: {
           
        }
    });
    let Page3=Vue.component("Page3",{
      template: "#all",
        created (){
            this.$http.get("/ksy/getPage3").then(function(res){
            this.article=res.body.article;
            this.$nextTick(()=>{
                 aaa()
            })
          })
        },
        data:function(){
           return {
                isPage:true,
                head:"新闻中心",
                article:[]

           }
        },
        methods: {
           
        }
    });



    let routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        //name代表组件的名称
        path: "/home",
        component: All

    },{
        path:"/page1",
        component:All,

    },{
        path:"/page2",
        component:Page2,

    },{
        path:"/page3",
        component:Page3,

    },{
        //name代表组件的名称
        name: "新闻动态",
        path: "/news",
        component: News
    },{
        name:"官网新闻",
        path:"/guan",
        component:Guan
    },{
        name:"最新资讯",
        path:"/zixun",
        component:Zixun
    },{
        name:"图片展示",
        path:"/imgshow",
        component:Imgshow
    }];

    let router = new VueRouter({
        routes,
        linkActiveClass: 'select-to-link'
    });

    new Vue({
        el: ".box",
        router: router
    })
});

function aaa(){
       //左边文章列表
      $(".article-detail").click(function(){
         var id = $(this).find(".id").html();
         console.log(id);
         demo(id);
      });
      
      //右边图片 
      $(".main-right img").click(function(){
        var id=Number($(this)[0].getAttribute("id"));
        demo(id);
      })
      
    //左边文章列表函数
    function demo(id){
         // 每次选取文章点击时 遍历图片  src清空
            
          getdata(id);
             //上一篇
            $(".pre").click(function(){
                id=Number(id)-1;
                if(id<1){
                  id=0;
                }
                if(id==0){
                  return;
                }
                getdata(id);
            })


            //下一篇
            $(".next").click(function(){
                id = Number(id)+ 1;
                if(id>9){
                  id=10;
                }
                if(id==10){
                  return;
                }
                getdata(id);
            })
            getRight();
            
    }


 //获取新闻信息数据
    function getdata(id){
        $.get("/ksy/getxiangqing?id="+id,function(data,statusText,xhr){
            $(".xiangqingtitle").html(data.xq.title);
            $('.detail-p01').html(data.xq.wen);
            
            for(var i = 0; i < data.xq.imgs.length; i ++){
              $(".xq-content img").eq(i).attr("src", data.xq.imgs[i]).css('display', 'block');
            }
        })
        for(var i = 0; i <  $(".xq-content img").length; i ++){
            $(".xq-content img").eq(i).attr("src", "").css('display', 'none');
        }

         if(id <= 1){
              $(".pre").html("上一篇：没有了");
              $(".pre").css({"color":"#A5A7A9","cursor":"not-allowed"});
            }else{
              $(".pre").css({"color":"black","cursor":"pointer"});
              $(".pre").html("上一篇");
            }
           
         if(id>=9){
            $(".next").html("下一篇：没有了");
            $(".next").css({"color":"#A5A7A9","cursor":"not-allowed"})
          }else{
            $(".next").css({"color":"black","cursor":"pointer"})
            $(".next").html("下一篇");
          }
          $('body,html').animate({
            scrollTop: 0
          }, 300);

      }
       
//点击导航栏 跳转分页时  列表页显示  详情页显示
    function getRight(){
      $(".newUl li").click(function(){
          $(".all-content .list").css("display","block");
          $(".xiangqing").css("display",'none');
      })
     
      //列表页隐藏，详情页显示
      $(".all-content .list").css("display","none");
      $(".xiangqing").css("display",'block');

      //监听返回时刷新一次页面
      $(document).ready(function(e) {   
          var counter = 0;  
          if (window.history && window.history.pushState) {  
             $(window).on('popstate', function () {  
                  window.history.pushState('forward', null, '#');  
                  window.history.forward(1);  
                //alert("不可回退");  
                   location.replace(document.referrer);//刷新
                });  
            }  

            window.history.pushState('forward', null, '#'); //在IE中必须得有这两行  
            window.history.forward(1);  
      });  
    }

}