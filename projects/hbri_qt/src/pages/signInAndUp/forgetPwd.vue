<template>
    <div>
        <backBtn :pageName="pageName" :type="type"></backBtn>
        <div class="forgetPwd">
            <!-- 手机号码 -->
            <div class="phone">
                <div class="contentText">手机号码</div>
                <input type="number" :placeholder="placeholder" v-model="phoneNum" @input="checkPhone">
            </div>
            <!-- 验证码 -->
            <div class="code">
                <div class="contentText">验证码</div>
                <input type="text" placeholder="请输入验证码" v-model="code" @input="checkCode">
                <button @click='getCode' :class="[disabled ?'grayColor':'blueColor']">{{codeText}}</button>
            </div>
            <!-- 新密码 -->
            <div class="newPwd">
                <div class="contentText">新密码</div>
                <input type="password" placeholder="请输入新密码" v-model="password" @input="checkSpace">
            </div>
            <!-- 提交按钮 -->
            <button @click='revertPwd' class="revertPwd">{{btnText}}</button>
        </div>
    </div>
</template>
<script>
import backBtn from '@/components/backBtn'
import {resetPsw,getRandomnumber,getMsgCode} from "@/api/index"
import {getLocalData} from "@/utils/store"
import {checkPhone,checkCode,checkPsw,checkSpace} from "@/utils/checkReg"
export default {
    data(){
        return {
            type:'',
            phoneNum:'', 
            code:'',
            password:'',
            codeText:"获取验证码",
            disabled:true,
            pageName:'',
            placeholder:'',
            btnText: ''
        }
    },
    components:{
        backBtn
    },
    created() {
        this.type = this.$route.params.type;
        this.pageName = this.$route.params.type == 'setting'?'修改密码':'忘记密码';
        this.placeholder = this.$route.params.type == 'setting'?'请输入手机号码':'请输入新的手机号码';
        this.btnText = this.$route.params.type == 'setting'?'确认提交':'重置密码';
    },
    methods: {
        checkPhone(e){
            this.phoneNum = checkPhone(this.phoneNum,e);
            if(String(this.phoneNum).length == 11){
                this.disabled = false
            }else{
                this.disabled = true
            }
        },
        checkCode(){
            this.code = checkCode(this.code);
        },
        checkSpace(){
            this.password = checkSpace(this.password)
        },
        // 获取验证码
        getCode(){
            let params = {
                mobileNumber:parseInt(this.phoneNum),
                type:2,//短信模板类型 1 注册登录验证码 2更改密码验证码 3绑定/更换支付宝验证码 4更换手机号验证码
                isLogin:0//默认为0 登录时候为1
            };
           
            let that = this;
            if(!this.phoneNum){
                this.$toast('手机号不能为空');
                return;
            }

            getMsgCode(params).then(data =>{
                if(data.code == 200){
                    let time = 60;
                    that.disabled = true;
                    that.codeText = time+'s';
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

        // 重置密码
        revertPwd(){
            if(!this.phoneNum || !this.code || !this.password){
                this.$toast('手机号，验证码，密码都不能为空');
                return;
            }
            let result = checkPsw(this.password);
            if(!result.flag){
            this.$toast(result.msg);
                return false;
            }
            let sid  = getLocalData("hbxj_sid");
            if(JSON.stringify(sid) == '{}'){
                sid = this.$md5(this.phoneNum);
            }
            let params = {
                sid:sid
            }
            getRandomnumber(params).then(data =>{
                let num = data.data.nums;
                let r1 = this.$md5(this.password+'a');
                let random = ((data.data.nums).sort((a,b)=>{return b-a;})).join('');
                let r2 = this.$md5(r1+random);

                let params = {      
                    mobileNumber:this.phoneNum,
                    verifyCode:this.code,
                    r2:r2,
                    r1:r1,
                    sid:data.data.sid
                }
                this.resetPassword(params);
            })
            
            
        },
        resetPassword(params){
            resetPsw(params).then(data=>{
                if(this.pageName==="修改密码"){
                    this.$toast({
                        message:"修改成功",
                        duration: 1500
                    });
                    setTimeout(() => {
                        this.$router.push({name:'setting'}) 
                    }, 1500);
                }else{
                    this.$toast(data.data);
                }
            })
        }
    },
}
</script>
<style>
    .forgetPwd{
        padding: 0 0.3rem
    }
    .forgetPwd>div{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f2f2f2;
        height: 0.86rem;
        line-height: 0.86rem;
    }
    .forgetPwd button{
        border: 0;
        background-color: transparent;
        outline: none;
    }
    .forgetPwd .contentText{
        width: 1.9rem;
        height: 0.86rem;
        font-size: 0.28rem;
        line-height: 0.86rem;
        text-align: left
    }
    .forgetPwd input{
         background: none;
         outline: none;
         border: 0px;
         width: 5rem;
         line-height: 1.6;
    }
    .forgetPwd input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #c7c7c7;
        font-size: 0.28rem;
    }
    .forgetPwd .code{
        position: relative;
    }
    .forgetPwd .code button{
        position: absolute;
        right: 0;
        height: 0.5rem;
        width: 1.76rem;
        border: 1px solid #c7c7c7;
        border-radius: 0.25rem;
        font-size: 0.24rem
    }
    .forgetPwd .code .blueColor{
        color: #3289ff;
        border: 1px solid #3289ff;
    }

   

    .forgetPwd .grayColor{
        color: #c7c7c7;
    }
    .forgetPwd .revertPwd{
        color: #fff;
        background: #3289ff;
        width: 6rem;
        height: 0.72rem;
        border-radius: 0.36rem;
        margin-top: 1.1rem;
        font-size: 0.28rem;
    }

</style>
