//会员名
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

//密码
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

//重复密码
function repwds(){
	if($("#repwd").val()==""){
		$("#repwd").siblings(".panduan").text("*请再一次输入密码");
		return false;
	}
	else if($("#repwd").val()!=$("#pwd").val()){
		$("#repwd").siblings(".panduan").text("*两次密码不一致");
		return false;
	}
	else{
		$("#repwd").siblings(".panduan").text(" ");
		return true;
	}
}

//验证码
$(".btn-info").click(function(){
	if(($("#username").val()=="")&&($("#email").val()=="")&&($("#pwd").val()=="")&&($("#repwd").val()=="")&&($("#yanzheng").val()=="")){
		$(".panduan").html("此项不能为空");
	}
	
})

function zhuce(){
	if(user()&&emails()&&pwds()&&repwds()&&yanzhengs()){
		let name = $('#username').val();
		let email = $('#email').val();
		let password = $('#pwd').val();
        let time = new Date();
        let id = time.getTime();
        sessionStorage.setItem('userID', id);
		let userMessage = {
			id: id,
			name: name,
			email: email,
			password: password,
			grade: '普通VIP'
		};
		$.post('/register', userMessage, function(data){
			console.log(data);
			if(data.m == 0){
				alert(data.msg);
			}else{
				window.location.href = '/login';
			}
		})
	}
	return user()&&emails()&&pwds()&&repwds()&&yanzhengs();
}

