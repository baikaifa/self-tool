<template>
    <div class="setNotice">
        <backBtn :type="type" :pageName="pageName"></backBtn>
        <keep-alive>
            <div class="noticeOn" v-if="notice">
                <div class="text1">消息提醒在系统中已关闭，如需打开，请在手机设置中开启</div>
                <div class="infoItem between p20 openNotice">
                    <p class="font28">消息通知</p>
                    <p class="fontgray pd10" @click="openNotice" style="display: flex">
                        <span class="font24" style="color: #8c8c8c">去开启</span>
                        <i class="iconfont icon-next"></i>
                    </p>
                </div>
                <div class="text1">您希望收到</div>
            </div>
            <div class="noticeOff" v-if="!notice"></div>
        </keep-alive>
            <div class="switchBtn">
                <div class="profitBtn">
                    <p>收益消息</p>
                    <div class="btnImg" @click="changeStatus(1)">
                        <img src="../../assets/img/switchOn.png" alt="" v-if="profit">
                        <img src="../../assets/img/switchOff.png" alt="" v-if="!profit">
                    </div>
                </div>
                <div class="fanBtn">
                    <p>新粉丝消息</p>
                    <div class="btnImg" @click="changeStatus(2)">
                        <img src="../../assets/img/switchOn.png" alt="" v-if="newFan">
                        <img src="../../assets/img/switchOff.png" alt="" v-if="!newFan">
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import {getConfig, updateConfig} from "@/api/index"
export default{
    data(){
        return {
            type: "setting",
            pageName: "新消息提醒",
            notice: true,  //是否显示开启提醒
            profit: false,
            newFan: false
        }
    },
    components: {
        backBtn
    },
    created () {
        window.getNotifyOpened = this.getNotifyOpened;
        window.isOpenNotificationiOS = this.isOpenNotificationiOS;
        this.ifOpen()
        this.getInfo()

    },
    activated () {
        this.ifOpen();
        this.getInfo();
    },
    methods: {
        getNotifyOpened(code){
            if(code == 1){
                this.notice = false;
            }else if(code == 0){
                this.notice = true;
            }
        },
        // 获取消息设置
        getInfo(){
            if(this.notice == 0){
                this.profit = false;
                this.newFan = false;
                return;
            }
            getConfig().then(data => {
                if(data.code == 200){
                    var data = typeof(data.data) === "string" ? JSON.parse(data.data) : data.data;
                    this.profit = data.btn1.status == 0 ? false : true;
                    this.newFan = data.btn2.status == 0 ? false : true;
                }
            })
        },

        // 是否开启通知
        ifOpen(){
            if(this.$phoneType == "ios"){
                window.webkit.messageHandlers.isOpenNotification.postMessage(null);
                // let sts = isOpenNotification();
                // if(sts == 1){  // 已开启
                //     this.notice = false;
                // }else{
                //     this.notice = true
                // }
            }else if(this.$phoneType == "android"){
                let sts = window.SealsDiary.checkNotifyOpen();
                if(sts == 1){  // 已开启
                    this.notice = false;
                }else{
                    this.notice = true
                }
            }
        },

        isOpenNotificationiOS(status){
            if(status == 1){  // 已开启
                this.notice = false
            }else{
                this.notice = true
            }
        },

        //开启消息通知
        openNotice(){
            console.log('开启')
            if(this.$phoneType == "ios"){
                window.webkit.messageHandlers.jumpToSetNotification.postMessage(null);
               // jumpToSetNotification();
            }else if(this.$phoneType == "android"){
                window.SealsDiary.toOpenNotify();
            }
        },
        showToast(){
            this.$toast("请先开启通知")
        },

        // 修改状态
        changeStatus(btn){
            if(this.notice){
                this.showToast()
            }else{
                let params = {}
                switch(btn){
                    case 1: 
                        params.notifyType = 'btn1'
                        if(this.profit){  // 已开启
                            params.notifyOpen = 0
                        }else{
                            params.notifyOpen = 1
                        }
                        console.log(params)
                        updateConfig(params).then(data => {
                            if(data.code == 200){
                                this.profit = !this.profit;
                            }else{
                                this.$toast("修改失败")
                            }
                        })
                        break;
                    case 2:
                        params.notifyType = 'btn2'
                        if(this.newFan){  // 已开启
                            params.notifyOpen = 0
                        }else{
                            params.notifyOpen = 1
                        }
                        console.log(params)
                        updateConfig(params).then(data => {
                            if(data.code == 200){
                                this.newFan = !this.newFan;
                            }else{
                                this.$toast("修改失败")
                            }
                        })
                        break
                }
            }
        }
    }
}
</script>
<style>
    .setNotice .switchBtn{
        background: #fff;
        font-size: 0.28rem
    }
    .setNotice .switchBtn>div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0.24rem;
        padding-right: 0.2rem;
        height: 0.94rem;
        border-bottom: 1px solid #f5f5f5
    }
    .setNotice .noticeOff{
        height: 0.18rem;
    }
    .setNotice .openNotice{
        background: #fff;
        height: 0.94rem
    }
    .setNotice .text1{
        font-size: 0.24rem;
        color: #a5a5a5;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: left;
        padding-left: 0.2rem
    }
    .setNotice .btnImg{
        height: 0.67rem;
        padding-top: 0.03rem
    }
    .setNotice .btnImg>img{
        width: 1.04rem;
        height: 0.67rem;
    }
</style>