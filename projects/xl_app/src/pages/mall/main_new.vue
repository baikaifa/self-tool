<template>
	<div class="mall_main">
		<!-- 头部 -->
		<eleTit></eleTit>
		<div class="mall_main_sea">
			<div class="head_sea_cont" @click.stop="toSearch" @touch.stop="toSearch">
				<div class="head_sea_txt">
					<span>&nbsp;</span>
					<font>搜索商品名称/淘宝宝贝标题</font>
				</div>
			</div>
		</div>
		<div class="clear bann_holder">
		</div>
<mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
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
		<div id="navWarp">
			<div class="clear prom_holder"></div>
			<div id="navContent" class="mall_main_prom"><!-- 推广 -->
				<div class="clear"></div>
				<div class="prom_cont">
					<div class="prom_tit">我要推广</div>
					<div class="prom_eles">
						<div class="prom_ele touch prom_tb" @click.stop="toProm('tb')" @touch.stop="toProm('tb')"></div><!-- 淘宝返利商城 -->
						<div class="prom_ele touch prom_jd" @click.stop="toProm('jd')" @touch.stop="toProm('jd')"></div><!-- 京东返利商城 -->
					</div>
				</div>
			</div>
		</div>
		<div class="mall_main_ites touch_scroll"><!-- 商品列表 -->
			<div class="clear"></div>
			<div class="ites_tit"></div>

			<list :items="items" class="ites_list_new" ref="itemList"></list>
			<div class="clear"></div>
		</div>
</mescroll-vue>
	</div>
</template>

<script>
import "@/assets/css/mall/base.css"
import MescrollVue from 'mescroll.js/mescroll.vue'

import list from "@/components/mall/mlist_new";
import eleTit from "@/components/title/title";
import {reqMall} from "../../utils/request";

export default {
	data: function() {
		return {
      	mescroll: null, // TODO: mescroll 相关 mescroll实例对象
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
			mescrollUp: { // mescroll 相关

				// TODO:
				isBounce: false,
				callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 20 // 每页数据的数量
				},
				noMoreSize: 2, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
				//   toTop: {
				//     src: './static/mescroll/mescroll-totop.png' // 回到顶部按钮的图片路径,支持网络图
				//   },
				empty: {
					// 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
					warpId: 'items', // 父布局的id;
					//  icon: './static/mescroll/mescroll-empty.png', // 图标,支持网络图
					tip: '暂无相关数据~', // 提示
					//  btntext: '去逛逛 >', // 按钮,默认""
					//  btnClick () { // 点击按钮的回调,默认null
					//    alert('点击了按钮,具体逻辑自行实现')
					//  }
				},
				lazyLoad: {
					use: true // 是否开启懒加载,默认false
				}
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
		list, eleTit, MescrollVue
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
	mounted() {},
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
		mescrollInit (mescroll) { // TODO: mescroll 相关
			this.mescroll = mescroll;
			this.mescroll.lockDownScroll(true); // 锁下拉刷新
			// // 锁定一个移动头
			// var navWarp = document.getElementById("navWarp");
			// console.log(">>> in mescrollInit ... ");
			// // if (this.mescroll.os.ios) {
			// // 	//ios的悬停效果,通过给navWarp添加nav-sticky样式来实现
			// // 	console.log(" >>> this.mescroll.os.ios >>> " + this.mescroll.os.ios);
			// // 	navWarp.classList.add("nav-sticky");
			// // } else {
			// 	console.log(" >>> this.mescroll.os.ios >>> ");
			// 	//android和pc端悬停效果,通过监听mescroll的scroll事件,控制navContent是否为fixed定位来实现
			// 	navWarp.style.height = navWarp.offsetHeight + "px";//固定高度占位,避免悬浮时列表抖动
			// 	var navContent = document.getElementById("navContent");
			// 	this.mescroll.optUp.onScroll = function(mescroll, y, isUp) {
			// 		console.log("up --> onScroll 列表当前滚动的距离 y = " + y + " top = " + navWarp.offsetTop + ", 是否向上滑动 isUp = " + isUp);
			// 		if (y >= (navWarp.offsetTop - 100)) {
			// 			navContent.classList.add("nav-fixed");
			// 		} else {
			// 			navContent.classList.remove("nav-fixed");
			// 		}
			// 	}
			// // }
			console.log(">>> out mescrollInit ... ");
		},
		/**
		 * 
		 * @param page {
		 * 				num:1, // 当前页 ,默认从1开始
		 * 				size:10 // 每页数据条数,默认10
		 * 				}
		 * @param mescroll 滚动对象
		 */
		upCallback(page, mescroll) {
			// const param = {
			// 	pageNo: page.num,
			// 	pageSize: page.size,
			// };
			const param = {
				pageno: page.num,
				pagesize: page.size,
				device_type: this.deviceInfo.type,
				device_value: this.deviceInfo.val,
			};
			const that = this;
			// debugger
			reqMall.mainList(param).then(res => {
				res = typeof (res) === 'string' ? JSON.parse(res) : res;
				if (res.code + '' === '200') {
					that.resData(res, param.pageno, mescroll);
				} else {
					mescroll.endErr()
				}
			}).catch((e) => {
				console.log(JSON.stringify(e));
				// 联网异常,隐藏上拉和下拉的加载进度
				mescroll.endErr()
			});
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
		 * 处理返回的列表数据
		 * @author xwj 2019-07-28
		 */
		resData(res, page, mescroll) {
			if (page < 2) {
				this.items = [];
			}
			this.items = this.items.concat(res.data);
			this.$nextTick(() => {
				mescroll.endSuccess(res.data.length)
			})
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
	}
}
</script>
<style type="text/css" scoped>
	/*ios使用sticky样式实现*/
	.mall_main .nav-sticky{
		z-index: 9999;/*需设置zIndex,避免在悬停时,可能会被列表数据遮住*/
		position: -webkit-sticky;
		position: sticky;
		top: 0;/*相对mescroll的div悬停的位置*/
	}
	/*android和pc端悬停*/
	.mall_main .nav-fixed{
		z-index: 9999;
		position: fixed;
		top: 100px;
		left: 0;
		width: 750px;
	}
</style>