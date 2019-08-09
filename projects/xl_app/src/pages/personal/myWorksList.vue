<template>
  <div class="grol">
    <eleTit bak="true"></eleTit>
    <div class="line"></div>
    <div class="myWorkInfo">
      <div class="totalWorkNum">所有作品：{{items.length}}</div>
      <div class="totalInCome" v-if="userTotalTopicFavRed">{{userTotalTopicFavRed}}</div>
    </div>
    <div class="loading" v-if="isShowLoad">
      <div class="loadingIn">
        <img src="../../assets/img/xileloading.gif" alt />
        <p>加载中...</p>
      </div>
    </div>
    <!-- TODO: 搜索部分 -->
    <div class="clear"></div>
    <div class="addColor">
      <div class="position"></div>
      <div
        class="gro_ite_list touch_scroll"
        @touchstart="inTouchDown"
        @touchmove="onTouchMove"
        @touchend="inTouchUp"
        @mousedown="inTouchDown"
        @mousemove="onTouchMove"
        @mouseup="inTouchUp"
      >
        <list
          :items="items"
          :noDaTxt="noDaTxt"
          ref="itemList"
          @refresh="refList"
          @infinite="lodList"
          @likePost="likePost"
          class="myLists"
        ></list>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<!-- TODO: -->
<script>
import { caoApi } from "../../utils/request";
import list from "@/components/grassgrowing/glist";
import eleTit from "@/components/title/title";
import { reqPersonal } from "../../utils/request";
import toptablebar from "../../components/personal/topTableBar.vue";
export default {
  name: "app",
  components: {
    eleTit,
    list
  },
  data: function() {
    return {
      userTotalTopicFavRed:'',
      noDaTxt:'没有更多作品',
      showMonToast: false,
      page: 0, //初始页码
      sea: {
        defaultTxt: '大家都在搜"阿玛尼"',
        val: "", // 搜索内容
        txt: "", // 用户的录入内容
        run: false // 是否搜索进行时 2019-06-25
      },
      pr: {
        // 分页相关数据
        page: 1, // 当前页数
        size: 20 // 目标页数据量
      },
      items: [], // 商品列表
      isShowLoad: false, //loading是否加载,
      onTouch: {
        // 列表点击控制
        inDown: false,
        inTouchMove: false,
        lockTime: 0,
        tPoint: { x: 0, y: 0 }
      }
    };
  },
  /**
   * 组件检查 FIXME: 相关内容
   */
  components: {
    list,
    eleTit
  },
  // TODO: 加载开始时逻辑
  created() {
    //console.log("created------------------");
    //console.log(this.$route.query.wd);
    if (this.$route.query.wd) {
      this.sea.txt = this.$route.query.wd;
      //console.log(this.sea.txt);
    }
  },
  // TODO: 加载完成后逻辑npm run dev
  mounted() {
    //console.log("monted");

    if (this.sea.txt) {
      //console.log(this.sea.txt);
      //console.log("mounted中调用getSea");
      this.getSea();
    } else {
      //console.log("mounted中调用getAllTag");
      this.getAllTag();
    }
  },
  // TODO: 一般方法集合
  methods: {
    likePost(index, item) {
      if (item.haveFav == 0) {
        let that = this;
        const params = {
          pageNo: !page || page < 2 ? 1 : page,
          //token:'b389494d1530103054faacb890973eef3bf23bbea84523e84838fd0915ecb98d',
        };
        reqPersonal.gainWorks(params).then(function(res) {
            console.log(1);
          // caoApi.interactive(params).then(data => {
          if (data.code == 200) {
            //console.log("请求成功");
            //console.log("数据是" + data);
            item.favNum += 1;
            item.haveFav = 1;
            that.$set(that.items, index, item);
            that.showMonToast = true;
            setTimeout(function() {
              that.showMonToast = false;
            }, 1000);
          } else {
            alert("请求失败");
          }
        });
      }
    },
    /**
     * 去到搜索界面
     */
    goSea() {
      //console.log("去到gongSear页面");
      this.$router.push({ name: "gongSear", query: { wd: val } });
    },
    /**
     * 进行搜索
     * @author xwj 2019-06-22
     */
    getSea(page) {
      //console.log("getSea");
      //console.log(this.sea.txt);
      if (!this.sea.txt) {
        if (this.sea.val) {
          //console.log("触发clsSea");
          this.clsSea();
        }
        return;
      }
      this.hideLoad();
      const params = {
        pageNo: !page || page < 2 ? 1 : page,
        //token:'b389494d1530103054faacb890973eef3bf23bbea84523e84838fd0915ecb98d'
      };
      const that = this;
      reqPersonal.gainWorks(params).then(function(res) {
          console.log(2);
        // caoApi.mainSear(param).then(res => {
        this.isShowLoad = false;
        that.sea.val = that.sea.txt;
        that.sea.run = true;
        that.resSeaData(res, "sea", param.pageNo);
      });
    },
    /**
     * 处理搜索返回的数据
     * @author xwj 2019-06-22
     */
    resSeaData(res, tag, page) {
      // if (!res.code) {
      // 	res = JSON.parse(res);
      // }
      if (!page || page < 2) {
        this.items = [];
        this.items = res.data;
        this.itemsTop();
        // this.finishPullToRefresh();
      } else {
        //console.log("页码大于等于2,向items添加数据，并且页码加1");
        const ti = res.data;
        for (let k in ti) {
        }
        this.pr.page = page + 1;
        //console.log(this.pr.page);
      }
      //console.log(this.items);
      if (page >= res.totalPage) {
        //console.log("如果页码大于等于总页数,触发finishInfinete");
        this.finishInfinite(true);
      } else {
        //console.log("如果页码兄小于总页数,触发finishInfinete");
        this.finishInfinite(false);
      }
    },
    /**
     * 清除搜索内容
     * @author xwj 2019-06-25
     */
    clsSea() {
      //console.log("触发clsSea");
      this.sea.txt = "";
      //console.log(this.sea.txt);
      this.sea.val = "";
      // this.getAllTag();
    },
    /**
     * 回到标签列表
     * @author xwj 2019-06-25
     */
    bakTag() {
      //console.log("触发bakTag");
      this.clsSea();
      //console.log("bakTag触发clsSea");
      this.sea.run = false;
      //console.log("bakTag触发bakTag");
      this.getAllTag();
    },
    /**
     * 显示所有标签的商品
     * @author xwj 2019-06-24
     */
    getAllTag(page) {
      //console.log("触发getAllTag");
      const param = {
        pageNo: !page || page < 2 ? 1 : page,
        pageSize: this.pr.size
      };
      const that = this;
      this.hideLoad();
      const params = {
        pageNo: !page || page < 2 ? 1 : page,
        //token:'b389494d1530103054faacb890973eef3bf23bbea84523e84838fd0915ecb98d'
      };
      reqPersonal.gainWorks(params).then(function(res) {
        // }
        // caoApi.mainList(param).then(res => {
        that.isShowLoad = false;
        if(res.userTotalTopicFavRed){
  that.userTotalTopicFavRed=res.userTotalTopicFavRed;
        } 
        that.resTagData(res, param.pageNo);
      });
    },
    hideLoad() {
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
      //console.log("触发resTagData");
      if (page < 2) {
        //console.log("页码小于2");
        this.items = res.data;
        this.pr.page = 1;
        //console.log(this.items);
        this.finishPullToRefresh();
        //console.log("resTagData" + "触发" + "finishPullToRefresh");
      } else {
        //console.log("页码大于等于2，向items添加数据并且页码加1");
        //console.log(this.items);
        for (let k in res.data) {
          Array(this.items).push(res.data[k]);
        }

        // console.log(this.items);

        // this.items = [
        //   {
        //         "tid": 130038,
        //         "imgUrl": "",
        //         "videoUrl": "",
        //         "title": "发个普通帖",
        //         "userInfo": {
        //            "uid": 2200564650,
        //            "nickName": "",
        //            "avatar": ""
        //        },
        //        "favNum": 0, // 点赞数量
        //        "haveFav": 0, // 用户是否点赞，0未点赞，1已经点赞此帖子
        //        "relCommodityNum": 1 // 帖子关联商品数量
        //       },
        //      {
        //         "tid": 130039,
        //         "imgUrl": "",
        //         "videoUrl": "",
        //         "title": "发个普通帖",
        //         "userInfo": {
        //            "uid": 2200564650,
        //            "nickName": "",
        //            "avatar": ""
        //        },
        //        "favNum": 0, // 点赞数量
        //        "haveFav": 0, // 用户是否点赞，0未点赞，1已经点赞此帖子
        //        "relCommodityNum": 1 // 帖子关联商品数量
        //       }
        // ];
        this.pr.page = page + 1;
        //console.log(this.pr.page);
      }
      // alert(res.data);
      // alert(this.pr.size);
      // if (res.data.length < this.pr.size) {
      //  //console.log("finishInfinite(true)");
      this.finishInfinite(true);
      // } else {
      //  //console.log("finishInfinite(false)");
      // this.finishInfinite(false);
      // }
    },
    /**
     * 从新发送请求
     * @author xwj 2019-06-25
     */
    refreshReq(page) {
      //console.log("触发refreshReq，重新发请求");
      if (this.sea.txt) {
        //console.log(this.sea.txt);
        //console.log("refreshReq触发getSea");
        this.getSea(page);
      } else {
        //console.log("refreshReq触发getAllTag");
        this.getAllTag(page);
      }
    },
    // FIXME: 子页面List专用交互方法接口开始
    /**
     * 刷新当前列表
     * @author xwj 2019-06-24
     */
    refList() {
      //console.log("refList refreshReq");
      this.refreshReq();
    },
    /**
     * 继续加载当前列表
     * @author xwj 2019-06-24
     */
    lodList() {
      //console.log("lodList refreshReq");
      this.refreshReq(this.pr.page + 1);
    },
    // FIXME: 子页面List专用接口开始
    finishPullToRefresh() {
      //console.log("finishPullToRefresh");
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
      //console.log("finishInfinite");
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
      //console.log("itemsTop");
      if (this.$refs.itemList && this.$refs.itemList.scrollTo) {
        this.$refs.itemList.scrollTo(0, 0, false);
      } else {
        const that = this;
        setTimeout(() => {
          that.itemsTop();
        }, 300);
      }
    },
    goBack: function() {
      this.$router.go(-1);
    },
    inTouchDown: function(e) {
      ////console.log(" inTouchDown ... " , e);
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
        ////console.log(" onTouchMove ... " , e);
        if (e.targetTouches) {
          let tt = e.targetTouches[0];
          if (tt) {
            if (Math.abs(tt.pageX - this.onTouch.tPoint.x) > 5) {
              return;
            }
            if (Math.abs(tt.pageY - this.onTouch.tPoint.y) > 5) {
              return;
            }
            if (!this.onTouch.inTouchMove) {
              this.onTouch.inTouchMove = true;
            }
          }
        }
      }
    },
    inTouchUp: function(e) {
      ////console.log("   inTouchUp ... " , e);
      if (this.onTouch.inTouchMove) {
        this.onTouch.lockTime = new Date().getTime() + 700;
        this.onTouch.inTouchMove = false;
      }
      this.onTouch.inDown = false;
      this.onTouch.tPoint.x = 0;
      this.onTouch.tPoint.y = 0;
    }

    // FIXME: 子页面List专用接口结束
  }
};
</script>
<!-- TODO: -->
<style scoped="scoped" type="text/css">
.grol {
  position: relative;
  height: calc(100vh - 100px);
}
.grol .totalInCome{color:#999999;}
.grol .app_head .tit_bar {
  background-color: #ffffff;
}
.grol .mybar {
  height: 50px;
}
.grol .addColor {
  background-color: #f2f7f8;
  width: 100%;
  height: (100vh - 100px - 50px);
}
.grol .position {
  width: 100%;
  height: 0px;
  background-color: #f2f7f8;
}
.grol .line {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #ebebeb;
  margin-top: 20px;
}
.grol .myWorkInfo {
  display: flex;
  font-size: 28px;
  justify-content: space-between;
  width: 95%;
  margin: 15px auto;
}
.grol .myWorkInfo div {
  padding: 6px 20px;
}
.totalWorkNum {
  background: #f0f0f0;
  border-radius: 30px;
}
.grol .totalWorkNum {
  background: #f0f0f0;
  border-radius: 30px;
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
  color: #999;
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
  color: #ef4454 !important;
}
.grol .gro_fail {
  color: #a5a5a5 !important;
}
.grol .gro_head {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  position: relative;
  font-size: 36px;
  margin-bottom: 20px;
  /* border-bottom:1px solid #eee; */
  /* position:fixed;
	top:0;
	z-index:99; */
}
.grol .gro_head i {
  position: absolute;
  padding: 20px;
  right: 30px;
  font-size: 36px;
}
/** 头部搜索 */
.grol .gro_sea {
  width: 100%;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #ffffff;
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
  /* float: left;
	margin-left: 15px; */
  width: 100%;
  height: 64px;
  line-height: 64px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  background-color: #f3f3f3;
  border-radius: 32px;
  -webkit-border-radius: 32px;
}
.grol .gro_sea .gro_sea_inp .gro_sea_find {
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

.gro_sea_find_img > img {
  width: 32px;
  height: 32px;
}
.grol .gro_sea .gro_sea_inp > input {
  /* float: left;
	margin-left: 20px;
	margin-top: 16px; */
  width: 78%;
  height: 64px;
  line-height: 64px;
  font-size: 28px;
  padding-left: 20px;
}
.grol .gro_sea .gro_sea_inp .gro_sea_close {
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
.gro_sea .gro_sea_exec {
  float: left;
  height: 64px;
  /* line-height:64px; */
  padding: 0px 20px 0 30px;
  color: #6a6a6a;
  font-size: 28px;
  display: flex;
  align-items: center;
}
.grol .gro_sea .gro_sea_inp .gro_sea_exec {
  float: right;
  margin-top: 18px;
  width: 100px;
  height: 28px;
  line-height: 28px;
  font-size: 28px;
  text-align: center;
  border-left: 2px solid #c9c9c9;
}

.gro_sea_title {
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #999999;
}

.grol input::-webkit-input-placeholder {
  color: #999999;
}
/** TODO: 商品列表 */
.grol .gro_ite_list {
  width: 750px;
  /* height: fill-available;
	height: -webkit-fill-available; */
  height: calc(100vh - 250px);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
  /* margin-top: 0px; */
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
.selectBorder {
  background: #f9f9f9;
}
/*loading部分*/
.grol .loading {
  width: 750px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000000;
}
.grol .loadingIn {
  width: 280px;
  height: 300px;
  border-radius: 10px; /*no*/
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  margin-top: -150px;
  margin-left: -140px;
}
.grol .loadingIn img {
  width: 160px;
  height: 160px;
  margin-top: 50px;
}
.grol .loadingIn p {
  padding-top: 20px;
  font-size: 28px;
}

/* 弹窗 */
.grol .monToast {
  width: 270px;
  height: 72px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
.grol .monToast img {
  width: 50px;
  height: 40px;
}
.grol .monNum {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #ffd720;
  margin-left: 15px;
}
</style>
