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
const menu = require('./menu');
const api = require('../utils/api');
const { writeFileAsync, readFileAsync } = require('../utils/tool');
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
    return writeFileAsync(accessToken, 'access_token.txt');
  }
  readAccessToken() {
    return readFileAsync('accessToken.txt');
    // return new Promise((resolve, reject) => {
    //   readFile('./accessToken.txt', (err, data) => {
    //     if (!err) {
    //       console.log('accessToken文件读取成功');
    //       // data.JSON.parse(data);
    //       resolve(data);
    //     } else {
    //       reject('readAccessToken方法出了问题' + err);
    //     }
    //   })
    // })
  }
  isValidAccessToken(data) {
    if (!data || !data.accessToke || !data.expires_in) {
      return false;
    }

    // if(data.expires_in<Date.now()){
    //   return false;
    // }else{
    //   return true;
    // }
    return data.expires_in > Date.now();
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
  createMenu(menu) {
    try {
      return new Promise(async (resolve, reject) => {
        const data = await this.fetchAccessToken();
        const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`;
        const result = await rp({ method: 'POST', url, json: true, body: menu });
        resolve(result);
      })
    } catch (e) {
      reject('createMenu方法出了问题' + e);
    }

  }
  deleteMenu() {
    try {
      return new Promise(async (resolve, reject) => {
        const data = await this.fetchAccessToken();
        const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${data.access_token}`;
        const result = await rp({ method: 'GET', url, json: true });
        resolve(result);
      })
    } catch (e) {
      reject('deleteMenu方法出了问题', e);
    }
  }

  getTicket() {
    return new Promise(async (resolve, reject) => {
      const data = await this.fetchAccessToken();
      const url = `${api.ticket}&access_token=${data.access_token}`;
      rp({ method: 'GET', url, json: true })
        .then(res => {
          resolve({
            ticket: res.ticket,
            expires_in: Date.now() + (res.expires_in - 300) * 1000
          });
        }).catch(err => {
          console.log(err);
          reject('getTicket方法除了问题:' + err);
        })
    })
  }

  saveTicket(ticket) {
    return writeFileAsync(ticket, 'ticket.txt');
  }
  readTicket() {
    return readFileAsync('ticket.txt');
  }
  isValidTicket(data) {
    if (!data && !data.ticket && !data.expires_in) {
      return false;
    }
    return data.expires_in < Date.now();
  }
  fetchTicket() {
    console.log('fetchTicket');
    if (this.ticket && this.ticket.expires_in && this.isValidTicket(this)) {
      return Promise.resolve({
        ticket: this.ticket,
        expires_in: this.expires_in
      });
    }

    return this.readTicket()
      .then(async res => {
        if (this.isValidTicket(res)) {
          console.log('isValidTicket',res);
          return Promise.resolve(res);
          // resolve(res);
        } else {
          const res = await this.getTicket()
          await this.saveTicket(res);
          return Promise.resolve(res);
          // resolve(res);
        }
      })
      .catch(async err => {
        const res = await this.getTicket();
        await this.saveTicket(res);
        return Promise.resolve(res);
        // resolve(res);
      })
      .then(res => {

        this.ticket = res;

       this.ticket.expires_in = res.expires_in;
        return Promise.resolve(res);
      })
  }
}

// (async () => {
//   const w = new Wechat();
//   let result = await w.deleteMenu();
//   console.log('删除菜单',result);
//   result=await w.createMenu(menu);
//   console.log('创建菜单',result);
//   // const data = await w.fetchTicket();
//   // console.log(data);
// })()



module.exports=Wechat;