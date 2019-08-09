<template>
    <div class="tCenter">
		<eleTit  bw="true">
            <div slot="app_tit_righ" class="task_tit_help"><img src="../../assets/img/other/rule.png" @click="toRule"></div>
        </eleTit>
        <!-- 后退键 -->
        <!-- <div class="backBtn">
            <i class="iconfont iconfanhui" @click="goBak"></i>
            任务中心
            <img src="../../assets/img/other/rule.png" @click="toRule">
        </div> -->
        <div class="container">
            <div class="user">
                <div class="users userL">
                    <img :src="userAvatar" alt="">
                    <p>{{userNickName}}</p>
                </div>
                <div class="users userR">
                    <img src="../../assets/img/other/coin.png" alt="">
                    <p>{{xileCoin}}</p>
                </div>
            </div>
            <div class="taskContainer">
                <div class="taskTitle">日常任务</div>
                <div class="tasks borderB">
                    <p class="tips">阅读20S
                        <!-- <span style="margin-left:10px;">({{readInfo}})</span> -->
                    </p>
                    <p class="tipsT">累计20S便可获得20金币奖励~</p>
                    <div class="btn finishBtn" @click="toGongList" v-if="readFlag==0">去完成</div>
                    <div class="btn hasBtn" v-if="readFlag==1">已达上限</div>
                </div>
                <div class="tasks borderB">
                    <p class="tips">点赞奖励
                        <!-- <span style="margin-left:10px;">({{favInfo}})</span> -->
                    </p>
                    <p class="tipsT">点赞每次可得10金币奖励~</p>
                    <div class="btn finishBtn" @click="toGongList" v-if="favFlag==0">去完成</div>
                    <div class="btn hasBtn" v-if="favFlag==1">已达上限</div>
                </div>
                <div class="tasks borderB">
                    <p class="tips">发帖奖励
                        <!-- <span style="margin-left:10px;">({{postTopicInfo}})</span> -->
                    </p>
                    <p class="tipsT">发帖每条可得100金币奖励~</p>
                    <div class="btn finishBtn" @click="toPoster" v-if="postTopicFlag==0">去完成</div>
                    <div class="btn hasBtn" v-if="postTopicFlag==1">已达上限</div>
                </div>
                <div class="tasks borderB">
                    <p class="tips">精华帖奖励</p>
                    <p class="tipsT">帖子升级至精华帖可得2元现金红包~</p>
                    <div class="btn finishBtn" @click="getReward(214)" v-if="isBestTopic==1">领取</div>
                    <div class="btn hasBtn" v-if="isBestTopic==0">未完成</div>
                </div>
                <div class="tasks borderB">
                    <p class="tips">分享帖子奖励
                        <!-- <span style="margin-left:10px;">({{shareTopicInfo}})</span> -->
                    </p>
                    <p class="tipsT">分享帖子给好友，好友查看后，可得奖励~</p>
                    <div class="btn finishBtn" @click="toGongList" v-if="shareTopicFlag==0">去完成</div>
                    <div class="btn hasBtn" v-if="shareTopicFlag==1">去完成</div>
                </div>
                <div class="tasks">
                    <p class="tips">互动奖励</p>
                    <!-- <p class="tips">互动奖励<span style="margin-left:10px;">({{interactiveInfo}})</span></p> -->
                    <p class="tipsT">被点赞可得现金红包奖励~</p>
                    <div class="btn finishBtn" v-if="interactiveFlag==1" @click="toPosterHome">去完成</div><!-- 跳转我的作品 -->
                    <div class="btn getBtn" v-if="interactiveFlag==2" @click="getReward(220)">领取</div>
                    <div class="btn hasBtn" v-if="interactiveFlag==3">已领取</div>
                </div>
            </div>
            <div class="taskContainer">
                <div class="taskTitle">新人任务</div>
                <div class="tasks">
                    <p class="otherTips">首次下载注册喜乐可得2元现金红包</p>
                    <div class="btn getBtn" v-if="isNewer==0" @click="getReward(217)">领取</div>
                    <div class="btn hasBtn" v-if="isNewer==1">已领取</div>
                </div>
            </div>
            <div class="taskContainer">
                <div class="taskTitle">邀请任务</div>
                <div class="tasks borderB">
                    <p class="otherTips">邀请好友下载注册喜乐可得2元现金红包</p>
                    <button class="btn inviteBtn" v-if="isInvite==0"
                         v-clipboard:copy="detailUrl"
                         v-clipboard:success="onCopy"
                         v-clipboard:error="onError">去邀请</button>
                    <div class="btn getBtn" v-if="isInvite==1" @click="getReward(218)">领取</div>
                </div>
                <div class="tasks">
                    <p class="otherTips">受邀请下载注册喜乐可得2000金币</p>
                    <div class="btn getBtn" v-if="isBeInvite==2" @click="getReward(219)">领取</div>
                    <div class="btn hasBtn" v-if="isBeInvite==1?'':''"></div>
                    <div class="btn hasBtn" v-if="isBeInvite==3">已领取</div>
                </div>
            </div>
        </div>
        <!-- <div id="myToast" v-if="showToast">
            <img :src="toastImg" style="width: 30px; margin-right: 5px;">
            {{toastText}}
        </div> -->

        <div id="addCoin" v-if="showToast">
            <img :src="toastImg" alt="">
            <p>{{toastText}}</p>
        </div>
        <div class="shareDiv" v-if="shareDiv">
            <div class="shareCancel" @click="shareCancel"></div>

        </div>
    </div>
</template>
<script>
import hongbaoImg from "@/assets/img/other/hongbao.png";
import jinbiImg from "@/assets/img/other/jinbi.png";
import {reqOther} from "../../utils/request";
import eleTit from "@/components/title/title";
export default{
    data(){
        return {
            shareDiv:false,
            toastImg: "",
            toastText: "",
            showToast: false,
            userAvatar: "",
            userNickName: "",
            xileCoin:0,
            readInfo: "",
            readFlag: 0,
            favInfo: "",
            favFlag: 0,
            postTopicInfo: "",
            postTopicFlag: 0,
            shareTopicInfo: "",
            shareTopicFlag: 0,
            interactiveInfo : "",
            interactiveFlag: 0,
            isNewer: 0,
            isInvite: 0,
            isBeInvite: 0,
            isBestTopic:0,
            userId:0,
            detailUrl : "https://apps.apple.com/cn/app/%E5%96%9C%E4%B9%90%E9%98%B3%E5%85%89%E6%B1%87/id1441075827"

    }
    },
    components: {
        eleTit
    },
    created () {
        this.getInfo();
    },
    mounted() {
	},
    methods: {

        //返回上一页
        goBak(){
            this.$router.go(-1);
        },
        //去往规则页
        toRule(){
            this.$router.push("taskRule");
        },
        //任务-去往种草页
        toGongList(){
            this.$router.push("gongList");
        },
        //任务-去往发帖页面
        // TODO: 修改发帖页面 skyrivus
        toPoster(){
            this.$router.push("groupWorkPublish");
        },
        //任务-去往我的作品
        toPosterHome(){
            this.$router.push({name:'posterHomePage',params:{uid: this.userId}})
        },
        //任务-去邀请
        toInvite(){
            let title = "";
            let detailUrl = "https://apps.apple.com/cn/app/%E5%96%9C%E4%B9%90%E9%98%B3%E5%85%89%E6%B1%87/id1441075827";
            let imgUrl = "";
            let desc = "";
            // TODO: 修改安卓 ios 地址 skyrivus
			switch (Vue.prototype.sysEnv) {
				case "ios":
                    let type = 3;
					window.webkit.messageHandlers.getShareAction();
					break;
				case "android":
                    // let type = 2;
					window.joybuy.getShareAction();
					break;
			}

        },
        onCopy: function(e) {
            this.$toast("链接已复制");
        },
        onError: function(e) {
            this.$toast("复制失败");
        },
        //分享取消按钮
        shareCancel(){
            this.shareDiv=false;


        },
        //获取奖励
        getReward(type){
            var that = this;
            let params = {
                type: type
            };
            reqOther.addIncome(params).then(res => {
                if(res.code==200){
                    that.getInfo();
                    that.toastText = res.data;
                    if(res.data.indexOf("金币")>-1){
                        that.toastImg = jinbiImg;
                    }else{
                        that.toastImg = hongbaoImg;
                    }
                    that.showToast = true;
                    setTimeout(function(){
                        that.showToast = false;
                    }, 1500);
                }
            })
        },
        //获取任务信息
        getInfo(){
            let params = {
            };
            reqOther.taskCenter(params).then(res => {
                console.log(res);
                this.userAvatar = res.data.userAvatar;
                this.userNickName = res.data.userNickName;
                this.xileCoin = res.data.xileCoin;
                this.readInfo = res.data.readInfo;
                this.readFlag = res.data.readFlag;
                this.favInfo = res.data.favInfo;
                this.favFlag = res.data.favFlag;
                this.postTopicInfo = res.data.postTopicInfo;
                this.postTopicFlag = res.data.postTopicFlag;
                this.shareTopicInfo = res.data.shareTopicInfo;
                this.shareTopicFlag = res.data.shareTopicFlag;
                this.interactiveInfo = res.data.interactiveInfo;
                this.interactiveFlag = res.data.interactiveFlag;
                this.isNewer = res.data.isNewer;
                this.isInvite = res.data.isInvite;
                this.isBeInvite = res.data.isBeInvite;
                this.isBestTopic = res.data.isBestTopic;
                this.userId = res.data.userId;
            })
        }
    }
}
</script>
<style>
    /* .tCenter .iconfanhui{
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 34px;
        font-weight: bold;
    } */
    /* .tCenter .backBtn{
        position: fixed;
        top: 0;
        height: 80px;
        width: 100vw;
        line-height: 80px;
        text-align: center;
        font-size: 34px;
        background: #EF4454;
        color: #fff;
        z-index: 100;
    } */
    /* .tCenter .task_tit_help {
        width: 36px;
        height: 36px;
    } */

    .tCenter .app_head img {
        width: 36px;
        height: 36px;
    }
    /* .tCenter .backBtn img{
        width: 36px;
        height: 36px;
        position: absolute;
        right: 30px;
        top: calc(50% - 18px);
    } */
    .tCenter {
        background-image: url("../../assets/img/other/tCenterbg.png");
        background-size: contain;
        background-position: top;
        background-repeat: no-repeat;
    }
    .tCenter .container{
        /* padding-top: 80px; */
    }
    .tCenter .user{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 200px;
        padding: 0 60px;
    }
    .tCenter .users{
        display: flex;
        align-items: center;
        color: #fff;
    }
    .tCenter .userL img{
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-right: 20px;
    }
    .tCenter .userL p{
        font-size: 30px
    }
    .tCenter .userL{
        font-size: 30px;
    }
    .tCenter .userR{
        font-size: 36px;
        line-height: 34px;
    }
    .tCenter .userR img{
        width: 34px;
        height: 34px;
        margin-right: 15px;
    }
    .tCenter .taskContainer{
        background: #fff;
        width: 630px;
        height: 100%;
        margin: 0 auto;
        margin-bottom: 28px;
        border-radius: 20px;
        box-shadow: 0 15px 0.4rem -7px #eee;
        padding: 0 30px;
        padding-bottom: 15px;
    }
    .tCenter .borderB{
        border-bottom: 1px solid #eee;/*no*/
    }
    .tCenter .taskTitle{
        font-size: 36px;
        font-weight: bold;
        padding-top: 40px;
        padding-bottom: 20px;
    }
    .tCenter .tips{
        font-size: 30px;
        color: #343434
    }
    .tCenter .tipsT{
        font-size: 24px;
        color: #ACACAC;
        line-height: 2;
    }
    .tCenter .tasks{
        position: relative;
        padding-top: 20px;
        padding-bottom: 15px;
    }
    .tCenter .otherTips{
        font-size: 28px;
        line-height: 2;
        color: #343434;
    }
    .tCenter .btn{
        width: 120px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border-radius: 22px;
        position: absolute;
        top: 28px;
        right: 0;
    }
    .tCenter .finishBtn{
        background: #ffd7db;
        border: 1px solid #ffd7db;/*no*/
        color: #ef4454;
    }
    .tCenter .getBtn{
        color: #ef4454;
        border: 1px solid #ef4454;/*no*/
    }
    .tCenter .inviteBtn{
        color: #fff;
        background-image: url("../../assets/img/other/btnBg.png");
        background-size: 100% 100%;
        border:0;
        /*border: 1px solid rgba(0, 0, 0, 0);/*no*/
    }
    .tCenter .hasBtn{
        color: #fff;
        background: #ccc;
        border: 1px solid #ccc;/*no*/
    }
    .tCenter #myToast{
        position: fixed;
        top: 50%;
        left: calc(50% - 135px);
        width: 270px;
        height: 70px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffd720;
        font-size: 32px;
        font-weight: bold;
    }
    .tCenter #addCoin{
        width: 270px;
        height: 70px;
        font-size: 32px;
        color: rgb(255, 215, 32);
        position: fixed;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        text-align: center;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50px;
        line-height: 70px;
    }
    .tCenter #addCoin img{
        width: 65px;
        height: 50px;
        display: inline-block;
    }
    .tCenter #addCoin p{
        width: 150px;
        line-height: 70px;
        text-align: center;
        display: inline-block;
    }
    /*.shareDiv{*/

    /*    width: 100%;*/
    /*    background: #e5e5e5;*/
    /*    height: 25%;*/
    /*    position: fixed;*/
    /*    bottom: 0;*/
    /*}*/
    /*.shareCancel{*/
    /*    position: absolute;*/
    /*    height: 30%;*/
    /*    bottom: 0;*/
    /*    width: 100%;*/
    /*    background: #ffffff;*/
    /*}*/

</style>