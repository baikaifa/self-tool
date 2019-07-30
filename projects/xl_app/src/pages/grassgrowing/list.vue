<template>
	<div class="grol">
		<eleTit></eleTit>
		<div class="loading" v-if="isShowLoad">
			<div class="loadingIn">
				<img src="../../assets/img/xileloading.gif" alt="">
				<p>加载中...</p>
			</div>
		</div>
		<!-- TODO: 搜索部分 -->
		<div class="gro_head">
            <span>种草</span>
            <i class="iconfont iconsousuo" @click="gotoSearchPage"></i>
			<!-- <div class="gro_sea">
				<div class="gro_sea_bak" :style="{visibility: sea.run ? 'visible' : 'hidden'}" @click.stop="bakTag"></div>
				<form @onsubmit="goSea">
					<div class="gro_sea_inp">
						<div class="gro_sea_find"></div>
						<input type='search' placeholder="" v-model="sea.txt" ref="searchBox" @click.stop="goSea" @touch.stop="goSea"/>
						<div class="gro_sea_close" :style="{visibility: sea.txt ? 'visible' : 'hidden'}" @click.stop="clsSea" @touch.stop="clsSea"></div>
					</div>
					<div class="gro_sea_exec" @click.stop="goSea" @touch.stop="goSea">搜索</div>
					<input type="submit" style="display: none;" value="搜索">
				</form>
				<div class="clear"></div>
			</div>
			<div class="clear"></div> -->
		</div>
		<div class="clear"></div>
		<!-- TODO: 数据列表 -->
		<!-- <div class="gro_ite_list" :style="{'top': marginTop}"> -->
		<div class="gro_ite_list touch_scroll" @touchstart="inTouchDown" @touchmove="onTouchMove" @touchend="inTouchUp" @mousedown="inTouchDown" @mousemove="onTouchMove" @mouseup="inTouchUp">
			<list :items="items" ref="itemList" @refresh="refList" @infinite="lodList" @likePost="likePost"></list>
			<div class="clear"></div>
		</div>
        <!-- 点赞收金币的提醒 -->
        <div class="monToast" v-show="showMonToast">
            <img src="../../assets/img/other/jinbi.png" alt="" />
            <span class="monNum">+ 10金币</span>
        </div>
	</div>
</template>
<!-- TODO: -->
<script>
import {caoApi} from "../../utils/request";
import list from "@/components/grassgrowing/glist";
import eleTit from "@/components/title/title";

export default {
	data: function() {
		return {
            showMonToast:false,
			sea: {
				val: '', // 搜索内容
				txt: '', // 用户的录入内容
				run: false, // 是否搜索进行时 2019-06-25
			},
			pr: { // 分页相关数据
				page: 1, // 当前页数
				size: 20, // 目标页数据量
			},
			items: [], // 商品列表
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
	components:{
		list, eleTit
	},
	// TODO: 加载开始时逻辑
	created() {
		if (this.$route.query.wd) {
			this.sea.txt = this.$route.query.wd;
		}
	},
	// TODO: 加载完成后逻辑
	mounted() {
		if (this.sea.txt) {
			this.getSea();
		} else {
			this.getAllTag();
		}
	},
	// TODO: 一般方法集合
	methods: {
        gotoSearchPage(){
            this.$router.push({name:'gongSear'})
        },
      	likePost(index,item){
			if (item.haveFav == 0) {
				let params = {
                    token:"sdf21das31f5e1fasdf", //token
                    tid:item.tid, //帖子id
                    type :1, //(1点赞,3收藏)
                    actionType:1
                }
                let that = this;
                caoApi.interactive(params).then((data)=>{
                    if(data.code == 200){
						item.favNum += 1;
						item.haveFav = 1;
						that.$set(that.items,index,item);
                        that.showMonToast = true;
                        setTimeout(function(){
                            that.showMonToast = false;
                        },1000)
                    }
				})
			}
		},
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
		/**
		 * 去到搜索界面
		 */
		goSea() {
			this.$router.push({name: "gongSear", query:{wd: val}});
		},
		/**
		 * 进行搜索
		 * @author xwj 2019-06-22
		 */
		getSea(page) {
			if (!this.sea.txt) {
				if (this.sea.val) {
					this.clsSea();
				}
				return;
			}
			this.hisList = this.hisList.slice(0,9);
			if(this.hisList.includes(this.sea.txt)){
				let position = this.hisList.indexOf(this.sea.txt);
				this.hisList.splice(position,1);
				this.hisList.unshift(this.sea.txt);
			}else{
				this.hisList.unshift(this.sea.txt);
			}
			this.hideLoad();
			const param = {
				keyword: this.sea.txt,
				pageNo: (!page || page < 2) ? 1 : page,
				sort: this.getSortParam()
			};
			const that = this;
			caoApi.mainSear(param).then(res => {
				this.isShowLoad = false;
				that.sea.val = that.sea.txt;
				that.sea.run = true;
				that.resSeaData(res, 'sea', param.pageNo);
			});
		},
		/**
		 * 处理搜索返回的数据
		 * @author xwj 2019-06-22
		 */
		resSeaData(res, tag, page) {
			if (!res.code) {
				res = JSON.parse(res);
			}
			if (!page || page < 2) {
				this.items = [];
				this.items = res.data.items;
				this.itemsTop();
				this.finishPullToRefresh();
			} else {
				const ti = res.data.items;
				for (let k in ti) {
					this.items.push(ti[k]);
				}
				this.pr.page = page + 1;
			}
			this.finishInfinite();
		},
		/**
		 * 清除搜索内容
		 * @author xwj 2019-06-25
		 */
		clsSea() {
			this.sea.txt = '';
			this.sea.val = '';
			// this.getAllTag();
		},
		/**
		 * 回到标签列表
		 * @author xwj 2019-06-25
		 */
		bakTag() {
			this.clsSea();
			this.sea.run = false;
			this.getAllTag();
		},
		/**
		 * 显示所有标签的商品
		 * @author xwj 2019-06-24
		 */
		getAllTag(page) {
			const param = {
				pageNo: (!page || page < 2) ? 1 : page,
				pageSize: this.pr.size
			};
			const that = this;
			this.hideLoad();
			caoApi.mainList(param).then(res => {
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
		 * 从新发送请求
		 * @author xwj 2019-06-25
		 */
		refreshReq(page) {
			if (this.sea.txt) {
				this.getSea(page);
			} else {
				this.getAllTag(page);
			}
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
	// beforeRouteEnter(to,from,next){
	// 	console.log(213123123, sessionStorage.askPositon);
	// 	next(vm => {
	// 		if(from.path == '/share2' || from.path == "/shareList"){
	// 			var toHeight = sessionStorage.askPositon
	// 			setTimeout(function () {
	// 				vm.$refs.itemList.scrollTo(0, toHeight, false);
	// 			}, 500) 
	// 		}else{
	// 			sessionStorage.askPositon = ''
	// 		}
	// 	})
	// },
	// beforeRouteLeave(to,from,next){//记录离开时的位置
	// 	sessionStorage.askPositon = this.$refs.itemList && this.$refs.itemList.getPosition() && this.$refs.itemList.getPosition().top;
	// 	next()
	// }
}
</script>
<!-- TODO: -->
<style scoped="scoped" type="text/css">
.grol {
	position: relative;
	height: 100vh;
}
.grol .clear {
	clear: both;
	width: 100%;
}
.grol .ft1_item {
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
.grol .ft2_item {
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
.grol .gro_active {
	color: #EF4454 !important;
}
.grol .gro_fail {
	color: #A5A5A5 !important;
}
.grol .gro_head {
	width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
	/* position:fixed;
	top:0;
	z-index:99; */
    background:#fff;
    position: relative;
    font-size:36px;
    border-bottom:1px solid #eee;
}
.grol .gro_head i{
    position: absolute;
    padding:20px;
    right:30px;
    font-size:36px;
}
/** 头部搜索 */
.grol .gro_sea {
	width: 750px;
	padding-top: 20px;
	background-color: #FFFFFF;
}
.grol .gro_sea .gro_sea_bak {
	float: left;
	margin-top: 15px;
	margin-left: 20px;
	width: 20px;
	height: 34px;
	overflow: hidden;
	background-image: url(../../assets/img/bak.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}
.grol .gro_sea .gro_sea_inp {
	float: left;
	margin-left: 15px;
	width: 550px;
	height: 64px;
	overflow: hidden;
	background-color: #F3F3F3;
	border-radius: 32px;
	-webkit-border-radius: 32px;
}
.grol .gro_sea .gro_sea_inp .gro_sea_find{
	float: left;
	margin-left: 20px;
	margin-top: 16px;
	width: 32px;
	height: 32px;
	overflow: hidden;
	background-image: url(../../assets/img/search_bg.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}
.grol .gro_sea .gro_sea_inp > input{
	/* float: left;
	margin-left: 20px;
	margin-top: 16px; */
	width: 78%;
	height: 64px;
	line-height: 64px;
	font-size: 28px;
	padding-left:20px;

}
.grol .gro_sea .gro_sea_inp .gro_sea_close{
	float: right;
	margin-top: 16px;
	margin-right: 20px;
	width: 34px;
	height: 33px;
	overflow: hidden;
	background-image: url(../../assets/img/cls.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}
.gro_sea .gro_sea_exec{
	float: left;
	height:64px;
	/* line-height:64px; */
	padding:0px 20px 0 30px;
	color:#6a6a6a;
	font-size:28px;
	display:flex;
	align-items: center;
}
.grol .gro_sea .gro_sea_inp .gro_sea_exec{
	float: right;
	margin-top: 18px;
	width: 100px;
	height: 28px;
	line-height: 28px;
	font-size: 28px;
	text-align: center;
	border-left: 2px solid #C9C9C9;
}
.grol input::-webkit-input-placeholder{
	color: #999999
}
/** TODO: 商品列表 */
.grol .gro_ite_list {
	width: 750px;
	/* height: fill-available;
	height: -webkit-fill-available; */
	height: calc(100vh - 100px);
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
	background-color: #fff;
}
/** TODO: 滚动条相关 */
::-webkit-scrollbar {
      width: 1px;
}
::-webkit-scrollbar-track {
      background-color: transparent;
}
::-webkit-scrollbar-thumb {
      background-color: transparent;
}
::-webkit-scrollbar-button {
      background-color: transparent;
}
::-webkit-scrollbar-corner {
      background-color: transparent;
}
.selectBorder{
	background:#f9f9f9;
}
/*loading部分*/
.grol .loading{
    width: 750px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000000;
  }
 .grol .loadingIn{
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
 .grol .loadingIn img{
    width: 160px;
    height: 160px;
    margin-top: 50px;
  }
.grol .loadingIn p{
    padding-top: 20px;
    font-size: 28px;
}

/* 弹窗 */
.grol .monToast{
    width: 270px;
	height: 72px;
	background:rgba(0,0,0,0.6);
	border-radius: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index:100;
}
.grol .monToast img{
    width:50px;
    height:40px;
}
.grol .monNum{
    font-size: 32px;
	font-weight: bold;
    letter-spacing: 1px;
    color: #ffd720;
    margin-left:15px;
}
</style>
