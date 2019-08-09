<template>
    <div class="editPhone">
        <backBtn :pageName="pageName" :type="type"></backBtn>
        <div v-show="!changePage">
            <div class="bindInfo">
                <div class="phone">
                    <span>原手机号码</span>
                    <input type="text" :value="mobileNumber_show" disabled="disabled">
                </div>
                <div class="code">
                    <span>验证码</span>
                    <input type="text" class="authCodeInput" placeholder="请输入验证码" @input="checkCode" v-model="verifyCode">
                    <button @click="getCode(4, 1)" :disabled="disabled">{{codeText}}</button>
                </div>
            </div>
            <button class="bindBtn" @click="editPhone">
                <span>更换手机号码</span>
            </button>
        </div>
        <div v-show="changePage">
            <div class="bindInfo">
                <div class="phone">
                    <span>新手机号码</span>
                    <input type="text" placeholder="请输入新的手机号码" v-model="mobileNumber" @input="checkPhone">
                </div>
                <div class="code">
                    <span>验证码</span>
                    <input type="text" class="authCodeInput" placeholder="请输入验证码" @input="checkCode" v-model="verifyCode">
                    <button @click="getCode(1, 0)" :disabled="disabled">{{codeText}}</button>
                </div>
            </div>
            <button class="bindBtn" @click="editConfirm">
                <span>确定更换</span>
            </button>
        </div>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import {userInfo, bindMobile, getMsgCode, checkPhoneNum} from "@/api/index";
import {checkCode, checkPhone} from "@/utils/checkReg"; //验证码
import {setLocalData}from "@/utils/store"
export default {
    data(){
        return {
            pageName: '修改手机号',
            type: 'setting',
            mobileNumber_show: "",
            mobileNumber: "",
            verifyCode: "",
            disabled: false,
            codeText: "获取验证码",
            changePage: false,
            inviteCode:''
        }
    },
    components:{
        backBtn
    },
    created () {
        this.inviteCode = this.$route.params.inviteCode;
        console.log(this.inviteCode)
        this.getPhone();
    },
    methods: {
        getPhone(){
            userInfo().then(res=>{
                if(res.code == 200){
                    var data = typeof(res.data) === 'string'?JSON.parse(res.data):res.data;
                    this.mobileNumber_show = data.mobileNumber_show;
                    this.mobileNumber = data.mobileNumber;
                    console.log(data.mobileNumber_show)
                }else{
                    console.log(res.msg)
                }
            })
        },
        getCode(num, login){
            let that = this
            console.log("修改手机, 获取验证码", num)

            let params = {
                mobileNumber: parseInt(this.mobileNumber),
                type: num,//短信模板类型 1 注册登录验证码 2更改密码验证码 3绑定/更换支付宝验证码 4更换手机号验证码
                isLogin: login//默认为0 登录时候为1
            };
            // 获取验证码
            getMsgCode(params).then(data =>{
                if(data.code == 200){
                    that.disabled = true;
                    let time = 60;
                    this.timer= setInterval(() => {
                        --time;
                        if(time == 0){
                            clearInterval(this.timer);
                            that.disabled = false;
                            that.codeText = "获取验证码";
                        }else{
                            that.codeText = time+'s';
                        }
                    }, 1000);
                }else{
                    this.$toast(data.msg);
                }
            })
        },
        checkCode(){
            this.verifyCode = checkCode(this.verifyCode);
        },
        checkPhone(){
            this.mobileNumber = checkPhone(this.mobileNumber);
        },
        editPhone(){
            if(!this.verifyCode){
                this.$toast("请输入验证码");
                return
            }
            let params = {
                mobileNumber: this.mobileNumber,
                verifyCode: this.verifyCode
            }
            checkPhoneNum(params).then(data =>{
                if(data.code == 200){
                    console.log("新手机号");
                    this.changePage = true
                    this.mobileNumber = "",
                    this.verifyCode = "",
                    clearInterval(this.timer);
                    this.disabled = false;
                    this.codeText = "获取验证码";
                }
            })
        },
        editConfirm(){
            let params = {
                mobileNumber: this.mobileNumber,
                verifyCode: this.verifyCode,
                inviteCode:this.inviteCode
            }
            bindMobile(params).then(data => {
                this.$toast({
                    message:"修改成功",
                    duration: 1500
                });
                setTimeout(() => {
                this.$router.push({name:'setting'}) 
                }, 1500);
                setLocalData("hbxj_sid",data.data);
            })

        }
    },
}
</script>
<style>
    .editPhone input{  
        background:none;  
        outline:none;  
        border:0px;
        width: 5rem;
        font-size: 0.28rem;
        color: black;
        -webkit-text-fill-color:#b4b4b4;
        -webkit-opacity:1; 
        opacity: 1;
        line-height: 1.6;
    }
    .editPhone input:disabled{  
       
        background:none;  
        outline:none;  
        border:0px;
        width: 5rem;
        font-size: 0.28rem;
        color: black;
        line-height: 1.6;
    }

    .editPhone input.authCodeInput{
        background:none;  
        outline:none;  
        border:0px;
        width: 5rem;
        font-size: 0.28rem;
        color: black;
         -webkit-text-fill-color:inherit;
        line-height: 1.6;
    }
    .editPhone button{
        background: none;
        border: none;
        outline: none;
    }
    .editPhone .bindInfo{
        padding: 0 0.32rem;
        text-align: left;
        margin-top:0.8rem;
    }
    .editPhone .bindInfo div{
        height: 0.88rem;
        border-bottom: 1px solid #f2f2f2;
        line-height: 0.88rem;
        font-size: 0.28rem
    }
    .editPhone .bindInfo span{
        display: inline-block;
        width: 1.5rem;
    }
    .editPhone input::-webkit-input-placeholder {
        color: #c7c7c7;
    }

    .editPhone input::-moz-placeholder {
        color: #c7c7c7;
    }

    .editPhone input:-ms-input-placeholder {
        color: #c7c7c7;
    }
    .editPhone .code{
        position: relative;
    }
    .editPhone .code button{
        width: 1.78rem;
        height: 0.52rem;
        border: 1px solid #3289ff;
        border-radius: 0.26rem;
        color: #3289ff;
        position: absolute;
        right: 0;
        top: 0.18rem;
    }
    .editPhone .bindBtn{
        margin-top: 1.1rem;
        width: 6rem;
        height: 0.72rem;
        background: #3289ff;
        color: #fff;
        border-radius: 0.36rem;
    }
    .editPhone input::-webkit-input-placeholder {

    color: #b4b4b4;


    }



</style>
