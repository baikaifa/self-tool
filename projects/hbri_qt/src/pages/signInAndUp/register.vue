<template>
    <div class="signup">
        <i class="iconfont icon-guanbi1 guanbiBtn" @click="gotoBak"></i>
        <div class="signup_cont">
            
            <p class="signup_inviteCode" @click="inviteCodeClick">填邀请码注册</p>
            <mt-button type="primary" size="large" class="signup_registerbtn" @click="registerClick">注册</mt-button>
            <div class="between signup_top55">
                <button class="signup_btn" @click="phoneBtnClick"><i class="iconfont icon-shouji phoneIcon"></i><span>手机登录</span></button>
                <button class="signup_btn" @click="wechatBtnClick"><i class="iconfont icon-weixin1 weixinIcon"></i><span>微信登录</span></button>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        inviteCodeClick(){
            this.$router.push({name:'inviteRegister',params:{type:'register'}})
        },
        registerClick(){
            this.$router.push({name:'phRegister',params:{type:'register'}});
        },
        phoneBtnClick(){//密码登录
            this.$router.push({name:'psLogin',params:{type:'register'}});
        },
        wechatBtnClick(){
            this.$router.push({name:'wechatLogin',params:{type:'register'}});
        },
        gotoBak(){
             this.$router.push({name:'home',params:{type:'register'}});
            // console.log(this.$router);
            //this.$router.go(-1)
        },
        cleanHistory(){
            localStorage.clear();
            location.replace(window.location.href);
            
        }
    },

    mounted: function () {
        // 清除访问记录， 清除localStorage
        // this.cleanHistory()
        // let self = this;
        document.addEventListener('touchstart', (e) => {
            this.moveY = e.targetTouches[0].pageY;
        })
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            let moveWidth = this.moveY - e.targetTouches[0].pageY;
            if (moveWidth !== 0) {
                document.body.scrollTop += moveWidth;
            }
        })
    }

}
</script>
<style>
    .signup{
        background:url("../../assets/img/registerBg.png") no-repeat;
        background-size:100% 100%;
        height:100vh;
        width:100%;
        margin-top:-0.8rem;
        position: relative;
    }
    .guanbiBtn{
        position: absolute;
        right:0.5rem;
        top:0.5rem;
        cursor: pointer;
    }
    .signup_cont{
        padding:0 0.58rem;
        position: absolute;
        bottom:2.7rem;
        width:100%;
    }
    .signup_btn{
        border:none;
        background:#f4f4f4;
        padding:0 0.35rem 0 0.3rem;
        display: flex;
        justify-content: space-between;
        font-size:0.3rem;
        height:0.8rem;
        width:2.9rem;
        border-radius: 0.33rem;
        align-items: center;
    }
    .signup_registerbtn{
        border-radius: 0.5rem;
        box-shadow: 0px 10px 10px #bbd8ff;
    }
    .signup_top55{
        padding-top:0.55rem;
    }
    .signup_inviteCode{
        padding: 0.1rem 0.3rem 0.3rem;
        float:right;
        color:#3289ff;
        font-size:0.28rem;
    }
    .phoneIcon{
        font-size:24px;
        color:#7fafea;
    }
    .weixinIcon{
        font-size:24px;
        color:#8dc878;
    }
</style>

