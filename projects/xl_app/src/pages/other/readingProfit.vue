<template>
    <div class="rProfit">
		<eleTit bw="true"></eleTit>
        <!-- <div class="backBtn">
            <i class="iconfont iconfanhui" @click="goBak"></i>
            阅读收益
        </div> -->
        <div class="total">
            <div class="totals" @click="jumpPersonView">
                <p class="font36">{{todayXileCoin}}</p>
                <p class="font24">今日喜乐币收益</p>
            </div>
            <div class="split"></div>
            <div class="totals" @click="jumpPersonView">
                <p class="font36">{{cumulativeIncome}}元</p>
                <p class="font24">我的收益(元)</p>
            </div>
        </div>
        <div class="greySplit"></div>
        <div class="title red">阅读赚金币</div>
        <div class="intro">
            <div class="tips">
                <div class="tipsIcon"><i class="iconfont iconcircle"></i></div>
                <p class="tipsText">阅读种草贴满20s，即可获得<span class="red">20金币</span></p>
            </div>
            <div class="tips">
                <div class="tipsIcon"><i class="iconfont iconcircle"></i></div>
                <p class="tipsText">前往个人中心查看现有金币总量</p>
            </div>
            <div class="tips">
                <div class="tipsIcon"><i class="iconfont iconcircle"></i></div>
                <p class="tipsText">阅读所获金币可兑换<span class="red">额度红包</span>，在喜乐商城成功购买商品，增加<span class="red">返利</span>额度</p>
            </div>
            <img src="../../assets/img/other/toTask.png" alt="" @click="goTask">
        </div>
        <div class="greySplit"></div>
        <div class="title red">什么是额度红包？</div>
        <div class="intro">
            <div class="tips">
                <div class="tipsIcon"><i class="iconfont iconcircle"></i></div>
                <p class="tipsText">商品交易成功后，在原有返利的基础上，使用额度红包进行补贴，提高返利金额</p>
            </div>
        </div>
    </div>
</template>
<script>
import {reqOther} from "../../utils/request";
import eleTit from "@/components/title/title";
export default{
    data(){
        return {
            todayXileCoin: 0,
            cumulativeIncome: 0
        }
    },
    components: {
        eleTit
    },
    created () {
    },
    mounted () {
        this.getInfo();
    },
    methods: {
        jumpPersonView(){
            this.$router.push({name:'personal'})
        },
        // goBak(){
        //     this.$router.go(-1);
        // },
        goTask(){
            this.$router.push("taskCenter");
        },
        getInfo(){
            let params = {
            };
            reqOther.userInfo(params).then(res => {
                console.log(res);
                this.todayXileCoin = res.data.todayXileCoin;
                this.cumulativeIncome = res.data.cumulativeIncome;
            })

        }
    }
}
</script>
<style>
    .rProfit .font36{font-size: 36px;}
    .rProfit .font24{font-size: 24px;}
    .rProfit .red{color: #ff314a}
    .rProfit .iconfanhui{
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 34px;
        font-weight: bold;
        color: #fff
    }
    .rProfit .backBtn{
        position: fixed;
        top: 0;
        height: 80px;
        width: 100vw;
        line-height: 80px;
        text-align: center;
        font-size: 36px;
        color: #fff;
        background: #ef4454

    }
    .rProfit .app_head{
        background: #ef4454;
    }
    .rProfit .total{
        /* margin-top: 80px; */
        display: flex;
        align-items: center;
        background: #ef4454;
        color: #fff;
    }
    .rProfit .totals{
        flex: 1;
        text-align: center;
        padding: 34px 0;
        line-height: 2;
    }
    .rProfit .split{
        border-right: 4px solid rgba(255, 255, 255, 0.6);
        height: 74px;
    }
    .rProfit .greySplit{
        height: 20px;
        background: #f5f5f5
    }
    .rProfit .title{
        font-size: 30px;
        background-image: url("../../assets/img/other/taskTitleBg.png");
        background-size: 100% 54%;
        background-repeat: no-repeat;
        background-position: center;
        margin: 0 auto;
        width: fit-content;
        height: 90px;
        line-height: 90px;
        padding-left: 84px;
        padding-right: 54px;
        position: relative;
        right: 15px;
        font-weight: bold;
    }
    .rProfit .tips{
        font-size: 28px;
        display: flex;
        padding-left: 65px;
        align-items: center;
    }
    .rProfit .intro{
        border-top: 1px solid #F7F7F7;/*no*/
        line-height: 1.5;
        padding-top: 20px;
    }
    .rProfit .tipsIcon{
        margin: 15px 0; 
        margin-right: 20px;
    }
    .rProfit .tipsIcon i{
        height: 16px;
        width: 16px;
        color: #feb20b;
    }
    .rProfit .tipsText{
        width: 560px;
        line-height: 46px;
        color: #666
    }
    .rProfit .intro img{
        display: block;
        width: 97%;
        height: auto;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 5px;
    }
    .rProfit{}
</style>