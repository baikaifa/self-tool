<template>
    <section class="groupDetailPage">
        <tit :bak="true"></tit>
        <section class="groupBaseInfoContain">
            <section class="groupBaseInfo">
                <div class="avatarContain">
                    <img :src="groupData.groupAvatar"/>
                </div>
                <div class="baseInfo">
                    <div class="groupTitle">{{groupData.groupName}}</div>
                    <div class="groupOwner">群主：{{groupData.ownerName}}</div>
                </div>
            </section>
            <section class="groupNoticeContain" style="display:none;">
                <div class="groupNoticeTilte">群公告</div>
                <div class="groupNotice">
                   超级大乐透开奖结果<br> 本期一等奖：3注，每注10,000,000元<br/>本期二等奖：97注，每注441,006元
                </div>
            </section>
        </section>
        <section class="groupAttrContain">
            <section class="groupAttr">群标签：{{groupData.labelNames}}</section>
            <section class="groupAttr">群分类：{{groupData.classifyNames}}</section>
        </section>
        <section class="groupMemberContain">
            <div class="groupMemberTitle">群成员：<span>{{groupData.memberNum}}</span>人</div>
            <div class="memberAvatarContain">
                <div v-for="item in groupData.members" class="avatarItem">
                    <img :src="item.memberAvatar"/>
                    <div>{{item.memberName}}</div>
                </div>
                <div @click="goToGroupMemberList(groupData.groupId)" class="avatarItem">
                    <img src="../../assets/img/community/more.png"/>
                    <div></div>
                 </div>
            </div>
        </section>
        <section class="gotoGroupTalkBtn" @click="gotoGroupTalk(groupData.groupId)">
            <div class="btnContain">
                <div class="btnTxt">群聊</div>
                <img class="btnIcon" src="../../assets/img/community/arrow_next.png"/>
            </div>
            
        </section>
        <div @click="joinGroup(groupData)" :class="['btn',btnClassMap[joinGroupStatus]]">{{btnTxtMap[joinGroupStatus]}}</div>

        <groupPopApplySuccess ref="ApplySuccessPop"></groupPopApplySuccess>
        
        <groupPopBindWx ref="BindWxPop"></groupPopBindWx>

        <groupPopAddRobot 
        ref="addRobotPop"
        :addRobotInfo="addRobotInfo"
        ></groupPopAddRobot>

    </section>
</template>
<script>
import {reqGroup} from "../../utils/request";
import groupPopAddRobot from "../../components/group/groupPop_addRobot"
import groupPopBindWx from "../../components/group/groupPop_bindWx"
import groupPopApplySuccess from "../../components/group/groupPop_applySuccess"
import tit from "../../components/title/title"

export default {
    data(){
        return {
           groupId:"",
           btnClassMap:['failed','start','joined','applying'],
           btnTxtMap:['群已满','加入','已加入','已申请'],
           groupData:{
               labelNames:""
           },
           joinGroupStatus:0,
           popShow:{
                applyShow:false,
                addMaskShow:false,
                bindWxShow:false,
            },
            addRobotInfo:{
                qrCode:"",
                robotId:"",
                robotAlias:"" 
            },
        }
    },
    components:{groupPopAddRobot,groupPopBindWx,groupPopApplySuccess,tit},
    created(){
        this.groupId=this.$route.query.groupId;
        this.getGroupDetail();
    },
    methods:{
        getGroupDetail(){
            reqGroup.groupDetail({"groupId":this.groupId}).then((res)=>{
                if(res.code==200){
                    var data=res.data;
                    for(var i in data){
                        this.groupData[i]=data[i];
                    }
                    if(this.groupData.memberNum>=500){
                        this.groupData.joinGroupStatus=0;
                    }
                    this.groupData.labelNames=this.groupData.labelNames.join(",");
                    this.groupData.classifyNames=this.groupData.classifyNames.join(",");
                    this.joinGroupStatus=this.groupData.joinGroupStatus;
                }else{
                    alert(res.message);
                }
            });
        },
        joinGroup(item){
            //item.joinGroupStatus=1;

            for(let i in this.popShow){
                this.popShow[i]=false;
            }
            this.$refs.ApplySuccessPop.applyShow=this.popShow.applyShow;
            this.$refs.BindWxPop.bindWxShow=this.popShow.bindWxShow;
            this.$refs.addRobotPop.addMaskShow=this.popShow.addMaskShow;
            
            for(let i in this.addRobotInfo){
                this.addRobotInfo[i]="";
            }

            if(item.joinGroupStatus==1){
                var groupId=item.groupId;
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
        goToGroupMemberList(groupId){
            this.$router.push({
                "name":"groupMemberList",
                "query":{
                    "groupId":groupId
                }
            });
        },
        gotoGroupTalk(groupId){
            this.$router.push({
                "name":"groupTalkPage",
                "query":{
                    "groupId":groupId
                }
            });
        }
    }
}
</script>

<style>
    .groupDetailPage{
        height: 100vh;
        background:#f5f5f5;
    }

    .groupDetailPage .app_head{
        background: #fff;
    }

    .groupDetailPage .gotoGroupTalkBtn{
        width: 100%;
        margin-top:20px;
        height: 100px;
        
        display: flex;
        align-items: center;
        background: #fff;
        
    }

    .groupDetailPage .gotoGroupTalkBtn .btnContain{
        width: 90vw;
        margin:0 auto;
        display: flex;
        font-size: 32px;
        justify-content: space-between;
        align-items: center;
    }

    

    .groupDetailPage .gotoGroupTalkBtn .btnIcon{
        width: 35px;
        height: 35px;
    }

    .groupDetailPage .btn{
        
        height: 80px;
        line-height: 80px;
        
        font-size: 32px;
        text-align: center;
        border-radius: 10px;
        width: 90vw;
        
        position: fixed;
        bottom: 100px;
        left: 5vw;
    }

    .groupDetailPage .start{
        background: #ef4454;
        border:1px solid #ef4454;/*no*/
        color: #fff;
    }
    .groupDetailPage .applying{
        border:1px solid #fe9901;/*no*/
        color: #fe9901;
    }
    .groupDetailPage .btn.failed{
         border:1px solid #a5a5a5;/*no*/
         color: #a5a5a5;
    }

    .groupDetailPage .joined{
         border:1px solid #ef4454;/*no*/
         color: #ef4454;
    }

    .groupDetailPage .groupBaseInfoContain{
        background:#fff;
        margin-top:20px;
    }

    .groupDetailPage .groupMemberContain{
        margin-top:20px;
        background:#fff;
        height: 240px;
    }

    .groupDetailPage .groupMemberTitle{
        width: 90vw;
        margin:0 auto;
        height: 80px;
        line-height: 80px;
        font-size: 32px;
    }

    .groupDetailPage .memberAvatarContain{
        width: 90vw;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }

    .groupDetailPage .memberAvatarContain .avatarItem{
        
        display: flex;
        flex-direction: column;
    } 

    .groupDetailPage .memberAvatarContain .avatarItem img{
        width: 78px;
        height: 78px;
        border-radius: 50px;
    }
    .groupDetailPage .memberAvatarContain .avatarItem div{
        width: 78px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .groupDetailPage .groupMemberTitle span{
        color: #ef4454;
    }

    .groupDetailPage .groupAttrContain{

        background: #fff;
        margin-top: 20px;
        
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .groupDetailPage .groupAttrContain .groupAttr{
        width: 90vw;
        display: flex;
        align-items: center;
        font-size: 32px;
        padding:20px 0 20px 0;
    }

    .groupDetailPage .groupAttrContain .groupAttr:last-child{
       
        border-top:1px solid #e4e4e4;/*no*/
    }

    .groupDetailPage .groupBaseInfoContain .groupBaseInfo{
        width: 90vw;
        height: 150px;
       
        margin:0 auto;
        display: flex;
    }
    .groupDetailPage .groupBaseInfoContain .groupNoticeContain{
        width: 90vw;
        margin:0 auto;
    }
    .groupDetailPage .groupBaseInfoContain .groupNoticeContain .groupNoticeTilte{
        height: 80px;
        line-height: 80px;
        font-size: 32px;
    }
    .groupDetailPage .groupBaseInfoContain .groupNoticeContain .groupNotice{
        color: #666;
        font-size: 28px;
        line-height: 32px;
        padding-bottom: 30px;
    }
    .groupDetailPage .groupBaseInfoContain .groupBaseInfo .avatarContain{
        display: flex;
        width: 117px;
        align-items: center;
        justify-content: flex-start;
    }
    .groupDetailPage .groupBaseInfoContain .groupBaseInfo .avatarContain img{
        width: 90px;
        height: 90px;
        border-radius: 10px;
    }

    .groupDetailPage .groupBaseInfoContain .groupBaseInfo .baseInfo{
        display: flex;
        flex-direction: column;

    }

    .groupDetailPage .groupBaseInfoContain .groupBaseInfo .baseInfo .groupTitle{
        flex:1;
        font-size: 32px;
        display: flex;
        align-items: flex-end;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .groupDetailPage .groupBaseInfoContain .groupBaseInfo .baseInfo .groupOwner{
        flex: 1;
        font-size: 28px;
        color: #666;
    }
</style>


