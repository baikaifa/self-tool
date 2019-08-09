import { post, get } from "@/api/requestOne";


function postFun(path, params) {
    console.log('xunbao');
    path = 'http://zdjqr.xunbao88.com.cn/wechatbackend/' + path;
    // path = 'http://10.4.72.89:8080/wechatbackend/'+path;
    return new Promise((resolve, reject) => {
        post(path, params).then(res => {
            resolve(res);
        }).catch(err => {
            // alert("出错了 > post request ", err);
        });
    });
}
export const getQuesType = (params) => postFun("userQuestions.do?method=getTeaUserFeedbackTypes",params);
export const addImgs = (params) => postFun("friendsJob.do?method=uploadImage2", params);
export const submitQues = (params) => postFun("userQuestions.do?method=addTeaUserFeedbackQuestion", params);