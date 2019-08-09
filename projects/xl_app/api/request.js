import axios from "axios"
import Vue from 'vue'

axios.defaults.baseURL = "";
axios.defaults.timeout = 6000;

axios.interceptors.request.use(config => {
    if(config.method == "post"){
        // config.data = {
        //     //...config.data,
        //     token: Vue.prototype.token,
        //     //token:456
        // }
        if (Vue && Vue.prototype && Vue.prototype.token) {
            if (!config.data) {
                config.data = {};
            }
            config.data['token'] = Vue.prototype.token;
        }
    } else if (config.method == "get"){
        // config.params = {
        //     //...config.params,
        //     token: Vue.prototype.token,
        //    // token: 456
        // }
        if (Vue && Vue.prototype && Vue.prototype.token) {
            if (!config.data) {
                config.data = {};
            }
            config.params['token'] = Vue.prototype.token;
        }
    }
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
})
axios.interceptors.response.use(response =>{
    if (response.status == 200){
        return Promise.resolve(response);
    }else{
        return Promise.reject(response);
    }
})
export function post(url,params){
    return new Promise((resolve,reject) =>{
        axios.post(url,params).then(res=>{
            if(res.data.code == 200){
                resolve(res.data)
            }else{
                alert(res.data.msg);
            }

        }).catch(err =>{
            if(err.msg){
              // alert("出错了 > post request ", err);
            }else{
              // alert("出错了 > post request ", err);
            }

        })
    })
}
export function get(url, params){
    return new Promise((resolve, reject) => {
        params.token = Vue.prototype.token;
        axios.get(url, { params: params }).then(res => {
            if(res.data.code == 200){
                resolve(res.data)
            }else{
               alert(res.data.msg);
            }

        }).catch(err =>{
            if (err.msg) {
              // alert("出错了 > post request ", err);
            } else {
              // alert("出错了 > post request ", err);
            }
        })
    })
}
