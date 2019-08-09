<template>
    <div class="chooseBankWrap">
		<eleTit bak="true"></eleTit>
        <div class="person-unt_box">
            <div class="person-unt_type">
                <label for="personUntType" class="type-title">收款方式</label>
                <input type="text" id="personUntType" disabled="true" v-model="selectedData.text" >
                <label class="type-icon">
                    <i class="iconfont cur-pointer" @click="toShow()" id="typeIcon" style="font-size: 16px; color: #000;">&#xe616;</i>
                </label>
            </div>
            <div class="person-unt_number">
                <label for="personUntNumber" class="number-title">账号</label>
                <input type="text" id="personUntNumber" class="" placeholder="请输入账号" v-model="bankAccount">
                <label class="number-icon">
                    <i class="iconfont cur-pointer" @click="clearCon()" id="numberIcon" style="font-size: 16px; color: red">&#xe75d;</i>
                </label>
            </div>
        </div>
        <div class="person-unt_box">
            <div class="person-unt_name">
                <label for="personName" class="name-title">真实姓名</label>
                <input type="text" id="personName" class="" v-model="realUserName">
            </div>
        </div>

        <div class="person-btn_box">
            <button type="button" class="unt-btn" @click="addBank">确认添加</button>
        </div>

        <div class="person-help_box">
            <p class="help_title">温馨提示:</p>
            <p>1. 请填写正确的账号和真实的收款人姓名。</p>
            <p>2. 为了保证资金能正常到账，请使用本人账号和本人真实姓名。</p>
            <p>3. 收款方式为支付宝、银行卡时，预计到账为24小时。</p>
        </div>
        <div>
            <vue-pickers :show="show"
                :columns="columns"
                :defaultData="defaultData"
                :selectData="pickData"
                @cancel="close"
                @confirm="confirmFn">
            </vue-pickers>
        </div>
    </div>
    

</template>
<script>
import {reqPersonal} from "../../utils/request";
import eleTit from "@/components/title/title";
import vuePickers from "@/components/pickers/vue-pickers";
import Vue from 'vue';
// import { Toast, Picker } from 'mint-ui';
// import vuePickers from '../../../node_modules/vue-pickers'
export default {
    components: {eleTit, Vue, vuePickers},
    data() {
        return {
            show: false,
            columns: 1,
            realUserName: '',
            bankAccount: '',
            defaultData: [],
            selectedData: {
                text: '',
                value: ''
            },
            pickData: {
                // 第一列的数据结构
                data1: [
                
                ]
            },
            query: {}
        }
    },
    created() {
        this.query = this.$route.query;
        this.getBankList();
    },
    mounted() {
    },
    methods: {
        clearCon: function (e) {
            let _this = this;
            let untNumber = document.getElementById('personUntNumber');
            untNumber.value="";
            untNumber.focus();
        },
        close() {
            this.show = false
        },
        confirmFn(val) {
            this.show = false;
            this.selectedData = val.select1 ? val.select1 : this.defaultData[0];
            this.defaultData = [val.select1]
        },
        toShow() {
            this.show = true
        },
        addBank() {
            let params = {};
            params.realUserName = this.realUserName;
            params.bankId = this.selectedData.value;
            params.bankAccount = this.bankAccount;
            reqPersonal.addBank(params).then((res)=>{
                if(res.code == 200) {
                    if(this.query.type && this.query.type == 'setting') {
                        this.$router.push('/bankCardList');
                    } else {
                        this.$router.push('/bankCardManagement');
                    }
                } else{
                    this.$toast(res.msg)
                }
            })
            
        },
        // 获取可选择的银行卡
        getBankList() {
            let params = {};
            reqPersonal.bankList(params).then((res)=>{
                if(res.code == 200) {
                    this.pickData.data1 = res.data;
                    this.pickData.data1.map((item)=> {
                        item.text = item.name;
                        item.value = item.id;
                    })
                }
            })
        }
    },
}
</script>
<style scoped="scoped" type="text/css">
    .chooseBankWrap {
        background: #f4f5f7;
        height: 100vh;
    }
    .app_head {
        background-color: #fff;
    }

    /* flex 布局方式重写 */
    .person-unt_box {
        width: auto;
        height: auto;
        margin-top: 30px;
        padding: 0 30px;
        background-color: #fff;
    }

    .person-unt_type,
    .person-unt_number,
    .person-unt_name {
        display: flex;
        display: -webkit-flex;
        padding: 26px 0;
    }

    .person-unt_type {
        border-bottom: #f4f5f7 solid 2px;
    }

    .person-unt_type .type-title,
    .person-unt_number .number-title,
    .person-unt_name .name-title {
        width: 150px;
        height: 46px;
        font-size: 30px;
        text-align: justify;
        text-align-last: justify;
        line-height: 46px;
        padding-right: 20px;
        color:#000;
        overflow: hidden;
    }

    .person-unt_type input,
    .person-unt_number input,
    .person-unt_name input {
        width: 600px;
        font-size: 30px;
        color: #8e8e8e

    }

    .person-unt_number input:focus,
    .person-unt_name input:focus {
        border-bottom: #f4f5f7 solid 1px;
    }
    .person-btn_box{
        margin-top: 80px;
    }

    .unt-btn{
        display: block;
        width: 80%;
        margin: 0 auto;
        height: 80px;
        border: 0;
        background: #ef4454;
        border-radius: 40px;
        color: #fff;
        font-size: 32px;
        line-height: 80px;
        /* opacity: 0.5; */
    }
    .unt-btn:focus{
        outline: none;
    }

    .person-help_box {
        width: 85%;
        margin: 50px auto 0 auto;
        
    }

    .person-help_box p{
        text-align: left;
        padding: 0;
        line-height: 50px;
        font-size: 30px;
        color: #918e8e;
        margin: 0;
    }

    .person-help_box .help_title {
        padding-bottom: 20px;
        color: #f15050;
        font-weight: bold;
        font-size: 34px;
    }

    /* 原子级样式 */
    .cur-pointer {
        cursor: pointer;
    }
   .person-unt_box input:disabled, textarea:disabled {
        color: #000000;
    }


</style>
