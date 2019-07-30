import axios from "axios"
import Vue from 'vue'
import qs from 'qs'
import { getLocalData} from "@/utils/base"

if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = "http://118.144.88.219:9998/";
}

axios.defaults.timeout = 6000;
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
axios.interceptors.request.use(config => {
    if (config.method == "post") {
        config.data = config.data || {};
        config.data.sid = getLocalData("hbrj_sid");
        config.data.uid = getLocalData("hbrj_uid");
        config.data = qs.stringify(config.data);

    } else if (config.method == "get") {
            config.params = {
                ...config.params,
                sid: getLocalData("hbrj_sid"),
                uid: getLocalData("hbrj_uid")
                
            }
        }
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
})
axios.interceptors.response.use(response => {
    if (response.status == 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
})
export function post(url, params, header) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, header).then(res => {
            resolve(res.data)
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
            resolve(res.data)
        }).catch(err => {
            if (err.msg) {
                // alert("出错了 > post request ", err);
            } else {
                // alert("出错了 > post request ", err);
            }
        })
    })
}
