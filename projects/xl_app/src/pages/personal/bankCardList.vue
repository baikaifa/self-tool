<template>
    <div class="bankCardListWrap">
		<eleTit hasBothMenu="true">
            <div slot="app_tit_left">
                <div class="tit_side touch side_left"  @click.stop="goBak">
				</div>
            </div>
            <div class="headerRightWrap" slot="app_tit_righ">
                <span @click="goSetting">{{showDelete ? '取消' : '设置'}}</span>
            </div>
        </eleTit>
        <div class="bankCardList">
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
            <div class="bankListWrap">
                <ul class="bankList" v-show="listBank && listBank.length > 0">
                    <li v-for="(item,index) in listBank" :key="index">
                        <div class="bankInfo">
                            <span>{{item.bankName}}</span>
                            <span>{{item.fuzzyBankCode}}</span>
                        </div>
                        <span v-show="showDelete" class="deleteCard" @click="deleteCard(item)">{{(index == 0 && item.id < 0) ? '' : '解除绑定'}}</span>
                    </li>
                </ul>
                <div id="addBank" @click="addBank" v-show="!showDelete">
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
            selectBank: {},
            showDelete: false,
        }
    },
    created() {
        Indicator.open();
        this.getUserBankList();
    },
    mounted() {
    },
    methods: {
        goBak() {
            this.$router.push('/setting')
        },
        // 删除卡
        deleteCard(item) {
            this.selectBank = item;
            let params = {};
            params.bindBankId = item.id;
            reqPersonal.deleteBank(params).then((res)=>{
                if(res.code == 200) {
                    this.$toast('已解除绑定')
                    this.getUserBankList();
                    // this.$router.push('/bankCardManagement');
                } else{
                    this.$toast(res.msg)
                }
            })
            // this.$router.push({path:'/myPurseWithdraw',query:{bank: JSON.stringify(this.selectBank)}});
        },
        // 添加收款方式
        addBank() {
            // 跳转添加收款方式
            this.$router.push({path:'/addAccountPersonal',query:{type:'setting'}})
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
        },
        goSetting() {
            this.showDelete = !this.showDelete;
        }
    }    
}
</script>
<style scoped="scoped" type="text/css">
    .bankCardListWrap {
        background: #3a3c48;
        min-height: 100vh;
    }
    .bankCardList .banner{
        background-color: #fff;
        height: 60px;
        width: 100%;
        padding: 0 10px;
        padding-top: 20px;
        padding-top: constant(safe-area-inset-top);
        text-align: center;

    }
    .bankCardList em{
        padding-top: 5px;
        display: inline-block;
    }
    .bankCardList .titles{
        display: inline-block;
        font-family:"Microsoft YaHei";
        font-size: 18px;
    }
    .bankCardList .banner a{
        display: inline-block;
        font-family:"Microsoft YaHei";
        font-size: 18px;
        color: #797979;

    }
    .bankCardList .banner #backBtns{
        padding-right: 20px;
    }
    .bankCardList .banner .contentBox{
        padding-top: 5px;
    }

    .bankCardList .mainContents li{
        padding-top: 10px;
    }

    .bankCardList .mainContents{
        display: block;
        font-family: "Microsoft YaHei";
        color: #fff;
        padding: 30px;
    }
    .bankCardList  #addBank{
        font-size: 28px;
        display: block;
        padding: 30px 10px;
        border-bottom: 1px solid #666;/*no*/
        color: #fff;
    }   
    .bankCardList  #addBank .iconfont{
        font-size: 32px;
    }   
    #addBank a{
        display: inline-block;
        margin-left: 8px;
        color: #fff;
    }
    .bankCardList .bankBg{
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
    .bankCardList .bank-span{
        font-family: "Microsoft YaHei";
        font-size: 36px;
        padding-top: 5px;
        color: #fff;
        text-align: left;
        line-height: 110px;
        margin-left: 40px;
    }
    .bankCardList .bank-message{
        font-family: "Microsoft YaHei";
        font-size: 30px;
        color: #fff;
        text-align: left;
        line-height: 110px;
        margin-left: 40px;
    
    }
    .bankCardList .not-bankImg{
        float: left;
        padding-top: 2%;
        padding-left: 15px;
    }
    .bankCardList .ban-default{
        font-size: 15px;
        color: #fff;
        font-family: "Microsoft YaHei";
        float: right;
        padding-right: 20px;
        padding-top: 16px;
    }
    .bankCardList .bank-Numer{
        padding-left: 20px;
        display: inline-block;
        color: #fff;
        vertical-align: -webkit-baseline-middle;
    }
    .bankCardList .bank-overNum{
        margin-left: 6px;
    }

    .bankCardList  .unbindBank{
        font-size: 15px;
        color: #fff;
        font-family: "Microsoft YaHei";
        float: right;
        padding-right: 20px;
        padding-top: 16px;
    }
    .bankCardList .passWordAltesViewBox{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: none;
    }
    /* 有银行卡时 */
    .bankCardList .bankListWrap{
        padding: 30px;
    }
    .bankCardList .bankListWrap li{
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        padding: 20px 30px;
        margin-bottom: 20px;
        border-radius: 5px;/*no*/
        background:-webkit-linear-gradient(left,#ff7b62,#ef4454);/* Safari 5.1 - 6.0 */
        background:-o-linear-gradient(right,#ff7b62,#ef4454);/* Opera 11.1 - 12.0 */
        background:-moz-linear-gradient(right,#ff7b62,#ef4454);/* Firefox 3.6 - 15 */
        background:linear-gradient(to right,#ff7b62,#ef4454);/* 标准*/
    }
    .bankCardList .bankListWrap li .bankInfo{
        display: flex;
        flex-direction: column;
        line-height: 1.8;
        font-size: 36px;
        flex: 1;
    }
    .bankCardList .bankListWrap li .deleteCard{
        font-size: 32px;
    }
    .bankCardList .bankListWrap li .bankSelected{
        color: #ef4454;
        font-size: 60px;
    }
</style>
<style>
.bankCardListWrap .app_head,.bankCardListWrap .pc_app_head {
    background: #fff;
}
.bankCardListWrap .headerRightWrap {
    font-size: 36px;
    color: #343434;
}
.bankCardListWrap .app_head .tit_bar_cont  .tit_side.side_left {
    margin-top: 0
}
</style>