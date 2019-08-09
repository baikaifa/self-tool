<template>
    <div class="postDetail">
        <!-- 顶部返回和分享按钮 -->
        <div class="topShareCont" v-if="fromType">
            <div class="center">
                <div class="logoBox"><img src="../../assets/img/grassgrowing/logo.png" /></div>
                <div>
                    <p class="blodText">喜乐阳光汇</p>
                    <p>分享好物，一起赚钱！</p>
                </div>
            </div>
            <span class="openBtn" @click="openApp">在APP打开</span>
        </div>   
        <div class="slotCont" v-if="!isPc"></div>
        <div class="between topCont" :class="['between','topCont',isPc?'hidePadding':'']">
            <div class="alignCen">
                <span class="backBtn" @click="goBack"><i class="iconfont iconfanhui ft34"></i></span>
                <img :src="userInfo.avatar" class="userImg" @click="ToMainView(userInfo.uid)"/>
                <span class="userTxt ml20 ellipsisTxt">{{userInfo.nickName}}</span>
            </div>
            <div class="alignCen">
                <span class="followBtn" :class="['followBtn',isFollow=='已关注'?'isFollowed':'isFollow',fromType?'mr20':'']" @click="followHander">{{isFollow}}</span>
                <span class="relayBtn" @click="sharePost" v-if="!fromType">
                    <i class="iconfont iconzhuanfa ft34"></i>
                </span>
            </div>
        </div>
        <!-- 轮播图 -->
        <!-- <div  ref="mySwiper" @touchmove.stop="getScrollLeft" :class="['mySwiper',isPc?'mt100':'']">
            <div v-for='(item,index) in detailData.imgUrls' :key='"swiper_"+index' class="mySlide">
                <img :src="item" />
            </div>

            <div class="helpChoose" @click="toSameView">帮你选</div>
        </div>
        <div class="pageTagList">
            <span v-for="(item,index) in detailData.imgUrls" :key="'tag_'+index" :class="['pageTag',selectedIndex == index?'redTag':'']"></span>
        </div> -->


        <!-- 轮播图 -->
        <div class="swiper-container">
            <div class="swiper-wrapper">  
                <div v-for='(item,index) in detailData.imgUrls' :key='"swiper_"+index' class="swiper-slide">
                    <img :src="item" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="helpChoose" @click="toSameView">帮你选</div>
        </div>
         <!-- 滑动区域 -->
        <div class="slideCont" v-if="sameGoods.length">
            <div v-for="(item,index) in sameGoods" :key="'same_'+index" class="sameItem">
                <div class="sameImg">
                    <img src="../../assets/img/grassgrowing/goodsImg.png" />
                </div>
                <div class="fx1">
                    <p class="sameTitle">{{item.sameTitle}}</p>
                    <div class="mt10 mb10">
                        <span v-if="item.quan" class="quanTxt">{{item.quan}}元券</span>
                        <span v-if="item.rebate" class="rebateTxt ml10">返{{item.rebate}}元</span>
                    </div>
                    <div class="between">
                        <span class="priceTxt">￥{{item.price}}</span>
                        <span class="buyBtn">购买</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 描述区域 -->
        <div class="desCont">
            <p class="topicTitle">{{detailData.title}}</p>
            <p class="contTitle" v-html="detailData.content"></p>
            <div class="postTag">
                <img src="../../assets/img/grassgrowing/tagImg.png"/>
                <span>{{tagCont.tagName}}</span>
            </div>
            <p class="color999">{{detailData.createTime}}</p>
        </div>
        <!-- 评论区域 -->
        <div class="commentList" ref="comList">
            <p class="textCol34">共{{commentNum}}条评论</p>
            <!-- 添加评论 -->
            <div class="addCommItem">
                <img :src="loginUserAvatar" class="avertImg"/>
                <input type="text" placeholder="说点什么..." class="addCom" @click="writeCom"/>
            </div>
            <div v-for="(item,index) in commentList" :key="index" class="commItem">
                <div class="avertImg">
                    <img :src="item.userInfoVO.avatar"  />
                </div>
               <div class="fx1 grayBorder">
                   <div class="between">
                        <span class="color999">{{item.userInfoVO.nickName}}</span>
                        <span class="commZan" @click.stop="zanComment(item)">
                            <i  :class="['iconfont',item.isZan==1?'redZan iconzan':'iconxin']"></i>
                            <span>{{item.zanNum}}</span>
                        </span>
                   </div>
                  <div class="pr70">
                      <p class="textCol34">{{item.content}}<span class="color999 pl10">{{item.createTime}}</span></p>
                  </div>
               </div>
            </div>
            <p class="showComBtn" v-show="commentList.length < commentNum && !showAll" @click="showAllCom">展开更多评论</p>
        </div>
        <!-- 底部按钮区域 -->
        <div class="footer-btns">
            <div class="rel">
                <i class="iconfont iconbianji3 penIcon"></i>
                <input class="writeBox" type="text" placeholder="说点什么..." @click="writeCom"/>
            </div>
            <div class="btnList">
                <div class="rel btnItem fx" @click="zanHander">
                    <i  :class="['iconfont',detailData.isFav ? 'iconzan redZan':'iconxin',zanAni == 1?'zanAni':'']"></i>
                    <span class="numTxt" v-if="detailData.favNum">{{detailData.favNum}}</span>
                    <span v-else  class="txtTip">点赞</span>
                </div>
                <div class="rel btnItem fx" @click="storeHander">
                    <i :class="['iconfont',detailData.isCollect == 1?'iconshoucangdianjihou storedBtn':'iconshoucang']"></i>
                    <span class="numTxt" v-if="detailData.collectNum">{{detailData.collectNum}}</span>
                    <span v-else  class="txtTip">收藏</span>
                </div>
                <div class="rel btnItem fx" @click="showComment">
                    <i class="iconfont iconpinglun"></i>
                    <span class="numTxt" v-if="commentNum">{{commentNum}}</span>
                    <span v-else  class="txtTip">评论</span>
                </div>
            </div>       
        </div>
        <!-- 点赞收金币的提醒 -->
        <div class="monToast" v-show="showMonToast">
            <img src="../../assets/img/other/jinbi.png" alt="" />
            <span class="monNum">+ 10金币</span>
        </div>
        <!-- 显示收藏提醒的弹框 -->
        <div class="storeToast" v-if="showStoreTip">
            <img :src="detailData.imgUrls[0]" />
            <div class="storeTxt">
                <p class="successTxt">收藏成功</p>
                <p class="storeTips">已成功收藏至收藏夹</p>
            </div>
        </div>
        <!-- 倒计时悬浮框 -->
        <div class="circlePro"  v-if="!timeup"></div>
        <div class="timeToast" v-if="!timeup" @click="pushGoldWechart()">
                <CircleProgress
                :width="106"
                :radius="5"
                :progress="progress"
                barColor="#ff8376"
                backgroundColor="#ffedeb"
                timeFunction
                :isAnimation="false"
                >
                    <img src="../../assets/img/grassgrowing/redPacket.png" class="redPacket jinbiAni" v-show="!isRead || progress >30" />
                    <div v-show="isRead && progress <=30" class="jinbiAni">
                        <div class="jinbiCont">
                            <img src="../../assets/img/other/jinbi.png" alt="" class="jinbiImg"/>
                            <span class="jinbiNum">+20</span>
                        </div>
                    </div>
                </CircleProgress>
        </div>
        <!-- 遮罩 -->
        <div class="mask" v-show="showMask" @click="hideMask"> 
        </div>
        <!-- 输入框 -->
        <div class="writeComCont" v-if="showMask" ref="writeComCont">
            <input type="text" class="bigInput" placeholder="收藏是喜欢，评论是真爱" v-model="comCont" ref="bigInput" />
            <span class="sendCom" @click="addComm">发送</span>
        </div>
        <!-- 分享的h5页面 -->
        <div class="maskJInbi" v-if="showJinbi">
            <div class="jinbiBox">
                <span class="sharejinbiNum">抢到<span class="font66">10</span>喜乐币</span>
                <div class="jinbibtnList">
                    <span class="knowBtn mb20" @click="hideJinBox">知道了</span>
                    <span class="robMoney" @click="goRobMoney">去抢更多金币</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/assets/css/grassgrowing/postDetail.css"
import {caoApi} from "@/utils/request.js"
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import CircleProgress  from 'vue-circleprogressbar';
import Vue from "vue"
export default {
    data(){
        return {
            userInfo:{
            }, 
            tagCont:{},
            commentNum:'',
            commentList:[],
            authorUid:'',
            tid:'',
            isFollow:"关注",
            pageSize:20,
            pageNo:1,
            showMask:false,
            comCont:'',
            detailData:{},
            sameGoods:[],
            zanAni:0,
            showMonToast:false,
            showStoreTip:false,
            showAll:false,
            isRead:false,
            progress:0,
            timeup:false,
            selectedIndex:0,
            showJinbi:false,
            loginUserAvatar:'',
            loginUserNickName:'',
            isPc:false,
            fromType:false
        }
    },
    created() { 
        this.tid = this.$route.query.tid;//帖子id
        this.authorUid = this.$route.query.userId;//作者id
        this.isPc = Vue.prototype.sysEnv == 'pc'?true:false;
        this.fromType = window.location.href.indexOf("fromType=share") >-1 ? true:false;

        clearInterval();
        this.timeDown(); 
        this.getData();
    },
    beforeRouteEnter(to, from, next){  
        next(vm =>{
            clearInterval();
            vm.progress = 0;
            vm.isRead = false;
            vm.showMonToast = false;

        });
    },
    mounted() {
      //  this.showInput();
         this. _initSwiper();
    },
    methods: {
        openApp(){
            if(Vue.prototype.sysEnv == "ios"){
                window.open("https://apps.apple.com/cn/app/%E5%96%9C%E4%B9%90%E9%98%B3%E5%85%89%E6%B1%87/id1441075827", '_blank');
            }else if(Vue.prototype.sysEnv == "android"){
                window.open("http://zdjqr.xunbao88.com.cn/wechatbusiness/jsp/xlyghapp/template/getAPP.html",'_blank');
            }
        },
        pushGoldWechart(){
            // 点击去金币页面
            let weChartId = '';
            let urlQuery = window.location.search;
            let url = '';
            let query = this.$route.query;
            
            if(urlQuery.indexOf('fromType=share') !== -1){
                url = urlQuery.substring(1, urlQuery.length);
                weChartId = url.split('&')[1].split('=')[1];
                query.weChartId = weChartId;
                this.$router.push({
                    name:"grassRedTip",
                    query:query
                });
                
            }else{
                this.$router.push({name:'readingProfit'})
            } 
        },

        hideJinBox(){
            let params = {
                type: '223',
                userId: this.authorUid,
                tid: this.tid,
            }
            caoApi.grassRedTip(params).then((data)=>{
                if(data.code == 200){
                } 
            })
            this.showJinbi = false;
            this.detailData.isFav = 1;
            this.zanAni = 1;
            this.detailData.favNum = this.detailData.favNum +1;
            this.showMonToast = true;
            let that = this;
            setTimeout(function(){
                that.showMonToast = false;
            },3000)

        },
        goRobMoney(){//分享页面跳出去
            this.hideJinBox();
            this.$router.push({name:'taskCenter'})
        },
        getScrollLeft(){
            this.selectedTag();
        },
        selectedTag(){
            let wd = this.$refs.mySwiper.clientWidth || this.$refs.mySwiper.style.width || this.$refs.mySwiper.offsetWidth || this.$refs.mySwiper.scrollWidth;
            let scrollLeft = this.$refs.mySwiper.scrollLeft;
            this.selectedIndex = Math.round(scrollLeft/wd);
        },
        getData(){
            let params = {
                fromType: 2,
                pageTid: 0,
                pageSize: 1,
                pageType: 1,
                authorUid: this.authorUid,
                tid: this.tid,
            }
            caoApi.postDetail(params).then((data) =>{
                if(data.code == 200){   
                    this.userInfo = data.data[0].userInfo;
                    this.isFollow = data.data[0].isFollow == 1 ?'已关注':'关注';
                    this.detailData = data.data[0].topicInfo;
                    this.tagCont = data.data[0].tagInfos[0],
                    this.commentNum = data.data[0].totalReplyNum;
                    this.commentList = data.data[0].recentReplys;
                    this.loginUserAvatar = data.loginUserAvatar;
                    this.loginUserNickName = data.loginUserNickName;
                    if(window.location.search.indexOf("fromType=share") != -1){
                        if(data.data[0].topicInfo.isFav){
                            this.showJinbi = false;
                        }else{
                            this.showJinbi = true;
                        }
                    }
                }else{

                }
            })
        },
        _initSwiper(){
            var mySwiper = new Swiper('.swiper-container', {
                observer:true,
                observeParents:true,
                loop: false,
                paginationClickable:true,
                pagination: '.swiper-pagination',
                paginationType: 'custom',
                paginationCustomRender: function ( swiper, current, total ) {
                    var _html = '';
                    for ( var i = 1; i <= total; i++ ) {
                        if ( current == i ) {
                        _html += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
                        } else {
                        _html += '<span class="swiper-pagination-customs"></span>';
                        }
                        }
                    return _html; 
                },
            })
        },
        followHander(){//点击关注按钮
            let type = this.isFollow == '关注'? 1:0;
            let params = {
                uids:this.userInfo.uid,
                type:type
            }
            caoApi.postFollow(params).then((data) =>{
                if(data.code == 200){
                    this.isFollow = this.isFollow == "关注" ? "已关注":"关注";
                }
            })
        },
        zanHander(){//点赞按钮
            if(this.detailData.isFav == 0){           
                let params = {
                    tid:this.tid, //帖子id
                    type :1, //(1点赞,3收藏)
                    actionType:1
                }
                let that = this;
                caoApi.interactive(params).then((data)=>{
                    if(data.code == 200){
                        that.detailData.isFav = 1;
                        that.zanAni = 1;
                        that.detailData.favNum = that.detailData.favNum +1;
                        that.showMonToast = true;
                        setTimeout(function(){
                            that.showMonToast = false;
                        },3000)
                    }
                })
            }else{
                return;
            }
            
        },
        sharePost(){//分享接口
            if(window.location.search.indexOf("fromType=share") != -1){
                if(Vue.prototype.sysEnv == "ios"){
                    window.open("https://apps.apple.com/cn/app/%E5%96%9C%E4%B9%90%E9%98%B3%E5%85%89%E6%B1%87/id1441075827", '_blank');
                }else if(Vue.prototype.sysEnv == "android"){
                    window.open("http://zdjqr.xunbao88.com.cn/wechatbusiness/jsp/xlyghapp/template/getAPP.html",'_blank');
                }
            }else{
                let title = this.detailData.title;
                let desc = this.detailData.content;
                let imgUrl = this.detailData.imgUrls[0];
                let articleUrl = 'http://mp.xunbao88.com.cn/appweb/index.html?shareId=666&fromType=share#/postDetail?userId='+this.authorUid+'&tid='+this.tid+'&VNK=58422ba0';
               // let articleUrl = 'http://mp.xunbao88.com.cn/share.html?userId='+this.authorUid+'&tid='+this.tid+'&token='+this.token+"&from=share";
                let type = 2;  
                desc = desc.replace(/<br>/g,'');  
                if(Vue.prototype.sysEnv == "ios"){
                    window.webkit.messageHandlers.getShareAction.postMessage({title:title,detailUrl:articleUrl,imgUrl:imgUrl,desc:desc,type:1});
                }else if(Vue.prototype.sysEnv == "android"){
                    window.joybuy.getShareAction(title,articleUrl, imgUrl,desc,type) ;

                }
            }
        }, 
        storeHander(){//收藏接口
            if(this.detailData.isCollect == 0){
                this.detailData.isCollect = 1;
                this.showStoreTip = true;
                let that = this;
                setTimeout(() => {
                    that.showStoreTip = false;
                }, 3000);
            }else{
                this.detailData.isCollect = 0;
            }
            let params = {
                tid:this.tid, //帖子id
                type :3, //(1点赞,3收藏)
                actionType:this.detailData.isCollect
            }
            caoApi.interactive(params).then((data)=>{
                if(data.code == 200){
                    if(this.detailData.isCollect == 1){
                        this.detailData.collectNum = this.detailData.collectNum + 1;
                        console.log(this.detailData.collectNum);
                    }else{
                        this.detailData.collectNum = this.detailData.collectNum - 1;
                    }
                }
            })

        },
        zanComment(item){//点击评论里的赞
           item.isZan = item.isZan == 0 ? 1:0;
        },
        showComment(){//是否显示评论
            let ht = this.$refs.comList.offsetTop;
            let clientTop = window.screen.height;
            let scrollH = document.documentElement.scrollHeight;
            let top = document.body.scrollTop || document.documentElement.scrollTop;
            let headerH = this.isPc ?200:160;

            if(ht > top){
                document.documentElement.scrollTop = ht-headerH;
                document.body.scrollTop = ht-headerH;
            }else{
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }

        },
        showAllCom(){//显示所有评论
            let params = {
                tid:this.tid,
                pageSize:this.pageSize,
                pageNo:this.pageNo
            }
            caoApi.commentList(params).then((data) =>{
                if(data.code == 200){
                    this.commentList = this.commentList.concat(data.data);
                    this.commentNum = this.commentList.length;
                    if(this.commentList.length < this.commentNum){
                        this.pageNo = this.pageNo + 1;
                    }else{
                        this.showAll = true;
                    }
                }
            })
           
        },
        ToMainView(id){
            this.$router.push({name:'posterHomePage',params:{uid:id}})
        },
        goBack(){
            this.$router.go(-1);
        },
        timeDown(){
            let that = this;
            let params = {
                type:211
            };
            let timer = setInterval(() => {
                that.progress = parseInt(that.progress) + 1;
                if(that.progress == 100){
                    clearInterval(timer);
                    caoApi.addBonus(params).then((data)=>{
                        if(data.code == 200){
                            that.isRead = true;
                            that.progress = 0;
                            that.timeDown();
                        }else if(data.code == 212 || data.code == 213){
                            that.timeup = true;
                            clearInterval(timer);
                        }
                    })
                }
            }, 200);
        },
        writeCom(){//写评论
            this.showMask = true;
            this.comCont = '';
            this.txtFocus();
           
        },
        txtFocus(){
            if (this.$refs.bigInput) {      
                this.$refs.bigInput.focus();     
            } else {
                setTimeout(() => {
                    this.txtFocus();
                }, 300);
            }
        },
        showInput(){
            let oH = document.documentElement.clientHeight || document.body.clientHeight;
            let that = this;
            window.onresize = function(){
                if(that.$route.name === "postDetail"){
                    let resizeH = document.documentElement.clientHeight || document.body.clientHeight;
                    let keyBoardH;
                    alert(resizeH + ' AAAA '+oH);
                    if(resizeH < oH){//键盘弹出
                        keyBoardH = oH - resizeH;
                        let keyRem = keyBoardH/75;
                        that.$refs.writeComCont.style.bottom = keyRem.toFixed(2)+'rem';
                    }else{//键盘收起
                        that.$refs.writeComCont.style.bottom = 0;
                        that.showMask = false;
                    }
                }
               
            }
        },
        hideMask(){
            this.showMask = false;
        },
        addComm(){//增加评论
            if(this.comCont == ''){
                this.$refs.bigInput.focus();
                return false;
            }
            this.showMask = false;
            let params = {
                tid:this.tid,
                content:this.comCont
            }
            caoApi.addComment(params).then((data)=>{
                if(data.code == 200){
                    this.pageNo = 1;
                    this.commentList = [];
                    this.showAllCom();
                }   
            })
        },
        
        toSameView(){
            //调到同款页面
        
        }
    },
    components:{
        CircleProgress
    },
    beforeRouteLeave(to, from, next){
        for(let i = 0;i< 100;i++){
            clearInterval(i);
        }   
        this.progress = 0;
        this.isRead = false;
        next();
    }
}
</script>

