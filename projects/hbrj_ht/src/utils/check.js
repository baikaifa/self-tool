export function noSpace(value){
    let len = value.length;
    var reg =/^[^\s]*$/;//不允许输入空格
    if(!reg.test(value)){
        return  value.substring(0, len - 1);
    }
    return value;

}