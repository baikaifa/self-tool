<template>
   <div class="applyResultPage">
		<eleTit></eleTit>
      <div class="bar"></div>
      <div v-if="noData"  class="noData">没有更多数据了~</div>
      <div v-if="!noData" class="listContain">
         <div class="resItem" v-for="item in list">
            <div class="groupName">
               {{item.groupName}}
            </div>
            <div class="applyRes" :class="{'color1':item.verifyStatus==1,'color2':item.verifyStatus==2,'color3':item.verifyStatus==3}">
               {{statusTxt[item.verifyStatus]}}
            </div>
         </div>
      </div>
      <dataLoading :isShowLoad="isShowLoad"></dataLoading>
   </div>
</template>

<script>
import eleTit from "@/components/title/title";
import {reqGroup} from "../../utils/request";
import dataLoading from "../../components/dataLoading"
export default {
   data(){
      return {
         list:[],
         statusTxt:['','审核中','审核通过','未通过'],
         fontClass:"",
         noData:false,
         isShowLoad:false
      }
   },
   components:{eleTit,dataLoading},
   created(){
      this.getResList();
   },
   methods:{
      getResList(){
         this.isShowLoad=true;
         reqGroup.applyRes().then(res=>{
            if(res.code==200){

               this.list=res.data;
                  /*this.list.push({
                     "verifyStatus":2,
                     "groupName":"测试群"
                  });
                  this.list.push({
                     "verifyStatus":3,
                     "groupName":"测试群2"
                  });
                  for(var i=0;i<5;i++){
                     this.list=this.list.concat(this.list);
                  }*/

               if(this.list.length<=0){
                  this.noData=true;
               }
               setTimeout(()=>{
                  this.isShowLoad=false;
               },400);
            }else{
               alert(res.code);
            }
         });
      }
   }
}
</script>

<style type="text/css">
   .applyResultPage div.app_head div.tit_bar {
    background-color: #fff;
    z-index: 9999;
   }
   .applyResultPage .bar{
      width: 100%;
      height: 20px;
      border-bottom:1px solid #eeeeee;
   }
   .applyResultPage .listContain{
      height: 100vh;
      overflow-y:auto;
      background:#f6f6f6;
      
   }
   .applyResultPage .listContain .resItem{
      display: flex;
      height: 100px;
      background: #fff;
      padding:0 30px;
      font-size: 28px;
      justify-content: space-between;
      align-items: center;
   }
   .applyResultPage .listContain .resItem .groupName{
     
     color: #343434;
   }
   .applyResultPage .noData{
      text-align: center;
      padding-top:100px;
      font-size: 24px;
   }
   .applyResultPage .color2{
      color: #ef4454;
   }

   .applyResultPage .color1{
      color:#fe9901;
   }

   .applyResultPage .color3{
      color:#666666;
   }

</style>
