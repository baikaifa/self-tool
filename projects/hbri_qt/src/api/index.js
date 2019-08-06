import { post, get } from "@/api/request"
/*登录注册接口*/
export const phoneRegister = (params) => post("/auth/register/mobilephone", params);//手机注册
export const getMsgCode = (params) => post("/auth/mobile/code", params);//获取短信验证码
export const getInviterInfo = (params) => post("/auth/user/querybyinvitecode", params);//获取邀请人信息
export const psLogin = (params) => post("/auth/login/password", params);//手机密码登录
export const getSerTime = () => post("/auth/login/servertime");///获取服务器时间
export const codeLogin = (params) => post("/auth/login/mobilephone", params);//验证码登录
export const resetPsw = (params) => post("/auth/password/forget", params);//重置密码
export const setPassword = (params) => post("/auth/register/password", params); //设置密码
export const getRandomnumber = (params) => post("/auth/register/randomnumber", params); // 获取随机数组,需要传sid
export const webchatLogin = (params) => post("/auth/login/weixin", params); // 微信登录
export const bindMobile = (params) => post("/auth/bindmobilenumber", params);//绑定手机号

/*个人中心接口*/
export const getTags = (params) => post("/user/tag/list", params); //获取标签
export const updateTags = (params) => post("/user/tag/update", params); // 修改标签
export const myFans = (params) => post("/user/fans/list", params); // 粉丝列表
export const userInfo = (params) => post("/user/info", params); // 我的(个人中心)
export const editNick = (params) => post("/user/nickname/update", params); // 修改昵称
export const editAvatar = (params) => post("/user/avatar/update", params); // 修改头像
export const uploadAvatar = (params, header) => post("/user/avatar/upload", params, header); // 上传头像
export const bindAlipay = (params) => post("/user/alipay/bind", params); // 绑定(修改)支付宝
export const checkPhoneNum = (params) => post("/user/mobile/check", params); // 修改手机号之前验证原来的手机号
export const userProfit = (params) => post("/user/assest/info", params); // 收益
export const withdraw = (params) => post("/user/withdraw", params); // 申请提现
export const noticeList = (params) => post("/user/message/list", params); // 消息中心
export const inOutComeDetail = (params) => post("/user/inout/list", params); // 收支明细
export const myCollection = (params) => post("/user/collect/list", params); // 我的收藏
export const getConfig = (params) => post("/user/message/config", params); // 查看消息设置
export const updateConfig = (params) => post("/user/message/update", params); // 设置消息通知
export const profitDetail = (params) => post("/user/income/detail", params); // 收益结算明细
export const invite = (params) => post("/user/invite", params); // 邀请

// 首页接口
export const homeBannerList = (params) => get("/items/banner", params); // 首页banner
export const homeChannelList = (params) => get("/items/channel/list", params); // 首页频道
export const homeGoodsList = (params) => get("/items/query", params); // 首页商品列表
export const goodsDetail = (params) => get("/items/detail", params); // 首页商品列表
export const shareGoods = (params) => get("/items/create/share", params); // 分享商品
export const goodsCollect = (params) => get("/items/collection", params); // 收藏商品
export const allClass = (params) => get("/items/cat/list", params); // 获取所有分类
export const checkAuth = (params) => get("/taobao/auth", params); // 检查是否已进行过淘宝授权
export const getAuthLink = (params) => get("/taobao/getauthlink", params); // 获取淘宝授权url
export const getCutTicket = (params) => get("/items/receiveCoupon", params); // 获取优惠券
export const getScanType = (params) => get("/items/qrCodeType", params); // 获取扫描商品信息
export const specialTopicDetail = (params) => get("/items/specialTopicDetail", params); // 获取专题详情
export const specialTopicList = (params) => get("/items/specialTopicList", params); // 获取专题列表

//订单
export const onlineOrder = (params) => post("/user/order/list", params); // 获取线上订单接口
//参数 status 0：全部 1：即将到账 2：已到账 3：已失效，　 startTime 订单查询开始时间 long11位时间戳，endTime 订单查询结束时间 long11位时间戳，type：0