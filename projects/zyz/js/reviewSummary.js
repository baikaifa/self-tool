let activeid = getQueryString("id");
let pageNo = 1, pageSize = 20;
let getMore = true;
let totalPage;

$(function(){
    $('.headerBackImg,.headerBack').on('click',function(){
		window.history.go(-1);  //返回上一页  
		// window.location.go(-1); //刷新上一页 
	})
    $.ajax({
        cache: false,
        type: "POST",
        url: API_URL+"/active/getActiveInfo.do",
        data:{
            token : token,
            activeId: activeid
        },
        dataType: 'json',
        // async:false,
        success: function(data) {
            if(data.state == '200'){
                var data = data.data;
                $("#empName").html(data.empName);
                $("#name").html(data.name);
                $("#address").html(data.address);
                $("#data_start_hd").html(data.data_start_hd);
                $("#content").html(data.content);
                $("#projectTime").html(data.projectTime);
                $("#data_start_bm").html(data.data_start_bm);
                $("#data_end_bm").html(data.data_end_bm);
                $("#member").html(data.count + ' / ' +data.max_member);
                $("#realityTime").html(data.realityTime);
                $("#summary").html(data.summary);
                $("#titleImg").css("background-image","url('"+data.fileIndex+"')");

                //活动详情图
                var imgHtml = ""
                for(var i = 0;i<data.filelist0.length; i++){
                    imgHtml += '<div class="swiper-slide flex">';
                    imgHtml += '<img src="'+"../images/file/"+data.filelist0[i].imgName+'" onclick="hideImgs()"/>';
                    imgHtml += '</div>';
                }
                for(var i = 0;i<data.filelist1.length; i++){
                    imgHtml += '<div class="swiper-slide flex">';
                    imgHtml += '<img src="'+"../images/file/"+data.filelist1[i].imgName+'" onclick="hideImgs()"/>';
                    imgHtml += '</div>';
                }
                $(".swiper-wrapper").append(imgHtml);

            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })
    getList();
})

// 获取数据
function getList(){
    $.ajax({  // 请求菜单
        cache: false,
        type: "GET",
        url: API_URL + "/active/getMemberByActiveId.do",
        data:{
            token: token,
            activeid: activeid            
        },
		dataType: 'json',
		// async:false,
        success: function(data) {
        	if(data.state == '200'){
                renderList(data.data);
			}else{
                console.log(data.msg)
			}
        },
		error: function(request) {
			console.log('error');
        }
    }); 
}
// 渲染页面
function renderList(data){
    var listHtml = "";
    for(var j in data){
        var _data = data[j];
        for(var i = 0; i< _data.length; i ++){
            listHtml += '<p>';
            listHtml += '<span class="l1">'+_data[i].empname+'</span>';
            listHtml += '<span class="l2">'+_data[i].activeid+'</span>';
            listHtml += '<span class="l3">'+_data[i].teamname+'</span>';
            listHtml += '<span class="l4">'+_data[i].realtime+'</span>';
            listHtml += '</p>';
        }
    }
    $("#mumberContainer").append(listHtml);
}

function commit(state){
    console.log(state);
    $.ajax({
        cache: false,
        type: "POST",
        url: API_URL+"/active/examineActive.do",
        data:{
            token : token,
            activeid: activeid,
            state: state
        },
        dataType: 'json',
        // async:false,
        success: function(data) {
            if(data.state == '200'){
                showToast("审核成功");
                setTimeout(function(){
                    window.history.go(-1);
                }, 2000)
            }else{
                console.log(data.msg);
                showToast("审核失败")
            }
        },
        error: function(request) {
            console.log('error');
            showToast("审核失败")
        }
    })
}
//查看详情
function showMore(e){
    $(e).parent().removeClass("borderB").next().show();
    $(e).hide().next().show();
}
//收起详情
function hideMore(e){
    $(e).parent().addClass("borderB").next().hide();
    $(e).hide().prev().show();
}
//点击图片查看更多
function showMoreImg(){
    $(".toast").show();
    var swiper = new Swiper('.swiper-container', {});
}

function hideImgs(){
    $('.toast').hide();
}