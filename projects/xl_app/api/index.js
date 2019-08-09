import {post,get} from "@/api/request"

/*订单支付*/
export const payOrderView = params => get("/miniprogram/tea/purchase/toOrderFromComm", params);//支付订单
export const getAllAddress = params => post("/miniprogram/tea/address/list",params);//得到用户的所有地址信息
export const delAddress = params => post("/miniprogram/tea/address/delete",params);//删除一个地址
/*购物车页面*/
export const setPurchaseNum = params => post("/miniprogram/tea/cart/set", params);//商品增加或者减少
export const getorderList = params =>post("/miniprogram/tea/cart/list", params);//购物车列表
export const removeOrderItem = params => post("/miniprogram/tea/cart/remove",params);//删除一个商品
export const selectGoods = params => post("/miniprogram/tea/cart/select",params);//勾选商品

/*订单页面*/
export const getAllOrder = params => get("/miniprogram/tea/order/allOrder",params);//获取全部订单
export const getDoneOrder = params => get("/miniprogram/tea/order/done", params);//获取已完成订单
export const getPaidOrder = params => get("/miniprogram/tea/order/paid", params);//获取待收货订单
export const getTopayOrder = params => get("/miniprogram/tea/order/toPay", params);//获取待付款订单
export const getRefundOrder = params => get("/miniprogram/tea/order/refundingList", params);//获取退货订单
export const confirmReceiveOrder = params => get("/miniprogram/tea/order/receive", params);//确认收货
export const submitOrder = params => get("/miniprogram/tea/order/submitOneOrder", params);//订单支付

/*订单详情*/
export const getOrderDetail = params => get("/miniprogram/tea/order/detail", params);//获取订单详情
export const applyRefund = params => get("/miniprogram/tea/order/refund", params);//申请退款
export const cancelOrder = params => get("/miniprogram/tea/order/cancel", params);//取消订单


/*登陆*/
export const goLogin = params => get("/miniprogram/login/login",params);
export const getOrdered = params => get("/miniprogram/tea/order/notConfirmed ", params);//已下单的订单
