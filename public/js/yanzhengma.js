//验证码
    var anum=[["RACK"],["R75G"],["iPKQ"],["Q96Q"],["55BJ"],["NIPM"],["22KB"],["S2MA"],["5AM7"],["P2LL"],["RQR4"]];
    var address=[["/images/about/m1.png"],
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
   		 var src=address[shuzi];
    	$("#yzm img").attr("src",src);

    	$("#yzm img").click(function(){
			var shuzi2=Math.floor(Math.random()*10)
			var src=address[shuzi2];
			$(this).attr("src",src);
			shuzi=shuzi2;
		})

function yanzhengs(){
	if($("#yanzheng").val()==""){
		$("#yanzheng").siblings(".panduan").text("*请输入验证码");
		return false;
	}
	else if($("#yanzheng").val().toString().toLowerCase()!=anum[shuzi].toString().toLowerCase()){
		$("#yanzheng").siblings(".panduan").text("*验证码错误");
		return false;
	}
	else if($("#yanzheng").val().trim().toString().toLowerCase()==anum[shuzi].toString().toLowerCase()){
		$("#yanzheng").siblings(".panduan").text(" ");
		return true;
	}
}