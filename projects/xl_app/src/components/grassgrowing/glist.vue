<template>
	<scroller :on-refresh="refList" :on-infinite="lodList" ref="mallScro" :noDataText="noDaTxt">
		<!-- distance: ""
			favNum: 0
			haveFav: 0
			imgHeight: 2080
			imgUrl: "http://img.xunbao88.com.cn/download/wechatmsg/pic/20190718/b_20190718_acab5dbe5bd7ecd0b12b7426a1a0b3e9_67_120.jpg"
			imgWidth: 960
			pageView: 95
			relCommodityNum: 0
			tid: 550206
			title: "已为您记录今日健康打卡，快来看看吧!"
			topicRed: "该作品已获得0元购物返现红包"
			userInfo: {uid: 2202071995, username: "", nickName: "LCQ",…}
			videoUrl: "" -->
		<div class="goods" ref="goodsList">
			<div class="goods_inner" v-for="(item,index) in items" :key="index" @click.stop="getCommInfo(item)" :id="index" style="{background-color:red}" >
			<!-- <div class="goods_inner" v-for="(item,index) in items" :key="index" @click.stop="getCommInfo(item)" :id="index" style=""> -->
				<img class="goods_img" modeType="event" :src="item.imgUrl"/>
				<div class="goods_title t_text">
					{{item.title}}
	
				</div>
				<div class="clear"></div>
				<div class="userInfo">
					<img class="userAroundAvatar" :src="item.userInfo.avatar">
					<span class="userAroundUserName">{{item.userInfo.nickName}}</span>
					<div class="likeNum" @click.stop='_likeEvent(index, item)'>
						<span>
							<i v-if="item.haveFav==0" class='iconfont iconxin'></i>
							<i v-if="item.haveFav==1" class='iconfont iconzan xinRed'></i>
							{{item.favNum}}
						</span>
					</div>
				</div>
			</div>
		</div>
	</scroller>
</template>

<script>
import Vue from "vue"; // vue主体
import { reqReco, caoApi } from "../../utils/request";

export default {
	data: function() {
		return {
			// items: [], // 商品列表
			// noDaTxt: "没有更多商品" // 没有数据时显示的内容
		};
	},
	props:{
		'noDaTxt':{
			type:String,
			default:'没有更多作品'
		},
		'items':{
			type:Array
		}
	},

	mounted() {
		this.$refs.mallScro.finishInfinite(false);
		// this.$refs.mallScro.finishPullToRefresh();
	},
	methods: {
		// 作品点赞
		_likeEvent: function(index, item) {
			this.$emit("likePost", index, item);
		},
		/**
		 * 得到到商品信息，等待接口
		 * @author xwj 2019-07-17
		 */
		getCommInfo(item) {
			this.$router.push({ path: '/postDetail', query: { tid: item.tid, userId: item.userInfo.uid } })
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
			this.$refs.mallScro.finishInfinite(st);
		},
		/**
		 * 关闭下拉刷新的等待
		 * @author xwj 2019-07-27
		 */
		finishPullToRefresh() {
			this.$refs.mallScro.finishPullToRefresh();
		},
		/**
		 * 去到目标滚动条位置
		 * @author xwj 2019-07-27
		 * @param sx 目标x轴位置
		 * @param sy 目标y轴位置
		 * @param an 是否有动画效果
		 */
		scrollTo(sx, sy, an) {
			this.$refs.mallScro.scrollTo(sx, sy, an);
		},
		refList() {
			this.$emit('refresh');
		},
		lodList() {
			this.$emit('infinite');
		}
	},
	//过滤器
	filters: {
		switchSales(value) {
			if (value / 1000 < 1) {
				return value;
			} else if (value / 1000 >= 1 && value / 1000 < 10) {
				return Math.floor(value / 1000) + 'k+';
			} else if (value / 10000 >= 1) {
				return Math.floor(value / 10000) + 'w+';
			}
		},
		switchPrice(value) {
			return Math.round(value * 10) / 10;
		}
	}
};
</script>


<style scoped="scoped" type="text/css">
* {
	padding: 0;
	margin: 0;
}
.goods {
	padding-left: 4px;
	padding-bottom: 20px;
	width: 100%;
	height: auto;
	column-count: 2;
    column-gap: 1px;
	column-rule-width: 1px;
	column-rule: 0;
	overflow-x: hidden;
	overflow-y: auto;
	/* overflow: hidden; */
	/* display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-between; */
	

	

}

.goods_inner:first-child {
	margin-top: 0px !important;
}

.goods_inner {
	margin-top: 12px;
	width: 364px;
	height: auto;
	padding-bottom: 20px;
	overflow: hidden;
	border-radius: 12px;
	border: 1px solid #eeeeee;
	box-shadow: 0 2px 5px #d2d2d2;
	break-inside: avoid;
    box-sizing: border-box;
}

.moreSame {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	font-size: 20px;
	color: #7f7f7f;
	margin-top: 8px;
}

.moreSame>img {
	height: 22px;
	width: 22px;
	margin-right: 4px;
}

.goods_img {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.goods_title {
	margin-top: 18px;
	padding-left: 20px;
	padding-right: 20px;
	width: auto;
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
	font-size: 22px;
	font-weight: 600;
	/* width: 100%; */
}

.goods_inner .userInfo {
	background: #fff;
	padding: 20px 0 20px 20px;
	padding-bottom: 0px;
	overflow: hidden;
}

.goods_inner .userInfo img {
	height: 50px;
	width: 50px;
	border-radius: 100%;
	float: left;
}

.goods_inner .userInfo span {
	float: left;
	height: 50px;
	line-height: 50px;
	font-size: 24px;
	display: block;
	margin-left: 10px;
	color: #343434;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 120px;
}

.goods_inner .likeNum {
	display: flex;
	align-items: center;
	text-align: right;
}

.goods_inner .likeNum>span {
	margin-right: -5px;
}

.goods_inner .likeNum .iconfont {
	font-size: 30px;
	display: inline-flex;
	align-self: flex-end;
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

.goods_inner .xinRed {
	color: #ff2741;
}
</style>