<template>
    <div class="bankCcardManagementWrap">
		<eleTit bak="true"></eleTit>
        <div class="bankCcardManagement">
            <!-- <div class="banner">
                <div class="contentBox fix">
                    <a class="iconfont l" href="javascript:;" id="backBtns">&#xe632;</a>
                    <span class="titles">提现管理</span>
                    <a href="javascript:;" class="r" id="settingBtn">设置</a>
                    <a href="javascript:;" class="r" id="CleansettingBtn">取消</a>
                </div>
            </div>    -->
            <div class="mainContents" v-show="listBank && listBank.length < 1">
                <ul class="listBank">
                    <li @click="addBank">
                        <div class="bankBg fix" id="notBanks">
                            <span class="bank-span">尚无收款账户</span>
                            <br>
                            <span class="bank-message">尚未添加收款账户，请点击添加</span>     
                        </div>    
                    </li>
                </ul>
            </div>    
            <div class="bankListWrap" v-show="listBank && listBank.length > 0">
                <ul class="bankList">
                    <li v-for="(item,index) in listBank" :key="index" @click="chooseBank(item)">
                        <div class="bankInfo">
                            <span>{{item.bankName}}</span>
                            <span>{{item.fuzzyBankCode}}</span>
                        </div>
                        <span class="iconfont iconduihao bankSelected" v-show="selectBank.id == item.id"></span>
                        <span v-show="selectBankid !== item.id"></span>
                    </li>
                </ul>
                <div id="addBank" @click="addBank">
                    <span class="iconfont icontubiaozhizuomoban_jia"></span><a>添加收款方式</a>
                </div>
            </div>
            <div class="passWordAltesViewBox"></div>
        </div>
    </div>
</template>
<script>
import {reqPersonal} from "../../utils/request";
import eleTit from "@/components/title/title";
import Vue from 'vue';
import { Indicator } from 'mint-ui';
export default {
    components: {eleTit},
    data() {
        return {
            listBank: null,
            selectBank: {}
        }
    },
    created() {
        Indicator.open();
        this.getUserBankList();
    },
    mounted() {
    },
    methods: {
        // 选择提现方式
        chooseBank(item) {
            this.selectBank = item;
            this.$router.push({path:'/myPurseWithdraw',query:{bank: JSON.stringify(this.selectBank)}});
        },
        // 添加收款方式
        addBank() {
            // 跳转添加收款方式
            this.$router.push('/addAccountPersonal')
        },
        // 获取用户银行卡列表
        getUserBankList() {
            let params = {};
            reqPersonal.userBankList(params).then((res)=>{
                Indicator.close();
                if(res.code == 200) {
                    this.listBank = res.data;
                } else {
                    this.$toast(res.msg ? res.msg : "数据出错了")
                }
            })
        }
    }    
}
</script>
<style scoped="scoped" type="text/css">
    .bankCcardManagementWrap {
        background: #f4f5f7;
        height: 100vh;
    }
    .bankCcardManagement .banner{
        background-color: #fff;
        height: 60px;
        width: 100%;
        padding: 0 10px;
        padding-top: 20px;
        padding-top: constant(safe-area-inset-top);
        text-align: center;

    }
    .bankCcardManagement em{
        padding-top: 5px;
        display: inline-block;
    }
    .bankCcardManagement .titles{
        display: inline-block;
        font-family:"Microsoft YaHei";
        font-size: 18px;
    }
    .bankCcardManagement .banner a{
        display: inline-block;
        font-family:"Microsoft YaHei";
        font-size: 18px;
        color: #797979;

    }
    .bankCcardManagement .banner #backBtns{
        padding-right: 20px;
    }
    .bankCcardManagement .banner .contentBox{
        padding-top: 5px;
    }

    .bankCcardManagement .mainContents li{
        padding-top: 10px;
    }

    .bankCcardManagement .mainContents{
        display: block;
        font-family: "Microsoft YaHei";
        color: #fff;
        padding: 30px;
    }
    .bankCcardManagement  #addBank{
        font-size: 28px;
        display: block;
        padding: 30px;
        border-bottom: 1px solid #ccc;/*no*/
        color: #666;
    }   
    #addBank a{
        display: inline-block;
        margin-left: 8px;
        color: #666;
    }
    .bankCcardManagement .bankBg{
        margin:0 auto;
        width:100%;
        color: #fff;
        text-align: left;
        border-radius: 7px;
        padding: 10px 0;
        background:-webkit-linear-gradient(left,#ff7b62,#ef4454);/* Safari 5.1 - 6.0 */
        background:-o-linear-gradient(right,#ff7b62,#ef4454);/* Opera 11.1 - 12.0 */
        background:-moz-linear-gradient(right,#ff7b62,#ef4454);/* Firefox 3.6 - 15 */
        background:linear-gradient(to right,#ff7b62,#ef4454);/* 标准*/
    }
    .bankCcardManagement .bank-span{
        font-family: "Microsoft YaHei";
        font-size: 36px;
        padding-top: 5px;
        color: #fff;
        text-align: left;
        line-height: 110px;
        margin-left: 40px;
    }
    .bankCcardManagement .bank-message{
        font-family: "Microsoft YaHei";
        font-size: 30px;
        color: #fff;
        text-align: left;
        line-height: 110px;
        margin-left: 40px;
    
    }
    .bankCcardManagement .not-bankImg{
        float: left;
        padding-top: 2%;
        padding-left: 15px;
    }
    .bankCcardManagement .ban-default{
        font-size: 15px;
        color: #fff;
        font-family: "Microsoft YaHei";
        float: right;
        padding-right: 20px;
        padding-top: 16px;
    }
    .bankCcardManagement .bank-Numer{
        padding-left: 20px;
        display: inline-block;
        color: #fff;
        vertical-align: -webkit-baseline-middle;
    }
    .bankCcardManagement .bank-overNum{
        margin-left: 6px;
    }

    .bankCcardManagement  .unbindBank{
        font-size: 15px;
        color: #fff;
        font-family: "Microsoft YaHei";
        float: right;
        padding-right: 20px;
        padding-top: 16px;
    }
    .bankCcardManagement .passWordAltesViewBox{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: none;
    }
    /* 有银行卡时 */
    .bankCcardManagement .bankListWrap{
        padding-top: 30px;
    }
    .bankCcardManagement .bankListWrap li{
        background: #fff;
        border-bottom: 1px solid #ccc;/*no*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #666;
        padding: 20px 30px;
    }
    .bankCcardManagement .bankListWrap li .bankInfo{
        display: flex;
        flex-direction: column;
        line-height: 1.8;
        font-size: 28px;
        flex: 1;
    }
    .bankCcardManagement .bankListWrap li .bankSelected{
        color: #ef4454;
        font-size: 60px;
    }
</style>
