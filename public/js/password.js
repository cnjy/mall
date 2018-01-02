//邮箱
function emails(){
	if($("#email").val()==""){
		$("#email").siblings(".panduan").text("*请输入邮箱");
		return false;
	}
	else if($("#email").val().match(/^[\w-]+@[\w-]+(\.\w+){1,3}$/) === null){
		$("#email").siblings(".panduan").text("*邮箱格式不正确");
		return false;
	}
	else{
		$("#email").siblings(".panduan").text(" ");
		return true;
	}
}
//验证码
$(".btn-info").click(function(){
	if(($("#email").val()=="")&&($("#yanzheng").val()=="")){
		$(".panduan").html("此项不能为空");
	}
	
});

function find(){
		return emails()&&yanzhengs();
}