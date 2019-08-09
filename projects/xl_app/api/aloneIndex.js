import { post, get } from "@/api/requestOne";

/**
 * 进行post请求
 * @param {*} path
 * @param {*} params
 */
function postInco(path, params) {
	// path = 'http://xilehui.xunbao88.com.cn' + path;
	path = 'http://xilehui.xunbao88.com.cn/cashback' + path;
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
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
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function postTo(path, params) {
	return new Promise((resolve, reject) => {
		post(path, params).then(res => {
			resolve(res);
		}).catch(err => {
			// alert("出错了 > post request ", err);
		});
	});
}
function openNew(path, params) {
	let url = path;
	if (params) {
		if (path.indexOf('?') === -1) {
			url += '?';
		} else {
			url += '&';
		}
		for (let k in params) {
			url += k + '=' + encodeURIComponent(params[k]) + '&';
		}
	}
	window.open(url);
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
export const reqInco = {
	/**
	 * 我的信息
	 * @author xwj 2019-06-21
	 */
	userInfo: params => postInco('/alliance.gsp?method=getUserInfo', params),
	/**
	 * 得到搜索订单结果
	 * @author xwj 2019-06-21
	 */
	search: params => postInco('/alliance.gsp?method=getOrderHistoryInfo', params),
	/**
	 * 得到累计收益
	 * @author xwj 2019-06-21
	 */
	incList: params => postInco('/alliance.gsp?method=getBillingDetails', params),
	/**
	 * 得到即将到账
	 * @author xwj 2019-06-21
	 */
	cosList: params => postInco('/alliance.gsp?method=getPreIncomeDetails', params),
	/**
	 * 得到购物红包
	 * @author xwj 2019-06-21
	 */
	amoList: params => postInco('/alliance.gsp?method=getQuotaDetails', params),
	//得到优惠券列表
	couponList: params => postInco('/alliance.gsp?method=getCounponSort', params),
	//排序后的优惠券
	uploadCouponList: params => postInco('/alliance.gsp?method=updateCounponSort', params)
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
	 * 得到商品详情信息
	 * @author xwj 2019-06-26
	 */
	commInfo: params => postReco('/mall/commodity/detail', params),
	/**
	 * 开启淘宝搜索详情
	 * @author xwj 2019-06-27
	 */
	seaComm: params => postTo('http://zdjqr.xunbao88.com.cn/wechatbusiness/commodityRecommend/getCommodityTransferLinkInfo', params),
	/**
	 * 开启京东搜索详情
	 * @author xwj 2019-06-28
	 */
	seaJdComm: params => postTo('http://zdjqr.xunbao88.com.cn/wechatbusiness/commodityRecommend/commodityTransLink', params),
	/**
	 * 开启一般详情
	 * @author xwj 2019-06-27
	 */
	openComm: params => openNew('http://zdjqr.xunbao88.com.cn/wechatbusiness/jsp/goods/share2.html', params),
	// openSeaComm: path => openNew(path),
	/**
	 * 标签xml
	 * @author xwj 2019-06-24
	 */
	tagXml: () => getStaticFile('static/category.xml'),

	//淘宝详情同款列表
	allRecommend: params => postTo('http://zdjqr.xunbao88.com.cn/wechatbusiness/commodityRecommend/getAllRecommendCommoditys', params),

	
}

