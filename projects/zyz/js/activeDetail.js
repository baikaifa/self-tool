let from = getQueryString("from"); //join 显示我要参加按钮
let activeid = getQueryString("id");
let empid, empname;
$(".toast").hide();

$(function(){
    $('.headerBackImg,.headerBack').on('click',function(){
		window.history.go(-1);  //返回上一页  
		// window.location.go = -1; //刷新上一页 
	})
    if(from!=="join"){
        $(".bottomBtn").hide()
    }

    //获取个人id
    $.ajax({
        cache: false,
        type: "GET",
        url: API_URL+"/user/getPerson.do",
        data:{
            token : token,
        },
        dataType: 'json',
        // async:false,
        success: function(data) {
            if(data.state == '200'){
                empid = data.data.info.empid;
                empname = data.data.info.empName;
            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })

    // 获取活动信息
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
                $("#member").html(data.count+' / '+data.max_member);
                $("#realityTime").html(data.realityTime);
                $("#summary").html(data.summary);
                $("#titleImg").css("background-image","url('"+data.fileIndex+"')");
                $("#empmobile").html(data.empmobile);
                $("#mobile").html(data.mobile);

                //活动详情图
                var imgList = data.filelist0;
                var imgHtml = ""
                console.log(imgList);
                for(var i = 0;i<imgList.length; i++){
                    imgHtml += '<div class="swiper-slide flex">';
                    // imgHtml += '<img src="'+imgList[i].imgPath+imgList[i].imgName+'" onclick="hideImgs()"/>';
                    imgHtml += '<img src="'+"../images/file/"+imgList[i].imgName+'" onclick="hideImgs()"/>';
                    imgHtml += '</div>';
                }
                $(".swiper-wrapper").append(imgHtml);

                //成员
                var empList = data.empActive;
                $("#mumberContainer")


            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })

    //点击图片查看更多
    $("#titleImg").on('click', function(){
        $(".toast").show();
        var swiper = new Swiper('.swiper-container', {});
    })
    
    $('.toast').on('click', function(){
        $('.toast').hide();
    })

    $(".joinBtn").on('click', function(){
        $.ajax({
            cache: false,
            type: "GET",
            url: API_URL+"/active/addMember.do",
            data:{
                token : token,
                empid: empid,
                empname: empname,
                activeid: activeid
            },
            dataType: 'json',
            // async:false,
            success: function(data) {
                if(data.state == '200'){
                    showToast(data.msg)
                }else{
                    console.log(data.msg);
                }
            },
            error: function(request) {
                console.log('error')
            }
        })
    })
})