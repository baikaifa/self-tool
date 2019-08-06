<template>
    <div class="userBalance">
        <div class="pageTop">
            <div class="backBtn">
                <i class="iconfont icon-fanhui" @click="goBack"></i>
                <span>余额</span>
            </div>
            <div class="balance">
                <div class="balanceNum">{{userBalance}}</div>
                <div class="balanceText">当前余额(元)</div>
            </div>
            <div class="balanceBottom">
                <div class="bottomCell">
                    <div class="balanceNum">{{userBalance_access}}</div>
                    <div class="balanceText">可提现金额<img src="../../assets/img/point.png" alt=""></div>
                </div>
                <div class="split"></div>
                <div class="bottomCell">
                    <div class="balanceNum">{{userBalance_wait}}</div>
                    <div class="balanceText">待提现金额<img src="../../assets/img/point.png" alt=""></div>
                </div>
            </div>
        </div>
        <div class="pageBottom" @click="gotoDetail">
            <div>收益结算明细</div>
            <i class="iconfont icon-next" ></i>
        </div>
    </div>
</template>
<script>
import {userInfo} from "@/api/index";
export default {
    data(){
        return {
            userBalance: 0, // 当前余额
            userBalance_access: 0, // 可提现金额
            userBalance_wait: 0, // 待提现金额
        }
    },
    components:{
        
    },
    created () {
        this.getInfo()
    },
    methods: {
        goBack(){
           // this.$router.go(-1);
             this.$router.push('/personalCenter');
        },
        gotoDetail(){
       
            this.$router.push({
                name:"profitDetail"
            });
        },
        getInfo(){
            userInfo().then(res=>{
                if(res.code == 200){
                    var data = typeof(res.data) === 'string'?JSON.parse(res.data):res.data;
                    this.userBalance = data.userBalance;
                    this.userBalance_access = data.userBalance_access;
                    this.userBalance_wait = data.userBalance_wait;
                    console.log(data)
                }else{
                    console.log(res.msg)
                }
            })
        },
    },
}
</script>
<style>
    .userBalance{
        margin-top:-0.8rem;
    }
    .userBalance .pageTop{
        width: 100%;
        height: 4.54rem;
        background-image: url("../../assets/img/accountBg_02.png");
        background-size: 100%;
        color: #fff
    }
    .userBalance .backBtn{
        height: 0.8rem;
        display: flex;
        align-items: center;
        padding-left: 0.24rem;
        position: relative;
    }
    .userBalance .backBtn i{
        font-size: 0.32rem
    }
    .userBalance .backBtn span{
        font-size: 0.36rem;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .userBalance .balance{
        margin-top: 0.8rem;
    }
    .userBalance .balance .balanceNum{
        font-size: 0.6rem;
    }
    .userBalance .pageTop .balanceText{
        font-size: 0.24rem
    }
    .userBalance .balanceBottom{
        display: flex;
        margin-top: 0.54rem
    }
    .userBalance .balanceBottom .bottomCell{
        width: 50%
    }
    .userBalance .split{
        height: 0.4rem;
        border-right: 1px solid #fff
    }
    .userBalance .balanceText img{
        height: 0.27rem;
        width: 0.27rem;
        position: absolute;
        top: 0.04rem;
        right: 0.92rem;

    }
    .userBalance .balanceText{
        position: relative;
    }
    .userBalance .bottomCell .balanceNum{
        font-size: 0.32rem
    }
    .userBalance .pageBottom{
        margin-top: 0.2rem;
        height: 0.9rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 0.24rem;
        padding-right: 0.18rem;
        background: #fff;
        font-size: 0.32rem
    }
</style>