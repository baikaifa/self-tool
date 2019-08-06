var token = getQueryString('token');

if(!window.localStorage){
	console.log("浏览器不支持localstorage");
}else{
	window.localStorage.setItem('token', token);
}

//跳转到注册页面
$('#toSign').on('click',function(){
	window.location="personalInfo.html?type=sign&token="+token;
})