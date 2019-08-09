<template>
    <div class="groupSearchPageContain">
        
        <div class="searchPanel" :class="{pcPaddingTop:sys_env=='pc'}">
            <div class="searchContain">
                <div class="backBtn" @click="goBak"></div>
                <div class="searchInputContain">
                    <div class="findIcon"></div>
					<input type='text' @input="inputFun" ref="searchInput" v-model="query.searchName" placeholder="" />	
                    <div v-if="showClose" @click="clearInput" class="closeIcon"></div>			
                </div>
                <div @click="searchGroup" class="searchBtn">搜索</div>
            </div>
        </div>
        <div class="searchHistoryContain" :class="{pcTop:sys_env=='pc'}" v-if="showHistory">
            <div class="title" v-if="titleShow">
                <div class="searchTitleTxt">搜索历史</div>
                <img @click="clearSearchHistory" src="../../assets/img/community/deleteIcon.png"/>
            </div>
            <div class="historyTagContain">
                
                <div @click="searchByTag(item)" v-for="item in historyTagList" class="historyTag">
                    {{item}}
                </div>
              
            </div>
        </div>
        <section class="groupListContain" :class="{pcTop:sys_env=='pc'}" v-if="!showHistory">
            <scroller :on-refresh="refreshList" :on-infinite="loadMoreList" ref="myScroller" :noDataText="noDaTxt">
            <div v-for="item in list" @click="goToGroupDetail(item)" class="groupListItem">
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
                                
                                <i v-if="tagIndex==0" class="iconfont iconren"></i>{{tag}}
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnContain">
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
    </div>
    
</template>
<script scoped="scoped" type="text/css">
import {reqGroup} from "../../utils/request";
import tit from "../../components/title/title"
import groupPopAddRobot from "../../components/group/groupPop_addRobot"
import groupPopBindWx from "../../components/group/groupPop_bindWx"
import groupPopApplySuccess from "../../components/group/groupPop_applySuccess"
import dataLoading from "../../components/dataLoading"

export default {
    data(){
        return {
            sys_env: this.sysEnv,
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
                pageSize:20,
                searchName:"",
                classifyType:-1
            },
            
            list:[],
            isShowLoad:false,
            noDaTxt:"没有更多的数据了~",
            btnClassMap:['failed','start','joined','applying'],
            btnTxtMap:['群已满','加入','已加入','已申请'],
            noData:false,
            firstCome:true,
            showHistory:true,
            historyTagList:[],
            titleShow:true,
            showClose:false
        }
    },
    components:{groupPopAddRobot,groupPopBindWx,groupPopApplySuccess,dataLoading,tit},
    created(){
        var groupSearchHistory=localStorage.getItem("groupSearchHistory");
        if(groupSearchHistory){
            this.historyTagList=groupSearchHistory.split(",");
        }
        if(this.historyTagList.length<=0){
            this.titleShow=false;
        }
    },
    mounted(){
        this.$refs.searchInput.focus()
    },
    methods:{
      getGroupList(done){ // 获取社群列表
            //this.isShowLoad=true;
            reqGroup.groupList(this.query).then((res)=>{
                if(res.code==200){
                        /*setTimeout(()=>{
                            this.isShowLoad=false;
                        },500);    */ 
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
                            item.groupType=data[i].groupType;
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

                        if(done){
                            done();
                        }
                        
                }else{
                    alert(res.message);
                }
            });
        },
        inputFun(){
            if(this.query.searchName){
                
                
                this.showClose=true;
                
            }
        },
        searchByTag(val){
            this.showClose=true;
            if(this.$refs.myScroller){
                this.$refs.myScroller.finishInfinite(false);
            }
            this.showHistory=false;
            this.firstCome=false;
            this.list=[];
            this.query.pageNum=0;  
            this.query.searchName=val;
        },
        searchGroup(){
            if(this.$refs.myScroller){
                this.$refs.myScroller.finishInfinite(false);
            }
            
            if(!this.query.searchName){
                alert("请输入搜索条件");
                return;
            }
            if(this.historyTagList.length>10){
                this.historyTagList.pop();
            }
           
            for(var i=0;i<this.historyTagList.length;i++){
                if(this.historyTagList[i]==this.query.searchName){
                   this.historyTagList.splice(i,1);
                }
            }
            this.historyTagList.unshift(this.query.searchName);
            localStorage.setItem("groupSearchHistory",this.historyTagList);
            
            this.showHistory=false;
            this.firstCome=false;
            this.list=[];
            this.query.pageNum=1;     
            this.getGroupList();      
            //this.$refs.myScroller.finishInfinite(false);
        },
        refreshList(){ // 上拉刷新
            this.list=[];
            this.query.pageNum=1;
            this.getGroupList();
        },
        loadMoreList(done){ // 下拉加载


            if(this.firstCome){
                
                this.$refs.myScroller.finishInfinite(false);
            }else{
                if(this.noData){
                    
                    this.$refs.myScroller.finishInfinite(true);
                }else{
                    this.query.pageNum++;
                    this.getGroupList(done);
                }
            }
        },
        clearSearchHistory(){
            this.historyTagList=[];
            localStorage.setItem("groupSearchHistory","");
        },
        clearInput(){
            this.query.searchName="";
            this.showClose=false;
            
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
                        applyStatus=1;
                        switch (applyStatus.toString()){
                            case "1":
                                this.popShow.applyShow=true;
                                this.$refs.ApplySuccessPop.applyShow=this.popShow.applyShow;
                                //item.joinGroupStatus=3;
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
        goBak(){
            this.$router.go(-1);
        }
    }
}
</script>
<style>

.groupSearchPageContain .searchHistoryContain{
    position: fixed;
    top:170px;
    width: 100%;
    
}




.groupSearchPageContain .searchHistoryContain .historyTagContain{
    display: flex;
    
    flex-wrap: wrap;
   
    
}

.groupSearchPageContain .searchHistoryContain .historyTagContain .historyTag{

    padding: 0 40px;
    border-radius: 50px;
    background: #f8f8f8;
    height: 66px;
    line-height: 66px;
    margin-left: 30px;
    margin-top:30px;
    color: #343434;

}



.groupSearchPageContain .searchHistoryContain .title{
    display: flex;
    padding:0 30px;
    justify-content: space-between;
    align-items: center;
    color: #343434;
}

.groupSearchPageContain .searchHistoryContain .title .searchTitleTxt{
    font-size: 28px;
}

.groupSearchPageContain .searchHistoryContain .title img{
    width: 28x;
    height: 28px;
}

.groupSearchPageContain .searchPanel{
    width: 100%;
    height: auto;
    background: #fff;
    padding-top:40px;
}

.groupSearchPageContain .pcPaddingTop{
    padding-top:0px;
}

.groupSearchPageContain .searchPanel .searchContain{
    width: 750px;
	padding-top: 20px;
	background-color: #FFFFFF;
    overflow: hidden;
}

.groupSearchPageContain .searchPanel .backBtn{
    float: left;
	margin-top: 15px;
	margin-left: 20px;
	width: 20px;
	height: 34px;
	overflow: hidden;
	background-image: url(../../assets/img/bak.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}

.groupSearchPageContain .searchPanel .searchContain .searchInputContain{
    float: left;
	margin-left: 16px;
	width: 570px;
	height: 64px;
	overflow: hidden;
	background-color: #F3F3F3;
	border-radius: 32px;
	-webkit-border-radius: 32px;
    position: relative;
}



.groupSearchPageContain .searchPanel .findIcon{
    position: absolute;
	left: 20px;
	top: 16px;
	width: 32px;
	height: 32px;
	overflow: hidden;
	background-image: url(../../assets/img/search_bg.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}

.groupSearchPageContain .searchPanel .closeIcon{
    position: absolute;
	right: 20px;
	top: 16px;
	width: 32px;
	height: 32px;
	overflow: hidden;
	background-image: url(../../assets/img/community/close.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}

.groupSearchPageContain .searchPanel input{
    width: 70%;
	height: 64px;
	line-height: 64px;
	font-size: 28px;
	padding-left:80px;
    border:none;
}

.groupSearchPageContain .searchBtn{
    float: left;
	height:64px;
	/* line-height:64px; */
	padding:0px 20px 0 20px;
	color:#6a6a6a;
	font-size:28px;
	display:flex;
	align-items: center;
}


    .groupSearchPageContain .pageTitle{
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

    .groupSearchPageContain .groupTagContain{
        width: 100%;
        margin-top:1.2rem;
    }

    .groupSearchPageContain  .groupTagPanel{
        height: 68px;
        line-height: 68px;
        
        background-color: #FFFFFF;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
    }

    .groupSearchPageContain  .groupTagPanel .tagItem{
        display: inline-block;
        padding:0 10px;
        margin:0 10px;
        color: #999;
        font-size: 28px;
    }

    .groupSearchPageContain  .groupTagPanel .tagItem.cur{
        color: #ef4454;
    }

    .groupSearchPageContain .groupTypeContain{
        height: 86px;
        display:flex;
        font-size: 24px;
        align-items: center;
        justify-content: space-around;
        padding:0 40px;
    }

    .groupSearchPageContain .groupTypeContain .groupTypeItem{
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

    .groupSearchPageContain .groupTypeContain .groupTypeItem.cur{

        color: black;

    }

    .groupSearchPageContain .bar{
        height: 8px;
	    background:#f3f3f3;
    }

    .groupSearchPageContain .groupListContain{
        width: 100vw;
        height: fill-available;
        height: -webkit-fill-available;
        position: fixed;
        top:170px;
        overflow: hidden;
        box-sizing: border-box;
        background-color: #fff;
    }

    .groupSearchPageContain .groupListContain .groupListItem{
        height: 174px;
        border-bottom: 1px solid #eeeeee;/*no*/
        display: flex;
        align-items: center;
    }

    .groupSearchPageContain .groupListContain .groupListItem .imgContain{
        height: 100%;
        width: 145px;
        display:flex;
        align-items: center;
        justify-content: center;

    }

    .groupSearchPageContain .groupListContain .groupListItem .imgContain img{
        width: 105px;
        height: 105px;
        border-radius: 10px;
    }

    .groupSearchPageContain .groupListContain .groupListItem .infoContain{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .groupSearchPageContain .groupListContain .groupListItem .infoContain .groupTitle{
        
        font-size: 32px;
        height: 32px;
        line-height: 32px;
        padding-bottom: 20px;  
        max-width: 400px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        

    }

    .groupSearchPageContain .groupListContain .groupListItem .infoContain .groupTitle img{
        height: 32px;
        position: relative;
        bottom: 1px;
    }

    .groupSearchPageContain .groupListContain .groupListItem .infoContain .itemTagContain{
        
        display: flex;
        
    }
    .groupSearchPageContain .groupListContain .groupListItem .infoContain .itemTagContain div{
        font-size: 20px;
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

    .groupSearchPageContain .groupListContain .groupListItem .infoContain .itemTagContain i{
        margin-right: 5px;
        margin-top:1px;
    }

    .groupSearchPageContain .groupListContain .groupListItem .infoContain .itemTagContain div:first-child{
        margin-left: 0px;

    }

    .groupSearchPageContain .groupListContain .groupListItem .btnContain{
        height: 100%;
        width: 190px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .groupSearchPageContain .btn{
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

    .groupSearchPageContain .start{
        background: #ef4454;
        border:1px solid #ef4454;/*no*/
        color: #fff;
    }

    .groupSearchPageContain .joined{
        border:1px solid #ef4454;/*no*/
        color: #ef4454;
    }

    .groupSearchPageContain .failed{
       
        border:1px solid #a5a5a5;/*no*/
        color: #a5a5a5;
    }

    .groupSearchPageContain .applying{
         border:1px solid #fe9901;/*no*/
         color: #fe9901;
    }

    .groupSearchPageContain .bg1{
        background: #8198c9;
        min-width: 75px;
        text-align: center;
    }
    
    .groupSearchPageContain .bg2{
        background: #ff9abc;
    }
    
    .groupSearchPageContain .bg3{
        background: #6bd4cf;
    }
    
    .groupSearchPageContain .bg4{
        background: #f5bd8f;
    }
    
    .groupSearchPageContain .bg5{
        background: #c0a5f4;
    }
    
    .groupSearchPageContain .bg6{
        
        background: #90cff8;
    }

    .groupSearchPageContain .pcTop{
        top:130px;
    }

</style>


