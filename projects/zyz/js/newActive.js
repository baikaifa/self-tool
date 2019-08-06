let DateTimePicker = window.DateTimePicker;
let options = {
    lang: 'zh-CN', // 语言，默认 'EN' ，默认 'EN', 'zh-CN' 可选
    format: 'yyyy-MM-dd', // 格式， 'yyyy-MM-dd'
};
let joinStart = "";
let joinEnd = "";
let empid, teamid;
let ndate = new Date();
let nyear = ndate.getFullYear();
let nmonth = ndate.getMonth() + 1;
let nday = ndate.getDate();
let bM, bD, bH = 0,bMi = 0; //活动开始月,日,时,分
let eM, eD, eH = 23,eMi = 59; //活动结束月,日,时,分
let picList = [],picTitle = "";
let picId = 0;

$(function () {
    $('.headerBackImg,.headerBack').on('click', function () {
        window.history.go(-1); //返回上一页  
    })
    $.ajax({
        cache: false,
        type: "GET",
        url: API_URL + "/user/getPerson.do",
        data: {
            token: token
        },
        dataType: 'json',
        // async:false,
        success: function (data) {
            if (data.state == '200') {
                var data = data.data;
                var phone = data.info.mobile;
                $(".phoneNum").html(phone);
                empid = data.info.empid;
                teamid = data.info.teamid;
            } else {
                console.log(data.msg);
            }
        },
        error: function (request) {
            console.log('error')
        }
    })
})

// 字数限制
$('.text-content').keyup(function () {
    var len = this.value.length;
    $('.text-count').html(len + "/300");
})

function addphotohtml() {
    $("#btnFile").click()
}

function addphotohtmls() {
    $("#btnFiles").click()
}
//提交封面图
function onChangFile() {
    var picNum = parseInt($("#picsnum").val());
    var reader = new FileReader(); // 声明一个FileReader实例
    var file = document.getElementById('btnFile').files[0];
    jQuery.ajaxSettings.traditional = true;
    $.ajaxFileUpload({
        url: API_URL + "/active/userAttachmentUpload.do?token=" + token,
        secureuri: false, // 安全协议
        fileElementId: 'btnFile', // id
        type: 'POST',
        dataType: 'text',
        data: {},
        async: false,
        success: function (data) {
            if (data.indexOf("{") != -1) {
                data = data.substring(data.indexOf("{"), data.indexOf("}") + 1);
            }
            // data = JSON.parse(data);
            // console.log(data)
            // console.log('ssssssssssssssssss');
            imgName1 = data.indexOf('"imgName":"') + 11;
            imgName2 = data.indexOf('","imgPath"');
            imgName = data.substring(imgName1, imgName2);
            imgPath1 = data.indexOf('"imgPath":"') + 11;
            imgPath2 = data.indexOf('","imgOldName"');
            imgPath = data.substring(imgPath1, imgPath2);
            // file = imgPath + imgName;
            // console.log(imgName, imgPath)
            file = '../images/file/' + imgName + ''
            var html = "";
            html += '<div class="imgDiv fl" id="' + picId + '">';
            html += '<img src="' + file + '" class="addBtn"/>';
            html += '<img src="../images/delImg.png" class="delImg" onclick="delTImage(' + picId + ', ' + "'" + imgName + "'" + ')">';
            html += '</div>';
            picTitle = String(file);
            $("#imgList").append(html);
            $(".addTImg").hide()
            console.log(picTitle)
            picId++;
        },
        error: function (data) {}
    });
}
//提交详情图
function onChangFiles() {
    var picNum = parseInt($("#picsnum").val());
    var reader = new FileReader(); // 声明一个FileReader实例
    var file = document.getElementById('btnFile').files[0]
    jQuery.ajaxSettings.traditional = true;
    $.ajaxFileUpload({
        url: API_URL + "/active/userAttachmentUpload.do?token=" + token,
        secureuri: false, // 安全协议
        fileElementId: 'btnFiles', // id
        type: 'POST',
        dataType: 'text',
        data: {},
        async: false,
        success: function (data) {
            if (data.indexOf("{") != -1) {
                data = data.substring(data.indexOf("{"), data.indexOf("}") + 1);
            }
            // data = JSON.parse(data);
            console.log(data)
            console.log('ssssssssssssssssss');
            imgName1 = data.indexOf('"imgName":"') + 11;
            imgName2 = data.indexOf('","imgPath"');
            imgName = data.substring(imgName1, imgName2);
            imgPath1 = data.indexOf('"imgPath":"') + 11;
            imgPath2 = data.indexOf('","imgOldName"');
            imgPath = data.substring(imgPath1, imgPath2);
            file = imgPath + imgName;
            console.log(imgName, imgPath);
            console.log(typeof file);
            file = '../images/file/' + imgName + ''
            var html = "";
            html += '<div class="imgDiv fl" id="' + picId + '">';
            html += '<img src="' + file + '" class="addBtn"/>';
            html += '<img src="../images/delImg.png" class="delImg" onclick="delImage(' + picId + ', ' + "'" + imgName + "'" + ')">';
            html += '</div>';
            $("#imgLists").append(html);
            picList.push(String(imgName));
            console.log(picList)
            picId++;
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function delTImage(picId, imgName) {
//	$("#" + picId).remove();
//    $(".addTImg").show();
//    picTitle = "";
    $.ajax({
        cache: false,
        type: "POST",
        url: API_URL+"/active/deletePic.do",
        data: {
            token: token,
            fileName: imgName
        },
        success: function(data){
            if(data.state == '200'){
                $("#" + picId).remove();
                $(".addTImg").show();
                picTitle = "";
            }else{
                showToast("删除失败");
            }
        }
    })
}

function delImage(picId, imgName) {
//    $("#" + picId).remove();
//    if ($.inArray(imgName, picList) != -1) {
//        picList.splice($.inArray(imgName, picList), 1);
//    }
//    console.log(picList);
    $.ajax({
        cache: false,
        type: "POST",
        url: API_URL+"/active/deletePic.do",
        data: {
            token: token,
            fileName: imgName
        },
        success: function(data){
            if(data.state == '200'){
                $("#" + picId).remove();
                if ($.inArray(imgName, picList) != -1) {
                    picList.splice($.inArray(imgName, picList), 1);
                }
                console.log(picList);
            }else{
                showToast("删除失败");
            }
        }
    })
}
//只允许输入数字
function regNum(e) {
    var data = $(e).val();
    $(e).val(data.replace(/[^\d]/g, ''));
}
//对应月份的天数
function dateNum(year, month) {
    switch (Number(month)) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31
        case 4: case 6: case 9: case 11:
            return 30
        case 2:
        if (year % 400 == 0) {
            return 29
        } else if (year % 100 == 0) {
            return 28
        } else if (year % 4 == 0) {
            return 29
        } else {
            return 28
        }
    }
}
//活动开始日期
function regBM(e) {
    regNum(e);
    var val = $(e).val()
    if (val > 12) {
        showToast("请输入正确月份");
        $(e).val(12)
    }
    if (val < 1) {
        showToast("请输入正确月份");
    }
}

function regBD(e) {
    regNum(e);
    var val = $(e).val()
    if (!$("#beginMonth").val()) {
        showToast("请选择月份");
        $(e).val("")
    }
    var day = dateNum(nyear, $("#beginMonth").val());
    if (val > day) {
        showToast("请输入正确日期");
        $(e).val(day)
    }
    if (val < 1) {
        showToast("请输入正确日期");
        $(e).val("")
    }
}

function regBH(e) {
    regNum(e);
    var val = $(e).val()
    if (val > 23) {
        showToast("请输入正确时间");
        $(e).val(23)
    }
}

function regBMi(e) {
    regNum(e);
    var val = $(e).val()
    if (val > 59) {
        showToast("请输入正确时间");
        $(e).val(59)
    }
}

//活动结束日期
function regEM(e) {
    regNum(e);
    var val = $(e).val()
    if (val > 12) {
        showToast("请输入正确月份");
        $(e).val(12)
    }
    if (val < 0) {
        showToast("请输入正确月份");
    }
}

function regED(e) {
    regNum(e);
    var val = $(e).val()
    if (!$("#endMonth").val()) {
        showToast("请选择月份");
        $(e).val("")
    }
    var day = dateNum(nyear, $("#endMonth").val());
    if (val > day) {
        showToast("请输入正确日期");
        $(e).val(day)
    }
    if (val < 1) {
        showToast("请输入正确日期");
        $(e).val("")
    }
}

function regEH(e) {
    regNum(e);
    var val = $(e).val()
    if (val > 23) {
        showToast("请输入正确时间");
        $(e).val(23)
    }
}

function regEMi(e) {
    regNum(e);
    var val = $(e).val()
    if (val > 59) {
        showToast("请输入正确时间");
        $(e).val(59)
    }
}

//报名开始日期
function setStart() {
    var datePicker = new DateTimePicker.Date(options)
    datePicker.on('selected', function (formatDate, now) {
        // formatData = 2016-10-19
        // now = Date instance -> Wed Oct 19 2016 20:28:12 GMT+0800 (CST)
        var _date = new Date();
        var year = _date.getFullYear();
        var month = _date.getMonth() + 1;
        var day = _date.getDate();
        _date = year + "-" + setNum(month) + "-" + setNum(day);
        console.log(_date)
        if (formatDate < _date) {
        showToast('开始日期小于当前日期');
        return
        }
        joinStart = formatDate;
        $('#joinStart').val(formatDate + "  00:00");
    })
    datePicker.on('cleared', function () {
        // clicked clear btn
    })
    }
//报名结束日期
function setEnd() {
    if (!joinStart) {
        showToast('请选择开始日期');
        return
    }
    var datePicker = new DateTimePicker.Date(options)
    datePicker.on('selected', function (formatDate, now) {
        // formatData = 2016-10-19
        // now = Date instance -> Wed Oct 19 2016 20:28:12 GMT+0800 (CST)
        if (formatDate <= joinStart) {
        showToast('结束日期小于开始日期');
        return
        }
        joinEnd = formatDate;
        $('#joinEnd').val(formatDate + "  23:59");
    })
    datePicker.on('cleared', function () {
        // clicked clear btn
    })
}
//提交活动信息
function commitBtn() {

    var activeTitle = $("#activeTitle").val(); // 活动名称
    var activeLocation = $("#activeLocation").val(); // 活动地点
    var activePhone = $("#activePhone").val(); // 活动联系方式

    var bMo = setNum($("#beginMonth").val());
    var bD = setNum($("#beginDate").val());
    var bH = setNum($("#beginHour").val()) ? setNum($("#beginHour").val()) : "00";
    var bM = setNum($("#beginMinite").val()) ? setNum($("#beginMinite").val()) : "00";
    var beginDate = nyear + "-" + bMo + "-" + bD + " " + bH + ":" + bM; // 活动开始时间 "2019-07-12 08:00"
    console.log(beginDate)
    var eMo = setNum($("#endMonth").val());
    var eD = setNum($("#endDate").val());
    var eH = setNum($("#endHour").val()) ? setNum($("#endHour").val()) : "23";
    var eM = setNum($("#endMinite").val()) ? setNum($("#endMinite").val()) : "59";
    var endDate = nyear + "-" + eMo + "-" + eD + " " + eH + ":" + eM; // 活动结束时间
    console.log(endDate)
    if (beginDate > endDate) {
        showToast("活动结束时间小于活动开始时间");
        return
    }
    if(joinEnd > beginDate){
        showToast("活动开始时间小于报名结束时间");
        return
    }
    var activeInfo = $(".text-content").val(); // 活动内容简介
    var activeDuration = $("#activeTime").val(); // 预计活动时长
    var titleImg = ""; // 活动封面 ""
    var otherImgs = []; // 其他照片 []
    var joinNum = $("#personNum").val() // 报名人数上限

    var params = {
        empid: empid,  // 员工id
        teamid: teamid,  // 所在分队id
        name: activeTitle,  // 活动名称
        address: activeLocation,  // 活动地点
        mobile: activePhone,  // 活动联系方式
        data_start_hd: beginDate,  // 活动开始时间 "2019-07-12 08:00"
        data_end_hd: endDate,  // 活动结束时间
        content: activeInfo,  // 活动内容简介
        projectTime: activeDuration,  // 预计活动时长
        fileIndex: picTitle,  // 活动封面 ""
        fileList0: picList,  // 其他照片 []
        data_start_bm: joinStart,  // 报名开始时间 "2019-07-12"
        data_end_bm: joinEnd,  // 报名结束时间
        max_member: joinNum  // 报名人数上限
    }
    for(var i in params){
        if(isEmpty(params[i])){
            showToast("请完善信息");
            return
        }
    }
    params = JSON.stringify(params)
    console.log(params)
    $.ajax({
        cache: false,
        type: "POST",
        dataType: 'json',
        url: API_URL+"/active/insertActive.do",
        data:{
            token: token,
            infoParam: params
        },
        success: function(data){
            console.log(data);
            if(data.state==200){
                showToast("保存成功");
                setTimeout(function(){
                    $(".headerBack").click()
                }, 2000)
            }else{
                showToast("保存失败")
            }

        },
        error: function(data){
            console.log(data)
        }
    })
}