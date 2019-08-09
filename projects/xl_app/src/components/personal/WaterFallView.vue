<!--  -->
<template>
    <div class="dataSection" :style="padingTop" @touchstart="inTouchDown" @touchmove="onTouchMove" @touchend="inTouchUp" @mousedown="inTouchDown" @mousemove="onTouchMove" @mouseup="inTouchUp">
      <scroller :on-refresh="refresh" :on-infinite="onInfiniteLoad" ref="myscroller">
        <div v-if="pageType=='around'" class="aroundPeople">
          <img src="../../assets/img/personal/peopleAround.png" />
        </div>
        <div class="dataLeft">
            <div v-for="(item, index) in leftList" :key='item.tid' class="dataItemContain">
                <div class="dataItem" @click='_goDetail(item.tid, item.userInfo.uid, item.isFollow)'>
                    <img lazy-load mode="widthFix"  :src="item.imgUrl">
                    <div v-if="pageType=='works'" class="getMoneyBanner">{{item.topicRed}}</div>
                    <div v-if="pageType=='works'" class="viewNumBanner">
                        <i class='iconfont iconyanjing'></i><span>{{item.pageView}}</span>
                    </div>

                    <div class="dataTitle" style="-webkit-box-orient: vertical;">{{item.title}}</div>

                    <div v-if="pageType=='around'" class="aroundInfo" @click.stop='_goUserInfo'>
                    <div class="userAroundInfo">
                        <img class="userAroundAvatar" :src="item.userInfo.avatar">
                        <span class="userAroundUserName">{{item.userInfo.nickName}}</span>
                    </div>
                        <div class="distanceLen">
                            <img class="locationIcon" src="../../assets/img/personal/iconlocation.png">
                            <span class="userAroundDistance">{{item.distance}}</span>
                        </div>
                    </div>

                    <div v-if="pageType=='find'||pageType=='collection'||pageType=='works'" class="userInfo" @click.stop='_goUserInfo'>
                        <img class="userAroundAvatar" :src="item.userInfo.avatar">
                        <span class="userAroundUserName">{{item.userInfo.nickName}}</span>
                    </div>

                    <div v-if="pageType=='find'||pageType=='collection'||pageType=='works'" class="infoContain">
                        <div class="buyNum" @click.stop='_goGoodsDetail'>
                            <i class='iconfont iconshangpin1'></i>
                            <span>{{item.relCommodityNum}}</span>
                        </div>
                        <div class="likeNum" @click.stop='_likeEvent("left", index, item.tid, item.haveFav)'>
                            <i v-if="item.haveFav==0" class='iconfont iconxin1'></i>
                            <i v-if="item.haveFav==1" class='iconfont iconxin2 xinRed'></i>
                            <span>{{item.favNum}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="dataRight">
            <div v-for="(item, index) in rightList" :key='item.tid' class="dataItemContain">
                <div class="dataItem" @click='_goDetail(item.tid, item.userInfo.uid, item.isFollow)'>
                    <img lazy-load mode="widthFix"  :src="item.imgUrl">
                    <div v-if="pageType=='works'" class="getMoneyBanner">{{item.topicRed}}</div>
                    <div v-if="pageType=='works'" class="viewNumBanner">
                        <i class='iconfont iconyanjing'></i><span>{{item.pageView}}</span>
                    </div>

                    <div class="dataTitle" style="-webkit-box-orient: vertical;">{{item.title}}</div>

                    <div v-if="pageType=='around'" class="aroundInfo" @click.stop='_goUserInfo'>
                    <div class="userAroundInfo">
                        <img class="userAroundAvatar" :src="item.userInfo.avatar">
                        <span class="userAroundUserName">{{item.userInfo.nickName}}</span>
                    </div>
                        <div class="distanceLen">
                            <img class="locationIcon" src="../../assets/img/personal/iconlocation.png">
                            <span class="userAroundDistance">{{item.distance}}</span>
                        </div>
                    </div>

                    <div v-if="pageType=='find'||pageType=='collection'||pageType=='works'" class="userInfo" @click.stop='_goUserInfo'>
                        <img class="userAroundAvatar" :src="item.userInfo.avatar">
                        <span class="userAroundUserName">{{item.userInfo.nickName}}</span>
                    </div>

                    <div v-if="pageType=='find'||pageType=='collection'||pageType=='works'" class="infoContain">
                        <div class="buyNum" @click.stop='_goGoodsDetail'>
                            <i class='iconfont iconshangpin1'></i>
                            <span>{{item.relCommodityNum}}</span>
                        </div>
                        <div class="likeNum" @click.stop='_likeEvent("right", index, item.tid, item.haveFav)'>
                            <i v-if="item.haveFav==0" class='iconfont iconxin1'></i>
                            <i v-if="item.haveFav==1" class='iconfont iconxin2 xinRed'></i>
                            <span>{{item.favNum}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </scroller>
    </div>
</template>

<script>
// import {haveFav} from '../../utils/indexOne';

import {setCookie} from '../../utils/filter';
// let leftList = new Array();
// let rightList = new Array();
let leftHight = 0, rightHight = 0, itemWidth = 345, maxHeight = 600;
let isFresh = true;
export default {
    props:{
      pageType:String, // find 发现 around 附近 collection 收藏 works 作品
      listData:Array,
      padingTop:String,
      fromSearch:{
        type:Boolean,
        value:false
      },
    },
    name: 'app',
    components: {},
    data () {
        return{
          dataAllList:[],
          leftList:[],
          rightList:[],
          noDate:false,
          page:1,
          // pageOne:1,
          // pageWorks:1,
          // pageColl:1,
          isReload:false,
          inDown: false,
          inTouchMove:false,
          lockTime:0,
          tPoint:{x:0,y:0},
          tar:{
            pn: '',
            page: 0,
          }
        }
    },
    created() {
      console.log("in created.. ");
      if (this.$refs && this.$refs.myscroller){
        this.$refs.myscroller.finishInfinite(false);
        this.$refs.myscroller.finishPullToRefresh();
      }
    },
    mounted() {
      console.log("in mounted.. ");
      if (this.$refs && this.$refs.myscroller){
        this.$refs.myscroller.finishInfinite(false);
        this.$refs.myscroller.finishPullToRefresh();
      }
      this.page = 1;
    },
    methods: {
      onInfiniteLoad(done) {
        let _that = this;

        if(this.pageType == 'works' && _that.leftList.length<=1 && _that.rightList.length<=1){
          this.$refs.myscroller.noDataText="";
        }else{
          this.$refs.myscroller.noDataText="没有更多数据";
        }
        if(this.fromSearch&&this.dataAllList.length<=0){
          this.$refs.myscroller.noDataText="";
          this.$refs.myscroller.finishInfinite(false); //不转圈圈不显示没有更多数据
        }

        if(true){
          if(this.noDate){
            this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
          }else{
            if(this.pageType == 'find'){
              console.log(1212121212)
              if(this.leftList.length<=0 && this.rightList.length<=0){
                this.$emit('getTypeDataList',{id:'',pageNo:1,done:done});
                this.page = 1;
              }else {
                this.page++;//下拉一次页数+1
                this.$emit('getTypeDataList',{id:'',pageNo:this.page,done:done});
              }
            }else if(this.pageType == 'around'){
              if(this.leftList.length<=0 && this.rightList.length<=0){
                this.$emit('getAroundList',{pageNo:1,done:done});
                // this.pageOne = 1;
                this.page = 1;
              }else {
                // this.pageOne++;//下拉一次页数+1
                // this.$emit('getAroundList',{pageNo:this.pageOne,done:done});
                this.page++;
                this.$emit('getAroundList',{pageNo:this.page,done:done});
              }
            }
            else if(this.pageType == 'works'){
              if(this.leftList.length<=0 && this.rightList.length<=0){
                this.$emit('getWorksList',{pageNo:1,done:done});
                // this.pageWorks = 1;
                this.page = 1;
              }else {
                // this.pageWorks++;//下拉一次页数+1
                // this.$emit('getWorksList',{pageNo:this.pageWorks,done:done});
                this.page++;//下拉一次页数+1
                this.$emit('getWorksList',{pageNo:this.page,done:done});
              }
            }else if(this.pageType == 'collection'){
              if(this.leftList.length<=0 && this.rightList.length<=0){
                this.$emit('getMyCollen',{pageNo:1,done:done});
                // this.pageColl = 1;
                this.page = 1;
              }else {
                // this.pageColl = this.pageColl+1;//下拉一次页数+1
                // this.$emit('getMyCollen',{pageNo:this.pageColl,done:done});
                this.page++;
                this.$emit('getMyCollen',{pageNo:this.page,done:done});
              }
            }
            if (this.pageType === this.tar.pn && this.page === this.tar.page) {
              this.$refs.myscroller.finishInfinite(true);
            } else {
              this.tar.pn = this.pageType;
              this.tar.page = this.page;
              this.$refs.myscroller.finishInfinite(false);
            }
          }
        }
      },
      refresh() {
        let _that = this;
        this.page=1;//重置页数刷新每次页数都是第一页
        this.noDate=false;//重置数据判断

        setTimeout(function(){
          if(_that.pageType == 'find'){
            _that.$emit('getTypeDataList',{id:-1,pageNo:1});
          }else if(_that.pageType == 'around'){
            _that.$emit('getAroundList',{pageNo:1});
          }else if(this.pageType=="works"){
            _that.$emit('getWorksList',{pageNo:1});
          }
          _that.$refs.myscroller.finishPullToRefresh();//刷新完毕关闭刷新的转圈圈
        }.bind(this),1700)
      },
      upDownOne:function(){
        // this.pageOne = 0;
        this.page = 0;
        this.isReload = true;
        this.$refs.myscroller.finishInfinite(false);
      },
      upDown:function(){
        // this.pageOne = 0;
        this.page = 0;
        // console.log(this.$refs.myscroller,'23232')
        this.isReload = true;
        this.$refs.myscroller.finishInfinite(false);
        },
        fillData: function(data,done){
            // if((this.page>1 || this.pageOne>1 || this.pageWorks>1)&&done){
            if(this.page>1 && done){
              this.dataAllList = this.dataAllList.concat(data);
            }else{
              this.dataAllList = data;
            }
            // console.log(this.dataAllList,'12121212121')
            let that = this;
            let isPull = isFresh;
            let listData = this.dataAllList;

            // 刷新
            if (isPull) {
                this.leftList = [];
                this.rightList = [];
                leftHight = 0;
                rightHight = 0
            }

            for (let i = 0; i < listData.length; i++){
                let tmp = listData[i];
                tmp.width = parseInt(tmp.imgWidth);
                tmp.height = parseInt(tmp.imgHeight);

                if(tmp.height == 0){
                    tmp.height = 600;
                }

                tmp.itemWidth = itemWidth;
                let per = tmp.width / tmp.itemWidth;
                if (per == 0){
                    per = 1;
                }

                tmp.itemHeight = tmp.height / per;
                if (tmp.itemHeight > maxHeight) {
                    tmp.itemHeight = maxHeight;
                }

                if (leftHight <= rightHight) {
                    this.leftList.push(tmp);
                    leftHight = leftHight + tmp.itemHeight;
                } else {
                    this.rightList.push(tmp);
                    rightHight = rightHight + tmp.itemHeight;
                }
            }
            if(done){
              // console.log("done");
              if(data.length<=0){
                setTimeout(()=>{done(true)},1000)
              }else{
                setTimeout(()=>{done()},1000)
              }
            }

        },
        inTouchDown: function(e) {
          // console.log(" inTouchDown ... " , e);
          this.inDown = true;
          if (e.targetTouches) {
            let tt = e.targetTouches[0];
            if (tt) {
              this.tPoint.x = e.pageX;
              this.tPoint.y = e.pageY;
            }
          }
        },
        onTouchMove: function(e) {
          if (this.inDown) {
            // console.log(" onTouchMove ... " , e);
            if (e.targetTouches) {
              let tt = e.targetTouches[0];
              if (tt) {
                if (Math.abs(tt.pageX - this.tPoint.x) > 5) {
                  return;
                }
                if (Math.abs(tt.pageY - this.tPoint.y) > 5) {
                  return;
                }
                if (!this.inTouchMove){
                  this.inTouchMove = true;
                }
              }
            }
          }
        },
        inTouchUp: function(e) {
          // console.log("   inTouchUp ... " , e);
          if (this.inTouchMove) {
            this.lockTime = new Date().getTime() + 700;
            this.inTouchMove = false;
          }
          this.inDown = false;
          this.tPoint.x = 0;
          this.tPoint.y = 0;
        },
        //回来事件
        scrollToOld:function(num){
        let _that = this;
        console.log(num,'23423423423423423423')
          num = parseInt(num);
          setTimeout(function () {
            _that.$refs.myscroller.scrollTo(0,num,true);
          },500)
        },
        // 去往详情页
        _goDetail: function (tid, uid, isFollow){
          // console.log(" >>> in _goDetail ...");
          const t = new Date().getTime();
          // console.log(" >>> " + t + ">>>" + this.lockTime);
          if (t <= this.lockTime) {
            // console.log(" >>> _goDetail be stop...");
            return;
          }
            let that = this;
            if(that.pageType == 'works'){
                that.$router.push({
                    path:'/detailPage',
                    query:{
                        ids: tid,
                        types: 'works',
                        isFollow: isFollow?isFollow:0,
                        pageFrom: 'myPage',
                        uid: uid
                    }
                });
            }else{
              console.log(this.$refs.myscroller.getPosition(),'dsahjkdhjaskhdashdkjas')
              let scro = this.$refs.myscroller.getPosition();
                that.$router.push({
                    path:'/detailPage',
                    query:{
                        ids: tid,
                        types: that.pageType,
                        isFollow: isFollow?isFollow:0,
                        pageFrom: 'listPage',
                        uid: uid
                    }
                });
              if(that.pageType == 'find'){
                // $.cookie('findScr',scro.top)
                setCookie("findScr", scro.top, 12);
              }else if(that.pageType == 'around'){
                // $.cookie('aroundScr',scro.top)
                setCookie("aroundScr", scro.top, 12);
              }
            }
        },

        // 作品点赞
        _likeEvent: function (list_direction, index, tid, hasFav){
            let that = this;
            if (hasFav == 0) {
                haveFav({
                    token: that.token,
                    actionType: 1,
                    type: 1,
                    tid: tid
                }).then(res => {
                    if (list_direction == "left") {
                        that.leftList[index].haveFav = 1;
                        that.leftList[index].favNum += 1
                    } else{
                        that.rightList[index].haveFav = 1;
                        that.rightList[index].favNum += 1
                    }
                })
            }
        },
        _goUserInfo: function (){
            console.log('goUserInfo')
        },
        _goGoodsDetail: function (){
            console.log('goGoodsDetail')
        }
    }
}
</script>

<style type="text/css" scoped>
    .dataSection{width: 100%;margin:0 auto;background: #f3f6f8;position: relative}
    .dataSection .dataLeft,.dataSection .dataRight{display: inline-block;vertical-align: top;}
    .dataSection .dataItemContain{width: 370px;}
    .dataSection .dataItem{width: 345px;margin:0 auto;position: relative;border-radius: 15px;box-shadow: 0px 2px 14px 2px #D1D1D1}
    .dataSection .dataLeft .dataItem{margin-top: 21px; margin-left: 20px;}
    .dataSection .dataRight .dataItem{margin-top: 21px; margin-left: 10px;}

    .dataSection .dataItem video{display: block;border-top-left-radius:15px;border-top-right-radius:15px;width: 100%;max-height: 600px;}
    .dataSection .dataItem img{display: block;border-top-left-radius:15px;border-top-right-radius:15px;width: 100%;max-height: 600px;position: relative;}

    .dataSection .dataItem .getMoneyBanner{
      font-size:20px;top:20px;color: #fff;
      /* background: #000; */
      background: rgba(0, 0, 0, 0.5);
      /* opacity: 0.5; */
      height: 36px;
      line-height: 36px;position: absolute;border-top-right-radius:18px;border-bottom-right-radius:18px;padding:0 20px;
    }

    .dataSection .dataItem .viewNumBanner{
      font-size:20px;
      /* bottom:130px; */
      margin-top: -55px;
      left:10px;
      color: #fff;
      /* background: #000; */
      /* opacity: 0.6; */
      background: rgba(0, 0, 0, 0.6);
      height: 36px;
      line-height: 36px;
      position: absolute;
      border-radius:18px;
      padding:0 18px 0 12px;
    }

    .dataSection .dataItem .viewNumBanner i{position: relative;margin-right: 8px;font-size: 22px}
    .dataSection .dataItem .viewNumBanner span{position: relative;}

    .dataSection .dataTitle{font-size: 28px;font-weight: bold;background: #fff;padding: 25px 15px 0px 15px;padding-bottom: 0px;color:#343434;display: -webkit-box;
    -webkit-line-clamp: 2;overflow: hidden;}

    .dataSection .userInfo{background: #fff;padding:20px 25px;padding-bottom:0px;overflow: hidden;}
    .dataSection .userInfo img{height: 50px;width: 50px;border-radius: 100%;float: left;}
    .dataSection .userInfo span{float: left;height: 50px;line-height: 50px;font-size: 24px;display: block;margin-left: 10px;color: #343434;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 120px;}

    .dataSection .infoContain{display: flex;background: #fff;padding: 0px 16px 12px 16px;flex-wrap:nowrap;border-bottom-left-radius:15px;border-bottom-right-radius:15px; justify-content: flex-end;}
    .dataSection .infoContain view{font-size: 28px;color:#343434;}
    .dataSection .infoContain view span{margin-left: 10px;}
    .dataSection .buyNum{margin-right: 15px;display: flex;align-items: center}
    .dataSection .buyNum>span{margin-left: 5px;}
    .dataSection .likeNum{display: flex;align-items: center}
    .dataSection .likeNum>span{margin-left: 5px;}


    .dataSection .aroundInfo{display: flex;justify-content: space-between;background: #fff;padding: 20px;border-bottom-left-radius:15px;border-bottom-right-radius:15px;}
    .dataSection .aroundInfo .userAroundInfo{overflow: hidden;}
    .dataSection .aroundInfo .userAroundInfo img.userAroundAvatar{float: left;width: 30px;height: 30px;border-radius: 100%;}
    .dataSection .aroundInfo .userAroundInfo span.userAroundUserName{float: left;font-size:24px;width: 120px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left:10px;display: block;height: 30px;line-height: 30px;}
    .dataSection .aroundInfo .distanceLen {overflow: hidden;}
    .dataSection .aroundInfo .distanceLen span.userAroundDistance{font-size:24px;display: block;height: 30px;line-height: 30px;float:left;}
    .dataSection .aroundInfo .distanceLen img.locationIcon{float: left;width: 30px;height: 30px;border-radius: 100%; margin-right: 3px}

    .xinRed{color:#ff2741;}
    .buyNum .iconfont{
      font-size: 28px;
    }
    .likeNum .iconfont{
      font-size: 30px;
    }
  .aroundPeople{
    width: 100%;
    height: 60px;
    background: #f3f6f8;
    padding-top: 15px;
    margin-top: 5px;
  }
  .aroundPeople>img{
    width: 65%;
    display: block;
    margin: 0 auto
  }
  .buyNum .iconshangpin1{font-size: 30px}
</style>
