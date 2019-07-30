<template>
    <div class="personalWrap">
		<eleTit>
            <slot name="app_tit_left">&nbsp;</slot>
            <slot name="app_tit_righ">
                <div class="iconWrap">
                    <span class="iconfont iconbangzhu" @click="goHelp"></span>
                    <span class="icon iconfont iconshezhi" @click="goToSetting"></span>
                </div>
            </slot>
           
        </eleTit>
        <!-- <div class="personalHeader">
            <span class="title">个人中心</span>
            <div class="iconWrap">
                <span class="iconfont iconbangzhu" @click="goHelp"></span>
                <span class="icon iconfont iconshezhi" @click="goToSetting"></span>
            </div>
        </div> -->
        <div class="personalContent">
            <div class="userInfoWrap">
                <img :src="userInfo.avatar" alt="" class="userAvatar">
                <div class="userInfo">
                    <span class="userName">{{userInfo.nickname}}</span>
                    <ul class="personalInfo">
                        <li @click="goToWorks">
                            <div class="numInfo">
                                <span>{{userInfo.topicNum}}</span>
                                <!-- <span class="titleIcon"></span> -->
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
                <button class="btnIncome">可提现{{userInfo.freeWithdraw}}<span class="iconfont iconbofang"></span></button>
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
import {reqPersonal} from "../../utils/request";
import defaultAvatar from '../../assets/img/personal/avatar.png';
import eleTit from "@/components/title/title";
export default {
    components: {eleTit},
    data() {
        return {
            token: '',
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
                    icon: 'iconfont iconwx',
                    name: '微信绑定',
                    type: 'weixin'
                },
                {
                    icon: 'iconfont iconkf',
                    name: '联系客服',
                    type: 'kefu'
                },
            ]
        }
    },
    created() {
        this.token = 'b389494d1530103054faacb890973eef3bf23bbea84523e84838fd0915ecb98d';
        this.getUserInfo();
    },
    mounted() {
    },
    methods: {
        getUserInfo() {
            let params = {
                token: this.token
            }
            reqPersonal.userMessage(params).then(res=>{
                if(res.code == 200) {
                    this.userInfo = res.data;
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
            this.$router.push({path:'/posterHomePage',query:{id: this.userInfo.userId}})
        },
        // 关注
        goToFollow() {

        },
        // 粉丝
        goToFuns() {

        },
        // 收藏
        goToCollect() {
        },
        // 累计收益
        goIncomePage(type) {
            this.$router.push({path:'/income',query:{tag: type,enZhid: this.token}})
        },
        // 喜乐币跳至收益细则
        goXlCoin() {
            this.$router.push({path:'/incomeDetail'})
        },
        goContentType(type){
            if(type == 'renwu') {
                this.$router.push('/taskCenter')
            }
            if(type == 'fabu') {

            }
            if(type == 'weixin') {
                let params = {
                    token: this.token
                }
                reqPersonal.wxBind(params).then((res)=>{
                    if(res.code == 200) {
                        if(res.data.wxNumber !== '') {
                            this.$router.push('/wxIsBind')
                        } else {
                            this.$router.push('/wxBind')
                        }
                    }
                })
                
            }
            if(type == 'kefu') {
                this.$router.push('/contactCustomerService')
            }
        }
    }    
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
    /* .personalWrap .app_head .tit_bar .tit_tit{
        color: #fff;
    } */
    .personalWrap  .personalContent {
        padding: 20px 40px 250px 40px;
        background: url("../../assets/img/personal/personalHeader.png") no-repeat;
        background-size: cover;
    }
    .personalWrap .iconWrap {
        position: absolute;
        top: 0;
        right: 20px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .personalWrap .iconWrap .iconfont {
        color: #fff;
        font-size: 40px;
        margin-left: 20px;
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
        font-size: 24px;
        background: #ecba47;
        border: 0;
        padding: 0 20px;
        height: 36px;
        line-height: 36px;
        border-radius: 30px;
        color: #fff;
        display: flex;
        align-items: center;
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
        font-size: 32px;
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
</style>
<style>
    .personalWrap .app_head .tit_tit{
        color: #fff;
    }
</style>
