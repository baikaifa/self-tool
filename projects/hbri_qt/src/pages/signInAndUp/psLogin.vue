<template>
    <div>
        <backBtn pageName="登录" :type="type"></backBtn>
        <div class="lgView">
            <img src="../../assets/img/logo.png" class="logoPng"/>
            <mt-field placeholder="手机号码" type="tel" class="fieldBox" v-model="phoneNum" @input.native="checkPhone"></mt-field>
            <mt-field placeholder="密码" type="password" class="fieldBox" v-model="password" @input.native="checkSpace">
                <span @click="setPsword" class="forgetPsBtn">忘记密码</span>
            </mt-field>
            <mt-button type="primary" size="large" class="lgBtn" @click="loginHander">登录</mt-button>
            <div class="between wt">
                <div class="btn2" @click="msgLogin">短信验证登录</div>
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
import {psLogin,getSerTime} from "@/api/index"
import {setLocalData} from "@/utils/store"
import {checkPhone,checkPsw,checkSpace} from "@/utils/checkReg"
export default {
    data(){
        return {
            phoneNum:'',
            password:'',
            type:'register'
        }
    },
    methods: {
        checkPhone(){
            this.phoneNum = checkPhone(this.phoneNum);
        },
        checkSpace(){
            this.password = checkSpace(this.password)
        },
        msgLogin(){//短信验证登录
            this.$router.push({name:'codeLogin',params:{type:'psLogin'}});
        },
        setPsword(){//忘记密码
            this.$router.push({name:'forgetPwd',params:{type:'psLogin'}});
        },
        clickRegisterBtn(){//新用户注册
            this.$router.push({name:'phRegister',params:{type:'psLogin'}});
        },
        wcLoginHander(){//微信登录
            this.$router.push({name:'wechatLogin',params:{type:'psLogin'}});
        },
        loginHander(){//登录按钮
            let flag = this.regValue();
            if(!flag){
                return false;
            }
            let that = this;
             getSerTime().then(data=>{
                if(data.code ==200){
                    let r0 =  data.data;
                    let r1 = that.$md5(that.password+'a');
                    let r2 = that.$md5(r1+r0);
                    let params = {
                        mobileNumber:this.phoneNum,
                        r2: r2,
                        r0:r0
                    }
                   that.passWLogin(params);
                }
            })
        },
        passWLogin(params){
            psLogin(params).then(data =>{
                console.log(data);
                setLocalData("hbxj_sid",data.data);
                this.$router.push({name:'home'})
            })
        },
        regValue(){
            if(!this.phoneNum || !this.password){
                this.$toast('手机号和密码不能为空');
                return false;
            }
            let result = this.password;
            if(result.length < 6 || result.length > 20){
                this.$toast("密码错误");
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
    border-radius: 0.45rem;
    padding:0 0.4rem;
    margin-bottom:0.5rem;
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
.lgView .mint-cell-wrapper{
    background-image:none;
}
.forgetPsBtn{
    font-size:0.28rem;
    display: inline-block;
    padding:0.2rem;
}

</style>
