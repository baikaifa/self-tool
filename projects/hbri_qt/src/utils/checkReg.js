export function checkPhone(val){
    let reg1 = /^1[3-9]/;
    let reg2 = /^\d+$/;
    let reg3 = /^\s+|\s+$/g;
    let value = val.replace(reg3,'');
    let len = value.length;
    if (!reg2.test(value)){
        value = value.substring(0, len-1);
        return value;
    }
    if (len == 1 && value != 1){
        return '';
    }
    if (len == 2 && !reg1.test(value)){
        value = value.substring(0, len - 1);
        return value;
    }
    if(len >11){
        value = value.substring(0,11);
        return value;
    }
    
    return value;
}
export function checkCode(val){
    let reg2 = /^\d+$/;
    let reg3 = /^\s+|\s+$/g;
    let value = val.replace(reg3, '');
    let len = value.length;
    if (!reg2.test(value)) {
        value = value.replace(/\D+/g,'');
        return value;
    }
    if(len  > 6){
        value = value.substring(0, 6);
        return value;
    }
    return value;
}
export function checkPsw(val){
    let info = {
        flag:true,
        msg:''
    };
    let numReg = /^\d+$/;
    let lowerReg = /^[a-z]{1,}$/;
    let upperReg = /^[A-Z]{1,}$/;
    let reg3 = /^\s+|\s+$/g;
    let value = val.replace(reg3, '');
    let len = value.length;
    if (len < 6 || len >20) {
        info = {
                msg:"密码必须在6-20位数字和字母或字符之间",
                flag:false
            }
        return info;
    }
    if (numReg.test(value) || lowerReg.test(value) || upperReg.test(value)) {
        info = {
            msg:"密码必须在6-20位数字和字母或字符之间",
            flag:false
        }
        return info;
    }
    return info;
}
export function checkSpace(val){
    let reg3 = /^\s+|\s+$/g;
    let value = val.replace(reg3, '');
    return value;
}