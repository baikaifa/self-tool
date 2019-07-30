import Vue from 'vue'
import Router from 'vue-router'
// TODO: 商城部分 xwj
/**
 * 商城主页列表
 * @author xwj 2019-07-27
 */
import mallMain from '../pages/mall/main'
/**
 * 教程页，每用户可能仅看到一次
 * @author xwj 2019-07-30
 */
import mallCourse from '../pages/mall/course'
/**
 * 商城推广平台列表页面，淘宝，京东
 * @author xwj 2019-07-27
 */
import mallList from '../pages/mall/list_prom'
/**
 * 商城专区页面，9.9元购，每日推荐，聚划算，淘抢购
 * @author xwj 2019-07-27
 */
import mallListSpecial from '../pages/mall/list_special'
//商城搜索页面lwz
import mallSearch from "@/pages/mall/search"

// /**
//  * 品牌专区列表，品牌特卖
//  * @author xwj 2019-07-27
//  */
// import mallBrands from '../pages/mall/brands'
// /**
//  * 品牌商品列表
//  * @author xwj 2019-07-27
//  */
// import mallListBrand from '../pages/mall/list_brand'

// TODO: 种草部分 liangweizhen
/**
 * 种草主页列表
 * @author xwj 2019-07-27
 */

import shoppingRebate  from '../pages/mall/shoppingRebate'//商品返利
import grassList from '../pages/grassgrowing/list'
import posterHomePage from '../pages/grassgrowing/poster.vue';//种草发帖者
import postDetail from "@/pages/grassgrowing/postDetail";//帖子详情页
import grassSearch from '@/pages/grassgrowing/search'//种草搜索页
import grassLabel  from '@/pages/grassgrowing/label'//种草标签页

// TODO: 社群部分 gaoxueli
import groupList from '../pages/community/groupList'; // 社群列表 
import groupDetail from '../pages/community/groupDetail'; // 社群详情
import groupMemberList from '../pages/community/groupMemberList'; // 群成员列表
import groupSearch from '../pages/community/groupSearch'; // 社群搜索
import groupTalkPage from '../pages/community/groupTalkPage'; // 群聊
import groupWorkPublish from '../pages/community/groupWorkPublish'; // 发布作品

// TODO: 个人中心部分 huhuayuan
import personal from '../pages/personal/personal'; //个人中心
import income from '../pages/personal/income.vue';//累计收益
import setting from '../pages/personal/setting.vue';//设置
import wxBind from '../pages/personal/wxBind.vue';//微信绑定
import wxBindResult from '../pages/personal/wxBindResult.vue';//微信绑定结果
import wxIsBind from '../pages/personal/wxIsBind.vue';//已微信绑定
import changeWxBind from '../pages/personal/changeWxBind.vue';//更换微信绑定
import modifyPhone from '../pages/personal/modifyPhone.vue';//修改手机号
import modifyNewPhone from '../pages/personal/modifyNewPhone.vue';//修改新的手机号
import forgetPwd  from '../pages/personal/forgetPwd.vue'//修改手机号密码
import nickname  from '../pages/personal/nickname.vue'//昵称
import contactCustomerService from '../pages/personal/contactCustomerService.vue'//联系客服

// TODO: 其他杂项部分 zhangtong
import taskCenter from '../pages/other/taskCenter'; //任务中心
import taskRule from '../pages/other/taskRule'; //任务规则
import readingProfit from '../pages/other/readingProfit'; //阅读收益
import incomeDetail from '../pages/other/incomeDetail'; //收益细则
import helpCenter from '../pages/other/helpCenter'; //帮助中心

const rout = new Router({
	mode: 'hash',
	routes: [
		{ // 去到默认页面 xwj
			path: '/',
			redirect: '/mallMain'
		}, 
		// TODO: 主要入口页面 xwj 2019-07-27
		{ // 最初的去到主页列表 xwj
			path: '/mainList',
			redirect: '/mallMain'
		}, { // 去到商城主页 xwj 2019-07-27
			path: '/mallMain',
			name: 'mallMain',
			component: mallMain,
			meta: {
				tit: '喜乐阳光汇',
				appMenu: true,
			}
		}, { // 去到种草主列表 xwj 2019-07-27
			path: '/gongList',
			name: 'gongList',
			component: grassList,
			meta: {
				tit: '种草', //
				appMenu: true,
			}
		}, { // 社群入口 gaoxueli
			path: '/cmutList',
			redirect: '/groupList'
		}, { // 社群列表 gaoxueli
			path: '/groupList',
			name: 'groupList',
			component: groupList,
			meta: {
				tit: '社群',
				appMenu: true,
			}
		}, { // 个人中心 huhuayuan
			path: '/personal',
			name: 'personal',
			component: personal,
			meta: {
				tit: '个人中心', //
				appMenu: true,
			}
		}, 
		// TODO: 商城部分页面 xwj 2019-07-27
		{ // 去到淘宝授权页 xwj 2019-07-27
			path: '/mallCour',
			name: 'mallCour',
			component: mallCourse,
			meta: {
				tit: '淘宝返利教程', // 
				headBak: true,
				appMenu: false,
			}
		}, { // 去到商城推广平台列表 xwj 2019-07-16
			path: '/mallList',
			name: 'mallList',
			component: mallList,
			meta: {
				tit: '返利商城', // 区分京东，淘宝 
				headBak: true,
				appMenu: false,
			}
		}, { // 去到商城专区页面 xwj 2019-07-27
			path: '/mallSpec',
			name: 'mallSpec',
			component: mallListSpecial,
			meta: {
				tit: '专题', // 区分各个分类  
				headBak: true,
				appMenu: false,
			}
		}, {// 去到商城搜索页面lwz
			path: '/mallSearch',
			name: 'mallSearch',
			component: mallSearch,
		},
		// TODO: 种草部分页面 xwj 2019-07-27
		{ // 帖子详情页
			path: '/postDetail',
			name: 'postDetail',
			component: postDetail,
			meta: {
				tit: '种草详情', // 独立内容，个人信息简要 
				headBak: true,
				appMenu: false,
			}
		}, { // 种草个人中心 baikaifa
			path:'/posterHomePage',
			name: 'posterHomePage',
			component: posterHomePage,
			meta: {
				tit: '种草个人独立页', // 个人昵称  
				headBak: true,
				appMenu: false,
			}
		},{ // 种草搜索页 baikaifa
			path:'/gongSear',
			name: 'gongSear',
			component: grassSearch,
			meta: {
				tit: '种草搜索', //   
				headBak: true,
				appMenu: false,
			}
		},{ // 种草标签页 baikaifa
			path:'/gongLab',
			name: 'gongLab',
			component: grassLabel,
			meta: {
				tit: '热门标签', // 热门标签 
				headBak: true,
				appMenu: false,
			}
		}, { // 去到购物返利列表 bkf 2019-07-28
			path: '/shoppingRebate',
			name: 'shoppingRebate',
			component: shoppingRebate,
			meta: {
				tit: '购物返利', //  
				headBak: true,
				appMenu: false,
			}
		}, 
		// TODO: 社群部分页面 xwj 2019-07-27 
		{ // 群成员列表 gaoxueli
			path: '/groupMemberList',
			name: 'groupMemberList',
			component: groupMemberList,
			meta: {
				tit: '群成员', //  
				headBak: true,
				appMenu: false,
			}
		}, { // 社群详情 gaoxueli
			path: '/groupDetail',
			name: 'groupDetail',
			component: groupDetail,
			meta: {
				tit: '社群详情', //  
				headBak: true,
				appMenu: false,
			}
		}, { // 群聊 gaoxueli
			path: '/groupTalkPage',
			name: 'groupTalkPage',
			component: groupTalkPage,
			meta: {
				tit: '群聊', //  
				headBak: true,
				appMenu: false,
			}
		}, { // 社群搜索 gaoxueli
			path: '/groupSearch',
			name: 'groupSearch',
			component: groupSearch,
			meta: {
				tit: '社群搜索', //  
				headBak: true,
				appMenu: false,
			}
		}, { // 发布作品
			path: '/groupWorkPublish',
			name: 'groupWorkPublish',
			component: groupWorkPublish
		},
		// TODO: 个人中心部分页面 xwj 2019-07-27
		{ // 累计收益 huhuayuan
			path: '/income',
			name: 'income',
			component: income,
			meta: {
				tit: '收益详情', //  
				headBak: true,
				appMenu: false,
			}
		}, { // 设置 huhuayuan
			path: '/setting',
			name: 'setting',
			component: setting,
			meta: {
				tit: '个人设置', //  
				headBak: true,
				appMenu: false,
			}
		},{ // 微信绑定 huhuayuan
			path: '/wxBind',
			name: 'wxBind',
			component: wxBind,
			meta: {
				tit: '绑定微信', //  
				headBak: true,
				appMenu: false,
			}
		},{ // 微信已绑定成功 huhuayuan
			path: '/wxIsBind',
			name: 'wxIsBind',
			component: wxIsBind,
			meta: {
				tit: '微信绑定成功', //  
				appMenu: false,
			}
		},{ // 微信绑定结果 huhuayuan
			path: '/wxBindResult',
			name: 'wxBindResult',
			component: wxBindResult,
			meta: {
				tit: '微信绑定结果', //  
				headBak: true,
				appMenu: false,
			}
		},{ // 微信更换绑定 huhuayuan
			path: '/changeWxBind',
			name: 'changeWxBind',
			component: changeWxBind,
			meta: {
				tit: '变更微信绑定', //  
				headBak: true,
				appMenu: false,
			}
		},{ // 修改手机号 huhuayuan
			path: '/modifyPhone',
			name: 'modifyPhone',
			component: modifyPhone,
			meta: {
				tit: '修改手机', //  
				headBak: true,
				appMenu: false,
			}
		},{ // 修改更换新手机号 huhuayuan
			path: '/modifyNewPhone',
			name: 'modifyNewPhone',
			component: modifyNewPhone,
			meta: {
				tit: '绑定手机', //  
				headBak: true,
				appMenu: false,
			}
		},{ // 修改手机号密码 baikaifa
			path: '/forgetPwd',
			name: 'forgetPwd',
			component: forgetPwd,
			meta: {
				tit: '忘记密码', //  
				headBak: true,
				appMenu: false,
			}

		},{ // 修改手机号密码 baikaifa
			path: '/contactCustomerService',
			name: 'contactCustomerService',
			component: contactCustomerService,
			meta: {
				tit: '联系客服', // 
				headBak: true,
				appMenu: false,
			}
		},{ // 昵称 baikaifa
			path: '/nickname',
			name: 'nickname',
			component: nickname,
			meta: {
				tit: '修改昵称', // 
				headBak: true,
				appMenu: false,
			}
		},
		// TODO: 杂项部分页面 xwj 2019-07-27 
		{ // 任务中心 zhangtong
			path: '/taskCenter',
			name: 'taskCenter',
			component: taskCenter,
			meta: {
				tit: '任务中心', //  
				headBak: true,
				appMenu: false,
			}
		}, { // 任务规则 zhangtong
			path: '/taskRule',
			name: 'taskRule',
			component: taskRule,
			meta: {
				tit: '任务规则', //  
				headBak: true,
				appMenu: false,
			}
		}, { // 阅读收益 zhangtong
			path: '/readingProfit',
			name: 'readingProfit',
			component: readingProfit,
			meta: {
				tit: '阅读收益', //  
				headBak: true,
				appMenu: false,
			}
		}, { // 收益细则 zhangtong
			path: '/incomeDetail',
			name: 'incomeDetail',
			component: incomeDetail,
			meta: {
				tit: '收益细则', //  
				headBak: true,
				appMenu: false,
			}
		}, { // 帮助中心 zhangtong
			path: '/helpCenter',
			name: 'helpCenter',
			component: helpCenter,
			meta: {
				tit: '帮助中心', //  
				headBak: true,
				appMenu: false,
			}
		}, 
	]
})
// 将vue-router注册
Vue.use(Router)

// 过滤过程中的重复调用判定
// let inShow = false;
let appMenuShow = false;
// add xwj 2019-07-23
rout.beforeEach((toRout, fromRout, nextFun) => {
	// if(inShow){
	// 	return;
	// } else {
	// 	inShow = true;
	// }
	if (toRout.meta.tit) {// add xwj 2019-07-23
		Vue.prototype.defTitle = toRout.meta.tit;
	} else {
		Vue.prototype.defTitle = '喜乐阳光汇';
	}
	if (toRout.meta.headBak) {// add xwj 2019-07-23
		Vue.prototype.headBak = toRout.meta.headBak;
	}
	if (toRout.meta.appMenu || toRout.meta.appMenu === false) {
		if (appMenuShow !== toRout.meta.appMenu) {
			appMenuShow = toRout.meta.appMenu;
			try {
				switch (Vue.prototype.sysEnv) {
					case 'ios':
						if (toRout.meta.appMenu) {
							window.webkit.messageHandlers.showTab.postMessage();
						} else {
							window.webkit.messageHandlers.hiddenTab.postMessage();
						}
						break;
					case 'android':
						if (toRout.meta.appMenu) {
							window.joybuy.getNavibarVisable();
						} else {
							window.joybuy.getNavibarGone();
						}
						break;
				}
			} catch (e) {
				console.log(e);
			}
		}
	}
	// inShow = false;
	nextFun();
});

export default rout;
