<template>
    <div class="personalCenter">
        <backBtn pageName="我的">
            <div class="editBtn" slot="rightBtn">
                <i class="iconfont icon-xiaoxi1" @click.stop="toMessage()"></i>
                <i class="iconfont icon-shezhi" @click.stop="toSetting()"></i>
            </div>
        </backBtn>
        <div class="topCard">
            <div class="userInfo">
                <img class='avatar' :src="data.avatar" alt="" @click='gotoSetting'>
                <div class="infos">
                    <div class="nickname">{{data.nickname}}</div>
                    <div class="inviteCode">邀请码: {{data.inviteCode}}
                        <span class="copyText" 
                            v-clipboard:copy="data.inviteCode"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">
                            复制
                        </span>
                    </div>
                </div>
                <div class="cash" @click="getCash">提现</div>
            </div>
            <div class="otherInfo">
                <div class="" @click="gotoFan">
                    <div class="otherNum">{{data.fansNum}}</div>
                    <div class="otherText">粉丝</div>
                </div>
                <div class="">
                    <div class="otherNum" @click.stop="toGrowth()">{{data.userGrowth}}</div>
                    <div class="otherText">成长值</div>
                </div>
                <div class="" @click="userBalance">
                    <div class="otherNum">{{data.userBalance}}</div>
                    <div class="otherText">余额</div>
                </div>
            </div>
        </div>
        <div class="profit">
            <div class="profits" @click="userProfit">
                <div class="profitsNum">¥&nbsp;<span>{{data.monthPredictIncome}}</span></div>
                <div class="profitsText">本月预估</div>
            </div>
            <div class="splitLine"></div>
            <div class="profits" @click="userProfit">
                <div class="profitsNum">¥&nbsp;<span>{{data.todayIncome}}</span></div>
                <div class="profitsText">今日收益</div>
            </div>
        </div>
        <div class="benefit">累计收益<i class="iconfont icon-next" style="color: #c1c0c9" @click="userProfit"></i></div>
        <div class="userRelative">
            <div class="relativeLink" @click="userProfit">
                <img src="../../assets/img/profit.png" alt="">
                <div>收益</div>
            </div>
            <div class="relativeLink" @click="userOrder">
                <img src="../../assets/img/order.png" alt="">
                <div>订单</div>
            </div>
            <div class="relativeLink" @click="userFans">
                <img src="../../assets/img/fans.png" alt="">
                <div>粉丝</div>
            </div>
            <div class="relativeLink" @click="userCollect">
                <img src="../../assets/img/collect.png" alt="">
                <div>收藏</div>
            </div>
        </div>
        <div class="userLevel">
            <div class="levelTitle">
                <div class="level">我的等级<span>LV.{{data.userLevel}}</span></div>
                <div class="rule" @click.stop="toGrowthRule()">成长值规则<img src="../../assets/img/more.png" alt=""></div>
            </div>
            <div class="levelProgress">
                <div class="progressBgd">
                    <div class="progressBar" :style="progressBar">
                        <div class="progressUserNum">
                            <div>{{data.userGrowth}}</div>
                            <img src="../../assets/img/progressP.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="progressNum">
                    <div style="float: left">0</div>
                    <div style="float: right">999</div>
                </div>
            </div>
        </div>
        <div class="otherBtn">
            <div class="otherLink" @click="jumpToInvite">
                <img src="../../assets/img/invite.png" alt="">
                <div>邀请</div>
            </div>
            <div class="otherLink">
                <img src="../../assets/img/lead.png" alt="">
                <div>新手指引</div>
            </div>
            <div class="otherLink">
                <img src="../../assets/img/server.png" alt="">
                <div>联系客服</div>
            </div>
            <div class="otherLink">
            </div>
        </div>
        <bottomBar fromType='3'></bottomBar>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import bottomBar from "@/components/bottomBar";
import {userInfo} from '@/api/index';
import { getLocalData } from "@/utils/store"
export default {
    data(){
        return {
            pageName: '',
            type: '',
            data:{
                "fansNum":0,
                "userLevel":0,
                "monthPredictIncome":0,
                "allInCome":0,
                "inviteCode":"",
                "nickname":"",
                "avatar":"",
                "userBalance":0,
                "userGrowth":0,
                "todayIncome":0,
                "userId":0,
                alipayFlag:0
            },
            progressBar: ''
        }
    },
    created () {
        userInfo().then(res=>{
            if(res.code == 200){
                var data = typeof(res.data) === 'string'?JSON.parse(res.data):res.data;
                console.log(res)
                this.data = data
                this.progressBar = 'width:'+(this.data.userGrowth / 999 *100)+'%'
                // this.progressUserNum = 'padding-left:'+((this.data.userGrowth) / 999 * 6.2 + 0.14)+'rem'
            }else{
                console.log(res.msg)
            }
        })
    },
    components:{
        backBtn,
        bottomBar
    },
    methods: {
        jumpToInvite(){//跳到邀请页面
            this.$router.push({name:'invite',params:{type:'personalCenter'}})
        },
        gotoFan(){
  
            this.$router.push({path:'/myFans'})
        },
        gotoSetting(){
            this.$router.push({path:'/setting'});
        },
        toGrowth(){
            this.$router.push({
                path: '/myGrowth',
                query: {
                    userGrowth: this.data.userGrowth,
                    userLevel: this.data.userLevel
                }
            })
        },
        toGrowthRule(){
            this.$router.push({name:'growthRule',params:{type:'personalCenter'}});
        },
        toMessage(){
            this.$router.push("/incomeNotice")
        },
        toSetting(){
            this.$router.push("/setting")
        },
        onCopy(){
            this.$toast({
                message: "复制成功"
            })
        },
        onError(){
            this.$toast("复制失败")
        },
        getCash(){
            //进行判断，如果没有绑定支付宝账号，跳到绑定支付宝账号
            if(this.data.alipayFlag == 0){
                this.$router.push({
                    path:"/bindAlipay",
                    query: {
                        isBind: "未绑定",
                        type:'personalCenter'
                    }})
            }else{
                this.$router.push("/getCash")
            }      
        },
        userBalance(){
            this.$router.push("/userBalance")
        },
        userProfit(){
            this.$router.push("/userProfit")
        },
        userFans(){
            this.$router.push("/myFans")
        },
        userCollect(){
            this.$router.push("/myCollection")
        },
        userOrder(){
            this.$router.push("/myOrder")
        }
    },
}
</script>
<style>
    .personalCenter{
        background: #f4f6fa;
        /* height: 100vh; */
        padding-bottom: 0.97rem;
        margin-top:0.8rem;
    }
    .personalCenter .topCard{
        width: 100%;
        height: 4.2rem;
        background-image: url('../../assets/img/my.png');
        background-size: 100%;
    }
    .personalCenter .userInfo{
        display: flex;
        padding-top: 0.77rem;
        padding-left: 0.83rem;
        position: relative;
    }
    .personalCenter .avatar{
        width: 1.09rem;
        height: 1.09rem;
        border-radius: 50%
    }
    .personalCenter .cash{
        color: #ca9300;
        font-size: 0.32rem;
        font-weight: bold;
        position: absolute;
        right: 0.4rem;
        top: 0.86rem
    }
    .personalCenter .infos{
        text-align: left;
        margin-left: 0.2rem;
        color: #fff;
        font-size: 0.34rem;
        display: flex;
        flex-direction: column;
        justify-content: center
    }
    .personalCenter .inviteCode{
        font-size: 0.24rem;
        padding-top: 0.1rem;
    }
    .personalCenter .otherInfo>div{
        width: 2.2rem
    }
    .personalCenter .copyText{
        font-size: 0.2rem;
        margin-left: 0.2rem;
        padding: 1px 4px;
        border: 1px solid #fff;
        border-radius: 0.2rem;
    }
    .personalCenter .otherInfo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem 0.3rem;
        color: #fff
    }
    .personalCenter .otherText{
        color: #b3daff;
        font-size: 0.24rem
    }
    .personalCenter .otherNum{
        font-size: 0.4rem;
        font-weight: bold
    }
    .personalCenter .profit{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.87rem;
        height: 1.3rem;
        border-bottom: 1px solid #f2f2f2;
        background: #fff
    }
    .personalCenter .profits{
        width: 2rem
    }
    .personalCenter .profits .profitsNum{
        color: #3289ff;
        font-size: 0.3rem;
        font-weight: bold
    }
    .personalCenter .profits .profitsNum span{
        font-size: 0.4rem
    }
    .personalCenter .profitsText{
        font-size: 0.24rem;
        color: #999999
    }
    .personalCenter .splitLine{
        height: 0.33rem;
        border-right: 0.04rem solid #f2f2f2
    }
    .personalCenter .benefit{
        background: #fff;
        height: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.34rem;
        font-size: 0.28rem
    }
    .personalCenter .userRelative{
        margin-top: 0.18rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        height: 1.5rem;
        padding: 0 0.7rem
    }
    .personalCenter .relativeLink{
        width: 1rem;
        color: #343434;
        font-size: 0.24rem;
    }
    .personalCenter .relativeLink>img{
        width: 0.49rem;
        height: 0.56rem;
    }
    .personalCenter .userLevel{
        background: #fff;
        margin-top: 0.18rem;
        /* height: 1.5rem; */
    }
    .personalCenter .otherBtn{
        background: #fff;
        margin-top: 0.18rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        color: #343434;
        font-size: 0.24rem;
        height: 1.5rem;
    }
    .personalCenter .otherLink{
        width: 25%
    }
    .personalCenter .otherLink>img{
        height: 0.55rem;
    }
    .personalCenter .userLevel{
        padding: 0.2rem 0.32rem;
    }
    .personalCenter .levelTitle{
        display: flex;
        justify-content: space-between
    }
    .personalCenter .level{
        font-size: 0.28rem
    }
    .personalCenter .level span{
        background-image: url('../../assets/img/level.png');
        background-size: 100% 100%;
        font-size: 0.16rem;
        color: #ca9300;
        padding: 0.02rem 0.08rem;
        margin-left: 0.08rem;
    }
    .personalCenter .rule{
        color: #999999;
        font-size: 0.24rem;
        display: flex;
        align-items: center
    }
    .personalCenter .rule img{
        width: 0.26rem;
        height: 0.26rem;
        margin-left: 0.1rem
    }
    .personalCenter .levelProgress{
        padding-top: 0.48rem;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        font-size: 0.24rem;
        color: #a3a2a2
    }
    .personalCenter .progressBgd{
        width: 6.6rem;
        height: 0.1rem;
        background: #ebebeb;
        border-radius: 0.05rem;
    }
    .personalCenter .progressNum{
        width: 6.6rem;
        padding-top: 0.05rem
    }
    .personalCenter .progressBar{
        background: #ffc341;
        height: 0.1rem;
        border-radius: 0.05rem;
        width: 0;
        position: relative;
    }
    .personalCenter .progressBar img{
        width: 0.22rem;
        height: 0.22rem;
    }
    .personalCenter .progressUserNum{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: -0.32rem;
        right: -0.11rem;
    }
    .personalCenter .progressUserNum div{
        height: 0.26rem;
    }
    .personalCenter .editBtn{
        position: absolute;
        right: 0.2rem;
        display: flex;
        align-items: center
    }
    .personalCenter .editBtn .icon-xiaoxi1{
        font-size: 0.4rem;
        margin-right: 0.16rem;
    }
</style>