<template>
    <div>
        <backBtn pageName="绑定手机" :type="type"></backBtn>
        <div class="bindPhone">
            <p class="tips">
                为了账户安全，建议您绑定手机，找回密码，更方便，安全，快捷。
            </p>
            <mt-field  type="tel" placeholder="请输入常用的手机号" class="fieldBox" v-model="phoneNum" @input.native="checkPhone">
                
            
            </mt-field>
            <mt-field placeholder="请输入验证码" type="number" class="fieldBox" v-model="code" @input.native="checkCode">
                 | <mt-button @click="getCode" class="codeBtn" size="small" :disabled="disabled">{{codeText}}</mt-button>
            </mt-field>
           
            <mt-button type="primary" size="large" class="nextBtn" @click="doneBtnHander" v-if="type == 'inviteRegister'">完成</mt-button>
            <mt-button type="primary" size="large" class="nextBtn" @click="nextBtnHander" v-else>下一步</mt-button>
            <p class="hb_xy" v-if="type != 'register'">注册代表您已同意<span class="blue" @click="jumpAgreeMent">《海豹APP用户协议》</span></p>
        </div>
    </div>
   
</template>
<script>
import {phoneRegister,getMsgCode,bindMobile} from "@/api/index"
import backBtn from "@/components/backBtn"
import {checkPhone,checkCode} from "@/utils/checkReg"
import {setLocalData,getLocalData} from "@/utils/store"
export default {
    data(){
        return{
           phoneNum:'',
            code:'',
            disabled:false,
            codeText:'获取验证码',
            type:'',
            inviteCode:''
        }
    },
    created() {
        clearInterval();
        
        this.type = this.$route.params.type||this.$route.query.type || "register";
        this.inviteCode = this.$route.params.inviteCode||this.$route.query.inviteCode || '';
        this.phoneNum = this.$route.params.phoneNum||this.$route.query.phoneNum || '';
    },
    methods: {
        jumpAgreeMent(){
            this.$router.push({
                name:'hbDocument',
                params:{type:'bindPhone','phoneNum':this.phoneNum,'bindType':this.type,'inviteCode':this.inviteCode}
            });
        },
        checkPhone(){
            this.phoneNum = checkPhone(this.phoneNum);
        },
        checkCode(){
            this.code = checkCode(this.code);
        },
        doneBtnHander(){//邀请码注册手机号
            let params = {
                mobileNumber:this.phoneNum,
                verifyCode:this.code,
                inviteCode:this.inviteCode
            };
            let flag = this.regData();
            if(!flag){
                return;
            }else{
                phoneRegister(params).then(data=>{
                    if(data.code == 200){
                        this.$toast('注册成功');
                        this.$router.push({name:'home'});
                        setLocalData("hbxj_sid",data.data);
                    }
                }); 
            }
          
        },
        nextBtnHander(){//微信绑定手机号
            let params = {
                mobileNumber:this.phoneNum,
                verifyCode:this.code,
                inviteCode:this.inviteCode
            };
            let flag = this.regData();
            if(!flag){
                return;
            }else{
                bindMobile(params).then(data=>{
                    if(data.code == 200){
                         setLocalData("hbxj_sid",data.data);
                        this.$toast('注册成功');
                        this.$router.push({name:'home'});
                    }
                }); 
            }
          
        },
        getCode(){
            let params = {
                mobileNumber:parseInt(this.phoneNum),
                type:1,//短信模板类型 1 注册登录验证码 2更改密码验证码 3绑定/更换支付宝验证码 4更换手机号验证码
                isLogin:0//默认为0 登录时候为1
            };
           
            let that = this;
            if(!this.phoneNum){
                this.$toast('手机号不能为空');
                return;
            }
            let phoneReg = /^1[3456789]\d{9}$/;
            if(!phoneReg.test(this.phoneNum)){
                this.$toast('请输入正确手机号');
                return ;
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
        regData(){
            if(!this.phoneNum || !this.code){
                this.$toast( '手机号和验证码不能为空');
                return false;
            }
            return true;
        }
    },
    components:{
        backBtn
    }
}
</script>
<style>
.bindPhone{
    width:100%;
    padding:0.4rem;
}
.bindPhone .fieldBox{
    height:0.77rem;
    width:100%;
    border:1px solid #c8c8c8;
    border-radius: 0.42rem;
    padding:0 0.4rem;
    margin-bottom:0.4rem;
}
.bindPhone .tips{
    text-align: left;
    color:#888;
    font-size:0.28rem;
    margin-bottom:0.4rem;
}
.bindPhone .nextBtn{
    border-radius: 0.4rem;
}
.bindPhone .codeBtn{
    background:#fff;
}
.hb_xy{
    margin-top:0.3rem;
    font-size:0.2rem;
}
</style>