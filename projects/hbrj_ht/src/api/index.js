import {post,get} from "@/api/request.js"
export const userLogin = (params) => post("/auth/login", params);//登录接口

export const goodsList = (params) => post("/item/list", params);//商品列表
export const putItemsShelf = (params) => post("/item/onShelves", params);//商品上架
export const upItemList = (params) => post("item/upItemList", params);//批量上架
export const deleteGoods = (params) => post("/item/delete", params);//商品放入回收站
export const getCategoryList = (params) => post("/category/categoryList", params);//获取商品类目
export const exportGoods = (params) => post("/item/export", params);//商品导出
export const offShellGoods = (params) => post("/item/offShelves", params);//商品下架
export const downItemList = (params) => post("/item/downItemList", params);//批量商品下架
export const goodsImport = (params) => post("/item/import", params); // 入库


export const sortAdd = (params) => post("/category/sortAdd", params);//类目上移
export const sortDecrease = (params) => post("/category/sortDecrease", params);//类目下移
export const sortTop = (params) => post("/category/sortTop", params);//类目置顶
export const sortFoot = (params) => post("/category/sortFoot", params);//类目置底

export const addPullTask = (params) => post("/item/pull/task/add", params);//添加拉取规则
export const pullGoodsList = (params) => post("/item/listCheckItems", params);//拉取商品列表
export const pullGoodsFun = (params) => post("/item/checkOutItems", params);//拉取商品

export const deleteList = (params) => post("/item/delete/list", params);//商品回收站列表
export const revertGoods = (params) => post("/item/restoreItemList", params);//回收站商品还原
export const deleteCycleGoods = (params) => post("/item/deleteItemList", params);//回收站商品删除

export const goodsOnSaleList = (params) => post("/item/onSaleItemList", params);//在售商品列表

export const addAccount = (params) => post("/user/insertUser", params);//新建账户
export const editAccount = (params) => post("/user/updateUser", params);//修改用户信息
export const resetPwd = (params) => post("/user/password", params);//修改用户密码
export const roleList = (params) => post("/user/role/list", params);//角色列表
export const getRoleDetail = (params) => post("/user/role/detail", params);//角色详情
export const addRole = (params) => post("/user/role/add", params);//添加角色
export const updateRole = (params) => post("/user/role/update", params);//编辑角色
export const permissionProps = (params) => post("/user/permission/list", params);//权限列表
export const deleteRole = (params) => post("/user/role/delete", params);//删除角色
export const menuList = (params) => get("/user/selectMenu", params);//侧边栏
export const userList = (params) => get("/user/selectUserList", params);//账户列表
export const deleteUser = (params) => post("/user/deleteUser", params);//删除账户

export const personalSet = (params) => post("/user/password", params);//密码修改

export const operateLogList = (params) => post("/user/operateLogList", params);//用户操作日志

export const orderList = (params) => post("/order/list", params); // 订单列表
export const orderVipDetails = (params) => post("/user/info", params); // 订单会员信息

export const findUpdateItemList = (params) => post("item/findUpdateItemList", params);//查询商品列表

export const itemoperateLogList = (params) => post("itemOperateLog/itemOperateLogList", params);//查询商品操作操作日志


export const orderDetail = (params) => post("/order/detail", params); // 订单详情
export const goodsDetail = (params) => post("/item/detail", params); // 商品详情
export const adverSite = (params) => get("/banner/list", params); // 广告位列表
export const getChannelList = (params) => get("/banner/cat/list", params); // 获取频道列表
export const deleteAdSite = (params) => get("/banner/delete", params); // 删除/作废广告位
export const getBannerDetail = (params) => get("/banner/detail", params); // 获取广告位详情

export const advertisingSpace = (params) => get("/banner/create", params); // 创建广告

export const upbanner = (params) => get("/banner/upload", params); // 广告横幅图片上传
export const createClassA = (params) => get("/category/one/create", params); // 创建/修改一级分类
export const getbyitemIds = (params) => get("/item/getbyitemIds", params); // 根据商品ids获取商品详情
export const createSpecial = (params) => get("/special/topic/item/create", params); // 创建/修改（商品专题）
export const createImgSpecial = (params) => get("/special/topic/create", params); // 创建/修改（图片专题）
export const createClassB = (params) => get("/category/two/create", params); // 创建/修改二级分类
export const deleteClass = (params) => get("/category/delete", params); // 删除二级分类
export const getClassBData = (params) => get("/category/detail", params); // 得到二级分类列表

export const specialList = (params) => get("/special/topic/list", params); // 专题列表页
export const specialTopicDelete = (params) => get("/special/topic/delete", params); // 专题删除
export const specialTopicLog = (params) => get("/special/topic/logs", params); // 专题日志详情
export const addSpecialDetail = (params) => get("/special/topic/detail", params); // 专题详情

export const editSortTop = (params) => get("/item/editSort", params); // 专题详情

export const exportOnSaleItemList = (params) => get("item/exportOnSaleItemList", params); // 导出在线出售Excle

