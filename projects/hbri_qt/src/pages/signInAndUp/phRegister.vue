<template>
    <div class="registerDiv">
        <backBtn pageName="注册" :type="type"></backBtn>
        <div class="phRegister">
            <img src="../../assets/img/logo.png" class="logoPng"/>
            <mt-field placeholder="手机号码" type="tel" class="fieldBox" v-model="phoneNum" @keyup.native="checkPhone"></mt-field>
            <mt-field placeholder="验证码"  class="fieldBox" v-model="code" @keyup.native="checkCode" type="tel">
                |  <mt-button @click="getCode" class="codeBtn" size="small" :disabled="disabled">{{codeText}}</mt-button>
            </mt-field>
            <mt-button type="primary" size="large" class="lgBtn" @click="clickRegister">注册</mt-button>
            <div class="fx_end wt">
                <div class="btn2" @click="clickLoginBtn">已注册，去登录</div>
            </div>
            <div class="webchatLg" @click="wcLoginHander">
                <img src="../../assets/img/webchat.png" />
                 <p class="wchatBtn">微信登录</p>
            </div>
        </div>
        <div class="isAgree">
            <span class="checkBtn" @click="isCheckRules">
                <i class="iconfont icon-duihao blue" v-show="isCheck"></i>
                <span v-show="!isCheck" class="noCheck dl"></span>
            </span>
            我已阅读并同意<span class="blue" @click="jumpToxy">《用户协议》</span>和<span  class="blue" @click="jumpTosecret">《隐私政策》</span>
        </div>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn"
import {phoneRegister,getMsgCode} from "@/api/index"
import {setLocalData} from "@/utils/store"
import {checkPhone,checkCode} from "@/utils/checkReg"
export default {
    data(){
        return {
            phoneNum:'',
            code:'',
            codeText:"获取验证码",
            disabled:false,
            isCheck:true,
            type:'register'
        }
    },
    created() {
        clearInterval();
    },
    methods: {
        jumpToxy(){
            this.$router.push({name:'hbDocument',params:{type:'phRegister'}});
        },
        jumpTosecret(){
            this.$router.push({name:'secretView',params:{type:'phRegister'}});
        },
        checkPhone(){
            this.phoneNum = checkPhone(this.phoneNum.trim());
        },
        checkCode(){
            this.code = checkCode(this.code);
        },
        isCheckRules(){
            this.isCheck = !this.isCheck;
        },
        getCode(){//获取验证码
             let params = {
                mobileNumber:this.phoneNum.trim(),
                type:1,//短信模板类型 1 注册登录验证码 2更改密码验证码 3绑定/更换支付宝验证码 4更换手机号验证码
                isLogin:0//默认为0 登录时候为1
            };
           
            let that = this;
            if(!this.phoneNum){
                this.$toast('手机号不能为空');
                return;
            }
          
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
        clickLoginBtn(){//去登录按钮
            this.$router.push({name:'psLogin',params:{type:'phRegister'}});
        },
        wcLoginHander(){//微信登录
            this.$router.push({name:'wechatLogin',params:{type:'phRegister'}});
        },
        clickRegister(){//去注册
            let flag = this.regValue();
            if(!flag){
                return false;
            }
            if(!this.isCheck){
                this.$toast("请先阅读并同意用户服务协议和隐私政策");
                return false;
            }
            let that = this;
            let params = {
                mobileNumber:this.phoneNum.trim(),
                verifyCode:this.code
            }
            phoneRegister(params).then(data=>{
                //调到设置密码页面
                setLocalData("hbxj_sid",data.data);
                this.$router.push({name:'setPwd'})
            })
        },
    
        regValue(){
            if(!this.isCheck){
                this.$toast("请先阅读并同意用户服务协议和隐私政策");
                return false;
            }
            if(!this.phoneNum||this.phoneNum.length!=11){
                this.$toast({
                    message:'请输入正确的手机号'
                });
                return false;
            }
             if(!this.code){
                this.$toast('请输入验证码');
                return false;
            }
            return true;
        },
        getSerTime(){
            getSerTime().then(data=>{
                if(data.code == 200){
                    return data.data;
                }
            })
        }
    },
    components:{
        backBtn
    }
}
</script>
<style>
  .registerDiv{
    position: fixed;
  }
.phRegister{
    width:100%;
    padding:1rem 0.6rem 0.8rem 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.phRegister .fieldBox{ 
    height:0.77rem;
    width:100%;
    border:1px solid #c8c8c8;
    border-radius: 0.42rem;
    padding:0 0.4rem;
    margin-bottom:0.5rem;
    background-color:#fff;
}
.phRegister .lgBtn{
    border-radius: 0.4rem;
}
.phRegister .logoPng{
    width:1.6rem;
    padding-bottom:0.9rem;
}
.btn2{
    color:#3289ff;
    font-size:0.28rem;
    padding:0.26rem 0.26rem 0.26rem 0;  
}
.webchatLg{
    padding-top:0.8rem;
}
.webchatLg img{
    width:1.2rem;
}
.phRegister .codeBtn{
    background: #fff;
}
.isAgree{
    font-size:0.2rem;
}
.checkBtn{
    padding:10px 5px 10px 10px;
}
.checkBtn i{
    vertical-align: middle;
}
.noCheck{
    width:14px;
    height:14px;
    border:1px solid #c8c8c8;
    vertical-align: middle;
}
.phRegister .mint-cell-wrapper{
    background-image:none;
}
</style>
