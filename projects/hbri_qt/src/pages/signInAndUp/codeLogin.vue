<template>
    <div>
        <backBtn pageName="登录" :type="type"></backBtn>
        <div class="lgView">
            <img src="../../assets/img/logo.png" class="logoPng"/>
            <mt-field placeholder="手机号码" type="tel" class="fieldBox" v-model="phoneNum" @input.native="checkPhone"></mt-field>
            <mt-field placeholder="验证码"  class="fieldBox" v-model="code" @input.native="checkCode">
                |  <mt-button @click="getCode" class="codeBtn" size="small" :disabled="disabled">{{codeText}}</mt-button>
            </mt-field>
            <mt-button type="primary" size="large" class="lgBtn" @click="loginHander">登录</mt-button>
            <div class="fx_end wt">
                <div class="btn2" @click="clickRegisterBtn">新用户注册</div>
            </div>
            <div class="webchatLg" @click="wcLoginHander">
                <img src="../../assets/img/webchat.png" />
                 <p class="wchatBtn">微信登录</p>
            </div>
        </div>
    </div>
   
</template>
<script>
import backBtn from "@/components/backBtn"
import {codeLogin,getMsgCode} from "@/api/index"
import {setLocalData} from "@/utils/store"
import {checkPhone,checkCode} from "@/utils/checkReg"
export default {
    data(){
        return {
            phoneNum:'',
            code:'',
            codeText:"获取验证码",
            disabled:false,
            type:''
        }
    },
    created() {
        clearInterval();
        this.type = this.$route.params.type;
    },
    methods: {
         checkPhone(){
            this.phoneNum = checkPhone(this.phoneNum);
        },
        checkCode(){
            this.code = checkCode(this.code);
        },
        getCode(){//获取验证码
             let params = {
                mobileNumber:parseInt(this.phoneNum),
                type:1,//短信模板类型 1 注册登录验证码 2更改密码验证码 3绑定/更换支付宝验证码 4更换手机号验证码
                isLogin:1//默认为0 登录时候为1
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
        clickRegisterBtn(){//新用户注册
            this.$router.push({name:'phRegister',params:{type:'codeLogin'}});
        },
        wcLoginHander(){//微信登录
            this.$router.push({name:'wechatLogin',params:{type:'codeLogin'}});
        },
        loginHander(){//登录按钮
            let flag = this.regValue();
            if(!flag){
                return false;
            }
            let that = this;
            let params = {
                mobileNumber:this.phoneNum,
                verifyCode:this.code
            }
            codeLogin(params).then(data=>{
                setLocalData("hbxj_sid",data.data);
                this.$router.push({name:'home'})
            })
        },
    
        regValue(){
            if(!this.phoneNum){
                this.$toast('手机号不能为空');
                return false;
            }
            if(!this.code){
                this.$toast('验证码不能为空');
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
.lgView{
    width:100%;
    padding:1rem 0.6rem 1.4rem 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.lgView .fieldBox{ 
    height:0.77rem;
    width:100%;
    border:1px solid #c8c8c8;
    border-radius: 0.42rem;
    padding:0 0.4rem;
    margin-bottom:0.5rem;
    background-color:#fff;
}
.lgView .lgBtn{
    border-radius: 0.4rem;
}
.lgView .logoPng{
    width:1.6rem;
    padding-bottom:0.9rem;
}
.btn2{
    color:#3289ff;
    font-size:0.28rem;
    padding:0.26rem 0.26rem 0.26rem 0;  
}
.webchatLg{
    padding-top:1.2rem;
}
.webchatLg img{
    width:1.2rem;
}
.lgView .codeBtn{
    background: #fff;
}
.lgView .mint-cell-wrapper{
    background-image:none;
}
</style>
