<!--社群列表-->
<template>
    <section class="groupListPage" ref="groupListPage">
		<!--<eleTit>
			
            <slot name="app_tit_righ"><div @click="gotoSearchPage" class="searchBtn"></div></slot>
            
        </eleTit>-->
         <section class="pageTitle">
            社群
            <div @click="gotoSearchPage" class="searchBtn"></div>
        </section> 
        <section class="groupTagContain" >
            <div class="groupTagPanel">
                <div v-for="item in groupTagList" @click="getGroupByTab(item)" :class="['tagItem',item.type==query.classifyType?'cur':'']">{{item.name}}</div>        
            </div>          

        </section>
        <section class="bar"></section>
        <section class="groupTypeContain" style="display:none;">
            <div class="groupTypeItem cur">吃喝玩乐群</div>
            <div class="groupTypeItem">宠物生活</div>
            <div class="groupTypeItem">校园</div>
            <div class="groupTypeItem">社区</div>
        </section>
        
        <section class="groupListContain">
            <scroller :on-refresh="refreshList" :on-infinite="loadMoreList" ref="myScroller" :noDataText="noDaTxt">
            <div v-for="item in list" @click="goToGroupDetail(item)" class="groupListItem">
                <div class="imgContain">
                    <img :src="item.groupAvatar"/>
                </div>
                <div class="infoContain">
                    <div class="infoItem">
                        <div class="groupTitle">
                            {{item.groupName}}
                        </div>
                        <div class="itemTagContain">
                            
                            <div v-for="(tag,tagIndex) in item.groupLabelAry" :class="'bg'+(tagIndex+1)">
                                <i v-if="tagIndex==0" class="iconfont iconren"></i>{{tag}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnContain">
                    <div @click.stop="joinGroup(item)" :class="['btn',btnClassMap[item.joinGroupStatus]]">{{btnTxtMap[item.joinGroupStatus]}}</div>
                </div>
            </div>
            
            </scroller>
            <div></div>
        </section>
        
        
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
import eleTit from "@/components/title/title";

export default {
    data(){
        return {
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
            
            query:{
                pageNum:0,
                pageSize:10,
                searchName:"",
                classifyType:-1
            },
            groupTagList:[
                {
                    "name":"全部",
                    "type":-1
                }
            ],
            list:[],
            applyMask:false,
            isShowLoad:false,
            noDaTxt:"没有更多的数据了~",
            btnClassMap:['failed','start','joined','applying'],
            btnTxtMap:['群已满','加入','已加入','已申请'],
            noData:false,
            tagClicked:false
        }
    },
    components:{groupPopAddRobot,groupPopBindWx,groupPopApplySuccess,dataLoading,eleTit},
    created(){
        this.getGroupTagList(); // 获取社群分类
    },
    methods:{
        getGroupList(done){ // 获取社群列表
            //this.isShowLoad=true;
            reqGroup.groupList(this.query).then((res)=>{
                if(res.code==200){
                        /*setTimeout(()=>{
                            this.isShowLoad=false;
                        },500);  */   
                       
                        /*if(this.query.classifyType==10){
                            data=[];
                        }*/

                        this.$refs.myScroller.finishPullToRefresh();
                        
                        var data=res.data;

                        if(data.length<=0){
                            this.$refs.myScroller.finishInfinite(true);
                            return;                        
                        }
                        
                        for(var i=0;i<data.length;i++){
                            var item={};
                            item.groupAvatar=data[i].groupAvatar;
                            item.groupId=data[i].groupId;
                            item.groupName=data[i].groupName;
                            item.joinGroupStatus=data[i].joinGroupStatus;
                            var memberNum=data[i].memberNum;
                            var memberLable="";
                            if(memberNum>=500){
                                memberLable="群已满";
                                item.joinGroupStatus=0;
                            }else{
                                memberLable=memberNum;
                            }
                            item.groupLabelAry=[];
                            item.groupLabelAry.push(memberLable);
                            item.groupLabelAry=item.groupLabelAry.concat(data[i].labelNames);
                            if(item.groupLabelAry.length>4){
                                item.groupLabelAry=item.groupLabelAry.slice(0,3);
                            }
                            
                            this.list.push(item);
                        }

                        this.noData=res.pageNo==res.totalPage?true:false;
                        this.noDaTxt="没有更多的数据了~";
                        if(done){
                           
                            done();
                        }
                        
                }else{
                    alert(res.message);
                }
            });
        },
        getGroupTagList(){ // 获取tag列表
            reqGroup.groupTagList().then((res)=>{
                if(res.code==200){
                    this.groupTagList=this.groupTagList.concat(res.data);                    
                }else{
                    alert(res.message);
                }
            });
        },
        refreshList(){ // 上拉刷新
            
            this.list=[];
            this.query.pageNum=1;
            this.getGroupList();
            
        },
        loadMoreList(done){ // 下拉加载
            if(this.noData){
                this.noDaTxt="没有更多的数据了~"
                this.$refs.myScroller.finishInfinite(true);
            }else{
                this.query.pageNum++;
                this.getGroupList(done);
            }
           
        },
        getGroupByTab(item){ // 群分类点击事件

            this.noDaTxt="";

            if(this.$refs.myScroller){
                this.$refs.myScroller.finishInfinite(false);
            }
            
            this.list=[];
            this.query.classifyType=item.type;
            if(!this.tagClicked){
                this.query.pageNum=0;
                this.tagClicked=true;
            }else{
                this.query.pageNum=1;
                this.getGroupList();
            }
            
            
            
            //this.getGroupList();
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
                                item.joinGroupStatus=3;
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
        goToGroupDetail(item){
            this.$router.push({
                name:"groupDetail",
                query:{
                    groupId:item.groupId
                }
            });
        },
        gotoSearchPage(){
            this.$router.push({
                name:"groupSearch",
                
            });
        }
    }
}
</script>
<style>

    .tempBottm{
        height: 100px;
        border-top: 1px solid black;/*no*/
        width: 100%;
        position: fixed;
        bottom: 0;
        background: #fff;
    }
    .groupListPage .pageTitle{
        text-align: center;
        width: 100%;
        height: 90px;
        line-height: 90px;
        font-size: 36px;
        background-color: #FFFFFF;
        background-image: url(../../assets/img/community/groupList_searchIcon.png);
        background-size: 36px 36px;
        background-position: 95% 50%;
        background-repeat: no-repeat;
        color: black;
        position:fixed;
        top: 0px;
        
    }
    .groupListPage .pageTitle .searchBtn{
        position: absolute;
        width: 40px;
        height: 40px;
        top:25px;
        right: 35px;
       
    }

    .groupListPage .groupTagContain{
        width: 100%;
        margin-top:1.2rem;
    }

    .groupListPage  .groupTagPanel{
        height: 68px;
        line-height: 68px;
        
        background-color: #FFFFFF;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
    }

    .groupListPage  .groupTagPanel .tagItem{
        display: inline-block;
        padding:0 10px;
        margin:0 10px;
        color: #999;
        font-size: 28px;
    }

    .groupListPage  .groupTagPanel .tagItem.cur{
        color: #ef4454;
    }

    .groupListPage .groupTypeContain{
        height: 86px;
        display:flex;
        font-size: 24px;
        align-items: center;
        justify-content: space-around;
        padding:0 40px;
    }

    .groupListPage .groupTypeContain .groupTypeItem{
        flex:1;
        height: 50px;
        line-height: 50px;
        border: 1px solid #ccc;/*no*/
        border-radius: 50px;
        text-align: center;
        margin: 0 10px;
        max-width: 150px;
        color: #999;
    }

    .groupListPage .groupTypeContain .groupTypeItem.cur{

        color: black;

    }

    .groupListPage .bar{
        height: 8px;
	    background:#f3f3f3;
    }

    .groupListPage .groupListContain{
        padding-bottom: 100px;
        width: 100vw;
        height: fill-available;
        height: -webkit-fill-available;
        position: fixed;
        bottom: 100px;
        top:166px;
        /*position: fixed;*/
        overflow: hidden;
        box-sizing: border-box;
        background-color: #fff;
    }

    .groupListPage .groupListContain .groupListItem{
        height: 174px;
        border-bottom: 1px solid #e4e4e4;/*no*/
        display: flex;
        align-items: center;
    }

    .groupListPage .groupListContain .groupListItem .imgContain{
        height: 100%;
        width: 150px;
        display:flex;
        align-items: center;
        justify-content: center;

    }

    .groupListPage .groupListContain .groupListItem .imgContain img{
        width: 105px;
        height: 105px;
        border-radius: 10px;
    }

    .groupListPage .groupListContain .groupListItem .infoContain{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    

    .groupListPage .groupListContain .groupListItem .infoContain .groupTitle{
        
        font-size: 34px;
       
        padding-bottom: 10px;  
        max-width: 400px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #343434;

    }

    .groupListPage .groupListContain .groupListItem .infoContain .itemTagContain{
        
        display: flex;
        
    }
    .groupListPage .groupListContain .groupListItem .infoContain .itemTagContain div{
        font-size: 20px;
        padding: 0 5px;
        margin:0 5px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        border-radius: 5px;
        
    }
    .groupListPage .groupListContain .groupListItem .infoContain .itemTagContain  i{
        margin-right: 4px;
        margin-top:1px;
    }

    .groupListPage .groupListContain .groupListItem .infoContain .itemTagContain div:first-child{
        margin-left: 0px;

    }

    .groupListPage .groupListContain .groupListItem .btnContain{
        height: 100%;
        width: 170px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .groupListPage .btn{
        width: 150px;
        height: 55px;
        line-height: 55px;
        text-align: center;
        border-radius: 30px;
        font-size: 26px;
    }

    .groupListPage .start{
        background: #ef4454;
        border:1px solid #ef4454;/*no*/
        color: #fff;
    }

    .groupListPage .joined{
        border:1px solid #ef4454;/*no*/
        color: #ef4454;
    }

    .groupListPage .failed{
       
        border:1px solid #a5a5a5;/*no*/
        color: #a5a5a5;
    }

    .groupListPage .applying{
         border:1px solid #fe9901;/*no*/
         color: #fe9901;
    }

    .groupListPage .bg1{
        background: #8198c9;
        min-width: 75px;
        text-align: center;
    }
    
    .groupListPage .bg2{
        background: #ff9abc;
    }
    
    .groupListPage .bg3{
        background: #6bd4cf;
    }
    
    .groupListPage .bg4{
        background: #f5bd8f;
    }
    
    .groupListPage .bg5{
        background: #c0a5f4;
    }
    
    .groupListPage .bg6{
        
        background: #90cff8;
    }
    
</style>


