import axios from "axios"
import Vue from 'vue'
import qs from 'qs'
import { Toast } from 'mint-ui'
import { getLocalData } from "@/utils/store"
import router from '@/router/index'

if(process.env.NODE_ENV == 'production'){
    axios.defaults.baseURL = "http://118.144.88.219:9999/";
}

axios.defaults.timeout = 6000;
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
axios.interceptors.request.use(config => {
    if (config.method == "post") {
        if (config.data instanceof FormData) {
        } else{
            if (config.url.indexOf('/user') == 0) {
                let sid = getLocalData('hbxj_sid');
                //sid="test1998"
                config.data = config.data || {};
                config.data.sid = sid;
            }
            config.data = qs.stringify(config.data);
        }
       
    } else if (config.method == "get") {
        if (config.url.indexOf('/user') == 0) {
            let sid = getLocalData('hbxj_sid');
            //sid="test1998"
            config.params = {
                ...config.params,
                sid: sid
            }
        }else{
            config.params = {
                ...config.params
            }
        }
        
    }
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
})
axios.interceptors.response.use(response => {
    if (response.status == 200) {
        if(response.data.code == 15){
            router.push({name:'register'});
        }else{
            return Promise.resolve(response);
        }
    } else {
        return Promise.reject(response);
    }
})
export function post(url, params, header) { 
    return new Promise((resolve, reject) => {
        axios.post(url, params, header).then(res => {
            if (res.data.code == 200) {
                resolve(res.data)
            } else {
                if (res.data.code != 30){
                    Toast(res.data.msg);
                }
                reject(res.data);
            }

        }).catch(err => {
            if (err.msg) {
                // alert("出错了 > post request ", err);
            } else {
                // alert("出错了 > post request ", err);
            }

        })
    })
}
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data)
            } else {
                if (res.data.code != 30) {
                    Toast(res.data.msg);
                }
                reject(res.data);
            }

        }).catch(err => {
            if (err.msg) {
                // alert("出错了 > post request ", err);
            } else {
                // alert("出错了 > post request ", err);
            }
        })
    })
}
