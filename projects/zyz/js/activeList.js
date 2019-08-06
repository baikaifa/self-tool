// 页面跳转来源
let toList = getQueryString("toList");
//join:报名
//hasJoin:已参与
//start:已发起
//toOther:转让
//summary:可填小结
//reviewActive:活动审核
//reviewSummary:小结审核
let pageNo = 1, pageSize = 10;
let getMore = true;
let url, toLocation, totalPage;
switch(toList) {
case "join": //报名
    url = "/active/getActiveList.do";
    toLocation = "activeDetail.html?from=join&id=";
    break;
case "hasJoin": //已参与
    url = "/active/myPartyList.do";
    toLocation = "activeDetail.html?id=";
    break;
case "start": //已发起
    url = "/active/myLaunchList.do";
    toLocation = "activeDetail.html?id=";
    break;
case "toOther": //转让
    url = "/active/myTransferList.do";
    toLocation = "transferActive.html?id=";
    break;
case "summary": //可填小结
    url = "/active/mySummaryList.do";
    toLocation = "summary.html?id=";
    break;
case "reviewActive": //活动审核
    url = "/active/myExamineList.do";
    toLocation = "reviewActive.html?id=";
    break;
case "reviewSummary": //小结审核
    url = "/active/myExamineSummaryList.do";
    toLocation = "reviewSummary.html?id=";
    break;
}

$(function(){
$('.headerBackImg,.headerBack').on('click',function(){
window.history.go(-1);  //返回上一页  
//		window.location.go(-1); //刷新上一页 
})
if(toList=="join"){
    $(".pageTitle").show();
    $(".searchDiv").show();
}

/* 调用插件 */
$.onReachBottom({
    "container":$(window),  /* 容器对象 */
    "content":$(document),  /* 内容对象 */
    "distance":20           /* 触发事件距离，默认30px */
},function () {
    /* 插件回调函数 */
    getUserList.get();
});

/* 项目方法 */
var getUserList={
    /* 允许请求 */
    isGet:true,
    /*获取*/
    get:function () {
        if(!this.isGet || !getMore){
            return;
        }
        pageNo++;
        /* 关闭请求条件，避免多次调用 */
        this.isGet=false;
        /* 缓存 this 对象 */
        var _self=this;
        $(".getMore").html('正在加载');

        setTimeout(function(){
            console.log('触底');
            getList();
            $(".getMore").html('加载更多');
            _self.isGet=true;
        }, 200)
    }
};
getList();
})

// 获取数据
function getList(){
$.ajax({  // 请求菜单
    cache: false,
    type: "POST",
    url: API_URL + url,
    data:{
        token: token,
        pageNo: pageNo,
        pageSize: pageSize
    },
dataType: 'json',
// async:false,
    success: function(data) {
      if(data.state == '200'){
        console.log(data.data);
            totalPage = data.data.totalPage;
            if(totalPage <= pageNo){
                getMore = false;
                $(".getMore").html('没有更多');
            }else{
                getMore = true;
                $(".getMore").html('加载更多');
            }
            renderList(data.data.rows);
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
    var sdate, edate;
    var html = "";
    for(var i = 0; i<data.length; i++){
        html += '<div class="lists" onclick="toDetail('+data[i].id+')">';
        html += '<div class="title flex">';
        html += '<span class="font18 ">'+data[i].name+'</span>';
        switch(String(data[i].type)) {
            case "1": //报名中
                html += '<img src="../images/bmz.png" alt="">';
                break;
            case "2": //准备中
                html += '<img src="../images/zbz.png" alt="">';
                break;
            case "3": //报名结束
                html += '<img src="../images/bmjs.png" alt="">';
                break;
            case "4": //活动进行中
                html += '<img src="../images/hdjxz.png" alt="">';
                break;
        }
        html += '</div>';
        html += '<p>活动地点： '+data[i].address+'</p>';
        html += '<p>活动日期： '+data[i].data_start_hd+'</p>';
        sdate = data[i].data_start_bm;
        sdate = (sdate.replace("-", "年")).replace('-','月')+'日';
        edate = data[i].data_end_bm;
        edate = (edate.replace("-", "年")).replace('-','月')+'日';
        edate = edate.slice(edate.indexOf('年')+1)
        html += '<p>报名起止时间： '+sdate+' - '+edate+'</p>';
        html += '<p>实际报名人数/报名上限人数： '+data[i].count+'/'+data[i].max_member+'</p>';
        html += '</div>'
    }
  $("#content").append(html);
}

function toDetail(id){
window.location = toLocation + id;
}