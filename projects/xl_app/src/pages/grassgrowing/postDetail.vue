<template>
    <div class="postDetail">
        <!-- 顶部返回和分享按钮 -->
        <div class="between topCont">
            <div class="alignCen">
                <span class="backBtn" @click="goBack"><i class="iconfont iconfanhui ft34"></i></span>
                <img :src="userInfo.avatar" class="userImg" @click="ToMainView(userInfo.uid)"/>
                <span class="userTxt ml20 ellipsisTxt">{{userInfo.nickName}}</span>
            </div>
            <div class="alignCen">
                <span class="followBtn" :class="['followBtn',isFollow=='已关注'?'isFollowed':'isFollow']" @click="followHander">{{isFollow}}</span>
                <span class="relayBtn" @click="sharePost">
                    <i class="iconfont iconzhuanfa ft34"></i>
                </span>
            </div>
        </div>
        <!-- 轮播图 -->
        <div class="swiper-container">
            <div class="swiper-wrapper">  
                <div v-for='(item,index) in detailData.imgUrls' :key='"swiper_"+index' class="swiper-slide">
                    <img :src="item" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="helpChoose" @click="toSameView"><img src="../../assets/img/grassgrowing/helpChoose.png"/></div>
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
            <p class="contTitle">{{detailData.content}}</p>
            <div class="postTag">
                <img src="../../assets/img/grassgrowing/tagImg.png"/>
                <span>{{tagCont.tagName}}</span>
            </div>
            <p class="color999">{{detailData.createTime}}</p>
        </div>
        <!-- 评论区域 -->
        <div class="commentList" ref="comList">
            <p>共{{commentNum}}条评论</p>
            <!-- 添加评论 -->
            <div class="addCommItem">
                <img src="" class="avertImg"/>
                <input type="text" placeholder="说点什么..." class="addCom" @click="writeCom"/>
            </div>
            <div v-for="(item,index) in commentList" :key="index" class="commItem">
                <div class="avertImg">
                    <img :src="item.userInfoVO.avatar"  />
                </div>
               <div class="fx1">
                   <div class="between">
                        <span class="color999">{{item.userInfoVO.nickName}}</span>
                        <span class="commZan pd20" @click="zanComment(item)">
                            <i  :class="['iconfont',item.isZan==1?'redZan iconzan':'iconxin']"></i>
                            <span>{{item.zanNum}}</span>
                        </span>
                   </div>
                  <div class="pr70">
                      <p>{{item.content}}<span class="color999 pl10">{{item.createTime}}</span></p>
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
                </div>
                <div class="rel btnItem fx" @click="storeHander">
                    <i :class="['iconfont',detailData.isCollect == 1?'iconshoucangdianjihou storedBtn':'iconshoucang']"></i>
                    <span class="numTxt" v-if="detailData.collectNum">{{detailData.collectNum}}</span>
                </div>
                <div class="rel btnItem fx" @click="showComment">
                    <i class="iconfont iconpinglun"></i>
                    <span class="numTxt" v-if="detailData.replyNum">{{detailData.replyNum}}</span>
                </div>
            </div>       
        </div>
        <!-- 点赞收金币的提醒 -->
        <div class="monToast" v-show="showMonToast">
            <img src="../../assets/img/other/jinbi.png" alt="" />
            <span class="monNum">+ 10金币</span>
        </div>
        <!-- 显示收藏提醒的弹框 -->
        <div class="storeToast" v-show="showStoreTip">
            <img src="../../assets/img/grassgrowing/goodsImg.png" />
            <div class="storeTxt">
                <p class="successTxt">收藏成功</p>
                <p class="storeTips">已成功收藏至收藏夹</p>
            </div>
        </div>
        <!-- 倒计时悬浮框 -->
        <div class="circlePro"  v-if="!timeup"></div>
        <div class="timeToast" v-if="!timeup">
                <CircleProgress
                :width="106"
                :radius="5"
                :progress="progress"
                barColor="#ff8376"
                backgroundColor="#ffedeb"
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
        <div class="writeComCont" v-if="showMask">
            <input type="text" class="bigInput" placeholder="收藏是喜欢，评论是真爱" v-model="comCont" ref="bigInput" />
            <span class="sendCom" @click="addComm">发送</span>
        </div>
    </div>
</template>
<script>
import "@/assets/css/grassgrowing/postDetail.css"
import {caoApi} from "@/utils/request.js"
import Swiper from "swiper"
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
            timeup:false
           
        }
    },
    created() {
        this.tid = this.$route.params.tid;//帖子id
        this.authorUid = this.$route.params.userId;//作者id
        this.getData();
        clearInterval();
        this.timeDown();
    },
    mounted() {
        this. _initSwiper();
    },
    methods: {
        getData(){
            let params = {
                token: '',
                fromType: 2,
                pageTid: 0,
                pageSize: 1,
                pageType: 1,
                authorUid: this.authorUid,
                tid: this.tid
            }
            caoApi.postDetail(params).then((data) =>{
                console.log(data);
                if(data.code == 200){
                    this.userInfo = data.data[0].userInfo;
                    this.isFollow = data.data[0].isFollow == 1 ?'已关注':'关注';
                    this.detailData = data.data[0].topicInfo;
                    this.tagCont = data.data[0].tagInfos[0],
                    this.commentNum = data.data[0].totalReplyNum;
                    this.commentList = data.data[0].recentReplys;
                }else{

                }
            })
        },
        _initSwiper(){
            var mySwiper = new Swiper('.swiper-container', {
                observer:true,
                observeParents:true,
                loop: true,
                paginationClickable:true,
                pagination:{
                    el:'.swiper-pagination',
                    clickable:true,
                    renderBullet(index, className){
                        console.log(className);
                        return '<li class="'+className+'"></li>'
                    }
                }
            })
        },
        followHander(){//点击关注按钮
            let type = this.isFollow == '关注'? 0:1;
            let params = {
                token:'B25FBD9E8B8575014839728E3A6B698A',
                uids:this.userInfo.uid,
                type:type
            }
            caoApi.postDetail(params).then((data) =>{
                if(data.code == 200){
                    this.isFollow = this.isFollow == "关注" ? "已关注":"关注";
                }
            })
        },
        zanHander(){//点赞按钮
            if(this.detailData.isFav == 0){           
                let params = {
                    token:"sdf21das31f5e1fasdf", //token
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
                        },1000)
                    }
                })
            }else{
                return;
            }
            
        },
        sharePost(){//分享接口
            let title = this.detailData.title;
            let desc = this.detailData.content;
            let imgUrl = this.detailData.imgUrls[0];
            let articleUrl = 'http://mp.xunbao88.com.cn/miniprogram/share.html?userId='+this.authorUid+'&tid='+this.tid;
            let type = 1;        
            if(Vue.prototype.sysEnv == "ios"){
                window.webkit.messageHandlers.getShareAction.postMessage({title:title,detailUrl:articleUrl,imgUrl:imgUrl,desc:desc,type:type});
            }else if(Vue.prototype.sysEnv == "android"){
                window.joybuy.getShareAction(title,articleUrl, imgUrl,desc,type) ;

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
                token:"sdf21das31f5e1fasdf", //token
                tid:this.tid, //帖子id
                type :3, //(1点赞,3收藏)
                actionType:this.detailData.isCollect
            }
            caoApi.interactive(params).then((data)=>{
                if(data.code == 200){
                    if(this.detailData.isCollect == 1){
                        this.detailData.collectNum = this.detailData.collectNum + 1;
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
            let ht = this.$refs.comList.offsetHeight;
            let clientTop = window.screen.height;
            let scrollH = document.documentElement.scrollHeight;
       
            if(ht < clientTop ){
                if(document.documentElement.scrollTop < scrollH -clientTop){
                    document.documentElement.scrollTop = scrollH-clientTop;
                }else{
                    document.documentElement.scrollTop = 0;
                } 
            }else{
                if(top < 700 ){
                    document.documentElement.scrollTop = 700;
                }else{
                    document.documentElement.scrollTop = 0;
                }
            }
  
        },
        showAllCom(){//显示所有评论
            let params = {
                token:'B25FBD9E8B8575014839728E3A6B698A',
                tid:this.tid,
                pageSize:this.pageSize,
                pageNo:this.pageNo
            }
            caoApi.commentList(params).then((data) =>{
                if(data.code == 200){
                    this.commentList = this.commentList.concat(data.data);
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
                token:'B25FBD9E8B8575014839728E3A6B698A',
                type:0
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
                token:'B25FBD9E8B8575014839728E3A6B698A',
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
        toSameView(){//调到同款页面

        }

    },
    components:{
        CircleProgress
    }
}
</script>

