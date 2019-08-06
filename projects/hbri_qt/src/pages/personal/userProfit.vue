<template>
    <div class="userProfit">
        <div class="pageTop">
            <div class="backBtn">
                <i class="iconfont icon-fanhui" @click="goBack"></i>
                <span>资金管理</span>
            </div>
            <p class="pageTopText_1">¥{{totalBalance}}</p>
            <p class="pageTopText_2">累计结算收益</p>
            <p class="pageTopText_3">账户余额(元): ¥{{userBalance}}</p>
            <mt-navbar v-model="selected">
                <mt-tab-item id="online">线上收益</mt-tab-item>
                <mt-tab-item id="offline">线下收益</mt-tab-item>
            </mt-navbar>
        </div>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="online">
                <div class='onlineDiv'>
                    <div class="forMonth">
                        <div class="forMonthCell">
                            <p>{{thisMonthForecastAmount}}<span>元</span></p>
                            <div>本月预估结算</div>
                        </div>
                        <div class="split"></div>
                        <div class="forMonthCell">
                            <p>{{lastMonthForecastAmount}}<span>元</span></p>
                            <div>上月预估结算</div>
                        </div>
                    </div>
                    <div class="forDay">
                        <div class="day">今日</div>
                        <div class="content">
                            <div class="contentCell">
                                <div class="title">
                                    <img src="../../assets/img/todayOrder.png" alt="">
                                    今日订单
                                </div>
                                <div class="num">{{todayForecastCount}}<span>单</span></div>
                            </div>
                            <div class="split"></div>
                            <div class="contentCell">
                                <div class="title">
                                    <img src="../../assets/img/profitI.png" alt="">
                                    预估收益
                                </div>
                                <div class="num">{{todayForecastAmount}}<span>元</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="forDay">
                        <div class="day">昨日</div>
                        <div class="content">
                            <div class="contentCell">
                                <div class="title">
                                    <img src="../../assets/img/yesterdayOrder.png" alt="">
                                    昨日订单
                                </div>
                                <div class="num">{{yesterdayForecastCount}}<span>单</span></div>
                            </div>
                            <div class="split"></div>
                            <div class="contentCell">
                                <div class="title">
                                    <img src="../../assets/img/profitI.png" alt="">
                                    预估收益
                                </div>
                                <div class="num">{{yesterdayForecastAmount}}<span>元</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="detail" @click="jumpToBudget">
                        <span>收支明细</span>
                        <i class="iconfont icon-next"></i>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="offline">
                <div class='offlineDiv'>
                    <div class="forDay" style="margin-top: 0">
                        <div class="day">今日收入</div>
                        <div class="content">
                            <div class="contentCell">
                                <div class="title">
                                    <img src="../../assets/img/todayOrder.png" alt="">
                                    今日订单
                                </div>
                                <div class="num">{{todayXxOrderCount}}<span>单</span></div>
                            </div>
                            <div class="split"></div>
                            <div class="contentCell">
                                <div class="title">
                                    <img src="../../assets/img/profitGet.png" alt="">
                                    已获得收益
                                </div>
                                <div class="num">{{todayXxAmount}}<span>元</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="forDay">
                        <div class="day">本月收入</div>
                        <div class="content">
                            <div class="contentCell">
                                <div class="title">
                                    <img src="../../assets/img/monthOrder.png" alt="">
                                    本月订单
                                </div>
                                <div class="num">{{monthXxOrderCount}}<span>单</span></div>
                            </div>
                            <div class="split"></div>
                            <div class="contentCell">
                                <div class="title">
                                    <img src="../../assets/img/profitGet.png" alt="">
                                    已获得收益
                                </div>
                                <div class="num">{{monthXxAmount}}<span>元</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
import {userProfit} from "@/api/index";
export default {
    data(){
        return {
            selected: 'online',
            totalBalance: 0, // 累计结算收益
            userBalance: 0, // 用户余额
            // 线上收益
            thisMonthForecastAmount: 0, // 本月预估结算
            lastMonthForecastAmount: 0, // 上月预估结算
            todayForecastCount: 0, // 今日订单
            todayForecastAmount: 0, // 今日预估收益
            yesterdayForecastCount: 0, // 昨日订单
            yesterdayForecastAmount: 0, // 昨日预估收益
            todayXxOrderCount: 0, //今日线下订单
            todayXxAmount: 0, //今日线下收益
            monthXxOrderCount: 0, //本月线下订单数
            monthXxAmount: 0, //本月线下收益
        }
    },
    components:{
        
    },
    created () {
        this.getOnlineInfo()
    },
    methods: {
        jumpToBudget(){
            this.$router.push({name:'incomeDetail',params:{type:'userProfit'}});
        },
        goBack(){
            //this.$router.go(-1);
             this.$router.push('/personalCenter');
        },
        // 线上收益
        getOnlineInfo(){
            userProfit().then(res=>{
                if(res.code == 200){
                    var data = typeof(res.data) === 'string'?JSON.parse(res.data):res.data;
                    console.log(data);
                    this.totalBalance = data.totalBalance;
                    this.userBalance = data.userBalance;
                    this.thisMonthForecastAmount = data.thisMonthForecastAmount;
                    this.lastMonthForecastAmount = data.lastMonthForecastAmount;
                    this.todayForecastCount = data.todayForecastCount;
                    this.todayForecastAmount = data.todayForecastAmount;
                    this.yesterdayForecastCount = data.yesterdayForecastCount;
                    this.yesterdayForecastAmount = data.yesterdayForecastAmount;
                }else{
                    console.log(res.msg)
                }
            })
        },
        getOfflineInfo(){}
    },
    watch: {
        'selected': {
            handler() {
                switch (this.selected) {
                    case 'online': // 线上
                        console.log('online')
                        this.getOnlineInfo()
                        break
                    case 'offline': // 线下
                        console.log('offline')
                        this.getOfflineInfo()
                        break
                }
            }
        }
    }
}
</script>
<style>
    #app .userProfit{
        margin-top: -0.8rem
    }
    .userProfit .pageTop{
        width: 100%;
        height: 4.54rem;
        background-image: url("../../assets/img/accountBg_02.png");
        background-size: 100%;
        color: #fff;
        position: relative;
    }
    .userProfit .backBtn{
        height: 0.8rem;
        display: flex;
        align-items: center;
        padding-left: 0.24rem;
        position: relative;
    }
    .userProfit .backBtn i{
        font-size: 0.32rem
    }
    .userProfit .backBtn span{
        font-size: 0.36rem;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .userProfit .pageTop .mint-navbar{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.86rem;
        background: rgba(0, 0, 0, 0.1);
        
    }
    .userProfit .pageTop .mint-navbar .mint-tab-item{
        width: 50%
    }
    .userProfit .pageTop .mint-navbar .mint-tab-item .mint-tab-item-label{
        font-size: 0.28rem;
        color: #fff;
    }
    .userProfit .pageTop .mint-navbar .mint-tab-item.is-selected{
        font-size: 0.28rem;
        color: #fff;
        background: rgba(255, 255, 255, 0.3);
        border: none
    }
    .userProfit .pageTopText_1{
        margin-top: 0.65rem;
        font-size: 0.6rem
    }
    .userProfit .pageTopText_2{
        margin-top: 0.1rem;
        font-size: 0.28rem;
        opacity: 0.5;
    }
    .userProfit .pageTopText_3{
        margin-top: 0.15rem;
        font-size: 0.28rem
    }
    .userProfit .forMonth{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2rem;
        background: #fff
    }
    .userProfit .forMonth .split{
        height: 0.76rem;
        border-right: 1px solid #ebebeb
    }
    .userProfit .forMonthCell{
        width: 50%;
        font-size: 0.28rem;
        color: #666666
    }
    .userProfit .forMonthCell p{
        color: #ff902c;
        font-size: 0.36rem
    }
    .userProfit .forMonthCell span{
        font-size: 0.24rem
    }
    .userProfit .forDay{
        background: #fff;
        margin-top: 0.2rem;
        height: 2.2rem;
    }
    .userProfit .forDay .day{
        height: 0.9rem;
        border-bottom: 1px solid #efefef;
        line-height: 0.9rem;
        text-align: left;
        padding-left: 0.26rem
    }
    .userProfit .forDay .content{
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .userProfit .forDay .content .split{
        height: 0.74rem;
        border-right: 1px solid #ebebeb
    }
    .userProfit .contentCell{
        width: 50%;
        padding-top: 0.18rem
    }
    .userProfit .title{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.28rem
    }
    .userProfit .title>img{
        width: 0.42rem;
        height: 0.44rem;
        margin-right: 0.1rem;
    }
    .userProfit .contentCell .num{
        font-size: 0.36rem
    }
    .userProfit .contentCell .num span{
        font-size: 0.24rem
    }
    .userProfit .detail{
        margin-top: 0.2rem;
        height: 0.9rem;
        background: #fff;
        font-size: 0.32rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 0.3rem;
        padding-right: 0.18rem
    }
    .userProfit{}
    .userProfit{}
    .userProfit{}
    .userProfit{}
    .userProfit{}
    .userProfit{}
    .userProfit{}
    .userProfit{}
    .userProfit{}
    .userProfit{}
    .userProfit{}
    .userProfit{}
</style>