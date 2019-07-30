<template>
    <div>
        <div class="weChatBind">
        <backBtn pageName="微信绑定" :type="type"></backBtn>
        <div class="logoImg">
            <img src="../../assets/img/logo.png" alt="">
        </div>
        <div class="text-2">亲爱的海豹日记用户，小豹在此等候您多时了，小豹在此用心提示：若您当前已是我们小程序的用户，为了避免您的相关信息或受益不能及时统计，请您绑定微信，谢谢配合。</div>
        <button @click='confirm'>同意绑定</button>
        </div>
        <!--<div class="weChatBindTop" @click='cancel'>取消</div>
        
            <div class="logoImg">
                <img src="../../assets/img/logo.png" alt="">
            </div>
            <div class="text-1">海报日记APP</div>
            <div class="text-2">登陆后开发者将获得以下权限</div>
            <div class="text-3">•&nbsp;&nbsp;获得你的公开信息（昵称、头像、地区及性别）</div>
            
        -->
    </div>
</template>
<script>
import {getInviterInfo,webchatLogin,userInfo} from "@/api/index"
import {setLocalData} from "@/utils/store"
import backBtn from "@/components/backBtn"
export default {
    data(){
        return {
            mobileNumber:'',
            inviteCode:'',
            bandMobileFlag:0,
            type:"home"
        }
    },
    components:{
        backBtn
    },
    created() {
        this.mobileNumber = this.$route.params.mobileNumber || '';
        window.loginWxAndroid = this.loginWxAndroid;
        window.loginWxIOS = this.loginWxIOS;
    },
    methods: {
        getUserInfo(){
            if(this.bandMobileFlag == 0){
                this.$router.push({name:'bindPhone',params:{inviteCode:this.inviteCode}});
            }else{
                this.$router.push({name:'home'});
            }
        },
        loginWxAndroid(code){
            let params = {
                code: code, 
                mobileNumber:this.mobileNumber
            }
            webchatLogin(params).then(data => {
                //跳转到绑定手机的页面
                this.inviteCode = data.data.inviteCode;
                this.bandMobileFlag = data.data.bandMobileFlag;
                if(data.data.sid){
                    setLocalData("hbxj_sid",data.data.sid);
                }
                this.getUserInfo();
            })
        },
        loginWxIOS(code){
            let params = {
                code: code,
                mobileNumber:this.mobileNumber
            }
            webchatLogin(params).then(data => {
                //跳转到绑定手机的页面
                this.inviteCode = data.data.inviteCode;
                this.bandMobileFlag = data.data.bandMobileFlag;
                if(data.data.sid){
                    setLocalData("hbxj_sid",data.data.sid);
                }
                this.getUserInfo();
            })
        },
        cancel(){
            let type = this.$route.params.type;
            this.$router.push({name:type});
        },
        confirm(){
            if(this.$phoneType == 'android'){
                window.SealsDiary.loginWxFromJs()
            }else if(this.$phoneType == 'ios'){
                window.webkit.messageHandlers.weichatLogin.postMessage(null);
              // weichatLogin();
            }
        },
    },
}
</script>
<style>
    
    .weChatBind{
        padding: 0 0.7rem;
        letter-spacing: 0.02rem
    }
    .weChatBind button{
        margin-top: 0.84rem;
        border: 0;
        outline: none;
        background-color: #07c160;
        height: 0.94rem;
        width: 6.1rem;
        border-radius: 0.1rem;
        color: #fffefe;
        font-size: 0.32rem;
        letter-spacing: 0.02rem
    }
    .logoImg{
        margin: 0 auto;
        margin-top: 2rem;
        width: 1.4rem;
        height: 1.4rem;
        overflow: hidden;
        text-align: center;
        position: relative;
    }
    .logoImg>img{
        position: absolute;
        width: 1.64rem;
        top: 50%;
        left: 50%;
        margin-left: -0.82rem;
        margin-top: -0.82rem;
    }
    .text-1{
        font-size: 0.36rem;
        font-weight: bold;
        padding-top: 0.3rem;
        padding-bottom: 0.38rem;
        border-bottom: 1px solid #cccccc;
    }
    .text-2{
        text-align: left;
        font-size: 0.32rem;
        padding-top: 0.54rem;
        font-weight: bold;        
    }
    .text-3{
        text-align: left;
        padding-top: 0.36rem;
        padding-left: 0.5rem;
        color: #888888;
        font-size: 0.28rem;
        text-indent: -0.4rem
    }
</style>
