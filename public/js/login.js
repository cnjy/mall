//管理员登录
$(function(){
	$('.admin').click(function(){
		// $.getJSON('http://127.0.0.1:3000', (data)=>{})
	})
})

// 登录页面的正则验证

//验证会员名
function user(){
	if($("#username").val()==""){
		$("#username").siblings(".panduan").text("*请输入会员名");
		return false;
	}
	else if($("#username").val().search(/^\w{4,12}$/)===-1){
		$("#username").siblings(".panduan").text("*会员名格式是4~12位数字、字母、下划线");
		return false;
	}
	else{
		$("#username").siblings(".panduan").text(" ");
		return true;
	}
}
//验证密码
function pwds(){
	if($("#pwd").val()==""){
		$("#pwd").siblings(".panduan").text("*请输入密码");
		return false;
	}
	else if($("#pwd").val().match(/^[\w]{6,18}$/) === null){
		$("#pwd").siblings(".panduan").text("*密码长度应是6~18位");
		return false;
	}
	else{
		$("#pwd").siblings(".panduan").text(" ");
		return true;
	}


} 

$(".btn-info").click(function(){
	if(($("#username").val()=="")&&($("#pwd").val()=="")){
		$(".panduan").html("此项不能为空");
	}
});

function denglu(){
	if(user()&&pwds()){
		let name = $('#username').val();
		let pwd = $('#pwd').val();
		let toLogin = sessionStorage.getItem('toLogin');
		let isNo = sessionStorage.getItem('isNo');
		if(isNo == 0){
			alert('用户已登录');
			window.location.href = '/personal';
		}
		$.post('/login', {
			name: name,
			password: pwd
		}, function(data){
			if(data.m == 0){
				alert(data.msg);
			}else{
				sessionStorage.setItem('userID', data.id);
				sessionStorage.setItem('isNo', 0);
				if(toLogin == 'true'){
					window.location.href = '/shopCart';
				}else{
                    window.location.href = '/personal';
				}
			}
		})
	}
	return user()&&pwds();
}

// 点击密码是否可见

// 看见

$(".glyphicon-eye-close").click(function(){
	console.log($(this).siblings(".mima_dd").val())
	$(this).hide().siblings(".glyphicon-eye-open").show();
	$(this).siblings(".mima_dd").hide();
	$(this).siblings(".mima_wz").show();
	
	$(this).siblings(".mima_wz").val($(this).siblings(".mima_dd").val());

	
});
//看不见
$(".glyphicon-eye-open").click(function(){
	$(this).hide().siblings(".glyphicon-eye-close").show();
	$(this).siblings(".mima_wz").hide();
	$(this).siblings(".mima_dd").show();
	$(this).siblings(".mima_dd").val($(this).siblings(".mima_wz").val());
});