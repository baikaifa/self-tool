<!--社群列表-->
<template>
    <section class="groupListPage" ref="groupListPage">
		<eleTit hasBothMenu="true">
            <div slot="app_tit_left"><div @click="gotoAddPage" class="addBtn"></div></div>
            <div slot="app_tit_righ"><div @click="gotoSearchPage" class="searchBtn"></div></div>
        </eleTit>
         <!-- <section class="pageTitle">
            <div @click="gotoAddPage" class="addBtn"></div>
            社群
            <div @click="gotoSearchPage" class="searchBtn"></div>
        </section>  -->
        <section class="groupTagContain" >
            <div class="groupTagPanel">
                <div v-for="item in groupTagList" @click.stop="getGroupByTab(item)" :class="['tagItem',item.type==query.classifyType?'cur':'']">{{item.name}}</div>        
            </div>          

        </section>
        <!--<section class="bar"></section>-->
        <section class="groupTypeContain" style="display:none;">
            <div class="groupTypeItem cur">吃喝玩乐群</div>
            <div class="groupTypeItem">宠物生活</div>
            <div class="groupTypeItem">校园</div>
            <div class="groupTypeItem">社区</div>
        </section>
        
        <section class="groupListContain">
            <scroller :on-refresh="refreshList" :on-infinite="loadMoreList" ref="myScroller" :noDataText="noDaTxt">
            <div v-for="(item,itemIndex) in list" @click.stop="goToGroupDetail(item)" class="groupListItem" 
            :style="itemIndex==0?styleObj1:{}">
                <div class="imgContain">
                    <img :src="item.groupAvatar"/>
                </div>
                <div class="infoContain">
                    <div class="infoItem">
                        <div class="groupTitle">
                            <img v-if="item.groupType==1" src="../../assets/img/community/wx.png"/>
                            <img v-if="item.groupType==2" src="../../assets/img/community/qq.png"/>
                            {{item.groupName}}
                        </div>
                        <div class="itemTagContain">
                            
                            <div v-for="(tag,tagIndex) in item.groupLabelAry" :class="'bg'+(tagIndex+1)">
                                {{tag}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnContain" :style="itemIndex==0?styleObj2:{}" @touchmove.prevent>
                    <div @click.stop="joinGroup(item)" :class="['btn',btnClassMap[item.joinGroupStatus]]">
                        <div>{{btnTxtMap[item.joinGroupStatus]}}</div>
                    </div>
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
            styleObj1:{
                height: "2.32rem",
                "border-bottom": "1px solid #eeeeee",
                display: "flex",
                "align-items": "center"
            },
            styleObj2:{
                height: "100%",
                width: "2.533333rem",
                display: "flex",
                "align-items": "center",
                "justify-content": "center"
            },
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
    beforeRouteLeave(to,from,next){//记录离开时的位置
	 	sessionStorage.groupListScrollerTop = this.$refs.myScroller && this.$refs.myScroller.getPosition() && this.$refs.myScroller.getPosition().top;
	 	next()
    },
    beforeRouteEnter(to,from,next){
        next(vm => {
	 		if(from.path == '/groupDetail' || from.path == "/groupSearch"){
	 			var scrollToPosition = sessionStorage.groupListScrollerTop
	 			setTimeout(function () {
	 				vm.$refs.myScroller.scrollTo(0, scrollToPosition, false);
	 			}, 500) 
	 		}else{
	 			sessionStorage.scrollToPosition = ''
	 		}
	 	})
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
                            item.groupType=data[i].groupType;
                            var memberLable="";
                            if(memberNum>=500){
                                memberLable="群已满";
                                item.joinGroupStatus=0;
                            }else{
                                memberLable=memberNum+'人';
                            }
                            item.groupLabelAry=[];
                            item.groupLabelAry.push(memberLable);
                            item.groupLabelAry=item.groupLabelAry.concat(data[i].labelNames);
                            if(item.groupLabelAry.length>4){
                                item.groupLabelAry=item.groupLabelAry.slice(0,3);
                            }
                            var newarr = []
                            item.groupLabelAry.forEach(e=>{
                                var e = String(e)
                                e=e.length>6?newarr.push(e.slice(0,5)+'...'):newarr.push(e);
                            })
                            
                           item.groupLabelAry = newarr;
                           //item.groupLabelAry[0]=item.groupLabelAry[0]
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
        },
        gotoAddPage(){
            this.$router.push({
                name:"applyCooperation",
                
            });
        }
    }
}
</script>
<style type="text/css">

    
    .groupListPage .pageTitle{
        text-align: center;
        width: 100%;
        height: 90px;
        line-height: 90px;
        font-size: 36px;
        background-color: #FFFFFF;
        
        color: black;
        /* position:fixed;
        top: 40px; */
        
    }
    

    .groupListPage .app_head .addBtn{
        /* position: absolute; */
        width: 40px;
        height: 40px;
        margin:0 auto;
        background-image: url(../../assets/img/community/add.png);
        background-size: 36px 36px;
        background-position: 2px 2px;
        background-repeat: no-repeat;
    }
    .groupListPage .app_head .searchBtn{
      /*   position: absolute;*/
        width: 40px;
        height: 40px;
        margin:0 auto;
        background-image: url(../../assets/img/community/groupList_searchIcon.png);
        background-size: 36px 36px;
        background-position: 2px 2px;
        background-repeat: no-repeat;
    }

    .groupListPage .groupTagContain{
        width: 750px;
        margin-top:20px;
        border-top:1px solid #eee;/*no*/
        /* margin-top:130px; */
    }

    .groupListPage  .groupTagPanel{
        height: 68px;
        /*line-height: 68px;*/
        display: flex;
        align-items: center;
        background-color: #FFFFFF;
        overflow-x: scroll;
        overflow-y:hidden;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
        border-bottom: 8px solid #f3f3f3;
    }

    .groupListPage  .groupTagPanel .tagItem{
        display: inline-block;
        padding:0 10px;
        margin:0 10px;
        color: #999;
        font-size: 30px;
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
        top:170px;
        /*position: fixed;*/
        overflow: hidden;
        box-sizing: border-box;
        background-color: #fff;
        z-index:-1;
    }

    .groupListPage .groupListContain .groupListItem{
        height: 174px;
        border-bottom: 1px solid #eeeeee;/*no*/
        display: flex;
        align-items: center;
    }

    .groupListPage .groupListContain .groupListItem .imgContain{
        height: 100%;
        width: 145px;
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
        
        font-size: 32px;
        height: 34px;
        line-height: 34px;
        padding-bottom: 13.5px;  
        max-width: 400px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #343434;

    }

    .groupListPage .groupListContain .groupListItem .infoContain .groupTitle img{
        height: 32px;
        position: relative;
        bottom: 1px;
    }

    .groupListPage .groupListContain .groupListItem .infoContain .itemTagContain{
        font-size: 24px;
        display: flex;
        
    }
    .groupListPage .groupListContain .groupListItem .infoContain .itemTagContain div{
        font-size: 24px;
        padding: 0 5px;
        margin:0 5px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        border-radius: 5px;
        /*display: flex;
        justify-content: center;
        align-items: center;*/
        
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
        width: 190px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .groupListPage .btn{
        width: 150px;
        height: 55px;
        /*line-height: 55px;*/
        text-align: center;
        border-radius: 30px;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        font-size: 24px;
        background: #8198c9;
        min-width: 75px;
        text-align: center;
    }
    
    .groupListPage .bg2{
        background: #ff9abc;
        text-align: center;
    }
    
    .groupListPage .bg3{
        background: #6bd4cf;
        text-align: center;
    }
    
    .groupListPage .bg4{
        background: #f5bd8f;
        text-align: center;
    }
    
    .groupListPage .bg5{
        background: #c0a5f4;
        text-align: center;
    }
    
    .groupListPage .bg6{
        
        background: #90cff8;
        text-align: center;
    }
    
</style>


