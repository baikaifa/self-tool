const moveStop = function(e){e.preventDefault()};
let activeid = getQueryString("id");
let time=0.5,tList, delList=[], addList=[], picList=[], aList={};
let picId = 0;
let hasPic = false;

$(function(){
    $('.headerBackImg,.headerBack').on('click',function(){
		window.history.go(-1);  //返回上一页  
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
        async:false,
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
                $("#empmobile").html(data.empmobile);
                $("#mobile").html(data.mobile);
                time = data.projectTime;
                
                getListInfo();
                if(data.realityTime!=0){
                    $("#realityTime").val(data.realityTime);
                }
                if(data.summary){
                    $(".text-content").val(data.summary);
                }
                console.log(data.filelist0)
                var imgData = data.filelist0;
                if(imgData.length>0){
                    var html = "";
                    for(var i = 0;i<imgData.length;i++){
                        picList.push(imgData[i].imgName)
                        html+='<div class="imgDiv fl" id="'+imgData[i].imgId+'">';
                        // console.log("../images/file/"+imgData[i].imgName);
                        html+='<img src="'+"../images/file/"+imgData[i].imgName+'" class="addBtn"/>';
                        html+='<img src="../images/delImg.png" class="delImg" onclick="delImage('+imgData[i].imgId+', '+"'"+imgData[i].imgName+"'"+')">';
                        html+='</div>';
                    }
                    $("#imgList").append(html);
                }

            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })
})

//获取活动成员信息
function getListInfo(){
    $.ajax({
        cache: false,
        type: "GET",
        url: API_URL+"/active/getMemberByActiveId.do",
        data:{
            token : token,
            activeid: activeid
        },
        dataType: 'json',
        // async:false,
        success: function(data) {
            if(data.state == '200'){
                tList =  data.data;
                renderList(time, tList);
                renderToast(tList);
            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })
}
//获取未参与成员信息
function getAddList(){
    getListInfo();
    $.ajax({
        cache: false,
        type: "GET",
        url: API_URL+"/active/getMemberByOtherActiveid.do",
        data:{
            token : token,
            activeid: activeid
        },
        success: function(data) {
            if(data.state == '200'){
                aList = data.data;
                var conList = {}
                for(var i in aList){
                    conList[i] = aList[i].concat(tList[i])
                }
                console.log(conList)
                renderAddList(conList);
            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })
}

//小结主页面成员列表
function renderList(time, data){
    var listHtml = "";
    for(var i in data){
        var _data = data[i];
        for(var j = 0; j<_data.length; j++){
            var empTime = _data[j].realtime?Number(_data[j].realtime).toFixed(1):Number(time).toFixed(1);
            listHtml += '<p class="mumberList" id="e'+_data[j].empid+'">';
            listHtml += '<span class="l1">'+_data[j].empname+'</span>';
            listHtml += '<span class="l2">'+_data[j].sex+'</span>';
            listHtml += '<span class="l3">'+_data[j].teamname+'</span>';
            listHtml += '<span class="l4">';
            listHtml += '<span class="numBtn orange" onclick="reduceNumber(this)">─</span>';
            listHtml += '<span class="reTime" value="'+_data[j].empid+'">'+empTime+'</span>';
            listHtml += '<span class="numBtn orange" onclick="addNumber(this)">✛</span>';
            listHtml += '</span>'
            listHtml += '</p>';
        }
    }
    $("#_container").html(listHtml)
}

// var data = {A:[
//     {"empid": "867098495","empname": "常晓雪1","sex": "1","teamname": "浙江分队"},
//     {"empid": "867098496","empname": "常晓雪2","sex": "1","teamname": "浙江分队"},
//     {"empid": "867098497","empname": "常晓雪3","sex": "1","teamname": "浙江分队"},
//     ]}
// renderToast(data);
// renderList(time, data);
// renderAddList(data);

//弹层页面成员列表
function renderToast(data){
    var html = "";
    for(var i in data){
        var _data = data[i];
        for(var j = 0;j<_data.length; j++){
            html += '<li class="oneLine flex borderB" id="'+_data[j].empid+'" flag="off">';
            html += '<div class="first_circle" onclick=chooseMumber('+_data[j].empid+')>';
            html += '<img src="../images/chooseBtn.png" alt="" class="chooseBg">';
            html += '<img src="../images/hasChoose.png" alt="" class="chosen">';
            html += '</div>';
            html += '<div class="nname">'+_data[j].empname+'</div>';
            html += '<div class="ggender">'+_data[j].sex+'</div>';
            html += '<div class="troops">'+_data[j].teamname+'</div>';
            html += '</li>';
        }
    }
    $(".tList").html(html);
}

//添加人员弹窗列表
function renderAddList(data){
    var html = "";
    for(var i in data){
        var _data = data[i];
        html += '<div id="'+i.toUpperCase()+'"></div>';
        for(var j = 0;j<_data.length; j++){
            html += '<li class="oneLine flex" id="a'+_data[j].empid+'" flag="off">';
            if(!_data[j].activeid){
                html += '<div class="first_circle _circle" onclick=chooseAddMumber('+_data[j].empid+')>';
                html += '<img src="../images/chooseBtn.png" alt="" class="chooseBg">';
                html += '<img src="../images/hasChoose.png" alt="" class="chosen">';
                html += '</div>';
                html += '<div class="nname">'+_data[j].empname+'</div>';
                html += '<div class="ggender">'+_data[j].sex+'</div>';
                html += '<div class="troops">'+_data[j].teamname+'</div>';
            }else{
                html += '<div class="first_circle _circle">';
                html += '<img src="../images/chooseBtn.png" alt="" class="chooseBg">';
                html += '</div>';
                html += '<div class="nname dis">'+_data[j].empname+'</div>';
                html += '<div class="ggender dis">'+_data[j].sex+'</div>';
                html += '<div class="troops dis">'+_data[j].teamname+'</div>';
            }
            html += '</li>';
        }
    }
    $(".aList").html(html);
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
//查看人员详情
function showMoreM(e){
    $(e).hide().next().show();
    $("#mumberContainer").show();
    $("#mumberTitle, .changeMem1").hide();
}
//收起人员详情
function hideMoreM(e){
    $(e).hide().prev().show();
    $("#mumberTitle, .changeMem1").show();
    $("#mumberContainer").hide();
}
//删除图片
function delImage(picId, fileName){
//	$("#"+picId).remove();
//    picList.splice($.inArray(fileName, picList), 1);
    $.ajax({
        cache: false,
        type: "POST",
        url: API_URL+"/active/deletePic.do",
        data: {
            token: token,
            fileName: fileName
        },
        success: function(data){
            if(data.state == '200'){
            	$("#"+picId).remove();
                picList.splice($.inArray(fileName, picList), 1);
            }else{
                showToast("删除失败");
            }
        }
    })
}
//减少时长0.5
function reduceNumber(e){
    // console.log($(e).next().attr("value"))
    var num = Number($(e).next().html());
    if(num < 1){
        showToast("已到最小时长")
        return
    }
    num = num - 0.5;
    $(e).next().html(num.toFixed(1))
}
//增加时长0.5
function addNumber(e){
    var num = Number($(e).prev().html());
    num = num + 0.5;
    $(e).prev().html(num.toFixed(1))
}
// 字数限制
$('.text-content').keyup(function() {
	var len=this.value.length;
	$('.text-count').html(len+"/300");
})
//调整成员页面
function changeMember(){
    $(".changeMumber").show();
    document.body.style.overflow='hidden';//关闭滚动条
    document.addEventListener("touchmove",moveStop,false);
}
//增加人员弹窗
function addP(){
    getAddList();
    addList = [];
    $('.allMumber').show();
}
//选择要增加的人员
function chooseAddMumber(e){
    var dom = $("#a"+e+" .chosen");
    var flag = $("#a"+e).attr("flag");
    console.log(flag)
    if(flag=="off"){ //增加
        dom.show();
        $("#a"+e).attr("flag", "on");
        addList.push(e);
        console.log(addList);
    }else if(flag=="on"){  //取消增加
        dom.hide();
        $("#a"+e).attr("flag", "off");
        addList.splice($.inArray(e, addList), 1);
        console.log(addList)
    }
}
//增加人员确认
function addConfirm(){
    if(addList.length){
        $.ajax({
            cache: false,
            type: "GET",
            url: API_URL+"/active/addMember.do",
            data:{
                token : token,
                empid: addList.join(","),
                activeid: activeid
            },
            success: function(data) {
                if(data.state == '200'){
                    getListInfo();
                    showToast("添加成功");
                    setTimeout(function(){
                        $('.allMumber').hide();
                    }, 2000)
                }else{
                    showToast("添加失败");
                    setTimeout(function(){
                        $('.allMumber').hide();
                    }, 2000)
                }
            },
            error: function(request) {
                console.log('error')
            }
        })
    }else{
        $('.allMumber').hide();
    }
}

//关闭人员调整页面
$('.toastBackImg,.toastBack').on('click',function(){
    $(".changeMumber").hide();
    document.body.style.overflow='';//出现滚动条
    document.removeEventListener("touchmove",moveStop,false);
    delList = [];
})
//首字母定位
function toName(e){
    var id = $(e).attr("value");
    document.getElementById(id).scrollIntoView();

    $(e).siblings().removeClass("redB");
    $(e).addClass("redB");
}
//选择要删除的人员
function chooseMumber(e){
    var dom = $("#"+e+" .chosen");
    var flag = $("#"+e).attr("flag");
    console.log(flag)
    if(flag=="off"){ //删除
        dom.show();
        $("#"+e).attr("flag", "on");
        delList.push(e);
        console.log(delList);
    }else if(flag=="on"){  //取消删除
        dom.hide();
        $("#"+e).attr("flag", "off");
        delList.splice($.inArray(e, delList), 1);
        console.log(delList)
    }
}
//删除所选人员
function delChosen(){
    if(delList.length){
        $.ajax({
        cache: false,
        type: "GET",
        url: API_URL+"/active/deleteMembers.do",
        data:{
            token : token,
            activeid: activeid,
            empids: delList.join(",")
        },
        dataType: 'json',
        // async:false,
        success: function(data) {
            if(data.state == '200'){
                showToast("删除成功");
                for(var i = 0;i<delList.length;i++){
                    $("#"+delList[i]).remove();//弹窗内成员删除
                    $("#e"+delList[i]).remove();//编辑页面成员删除
                }
            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })
    }else{
        showToast("请选择删除人员");
        return
    }
}

function addphotohtmls(){
    $("#btnFile").click()
}

//提交详情图
function onChangFiles(){
	if(hasPic){return}
	hasPic = true;
    var picNum = parseInt($("#picsnum").val());
    var reader = new FileReader(); // 声明一个FileReader实例
  var file = document.getElementById('btnFile').files[0]
	jQuery.ajaxSettings.traditional = true;
	$.ajaxFileUpload({
        url : API_URL + "/active/userAttachmentUpload.do?token="+token,
        secureuri : false,// 安全协议
        fileElementId : 'btnFile',// id
        type : 'POST',
        dataType : 'text',
        data : {},
        async : false,
        success : function(data) {
            if (data.indexOf("{") != -1) {
                data = data.substring(data.indexOf("{"), data.indexOf("}") + 1);
                // console.log(data);
            }
            // data = JSON.parse(data);
            // console.log(data)
            console.log('ssssssssssssssssss');
            imgName1 = data.indexOf('"imgName":"')+11;
            imgName2 = data.indexOf('","imgPath"');
            imgName = data.substring(imgName1, imgName2);
            imgPath1 = data.indexOf('"imgPath":"')+11;
            imgPath2 = data.indexOf('","imgOldName"');
            imgPath = data.substring(imgPath1, imgPath2);
            // file = imgPath+imgName;
            // console.log(imgName, imgPath)
            file = '../images/file/' + imgName + ''
            var html = "";
            html+='<div class="imgDiv fl" id="'+picId+'">';
            // console.log(file);
            html+='<img src="'+file+'" class="addBtn"/>';
            html+='<img src="../images/delImg.png" class="delImg" onclick="delImage('+picId+', '+"'"+imgName+"'"+')">';
            html+='</div>';
            picList.push(imgName);
            $("#imgList").append(html)
            console.log(picList)
            picId++;
            hasPic = false;
        },
        error : function(data) {
            // console.log(data);
            console.log('eeeeeeeeeeeeeeeeee')
        }
    });
}

function saveBtn(){
    var summary = $(".text-content").val();
    var realityTime = $("#realityTime").val();
    var fileList1 = picList.join(",");
    if(isEmpty(summary)||isEmpty(realityTime)||isEmpty(fileList1)){
        showToast("请完善小结信息")
    }
    var activeInfo = {
        id: activeid,
        summary: summary,
        realityTime: realityTime,
        fileList1: fileList1
    };
    var memberList = []
    $(".mumberList").each(function(){
        var newObj = {
            empid: ($(this).attr("id")).replace("e",""), //员工id "e123456"
            activeid: activeid,
            realtime: $(this).children(".l4").children('.reTime').html()
        }
        memberList.push(newObj);
    })
    console.log(activeInfo, memberList)
    
    $.ajax({
        cache: false,
        type: "POST",
        url: API_URL+"/active/updateSubmitActive.do",
        data:{
            token:token,
            activeInfo: JSON.stringify(activeInfo),
            memberList: JSON.stringify(memberList)
        },
        success: function(data){
            if(data.state==200){
                showToast("保存成功");
                setTimeout(function(){
                    $('.headerBack').click()
                }, 2000)
            }else{
                showToast("保存失败");
                setTimeout(function(){$("#myToast").hide();}, 2000)
            }
        }
    })
}