/**
 * 格式化时间
 *
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
    if (!str) return ''
    const date = new Date(str)
    const time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    let s;
    if (time < 0) {
        return ''
    } else if (time / 1000 < 30) {
        return '刚刚'
    } else if ((s = (time / 1000)) < 60) {
        return parseInt(s) + '秒前'
    } else if ((s = (time / 60000)) < 60) {
        return parseInt(s) + '分钟前'
    } else if ((s = (time / 3600000)) < 24) {
        return parseInt(s) + '小时前'
    } else if ((s = (time / 86400000)) < 31) {
        return parseInt(s) + '天前'
    } else if ((s = (time / 2592000000)) < 12) {
        return parseInt(s) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前'
    }
};
export const formDate = (date,type) =>{
   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const day = date.getDate();
   const hour = date.getHours();
   const minute = date.getMinutes();
   const second = date.getSeconds();
   if(type == 1){
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
   }else{
      return [year, month, day].map(formatNumber).join('-');
   }
}
const formatNumber = function (n) {
  const str = n.toString();
  return str[1] ? str : '0' + str;
};
export const showMoneyFen = (money) => {
    if (typeof(money) === 'number') {
        if (money % 100 === 0) {
            return (money / 100).toFixed(0);
        } else if (money % 10 === 0) {
            return (money / 100).toFixed(1);
        } else {
            return (money / 100).toFixed(2);
        }
    }
    return money;
};
export const AutoResizeImage = (maxWidth,maxHeight,objImg) => {
  console.log(objImg,'34535345fffffffffffffffffffffffffffffffff')
  let img = new Image();
  img.src = objImg.src;
  let hRatio;
  let wRatio;
  let Ratio = 1;
  let w = img.width;
  let h = img.height;
  wRatio = maxWidth / w;
  hRatio = maxHeight / h;
  if (maxWidth ==0 && maxHeight==0){
    Ratio = 1;
  }else if (maxWidth==0){//
    if (hRatio<1) Ratio = hRatio;
  }else if (maxHeight==0){
    if (wRatio<1) Ratio = wRatio;
  }else if (wRatio<1 || hRatio<1){
    Ratio = (wRatio<=hRatio?wRatio:hRatio);
  }
  if (Ratio<1){
    w = w * Ratio;
    h = h * Ratio;
  }
  objImg.height = h;
  objImg.width = w;
}
export const setCookie = function (cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  console.info(cname + "=" + cvalue + "; " + expires);
  document.cookie = cname + "=" + cvalue + "; " + expires;
  console.log(document.cookie,'232323232323');
};
//获取cookie
export const getCookie = function (cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
