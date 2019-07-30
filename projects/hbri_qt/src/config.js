//判断是ios还是安卓
var phoneType = (function(){
    var phone;
    var ua = navigator.userAgent.toLowerCase();
    //android终端
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
    //ios终端
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        phone = 'ios'
    } else if (/(Android)/i.test(navigator.userAgent)) {
        phone = 'android'
    }
    console.log(phone)
    return phone;
})();

export { phoneType }
