import {post,get} from "@/api/requestOne";
import Vue from 'vue';
export const ister = params=>post('/miniprogram/forum/recommend/user/intrest',params);
export const indexList = params=>post('/miniprogram/forum/recommend/topic/list',params);

export const personCenterIndex = params=>post('/miniprogram/user/info',params);
// 商品详情
export const goodsDetail = params=>post('/miniprogram/mall/commodity/detail',params);

// 商品详情店里立即购买去的复制口令页面
export const buyNow = params=>post('/miniprogram/mall/link/share',params);

// 我的全部消息
export const allMessage = params => post('/miniprogram/message/unread/count', params);
// 获赞列表
export const getPraise = params => post('/miniprogram/message/list', params);
// 新增关注
export const getNewAttention = params => post('/miniprogram/message/list', params);
// 新增评论
export const getComment = params => post('/miniprogram/message/list', params);
// 通知消息
export const getMessage = params => post('/miniprogram/message/list', params);
// 我的粉丝
export const getMyFan = params => post('/miniprogram/message/list', params);
// 我的关注
export const getMyAttention = params => post('/miniprogram/message/list', params);
// 我的关注取消
export const getMyAttentionRemove = params => post('/miniprogram/message/list', params);
// 点赞  首页点赞 收藏 喜欢请求
export const haveFav = params => post('/miniprogram/forum/topic/update', params);
//首页关注
export const indexFollow = params => post('/miniprogram/forum/user/follow/list',params);
//首页当条详情
export const indexOneDetail = params => post('/miniprogram/forum/recommend/topic/get',params);
//首页获取发现type
export const getTypeList = params => post('/miniprogram/forum/discovery/commoditycategory/list',params);
//首页获取发现列表数据
export const getFindData = params => post('/miniprogram/forum/discovery/topic/list',params);
export const getSearchFindData = params => post('/miniprogram/forum/search/topic/list',params);
//首页获取附近列表数据
export const getAroundData = params => post('/miniprogram/forum/nearby/topic/list',params);
//首页获取评论接口
export const getTalksList = params => post('/miniprogram/forum/topic/comment/detail',params);
//评论帖子
export const sendTalks = params => post("/miniprogram/forum/topic/comment/add", params);


// 配置商品
export const setGoods_get = params => post('/miniprogram/user/topic/commodity/list', params);
export const setGoods_set = params => post('/miniprogram/user/topic/commodity/update', params);

// 商品页-type
export const shopTypeList = params=>get('/miniprogram/mall/type/list',params);
// 商品页-列表
export const shopGoodsList = params=>post('/miniprogram/mall/commodity/list',params);
// 获取累计收益
export const cumulativeIncome = params => post('/miniprogram/user/cumulativeIncomeList', params);
// 即将到账收益
export const comingSoon = params => post('/miniprogram/user/preIncomeList', params);
// 额度红包
export const amount = params => post('/miniprogram/user/quotaList', params);

// “我的作品”列表
export const myWorksList = params => post('/miniprogram/forum/my/topic/list', params);

export const myShopListAjax = params => post('/miniprogram/forum/recommend/topic/list', params);

export const myColletctionAjax = params => post('/miniprogram/forum/recommend/topic/get', params);

export const addOrDisAttention = params => post('/miniprogram/forum/user/follow/list', params);

export const deleteWork = params => post('/miniprogram/forum/topic/remove', params);

//发布作品
export const sendPostData = params => post('/miniprogram/forum/my/topic/post',params);
//获取作品详情
export const getPostDetail = params => post('/miniprogram/forum/my/topic/detail',params);
//添加关注列表
export const getAddAttention = parpms => post('/miniprogram/forum/followuser/tag/list',parpms);
//添加关注页获取列表
export const getFollowUser = params => post('/miniprogram/forum/followuser/list',params);
//我的作品获取列表
export const getMoreWord = params => post('/miniprogram/forum/my/topic/detail/list', params);
//获取我的收藏列表
export const getMyCollection = params => post('/miniprogram/forum/my/storetopic/list',params);

// FIXME: 下午茶相关
/**
 * 用户会员卡情况
 * @author xwj 2019-05-25
 * {token:string}
 */
// export const vipInfo = params=>post('/tea/vip/info',params);
export const vipInfo = (params, bf)=>postRequest('/miniprogram/tea/vip/info',params);
/**
 * 用户充值会员卡
 * @author xwj 2019-05-25
 * {token:string,money:string}
 */
// export const vipRecharge = params=>post('/tea/vip/recharge',params);
export const vipRecharge = (params, bf)=>postRequest('/miniprogram/tea/vip/recharge',params);
/**
 * 下午茶商品总列表
 * @author xwj 2019-05-28
 * {token:string}
 */
export const teaItemList = (params, bf)=>postRequest('/miniprogram/tea/commodity/list',params);

/**
 * 下午茶购物车列表
 * @author xwj 2019-05-28
 * {token:string}
 */
export const teaCartInfo = (params, bf)=>postRequest('/miniprogram/tea/cart/list',params);
/**
 * 下午茶购物车变更数量
 * @author xwj 2019-05-28
 * {token:string,commid:number,purchaseNum:string}
 */
export const teaCartChange = (params, bf)=>postRequest('/miniprogram/tea/cart/set',params);

/**
 * 下午茶接龙信息列表
 * @author xwj 2019-05-28
 * {pageNo:number,pageSize:number}
 */
export const teaRecentList = (params, bf)=>postRequest('/miniprogram/tea/order/recentOrders',params);

/**
 * 下午茶可用区域列表
 * @author xwj 2019-05-28
 * {token:string}
 */
export const teaAreaList = (params, bf)=>postRequest('/miniprogram/tea/area/list',params);
/**
 * 下午茶选择目标区域
 * @author xwj 2019-05-29
 * {token:string}
 */
export const teaAreaSel = (params, bf)=>postRequest('/miniprogram/tea/area/update',params);

//下午茶单品详情页
export const teaItemDetail = (params, bf)=>postRequest('/miniprogram/tea/commodity/detail',params);

/**
 * 下午茶预订单页面，送达时间获取
 * @author xwj 2019-05-30
 * {token:string}
 */
export const teaDeliverTime = (params, bf)=>postRequest('/miniprogram/tea/purchase/deliverList',params);

/*启动页选择标签*/
export const getStartType = params => post("/miniprogram/forum/tag/list", params);//获取标签
export const sendStartType = params => post("/miniprogram/forum/tag/update", params);//提交标签

/**
 * 我的地址列表
 * @author xwj 2019-05-29
 * @param {} params
 * @param {*} bf
 */
export const myAddrList = (params, bf)=>postRequest('/miniprogram/tea/address/list',params);
/**
 * 增加一个地址
 * @author xwj 2019-05-29
 * @param {} params
 * @param {*} bf
 */
export const addAddr = (params, bf)=>postRequest('/miniprogram/tea/address/add',params);
/**
 * 修改目标地址
 * @author xwj 2019-05-29
 * @param {} params
 * @param {*} bf
 */
export const updAddr = (params, bf)=>postRequest('/miniprogram/tea/address/update',params);
/**
 * 删除目标地址
 * @author xwj 2019-05-29
 * @param {} params
 * @param {*} bf
 */
export const delAddr = (params, bf)=>postRequest('/miniprogram/tea/address/delete',params);
/**
 * 设置一个地址为默认（选定）地址
 * @author xwj 2019-05-29
 * @param {*} params
 * @param {*} bf
 */
export const selAddr = (params, bf)=>postRequest('/miniprogram/tea/address/setDefaultAddress',params);
/**
 * 得到默认（选定）地址
 * @author xwj 2019-05-29
 * @param {*} params
 * @param {*} bf
 */
export const getAddr = (params, bf)=>postRequest('/miniprogram/tea/address/getDefault',params);
/**
 * 获得三级联动区域数据 xwj 2019-05-29
 * @author xwj 2019-05-29
 * {token:string}
 */
export const addrList = (params, bf)=>postRequest('/miniprogram/tea/address/config',params);
// 获取用户状态
export const userStatus = (params, bf)=>postRequest('/miniprogram/tea/commodity/isNewUser',params);

/**
 * 进行post请求
 * @param {*} path
 * @param {*} params
 */
function postRequest(path, params) {
	// path = 'http://10.4.72.68:8081' + path;
	// path = 'http://10.4.72.152:8083' + path;
	if (!params) {
		params = {};
	}
	if (!params['token']) {
		params['token'] = Vue.prototype.token;
	}
	//  params['token'] = "456"; // 临时测试写死
	// if (url.indexOf('?') === -1) {
	// 	url += '?token=' + params['token'];
	// } else {
	// 	url += '@token=' + params['token'];
	// }
	// delete params['token'];
	// console.log(" to post >> " + path, params);
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err =>{
			// alert("出错了 > post request ", err);
		});
	});
}
