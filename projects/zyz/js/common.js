/********************生产配置项  start***********************************************************/
//var API_URL = "http://mswxgj.minshenglife.com";  //API地址
//var API_URL_WEB = "";  //

/********************生产配置项  end***********************************************************/
/********************测试环境配置项  start***********************************************************/
//var API_URL ="http://weijiaceshi.minshenglife.com:8001/yw";  //API地址
//var API_URL ="http://weijiaceshi.minshenglife.com:8001";  //API地址
//var API_URL = "http://10.0.158.19:8001/zyz";
//var API_URL = "http://127.0.0.1:8080/zyz";
var API_URL ="http://weijiaceshi.minshenglife.com:8001/zyz";
//var API_URL = "http://wapp.minshenglife.com:8000/yw";
var API_URL_WEB = ""; //

/********************测试环境配置项  end***********************************************************/

var token = window.localStorage.getItem('token');
console.log(123123123, token);
var marginHeight = $('header').outerHeight();
$(".contentCommon").css({ "margin-top": marginHeight });

/*字号*/
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 26 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


/**
 * 获取地址栏的值
 * @param param
 * @returns {*}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function isnull(string) {
    if (string == '' || string == null || string == 'null' || string == 'undefined' || string == undefined) {
        return true;
    } else {
        return false;
    }
}
/*
 * 提示信息框
 *
 * 参数
 * @param str 提示的文字
 * @param state 状态 包括：普通信息提示、成功状态（correct）、失败状态（error）
 * 
 *  界面结构
 *	<div class="hintBox">
 *   	<div class="text"><span></span></div>
 *   	<div class="hiddenDiv"></div>
 *	</div>
 *
 *  实例化
 *  impromptu("提示的内容");
 */
function impromptu(str, state) {
    $(".hintBox .text span").text(str);
    $(".hintBox").fadeIn('fast');
    setTimeout(function() {
        $(".hintBox").fadeOut("slow");
    }, 3000);
    if (state == "correct") {
        $(".hintBox .text").attr("class", "text correct");
    }
    if (state == "error") {
        $(".hintBox .text").attr("class", "text error");
    }
}

/*
 * 确认提示框
 *
 * 皮肤样式 
 * @<div class="confirm">        黑色
 * @<div class="confirm white">  白色
 *
 *  界面结构
 *	<div class="confirm">
 *		<div class="box">
 *			<div class="text"><span></span></div>
 *			<div class="button">
 *				<a class="affirm" href="javascript:void(0)">确认</a>
 *				<a class="cancel" href="javascript:void(0)">取消</a>
 *			</div>
 *		</div>
 *		<div class="hiddenDiv"></div>
 *	</div>
 *
 *  实例化
 *  confirm("提示的内容");
 */
function confirm(str) {
    $(".confirm .box .text span").html(str);
    $(".confirm").fadeIn('fast');
    $(".cancel").click(function() {
        $(".confirm").fadeOut("fast");
    })
}

// 表单验证
function formValidationFun(element, exType, cueText) {
    //正则表达式
    var regArr = [
        /^[a-zA-Z\u4e00-\u9faf]{2,25}$/, //姓名
        /^(1[0-9][0-9])\d{8}$/, //手机号
        /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ //身份证号
    ];
    var reg = regArr[exType];
    var formValues = element.val();

    if (!reg.test(formValues)) {
        impromptu(cueText);
        element.val('');
        return;
    }
}

//判断是否是pc
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
var IsPcFlag = IsPC(); //true为PC端，false为手机端

//判断是否为空
function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || (typeof obj == "string" && obj.replace(/[\s]/g,'')  == "")){
        return true;
    }else{
        return false;
    }
}

// 提示弹窗
function showToast(text, time){
    var time = time?time:2000;
    var div = $("<div id='myToast'>"+text+"</div>");
    $("body").append(div);
    div.fadeIn(200);
    setTimeout(function(){
        $("#myToast").fadeTo(100, 0.01, function(){
            $(this).remove();
        })
    }, time)
}

// 返回两位数字(补0)
function setNum(num){
    if(!num){
        return ""
    }
    if(num < 10){
        return '0'+String(num)
    }
    return num
}

//加载更多
$.extend({
    onReachBottom:function (params,callFn) {
        if(!params.container || !params.content){
            console.error('缺失必要的参数');
            return;
        }
        var $container=params.container,
            $content=params.content,
            distance=params.distance || 30;

        $container.scroll(function() {
            var awayBtm =$content.height() - $container.scrollTop() - $container.height();
            if(awayBtm<=distance){
                callFn && callFn();
            }
        });
    }
});
