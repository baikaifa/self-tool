import Vue from 'vue';
import { userInfo } from "@/api/index"

export function getLocalData(key){
    let data = localStorage.getItem(key);
    let value = {};
    if(data){
        value = JSON.parse(data);
        return value.data;
    }else{//调到登录页面
        return value;
    }   
}
export function setLocalData(key, value){
    localStorage.setItem(key,JSON.stringify({data:value}));
    if(key == "hbxj_sid"){
        getInfo()
    }
}
export function removeItem(item){
    localStorage.removeItem(item);
}

function getInfo(){
    userInfo().then(data => {
        if(data.code == 200){
            var data = typeof(data.data) === "string" ? JSON.parse(data.data) : data.data;
            if(Vue.prototype.$phoneType == "ios"){
                window.webkit.messageHandlers.bindPushAccount.postMessage(data.userId);
                // bindPushAccount(data.userId)
            }else if(Vue.prototype.$phoneType == "android"){
                window.SealsDiary.bindPushAccount(data.userId)
            }
        }
    })
}

