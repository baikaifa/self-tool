<template>
    <div class="myPurseWithdrawWrap">
		<eleTit bak="true"></eleTit>
        <div class="myPurseWithdraw">
            <div class="myPurseWithdraw-con">
                <div class="myPurseWithdraw-card" @click="chooseBank">
                    <div class="myPurseWithdraw-msg">
                        <p class="cardName" id="cardNameOne">{{selectedBank.bankName}}</p>
                        <p class="cardNum"><span id="cardNumLast">{{selectedBank.fuzzyBankCode}}</span></p>
                    </div>
                    <div class="myPurseWithdraw-more">
                        <i class="iconfont iconyou"></i>
                    </div>
                </div>
                <div class="myPurseWithdraw-money">
                    <div class="myPurseWithdraw-wd">
                        <p class="moneyTitle">需转账金额</p>
                        <p class="money">
                            <!-- <span>￥</span>  -->
                            <i class="iconfont iconicomoon"></i>
                            <input class="moneyInput" type="number" id="myMoneyNum" placeholder="请输入金额" v-model="myMoneyNum" @input="moneyChangeHandler">
                        </p>
                    </div>
                    <div class="myPurseWithdraw-errorMsg">
                        <p class="moneyMsg">钱包余额：￥<span id="moneyNum">{{moneyNum}}</span></p>
                        <p class="errorMsg" v-show="errorMessage">金额已超过可提现金额</p>
                    </div>
                </div>
                <div class="myPurseWithdraw-btn">
                    <button id="moneyGo"  @click="moneyGo" :disabled="btnDisabled" :class="btnDisabled ? 'moneyGoDisabled' : ''">提现</button>
                </div>
                <div class="moneyTip">
                    <p class="titleTip">转账规则:</p>
                    <p>1.您可选择微信、支付宝、银行卡收款方式，预计到款时间24小时。</p>
                    <p>2.单笔转账金额最小为1（元）最大为1000（元）。</p>
                    <p>3.APP上线期间暂免银行卡转账手续费。</p>
                </div>
            </div>
        </div>
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
            cardName: '招商银行',
            cardNum: '1234',
            moneyNum: '0',//钱包余额
            myMoneyNum:'',
            errorMessage: false,
            selectedBank: {
                id: '',
                fuzzyBankCode: '',
                bankName: ''
            },
            query: null,
            btnDisabled: false,
        }
    },
    created() {
        this.query = this.$route.query;
        
        if(this.query.bank) {
            this.selectedBank = JSON.parse(this.query.bank);
        } else {
            this.getBankList();
        }
        
        this.getMoneyData();
    },
    mounted() {
    },
    methods: {
        // 选择支付方式
        chooseBank() {
            this.$router.push('/bankCardManageMent')
        },
        // 获取可提现余额
        getMoneyData() {
            let params = {};
            reqPersonal.userBalance(params).then((res)=>{
                if(res.code == 200) {
                    this.moneyNum = (res.data / 100).toFixed(2);
                }
            })
        },
        // 获取银行卡列表
        getBankList() {
            // 默认显示第一项
            let params = {};
            reqPersonal.userBankList(params).then((res)=>{
                if(res.code == 200) {
                    this.selectedBank = res.data[0];
                }
            })
        },
        // 提现
        moneyGo() {
            var myMoney = Number(this.moneyNum);
            var inputMoney = Number(this.myMoneyNum);
            
            if (myMoney < inputMoney) {                
                this.errorMessage = true;
            } else if (isNaN(inputMoney)) {
                this.$toast('请输入金额');
            } else if(inputMoney < 1){
                this.$toast('最小金额为1元');
            }else{
                this.getMoney();
            }
        },
        // 开始提现
        getMoney() {
            // 提现接口-跳转提现成功页面
            let params = {};
            params.drawAmount = this.accMul(this.myMoneyNum,'100');;
            params.bindBankId = this.selectedBank.id;
            this.btnDisabled = true;
            reqPersonal.cashDraw(params).then((res)=>{
                if(res.code == 200 || res.retcode == 200) {
                    this.$router.push({path:'/getCashFinish',query:{bindBankName: this.selectedBank.bankName,cardLast: this.selectedBank.fuzzyBankCode,drawAmount: this.myMoneyNum}});
                } else {
                    this.btnDisabled = false;
                    if(res.msg) {
                        this.$toast(res.msg)
                    } else if(res.result) {
                        this.$toast(res.result)
                    } else {
                        this.$toast("提现失败")
                    }
                }
            })

        },
        // 输入提现金额
        moneyChangeHandler() {
            this.errorMessage = false;
            this.btnDisabled = false;
            this.clearNoNum()
        },
        clearNoNum() {
            this.myMoneyNum = this.myMoneyNum.replace(/[^\d.]/g, "");
            this.myMoneyNum = this.myMoneyNum.replace(/^\./g, "");
            this.myMoneyNum = this.myMoneyNum.replace(/\.{2,}/g, ".");
            this.myMoneyNum = this.myMoneyNum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            this.myMoneyNum = this.myMoneyNum.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        },
        // 金额换算
        accMul(arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try { m += s1.split(".")[1].length } catch (e) { }
            try { m += s2.split(".")[1].length } catch (e) { }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
        }
    }    
}
</script>
<style scoped="scoped" type="text/css">
    .myPurseWithdrawWrap {
        background: #f4f5f7;
        height: 100vh;
    }
    .myPurseWithdraw{
        background:#f2f2f2;
        height: 100%;
        overflow-x: hidden;
    }
    .myPurseWithdraw .myPurseWithdraw-header{
        font-size:36px;
        text-align: center;
        height: 40px;/*no*/
        line-height: 40px;/*no*/
        padding-top: 20px;/*no*/
        padding-top: constant(safe-area-inset-top);
        position: relative;
        background:#fff;
        columns: #343434;
    }
    .myPurseWithdraw .myPurseWithdraw-header .myPurseWithdraw-back{
        position: absolute;
        left:0;
        padding-left:30px;
        padding-right:30px;
    }
    .myPurseWithdraw .myPurseWithdraw-con{
        margin-top:20px;
    }
    .myPurseWithdraw .myPurseWithdraw-con .myPurseWithdraw-card{
        padding: 20px 40px;
        background:#fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .myPurseWithdraw .myPurseWithdraw-card .myPurseWithdraw-msg{
        display: inline-block;
        font-size:28px;
    }
    .myPurseWithdraw .myPurseWithdraw-card .myPurseWithdraw-msg .cardName{
        color:#343434;
    }
    .myPurseWithdraw .myPurseWithdraw-card .myPurseWithdraw-msg .cardNum{
        color: #777777;
        margin-top:15px;
    }
    .myPurseWithdraw .myPurseWithdraw-card .myPurseWithdraw-more .iconfont{
        color:#a5a5a5;
        font-size: 40px;
    }
    .myPurseWithdraw .myPurseWithdraw-con .myPurseWithdraw-money{
        width: 100%;
        margin-top:20px;
        background-color: #fff; 
    }
    .myPurseWithdraw .myPurseWithdraw-money .myPurseWithdraw-wd{
        border-bottom: 1px solid #e7e7e7;/*no*/
        padding: 20px 40px
    }
    .myPurseWithdraw .myPurseWithdraw-money .myPurseWithdraw-wd .moneyTitle{
        font-size: 28px;
    }
    .myPurseWithdraw .myPurseWithdraw-money .myPurseWithdraw-wd .money{
        font-size: 84px;
        margin-top:36px;
    }
    .myPurseWithdraw .myPurseWithdraw-money .myPurseWithdraw-wd .money .iconfont{
        font-size: 60px;
    }
    .myPurseWithdraw .myPurseWithdraw-money .myPurseWithdraw-errorMsg{
        line-height: 80px;
        font-size: 26px;
        margin-left: 30px;
    }
    .myPurseWithdraw .myPurseWithdraw-money .myPurseWithdraw-errorMsg .moneyMsg{
        color: #777777;
    }
    .myPurseWithdraw .myPurseWithdraw-money .myPurseWithdraw-errorMsg .errorMsg{
        color: #ef4454;
    }
    .myPurseWithdraw .myPurseWithdraw-con .myPurseWithdraw-btn{
        margin-top:20px;
        text-align: center;
    }
    .myPurseWithdraw .myPurseWithdraw-con .myPurseWithdraw-btn button{
        width: calc(100% - 60px);
        height:82px;
        border-radius: 40px;
        font-size:40px;
        background-color: #ef4454;
        color: #fff;
        border: none
    }
    .myPurseWithdraw .myPurseWithdraw-con .myPurseWithdraw-btn button.moneyGoDisabled{
        opacity: .5;
    }
    .myPurseWithdraw .myPurseWithdraw-money .money{
        display: flex;
        align-items: flex-end;
    }
    .myPurseWithdraw .myPurseWithdraw-money .money  #myMoneyNum{
        flex: auto;
        padding-left: 20px;
    }
    .moneyInput{
        border: none;
        font-family: sans-serif;
        font-size: 50px;
    }


    
    .passWordAltesViewBox{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: none;
    }
    .moneyTip{
        padding:0 30px;
        padding-top: 30px;
        margin: 0 auto;
        line-height: 40px;
        color: #a5a5a5;
    }
    .moneyTip p{
        font-size:27px;
    }
    .moneyTip .titleTip{
        font-weight: bold;
        color: #777777;
    }

    .personalIncome-page-tip{
        padding:0 40px;
        padding-top: 64px;
        margin: 0 auto;
        line-height: 40px;
        color: #a5a5a5;
    }
    .personalIncome-page-tip .titleTip{
        font-weight: bold;
        color: #ef4454;
    }
    .personalIncome-page-tip p{
        font-size: 27px;
    }
    #moneyGo:focus {
        outline: none;
    }
</style>
