<template>
  <div class="posterView">
      <!-- 标题 -->
      <!-- <div class="topTitle">
        <i class="iconfont iconfanhui backBtn" @click="goBack"></i>
        <span class="userName">{{userInfo.nickName}}</span>
      </div> -->
		<eleTit :title="userInfo.nickName"></eleTit>
      <!-- 个人详情 -->
      <div class="person_detail">
        <div class="avatar">
			<img :src="userInfo.avatar" />
        </div>
        <div class="nickName">
          <div class="">{{userInfo.nickName}}</div>
        </div>
		<div class="followCont">
			 <div class="followBtn" @click="followHander">
				<i class="iconfont iconjia plusBtn"></i>
				<span>{{isFollow ==1?'已关注':'关注'}}</span>
			</div>
		</div>
       
		<div class="infoNum">
			<div class="infoItem">
				<span class="itemNum">{{userInfo.followNum}}</span>
				<span>关注</span>
			</div>
			<div class="infoItem">
				<span class="itemNum bd">{{userInfo.fansNum}}</span>
				<span>粉丝</span>
			</div>
			<div class="infoItem">
				<span class="itemNum">{{userInfo.profitTotal}}元</span>
				<span>累计收益</span>
			</div>
		</div>
      </div>

	<div class="grayBar"></div>
    <!-- 内容部分 -->
    <div class="postList"> 
      <div class="post">
        <p>共{{postNum}}篇帖子</p>
      </div>
    </div>
	<!-- TODO: 数据列表 -->
	<div class="gro_ite_list" @touchstart="inTouchDown" @touchmove="onTouchMove" @touchend="inTouchUp" @mousedown="inTouchDown" @mousemove="onTouchMove" @mouseup="inTouchUp">
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
<script>
import {caoApi} from "@/utils/request.js"
import list from "@/components/grassgrowing/glist";
import eleTit from "@/components/title/title";
export default {
	data(){
		return {
			pageNo:1,
			pageSize:10,
			userId:'',
			userInfo:{},
			authorUid:'',
			isFollow:'',
			commodityInfos:[],
			postNum:'',
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
	components:{
		eleTit
	},
	created() {
		this.userId = this.$route.params.id;
		this.getData();
		// this.authorUid = this.$route.params.authorUid;//作者id
	},
	mounted() {
		if (this.sea.txt) {
			this.getSea();
		} else {
			this.getAllTag();
		}
	},
	methods: {
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
		getData(){
			let params = {
				token: 'C2E02FD78B31B7C649742E365D482E05',
                fromType: 2,
                pageTid: 0,
                pageSize: 1,
                pageType: 1,
                authorUid: '2201383604',
			}
			caoApi.postDetail(params).then((data) =>{
				if(data.code == 200){
					this.userInfo = data.data[0].userInfo;
					this.isFollow = data.data[0].isFollow;
					this.commodityInfos = this.commodityInfos.concat(data.data[0].commodityInfos);
					
				}
			})
		},
		followHander(){
			let type = this.userInfo.isFollow == 0 ? 1:0;
            let params = {
                token:'B25FBD9E8B8575014839728E3A6B698A',
                uids:this.userInfo.uid,
                type:type
            }
            caoApi.postFollow(params).then((data) =>{
                if(data.code == 200){
                    this.userInfo.isFollow = this.userInfo.isFollow == 0 ? "已关注":"关注";
                }
            })
		},
		goBack(){
			this.$router.go(-1);
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
				that.postNum = res.totalPage * that.pageSize;
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
	},
	components:{list}
};
</script>

<style scoped="scoped" type="text/css">
.posterView{
	padding-top:100px;
}
.posterView .topTitle {
  /*标题*/
  width: 100%;
  height: 100px;
  position: fixed;
  top:0;
  box-sizing: border-box;
  border-bottom:1px solid #eee;/*no*/
  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;
  background: #fff;
}
.posterView .backBtn{
	font-size: 34px;
	padding:0 20px;
	position: absolute;
	left:20px;
}
.posterView .userName {
	width: 600px;
	font-size: 36px;
	font-weight: bold;
	letter-spacing: 1px;
	color: #000000;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	padding-left:20px;
}

.posterView .person_detail {
  /*包含头像到累计收益*/
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
}
.posterView .avatar {
  width: 100%;
  height: 160px;
  text-align:center;
}
.posterView .avatar img{
  width: 130px;
  height: 130px;
  border-radius: 50%;
}
.posterView .nickName {
  width: 100%;
  height: 40px;
  text-align:center;
}
.posterView .nickName div{
	height: 28px;
	font-size: 28px;
	font-weight: bold;
	letter-spacing: 1px;
	color: #000000;
	line-height: 28px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.posterView .infoItem{
	width:230px;
	height:80px;
	display: flex;
	flex-direction: column;
	align-items:center;
	justify-content: space-between;
}
.posterView .itemNum{
	height:25px;
	font-size:28px;
	font-weight: bold;
	letter-spacing: 1px;
	color: #343434;
	width:100%;
	text-align:center;
}
.posterView .bd{
	border-left:1px solid #888888;
	border-right:1px solid #888888;
}
.posterView .infoNum{
	display: flex;
	margin-top:40px;
	margin-bottom:30px;
}
.posterView .followCont{
	width:100%;
	display: flex;
	justify-content: center;
}
.posterView .followBtn {
	width: 200px;
	height: 46px;
	background-color: #ff314a;
	border-radius: 23px;
	text-align: center;
	line-height: 46px;
	color: #fff;
	font-weight: bold;
}
.posterView  .plusBtn {
  width: 20px;
  height: 20px;
  color: #ffffff;
  margin-right: 5px;
  line-height: 46px;
}

.posterView .grayBar {
  background-color: #f8f8f8;
  height: 20px;

}
.posterView .post {
	width: 176px;
	height: 46px;
	background-color: #f0f0f0;
	border-radius: 23px;
	text-align: center;
	line-height: 46px;
	color: #343434;
	font-size: 24px;
	margin:20px 30px;
}
/* 商品列表 */
/** TODO: 商品列表 */
.posterView .gro_ite_list {
	width: 750px;
	/* height: fill-available;
	height: -webkit-fill-available; */
	height: calc(100vh - 535px);
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
	background-color: #fff;
}
.posterView .clear {
	clear: both;
	width: 100%;
}
/* 弹窗 */
.posterView .monToast{
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
.posterView .monToast img{
    width:50px;
    height:40px;
}
.posterView .monNum{
    font-size: 32px;
	font-weight: bold;
    letter-spacing: 1px;
    color: #ffd720;
    margin-left:15px;
}
</style>
