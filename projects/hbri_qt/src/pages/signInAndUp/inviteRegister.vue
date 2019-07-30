<template>
    <div>
        <backBtn pageName="邀请码" :type="type"></backBtn>
        <div class="inviteC">
          
            <div class="codeOrPhone between">
                <mt-field placeholder="请输入邀请码或者邀请人手机号" v-model.lazy="codeOrPhone" :disableClear=true v-on:input.native="regCode" class="codeSize"></mt-field>
                <i class="iconfont icon-richscan_icon scanIcon" @click="scanCodes"></i>
            </div>
            <div class="inviter" v-if="isShowInviter">
                <img :src="userAvatar" />
                <p><span>{{inviter}}</span>邀请您加入海豹日记</p>
            </div>
            <mt-button type="primary" size="large"  @click="nextHandle" class="nextBtn" >下一步</mt-button>
        </div>
    </div>
   
</template>
<script>
import {getInviterInfo} from "@/api/index"
import backBtn from "@/components/backBtn"
export default {
    data(){
        return {
            inviter:'',
            isShowInviter:false,
            codeOrPhone:'',
            oldCode:'',
            userAvatar:'',
            type:'register',
            isChecked:false,
            inviteCode:''
        }
    },
    created() {
        window.sendQrCodeToJS = this.sendQrCodeToJS;
        window.scanCode = this.scanCode;
       
        
    },
    methods: {
        scanCode(qrCode){
            this.codeOrPhone = qrCode;
            this.regCode();
        },
        sendQrCodeToJS(qrCode){
            this.codeOrPhone = qrCode;
            this.regCode();
        },
        scanCodes(){
            //调用壳的接口
            if(this.$phoneType == 'android'){
                window.SealsDiary.getQrCode();
            }else if(this.$phoneType == 'ios'){
               //scanQRCode(); 
                window.webkit.messageHandlers.scanQRCode.postMessage(null);
            }
        },
        nextHandle(){
            if(!this.codeOrPhone){
                this.$toast('请输入邀请码或者邀请人手机号');
                return;
            }
            if(this.isShowInviter){
                if(this.isChecked){
                    this.$router.push({name:'bindPhone',params:{type:'inviteRegister',inviteCode:this.inviteCode}})       
                }else{
                    this.$toast('请输入正确的邀请码或者邀请人手机号');
                    return;
                }  
            }
            
        },
        regCode(){
            this.isChecked = false;
            this.isShowInviter = false;
            let len = this.codeOrPhone.length;
            let phoneReg = /^1[3-9]\d{0,9}/;
            if (!phoneReg.test(this.codeOrPhone)) {
                //code
                //todo sub
                if (len == 7) {
                    //todo request
                    this.getInfo(this.codeOrPhone);
                } else if(len >7){
                    this.codeOrPhone = this.codeOrPhone.substring(0,7);
                    this.isChecked = false;
                }
            } else {
                if (len == 11) {
                    //todo request
                    this.getInfo(this.codeOrPhone);
                } else if(len >11){
                    this.codeOrPhone = this.codeOrPhone.substring(0,11);
                    this.isChecked = false;
                }
                //phone
            }

        },
        getInfo(code){
            let params = {
                inviteCode:code
            }
            let that = this;
            getInviterInfo(params).then(data =>{
                that.isChecked = true;
                that.isShowInviter = true;
                this.userAvatar = data.data.userAvatar;
                this.inviter = data.data.userNick;
                this.inviteCode = data.data.inviteCode;
            }).catch(err =>{
                that.isChecked = false;
                // that.$toast('请输入正确的邀请码或手机号');
            })
        }
    },
    components:{
        backBtn
    }
}
</script>
<style>
.inviteC{
    width:100%;
    padding:0 0.4rem 0 0.4rem;
}
.inviteC .codeOrPhone{
    width:100%;
    border-bottom:2px solid #3289ff;
    height:1rem;
    margin-top:0.8rem;
}
.inviteC .inviter{
    height:1.4rem;
    border:1px solid #87baff;
    border-radius:6px;
    margin-top:0.8rem;
    display: flex;
    align-items: center;
}
.inviteC .scanIcon{
    font-size:0.42rem;
}
.inviteC .nextBtn{
    margin-top:1rem;
    box-shadow: 0px 10px 10px #bbd8ff;
}
.inviteC .codeSize{
    width:100%;
}
.inviter img{
   height:100%;
   width:1.04rem;
   padding:0.2rem; 
}
.inviteC .mint-cell-wrapper{
    background-image:none;
}
</style>
