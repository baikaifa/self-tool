<template>
	<div class="inco">
		<eleTit bak="true" bw="true"></eleTit>
		<div class="inc_sea">
			<div class="clear"></div>
			<div class="inc_sea_inp">
				<input type="text" v-model="sea.txt" placeholder="请输入要查询的订单号">
				<div @click.stop="showSea" @touch.stop="showSea"></div>
			</div>
		</div>
		<div class="inc_tit">
			<div :class="{inc_tit_active: !sea.val && tag === 'inc'}" @click.stop="showList('inc')" @touch.stop="showList('inc')">
				<div class="inc_tit_pri">￥{{userData.cumulativeIncome}}</div>
				<div class="inc_tit_txt">累计收益</div>
			</div>
			<div :class="{inc_tit_active: !sea.val && tag === 'cos'}" @click.stop="showList('cos')" @touch.stop="showList('cos')">
				<div class="inc_tit_pri">￥{{userData.preIncome}}</div>
				<div class="inc_tit_txt">即将到账</div>
			</div>
			<div :class="{inc_tit_active: !sea.val && tag === 'amo'}" @click.stop="showList('amo')" @touch.stop="showList('cos')">
				<div class="inc_tit_pri">￥{{userData.quota}}</div>
				<div class="inc_tit_txt">活动奖励</div>
			</div>
			<div :class="{inc_tit_active: !sea.val && tag === 'xlb'}" @click.stop="showList('xlb')" @touch.stop="showList('cos')">
				<div class="inc_tit_pri">{{xlb}}</div>
				<div class="inc_tit_txt">喜乐币</div>
			</div>
		</div>
		<!-- 设置优惠券 -->
		<div v-show="tag === 'amo'">
			<p class="setQuan" @click="setQuan">
				<!-- <img src="../../assets/sort.png" /> -->
				<img src="../../assets/img/personal/sort.png" />
				设置优惠券</p>
			<div v-show="isSetQuan" class="quanList">
				<p class="quanTitle">请选择优先使用的优惠券</p>
				<div class="couponItem" v-for="(item,index) in couponList" :key="index">
					<!-- <p data-val="2">优先使用<span>即将过期</span>的优惠券</p> -->
					<p v-html="item.name"></p>
					<div class="fx">
						<div class="btnList"  @click="moveItem('down',index)" v-if="index != couponList.length-1" >
							<span class="downBtn">下移</span>
						</div>
						<div class="btnList" @click="moveItem('up',index)" v-if="index != 0">
							<span  class="upBtn">上移</span>
						</div>
					</div>
				</div>
				<div class="sureQuan"><button class="sureQuanBtn" @click="sureQuan">确定</button></div>
			</div>
		</div>
		<!-- 兑换 -->
		<div v-show="tag === 'xlb'">
			<p class="setQuan" @click="setDuiHuan">
				<!-- <img src="../../assets/sort.png" /> -->
				<!-- <img src="../../assets/img/personal/sort.png" /> -->
				我要兑换</p>
			<div v-show="isSetQuan" class="quanList">
				<p class="quanTitle">请选择优先使用的优惠券</p>
				<div class="couponItem" v-for="(item,index) in couponList" :key="index">
					<!-- <p data-val="2">优先使用<span>即将过期</span>的优惠券</p> -->
					<p v-html="item.name"></p>
					<div class="fx">
						<div class="btnList"  @click="moveItem('down',index)" v-if="index != couponList.length-1" >
							<span class="downBtn">下移</span>
						</div>
						<div class="btnList" @click="moveItem('up',index)" v-if="index != 0">
							<span  class="upBtn">上移</span>
						</div>
					</div>
				</div>
				<div class="sureQuan"><button class="sureQuanBtn" @click="sureQuan">确定</button></div>
			</div>
		</div>
		<!-- 列表 -->
		<div class="inc_list">
			<div v-if="sea.val" class="inc_list_sea">
				<div v-if="sea.msg" style="width: 100%; text-align: center">
					{{sea.msg}}:{{sea.val}}
				</div>
				<template v-else>
					<!-- 显示搜索结果页 -->
					<div class="inc_list_sea_tit">
						<div class="inc_list_sea_lab">订单号:</div>
						<div class="inc_list_sea_val">{{sea.data.orderNum}}</div>
					</div>
					<div class="clear"></div>
					<div class="inc_list_sea_cont">
						<div class="clear"></div>
						<div class="inc_list_sea_row">
							<div class="inc_list_sea_lab">商品名称:</div>
							<div class="inc_list_sea_val spec_font">{{sea.data.commName}}</div>
						</div>
						<div class="inc_list_sea_row">
							<div class="inc_list_sea_lab">下单时间:</div>
							<div class="inc_list_sea_val">{{sea.data.orderTimeStr}}</div>
						</div>
						<div class="inc_list_sea_row">
							<div class="inc_list_sea_lab">返现金额:</div>
							<div class="inc_list_sea_val">{{sea.data.price}}</div>
						</div>
						<div class="inc_list_sea_row">
							<div class="inc_list_sea_lab">确认收货时间:</div>
							<div class="inc_list_sea_val">{{sea.data.settleTimeStr}}</div>
						</div>
						<div class="inc_list_sea_row">
							<div class="inc_list_sea_lab">结算时间:</div>
							<div class="inc_list_sea_val">{{sea.data.sendTimeStr}}</div>
						</div>
						<div class="inc_list_sea_row">
							<div class="inc_list_sea_lab">提现金额:</div>
							<div class="inc_list_sea_val">{{sea.data.sendPrice}}</div>
						</div>
						<div class="inc_list_sea_row">
							<div class="inc_list_sea_lab">预计返现小助手:</div>
							<div class="inc_list_sea_val">{{sea.data.robotName}}</div>
						</div>
						<div class="clear"></div>
					</div>
				</template>
				<div class="clear"></div>
			</div>
			<div v-else class="inc_list_cont">
				<div class='amountItemTitle'>
					<div class="itemTitleTime" v-if="tag === 'inc'">结算时间</div>
					<div class="itemTitleTime" v-else-if="tag === 'cos'">购买时间</div>
					<div class="itemTitleTime" v-else>创建时间</div>
					<div class="itemTitleReason">原因</div>
					<div class="itemTitleMoney">面额</div>
				</div>
				<div v-if="!init">
				</div>
				<div v-else-if="sList.length>0" class="inc_list_tit_cont">
<scroller :on-refresh="refList" :on-infinite="lodList" ref="incoScro" noDataText="没有更多记录">
	<!-- 显示列表数据 -->
	<div class="amountItem" v-for="(item,index) in sList" :key='index' bindtap='goDetail' :class="{inc_list_hlred: item.tradeType === 5 || item.tradeType === 14}">
		<div class="itemTime" v-if="tag === 'inc'">{{item.respTime | getDate}}</div>
		<div class="itemTime" v-else>{{item.orderTime | getDate}}</div>
		<div class="itemReason">
			<div>{{item.tradeTypeDesc}}</div>
			<div v-if="item.isShowOrderDetail === 1">{{item.orderNum}}</div>
			<div v-if="item.isShowOrderDetail === 1 || item.isShowOrderDetail === 2 || tag==='xlb'" class="spec_font">{{item.commDesc}}</div>
			<div v-if="item.settleDesc">结算时间:{{item.settleDesc}}</div>
		</div>
		<div class="itemMoney" :class="{unlk_font:item.priceDesc.indexOf('-') !== -1}">{{item.priceDesc}}</div>
	</div>
</scroller>
				</div>
				<div class='amountNone' v-else>
				<!-- <div class='amountNone'> -->
					<div class="noData">
						<!-- <img src="../../assets/noData.png" /> -->
						<img src="../../assets/img/personal/noData.png" />
						<p class="noText">暂无数据</p>
					</div>
				</div>
			</div>
		</div>
		<div class="duiHuanModal" v-show="duiHuanModal">
			<div class="duiHuanWrap">
				<div class="duiHuanWrapper">
					<div class="duiHuanHeadr">
						金币兑换
					</div>
					<div class="duiHuanContent">
						<p>汇率：1000喜乐币=1元优惠券/额度红包</p>
						<p>我的喜乐币：{{xlb}}</p>
						<p>额度红包：{{hongbao}}元</p>
						<div class="duihuaRadio">
							<div  @click="clickRadio(1)">
								<img :src="couponImg" alt=""><span>优惠券</span>
							</div>
							<div class="duihuaRadioitem" @click="clickRadio(0)">
								<img :src="redenvImg" alt=""><span>额度红包</span>
							</div>
						</div>
						<div class="duihuanInput">
							<input type="number" placeholder="输入要兑换的喜乐币金额" v-model="xlbNum">
							<button class="duihuanBtn" @click="duiHuanHandler">兑换</button>
						</div>
						<p class="duiHuanModaltips">提示：优惠券整元兑换</p>
					</div>
				</div>
				<span class="iconfont iconxibguanbi closeBtn" @click="closeDuiHuanModal"></span>
			</div>
		</div>
	</div>
</template>
<!-- FIXME: -->
<script>
// import {reqPersonal} from "../../api/aloneIndex";
import {reqPersonal} from "../../utils/request";
import eleTit from "@/components/title/title";
import Vue from "vue"
import redradioImg from "@/assets/img/personal/radiored.png";
import whiteradioImg from "@/assets/img/personal/radiowhite.png";
export default {
	components:{ eleTit },
	data:function() {
		return {
			from:'xlyghapp',
			init: false,
			enZhid: '',
			sea:{
				val: '', // 目标搜索内容
				txt: '',
				data:[], // 搜索结果数据
				msg:''
			},
			tags:['inc', 'cos', 'amo'], // 累计收益，即将到账，购物红包
			tag: 'inc', // 当前选中的列表
			userData:{
				cumulativeIncome: 0, // 累计收益
				preIncome: 0, // 即将到账
				quota: 0 // 购物红包
			}, // 用户数据
			dataList:{
				size: 50,
				inc:{
					list:[], // 累计收益数据列表
					page:1
				},
				cos:{
					list: [], // 即将到账数据列表
					page: 1
				},
				amo:{
					list: [], // 购物红包数据列表
					page: 1
				},
				xlb:{
					list: [], // 购物红包数据列表
					page: 1
				}
			},
			sList:[],
			mapCoupon:[
				{value:1,name:'优先使用<span class="hightRed">额度红包</span>'},
				{value:2,name:'优先使用<span class="hightRed">即将过期</span>的优惠券'},
				{value:3,name:'优先使用<span class="hightRed">面额高</span>的优惠券'}
				],
			couponList:[],
			isSetQuan:false,//是否显示优惠券排序
			duiHuanModal: false,
			xlb: '0',
			hongbao: '0',
			xlbNum: '',
			couponImg:'',
			redenvImg:'',
			currRadio:1
		}
	},// end data
	/**
	 * TODO: 
	 */
	created() { // 初始化相关

	this.couponImg = redradioImg;
	this.redenvImg = whiteradioImg;
		// 得到param中数据
		this.sea.val = this.$route.query.orderNum;
		this.sea.txt = this.sea.val;
		this.tag = this.$route.query.tag;
		// console.log("tag",this.tag)
		if (!this.tag) {
			this.tag = 'inc';
		}
		this.getXlb();
		this.getCouponSort();
	},
	/**
	 * 主要进行初始化数据请求
	 * @author xwj 2019-06-21
	 */
	mounted() {
		console.log(" in mounted >>>");
		if (this.$refs.incoScro && this.$refs.incoScro.finishInfinite) {
			this.$refs.incoScro.finishInfinite(false);
			this.$refs.incoScro.finishPullToRefresh();
		}
		this.getUser();
		if (this.sea.val) {
			// 是搜索
			this.getSea();
		} else {
			// 是列表
			this.getListData(this.tag);
		}
	},
	// TODO:
	methods: {
		//点击优惠券
		clickRadio(d){
			console.log(d);
			this.currRadio = d;
			if(d==1){
				this.couponImg = redradioImg;
				this.redenvImg = whiteradioImg;
			}else if(d==0){
				this.couponImg = whiteradioImg;
				this.redenvImg = redradioImg;
			}
		},
		getXlb() {			
			this.xlb = this.$route.query.xlb || 0;
			this.transXlb();
		},
		transXlb() {
			this.hongbao = Math.floor(this.xlb/1000);
		},
		moveItem(type,index){//移动优惠券
			if(type== "down"){
				let item = this.couponList[index];
				Vue.set(this.couponList, index, this.couponList[index+1]);
				Vue.set(this.couponList, index+1, item);
			}
			if(type == "up"){
				let item = this.couponList[index];
				Vue.set(this.couponList, index, this.couponList[index-1]);
				Vue.set(this.couponList, index-1, item);
			}
		},
		getCouponSort(){//得到优惠券的排序
			let params = {
				enZhid:this.enZhid,// 用户加密串
				from: this.from
			}
			let that = this;
			reqPersonal.couponList(params).then((data) =>{
				if(data.code == 200){
					let arr = data.data.split(",");
					arr.forEach((item,index) =>{
						let cont = that.mapCoupon[item-1];
						this.couponList.push(cont);
					});
				}
			})
		},
		sureQuan(){//确定优惠券的排序
			this.isSetQuan = false;
			let sortArr = [];
			let sortStr = "";
			this.couponList.forEach((item) =>{
				sortArr.push(item.value);
			})
			sortStr = sortArr.join(",");
			let params = {
				enZhid:this.enZhid,// 用户加密串
				sort:sortStr,
				from: this.from
			}
			reqPersonal.uploadCouponList(params).then((data) =>{

			})
		},
		setQuan(){//给优惠券排序
			this.isSetQuan = !this.isSetQuan;
		},
		/**
		 * 得到用户信息
		 * @author xwj 2019-06-21
		 */
		getUser() {
			const that = this;
			reqPersonal.userInfo({enZhid: this.enZhid,from: this.from}).then(res => {
			// reqPersonal.userInfo({enZhid: this.enZhid}).then(res => {
				console.log(" bak 1 getUser >>> " , res);
				that.userData.cumulativeIncome = res.data.totalIncome / 100; // 累计收益
				that.userData.preIncome = res.data.preIncome / 100; // 即将到账
				that.userData.quota = res.data.quota / 100; // 购物红包
			});
		},
		showSea() {
			if (this.sea.txt) {
				this.$router.push({name:'income',query:{enZhid:this.enZhid,orderNum:this.sea.txt}});
				this.sea.val = this.sea.txt;
				this.getSea();
			}
		},
		showList(tag) {
			this.isSetQuan=false;
			console.log(" to tag ... ", tag);
			this.tag = tag;
			// this.$router.push({name:'income',query:{enZhid:this.enZhid,tag:tag,xlb: this.xlb}});
			this.refList();
		},
		/**
		 * 进行搜索
		 * @author xwj 2019-06-21
		 */
		getSea() {
			const that = this;
			reqPersonal.search({enZhid: this.enZhid, orderNum: this.sea.val,from: this.from}).then(res => {
				console.log(" bak 2 getUser >>> " , res);
				if (res.code !== 200 && res.code !== '200') {
					that.sea.msg = res.msg;
				} else {
					that.sea.msg = '';
					that.sea.data = res.data;
					that.sea.data.commName = res.data.commNames.join('<br />');
				}
			});
		},
		/**
		 * 获取累计收益
		 * @author xwj 2019-06-21
		 */
		getListData(tag, page) {
			const that = this;
			const param = {
				enZhid: this.enZhid,
				// enZhid: this.enZhid,
				pageNum: (!page || page < 2) ? 1 : page,
				pageSize: this.dataList.size,
				from: this.from
			}
			reqPersonal[tag + 'List'](param).then(res => {
				this.sList = [];
				console.log(" bak 3 getUser >>> " , res);
				if (res.code == 200) {
					if(this.tag == 'xlb') {
						// this.xlb =2000;
						res = res.data;
						this.xlb = res.totalMoney;
						this.transXlb();
					}
					that.resData(res, tag, param.pageNum);
				} else {
					console.error(" 数据获取失败... ");
				}
			});
		},
		/**
		 * 处理接收到的数据
		 * @author xwj 2019-06-21
		 */
		resData(res, tag, page) {
			const obj = this.dataList[tag];
			this.sea.val = '';
			if (page < 2) {
				obj.list.splice(0, obj.list.length);
				try {
					this.$nextTick(()=>{
						if(this.$refs.incoScro){
							this.$refs.incoScro.finishPullToRefresh();
						}
					})
				} catch (e) {
					console.log(e);
				}
			}
			
			for (let k in res.data) {
				obj.list.push(res.data[k]);
			}
			// for (let k in res.data) {
			// 	obj.list.push(res.data[k]);
			// }
			obj.page = page;
			this.sList = obj.list;
			this.init = true;
			if (res.data.length < this.dataList.size) {
				this.$nextTick(()=>{
					if(this.$refs.incoScro) {
						this.$refs.incoScro.finishInfinite(true);
					}
				})
			} else {
				this.$nextTick(()=>{
					if(this.$refs.incoScro) {
						this.$refs.incoScro.finishInfinite(false);
					}
					// this.$refs.incoScro.finishInfinite(false);
				})
				
			}
		},
		/**
		 * 刷新列表数据
		 * @author xwj 2019-06-26
		 */
		refList() {
			this.getListData(this.tag);
		},
		/**
		 * 加载列表更多数据
		 * @author xwj 2019-06-26
		 */
		lodList() {
			this.getListData(this.tag, this.dataList[this.tag].page + 1);
		},
		// 兑换
		setDuiHuan() {
			this.duiHuanModal = true;
		},
		// 关闭弹窗
		closeDuiHuanModal() {
			this.duiHuanModal = false;
			this.xlbNum = '';
		},
		// 兑换事件
		duiHuanHandler() {
			if(this.xlbNum == '' || !this.xlbNum) {
				alert("请输入正确的兑换币");
				return;
			}
			if(this.xlbNum > this.xlb) {
				alert("不能超过总的兑换币");
				return;
			}
			let params = {};
			params.transCount = this.xlbNum;
			params.type = this.currRadio;
			reqPersonal.xlbTrans(params).then((res)=>{
				if(res.code == 200) {
					alert("金币兑换成功");
					this.closeDuiHuanModal();
					this.getXlb();
					this.refList();
				}
			})
			
		}
	},
	// TODO:
	filters: {
		/**
		 * 转换日期
		 * @author xwj 2019-06-21
		 */
		getDate(val){
			let date = new Date(val);
			// date = date.toLocaleDateString().replace(/\//g, '-');
			// return date
			// 因为部分机型的兼容性问题，进行的调整 xwj 2019-07-19
			let year = date.getFullYear(); //得到年份
			let month = date.getMonth() + 1; //得到月份
			let dat = date.getDate(); //得到日期
			return year + '-' + month + '-' + dat;
		},
	},
	activated() {
		console.log(" in activated >>>");
		if (this.$refs.incoScro && this.$refs.incoScro.finishInfinite) {
			this.$refs.incoScro.finishInfinite(false);
			this.$refs.incoScro.finishPullToRefresh();
		}
		this.getUser();
		if (this.sea.val) {
			// 是搜索
			this.getSea();
		} else {
			// 是列表
			this.getListData(this.tag);
		}
	},
	
}
</script>
<!-- FIXME: -->
<style type="text/css" scope>
/** 全局 */
body {
	top: 0px;
	height: 100%;

}
.inco{
	/*overflow: hidden;*/
	/*-webkit-overflow-scrolling: touch;*/
	position: fixed;
}
.inco .clear{
	clear: both
}
.inco .spec_font {
	color: #E97B8F !important;
}
.inco .unlk_font {
	color: #ccc !important;
}
.inco {
	/* height: 100%; */
}
.inco .app_head {
	background-color: #EF4454;
	color: #ffffff !important;
}
/** TODO: 头部搜索部分 */
.inco .inc_sea {
	width: 750px;
	height: 250px;
	background-color: #EF4454;
	/* padding-top: 75px; */
}
.inco .inc_sea .inc_sea_inp {
	margin-top: 65px;
	margin-left: 45px;
	width: 660px;
	height: 100px;
	overflow: hidden;
	background-color: #FFFFFF;
	border: #B15F65 solid 1px;
	border-radius: 8px;
	-webkit-border-radius: 8px;
}
.inco .inc_sea .inc_sea_inp > input {
	float: left;
	font-size: 28px;
	margin-left: 30px;
	margin-top: 30px;
	height: 40px;
	line-height: 40px;
	width: 540px;
	overflow: hidden;
}
.inco .inc_sea .inc_sea_inp > div{
	float: right;
	cursor: pointer;
	margin-right: 30px;
	margin-top: 24px;
	width: 52px;
	height: 52px;
	overflow: hidden;
	background-image: url(../../assets/img/personal/find@2x.png);
	/* background-image: url(../../assets/find@2x.png); */
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}
/** TODO: 多(3)标签切换部分 */
.inco .inc_tit {
	width: 750px;
	height: 108px;
	display: flex;
	display: -webkit-flex; 
}
.inco .inc_tit > div {
	cursor: pointer;
	-webkit-flex: 1; 
	flex: 1;
	background-color: #F2606D;
}
.inco .inc_tit div {
	color: #FFA0A4;
	text-align: center;
}
.inco .inc_tit .inc_tit_active {
	background-color: #DB3D4C;
}
.inco .inc_tit .inc_tit_active div {
	color: #F7FFFF !important;
}
.inco .inc_tit .inc_tit_pri {
	margin-top: 20px;
	font-size: 30px;
	height: 30px;
	line-height: 30px;
}
.inco .inc_tit .inc_tit_txt {
	margin-top: 10px;
	font-size: 24px;
	height: 24px;
	line-height: 24px;
}
/** 列表部分样式 */
.inco .inc_list {
	/* margin-top: 20px; */
	width: 750px;
	height: calc(100vh - 250px - 108px - 20px);
}
/** TODO: 列表样式，搜索数据结果 */
.inco .inc_list .inc_list_sea {
	font-size: 26px;
	color: #898989;
	background-color: #fff;
}
.inco .inc_list .inc_list_sea .inc_list_sea_tit {
	font-size: 26px;
	height: 90px;
	line-height: 90px;
	border-bottom: #eee solid 1px;
}
.inco .inc_list .inc_list_sea .inc_list_sea_tit > div {
	height: 90px !important;
	line-height: 90px !important;
}
.inco .inc_list .inc_list_sea .inc_list_sea_cont {
	padding-top: 10px;
	padding-bottom: 10px;
}
.inco .inc_list .inc_list_sea .inc_list_sea_lab {
	float: left;
	width: 250px;
	height: 60px;
	line-height: 60px;
	overflow: hidden;
	text-align: right;
}
.inco .inc_list .inc_list_sea .inc_list_sea_val {
	float: left;
	margin-left: 10px;
	width: 470px;
	height: 60px;
	line-height: 60px;
	overflow: hidden;
}
.inco .inc_list .inc_list_hlred {
	color: #E97B8F !important;
	font-weight: 600;
	background-color: #FFF4C1;
}
/** TODO: 列表样式，完全copy */
.inco .amountItemTitle{
	display: flex;
	justify-content: space-between;
	padding:0 30px;
	font-size: 28px;
	color: #ccc;
	height:68px;
	line-height: 68px;
	background-color: #fff;
	border-bottom:1px solid #eee; 
}
.inco .inc_list_tit_cont {
	position: relative;
	height: fill-available;
	height: -webkit-fill-available;
}
.inco .amountItemTitle .itemTitleTime,.itemTitleMoney{
	width:140px;
	text-align: center;
}
.inco .amountItemTitle .itemTitleReason{
	flex: 1;
	text-align: center;
	padding:0 10px;
}
.inco .amountItem{
	width:100%;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 24px;
	padding:15px 30px;
	border-bottom:1px solid #eee; 
	background-color: #fff;
	color: #666;
}
.inco .amountItem .itemTime{
	width:140px;
	text-align: center;
}
.inco .amountItem .itemReason{
	flex: 1;
	text-align: center;
	padding:0 10px;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.inco .amountItem .itemcommDesc{
	color: #f86562;
}
.inco .amountItem .itemMoney{
	color: #f86562;
	width:130px;
	text-align: center;  
}
.inco .amountNone{
	height:50vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.inco .noData img{
	width:320px;
}
.inco .noText{
	text-align: center;
	padding-top:30px;
	font-size:28px;
	color:#999;
}
.inco .couponItem{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left:20px;
	border-bottom:1px solid #ebebeb;
}
.inco .setQuan{
	padding: 10px 0;
	/* height: 42px; */
	background-color: #fff6d9;
	font-size: 24px;
	color: #d0a20b;
	text-align: right;
	padding-right:25px;
	line-height: 42px;
}
.inco .setQuan img{
	padding:3px 10px 10px 10px;
	width:24px;
	background-size: 100%;
}
.inco .quanList{
	height: 340px;
	background-color: #f5f5f5;
	font-size: 24px;
	color: #999999;
}
.inco .quanTitle{
	font-size: 28px;
	color: #343434;
	padding:0 20px;
	background-color: #ebebeb;
}
.inco .hightRed{
	color: #ef4454;
}
.inco .quanList p{
	height: 65px;
	line-height: 65px;
}
.inco .quanList .downBtn{
	width: 60px;
	height: 30px;
	font-size: 20px;
	line-height: 30px;
	color: #f56c6c;
	border-radius: 5px;
	border: solid 1px #f56c6c;
	text-align: center;
}
.inco .quanList .upBtn{
	width: 60px;
	height: 30px;
	font-size: 20px;
	line-height: 30px;
	color: #409eff;
	border-radius: 5px;
	border: solid 1px #409eff;
	text-align: center;
}
.inco .sureQuan{
	height:76px;
	border-bottom: #ebebeb;
	padding-right:25px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.inco .sureQuanBtn{
	width: 100px;
	height: 36px;
	background-color: #ef4454;
	border-radius: 5px;
	color: #ffffff;
	font-size: 24px;
	border:none;
}
.inco .quanList .fx{
	display: flex;
	height:65px;
}
.inco .quanList .btnList{
	display: flex;
	height:65px;
	align-items: center;
	padding:0 20px 0 0;
}
/* 兑换弹窗 */
.duiHuanModal {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0,.6);
}
.duiHuanModal .duiHuanModaltips{
	padding-top: 30px;
	color: #ef4454;
	text-align: left;
	font-size: 26px;
	line-height: 1.8;
}
.duiHuanModal .duiHuanWrap{
	position: absolute;
	top: 50%;
	left: 50%;
	/* background: #fff; */
	transform: translate(-50%,-50%);
	text-align: center;
	/* padding: 0 60px; */
	/* width: 90vw; */
	width: 630px;
}
.duiHuanModal .duiHuanWrap .closeBtn{
	color: #fff;
	font-size: 66px;
	margin-top: 40px;
	display: inline-block;
}
.duiHuanModal .duiHuanWrapper{
	background: #fff;
	border-radius: 30px;/*no*/
}
.duiHuanModal .duiHuanWrapper .duiHuanHeadr{
	text-align: center;
	font-size: 70px;
	color: #fff;
	padding: 70px 0 110px 0;
	background: url('../../assets/img/personal/duihuanHeader.png') no-repeat;
	background-size: contain;
}
.duiHuanModal .duiHuanWrapper .duiHuanContent{
	color: #666;
	font-size: 28px;
	padding: 50px 30px 70px 30px;
}
.duiHuanModal .duiHuanWrapper .duiHuanContent p{
	text-align: left;
	line-height: 1.8;
}
.duiHuanModal .duiHuanContent .duihuaRadio {
	padding-top: 30px;
	display: flex;
	align-items: center;
	font-size: 27.79px;
}
.duiHuanModal .duiHuanContent .duihuaRadio .duihuaRadioitem{
	margin-left: 100px;
}
.duiHuanModal .duiHuanContent .duihuaRadio img{
	height: 30px;
	margin-top:-3px;
}
.duiHuanModal .duiHuanContent .duihuanInput {
	padding-top: 30px;
	display: flex;
	align-items: center;
}
.duiHuanModal .duiHuanContent .duihuanInput input {
	color: #666;
	font-size: 28px;
	height: 70px;
	border: 1px solid #9f9f9f;/*no*/
	border-radius: 10px;
	padding: 0 20px;
	flex: 1;
}
.duiHuanModal .duiHuanWrapper .duiHuanContent .duihuanBtn{
	color: #fff;
	background: url('../../assets/img/personal/duihuanBtn.png') no-repeat;
	background-size: cover; 
	width: 140px;
	height: 70px;
	line-height: 1;
	border: 0;
	border-radius: 10px;
	margin-left: 10px;
}
</style>
<style>
/* .inco .app_head .tit_tit {
	color: #fff;
} */
</style>
