<template>
	<div class="mall_main">
		<!-- 头部 -->
		<!-- <div class="mall_main_tit">
			<font>喜乐阳光汇</font>
		</div> -->
		<eleTit></eleTit>
		<div class="mall_main_sea">
			<div class="head_sea_cont" @click.stop="toSearch" @touch.stop="toSearch">
				<div class="head_sea_txt">
					<font>搜索商品名称/淘宝宝贝标题</font>
				</div>
			</div>
		</div>
		<div class="mall_main_bann">
			<div class="bann_img bann_img_1"></div>
		</div>
		<div class="mall_main_pf"><!-- 返利平台 -->
			<div class="pf_cont">
				<div class="pf_tit">全店返利</div>
				<div class="pf_eles">
					<div class="pf_ele touch pf_tb" @click.stop="toBakPlatform('tb')" @touch.stop="toBakPlatform('tb')">
					</div>
					<div class="pf_ele touch pf_jd" @click.stop="toBakPlatform('jd')" @touch.stop="toBakPlatform('jd')">
					</div>
					<div class="pf_ele touch pf_vip" @click.stop="toBakPlatform('vip')" @touch.stop="toBakPlatform('vip')">
					</div>
					<div class="pf_ele touch pf_pdd" @click.stop="toBakPlatform('pdd')" @touch.stop="toBakPlatform('pdd')">
					</div>
				</div>
			</div>
		</div>
		<div class="mall_main_spec"><!-- 专题 -->
			<div class="spec_cont">
				<div class="spec_line">
					<div class="spec_doub touch" @click.stop="toSpec('ed')" @touch.stop="toSpec('ed')"><!-- 每日推荐 -->
						<div class="spec_tit">每日推荐</div>
						<div class="spec_sub">用心甄选好物</div>
						<div class="spec_img spec_img_11"></div>
						<div class="spec_img spec_img_12"></div>
					</div>
					<div class="spec_doub touch" @click.stop="toSpec('cc')" @touch.stop="toSpec('cc')"><!-- 9.9元 -->
						<div class="spec_tit">9.9专区</div>
						<div class="spec_sub">超值实惠</div>
						<div class="spec_img spec_img_21"></div>
						<div class="spec_img spec_img_22"></div>
					</div>
				</div>
				<div class="spec_line">
					<div class="spec_only touch" @click.stop="toSpec('gb')" @touch.stop="toSpec('gb')"><!-- 全球海淘 -->
						<div class="spec_tit">全球海淘</div>
						<div class="spec_sub">海淘全球好货</div>
						<div class="spec_img spec_img_31"></div>
					</div>
					<div class="spec_only touch" @click.stop="toSpec('cs')" @touch.stop="toSpec('cs')"><!-- 聚划算 -->
						<div class="spec_tit">聚划算</div>
						<div class="spec_sub">限时精选好货</div>
						<div class="spec_img spec_img_41"></div>
					</div>
					<div class="spec_only touch" @click.stop="toSpec('pp')" @touch.stop="toSpec('pp')"><!-- 淘抢购 -->
						<div class="spec_tit">淘抢购</div>
						<div class="spec_sub">大牌抢购</div>
						<div class="spec_img spec_img_51"></div>
					</div>
					<div class="spec_only touch" @click.stop="toSpec('br')" @touch.stop="toSpec('br')"><!-- 品牌特卖 -->
						<div class="spec_tit">品牌特卖</div>
						<div class="spec_sub">品牌商品折扣</div>
						<div class="spec_img spec_img_61"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="mall_main_prom"><!-- 推广 -->
			<div class="prom_cont">
				<div class="prom_tit">我要推广</div>
				<div class="prom_eles">
					<div class="prom_ele touch prom_tb" @click.stop="toProm('tb')" @touch.stop="toProm('tb')"></div><!-- 淘宝返利商城 -->
					<div class="prom_ele touch prom_jd" @click.stop="toProm('jd')" @touch.stop="toProm('jd')"></div><!-- 京东返利商城 -->
				</div>
			</div>
		</div>
		<div class="mall_main_ites touch_scroll"><!-- 商品列表 -->
			<div class="clear"></div>
			<div class="ites_tit"></div>
			<div class="ites_list" @touchstart="inTouchDown" @touchmove="onTouchMove" @touchend="inTouchUp" @mousedown="inTouchDown" @mousemove="onTouchMove" @mouseup="inTouchUp">
				<list :items="items" ref="itemList" @refresh="refList" @infinite="lodList"></list>
				<div class="clear"></div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script>
import "@/assets/css/mall/base.css"
import list from "@/components/mall/mlist";
import eleTit from "@/components/title/title";
import {reqMall} from "../../utils/request";

export default {
	data: function() {
		return {
			pr: { // 分页相关数据
				page: 0, // 当前页数
				size: 20, // 目标页数据量
			},
			items: [], // 列表数据,
			onTouch: { // 列表点击控制
				inDown: false,
				inTouchMove:false,
				lockTime:0,
				tPoint:{x:0,y:0}
			},
			nativeStorge: { // 本地数据存储
				oTb: false, // 是否开启过淘宝
				oJd: false, // 是否开启过京东
				oVip: false, // 是否开启过唯品会
				oPdd: false // 是否开启过拼多多
			},
			deviceInfo: { // idfi  imei
				type:'IDFA',
				val: '111111',
			}
		}
	},
	/**
	 * 组件检查 FIXME: 相关内容
	 */
	components:{
		list, eleTit
	},
	created() {
		let opc = this.getNativeData('open_pf_cour');
		if (opc.oTb) {
			this.nativeStorge.oTb = true;
		}
		if (opc.oJd) {
			this.nativeStorge.oJd = true;
		}
		if (opc.oVip) {
			this.nativeStorge.oVip = true;
		}
		if (opc.oPdd) {
			this.nativeStorge.oPdd = true;
		}
		// 
		this.getDeviceInfo();
	},
	mounted() {
		this.getDataList();
	},
	methods: {
		getDeviceInfo() {
			try {
				// 获得设备信息
				switch (this.sysEnv) {
					case 'ios':
						this.deviceInfo.type = 'IDFA';
						this.deviceInfo.val = window.webkit.messageHandlers.getDeviceIdfa.postMessage(null);
						break;
					case 'android':
						this.deviceInfo.type = 'IMEI';
						this.deviceInfo.val = window.joybuy.getDeviceInfo();
						break;
				}
			} catch (e) {
				console.log(e);
			}
			// alert(" in > getDeviceInfo > " + JSON.stringify(this.deviceInfo));
		},
		toBakPlatform(tag) {
			switch (tag) {
				case 'tb': // 
					if (!this.nativeStorge.oTb) {
						// 进入到教程页
						this.nativeStorge.oTb = true;
						this.saveNativeData('open_pf_cour', this.nativeStorge);
						this.toCourse(tag);
						return;
					}
					break;
				case 'jd': // 
					if (!this.nativeStorge.oJd) {
						this.nativeStorge.oJd = true;
						this.saveNativeData('open_pf_cour', this.nativeStorge);
						this.toCourse(tag);
						return;
					}
					break;
				case 'vip': // 
					if (!this.nativeStorge.oVip) {
						this.nativeStorge.oVip = true;
						this.saveNativeData('open_pf_cour', this.nativeStorge);
						this.toCourse(tag);
						return;
					}
					break;
				case 'pdd': // 
					if (!this.nativeStorge.oPdd) {
						this.nativeStorge.oPdd = true;
						this.saveNativeData('open_pf_cour', this.nativeStorge);
						this.toCourse(tag);
						return;
					}
					break;
			}
			switch (this.sysEnv) {
				case "ios":
					switch (tag) {
						case 'tb':
							window.webkit.messageHandlers.openTBUrl.postMessage({url: null, type: 0});
							return;
						case 'jd':
							window.webkit.messageHandlers.openJDUrl.postMessage({url: null, type: 0});
							return;
						case 'vip':
							window.webkit.messageHandlers.openVIPUrl.postMessage({url: null, type: 0});
							return;
						case 'pdd':
							window.webkit.messageHandlers.openPDDUrl.postMessage({url: null, type: 0});
							return;
					}
					return;
				case "android":
					switch (tag) {
						case 'tb':
							window.joybuy.openTBUrl("", 0);
							return;
						case 'jd':
							window.joybuy.openJDUrl("", 0);
							return;
						case 'vip':
							window.joybuy.openVIPUrl("", 0);
							return;
						case 'pdd':
							window.joybuy.openPDDUrl("", 0);
							return;
					}
					return;
			}
		},
		/**
		 * 去到专区列表
		 * @author xwj 2019-07-28
		 */
		toSpec(tag) {
			switch(tag) {
				case 'ed':
				case 'cc':
				case 'gb':
				case 'cs':
				case 'pp':
				case 'br':
					this.$router.push({name: 'mallSpec', query: {sp: tag}});
					return ;
					// this.$router.push({name: 'mallBras'});
					// return ;
			}
		},
		/**
		 * 去到推广列表
		 * @author xwj 2019-07-28
		 */
		toProm(tag) {
			switch (tag) {
				case 'tb':
					this.$router.push({name: 'mallList'});
					return;
				case 'jd':
					this.$router.push({name: 'mallList', query: {pf: 'jd'}});
					return;
			}
		},
		/**
		 * 去到教程页面
		 * @author xwj 2019-07-30
		 */
		toCourse(tag) {
			this.$router.push({name: 'mallCour', query: {pf: tag}});
		},
		/**
		 * 去到搜索页面
		 * @author xwj 2019-07-30
		 */
		toSearch() {
			this.$router.push({name: 'mallSearch'});
		},
		/**
		 * 得到数据列表
		 * @author xwj 2019-07-28
		 */
		getDataList(page) {
			// const param = {
			// 	pageNo: (!page || page < 2) ? 1 : page,
			// 	pageSize: this.pr.size,
			// };
			const param = {
				pageno: (!page || page < 2) ? 1 : page,
				pagesize: this.pr.size,
				device_type: this.deviceInfo.type,
				device_value: this.deviceInfo.val,
			};
			const that = this;
			reqMall.mainList(param).then(res => {
				that.resData(res, param.pageNo);
			});
		},
		/**
		 * 处理返回的列表数据
		 * @author xwj 2019-07-28
		 */
		resData(res, page) {
			if (page < 2) {
				this.items = res.data;
				this.pr.page = 1;
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
		 * 得到本地数据
		 * @author xwj 2019-07-30
		 */
		getNativeData(key) {
			if (localStorage.getItem(key)) {
				return JSON.parse(localStorage.getItem(key));
			} else {
				return {};
			}
		},
		/**
		 * 设置本地数据
		 * @author xwj 2019-07-30
		 */
		saveNativeData(key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		// FIXME: 列表相关手势控制
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
			// console.log("   inTouchUp ... " , e);
			if (this.onTouch.inTouchMove) {
				this.onTouch.lockTime = new Date().getTime() + 700;
				this.onTouch.inTouchMove = false;
			}
			this.onTouch.inDown = false;
			this.onTouch.tPoint.x = 0;
			this.onTouch.tPoint.y = 0;
		},
		// 列表相关手势控制
		// FIXME: 子页面List专用交互方法接口开始
		/**
		 * 刷新当前列表
		 * @author xwj 2019-06-24
		 */
		refList() {
			console.log(">>>> in 1 refList ... ");
			// console.log(this);
			// console.log(event);
			this.getDataList();
		},
		/**
		 * 继续加载当前列表
		 * @author xwj 2019-06-24
		 */
		lodList() {
			console.log(">>>> in 2 lodList ... ");
			this.getDataList(this.pr.page + 1);
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
	}
}
</script>
<style type="text/css" scoped>
</style>