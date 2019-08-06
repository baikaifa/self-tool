var token = getQueryString('token')?getQueryString('token'):token;
console.log(token)
var marginHeight = $('header').outerHeight();
$(".contentCommon").css({"margin-top":marginHeight});

if(token){
	if(!window.localStorage){
		console.log("浏览器不支持localstorage");
	}else{
		window.localStorage.setItem('token', token);
	}
}

$(function(){
	$('.headerBackImg,.headerBack').on('click',function(){
		window.history.go(-1);  //返回上一页  
//		window.location.go(-1); //刷新上一页 
	})
	$.ajax({  // 请求菜单
        cache: false,
        type: "GET",
        url: API_URL+"/work/getEmpMenu.do",
        data:{token : token},
		dataType: 'json',
		// async:false,
        success: function(data) {
        	if(data.state == '200'){
				console.log('index 菜单列表',data.data);
				render(data.data)
			}else{
                console.log(data.msg)
			}
        },
		error: function(request) {
			console.log('error');
        }
	}); 
})

//渲染页面
function render(data){
	var html = "";
	for(var i = 0; i < data.length; i ++){
		if(data[i].firstName=="后台管理"){//暂不开发
			continue
		}
		if(i==0){
			html += '<div class="select tabMenu font16" onclick=changeTab(this,'+i+')>'+data[i].firstName+'</div>';
		}else{
			html += '<div class="tabMenu font16" onclick=changeTab(this,'+i+')>'+data[i].firstName+'</div>';
		}
		var innerH = "";
		var data1 = data[i].secondMenu;
		innerH += '<div class="tabContent" id="'+i+'">';
		for(var j = 0; j<data1.length; j++){
			innerH += '<div class="innerTab">'
			innerH += '<div class="innerTitle font14">'+data1[j].secondName+'</div>';
			innerH += '<div class="innerContent">';
			var data2 = data1[j].menu;
			for(var k = 0; k < data2.length; k++){
				innerH += '<div class="inners">';
				if(data2[k].name == "分队信息"||data2[k].name == "分队统计"||data2[k].name == "意见反馈"||data2[k].name == "消息通知" ){ //暂不开发
					innerH += '<a onclick="noneToast()">';
				}else{
					innerH += '<a href="'+data2[k].url+'">';
				}
				innerH += '<div class="imgCon" id="small_tabs" style="background-image:url('+"'"+data2[k].icon+"'"+')"></div>';
				innerH += '<div class="imgCon"></div>';
				innerH += '</a>';
				innerH += '<div class="font13 tCenter">'+data2[k].name+'</div>';
				innerH += '</div>';
			}
			innerH += '</div>';
			innerH += '</div>';
		}
		innerH += '</div>';
		$("#content").append(innerH);
	}
	$(".menus").html(html);
	$('#0').show();
}

//切换分页内容
function changeTab(e,id){
	// console.log($(e))
	$(e).siblings().removeClass("select");
	$(e).addClass("select");
	$(".tabContent").hide();
	$('#'+id).show();
}

function noneToast(){
	showToast("功能正在开发中")
}
