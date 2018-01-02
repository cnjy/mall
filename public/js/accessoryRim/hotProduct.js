$(function(){
    // 热门产品的下拉列表 显示与隐藏
    $(".hotProduct").click(function(){
        $(".hotList").fadeToggle("500","linear")
    });
    for(var i=0;i< $(".hotYc .bigImgs img").length;i++){
        $(".hotYc .bigImgs img").eq(i).attr("src","");
    }
    setInterval(function(){
        $(".hotProduct-img").mouseover(function(){
            $(this).find(".hotProduct-img-black").css({"display":"block"})
        });
        $(".hotProduct-img").mouseout(function(){
            $(this).find(".hotProduct-img-black").css({"display":"none"})
        });

        //点击图片显示 图片展示功能
        
        $(".hotProduct-one").click(function(){
            var id=$(this).attr('newid');
            $(".hotYc").css("display","block");  
            $.get("/ksy/getHotXq",function(data,statusText,xhr){
                $(".hotYc .bigImg-title").html(data.hotproduct[id].head);
                $(".hotYc .bigImg img").attr("src",data.hotproduct[id].img);

                for(let i=0;i<data.hotproduct[id].imgs.length;i++){
                    $(".hotYc .bigImgs img").eq(i).attr("src",data.hotproduct[id].imgs[i]);
                }
                
                $(".hotYc .bigImgs img").click(function(){
                    var a=$(this).attr("i");
                    $(".hotYc .bigImg img").attr("src",data.hotproduct[id].imgs[a]);
                    
                })

            })
        })
        $(".imgHide").click(function(){
            $(".hotYc").css("display","none");  
        })


         //more  第五块的显示与隐藏
        // $(".hotProduct-one").eq(4).css({"display":"none"});
        // $(".hotMore").click(function(){
        //     $(".hotProduct-one").eq(4).css({"display":"block"});
        //     $(".hotMore").css({"display":"none"});
        // })
        

    },1000)
   
})