// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // vue主体
import 'lib-flexible/flexible' // 全局适配rem控制
import App from './App' // 主体app.vue加载
import router from './router/index' // 路由相关加载
import Navigation from 'vue-navigation' // 路由keepalive相关控制尝试
import axios from 'axios' // 请求相关控制1
import VueAxios from 'vue-axios' // 请求相关控制2
import VueScroller from 'vue-scroller' // 列表加载控制相关，上拉加载，下拉刷新
import VueLazyload from 'vue-lazyload' // 图片懒加载

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import './assets/css/iconfont/iconfont.css' // 字体文件
import './assets/css/global.css' // 多功能通用样式内容

import {reqLogin} from './utils/request' // 登陆相关请求

function decisionSystem() {
	const u = navigator.userAgent.toLowerCase();
	// app=navigator.appVersion;
	// var ia=u.indexOf('Android')>-1||u.indexOf('Linux')>-1;//andr
	// var ii=!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios
	const ag = {
		aliapp: "ali",
		ip: "ios",
		android: "android",
		linux: "android",
		symbianos: "symbian",
		"windows phone": "winPhone",
		mac: "mac"
	};
	for (let v in ag) {
		if (u.indexOf(v) >= 0) {
			return ag[v];
		}
	}
	return "pc";
}
// 注册项目的router文件
Vue.use(Navigation, { router });
Vue.prototype.$http = axios;

Vue.prototype.globalUtils = {
	/**
	 * 小范围数据池
	 */
	dataPool: {
		iToken: '',
		wxid: '',
	},
	/**
	 * 本地存储
	 */
	storage:{
		// 应用当前token
		sTokenKey: 'xile_webapp_token',
		/**
		 * 历史token队列
		 * @author xwj 2019-08-07
		 */
		hTokenKey: 'xile_webapp_hist_token',
		/**
		 * 得到本地token
		 * @author xwj 2019-07-31
		 */
		getStorageToken() {
			let st = localStorage.getItem(Vue.prototype.globalUtils.storage.sTokenKey);
			console.log(" getStorageToken >> st >>> " + st );
			if (!st) {
				return {token: ''};
			} else {
				try {
					return JSON.parse(st);
				} catch (e) {
					console.log(e);
					return {token: ''};
				}
			}
		},
		/**
		 * 设置本地token
		 * @author xwj 2019-07-31
		 */
		setStorageToken(token) {
			if (!token) {
				// 不存在直接返回
				return;
			}
			let ht = localStorage.getItem(Vue.prototype.globalUtils.storage.hTokenKey);
			if (ht) {
				let htj = JSON.parse(st);
				const rInd = htj.indexOf(token);
				if (rInd !== -1) {
					// 因为存在于历史，所以直接返回当前token
					Vue.prototype.globalUtils.dataPool.iToken = this.getStorageToken().token;
					// return this.getStorageToken().token;
					return;
				}
				// 不存在于历史，继续
			} else {
				ht = [];
			}
			let st = this.getStorageToken();
			if (st.token) {
				// 因为存在当前，将当前放入到历史
				ht.push(st.token);
				while (ht.length > 20) {
					ht.splice(1, 1);
				}
				localStorage.getItem(Vue.prototype.globalUtils.storage.hTokenKey, JSON.stringify(ht));
			}
			Vue.prototype.globalUtils.dataPool.iToken = token;
			localStorage.setItem(Vue.prototype.globalUtils.storage.sTokenKey, JSON.stringify({token: token}));
			// return token;
		},
		clearStorageData() {
			localStorage.removeItem(Vue.prototype.globalUtils.storage.sTokenKey);
		},

	},
	/**
	 * 进行token设置
	 */
	setToken(token) {
		Vue.prototype.globalUtils.storage.setStorageToken(token);
	},
	/**
	 * 清除token
	 */
	clearToken() {
		Vue.prototype.globalUtils.dataPool.iToken = '';
		Vue.prototype.globalUtils.storage.clearStorageData();
	},
	/**
	 * 刷新url中的itoken
	 */
	getNewTokenUrl(newToken) {
		let url = location.href;
		let cont = 'itoken='
		let itInd = url.indexOf(cont);
		if (itInd !== -1) {
			let len = cont.length;
			let temp = url.substring(itInd)
			let itJInd = temp.indexOf('#');
			let itAInd = temp.indexOf('&');
			let token = '';
			if (itJInd === -1 || itAInd === -1) {
				if (itJInd !== -1) {
					token = temp.substring(len, itJInd);
				} else if (itAInd !== -1) {
					token = temp.substring(len, itAInd);
				} else {
					token = temp.substring(len);
				}
			} else {
				if (itJInd < itAInd) {
					token = temp.substring(len, itJInd);
				} else {
					token = temp.substring(len, itAInd);
				}
			}
			url = url.replace(`/${token}/g`, newToken);
		}
		return url;
	},
	// FIXME: 
	UrlSearchParam() {
		let name,value;
		let str = location.href; //取得整个地址栏
		let num = str.indexOf("?")
		str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
		num = str.indexOf("#");
		if (num !== -1){
			str = str.substr(0, num);
		}
		let pm = {};
		let arr=str.split("&"); //各个参数放到数组里
		for(var i=0;i<arr.length;i++){
			num=arr[i].indexOf("=");
			if(num>0){
				name=arr[i].substring(0,num);
				value=arr[i].substr(num+1);
				pm[name]=value;
			}
		}
		return pm;
	},
	UrlSearch() {
		let name,value;
		let str = location.href; //取得整个地址栏
		let num = str.indexOf("#")
		str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
		num = str.indexOf("?");
		if (num !== -1){
			str = str.substr(num + 1);
		}
		let pm = {};
		let arr=str.split("&"); //各个参数放到数组里
		for(var i=0;i<arr.length;i++){
			num=arr[i].indexOf("=");
			if(num>0){
				name=arr[i].substring(0,num);
				if (name !== 'VNK') {
					value=arr[i].substr(num+1);
					pm[name]=value;
				}
			}
		}
		return pm;
	}

}

/**
 * FIXME: app端工具
 * @author xwj 2019-07-31
 */
Vue.prototype.appUtils = {
	appDeviceInfo: {
		type: '',
		token: '', 
		// env: '', // 当前系统环境 ios，android，pc
		isInit: false, // 系统初始化情况
		refBakFun: undefined, // 针对ios回调设置token后需要直接调用的方法问题
	},
	/**
	 * 得到当前token，当前的唯一调用方式在request中 add xwj 2019-08-06
	 */
	getToken(bakFun) {
		console.log(" getToken ... " + Vue.prototype.globalUtils.dataPool.iToken);
		if (Vue.prototype.globalUtils.dataPool.iToken) {
			return Vue.prototype.globalUtils.dataPool.iToken;
		} else {
			if (Vue.prototype.sysEnv === 'pc') {
				// pc端
				Vue.prototype.webUtils.toWebLogin();
			} else {
				// 手机端
				Vue.prototype.appUtils.refreshToken(bakFun);
			}
			return '';
		}
	},
	/**
	 * 刷新token
	 * @author xwj 2019-07-31
	 */
	refreshToken(bakFun) {
		console.log(" in >?>>> refreshToken ...");
		// alert(" in >?>>> refreshToken ...");
		// 获取token，初版
		try {
			Vue.prototype.appUtils.appDeviceInfo.refBakFun = bakFun;
			if (Vue.prototype.sysEnv === 'ios') {
				// ios 方式
				window.webkit.messageHandlers.refreshToken.postMessage(null);
				// return '1';
			} else if (Vue.prototype.sysEnv === 'android') {
				// android 方式
				window.joybuy.toRefreshToken();
				// return '2';
			}
			// 然后等待app回调 window.getRefreshResult 
		} catch (e) {
			console.log(e);
		}
		// return '3';
	},
	/**
	 * url置换处理
	 * @author xwj 2019-08-02
	 */
	urlDisplace(){
		let u = location.href;
		let isp = u.split('$');
		if (isp.length < 2) {
			return '';
		}
		let nu = isp[0] + '?' + isp[1];
		for (let j = 2; j < isp.length; j++) {
			nu += '&' + isp[j];
		}
		return nu;
	},
	/**
	 * 主要入口
	 * 初始化url中token
	 * 增加对url中特殊属性的处理：wxid
	 * @param {} bf 
	 */
	initUrlToken(bf) {
		let disUrl = this.urlDisplace();
		if (disUrl) {
			// 修改url
			location.href = disUrl;
			return;
		}
		let url = location.href;
		let cont = 'wxid='
		let itInd = url.indexOf(cont);
		if (itInd !== -1) {
			let len = cont.length;
			let temp = url.substring(itInd)
			let itJInd = temp.indexOf('#');
			let itAInd = temp.indexOf('&');
			let wxid = '';
			if (itJInd === -1 || itAInd === -1) {
				if (itJInd !== -1) {
					wxid = temp.substring(len, itJInd);
				} else if (itAInd !== -1) {
					wxid = temp.substring(len, itAInd);
				} else {
					wxid = temp.substring(len);
				}
			} else {
				if (itJInd < itAInd) {
					wxid = temp.substring(len, itJInd);
				} else {
					wxid = temp.substring(len, itAInd);
				}
			}
			if (wxid) {
				Vue.prototype.globalUtils.dataPool.wxid = wxid;
				console.log('with url >> wxid >>>' + Vue.prototype.globalUtils.dataPool.wxid);
			}
		}
		cont = 'itoken='
		itInd = url.indexOf(cont);
		if (itInd !== -1) {
			let len = cont.length;
			let temp = url.substring(itInd)
			let itJInd = temp.indexOf('#');
			let itAInd = temp.indexOf('&');
			let token = '';
			if (itJInd === -1 || itAInd === -1) {
				if (itJInd !== -1) {
					token = temp.substring(len, itJInd);
				} else if (itAInd !== -1) {
					token = temp.substring(len, itAInd);
				} else {
					token = temp.substring(len);
				}
			} else {
				if (itJInd < itAInd) {
					token = temp.substring(len, itJInd);
				} else {
					token = temp.substring(len, itAInd);
				}
			}
			if (token) {
				// Vue.prototype.globalUtils.dataPool.iToken = token;
				// Vue.prototype.globalUtils.storage.setStorageToken(token);
				// Vue.prototype.globalUtils.setToken(token);
				// console.log('with url >> iToken >>>' + Vue.prototype.globalUtils.dataPool.iToken);
				bf(token);
				return;
			}
		}
		bf();
	},
	/**
	 * 去到APP登陆页面的操作
	 */
	toAppLogin() {
		// alert(" >>>> toAppLogin ... ");
		// Vue.prototype.globalUtils.dataPool.iToken = '';
		Vue.prototype.globalUtils.clearToken();
		if (Vue.prototype.sysEnv === 'ios') {
			// ios 方式
			window.webkit.messageHandlers.logoutAction.postMessage(null);
		} else if (Vue.prototype.sysEnv === 'android') {
			// android 方式
			window.joybuy.logoutAction();
		}
	},
	/**
	 * 获取token，并存在根据路由验证token的方式
	 * 之后完善
	 * @author xwj 2019-07-31
	 */
	getAppToken() {
		console.log(" > in getAppToken > ... ");
		// 验证环境
		try {
			// ios 环境判定
			window.webkit.messageHandlers.getUserToken.postMessage(null);
			Vue.prototype.sysEnv = 'ios';
			return '1';
		} catch (e) {
			try {
				// android 环境判定
				let aToken = window.joybuy.getTokenFromClient();
				if (aToken && aToken != Vue.prototype.globalUtils.dataPool.iToken) {
					if (Vue.prototype.appUtils.appDeviceInfo.isInit) {
						// Vue.$router.go(0);
						// window.location.reload();
						let nUrl = Vue.prototype.globalUtils.getNewTokenUrl(aToken);
						window.location.href = nUrl;
						return '2';
					}
				}
				// Vue.prototype.globalUtils.dataPool.iToken = aToken;
				// Vue.prototype.globalUtils.storage.setStorageToken(aToken);
				Vue.prototype.globalUtils.setToken(aToken);
				Vue.prototype.sysEnv = 'android';
				return '2';
			} catch (e) {
			}
		}
		// 走到此处为非app环境
		Vue.prototype.sysEnv = 'pc';
		return '3';
	},
	toVueInit() {
		console.log(" >>> in toVueInit ... ");
		new Vue({ // 初始化
			el: '#app',
			router,
			template: '<App/>',
			components: { App }
		})
		// 直接调用一次
		refreshTokenTimer()
	}
}
/**
 * FIXME: web端工具
 * @author xwj 2019-07-31
 */
Vue.prototype.webUtils = {
	/**
	 * 初始化操作
	 * @param bf 必须存在的回调
	 */
	webInit(bf) {// 
		console.log(" >>> in webInit ... ");
		let token = Vue.prototype.globalUtils.storage.getStorageToken();
		console.log(" >> " + JSON.stringify(token));
		if (token.token) {
			// 存在token，进行验证
			let local = window.location.href;
			if (local.indexOf('10.4.') || local.indexOf('localhost')) {
				// 认为是测试环境，直接登陆成功
				let tmpToken = (token.token.indexOf('token-prefix') !== -1) ? token.token.substring(12) : token.token;
				// if (token.token.indexOf('token-prefix') !== -1) {
				// 	Vue.prototype.globalUtils.dataPool.iToken = token.token.substring(12);
				// } else {
				// 	Vue.prototype.globalUtils.dataPool.iToken = token.token;
				// }
				Vue.prototype.globalUtils.setToken(tmpToken);
				bf();
			} else {
				this.validLogin(token.token, (res, data)=>{
					if (res) {
						// Vue.prototype.globalUtils.dataPool.iToken = data;
						// Vue.prototype.globalUtils.storage.setStorageToken(data);
						// 登陆成功，进行继续之后的操作
						Vue.prototype.globalUtils.setToken(data);
						bf();
					} else {
						// 进行登陆操作
						this.toWebLogin(bf);
					}
				});
			}
			return;
		}
		// 进行登陆操作
		this.toWebLogin(bf);
	},
	/**
	 * 验证登陆情况
	 * @author xwj 2019-07-31
	 * @param bf 必须存在的回调
	 */
	validLogin: function(token, bf) {
		let param = {
			from: 'xlygh_app',
			token: token,
			oriUrl: Vue.prototype.webUtils.tools.getReqUrl()
		}
		if (Vue.prototype.globalUtils.dataPool.wxid) {
			param['wxid'] = Vue.prototype.globalUtils.dataPool.wxid;
		}
		reqLogin.validLogin(param).then((res)=>{
			res = typeof (res) === 'string' ? JSON.parse(res) : res;
			console.log(res)
			if (res.code == 200) {
				if (res.data.isLogin === 1 || res.data.isLogin === 0) {
					Vue.prototype.globalUtils.dataPool.iToken = token;
				// if (res.data.isLogin == 1) {
					bf(true, res.data.token);
				} else {
					bf(false);
				}
			}
		}).catch(() => {
			bf(false);
		});
	},
	/**
	 * 进行登陆操作
	 * @author xwj 2019-07-31
	 */
	toWebLogin: function(bf) {
		let param = {
			from: 'xlygh_app',
			oriUrl: Vue.prototype.webUtils.tools.getReqUrl()
		}
		if (Vue.prototype.globalUtils.dataPool.wxid) {
			param['wxid'] = Vue.prototype.globalUtils.dataPool.wxid;
		}
		reqLogin.goLogin(param).then((res)=>{
			res = typeof (res) === 'string' ? JSON.parse(res) : res;
			if (res.code == 200) {
				window.location.href = res.data.url;
				// 此时页面中断
			}
		}).catch(() => {
			bf(false);
		});
	},
	tools: {
		getReqUrl(url) {
			if (!url) {
				url = location.href;
			}
			let end = url.indexOf('VNK=');
			if (end !== -1) {
				url = url.substring(0, end - 1);
			}
			let jind = url.indexOf('#');
			if (jind === -1) {
				return url;
			}
			let pms = '';
			let wind = url.indexOf('?', jind);
			if (wind !== -1) {
				pms += 'pv=' + url.substring(jind + 2, wind) + '&';
				let vpm = Vue.prototype.globalUtils.UrlSearch(url.substring(jind + 1));
				for (let pk in vpm) {
					pms += 'vp_' + pk + '=' + vpm[pk] + '&';
				}
				pms = pms.substring(0, pms.length - 1);
			} else {
				pms += 'pv=' + url.substring(jind + 2);
			}
			let path = window.location.pathname;
			let lastS = path.lastIndexOf('/');
			let sendUrl = window.location.protocol + '//' + window.location.hostname;
			if (lastS === -1) {
				sendUrl += '/callbak.html';
			} else {
				if (path === '/') {
					sendUrl += '/callbak.html';
				} else {
					sendUrl += path.substring(0, lastS + 1) + 'callbak.html';
				}
			}
			if (pms.length > 0) {
				return sendUrl + '?' + pms;
			} else {
				return sendUrl;
			}
		}
	}
}
// FIXME: 
Vue.use(VueAxios, axios);
Vue.use(VueScroller);
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: require('./assets/img/defItem.png'),
	loading: require('./assets/img/defItem.png'),
	attempt: 1
});

// FIXME: ios回调js的，回传token的方法
window.userTokeniOS = function(token) {
	if (token) {
		Vue.prototype.sysEnv = 'ios';
		if (Vue.prototype.globalUtils.dataPool.iToken !== token) {
			if (Vue.prototype.appUtils.appDeviceInfo.isInit) {
				// Vue.$router.go(0);
				// window.location.reload();
				let nUrl = Vue.prototype.globalUtils.getNewTokenUrl(token);
				window.location.href = nUrl;
				return;
			}
			Vue.prototype.globalUtils.setToken(token);
			// Vue.prototype.globalUtils.dataPool.iToken = token;
		}
		// 可能不可达部分
		if (Vue.prototype.appUtils.appDeviceInfo.refBakFun) {
			const tRbf = Vue.prototype.appUtils.appDeviceInfo.refBakFun;
			Vue.prototype.appUtils.appDeviceInfo.refBakFun = undefined;
			tRbf();
		}
	}
	if (!Vue.prototype.appUtils.appDeviceInfo.isInit) {
		Vue.prototype.appUtils.appDeviceInfo.isInit = true;
		Vue.prototype.appUtils.toVueInit();
	}
}
// android 与 ios 共用的回调js的，给定token失效状态的处理
window.getRefreshResult = function(res) {
	switch (res) {
		case '0':
			Vue.prototype.appUtils.getAppToken();
			break;
		case '1':
			this.setTimeout(()=> { // 问题情况，定时刷新
				Vue.prototype.appUtils.refreshToken();
			}, 60000)
			break;
		case '-1': // 
			Vue.prototype.appUtils.toAppLogin();
			break;
	}
}
/**
 * 定时主动尝试刷新token
 */
function refreshTokenTimer() {
	setTimeout(() => {
		Vue.prototype.appUtils.refreshToken();
		refreshTokenTimer();
	}, 1200000);
}
// 复制插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

/* eslint-disable no-new */

// Vue.prototype.appUtils.toVueInit();
// FIXME: 首先进行url中token验证
// 最后动作
Vue.prototype.appUtils.initUrlToken((token) => {
	// 判定环境，是否 ios 或 android
	let rtRes = Vue.prototype.appUtils.getAppToken();
	if (token) {
		// 已经成功的
		Vue.prototype.globalUtils.setToken(token);
		console.log(" >>> initUrlToken 1 >> " + token);
		Vue.prototype.appUtils.appDeviceInfo.isInit = true;
		Vue.prototype.appUtils.toVueInit();
		return;
	}
	console.log(" >>> initUrlToken 2 >> " + token);
	// let rtRes = '2';
	switch (rtRes) {
		case '1': // 是ios环境
			return;
		case '2': // 是android环境，认为直接初始化完成
			Vue.prototype.appUtils.appDeviceInfo.isInit = true;
			break;
		default: // 认为是web环境
			Vue.prototype.webUtils.webInit((res) => {
				Vue.prototype.appUtils.toVueInit();
			});
			return;
	}
	// 手机环境，直接进入
	Vue.prototype.appUtils.toVueInit();
});

console.log(">>>>> ", Vue.prototype.globalUtils.dataPool.iToken);
