<template>
    <div class="getCash">
        <backBtn :pageName="pageName" :type="type"></backBtn>
        <div class="detail">
            <div class="detailCell">
                <span>到账支付宝</span>
                <input type="text" :value="alipay" disabled="disabled">
                <span @click="editAlipay" class="editBtn">修改</span>
            </div>
            <div class="detailCell">
                <span>真实姓名</span>
                <input type="text" :value="realName" disabled="disabled">
            </div>
            <div class="detailCell">
                <span>提现金额</span>
                <input type="number" placeholder="请输入提现金额" v-model="withdrawAmount" @input="checkNum">
                <span @click="fullAmount" class="allBtn">全部</span>
            </div>
            <div class="detailText">
                <span>可提现金额&nbsp;¥&nbsp;{{userBalance_access}}</span>
                <span>最低提现金额&nbsp;¥&nbsp;1</span>
            </div>
        </div>
        <button @click="submitBtn">提交</button>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import {userInfo, withdraw} from "@/api/index";
export default {
    data(){
        return {
            pageName: '提现',
            type: 'personalCenter',
            userBalance_access: 0,
            alipay: "",
            realName: "",
            withdrawAmount: ""
        }
    },
    components:{
        backBtn
    },
    created () {
         this.getInfo()
    },
    methods: {
        getInfo(){
            userInfo().then(res=>{
                if(res.code == 200){
                    var data = typeof(res.data) === 'string'?JSON.parse(res.data):res.data;
                    this.userBalance_access = data.userBalance_access;
                    this.alipay = data.alipay;
                    this.realName = data.realName;
                    console.log(data.userBalance_access)
                }else{
                    console.log(res.msg)
                }
            })
        },
        // 提交
        submitBtn(){
            console.log('submit', this.withdrawAmount)
            if(this.withdrawAmount <= 1){
                this.$toast("提现金额需大于1元");
                return
            }
            withdraw().then(data => {
                if(data.code == 200){
                    this.$toast("提现成功")
                }else{
                    this.$toast("提现失败")
                    console.log(data.msg)
                }
            })
        },
        // 跳转修改支付宝页面
        editAlipay(){
            this.$router.push("/bindAlipay")
        },
        // 全部提现
        fullAmount(){
            this.withdrawAmount = this.userBalance_access
        },
        checkNum(){
            if(this.withdrawAmount > this.userBalance_access){
                this.$toast("提现金额不能超过余额");
                this.withdrawAmount = this.userBalance_access;
            }
        }
    },
}
</script>
<style>
    .getCash input{  
        background:none;  
        outline:none;  
        border:0px;
        width: 4rem;
        font-size: 0.28rem
    }
    .getCash input::-webkit-input-placeholder {
        color: #c7c7c7;
    }

    .getCash input::-moz-placeholder {
        color: #c7c7c7;
    }

    .getCash input:-ms-input-placeholder {
        color: #c7c7c7;
    }
    .getCash .detail{
        font-size: 0.28rem
    }
    .getCash .detailCell{
        height: 0.88rem;
        border-bottom: 1px solid #f2f2f2;
        width: 6.8rem;
        margin: 0 auto;
        text-align: left;
        display: flex;
        align-items: center;
        position: relative;
    }
    .getCash .detailCell span{
        width: 1.55rem;
        display: inline-block
    }
    .getCash .detailCell .editBtn{
        height: 0.44rem;
        width: 0.9rem;
        color: #3289ff;
        border: 1px solid #3289ff;
        border-radius: 0.22rem;
        text-align: center;
        position: absolute;
        right: 0;
    }
    .getCash .detailCell .allBtn{
        color: #3289ff;
        border: 1px solid #fff;
        width: 0.9rem;
        height: 0.44rem;
        position: absolute;
        right: 0;
        text-align: center
    }
    .getCash .detailText{
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0.34rem;
        color: #f84634;
        font-size: 0.24rem
    }
    .getCash button{
        outline: none;
        margin-top: 0.9rem;
        width: 6rem;
        height: 0.72rem;
        color: #fff;
        background: #3289ff;
        border-radius: 0.36rem;
        border: none

    }
    .getCash{}
    .getCash{}
    .getCash{}
    .getCash{}
    .getCash{}
    .getCash{}
    .getCash{}
    .getCash{}
    .getCash{}
    .getCash{}
    .getCash{}
</style>