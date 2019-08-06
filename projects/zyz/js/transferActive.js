let activeid = getQueryString("id");
let emp_new, emp_new_name;

$(function(){
    $('.headerBackImg,.headerBack').on('click',function(){
		window.history.go(-1);  //返回上一页
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
                $("#member").html(data.count+' / '+data.max_member);
            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })
    $.ajax({
        cache: false,
        type: "GET",
        url: API_URL+"/active/getMemberByteamid.do",
        data: {
            token: token
        },
        dataType: 'json',
        success: function(data){
            if(data.state==200){
                console.log(data.data);
                renderList(data.data);
            }
        }
    })
})
// var data =  {A:[
//     {"empid": "867098495","empName": "常晓雪","sex": "女","teamname": "1"},
//     {"empid": "867098496","empName": "常晓雪","sex": "女","teamname": "1"},
//     {"empid": "867098497","empName": "常晓雪","sex": "女","teamname": "1"}
// ]}
// renderList(data)

function renderList(data){
    var html = "";
    for(var i in data){
        var _data = data[i];
        for(var j = 0;j<_data.length; j++){
            html += '<li class="oneLine flex" id="a'+_data[j].empid+'" flag="off">';
            html += '<div class="first_circle _circle" onclick=chooseAddMumber('+_data[j].empid+',"'+_data[j].empname+'")>';
            html += '<img src="../images/chooseBtn.png" alt="" class="chooseBg">';
            html += '<img src="../images/hasChoose.png" alt="" class="chosen" id="'+_data[j].empid+'">';
            html += '</div>';
            html += '<div class="nname">'+_data[j].empname+'</div>';
            html += '<div class="ggender">'+_data[j].sex+'</div>';
            html += '<div class="troops">'+_data[j].teamname+'</div>';
            html += '</li>';
        }
    }
    $(".aList").html(html);
}

//选择要增加的人员
function chooseAddMumber(e, name){
    $(".chosen").hide();
    $("#"+e).show();
    emp_new = e;
    emp_new_name = name;
}

function addConfirm(){
    if(emp_new){
        $("#transferName").html(emp_new_name);
    }
    $(".toast").hide();
}

function commitBtn(){
    $.ajax({
        cache: false,
        type: "POST",
        url: API_URL+"/active/transferEmp.do",
        data:{
            token : token,
            activeid: activeid,
            emp_new: emp_new,
        },
        dataType: 'json',
        // async:false,
        success: function(data) {
            if(data.state == '200'){
                showToast(data.msg);
            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })
}

$('.chooseText').on('click', function () {
    $(".toast").show()
})