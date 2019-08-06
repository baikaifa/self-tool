var type = getQueryString('type');
var token = getQueryString('token')?getQueryString('token'):token;
// 注册页面和个人信息调用不同接口
// sign -> 注册页面
var marginHeight = $('header').outerHeight();
$(".contentCommon").css({"margin-top":marginHeight});
let iszyzbefore,teamid,teamname,goodactiv,empid;
let idno,idnoS,mobile,mobileS;
let idS = true;
let mobS = true;
let params = {};

$(function(){
	$('.headerBackImg,.headerBack').on('click',function(){
		window.history.go(-1);  //返回上一页 
	})
	if(type=="sign"){
		$(".sBtn").hide();
		$.ajax({  // 请求个人信息
			cache: false,
			type: "GET",
			url: API_URL+"/user/getEorPerson.do",
			data:{token : token},
			dataType: 'json',
			// async:false,
			success: function(data) {
				if(data.state == '200'){
					var data = data.data;
					params.id = data.id;
					params.empid = data.empid;
					params.empName = data.empName;
					params.sex = data.sex;
					params.idType = data.idType;
					params.idno = data.idno;
					params.hiredate = data.hiredate;
					params.leavedate = isEmpty(data.leavedate)?null:data.leavedate;
					params.mobile = data.mobile;
					params.partyname = data.partyname;
					params.educationName = data.educationName;
					params.teamid = data.teamid;
					params.iszyzbefore = data.iszyzbefore;
					params.goodactiv = data.goodactiv;
					params.isleave = data.isleave;
					params.role = data.role;
					// console.log(params);
					var name = data.empName+"<img class='sexImg' src='../images/"+(data.sex==="女"?"female.png":"male.png")+"'/>";
					$("#name").html(name);
					$("#empid").html(data.empid);
					$("#idType").html(data.idType);
					$("#hiredate").html(data.hiredate.split(" ")[0]);
					$("#partyname").html(data.partyname);
					$("#educationName").html("学历："+data.educationName);
					
					$("#idno").html(data.idno);
					$("#mobile").html(data.mobile);
					
					iszyzbefore = data.iszyzbefore;
					teamid = data.teamid;
					goodactiv = data.goodactiv;
					empid = data.empid;
					if(!isEmpty(iszyzbefore)&&iszyzbefore==0){  //是否参加过志愿者服务
						$(".hasNot .chosen").show()
					}else if(!isEmpty(iszyzbefore)){
						$('.has .chosen').show()
					}
					getTeamList(teamid)
				}else{
					console.log(data)
				}
			},
			error: function(request) {
				console.log('error')
			}
		}); 
	}else{
		$(".choose, .chooseImg").hide();
		$.ajax({  // 请求个人信息
			cache: false,
			type: "GET",
			url: API_URL+"/user/getPerson.do",
			data:{token : token},
			dataType: 'json',
			// async:false,
			success: function(data) {
				if(data.state == '200'){
					var data = data.data;
					var name = data.info.empName+"<img class='sexImg' src='../images/"+(data.info.sex==="女"?"female.png":"male.png")+"'/>";
					$("#name").html(name);
					$("#empid").html(data.info.empid);
					$("#idType").html(data.info.idType);
					$("#hiredate").html(data.info.hiredate.split(" ")[0]);
					$("#partyname").html(data.info.partyname);
					$("#educationName").html("学历："+data.info.educationName);
					$(".text-content").html(data.info.goodactiv);
					idno = data.info.idno;
					idnoS = data.idnoS;
					mobile = data.info.mobile;
					mobileS = data.mobileS;
					$("#idno").html(idnoS);
					$("#mobile").html(mobileS)
					empid = data.info.empid;
					iszyzbefore = data.info.iszyzbefore;
					teamid = data.info.teamid;
					goodactiv = data.info.goodactiv;
					if(!isEmpty(iszyzbefore)&&iszyzbefore==0){  //是否参加过志愿者服务
						$(".hasNot .chosen").show()
					}else if(!isEmpty(iszyzbefore)){
						$('.has .chosen').show()
					}
					getTeamList(teamid)
				}else{
					console.log(data)
				}
			},
			error: function(request) {
				console.log('error')
			}
		}); 
		
	}
})

$(".idNum").off("click").on("click",function(){
	if(idS){
		$("#idno").html(idno);
		$(this).attr("src", '../images/eyeOpen.png');
	}else{
		$("#idno").html(idnoS);
		$(this).attr("src", '../images/eyeClose.png');
	}
	idS = !idS;
	console.log(idS)
})

$(".mNum").off("click").on("click",function(){
	if(mobS){
		$("#mobile").html(mobile);
		$(this).attr("src", '../images/eyeOpen.png');
	}else{
		$("#mobile").html(mobileS);
		$(this).attr("src", '../images/eyeClose.png');
	}
	mobS = !mobS;
})

// 字数限制
$('.text-content').keyup(function() {
	var len=this.value.length;
	$('.text-count').html(len+"/100");
})

$(".has").off("click").on('click',function(){
	if(iszyzbefore==1){
		return
	}else{
		$(".chosen").hide();
		$(".has .chosen").show();
		iszyzbefore = 1;
	}
})

$(".hasNot").off("click").on('click',function(){
	if(iszyzbefore==0){
		return
	}else{
		$(".chosen").hide();
		$(".hasNot .chosen").show();
		iszyzbefore = 0;
	}
})

// 显示选择分队弹层
$(".chooseImg, .choose").off("click").on("click", function(){
	$(".teamToast").show()
})

// 选择分队
$('body').on("click", ".teamLists", function(){
	console.log(12312312,$(this).children(".chosen"))
	$(".teamLists .chosen").hide();
	$(this).children(".chosen").show();
	teamid = $(this).attr("id");
	params.teamid = $(this).attr("id");
	teamname = $(this).next().html();
	console.log('teamid:',params);
})

// 分队选择确认按钮
$(".confirmTeam").off("click").on("click", function(){
	$(".teamToast").hide();
	$("#teamid").html(teamname);
})

// 提交个人信息
$("#commitBtn").off("click").on("click", function(){
	goodactiv = $(".text-content").val();
	params.iszyzbefore = iszyzbefore;
	params.goodactiv = goodactiv;
	params.empid = empid;
	if(type == "sign"){
		if(isEmpty(iszyzbefore)||isEmpty(teamid)||isEmpty(goodactiv)){
			showToast('请完善补充信息') ;
			return
		}
	}else{
		if(isEmpty(iszyzbefore)||isEmpty(goodactiv)){
			showToast('请完善补充信息') ;
			return
		}
	}
	$.ajax({
		cache: false,
		type: "POST",
		url: API_URL+"/user/insertEmp.do",
		data:{
			token : token,
			params: JSON.stringify(params)
		},
		dataType: 'json',
		// async:false,
		success: function(data) {
			if(data.state == '200'){
				if(type == "sign"){
					$(".succToast").show()
				}else{
					showToast('修改成功');
					setTimeout(function(){window.location="index.html"},2000);
				}
			}else{
				showToast("注册失败");
				console.log(data.msg);
			}
		},
		error: function(request) {
			showToast("注册失败");
			console.log('error')
		}
	})
})

// 注册成功
$("#succBtn").off("click").on("click",function(){
	window.location="index.html?token="+token;
})

// 获取分队信息
function getTeamList(tid){
	$.ajax({
		cache: false,
		type: "GET",
		url: API_URL+"/user/getCompany.do",
		data:{token : token},
		dataType: 'json',
		// async:false,
		success: function(data) {
			if(data.state == '200'){
				var data = data.data;
				var html = "";
				for(var i = 0; i < data.length; i++){
					if(!isEmpty(tid)&&tid==data[i].id){
						$("#teamid").html(data[i].name)
					}
					html += '<div style="line-height: 2.5;display: -webkit-box;display: -webkit-flex;display:flex;align-items:center">'
					html += '<div class="selectBtn teamLists" id='+data[i].id+'>';
					html += '<img src="../images/chooseBtn.png" class="chooseBg">';
					html += '<img src="../images/hasChoose.png" class="chosen">';
					html += '</div>';
					html += '<span>'+data[i].name+'</span>';
					html += '</div>';
				}
				$(".teamList").html(html)
			}else{
				console.log(data.msg)
			}
		},
		error: function(request) {
			console.log('error')
		}
	})
}