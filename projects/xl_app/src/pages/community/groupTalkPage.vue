<template>
    <section class="groupTalkPage">
        <tit :bak="true"></tit>
        <!--<section class="pageTitle">
            <div class="goBackBtn" @click="goBak"></div>
            群聊
        </section>-->
        <section v-if="noTalkData" class="noTalkData">
            没有更多数据了~
        </section>
        <section v-if="!noTalkData" class="talkContain" :class="{pcTop:sys_env=='pc'}">
            
            
            <div v-for="item in list" class="talkItem">
                <div class="avatarContain">
                    <img v-lazy="item.wxAvatar"/>
                </div>
                <div class="talkInfoContain">
                    <div class="nameAndTime">
                        <div class="name">{{item.wxName}}</div>
                        <div class="time">{{item.time}}</div>
                    </div>
                    <div v-if="item.msgType==1||item.msgType==49" class="talkContent" v-html="item.msgContent">
                        
                    </div>
                    <div v-if="item.msgType==3" class="talkContent">
                        <img v-lazy="item.msgContent"/>
                    </div>
                    <div v-if="item.msgType==43" class="talkContent">
                        <video controls :src="item.msgContent"></video>
                    </div>
                    <div v-if="item.msgType==34" class="talkContent">
                        <audio controls :src="item.msgContent"></audio>
                    </div>
                    <!--<div v-if="item.msgType==49" class="talkContent talkUrl" @click="gotoPage(item.contentAnalysisUrl)" v-html="item.msgContent">
                        
                    </div>-->
                </div>
            </div>
            
        </section>
        <div class="addNotice">更多内容加群可看</div>
        <div @click="joinGroup(groupId)" :class="['btn',btnClassMap[joinGroupStatus]]">{{btnTxtMap[joinGroupStatus]}}</div>

        <groupPopApplySuccess ref="ApplySuccessPop"></groupPopApplySuccess>
        
        <groupPopBindWx ref="BindWxPop"></groupPopBindWx>

        <groupPopAddRobot 
        ref="addRobotPop"
        :addRobotInfo="addRobotInfo"
        ></groupPopAddRobot>
        <dataLoading :isShowLoad="isShowLoad"></dataLoading>
    </section>
</template>
<script>
import {reqGroup} from "../../utils/request";
import groupPopAddRobot from "../../components/group/groupPop_addRobot"
import groupPopBindWx from "../../components/group/groupPop_bindWx"
import groupPopApplySuccess from "../../components/group/groupPop_applySuccess"
import dataLoading from "../../components/dataLoading"
import tit from "../../components/title/title"
export default {
    data(){
        return {
            sys_env: this.sysEnv,
            groupId:"",
            list:[],
            addRobotInfo:{
                qrCode:"",
                robotId:"",
                robotAlias:"" 
            },
            popShow:{
                applyShow:false,
                addMaskShow:false,
                bindWxShow:false,
            },
            btnClassMap:['failed','start','joined','applying'],
            btnTxtMap:['群已满','加入','已加入','已申请'],
            joinGroupStatus:0,
            noTalkData:false,
            isShowLoad:false
        }
    },
    components:{groupPopAddRobot,groupPopBindWx,groupPopApplySuccess,dataLoading,tit},
    created(){
        this.groupId=this.$route.query.groupId;
        //this.groupId="23643638069@chatroom";
        this.getTalkList();
        this.getGroupDetail();
    },
    methods:{
        getTalkList(){
            this.isShowLoad=true;
            reqGroup.groupTalk({groupId:this.groupId}).then(res=>{
                this.list=res.data;
                setTimeout(()=>{
                            this.isShowLoad=false;
                },500);
                if(this.list.length>0){
                    this.noTalkData=false;
                }else{
                    this.noTalkData=true;
                }

            });
        },
        getGroupDetail(){
            
            reqGroup.groupDetail({"groupId":this.groupId}).then((res)=>{
                if(res.code==200){
                    
                    this.joinGroupStatus=res.data.joinGroupStatus;
                }else{
                    alert(res.message);
                }
            });
        },
        joinGroup(groupId){
            //this.joinGroupStatus=1;

            for(let i in this.popShow){
                this.popShow[i]=false;
            }
            this.$refs.ApplySuccessPop.applyShow=this.popShow.applyShow;
            this.$refs.BindWxPop.bindWxShow=this.popShow.bindWxShow;
            this.$refs.addRobotPop.addMaskShow=this.popShow.addMaskShow;
            
            for(let i in this.addRobotInfo){
                this.addRobotInfo[i]="";
            }

            if(this.joinGroupStatus==1){
               
                var param={
                    "groupId":groupId
                }
                reqGroup.joinGroup(param).then((res)=>{
                    
                    if(res.code==200){
                        var applyStatus=res.data.result;//1. // 申请社群成功 2. // 未绑定微信 3.// 已绑定需要加机器人好友
                        //applyStatus=1;
                        switch (applyStatus.toString()){
                            case "1":
                                this.popShow.applyShow=true;
                                this.$refs.ApplySuccessPop.applyShow=this.popShow.applyShow;
                                this.joinGroupStatus=3;
                                break;
                            case "2":
                                this.popShow.bindWxShow=true;
                                this.$refs.BindWxPop.bindWxShow=this.popShow.bindWxShow;
                                break;
                            case "3":
                                this.popShow.addMaskShow=true;

                                this.$refs.addRobotPop.addMaskShow=this.popShow.addMaskShow;

                                this.addRobotInfo.qrCode=res.data.addRobotInfo.qrCode;
                                this.addRobotInfo.robotId=res.data.addRobotInfo.robotId;
                                this.addRobotInfo.robotAlias=res.data.addRobotInfo.robotAlias;
                                break;
                        }
                    }else{      
                        alert(res.message);
                    }
                });
            }else{
                return;
            }
        },
        goBak(){
            window.history.go(-1);
        },
        gotoPage(url){
            location.href=url;
        }
    }
}
</script>
<style scoped="scoped" type="text/css">
    .groupTalkPage .noTalkData{
        position: fixed;
        top: 120px;
        bottom: 180px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        border-top: 1px solid #eeeeee;/*no*/
    }

    

    .groupTalkPage .talkContain{
        position: fixed;
        top: 120px;
        bottom: 180px;
        width: 100%;
        overflow: auto;
        border-top: 1px solid #eeeeee;/*no*/
    }
    .groupTalkPage .pcTop{
        top:80px;
    }
    .groupTalkPage .talkContain .talkItem{
        width: 690px;
        margin: 0 auto;
        border-bottom: 1px solid #eeeeee;
        padding-top:20px;
        padding-bottom:20px;
        display: flex;
    }
    .groupTalkPage .talkContain .talkItem .avatarContain{
        width: 100px;
        display: flex;
    }
    .groupTalkPage .talkContain .talkItem .avatarContain img{
       
        width: 80px;
        height: 80px;
        border-radius: 50px;
        display: flex;
    }
    .groupTalkPage .talkContain .talkItem .talkInfoContain{
        flex: 1;
        flex-direction: column;
    }
    .groupTalkPage .talkContain .talkItem .talkInfoContain img{
        max-width: 50%;
    }
    .groupTalkPage .talkContain .talkItem .talkInfoContain video{
        max-width: 80%;
    }
    .groupTalkPage .talkContain .talkItem .talkInfoContain audio{
        max-width: 80%;
    }
    .groupTalkPage .talkContain .talkItem .talkInfoContain .nameAndTime{
        display: flex;
        height: 36px;
        line-height: 36px;
        color: #343434;
    }   
    .groupTalkPage .talkContain .talkItem .talkInfoContain .nameAndTime .name{
        font-size: 30px;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .groupTalkPage .talkContain .talkItem .talkInfoContain .nameAndTime .time{
        font-size: 22px;
        color: #666;
        text-align: right;
        
    }
    .groupTalkPage .talkContain .talkItem .talkInfoContain .talkContent{
        font-size: 24px;
        color: #666;
        padding: 10px 0;
        white-space: pre-wrap;
        word-break: break-all;

    }
    .groupTalkPage .talkContain .talkItem .talkInfoContain .talkContent.talkUrl{
        color: #1377ff;
    }
    .groupTalkPage .pageTitle{
        text-align: center;
        width: 100%;
        height: 90px;
        line-height: 90px;
        font-size: 36px;
        background-color: #FFFFFF;
        background-image: url(../../assets/img/community/back.png);
        background-size: 36px 36px;
        background-position: 5% 50%;
        background-repeat: no-repeat;
        color: black;
        position:fixed;
        top: 0px;
        border-bottom: 1px solid #eeeeee;/*no*/
        
    }

    .groupTalkPage .pageTitle .goBackBtn{
        width: 40px;
        height: 40px;
       
        position: absolute;
        top:22px;
        left: 36px;
    }

    .groupTalkPage .addNotice{
        color: #666;
        font-size: 20px;
        text-align: center;
        position: fixed;
        width: 100%;
        bottom: 120px;
        margin-bottom: 10px;
    }

    .groupTalkPage .btn{
       
        height: 80px;
        line-height: 80px;
        
        font-size: 32px;
        text-align: center;
        border-radius: 10px;
        width: 90vw;
        
        position: fixed;
        bottom: 40px;
        left: 5vw;
    }

    .groupTalkPage .start{
        background: #ef4454;
        border:1px solid #ef4454;/*no*/
        color: #fff;
    }

    .groupTalkPage .joined{
        border:1px solid #ef4454;/*no*/
        color: #ef4454;
    }

    .groupTalkPage .failed{
       
        border:1px solid #a5a5a5;/*no*/
        color: #a5a5a5;
    }

    .groupTalkPage .applying{
         border:1px solid #fe9901;/*no*/
         color: #fe9901;
    }
    
</style>


