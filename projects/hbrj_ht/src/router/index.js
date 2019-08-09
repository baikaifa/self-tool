import Vue from 'vue'
import Router from 'vue-router'
import { getLocalData} from "@/utils/base"
Vue.use(Router)


const login = () => import('@/pages/login');//登录页面
const goodsStore = () => import('@/pages/goods/goodsStore');//商品库页面
const goodsDetail = () => import('@/pages/goods/goodsDetail');//商品详情页
const category = () => import('@/pages/goods/category');//商品品类库
const testModal = () => import('@/pages/goods/testModal');//
const cycle = () => import('@/pages/goods/cycle');//商品回收站
const accountMan = () => import('@/pages/setting/accountMan');//账户管理

const roleMan = () => import('@/pages/setting/role');//角色管理
const topicManage=()=>import('@/pages/operManage/thematicManagement');//专题管理
const opeLog = () => import('@/pages/setting/log');//日志列表
const selfSet = ()=> import('@/pages/setting/personalSetting');//个人设置
const goodsForsale = () => import('@/pages/goods/goodsForsale');//在售商品管理
const orderList = ()=> import('@/pages/business/order');//运营管理-订单列表
const orderDetail = ()=> import('@/pages/business/orderDetail');//运营管理-订单详情
const orderGoodsDetail = ()=> import('@/pages/business/orderGoodsDetail');//运营管理-订单详情
const vipDetails = () => import('@/pages/business/vipDetails');//会员详情

const goodsLog = () => import('@/pages/goods/goodsLog');//操作日志
const imgTopic = () => import('@/pages/operManage/createImgTopic');//图片专题
const advertSite = () => import('@/pages/operManage/advertisingSpace');//广告位
const updateGoods = () => import('@/pages/goods/updateGoods');//查询商品详情
const pullGoodsList = () => import('@/pages/goods/pullGoodsList');//查询商品详情

const createAd = () => import('@/pages/operManage/createAd');//创建广告
const goodsOutRule = () => import('@/pages/goods/goodsOutRule');//添加商品拉取规则
const kinds = () => import('@/pages/operManage/kindsManage');//广告的分类管理
const goodsListPop = () => import('@/pages/operManage/goodsListPop');//商品列表弹窗

const thematicManagement = () => import('@/pages/operManage/thematicManagement');//专题列表
const goodsTopic = () => import('@/pages/operManage/goodsTopic');//商品专题




let router =  new Router({
  routes: [
    {
      name:'opeLog',
      component:opeLog,
      path:'/opeLog',
      meta:{
        frame:true
      }
    },
    {
      name:'roleMan',
      component:roleMan,
      path:'/roleMan',
      meta:{
        frame:true
      }
    },{
      name:'topicManage',
      component:topicManage,
      path:'/topicManage',
      meta:{
        frame:true
      }
    },
    {
      name:'login',
      component:login,
      path:'/login',
      meta:{
		frame:false,
      }
    },
    {
      name:"goodsDetail",
      component: goodsDetail,
      path:'/goodsDetail',
      meta: {
        frame: true
      }
    },
    {
      name: "goodsStore",
      component: goodsStore,
      path: '/',
      meta: {
        frame: true,
        keepAlive: true
      }
    },
    {
      name: "category",
      component: category,
      path: '/category',
      meta: {
        frame: true
      }
    },
    {
      name: "test",
      component: testModal,
      path: '/test',
      meta: {
        frame: true
      }
    },
    {
      name: "cycle",
      component: cycle,
      path: '/cycle',
      meta: {
        frame: true
      }
    },
    {
      name: "accountMan",
      component: accountMan,
      path: '/accountMan',
      meta: {
        frame: true
      },

	},
	{
		name: "selfSet",
		component: selfSet,
		path: '/selfSet',
		meta: {
			frame: true
		},

	},{
		name: "orderList",
		component: orderList,
		path: '/orderList',
		meta: {
			frame: true
		},

	},
    {
      name: "vipDetails",
      component: vipDetails,
      path: '/vipDetails',
      meta: {
        frame: true
      },
    },
	{
		name: "goodsForsale",
		component: goodsForsale,
		path: '/goodsForsale',
		meta: {
			frame: true,
      keepAlive: true
		}	
  },
  {
		name: "orderDetail",
		component: orderDetail,
		path: '/orderDetail',
		meta: {
			frame: true
		}	
  },
  {
    name: "orderGoodsDetail",
    component: orderGoodsDetail,
    path: '/orderGoodsDetail',
    meta: {
      frame: true
    }
  },
  {
    name: "goodsLog",
    component: goodsLog,
    path: '/goodsLog',
    meta: {
      frame: true
    }
  },
  {
    name:'updateGoods',
    component:updateGoods,
    path:'/updateGoods',
    meta:{
      frame:true
    }
  },
  {
    name:'advertSite',
    component:advertSite,
    path:'/advertSite',
    meta:{
      frame:true,
      keepAlive: true
    }
  },
  {
    name:'imgTopic',
    component:imgTopic,
    path:'/imgTopic',
    meta:{
      frame:true
    }

  },
    {
      name:'createAd',
      component:createAd,
      path:'/createAd',
      meta:{
        frame:true
      }
    },

  {
    name:'goodsOutRule',
    component:goodsOutRule,
    path:'/goodsOutRule',
    meta:{
      frame:true
    }
  },
  {
    name: 'kinds',
    component: kinds,
    path: '/kinds',
    meta: {
      frame: true
    }
  },

  {
    name:'importGoods',
    component:pullGoodsList,
    path:'/importGoods',
    meta:{
      frame:true
    }
  },
    {
      name:'goodsListPop',
      component:goodsListPop,
      path:'/goodsListPop',
      meta:{
        frame:true
      }
    },
    {
      name:'thematicManagement',
      component:thematicManagement,
      path:'/thematicManagement',
      meta:{
        frame:true
      }
    },
    {
      name: 'goodsTopic',
      component: goodsTopic,
      path: '/goodsTopic',
      meta: {
        frame: true
      }
    }

  
]})

router.beforeEach((to, from, next) => {
	if (to.name !== "login") {
		let sid = getLocalData("hbrj_sid");
		let uid = getLocalData("hbrj_uid");
		if (sid == '' && uid == '') {
			router.push({name:'login'});
		} else {
			next();
		}
	} else {
		next();
	}

})
export default router;
