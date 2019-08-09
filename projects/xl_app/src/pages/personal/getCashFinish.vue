<template>
    <div class="getCashFinishWrap">
		<eleTit hasBothMenu="true">
            <div slot="app_tit_left" @click="cashFinish">
                完成
            </div>
        </eleTit>
        <div class="getCashFinish_request">
            <i class="iconfont iconchenggong finish"></i>
            <p class="sub">提现申请已提交</p>    
            <p class="time">预计到账时间：<span>{{cashTime}}</span></p>
        </div>  
        <div class="getCashFinish_cardCash">
            <div class="card cardCashSty">
                <span class="Text">账户</span>
                <span class="Num bank">{{bindBankName}}&nbsp;&nbsp;{{cardLast}}</span>
            </div>
            <div class="bordersty"></div>
            <div class="cash cardCashSty">
                <span class="Text">金额</span>
                <span class="Num cash">{{drawAmount}}</span>
            </div>
        </div>  
        <button class="getCashFinish_btn jump" @click="cashFinish">完成</button>
    </div>
</template>
<script>
import {reqPersonal} from "../../utils/request";
import eleTit from "@/components/title/title";
import Vue from 'vue';
export default {
    components: {eleTit},
    data() {
        return {
            cashTime: '',
            currentTime: new Date(),
            bindBankName: '',
            cardLast: '****',
            drawAmount: '0'
        }
    },
    created() {
        this.cashTime = this.getTime();
        this.bindBankName = this.$route.query.bindBankName;
        this.cardLast = this.$route.query.cardLast;
        this.drawAmount = this.$route.query.drawAmount;
    },
    mounted() {
    },
    methods: {
        getTime() {
            var mil = new Date().getTime()+24*3600000;
            var myDate = new Date(mil);
            var t = myDate.toLocaleDateString().split('/');
            var ymd = t[0]+'年'+t[1]+'月'+t[2]+'日';        
            var hour = myDate.getHours();
            var min = myDate.getMinutes(); 
            if(min.toString().length==1){
                return ymd+hour+':0'+min;
            }else{
                return ymd+hour+':'+min;
            }
        },
        cashFinish() {
            this.$router.push('/personal');
        }
        
    }    
}
</script>
<style scoped="scoped" type="text/css">
    .getCashFinishWrap {
        /* background: #f4f5f7;
        height: 100vh; */
        text-align: center;
        background: #f4f5f7;
    }

    .getCashFinish_head{
        border: 1px solid transparent;/*no*/
        height: 85px;
        background-color: white;    
        padding-top: 40px; 
        padding-top: constant(safe-area-inset-top);
    }
    .getCashFinish_head .finishtxt{   
        float: left;
        /* padding-left: 1.25rem;
        padding-top: 1.25rem; */
        padding:25px 30px 20px 25px;
        font-size: 36px;
    }
    .getCashFinish_head .addtitle{
        height: 85;
        width: 100%;
        font-size: 36px;
        position: relative; 
    }
    .getCashFinish_head .addtitle p{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .getCashFinish_request{
        background-color: #f4f5f7;
        width: 100%;
        height: 500px;
        border: 1px solid transparent;/*no*/
    }
    .getCashFinish_request .finish{
        font-size: 156px;
        color: rgb(1, 204, 63);
        display: block;
        margin-top: 144px;
    }
    .getCashFinish_request .sub{
        font-size: 38px;
        margin-top: 32px;
    }
    .getCashFinish_request .time{
        color: rgb(150, 149, 149);
        font-size: 32px;
        margin-top: 30px;

    }
    .getCashFinish_request .time span{
        color:#555;
    }
    .getCashFinish_cardCash{
        height: 190px;
        width: 100%;
        font-size: 28px;
        background-color: white;
    }
    .getCashFinish_cardCash .bordersty{
        border-top: 1px solid rgb(231, 231, 231);/*no*/
        width: 90%;
        margin: 0 auto;
    }
    .getCashFinish_cardCash .cardCashSty{
        height: 95px;
        width: 100%;
        position: relative;
    }
    .getCashFinish_cardCash .cardCashSty .Text{
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
    }
    .getCashFinish_cardCash .cardCashSty .Num{
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
        color: rgb(153, 153, 153);
    }
    .getCashFinish_btn{
        height: 82px;
        width: calc(100% - 50px);
        margin-top: 80px;
        background-color: rgb(239, 68, 84);
        border-radius: 25px;/*no*/
        border: none;
        color: white;
        font-size: 40px;
    }
    
</style>
<style>
    .getCashFinishWrap .app_head .tit_side {
        font-size: 34px;
    }
</style>
