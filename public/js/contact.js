var m=0;
$(".contact-item img").click(function(){
	m=$(this).attr("i");
	
	$(".hide-img-group").eq(m).show().siblings(".hide-img-group").hide();
	$(this).closest(".table-bordered").siblings(".contact-table-hide").show();
	
	// 点击X关闭
	$(".glyphicon-remove").click(function(){
		$(this).closest(".contact-table-hide").hide();
	})


	//往左按钮
	$(".jiantou-left").click(function(){
		m--;
		if(m<0){
			m=2;
		}
		$(".hide-img-group").eq(m).show().siblings(".hide-img-group").hide();
		$(".table-hide-footer").find(".footer-thumb-item img").eq(m).css({"border-color":"red"}).parent().siblings(".footer-thumb-item").find("img").css({"border-color":"white"});
	})


	//往右按钮
	$(".jiantou-right").click(function(){
		m++;
		if(m>2){
			m=0 ;
		}
		$(".hide-img-group").eq(m).show().siblings(".hide-img-group").hide();
		$(".table-hide-footer").find(".footer-thumb-item img").eq(m).css({"border-color":"red"}).parent().siblings(".footer-thumb-item").find("img").css({"border-color":"white"});
	})



	// 点击放大缩小
	
	var max=1;
	$(".contact-fangda").click(function(){
		$(this).parent().parent(".table-hide-header").siblings(".table-hide-list").find(".hide-list-img img").css("transform","scale("+max+")");
		max=max+0.05;
	
		var min=max;
		$(".contact-suoxiao").click(function(){
			if(min===1){
				return;
			}else{
				$(this).parent().parent(".table-hide-header").siblings(".table-hide-list").find(".hide-list-img img").css("transform","scale("+min+")");		
			}
			min=min-0.05;
		}).trigger("click");
	}).trigger("click");

	//点击按钮小图隐藏
	$(".footer-tubiao").click(function(){
		$(this).siblings(".table-hide-footer").slideToggle();
	})
	
})


// 显示三张图片的轮播
var n=0;
$(".con-left").click(function(){
	n--;
	if(n<0){
		n=2;
	}
	$("th").eq(n).show().siblings("th").hide();

})
$(".con-right").click(function(){
	n++;
	if(n>2){
		n=0;
	}
	$("th").eq(n).show().siblings("th").hide();

})