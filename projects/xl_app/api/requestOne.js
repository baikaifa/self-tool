import axios from "axios"
import qs from 'qs'
axios.defaults.baseURL = "";
axios.defaults.timeout = 10000;
axios.defaults.headers= {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'};

axios.interceptors.request.use(config => {
  if(config.method  === 'post'){
    if (config.data instanceof FormData){

    }else{
      config.data = qs.stringify(config.data);
    }
   
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

export function post(url,params){
  return new Promise((resolve,reject) =>{
    axios.post(url,params).then(res=>{
      resolve(res.data)
    }).catch(err =>{
      // alert("出错了 > post request ", err);
    })
  })
}
export function get(url, params){
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then(res => {
      resolve(res.data)
    }).catch(err =>{
      // alert("出错了 > post request ", err);
    })
  })
}
