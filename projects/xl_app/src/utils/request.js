import axios from "axios"
import qs from 'Qs'

function getReco(path, params) {
	path = 'http://118.144.88.218:7999' + path;
	return new Promise((resolve, reject) => {
		get(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function postReco(path, params) {
	path = 'http://mp.xunbao88.com.cn/miniprogram' + path;
	// path = 'http://10.4.72.80:8081/miniprogram' + path;
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

function postVerificationCode(path, params) {
	// path = 'http://mp.xunbao88.com.cn/miniprogram' + path;

	 path =  path;
	console.log(path);
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
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
function postMall(path, params) {
	path = 'http://mp.xunbao88.com.cn/miniprogram' + path;
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}


//lwz
function postCao(path, params) {
	path = 'http://mp.xunbao88.com.cn/' + path;
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

function getStaticFile(path) {
	// path = 'http://localhost:8085' + path;
	return new Promise((resolve, reject) => {
		get(path, {}).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

// 社区相关 by gaoxueli -begin
function groupGet(path, params) {
	params=params||{};
	params.token="123";
	//path = 'http://10.4.72.89:8080/wechat_business/xlyghapp' + path;
	path = 'http://zdjqr.xunbao88.com.cn/wechatbusiness/xlyghapp' + path;
	return new Promise((resolve, reject) => {
		get(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function talkGet(path, params) {
	params=params||{};
	params.token="123";
	path = 'http://118.145.5.141/wechatbackend' + path;
	return new Promise((resolve, reject) => {
		get(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

// 个人中心收益
function postIncome(path, params) {
	path = 'http://xilehui.xunbao88.com.cn/cashback' + path;
	// path = 'http://mp.xunbao88.com.cn/miniprogram' + path;
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

// 个人中心更换头像
function postAvatar(path, params) {
	path = 'http://img.xunbao88.com.cn/upload/imgupload' + path;
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
// 个人中心
function postPersonal(path, params) {
	path = 'http://mp.xunbao88.com.cn' + path;
	// path = 'http://10.4.72.80:8081/miniprogram' + path;
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
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
function postTo(path, params) {
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}

export const reqGroup = {

	groupTagList: params => groupGet('/group/classify/list', params), // 群分类
	groupList:params => groupGet('/group/list', params), // 群列表
	joinGroup:params => groupGet('/group/applyjoin', params), // 加群
	groupDetail:params => groupGet('/group/detail/get', params), // 群详情
	groupMembers:params => groupGet('/group/member/list', params), // 群成员
	groupTalk:params => talkGet('/robotMsgAction.do?method=getXlyghGroupMsgInfos', params), // 群聊

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
	typeList: params => postMall('/mall/commodity/queryTypelist', params),
	/**
	 * 首页列表数据
	 * @author xwj 2019-07-28
	 */
	mainList: params => postMall('/mall/commodity/recommend', params),

}

export const reqReco = {
	/**
	 * 搜索结果
	 * @author xwj 2019-06-22
	 */
	tbSearch: params => getReco('/taobao/search_item_v2', params),
	jdSearch: params => getReco('/jd/search_item_v2', params),
	/**
	 * 得到标签数据
	 * @author xwj 2019-06-24
	 */
	tagDatas: params => postReco('/mall/commodity/querylist', params),
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
	userInfo: params => postReco('/user/info', params)
}

//种草相关页面lwz
export const caoApi = {
	postDetail: params => postCao('/forum/recommend/topic/list', params),//帖子详情
	commentList: params => postCao('/forum/topic/comment/detail', params),//评论列表
	interactive: params => postCao('/forum/topic/update', params),//点赞，收藏的接口
	addComment: params => postCao('/forum/topic/comment/add', params),//增加评论
	postFollow: params => postCao('/forum/user/follow/list', params),//关注的接口
	gainLabels:params=> postCao('/forum/tag/list', params),//获取标签
	addBonus: params => postCao('/bonus/add', params),//增加奖励
	hotSearch: params => postCao('/forum/tag/list', params),//热搜词
	/**
	 * 主列表数据
	 * 
	 * @param url 
	 * @param params 
	 * @returns 
	 */
	mainList: params => postCao('/forum/discovery/topic/list', params),
	/**
	 * 搜索数据结果
	 * 
	 * @param url 
	 * @param params 
	 * @returns 
	 */
	mainSear: params => postCao('/forum/search/topic/list', params),
}

//个人页面 baikaifa
export const reqForgetpwd = {
	modifyPhones:params=>postVerificationCode('/XlyghAppLoginServlet?method=getCode',params),
	confirmSubmit:params=>postVerificationCode('http://10.243.5.102:8091/authserver/XlyghAppLoginServlet?method=setPasswd',params),
	changeNickname:params=>postReco('/user/nickname/update',params),
	wixinBind:params=>postReco('/user/bindWechat',params),
	changewixinBind:params=>postReco('/user/getBindWechat',params),
	confirmChange:params=>postVerificationCode('/XlyghAppLoginServlet?method=checkOldPhone',params),
	confirmSetNewPhone:params=>postReco('http://10.243.5.102:8091/authserver/XlyghAppLoginServlet?method=bindPhone',params),
}

// 个人页面 huhuyuan
export const reqPersonal = {
	// 上传用户头像到服务器
	uploadAvatar: params => postAvatar('', params),
	// 个人中心用户信息
	userMessage: params => postPersonal('/user/info/v1', params),
	// 设置页面用户信息
	selfInfo: params => postPersonal('/user/setInfo', params),
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
	// 用户信息
	userInfo: params => postIncome('/alliance.gsp?method=getUserInfo', params),
}
axios.defaults.timeout = 6000;
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
function post(url, params) {
	if (params && !params['token']) {
		params['token'] = '-';
	}
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(params)).then(res => {
			resolve(res.data)
		}).catch(err => {
			alert("出错了 > post request ", err);
		})
	})
}
function get(url, params) {
	if (params && !params['token']) {
		params['token'] = '-';
	}
	return new Promise((resolve, reject) => {
		axios.get(url, { params: params }).then(res => {
			resolve(res.data)
		}).catch(err => {
			alert("出错了 > get request ", err);
		})
	})
}