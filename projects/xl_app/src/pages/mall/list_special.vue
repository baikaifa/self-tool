<template>
	<div class="spec">
		<eleTit :bak="true" :title="pTitle"></eleTit>
		<div class="loading" v-if="isShowLoad">
			<div class="loadingIn">
				<img src="../../assets/img/xileloading.gif" alt="">
				<p>加载中...</p>
			</div>
		</div>
		<!-- TODO: 头部分 -->
		<div class="spe_head">
			<div class="spe_carc" v-if="isCc"><!-- 精选专区 -->
				<div :class="{spe_active: type === 'cc'}" @click.stop="changeCc('cc')" @touch.stop="changeCc('cc')">精选专区</div>
				<div :class="{spe_active: type === 'tn'}" @click.stop="changeCc('tn')" @touch.stop="changeCc('tn')">3.9元区</div>
				<div :class="{spe_active: type === 'sn'}" @click.stop="changeCc('sn')" @touch.stop="changeCc('sn')">6.9元区</div>
				<div :class="{spe_active: type === 'nn'}" @click.stop="changeCc('nn')" @touch.stop="changeCc('nn')">9.9元区</div>
			</div>
			<!-- TODO: 排序部分 -->
			<div class="spe_sort" v-else>
				<div class="secondBtnContent">
					<div class="titleSecondBtn" :class="[sort.none !==0 ? 'spe_active selectBorder':'noselectBorder']" @click.stop="changeSort('none')" @touch.stop="changeSort('none')">
						<font>综合</font>
					</div>
					<div class="titleSecondBtn"  :class="[sort.sales !==0 ? 'spe_active selectBorder':'noselectBorder']" @click.stop="changeSort('sales')">
						<font>销量</font>
						<div class="shop_title_sort" :class="{shop_sort_up: sort.sales === 1, shop_sort_down: sort.sales === 2}">
							<i class="iconfont iconpaixujiantoushang shop_title_sort_up"></i>
							<i class="iconfont iconpaixujiantouxia shop_title_sort_down"></i>
						</div>
					</div>
					<div class="titleSecondBtn" :class="[sort.price !==0 ? 'spe_active selectBorder':'noselectBorder']" @click.stop="changeSort('price')">
						<font>价格</font>
						<div class="shop_title_sort" :class="{shop_sort_up: sort.price === 1, shop_sort_down: sort.price === 2}">
							<i class="iconfont iconpaixujiantoushang shop_title_sort_up"></i>
							<i class="iconfont iconpaixujiantouxia shop_title_sort_down"></i>
						</div>
					</div>
					<div class="titleSecondBtn" :class="[sort.tk !==0 ? 'spe_active selectBorder':'noselectBorder']" @click.stop="changeSort('tk')">
						<font>券额</font>
						<div class="shop_title_sort" :class="{shop_sort_up: sort.tk === 1, shop_sort_down: sort.tk === 2}">
							<i class="iconfont iconpaixujiantoushang shop_title_sort_up"></i>
							<i class="iconfont iconpaixujiantouxia shop_title_sort_down"></i>
						</div>
					</div>
				</div>
				<div class="spe_sor_sha clear"></div>
			</div>
			<div class="clear"></div>
		</div>
		<!-- TODO: 数据列表 -->
		<div class="spe_ite_list touch_scroll" @touchstart="inTouchDown" @touchmove="onTouchMove" @touchend="inTouchUp" @mousedown="inTouchDown" @mousemove="onTouchMove" @mouseup="inTouchUp">
			<list :items="items" ref="itemList" @refresh="refList" @infinite="lodList"></list>
			<div class="clear"></div>
		</div>
	</div>
</template>
<!-- TODO: -->
<script>
import {reqMall} from "../../utils/request";
import list from "@/components/mall/mlist";
import eleTit from "@/components/title/title";

export default {
	data: function() {
		return {
			pr: { // 分页相关数据
				page: 1, // 当前页数
				size: 20, // 目标页数据量
			},
			sort: { // 排序部分
				none: 1, // 默认模式：0，未选中；1，被选中；
				sales: 0, // 销量：0，未选中；1，正序；2，倒序；
				price: 0, // 价格：0，未选中；1，正序；2，倒序；
				tk: 0, // 券额：0，未选中；1，正序；2，倒序；
			},
			items: [], // 商品列表
			type:'ed', // 当前类型，每日推荐（EveryDay）：ed，精选专区（CarefullyChosen）：cc，9.9专区（Nine）：nn，全球海淘（Global）：gb，聚划算（CostEffective）：cs，淘抢购（PurchaseAndPurchase）：pp，
			isCc: false, // 是否精选区
			pTitle: '每日推荐', // 页面名称
			isShowLoad:false,//loading是否加载,
			onTouch: { // 列表点击控制
				inDown: false,
				inTouchMove:false,
				lockTime:0,
				tPoint:{x:0,y:0}
			}
		}
	},
	/**
	 * 组件检查 FIXME: 相关内容
	 */
	components: {
		list, eleTit
	},
	// TODO: 加载开始时逻辑
	created() {
		// 得到请求参数
		const type = this.$route.query.sp;
		if (!type) {
			return;
		} else {
			switch (type) {
				case 'cc': // 精选专区
					this.isCc = true;
					this.pTitle = '精选专区';
					break;
				case 'tn': // 3.9专区
					this.isCc = true;
					this.pTitle = '3块9专区';
					break;
				case 'sn': // 6.9专区
					this.isCc = true;
					this.pTitle = '6块9专区';
					break;
				case 'nn': // 9.9专区
					this.isCc = true;
					this.pTitle = '9块9专区';
					break;
				case 'gb':
					this.pTitle = '全球海淘';
					break;
				case 'cs':
					this.pTitle = '聚划算';
					break;
				case 'pp':
					this.pTitle = '淘抢购';
					break;
				case 'br':
					this.pTitle = '品牌特卖';
					break;
				default:
					return;
			}
			this.type = type;
		}
	},
	// TODO: 加载完成后逻辑
	mounted() {
		this.getDataList();
	},
	// TODO: 一般方法集合
	methods: {
		inTouchDown: function(e) {
			// console.log(" inTouchDown ... " , e);
			this.onTouch.inDown = true;
			if (e.targetTouches) {
				let tt = e.targetTouches[0];
				if (tt) {
					this.onTouch.tPoint.x = e.pageX;
					this.onTouch.tPoint.y = e.pageY;
				}
			}
		},
		onTouchMove: function(e) {
			if (this.onTouch.inDown) {
				// console.log(" onTouchMove ... " , e);
				if (e.targetTouches) {
					let tt = e.targetTouches[0];
					if (tt) {
						if (Math.abs(tt.pageX - this.onTouch.tPoint.x) > 5) {
							return;
						}
						if (Math.abs(tt.pageY - this.onTouch.tPoint.y) > 5) {
							return;
						}
						if (!this.onTouch.inTouchMove){
							this.onTouch.inTouchMove = true;
						}
					}
				}
			}
		},
		inTouchUp: function(e) {
			// console.log("	inTouchUp ... " , e);
			if (this.onTouch.inTouchMove) {
				this.onTouch.lockTime = new Date().getTime() + 700;
				this.onTouch.inTouchMove = false;
			}
			this.onTouch.inDown = false;
			this.onTouch.tPoint.x = 0;
			this.onTouch.tPoint.y = 0;
		},

		/**
		 * 显示所有标签的商品
		 * @author xwj 2019-06-24
		 */
		getDataList(page) {
			const param = {
				pageNo: (!page || page < 2) ? 1 : page,
				pageSize: this.pr.size,
				type: this.getType(),
				sort: this.getSortParam()
			};
			const that = this;
			this.hideLoad();
			reqMall.typeList(param).then(res => {
				this.isShowLoad = false;
				that.resTagData(res, param.pageNo);
			});
		},
		hideLoad(){
			this.isShowLoad = true;
			setTimeout(() => {
				this.isShowLoad = false;
			}, 3000);
		},

		/**
		 * 处理标签返回的数据
		 * @author xwj 2019-06-22
		 */
		resTagData(res, page) {
			if (page < 2) {
				this.items = res.data;
				this.pr.page = 1;
				this.itemsTop();
				this.finishPullToRefresh();
			} else {
				for (let k in res.data) {
					this.items.push(res.data[k]);
				}
				this.pr.page = page + 1;
			}
			if (res.data.length < this.pr.size) {
				this.finishInfinite(true);
			} else {
				this.finishInfinite(false);
			}
		},
		/**
		 * 变更专区类型
		 * @author xwj 2019-07-28
		 */
		changeCc(tag) {
			if (tag === this.type) {
				// 不进行任何处理
				return;
			}
			switch (tag) {
				case 'cc':
				case 'tn':
				case 'sn':
				case 'nn':
					this.$router.push({name: 'mallSpec', query: {sp: tag}});
					return;
			}
			return;
		},
		/**
		 * 变更排序内容
		 * @author xwj 2019-06-25
		 */
		changeSort(tag) {
			for (let k in this.sort) {
				if (k === tag) {
					switch (this.sort[k]) {
						case 0:
							this.sort[k] = 1;
							break;
						case 1:
							if (k === 'none') {
								this.sort[k] = 1;
							} else {
								this.sort[k] = 2;
							}
							break;
						case 2:
							this.sort[k] = 1;
							break;
					}
				} else {
					this.sort[k] = 0;
				}
			}
			// 从新请求数据
			this.refreshReq();
		},
		/**
		 * 得到专区类型值
		 * @author xwj 2019-07-28
		 */
		getType() {
			switch(this.type) {
				case 'cc':
					return 4;
				case 'tn':
					return 5;
				case 'sn':
					return 6;
				case 'nn':
					return 7;
				case 'gb':
					return 1;
				case 'cs':
					return 2;
				case 'pp':
					return 3;
				case 'br':
					return 8;
			}
			return 0;
		},
		/**
		 * 得到排序用参数
		 * @author xwj 2019-06-25
		 */
		getSortParam() {
			// 是分类相关
			if (this.sort.none) {
				return 0;
			} else if (this.sort.sales) {
				return this.sort.sales === 1 ? 1 : -1;
			} else if (this.sort.price) {
				return this.sort.price === 1 ? 2 : -2;
			} else if (this.sort.tk) {
				return this.sort.tk === 1 ? 3 : -3;
			}
			return 0;
		},
		/**
		 * 从新发送请求
		 * @author xwj 2019-06-25
		 */
		refreshReq(page) {
			this.getDataList(page);
		},

		// FIXME: 子页面List专用交互方法接口开始
		/**
		 * 刷新当前列表
		 * @author xwj 2019-06-24
		 */
		refList() {
			this.refreshReq();
		},
		/**
		 * 继续加载当前列表
		 * @author xwj 2019-06-24
		 */
		lodList() {
			this.refreshReq(this.pr.page + 1);
		},
		// FIXME: 子页面List专用接口开始
		finishPullToRefresh() {
			if (this.$refs.itemList && this.$refs.itemList.finishPullToRefresh) {
				this.$refs.itemList.finishPullToRefresh();
			} else {
				const that = this;
				setTimeout(() => {
					that.finishPullToRefresh();
				}, 300);
			}
		},
		finishInfinite(st) {
			if (this.$refs.itemList && this.$refs.itemList.finishInfinite) {
				this.$refs.itemList.finishInfinite(st);
			} else {
				const that = this;
				setTimeout(() => {
					that.finishInfinite(st);
				}, 300);
			}
		},
		/**
		 * 商品列表置顶
		 * @author xwj 2019-06-25
		 */
		itemsTop() {
			if (this.$refs.itemList && this.$refs.itemList.scrollTo) {
				this.$refs.itemList.scrollTo(0, 0, false);
			} else {
				const that = this;
				setTimeout(() => {
					that.itemsTop();
				}, 300);
			}
		},
		// FIXME: 子页面List专用接口结束
	},
}
</script>
<!-- TODO: -->
<style scoped="scoped" type="text/css">
.spec {
	position: relative;
	height: 100vh;
}
.spec .clear {
	clear: both;
	width: 100%;
}
.spec .ft1_item {
	display: inline-block;
	margin-top: 16px;
	margin-left: 10px;
	margin-left: 12px;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 3px;
	height: 46px;
	line-height: 46px;
	overflow: hidden;
	font-size: 28px;
	color:#999;
}
.spec .ft2_item {
	display: inline-block;
	margin-left: 10px;
	margin-top: 12px;
	margin-left: 4px;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 2px;
	height: 36px;
	line-height: 36px;
	overflow: hidden;
	font-size: 24px;
}
.spec .spe_active {
	color: #EF4454 !important;
}
.spec .spe_fail {
	color: #A5A5A5 !important;
}
.spec .spe_head {
	width: 100%;
	height: 75px;
	background:#fff;
}
.spe_head .spe_carc {
	display: flex;
	height: 70px;
	padding-top: 22px;
}
.spe_head .spe_carc > div {
	flex: 1;
	height: 30px;
	font-size: 30px;
	color: #999999;
	text-align: center;
}
/** TODO: 头部标签排序 */
.spec .spe_sort .secondBtnContent {
	margin-top: 3px;
	background: #fff;
	width: 750px;
	height: 70px;
	overflow: hidden;
	display: flex;
	justify-content: space-around;
}
.spec .spe_sort .secondBtnContent .titleSecondBtn {
	/* float: left; */
	/* background-color: #fff; */
	margin-top: 7px;
	/* margin-left: 20px; */
	width: 150px;
	border-radius: 56px;
	height: 56px;
	border-radius: 48px;
	-webkit-border-radius: 48px;
	overflow: hidden;
	display: flex;
	align-items:center;
	justify-content: center;
}
.spec .spe_sort .secondBtnContent .titleSecondBtn font {
	/* float: left; */
	/* margin: 20px 0px 20px 45px; */
	font-size: 24px;
	color: #999999;
	/* height: 24px;
	line-height: 24px; */
}
.spec .spe_sort .secondBtnContent .spe_active font {
	color: #373737 !important;
	font-weight: bold;
}
.spec .spe_sort .secondBtnContent .iconfont {
	font-size: 24px;
}
.spec .spe_sort .secondBtnContent .shop_title_sort {
	/* float: left;
	margin-top: 16px;
	margin-left: 5px; */
	width: 26px;
	height: 26px;
	overflow: hidden;
	position: relative;
	color: #999999;
}
.spec .spe_sort .secondBtnContent .shop_title_sort_up {
	font-size: 26px;
	width: 26px;
	height: 22px;
	line-height: 24px;
	position: absolute;
	top: 0px;
	left: 0px;
	padding: 0px;
	overflow: hidden;
}
.spec .spe_sort .secondBtnContent .shop_sort_up .shop_title_sort_up {
	color: #000000;
}
.spec .spe_sort .secondBtnContent .shop_title_sort_up::before {
	width: 26px;
	height: 22px;
	line-height: 24px;
}
.spec .spe_sort .secondBtnContent .shop_title_sort_down {
	font-size: 26px;
	width: 26px;
	height: 22px;
	line-height: 22px;
	position: absolute;
	bottom: 0px;
	left: 0px;
	padding: 0px;
	overflow: hidden;
}
.spec .spe_sort .secondBtnContent .shop_sort_down .shop_title_sort_down {
	color: #000000;
}
.spec .spe_sort .secondBtnContent .shop_title_sort_down::before {
	width: 26px;
	height: 22px;
	line-height: 22px;
}
.spec .spe_sort .spe_sor_sha {
	height: 8px;
	background:#f3f3f3;
	/* box-shadow: 0px 5px 5px -5px #ccc;  */
}
/** TODO: 商品列表 */
.spec .spe_ite_list {
	width: 100vw;
	/* height: fill-available;
	height: -webkit-fill-available; */
	height: calc(100vh - 173px);
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
	background-color: #fff;
}
.selectBorder{
	background:#f9f9f9;
}
/*loading部分*/
.spec .loading{
	 width: 100vw;
	 height: 100vh;
	 position: fixed;
	 top: 0;
	 left: 0;
	 z-index: 1000000;
  }
 .spec .loadingIn{
	 width: 280px;
	 height: 300px;
	 border-radius: 10px;/*no*/
	 background: rgba(0,0,0,0.5);
	 color: #fff;
	 position: absolute;
	 top: 50%;
	 left: 50%;
	 text-align: center;
	 margin-top: -150px;
	 margin-left: -140px;
  }
 .spec .loadingIn img{
	 width: 160px;
	 height: 160px;
	 margin-top: 50px;
  }
.spec .loadingIn p{
	 padding-top: 20px;
	 font-size: 28px;
}
</style>
