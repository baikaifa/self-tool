<template>
    <div class="bindAlipay">
        <backBtn :pageName="pageName" :type="type"></backBtn>
        <div class="bindInfo">
            <div class="name">
                <span>姓名</span>
                <input type="text" placeholder="请输入支付宝认证的真实姓名" v-model="realName">
            </div>
            <div class="alipay">
                <span>支付宝账号</span>
                <input type="text" placeholder="请输入支付宝账号" v-model="alipayUserId">
            </div>
            <div class="phone">
                <span>手机号</span>
                <input type="text" :value="mobileNumber_show" disabled="disabled" class="phoneNumColor">
            </div>
            <div class="code">
                <span>验证码</span>
                <input type="text" placeholder="请输入验证码" @input="checkCode" v-model="verifyCode">
                <button @click.stop="getCode" :disabled="disabled">{{codeText}}</button>
            </div>
        </div>
        <button class="bindBtn" @click.stop="bindAlipay">
            <!-- 已绑定 -->
            <span v-if="isBind">立即修改</span>
            <!-- 未绑定 -->
            <span v-if="!isBind">立即绑定</span>
        </button>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import {userInfo, getMsgCode, bindAlipay} from "@/api/index";
import {checkCode} from "@/utils/checkReg";
export default {
    data(){
        return {
            pageName: "绑定支付宝",
            type: "",
            isBind: "",
            realName: "",
            alipayUserId: "",
            mobileNumber: "",
            mobileNumber_show: "",
            verifyCode: "",
            codeText: "获取验证码",
            disabled: false
        }
    },
    components:{
        backBtn
    },
    created () {
        this.isBind = this.$route.query.isBind === "未绑定"?false:true;
        this.type = this.$route.query.type;
        console.log(this.isBind)
        this.getPhone()
    },
    methods: {
        getPhone(){
            userInfo().then(res=>{
                if(res.code == 200){
                    var data = typeof(res.data) === 'string'?JSON.parse(res.data):res.data;
                    this.mobileNumber = data.mobileNumber; // 手机号(全)
                    this.mobileNumber_show = data.mobileNumber_show; // 手机号
                    if(this.isBind==true){
                        this.alipayUserId = data.alipay;
                        this.realName = data.realName;
                    }
                    console.log(this.mobileNumber, this.mobileNumber_show)
                }else{
                    console.log(res.msg)
                }
            })
        },
        getCode(){
            let that = this
            console.log("绑定支付宝, 获取验证码")
            if(!that.realName){
                that.$toast("请输入姓名");
                return
            }else if(!that.alipayUserId){
                that.$toast("请输入支付宝账号");
                return
            }
            let params = {
                mobileNumber: parseInt(this.mobileNumber),
                type: 3,//短信模板类型 1 注册登录验证码 2更改密码验证码 3绑定/更换支付宝验证码 4更换手机号验证码
                isLogin: 1//默认为0 登录时候为1
            };
            // 获取验证码
            getMsgCode(params).then(data =>{
                if(data.code == 200){
                    that.disabled = true;
                    let time = 60;
                    let timer= setInterval(() => {
                        --time;
                        if(time == 0){
                            clearInterval(timer);
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
        // 绑定(修改)支付宝
        bindAlipay(){
            if(!this.realName){
                this.$toast("请输入姓名");
                return
            }else if(!this.alipayUserId){
                this.$toast("请输入支付宝账号");
                return
            }else if(!this.verifyCode){
                this.$toast("请输入验证码");
                return
            }
            let params = {
                verifyCode: this.verifyCode,
                realName: this.realName,
                alipayUserId: this.alipayUserId
            }
            let that = this;
            bindAlipay(params).then(data => {
                if(data.code == 200){
                    that.$toast({
                        message:"绑定成功",
                        duration: 1500
                    });
                    setTimeout(function(){
                        that.$router.push('setting')
                    }, 1500)
                }else{
                    that.$toast("绑定失败")
                }
            })
        },
        // 校验验证码
        checkCode(){
            this.verifyCode = checkCode(this.verifyCode);
        },
    },
}
</script>
<style>
    .bindAlipay input{  
        background:none;  
        outline:none;  
        border:0px;
        width: 5rem;
        line-height: 1.6;
    }
    .bindAlipay input:disabled{  
        background:none;  
        outline:none;  
        border:0px;
        width: 5rem;
        color: #000;
        font-size: 0.25rem;
    }
    .bindAlipay button{
        background: none;
        border: none;
        outline: none;
    }
    .bindAlipay .bindInfo{
        padding: 0 0.32rem;
        text-align: left
    }
    .bindAlipay .bindInfo div{
        height: 0.88rem;
        border-bottom: 1px solid #f2f2f2;
        line-height: 0.88rem;
        font-size: 0.28rem
    }
    .bindAlipay .bindInfo span{
        display: inline-block;
        width: 1.5rem;
    }
    .bindAlipay input::-webkit-input-placeholder {
        color: #c7c7c7;
        font-size: 0.28rem;
    }

    .bindAlipay input::-moz-placeholder {
        color: #c7c7c7;
        font-size: 0.28rem;
    }

    .bindAlipay input:-ms-input-placeholder {
        color: #c7c7c7;
        font-size: 0.28rem;
    }
    .bindAlipay .code{
        position: relative;
    }
    .bindAlipay .code button{
        width: 1.78rem;
        height: 0.52rem;
        border: 1px solid #3289ff;
        border-radius: 0.26rem;
        color: #3289ff;
        position: absolute;
        right: 0;
        top: 0.18rem;
        font-size: 0.28rem;
    }
    .bindAlipay .bindBtn{
        margin-top: 1.1rem;
        width: 6rem;
        height: 0.72rem;
        background: #3289ff;
        color: #fff;
        border-radius: 0.36rem;
        font-size: 0.28rem;
    }
    .bindAlipay .phoneNumColor{
        color:#000;
        -webkit-text-fill-color:black; 
        -webkit-opacity:1; 
        opacity: 1;
    }
</style>