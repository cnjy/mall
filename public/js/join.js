// PHP技术支持点击展开和点击收缩

$(".join-php").click(function(){
	$(this).siblings(".join-hide").slideToggle();
	console.log($(".join-php"));
	$(this).children(".glyphicon-chevron-up").toggle();
	$(this).children(".glyphicon-chevron-down").toggle();



	// 主要工作里面的立即申请
	$(".join-hide-btn").click(function(){
		$(this).parentsUntil(".join-hide").siblings(".join-box-up").show();
		
			// 打开立即申请之后关闭
			$(".apply-close-span").click(function(){
				$(".join-box-up").hide();
			})
	})
});


// 点开立即申请
$(".join-btn").click(function(){
	$(this).siblings(".join-box-up").show();	
})
// 打开立即申请之后关闭
$(".apply-close-span").click(function(){
	$(".join-box-up").hide();
	$(this).parentsUntil(".container").parent("body").css("overflow-y","none")

})




function readFile(inputObj){
	//获取file对象
	let fileObj = inputObj.files[0];
	let html="文件名："
	html = fileObj.name;
	document.getElementById("text-name").innerHTML=html;	
	// console.log(document.getElementById("text-name").innerHTML=html)
}
