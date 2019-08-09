<template>
	<div>
		<div class="loading" v-if="isShowLoad">
			<div class="loadingIn">
				<img src="../../assets/img/xileloading.gif" alt="">
				<p>加载中...</p>
			</div>
		</div>
		<scroller :on-refresh="refList" :on-infinite="lodList" ref="mallScro" :noDataText="noDaTxt">
			<div class="goods" ref="goodsList">
				<div class="goods_inner touch" v-for="(item,index) in items" :key="index" @click.stop="getCommInfo(item, index)" :id="index">
					<img class="goods_img" modeType="event" v-lazy="item.picUrl" />
					<div class="goods_title t_text">
						<span class="t_name">{{item.source}}</span>
						{{item.title}}
					</div>
					<div class="clear"></div>
					<div class="goods_pride">
						<div>
							<span class="p_price_1 rec_active">¥</span>
							<span class="p_price_2 rec_active">{{item.price|switchPrice}}</span>
							<span class="p_oprice rec_fail">¥{{item.oriPrice|switchPrice}}</span>
						</div>
						<div>
							<span class="p_sailed rec_fail">{{item.sales |switchSales}}人付款</span>
						</div>
					</div>
					<div class="goods_save">
						<div class="save">
							<i class="iconfont iconyouhuiquan rec_active" size="18px"></i>
							<span class="s_text1 rec_active">优惠券:{{item.couponPrice|switchPrice}}</span>
						</div>
						<div class="save">
							<i class="iconfont iconshouyi rec_active" size="18px"></i>
							<span class="s_text2 rec_active">返现¥{{item.commission|switchPrice}}</span>
						</div>
					</div>
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
import { reqReco } from "../../utils/request";

export default {
	data: function() {
		return {
			isShowLoad: false,
			lockTime: 0,
			noDaTxt: "没有更多商品", // 没有数据时显示的内容
		};
	},
	props: ['items'],
	mounted() {
		if (this.$refs.mallScro) {
			this.$refs.mallScro.finishInfinite(false);
			this.$refs.mallScro.finishPullToRefresh();
		}
	},
	methods: {
		/**
		 * 得到到商品信息，等待接口
		 * @author xwj 2019-07-29
		 */
		getCommInfo(item) {
			console.log(" to open url...");
			console.log(item);
			const t = new Date().getTime();
			if (t <= this.lockTime) {
				return;
			}
			this.isShowLoad = true;
			const that = this;
			if (item.source + '' === '0' || item.source === '京东') { // 京东
				// if (this.$parent.sea && this.$parent.sea.run) {
					// FIXME: 还需要处理的
					const params = {
						commLink: 'http://item.jd.com/' + item.commId + '.html'
					};
					reqReco.getTransByCommLink(params).then(res => {
							// console.log(" >>> jd getTransByCommLink >>> ", JSON.stringify(res));
						that.isShowLoad = false;
						if (res.code === 200) {
							// reqReco.openSeaComm(res.commodityServiceLink);
							// window.location.href = res.data.payLink;
							switch (that.sysEnv) {// res.data.tbWord
								case 'ios':
									window.webkit.messageHandlers.openTBUrl.postMessage({url: res.data.payLink, type: 1});
									break;
								case 'android':
									window.joybuy.openTBUrl(res.data.payLink, 1);
									break;
							}
						}
					}).catch(()=>{
						that.isShowLoad = false;
					});
				// } else {
				// 	window.location.href = item.shareLink;
				// }
			} else if (item.source + '' === '1' || item.source === '淘宝') { // 淘宝
				// if (this.$parent.sea && this.$parent.sea.run) {
					const params = {
						commLink: 'http://item.taobao.com/item.htm?id=' + item.commId
					};
					reqReco.getTransByCommLink(params).then(res => {
							// console.log(" >>> tb getTransByCommLink >>> ", JSON.stringify(res));
						that.isShowLoad = false;
						if (res.code === 200) {
							// reqReco.openSeaComm(res.commodityServiceLink);
							// console.log(res.commodityServiceLink);
							// window.location.href = res.commodityServiceLink;
							switch (that.sysEnv) {// res.data.tbWord
								case 'ios':
									window.webkit.messageHandlers.openTBUrl.postMessage({url: res.data.tbWord, type: 3});
									break;
								case 'android':
									window.joybuy.openTBUrl(res.data.tbWord, 3);
									break;
							}
						}
					}).catch(()=>{
						that.isShowLoad = false;
					});;
				// } else {
				// 	console.log("share2");
				// 	// const params = {
				// 	// 	cid: item.commId,
				// 	// };
				// 	// reqReco.openComm(params);
				// 	this.$router.push({name: "share2", query:{commId: item.commId}});
				// 	sessionStorage.setItem("toId", index);
				// }
			}
		},
		getMoreSame(img) {
			this.$router.push({
				name: "shareList",
				query: { picUrl: img }
			});
		},
		/**
		 * 关闭上拉加载的等待
		 * @author xwj 2019-07-27
		 */
		finishInfinite(st) {
			if (this.$refs.mallScro) {
				this.$refs.mallScro.finishInfinite(st);
			}
		},
		/**
		 * 关闭下拉刷新的等待
		 * @author xwj 2019-07-27
		 */
		finishPullToRefresh() {
			if (this.$refs.mallScro) {
				this.$refs.mallScro.finishPullToRefresh();
			}
		},
		/**
		 * 去到目标滚动条位置
		 * @author xwj 2019-07-27
		 * @param sx 目标x轴位置
		 * @param sy 目标y轴位置
		 * @param an 是否有动画效果
		 */
		scrollTo(sx, sy, an) {
			if (this.$refs.mallScro) {
				this.$refs.mallScro.scrollTo(sx, sy, an);
			}
		},
		refList() {
      	this.$emit('refresh');
		},
		lodList() {
      	this.$emit('infinite');
		}
	},
	//过滤器
	filters:{
		switchSales(value){
			if(value/1000 < 1){
				return value;
			}else if(value/1000 >= 1 && value/1000 < 10){
				return Math.floor(value / 1000) + 'k+';
			}else if(value/10000 >= 1){
				return  Math.floor(value / 10000) + 'w+';
			}
		},
		switchPrice(value){
			return Math.round(value * 10) / 10;
		}
	}
};
</script>


<style scoped="scoped" type="text/css">
.goods {
  padding-left: 20px;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
.goods_inner {
  margin-top: 20px;
  margin-right: 20px;
  width: 342px;
  height: 510px;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #eeeeee;
  box-shadow: 0 2px 5px #d2d2d2;
}
.moreSame {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 20px;
  color: #7f7f7f;
  margin-top: 8px;
}
.moreSame > img {
  height: 22px;
  width: 22px;
  margin-right: 4px;
}
.goods_img {
  width: 345px;
  height: 345px;
  overflow: hidden;
}
.goods_title {
  margin-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  height: 60px;
  line-height: 30px;
  overflow: hidden;
  align-items: center;
}
.t_name {
  text-align: center;
  width: 60px;
  height: 30px;
  line-height: 30px;
  margin-right: 5px;
  border-radius: 14px;
  overflow: hidden;
  font-size: 16px;
  font-weight: 200;
  background-color: #ff5400;
  color: #ffffff;
  padding: 1px 5px;
}

.t_text {
  width: 100%;
  font-size: 22px;
  font-weight: 600;
}
.goods_save {
  height: 28px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
}
.save {
  display: flex;
  display: -webkit-flex;
  margin-top: 5px;
  align-items: center;
}
.s_text1 {
  font-size: 22px;
  margin-left: 3px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
}
.s_text2 {
  font-size: 22px;
  margin-left: 3px;
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
}
.iconyouhuiquan {
  font-size: 28px;
}
.iconshouyi {
  font-size: 33px;
  margin-right: -4px;
}
.goods_pride {
  height: 50px;
  padding-left: 10px;
  padding-right: 20px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: flex-end;
}
.p_price_1 {
  font-size: 20px;
}
.p_price_2 {
  font-weight: bold;
  font-size: 32px;
}
.p_oprice {
  font-size: 20px;
  text-decoration: line-through;
  margin-left: 8px;
}
.p_sailed {
  font-size: 20px;
}
.goods_watch {
  height: 40px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
.w_icon {
  display: flex;
  display: -webkit-flex;
  flex-direction: row-reverse;
  align-items: center;
}
.i_img {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-left: -8px;
  border: 1px solid #ffffff;
}
.no-data-text {
	display: none;
}
.rec_active {
	color: #EF4454 !important;
}
</style>