/*
    获取access_token
    是什么？微信调用接口全局的唯一凭据
    
    特点:
    1.唯一的
    2.有效期2小时，提前签5分钟请求
    3.接口权限 每天2000次
    
*/
const { appID, appsecret } = require('../config');
const rp = require('request-promise-native');
const { writeFile, readFile } = require('fs');
class Wechat {
  constructor() {

  }
  getAccessToken() {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`;

    return new Promise((resolve, reject) => {
      rp({ method: 'GET', url, json: true })
        .then(res => {
          console.log(res);
          res.expires_in = Date.now() + (res.expires_in - 300) * 1000;
          resolve(res);
        }).catch(err => {
          console.log(err);
          reject('getAccessToken方法除了问题:' + err);
        })
    })
  }

  saveAccessToken(accessToken) {
    accessToken = JSON.stringify(accessToken);
    return new Promise((resolve, reject) => {
      writeFile('./accessToken.txt', accessToken, err => {
        if (!err) {
          console.log('文件保存成功');
          resolve();
        } else {
          reject('saveAccessToken方法出了问题' + err);
        }
      })
    })
  }
  readAccessToken() {
    return new Promise((resolve, reject) => {
      writeFile('./accessToken.txt', (err, data) => {
        if (!err) {
          console.log('文件读取成功');
          //将json字符串转化js对象
          data.JSON.parse(data);
          resolve(data);
        } else {
          reject('readAccessToken方法出了问题' + err);
        }
      })
    })
  }
  isValidAccessToken(data) {
    if (!data && !data.accessToke && !data.expires_in) {
      return false;
    }

    // if(data.expires_in<Date.now()){
    //   return false;
    // }else{
    //   return true;
    // }
    return data.expires_in < Date.now();
  }
  fetchAccessToken() {
    if (this.access_token && this.expires_in && this.isValidAccessToken(this)) {
      return Promise.resolve({
        accessToke: this.access_token,
        expires_in: this.expires_in
      });
    }
    return this.readAccessToken()
      .then(async res => {
        if (this.isValidAccessToken(res)) {
          return Promise.resolve(res);
          // resolve(res);
        } else {
          const res = await this.getAccessToken()
          await this.saveAccessToken(res);
          return Promise.resolve(res);
          // resolve(res);
        }
      })
      .catch(async err => {
        this.getAccessToken()
        const res = await this.getAccessToken()
        await this.saveAccessToken(res)
        return Promise.resolve(res);
        // resolve(res);
      })
      .then(res => {
        this.access_token = res.access_token;
        this.expires_in = res.expires_in;
        return Promise.resolve(res);
      })
  }
}
const w = new Wechat();
new Promise((resolve, reject) => {
  w.readAccessToken()
    .then(res => {
      if (w.isValidAccessToken(res)) {
        resolve(res);
      } else {
        w.getAccessToken()
          .then(res => {
            w.saveAccessToken(res)
              .then(() => {
                resolve(res);
              })
          })
      }
    })
    .catch(err => {
      w.getAccessToken()
        .then(res => {
          w.saveAccessToken(res)
            .then(() => {
              resolve(res);
            })
        })
    })
})
  .then(res => {
    console.log(res);
  })





