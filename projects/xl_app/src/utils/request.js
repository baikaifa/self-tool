import axios from "axios"
import qs from 'Qs'
import Vue from 'vue' // vue主体

function getReco(path, params, noToken) {
	path = 'http://118.144.88.218:7999' + path;
	return new Promise((resolve, reject) => {
		get(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function postReco(path, params, noToken) {
	path = 'http://mp.xunbao88.com.cn' + path;
	// path = 'http://10.4.72.80:8081/miniprogram' + path;
	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function postVerificationCode(path, params, noToken) {
	// path = 'http://mp.xunbao88.com.cn/miniprogram' + path;
path=	path
	console.log(path);
	return new Promise((resolve, reject) => {
		get(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function getVerificationCode(path, params, noToken) {
	// path = 'http://mp.xunbao88.com.cn/miniprogram' + path;
	 path =  path;
	console.log(path);
	return new Promise((resolve, reject) => {
		get(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

/**
 * post方式获取商城相关数据
 * @author xwj 2019-07-28
 * @param {string} path 请求路径
 * @param {object} params 请求参数
 */
function postMall(path, params, noToken) {
	path = 'http://mp.xunbao88.com.cn' + path;
	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function postMall2(path, params, noToken) {
	path = 'http://118.144.88.218:7999' + path;
	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

//lwz
function postCao(path, params, noToken) {
	path = 'http://mp.xunbao88.com.cn' + path;
	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

function getStaticFile(path) {
	// path = 'http://localhost:8085' + path;
	return new Promise((resolve, reject) => {
		get(path, {}, true).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

// 社区相关 by gaoxueli -begin
function groupGet(path, params, noToken) {
	params=params||{};
	//path = 'http://10.4.72.89:8080/wechat_business/xlyghapp' + path;
	path = 'http://zdjqr.xunbao88.com.cn/wechatbusiness/xlyghapp' + path;
	return new Promise((resolve, reject) => {
		get(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function groupPost(path, params, noToken) {
	params=params||{};
	//path = 'http://10.4.72.89:8080/wechat_business/xlyghapp' + path;
	path = 'http://zdjqr.xunbao88.com.cn/wechatbusiness/xlyghapp' + path;
	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function talkGet(path, params, noToken) {
	params=params||{};
	path = 'http://118.145.5.141/wechatbackend' + path;
	return new Promise((resolve, reject) => {
		get(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

// 个人中心收益
function postIncome(path, params, noToken) {
	path = 'http://xilehui.xunbao88.com.cn/cashback' + path;
	// path = 'http://mp.xunbao88.com.cn/miniprogram' + path;
	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

// 个人中心更换头像
function postAvatar(path, params, noToken) {
	path = 'http://img.xunbao88.com.cn/upload/imgupload' + path;

	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
// 发布作品
function postImgFabu(path, params, noToken) {
	path = 'http://img.xunbao88.com.cn/upload/imgupload' + path;
	return new Promise((resolve, reject) => {
		postImg(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
// 个人中心
function postPersonal(path, params, noToken) {
	path = 'http://mp.xunbao88.com.cn' + path;
	// path = 'http://10.4.72.80:8081/miniprogram' + path;
	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

/**
 * 直接全路径post请求
 * 
 * @param {string} path 
 * @param {object} params 
 */
function postTo(path, params, noToken) {
	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
/**
 * 登陆相关post请求
 * 
 * @param {string} path 
 * @param {object} params 
 */
function postLogin(path, params, noToken) {
	path = 'http://mp.xunbao88.com.cn' + path;
	return new Promise((resolve, reject) => {
		post(path, params, noToken).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

export const reqGroup = {
	groupTagList: params => groupGet('/group/classify/list', params, true), // 群分类
	groupList:params => groupGet('/group/list', params, true), // 群列表
	joinGroup:params => groupGet('/group/applyjoin', params), // 加群
	groupDetail:params => groupGet('/group/detail/get', params, true), // 群详情
	groupMembers:params => groupGet('/group/member/list', params, true), // 群成员
	groupTalk:params => talkGet('/robotMsgAction.do?method=getXlyghGroupMsgInfos', params, true), // 群聊
	applyCooperation:params => groupPost('/group/cooperation/apply', params), // 申请合作
	applyRes:params => groupGet('/group/cooperation/list', params), // 申请结果
}

// 社区相关 by gaoxueli -end
/**
 * 商城相关请求
 * @author xwj 2019-07-28
 */
export const reqMall = {
	/**
	 * 类型数据接口
	 * @author xwj 2019-07-28
	 * @param {object} params {
	 * 							pageNo: 1
	 * 							pageSize: 20
	 * 							sort: 0 //0 综合  1销量  2 价格  3 佣金
	 * 							type:0//  0 每日推荐  1 新人专享  2 聚划算  3 淘抢购  4 精选专区   5 3.9元区  6 6.9元区  7 9.9元区
	 * 							}
	 */
	typeList: params => postMall('/mall/commodity/queryTypelist2', params, true),
	/**
	 * 首页列表数据
	 * @author xwj 2019-07-28
	 */
	mainList: params => postMall2('/taobao_v2/guess_like', params, true),
	// mainList: params => postMall('/mall/commodity/recommend', params, true),
}

export const reqReco = {
	/**
	 * 搜索结果
	 * @author xwj 2019-06-22
	 */
	tbSearch: params => getReco('/taobao/search_item_v2', params, true),
	jdSearch: params => getReco('/jd/search_item_v2', params, true),
	/**
	 * 得到标签数据
	 * @author xwj 2019-06-24
	 */
	tagDatas: params => postReco('/mall/commodity/querylist', params, true),
	/**
	 * 标签xml
	 * @author xwj 2019-06-24
	 */
	tagXml: () => getStaticFile('static/category.xml'),
	/**
	 * 根据带商品ID的url得到转链内容
	 * @author xwj 2019-07-29
	 */
	getTransByCommLink: params => postTo('http://zdjqr.xunbao88.com.cn/wechatbusiness/commodityRecommend/commodityTransLink', params),
}

// 其他页面 zhangtong
export const reqOther = {
	// 收益细则
	inDetail: params => postReco('/bonus/list', params),
	// 任务中心
	taskCenter: params => postReco('/mission/list', params),
	// 增加奖励
	addIncome: params => postReco('/bonus/add', params),
	// 个人中心
	userInfo: params => postReco('/user/info/v1', params)
}

//种草相关页面lwz
export const caoApi = {
	postDetail: params => postCao('/forum/recommend/topic/list', params),//帖子详情
	commentList: params => postCao('/forum/topic/comment/detail', params),//评论列表
	interactive: params => postCao('/forum/topic/update', params),//点赞，收藏的接口
	addComment: params => postCao('/forum/topic/comment/add', params),//增加评论
	postFollow: params => postCao('/forum/user/follow/list', params),//关注的接口
	gainLabels:params=> postCao('/forum/tag/list', params, true),//获取标签
	addBonus: params => postCao('/bonus/add', params),//增加奖励
	hotSearch: params => postCao('/forum/tag/list', params),//热搜词
	grassRedTip: params => postCao('/bonus/add', params), //阅读收益及收益记录
	getWechartInfo: params => postTo('http://118.145.5.141/wechatbackend/wechatGroupManagement.do?method=getMemberInfoByWxid', params), //获取微信信息

	/**
	 * 主列表数据
	 * 
	 * @param url 
	 * @param params 
	 * @returns 
	 */
	mainList: params => postCao('/forum/discovery/topic/list', params, true),
	/**
	 * 搜索数据结果
	 * 
	 * @param url 
	 * @param params 
	 * @returns 
	 */
	mainSear: params => postCao('/forum/search/topic/list', params, true),
}

//个人页面 baikaifa
export const reqForgetpwd = {
	gainCode:params=>getVerificationCode('http://auth2.xunbaotianxing.com/XlyghAppLoginServlet?method=getCode',params),
	confirmSubmit:params=>getVerificationCode('http://auth2.xunbaotianxing.com/XlyghAppLoginServlet?method=setPasswd',params),
	changeNickname:params=>postReco('/user/nickname/update',params),
	wixinBind:params=>postReco('/user/bindWechat',params),
	changewixinBind:params=>postReco('/user/getBindWechat',params),
	confirmChange:params=>postVerificationCode('/XlyghAppLoginServlet?method=checkOldPhone',params),
	confirmSetNewPhone:params=>getVerificationCode('http://auth2.xunbaotianxing.com/XlyghAppLoginServlet?method=bindPhone',params),
	InviteCode:params=>postReco('/user/inviteCode/set',params),
	getPersonalCode:params=>postReco('/user/inviteCode/get',params),
}
//发布作品 baikaifa
export const publishingWorks = {
	getPublishingWorks:params=>postReco('/forum/my/topic/post',params),
	getImgUrl:params=>postImgFabu('?act=app&userid=',params),

}

// 个人页面 huhuyuan
export const reqPersonal = {
	// 上传用户头像到服务器
	uploadAvatar: params => postImgFabu('?act=appavatar&userid=', params),
	// 个人中心用户信息
	userMessage: params => postPersonal('/user/info/v1', params),
	// 设置页面用户信息
	selfInfo: params => postPersonal('/user/setInfo', params),
	// 用户邀请码
	getInviteCode: params => postPersonal('/user/inviteCode/get', params),
	getBeinvitedCode: params => postPersonal('/user/beinvitedCode/get', params),
	// 保存用户头像
	saveAvatar: params => postPersonal('/user/avatar/update', params),
	// 用户绑定微信
	wxBind: params => postPersonal('/user/getBindWechat', params),
	//搜索订单结果
	search: params => postIncome('/alliance.gsp?method=getOrderHistoryInfo', params),
	//得到优惠券列表
	couponList: params => postIncome('/alliance.gsp?method=getCounponSort', params),
	//排序后的优惠券
	uploadCouponList: params => postIncome('/alliance.gsp?method=updateCounponSort', params),
	//累计收益
	incList: params => postIncome('/alliance.gsp?method=getBillingDetails', params),
	//得到即将到账
	cosList: params => postIncome('/alliance.gsp?method=getPreIncomeDetails', params),
	//得到购物红包
	amoList: params => postIncome('/alliance.gsp?method=getQuotaDetails', params),
	//喜乐币
	xlbList: params => postPersonal('/bonus/list', params),
	// 用户信息
	userInfo: params => postIncome('/alliance.gsp?method=getUserInfo', params),
	// 兑换
	xlbTrans: params => postPersonal('/bonus/trans', params),
	// 提现
	cashDraw: params => postPersonal('/user/cash/draw', params),
	// 用户余额
	userBalance: params => postPersonal('/user/balance', params),
	// 用户银行卡列表
	userBankList: params => postPersonal('/user/bank/list', params),
	// 银行卡列表
	bankList: params => postPersonal('/user/bank/all', params),
	// 添加银行卡
	addBank: params => postPersonal('/user/bank/add', params),
	// 删除银行卡
	deleteBank: params => postPersonal('/user/bank/delete', params),
	//我的粉丝
	gainMyFans: params => postPersonal('/message/list',params),
	//我的作品
	gainWorks:params => postPersonal('/forum/my/topic/list',params),
	//我的收藏
	myCollections:params => postPersonal('/forum/my/storetopic/list',params),
	//我的关注
	getYourAttention:params => postPersonal('/message/list',params),//关注接口1
	indexFollows:params => postPersonal('/forum/user/follow/list',params),//关注接口2
}

/**
 * 用户登陆相关操作
 * @author xwj 2019-07-31
 */
export const reqLogin = {
	/**
	 * 进行登陆情况验证
	 */
	validLogin: params => postLogin('/login/isLogin', params, true),
	/**
	 * 进行实际的登陆操作
	 */
	goLogin: params => postLogin('/login/login', params, true),
}

axios.defaults.timeout = 10000;
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
function post(url, params, noToken) {
	if (params && !params['token']) {
		// TODO: 需要针对不需要token的页面，进行特殊操作
		let token = Vue.prototype.appUtils.getToken(()=>{
			get(url, params, noToken);
		});
		if (!token) {
			if (!noToken) {
				return;
			}
		}
		params['token'] = token;
	}
	return new Promise((resolve, reject) => {
		console.log(JSON.stringify(params));
		try{
			axios.post(url, qs.stringify(params)).then(res => {
				res = typeof (res) === 'string' ? JSON.parse(res) : res;
				res = res.data;
				if (validResCode(res)) {
					resolve(res);
				} else {
					// 帐号失效情况
					reject(res);
				}
			}).catch(err => {
				// alert("出错了 > post request " + url + "<>" + JSON.stringify(params), err);
				console.log("出错了 > post request " + url + "<>" + JSON.stringify(params), err);
			})
		} catch (e) {
			console.log(e);
			reject();
		}
	})
}
function postImg(url, params, noToken) {
	params = params || {};
	if (!params['token']) {
		// // 完善统一token处理
		// TODO: 需要针对不需要token的页面，进行特殊操作
		let token = Vue.prototype.appUtils.getToken(()=>{
			get(url, params, noToken);
		});
		if (!token) {
			if (!noToken) {
				return;
			}
		}
		params['token'] = token;
		
	}
	return new Promise((resolve, reject) => {
		try{
			axios.post(url+params.get("userid"), params).then(res => {
				res = typeof (res) === 'string' ? JSON.parse(res) : res;
				res = res.data;
				if (validResCode(res)) {
					resolve(res);
				} else {
					// 帐号失效情况
					reject(res);
				}
			}).catch(err => {
				// alert("出错了 > post request " + url + "<>" + JSON.stringify(params), err);
				console.log("出错了 > post request " + url + "<>" + JSON.stringify(params), err);
			})
		} catch (e) {
			console.log(e);
			reject();
		}
	})
}
function get(url, params, noToken) {
	params = params || {};
	if (!params['token']) {
		// // 完善统一token处理
		// TODO: 需要针对不需要token的页面，进行特殊操作
		let token = Vue.prototype.appUtils.getToken(()=>{
			get(url, params, noToken);
		});
		if (!token) {
			if (!noToken) {
				return;
			}
		}
		params['token'] = token;
	}
	return new Promise((resolve, reject) => {
		try {
			axios.get(url, { params: params }).then(res => {
				res = typeof (res) === 'string' ? JSON.parse(res) : res;
				res = res.data;
				if (validResCode(res)) {
					resolve(res);
				} else {
					// 帐号失效情况
					reject(res);
				}
			}).catch(err => {
				// alert("出错了 > get request " + url + "<>" + JSON.stringify(params), err);
				console.log("出错了 > get request " + url + "<>" + JSON.stringify(params), err);
			})
		} catch (e) {
			console.log(e);
			reject();
		}
	})
}

function validResCode (res) {
	if (!res.code) {
		if (res.status) {
			res.code = res.status + '';
		} else if (res.state) {
			res.code = res.state + '';
		}
		console.log(" unknow res code ... " + JSON.stringify(res));
	}
	if (res.code + '' === '401' || res.code + '' === '216') { // 不要问我为什么，要问后端各种同学版本
		// 认为是帐号失效状态，进行刷新操作
		if (Vue.prototype.sysEnv === 'pc') {
			// 非app从新登陆，可能因此导致网页端 无限刷新问题 add xwj 201-08-01
			Vue.prototype.webUtils.toWebLogin();
		} else {
			Vue.prototype.appUtils.refreshToken();
		}
		return false;
	} else {
		return true;
	}
}
