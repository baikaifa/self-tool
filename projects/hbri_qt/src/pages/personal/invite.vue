<template>
    <section class="inviteContain">
        <backBtn :pageName="'邀请'" :type="type"></backBtn>
        <section class="shareImgContain">
            <div class="inviteBg">
                <div class="inviteInfoContain">
                    <div class="codeImgContain">
                        <img :src="codeImgSrc" alt="" srcset="">
                    </div>
                    <div class="codeTxtContain">
                        <div class="codeTitle">--邀请码--</div>
                        <div class="codeInfo">{{codeTxt}}</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="shareBtnContain">
            <div class="copyBtn" 
            v-clipboard:copy="codeTxt"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">复制注册口令</div>
            <div class="shareBtn" @click="shareMaskFun">分享专属海报</div>
        </section>
        <section v-if="showShareMask" class="shareMask">
            <div class="shareIconContain">
                <div class="shareIconBanner">
                    <div class="wx_friend"></div>
                    <div class="wx_circle"></div>
                    <div class="qq_friend"></div>
                    <div class="qq_circle"></div>
                    <div class="weibo"></div>
                </div>

            </div>
            <div class="shareCancle" @click="shareMaskFun"></div>
        </section>
    </section>
</template>
<script>

import backBtn from "@/components/backBtn";
import {invite} from '@/api/index';
import VueClipboard from 'vue-clipboard2'

export default {
    data:function(){
        return {
            showShareMask:false,
            codeImgSrc:"",
            codeTxt:"",
            type:""
        }
    },
    components:{backBtn},
    created:function(){
        this.type = this.$route.params.type;
        console.log(this.type);
        this.gerShareCode();
    },
    methods:{
        
        shareMaskFun:function(){
            if(this.$phoneType == 'android'){
                window.SealsDiary.getShareAction(null,null,null,null,0);
            }else if(this.$phoneType == "ios"){
                window.webkit.messageHandlers.getShareAction.postMessage({title:null,detailUrl:null,imgUrl:null,desc:null,type:2});
            }
        },
        gerShareCode:function(){
            var _this=this;
            invite().then(function(res){
                if(res.code==200){
                    _this.codeImgSrc=res.data.link;
                    _this.codeTxt=res.data.inviteCode;
                }
            });
        },
        onCopy: function (e) {
           this.$toast("已为您复制您的专属邀请码，赶快去分享给更多的小伙伴吧！");
        },
        onError: function (e) {
            this.$toast("复制出错");
        }

    }
}
</script>
<style>

    .inviteContain .shareBtnContain{height: 1.2rem;width: 100%;display: flex;position: fixed;bottom: 0;align-items:center;justify-content: space-around;background: #f7f7f7;}
    .inviteContain .shareBtnContain div{height: 0.7rem;width: 3rem;text-align: center;line-height: 0.7rem;border-radius: 5px;}
    .inviteContain .copyBtn{color: #ff942c;border:1px solid #ff942c;}
    .inviteContain .shareBtn{color:#3288ff;border:1px solid #3288ff;}
    .inviteContain .shareImgContain{position: absolute;width: 100%;top: 0.8rem;bottom: 1.2rem;display: flex;justify-content: center;align-items: center;z-index: 0;}
    .inviteContain .inviteBg{background: url('../../assets/img/inviteBg.png');width: 5.3rem;height: 9.4rem;background-size: 100%;position: relative;}
    .inviteContain .inviteInfoContain{width: 4.35rem;height: 1.5rem;position: absolute;bottom: 0.4rem;left: 0.45rem;display: flex;z-index: 1;}
    .inviteContain .inviteInfoContain .codeImgContain{display: flex;justify-content: flex-end;align-items: center;flex:1;}
    .inviteContain .inviteInfoContain .codeImgContain img{width: 1.15rem;height: 1.15rem;border:1px solid #ccc;margin-right: 0.2rem;}
    .inviteContain .codeTxtContain{display: flex;flex-direction: column;justify-content: center;align-items: flex-start;flex:1;}
    .inviteContain .codeTitle{color: #00956f;margin-bottom: 0.1rem;}
    .inviteContain .codeInfo{font-size: 0.24rem;background:#00956f;border-radius: 50px;color: #fff;padding: 0.05rem 0.3rem;}
    .inviteContain .shareMask{width: 100%;height: 3.3rem;position: absolute;bottom: 0;background:  url('../../assets/img/inviteShareBg.png');background-size: 100%;z-index: 2;}
    .inviteContain .shareMask .shareCancle{width: 100%;height: 1rem;position: absolute;bottom: 0;z-index: 3;}
    .inviteContain .shareMask .shareIconContain{position: absolute;height: 1.65rem;width: 100%;bottom: 1rem;z-index: 3;}
    .inviteContain .shareMask .shareIconBanner{width: 100%;height: 0.88rem;margin-top:0.13rem;display: flex;}
    .inviteContain .shareMask .shareIconBanner div{width: 0.88rem;height: 0.88rem;}
    .inviteContain .shareMask .shareIconBanner div:first-child{margin-left: 0.12rem;}
    .inviteContain .shareMask .shareIconBanner div:not(:first-child){margin-left: 0.72rem;}

</style>

