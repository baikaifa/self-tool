export default {
    exactNum(num,digit=2){//保留小数点后位数
        let numStr = num + '';
        if (numStr.indexOf(".") == -1){
            return num;
        }else{
            let arr = numStr.split('.');
            let digLen = arr[1].length;
            if(digLen <= digit){
                return num;
            }else{
                return num.toFixed(digit);
            }
        }
    }
}