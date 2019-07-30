import Vue from "vue"
import Router from "vue-router"

// start
const start = ()=>import(/*webpackChunkName:"index"*/'@/pages/start/start'); //App启动页
// signInAndUp
const register = ()=>import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/register');//注册界面
const inviteRegister = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/inviteRegister');//邀请码注册
const bindPhone = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/bindPhone');//绑定手机号
const psLogin = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/psLogin');//登录
const forgetPwd = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/forgetPwd');//忘记密码
const setPwd = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/setPwd'); //设置密码
const codeLogin = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/codeLogin');//验证码登录
const phRegister = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/phRegister');//手机号注册
const wechatLogin = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/wechatLogin');//微信登陆
const hbDocument = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/hbDocument');//用户协议
const secretView = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/secretView');//隐私策略
const chooseTags = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/chooseTags');//选择标签
const weChatBind = () => import(/*webpackChunkName:"index"*/'@/pages/signInAndUp/weChatBind');//绑定微信
// personal 个人中心
const editMyTag = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/editMyTag');//我的标签
const myFans = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/myFans');//粉丝管理
const otherFans = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/otherFans');//推荐粉丝
const personalCenter = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/personalCenter');//个人中心
const myGrowth = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/myGrowth');//个人成长值
const growthRule = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/growthRule');//成长值规则
const setting = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/setting');//设置页面
const editNick = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/editNick');//修改昵称
const bindAlipay = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/bindAlipay');//绑定(修改)支付宝
const editPhone = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/editPhone');//修改手机号
const myNotice = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/myNotice');//我的消息
const incomeNotice = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/incomeNotice');//收益消息
const getCash = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/getCash');//提现
const userBalance = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/userBalance');//余额
const userProfit = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/userProfit');//收益
const myCollection = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/myCollection');//我的收藏
const setNotice = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/setNotice');//修改消息通知
const invite = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/invite');//邀请
const myOrder = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/myOrder');//线上线下订单
//首页
const home = () => import('@/pages/home/home');//首页
const goodsDetail = () => import('@/pages/home/goodsDetail');//商品详情页
const shareGoods = () => import('@/pages/home/shareGoods');//分享页
const goodsPost = () => import('@/pages/home/goodsPost');//9.9包邮
const searchGoods = () => import('@/pages/home/searchGoods');//搜索页面
const rushBuy = () => import('@/pages/home/rushBuy');//淘抢购
const teaItemList = () => import('@/pages/home/teaItemList');//分类
const incomeDetail = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/incomeDetail');//收支明细-收入
const outDetail = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/outDetail');//收支明细-支出
const profitDetail = () => import(/*webpackChunkName:"personal"*/'@/pages/personal/profitDetail');//收益结算明细

const scanGoodsDetail = () => import('@/pages/home/scanGoodsDetail');//扫一扫商品详情页
const specialList = () => import('@/pages/home/specialList');//专题页面

Vue.use(Router);
let router = new Router({
    // mode:'history',
    routes:[
        {
          path: '/',
          redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: home ,
            meta:{
                keepAlive:true
            }
        },
        {
            path:'/start',
            name:'start',
            component: start
        },
        {
            path:'/register',
            name:'register',
            component: register,
            meta: {
                noEnter: true
            }
        },
        {
            name:'inviteRegister',
            path: '/inviteRegister',
            component: inviteRegister
        },
        {
            name:"bindPhone",
            path: '/bindPhone',
            component: bindPhone           
        },
        {
            path: '/psLogin',
            name: 'psLogin',
            component: psLogin,
            meta:{
                noEnter:true
            }
        },
        {
            name:"forgetPwd",
            path: '/forgetPwd',
            component: forgetPwd
        },
        {
            name:"setPwd",
            path: '/setPwd',
            component: setPwd,
            meta: {
             background: '#f2f2f2'
           }
        },
        {
            path: '/codeLogin',
            name: 'codeLogin',
            component: codeLogin,
            meta: {
                noEnter: true
            }
        },
        {
            path: '/phRegister',
            name: 'phRegister',
            component: phRegister,
            meta: {
                noEnter: true
            }
        },
        {
            path: '/wechatLogin',
            name: 'wechatLogin',
            component: wechatLogin,
            meta: {
                //noEnter: true
            }
        },
        {
            path: '/editMyTag',
            name: 'editMyTag',
            component: editMyTag,
            meta:{
                isLogin:true
            }
        },
        {
            path: '/hbDocument',
            name:'hbDocument',
            component: hbDocument
        },
        {
            path: '/chooseTags',
            name: 'chooseTags',
            component: chooseTags
        },
        {
            path: '/myFans',
            name: 'myFans',
            component: myFans,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/secretView',
            name:'secretView',
            component: secretView
        },
        {
            path: '/personalCenter',
            name:'personalCenter',
            component: personalCenter,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/',
            name: 'home',
            component: home ,
            meta:{
                keepAlive:true
            }
        },
        {
            path: '/myGrowth',
            name: 'myGrowth',
            component: myGrowth,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/growthRule',
            name: 'growthRule',
            component: growthRule,
            meta: {
                isLogin: true
            }
        },
        {
            path:'/setting',
            name: 'setting',
            component: setting,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/editNick',
            name: 'editNick',
            component: editNick,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/bindAlipay',
            name: 'bindAlipay',
            component: bindAlipay,
            meta: {
                isLogin: true
            }
        },
        {
            path:'/goodsDetail',
            name:'goodsDetail',
            component: goodsDetail,
            meta: {
                background: "#f6f6f6",
                //keepAlive: true
            }
        },
        {
            path:'/scanGoodsDetail',
            name:'scanGoodsDetail',
            component: scanGoodsDetail,
        },
        {
            path: '/myNotice',
            name: 'myNotice',
            component: myNotice,
            meta:{
                isLogin:true,
                background: '#f5f5f5'
            }
        },
        {
            path: '/incomeNotice',
            name: 'incomeNotice',
            component: incomeNotice,
            meta:{
                isLogin:true,
                background: '#f5f5f5'
            }
        },{
            path: '/editPhone',
            name: 'editPhone',
            component: editPhone,
            meta:{
                isLogin:true
            }
        },{
            path: '/incomeDetail',
            name: 'incomeDetail',
            component: incomeDetail,
            meta:{
                isLogin:true,
                background: '#f5f5f5'
            }
        },{
            path: '/outDetail',
            name: 'outDetail',
            component: outDetail,
            meta:{
                isLogin:true,
                background: '#f5f5f5'
            }
        },{
            path: '/getCash',
            name: 'getCash',
            component: getCash,
            meta: {
                isLogin: true
            }
        },{
            path: '/userBalance',
            name: 'userBalance',
            component: userBalance,
            meta: {
                isLogin: true,
                background: '#f5f5f5'
            }
        },{
            path: '/userProfit',
            name: 'userProfit',
            component: userProfit,
            meta: {
                isLogin: true,
                background: '#f5f5f5'
            }
        },
        {
            path: '/profitDetail',
            name: 'profitDetail',
            component: profitDetail,
            meta: {
                isLogin: true,
                background: '#f5f5f5'
            }
        },
        {
            path: '/shareGoods',
            name: 'shareGoods',
            component: shareGoods   
        },
        {
            path: '/otherFans',
            name: 'otherFans',
            component: otherFans
        },
        {
            path: '/goodsPost',
            name: 'goodsPost',
            component: goodsPost
        },
        {
            path: '/rushBuy',
            name: 'rushBuy',
            component: rushBuy
        },
        {
            path: '/myCollection',
            name: 'myCollection',
            component: myCollection,
            meta: {
                background: '#f2f2f2'
            }
        },{
            path: '/setNotice',
            name: 'setNotice',
            component: setNotice,
            meta: {
                background: '#f2f2f2',
                keepAlive: true // 需要被缓存
            }
        },
        {   
            path: '/searchGoods',
            name: 'searchGoods',
            component: searchGoods,
         
        },{   
            path: '/teaItemList',
            name: 'teaItemList',
            component: teaItemList  
        },{   
            path: '/invite',
            name: 'invite',
            component: invite  
        },{   
            path: '/myOrder',
            name: 'myOrder',
            component: myOrder,
            meta: {
                background: '#f2f2f2'
            }
        }
        ,{   
            path: '/weChatBind',
            name: 'weChatBind',
            component: weChatBind,
           
        },{
            path: '/specialList',
            name: 'specialList',
            component: specialList,
            meta: {
                background: '#f1f1f1'
            }
        }
    ]
})
router.beforeEach((to, from, next) => {
    let hb_sid = localStorage.getItem("hbxj_sid");
 /* 路由发生变化修改页面背景色 */
    if (to.meta.background) {
        document.body.style.backgroundColor = to.meta.background;
    }else{
        document.body.style.backgroundColor = "#fff";
    }
    if (to.meta.isLogin && !hb_sid){
        router.push({name:'register'})
    } else if (to.meta.noEnter && hb_sid){
    }else{
        next()
    }
   
});


export default router
