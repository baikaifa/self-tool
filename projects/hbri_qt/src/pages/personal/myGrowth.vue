<template>
    <div class="myGrowth">
        <backBtn :pageName="pageName" :type="type"></backBtn>
        <div class="growth">
            <img src="../../assets/img/medal.png" alt="">
            <div class="growthNum">{{userGrowth}}</div>
            <div>我的成长值</div>
            <!-- 等级 -->
            <div class="userLevel">
                <div class="levelTitle">
                    <div class="level">等级<span>LV.{{userLevel}}</span></div>
                </div>
                <div class="levelProgress">
                    <div class="progressBgd">
                        <div class="progressBar" :style="progressBar">
                            <div class="progressUserNum">
                                <div>{{userGrowth}}</div>
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
        </div>
        <div class="other">
            <div class="promote">
                <div style="color: black;font-size: 0.28rem">如何提升成长值</div>
                <div @click.stop="toGrowthRule()">成长值规则<img src="../../assets/img/more.png" alt=""></div>
            </div>
            <div class="otherImg">
                <div class="others">
                    <img src="../../assets/img/dailyLogin.png" alt="">
                    <div>每日登录</div>
                </div>
                <div class="others">
                    <img src="../../assets/img/inviteFriend.png" alt="">
                    <div>邀请好友</div>
                </div>
                <div class="others">
                    <img src="../../assets/img/orderNum.png" alt="">
                    <div>订单数量</div>
                </div>
            </div>
            <div class="otherImg">
                <div class="others">
                    <img src="../../assets/img/completeName.png" alt="">
                    <div>完善昵称</div>
                </div>
                <div class="others">
                    <img src="../../assets/img/completeAvatar.png" alt="">
                    <div>完善头像</div>
                </div>
                <div class="others">
                    <img src="../../assets/img/bindPhone.png" alt="">
                    <div>绑定手机</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
export default {
    data(){
        return {
            userGrowth: 0,
            userLevel: 0,
            pageName: '我的成长值',
            type: 'personalCenter',
        }
    },
    components:{
        backBtn
    },
    created () {
        var urlQuery = this.$route.query;
        this.userGrowth = urlQuery.userGrowth;//用户成长值
        this.userLevel = urlQuery.userLevel;//用户等级
        this.progressBar = 'width:'+(this.userGrowth / 999 *100)+'%'
        this.progressUserNum = 'padding-left:'+((this.userGrowth) / 999 * 6.2 + 0.14)+'rem'
        console.log(this.userGrowth, this.userLevel)
    },
    methods: {
        toGrowthRule(){
            this.$router.push('/growthRule')
        }
    },
}
</script>
<style>
    .myGrowth{
        height: calc(100vh - 0.8rem);
        width: 100vw;
        background: #f5f5f5
    }
    .myGrowth .userLevel{
        background: #fff;
        margin-top: 0.2rem;
        height: 1.72rem;
        padding: 0.24rem 0.32rem;
    }
    .myGrowth .levelTitle{
        display: flex;
        justify-content: space-between
    }
    .myGrowth .level{
        font-size: 0.28rem
    }
    .myGrowth .level span{
        background-image: url('../../assets/img/level.png');
        background-size: 100% 100%;
        font-size: 0.16rem;
        color: #ca9300;
        padding: 0.02rem 0.08rem;
        margin-left: 0.08rem;
    }
    .myGrowth .rule{
        color: #999999;
        font-size: 0.24rem;
        display: flex;
        align-items: center
    }
    .myGrowth .rule i{
        font-size: 0.2rem
    }
    .myGrowth .levelProgress{
        padding-top: 0.48rem;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        font-size: 0.24rem;
        color: #a3a2a2
    }
    .myGrowth .progressUserNum{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: -0.32rem;
        right: -0.11rem;
    }
    .myGrowth .progressBgd{
        width: 6.6rem;
        height: 0.1rem;
        background: #ebebeb;
        border-radius: 0.05rem;
    }
    .myGrowth .progressBar img{
        width: 0.22rem;
        height: 0.22rem;
    }
    .myGrowth .progressUserNum div{
        height: 0.26rem;
    }
    .myGrowth .progressBar{
        background: #ffc341;
        height: 0.1rem;
        border-radius: 0.05rem;
        width: 0;
        position: relative;
    }
    .myGrowth .progressNum{
        width: 6.6rem;
        font-size: 0.24rem;
        color: #a3a2a2;
        padding-top: 0.08rem
    }
    .myGrowth .growth{
        background: #fff;
        padding-top: 0.54rem;
        font-size: 0.28rem;
        height: 5.92rem;
    }
    .myGrowth .growth>img{
        width: 1.26rem;
        height: 1.72rem;
    }
    .myGrowth .growthNum{
        font-size: 0.8rem;
        font-weight: bold;
        color: #397fff;
        margin-top: 0.2rem;
        height: 1rem;
    }
    .myGrowth .other{
        margin-top: 0.2rem;
        background: #fff;
    }
    .myGrowth .promote{
        height: 0.74rem;
        border-bottom: 1px solid #e2e2e2;
        display: flex;
        padding-left: 0.32rem;
        padding-right: 0.24rem;
        align-items: center;
        justify-content: space-between;
        color: #999999;
        font-size: 0.24rem;
    }
    .myGrowth .promote img{
        width: 0.26rem;
        height: 0.26rem;
        margin-left: 0.1rem
    }
    .myGrowth .promote div{
        display: flex;
        align-items: center
    }
    .myGrowth .otherImg{
        height: 1.87rem;
        display: flex;
        flex-wrap: wrap;
        padding: 0.4rem 0.7rem 0.3rem 0.7rem;
        align-items: center;
        justify-content: space-between;
        font-size: 0.24rem
    }
    .myGrowth .others img{
        width: 0.76rem;
        height: 0.78rem;
    }
</style>