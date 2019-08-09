<template>
    <div class="personalWrap">
		<eleTit hasBothMenu="true" >
            <div slot="app_tit_left">&nbsp;</div>
            <div class="iconWrap" slot="app_tit_righ">
                <span class="iconfont iconbangzhu" @click="goHelp"></span>
                <span class="iconfont iconshezhi" @click="goToSetting"></span>
            </div>
        </eleTit>
        <div class="personalContent">
            <div class="userInfoWrap">
                <img :src="userInfo.avatar" alt="" class="userAvatar" @click="goToSetting">
                <div class="userInfo">
                    <span class="userName">{{userInfo.nickname}}</span>
                    <div class="inviteCode">邀请码：{{inviteCode}} 
                        <button
                            class="copyBtn"
                            v-clipboard:copy="inviteCode"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            >复制
                        </button>
                    </div>
                    <ul class="personalInfo">
                        <li @click="goToWorks">
                            <div class="numInfo">
                                <span>{{userInfo.topicNum}}</span>
                            </div>
                            <span>作品</span>
                        </li>
                        <li @click="goToFollow">
                            <span>{{userInfo.followNum}}</span>
                            <span>关注</span>
                        </li>
                        <li @click="goToFuns">
                            <span>{{userInfo.fansNum}}</span>
                            <span>粉丝</span>
                        </li>
                        <li @click="goToCollect">
                            <span>{{userInfo.collectionNum}}</span>
                            <span>收藏</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="incomeWrap">
            <div class="header">
                <span>电商返利</span>
                <button class="btnIncome" @click="toCash">可提现&nbsp;{{userInfo.freeWithdraw}}<span class="iconfont iconbofang"></span></button>
            </div>
            <ul class="content">
                <li @click="goIncomePage('inc')">
                    <span class="price">￥{{userInfo.cumulativeIncome}}</span>
                    <span>累计收益</span>
                </li>
                <li @click="goIncomePage('cos')">
                    <span class="price">￥{{userInfo.preIncome}}</span>
                    <span>即将到账</span>
                </li>
                <li @click="goIncomePage('amo')">
                    <span class="price">￥{{userInfo.activityAmount}}</span>
                    <span>活动奖励</span>
                </li>
                <li @click="goXlCoin">
                    <span class="price">{{userInfo.xileCoin}}</span>
                    <span>喜乐币</span>
                </li>
            </ul>
        </div>
        <div class="panelListWrap">
            <div class="panelItem" v-for="(item,index) in panels" :key="index" @click="goContentType(item.type)">
                <span :class='item.icon'></span>
                <span class="panelName">{{item.name}}</span>
                <span class="goNext iconfont icongengduo1"></span>
            </div>
        </div>
    </div>
</template>
<script>
import {reqPersonal,reqForgetpwd} from "../../utils/request";
import defaultAvatar from '../../assets/img/personal/avatar.png';
import eleTit from "@/components/title/title";
import Vue from 'vue';
export default {
    components: {eleTit},
    data() {
        return {
            timer: '',
            invitecode:"",
            userInfo: {
                userId:"",				 //用户ID
				avatar:defaultAvatar,	 //用户头像
				nickname:"喜乐",		 //用户昵称
				cumulativeIncome:"0",   //累计收益
				freeWithdraw:"0",		//可提现金额
				xileCoin:"0",		    //喜乐币
				todayXileCoin:"0",      //今日喜乐币
				activityAmount:"0",	    //活动奖励
				topicNum:"0",		    //作品数
				followNum:"0",		    //关注数
				fansNum:"0",		    //粉丝数
				collectionNum:"0",	    //收藏数
				preIncome:"0",		    //即将到账
            },
            incomeInfo: {

            },
            panels: [
                {
                    icon: 'iconfont iconrw',
                    name: '任务中心',
                    type: 'renwu'
                },
                {
                    icon: 'iconfont iconfabu',
                    name: '发布作品',
                    type: 'fabu'
                },
                {
                    icon: 'iconfont iconyaoqingma',
                    name: '填写邀请码',
                    type: 'yaoqingma'
                },
                {
                    icon: 'iconfont iconwx',
                    name: '微信绑定',
                    type: 'weixin'
                },
                {
                    icon: 'iconfont iconkf',
                    name: '联系客服',
                    type: 'kefu'
                },
            ],
            bankList: [],
            inviteCode:''
        }
    },
    created() {
    },
    mounted() {
        console.log(" in personal. mounted ... ");
        this.getUserInfo();
        this.getInviteCode();
        this.getBankList();
        //TODO:定时器开始
        // this.timer = setInterval(this.getUserInfo, 30000);

    },
    //TODO:定时器结束
    // beforeDestroy(){
    //     if(this.timer) { //如果定时器在运行则关闭
    //         clearInterval(this.timer);
    //     }
    // },
    methods: {

        getUserInfo() {
            let params = {
            }
            reqPersonal.userMessage(params).then(res=>{
                if(res.code == 200) {
                    this.userInfo = res.data;
                } else {
                    console.log("获取数据失败")
                }
            })
        },
        getInviteCode() {
            let params = {}
            reqPersonal.getInviteCode(params).then(res=>{
                if(res.code == 200) {
                    this.inviteCode = res.data;
                    console.log( res.data)
                } else {
                    console.log("获取数据失败")
                }
            })
        },

        // 获取绑定验证码
        getBeinvitedCode() {
            let params = {}
            reqPersonal.getBeinvitedCode(params).then(res=>{
                if(res.code == 200) {
                    // this.inviteCode = res.data.beinvitedCode;
                } else {
                    console.log("获取数据失败")
                }
            })
        },
            
        // 帮助中心
        goHelp() {
            this.$router.push('/helpCenter');
        },
        // 设置
        goToSetting(){
            this.$router.push('/setting');
        },
        // 作品
        goToWorks() {
            // this.$router.push({path:'/posterHomePage',query:{id: this.userInfo.userId}})
             this.$router.push({"path":"/myWorksList",query:{id: this.userInfo.userId}});
        },
        // 关注
        goToFollow() {
	 this.$router.push({"path":"/myAttention",query:{id: this.userInfo.userId}});
        },
        // 粉丝
        goToFuns() {
        this.$router.push({"path":"/myFan",query:{id: this.userInfo.userId}});

        },
        // 收藏
        goToCollect() {
            this.$router.push({"path":"/myCollectionList",query:{id: this.userInfo.userId}});

        },
        // 累计收益
        goIncomePage(type) {

            this.$router.push({path:'/income',query:{tag: type,xlb: this.userInfo.xileCoin}})
        },
        // 喜乐币跳至收益细则
        goXlCoin() {
            // this.$router.push({path:'/incomeDetail'})
            this.$router.push({path:'/income',query:{tag: 'xlb',xlb: this.userInfo.xileCoin}})
        },
        goContentType(type){
            if(type == 'renwu') {
                this.$router.push('/taskCenter')
            }
            if(type == 'fabu') {
                this.$router.push('/groupWorkPublish')
            }
            if(type == 'weixin') {
                let params = {
                }
                reqPersonal.wxBind(params).then((res)=>{
                    if(res.code == 200) {
                        if(res.data.wxNumber !== '') {
                            this.$router.push({path:'/wxIsBind',query:{wxName:res.data.wxNumber}})
                        } else {
                            this.$router.push('/wxBind')
                        }
                    }
                })
                
            }
            if(type == 'kefu') {
                this.$router.push('/contactCustomerService')
            }
            if(type == 'yaoqingma') {

                let params = {}
                reqPersonal.getInviteCode(params).then(res=>{
                    if(res.code == 200) {
                        if(res.data.beinvitedName !== '') {
                            this.$router.push({path:'/fillInvitationCode',query:{id:res.data.beinvitedName}})
                        } else {
                            this.$router.push('/BindedMan')
                        }
                    } else {
                        console.log("获取数据失败")
                    }
                })

            }
        },
        // 提现
        toCash() {
            if(this.userInfo.freeWithdraw == 0) {
                this.$toast("没有可提现金额")
            }
            if(this.userInfo.freeWithdraw > 0) {
                if(this.bankList.length > 0) {
                    this.$router.push('/myPurseWithdraw')
                } else {
                    this.$router.push('/addAccountPersonal')
                }
                
            }
        },
        // 获取银行卡
        getBankList() {
            let params = {};
            reqPersonal.userBankList(params).then((res)=>{
                if(res.code == 200) {
                    this.bankList = res.data;
                }
            })
        },
        onCopy: function(e) {
            this.$toast("复制成功");
        },
        onError: function(e) {
            this.$toast("复制失败");
        },
    },


	// beforeRouteEnter(to,from,next){
    //     console.log(" in personal. beforeRouteEnter ... ");
	// 	// this.mounted();
    //     // this.getUserInfo();
    //     // this.getBankList();
	// },
}
</script>
<style scoped="scoped" type="text/css">
    .personalWrap {
        background: #f4f5f7;
        height: 100vh;
    }
    .personalWrap .personalHeader {
        background: #ef4454;
        /* padding: 20px 40px; */
        position: relative;
        height: 80px;
        line-height: 80px;
        text-align: center;
        box-sizing: border-box;
    }
    .personalWrap .personalHeader .title {
        font-size: 36px;
        color: #fff;
    }
    .personalWrap .app_head {
        background: #ef4454;
        color: #fff;
    }
    .personalWrap .app_head .side_righ {
        background: #ef4454;
        color: #fff;
        margin-left: 0px !important;
        margin-right: 15px !important;
    }
    .personalWrap .app_head .side_left {
        background-image: none !important;
    }
    
    /* .personalWrap .app_head .tit_bar .tit_tit{
        color: #fff;
    } */
    .personalWrap  .personalContent {
        padding: 20px 40px 250px 40px;
        background: url("../../assets/img/personal/personalHeader.png") no-repeat;
        background-size: cover;
    }
    .personalWrap .iconWrap {
        /* position: absolute;
        top: 0;
        right: 20px; */
        /* height: 80px; */
        display: flex;
        align-items: left;
        justify-content: flex-end;
    }
    .personalWrap .iconWrap .iconfont {
        color: #fff;
        font-size: 40px;
        margin-right: 15px;
        /* margin-left: 20px; */
    }
    .personalWrap .iconWrap .iconfont:last-child {
        color: #fff;
        font-size: 40px;
        margin-right: 20px;
        /* margin-left: 20px; */
    }
    .personalWrap .userInfoWrap {
        display: flex;
        color: #fff;
    }
    .personalWrap .userInfoWrap .userAvatar {
        width: 108px;
        height: 108px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin-right: 30px;
    }
    .personalWrap .userInfo {
        flex: 1;
        font-size: 28px;
        /* font-size: 32px; */
    }
    .personalWrap .userInfo .inviteCodeP{
        position: relative;
        top: 8px;
        margin-left: 4px;
        flex: 1;
        font-size: 24px;
        /* font-size: 32px; */
    }
    .personalWrap .userInfo .userName {
        font-size: 36px;
    }
    .personalWrap .personalInfo {
        display: flex;
        align-items: center;
        padding: 30px  30px 30px 0;
        justify-content: space-between;
    }
    .personalWrap .personalInfo > li {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .personalWrap .personalInfo > li .numInfo {
        position: relative;
    }
    .personalWrap .personalInfo > li .numInfo .titleIcon {
        position: absolute;
        right: -10px;
        top: 2px;
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #fbf4d7;
    }
    .personalWrap .incomeWrap {
        background: #fff6da;
        border-radius: 10px;
        font-size: 32px;
        margin:-226px 20px 0 20px;
        height: 206px;
        color: #d79a00;
        padding-bottom: 10px;
    }
    .personalWrap .incomeWrap .header {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f7e3b1 ;
    }
    .personalWrap .incomeWrap .btnIncome {
        font-size: 28px;
        background: #ecba47;
        border: 0;
        padding: 0 20px;
        height: 45px;
        line-height: 45px;
        border-radius: 30px;
        color: #fff;
        display: flex;
        align-items: center;
    }
    .personalWrap .incomeWrap .btnIncome:focus {
        outline: none;
    }
    .personalWrap .incomeWrap .btnIncome > .iconfont {
        padding-left: 5px;
    }
    .personalWrap .incomeWrap .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        font-size: 28px;
        line-height: 1.5;
    }
    .personalWrap .incomeWrap .content li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .personalWrap .incomeWrap .content .price {
        font-weight: bold;
        font-size: 32px;
    }
    .personalWrap .panelListWrap {
        margin: 20px;
        font-size: 28px;
        color: #000;
        background: #fff;
    }
    .personalWrap .panelListWrap .panelItem {
        padding: 30px 0;
        margin: 0 30px;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
    }
    .personalWrap .panelListWrap .panelItem .panelName {
        flex: 1;
        padding-left: 20px;
    }
    .personalWrap .panelListWrap .panelItem .iconfont {
        font-size: 40px;
        color: #ef4454;
    }
    .personalWrap .panelListWrap .panelItem .goNext {
        color: #bfbfbf;
    }

    .personalWrap .inviteCode .copyBtn {
        background: #ff7682;
        /* background: #ef4454; */
        color: #fff;
        border-radius: 10px;
        border: 0;
        padding: 2px 15px;
        height: 41px;
        line-height: 41px;
        text-align: center;
        margin-right: 20px;
    }
</style>
<style>
    .personalWrap .app_head .tit_bar_cont .tit_tit{
        color: #fff;
    }
</style>
