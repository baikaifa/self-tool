<template>
    <section class="groupMemberList">
        <tit :bak="true"></tit>
        <section class="memberListContain" :class="{pcTop:sys_env=='pc'}">
            <div v-for="item in list" class="item">
                <div class="avatar">
                    <img v-lazy="item.memberAvatar"/>
                </div>
                <div class="memberName">{{item.memberName}}</div>
            </div>
            <div class="item"></div>
        </section>
        
        <dataLoading :isShowLoad="isShowLoad"></dataLoading>
    </section>
    
</template>
<script>
import {reqGroup} from "../../utils/request";
import dataLoading from "../../components/dataLoading"
import tit from "../../components/title/title"
export default {
    data(){
        return {
            sys_env: this.sysEnv,
            list:[],
            groupId:"",
            isShowLoad:false
        }
    },
    created(){
        
        this.groupId=this.$route.query.groupId;
        this.getMemberList();
    },
    components:{dataLoading,tit},
    methods:{
        getMemberList(){
            this.isShowLoad=true;
            reqGroup.groupMembers({groupId:this.groupId}).then((res)=>{
                if(res.code==200){
                    setTimeout(()=>{
                            this.isShowLoad=false;
                    },500);
                    this.list=res.data;
                }else{
                    alert(res.message);
                }
            });
        },
        goBak(){
            window.history.go(-1);
        }
    }
}
</script>

<style scoped="scoped" type="text/css">
    
    .groupMemberList .memberListContain{
        position: fixed;
        width: 100%;
        top:120px;
        height: fill-available;
        height: -webkit-fill-available;
        overflow: auto;
    }
    .groupMemberList .pcTop{
        top:80px;
    }
    .groupMemberList .item{
        width: 100%;
        height: 118px;
        display: flex;
        border-bottom: 1px solid #eeeeee;/*no*/
    }

    .groupMemberList .item:first-child{
         border-top: 1px solid #eeeeee;/*no*/
    }

    .groupMemberList .item:last-child{
        border:none;
    }

    .item .avatar{
        width: 152px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .item .avatar img{
        width: 82px;
        height: 82px;
        border-radius: 50px;
    }

    .item .memberName{
        flex: 1;
        height: 118px;
        align-items: center;
        font-size: 28px;
        line-height: 118px;
        color: #343434;
    }
</style>

