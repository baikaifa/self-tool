<template>
  <div class="vipDetails">
    <!-- 头部切换tab -->
    <orderTab :activeTab="activeTab"/>
    <!-- 会员详情 -->
    <div class="vipBox">
      <p ><span class="blueText">| </span>所属会员信息</p>
      <div class="head_p">头像</div>
      <img class="headImg" v-bind:src="data.avatar">
      <!--注册-->
      <div class="registerBox">
        <table >
          <tr >
            <td colspan="2"  class="td_font td_right">微信openID:</td>
            <td class="td_left" > {{ data.wxOpenId }}</td>
          </tr>
          <tr>
            <td colspan="2" class="td_right">性别:</td>
            <td class="td_left" >{{data.userSex}}</td>
          </tr>
          <tr>
            <td  colspan="2" class="td_right">会员邀请码:</td>
            <td class="td_left">{{data.inviteCode}}</td>
          </tr>

        </table>
        <table >
          <tr >
            <td colspan="2" class="td_font td_right" >微信unioID:</td>
            <td class="td_left"> {{ data.wxUnionId }}</td>
          </tr>
          <tr>
            <td colspan="2" class="td_right">用户等级:</td>
            <td class="td_left">{{data.userLevel}}</td>
          </tr>
          <tr>
            <td  colspan="2" class="td_right">邀请人ID:</td>
            <td class="td_left">{{data.superiorId}}</td>
          </tr>
          <div class="fff"></div>

        </table>
        <table >
          <tr >
            <td colspan="2" class="td_right" >用户昵称:</td>
            <td class="td_left"> {{ data.nickname }}</td>
          </tr>
          <tr>
            <td colspan="2" class="td_right">用户手机号:</td>
            <td class="td_left">{{data.mobileNumber}}</td>
          </tr>
          <tr>
            <td  colspan="2" class="td_right">邀请人手机号:</td>
            <td class="td_left">{{data.superiorMobile}}</td>
          </tr>
          <div class="td_left"></div>
          <div class="fff"></div>
        </table>
        <table >
          <tr >
            <td colspan="2" class="td_right" >用户ID:</td>
            <td align="left"> {{ data.userId }}</td>
          </tr>
          <tr>
            <td colspan="2" class="td_right">用户注册时间:</td>
            <td align="left">{{data.createTime}}</td>
          </tr>
          <div class="ffff"></div>
        </table>

      </div>
    </div>
  </div>
</template>
<script>
  import orderTab from "@/components/orderTab"
  import {getLocalData} from "@/utils/base"
  import {orderVipDetails} from "@/api/index"
  export default {
    data(){
      return {
        boxTitle:"",
        registered:false,
        activeTab:'vipDetails',
        data:{
        },
      }
    },
    created(){
      this.getVipDetails();
    },
    methods:{
      getVipDetails() { // 获取会员详情
        let params = {
          userId:getLocalData('hbrj_uid'),

        }
        orderVipDetails(params).then((res) => {
          if(res.code==200){
            console.log(res.data)
            this.data=res.data

          }else{
            this.$message.error(res.msg);
          }
        })
      },
    },

    components:{
      orderTab
    }
  }
</script>
<style scoped>
  .vipDetails .vipBox .registerBox{
    width: 1500px;
    height: 65px;
    position: relative;
    top: 50px;
    left: 15px;
    font-size: 13px;

  }

  .vipDetails .one {
    width: 20%;
    align:"left";
    float: left;
  }
  .vipDetails .two {
    width: 28%;
    align:"left";
    float: left;
  }
  .vipDetails .three {
    width: 23%;
    align:"left";
    float: left;
  }
  .vipDetails .four {
    width: 28%;
    align:"left";
    float: left;
  }
  .vipDetails table{
    padding-right: 74px;
    padding-left: 74px;
     float: left;
    border-spacing:12px  ;
  }

  .vipDetails .span1{
    line-height: 25px;


  }
 .vipDetails  .vipBox{

    width: 1619px;
    height: 282px;
    background-color: #ffffff;
    border-radius: 0px 4px 4px 4px;

  }

 .vipDetails .vipBox p{  width: 130px;
    height: 17px;
    font-size: 16px;
    line-height: 70px;
    letter-spacing: 0px;
    color: #343434;
   position: relative;
   left: 35px;
 }
 .vipDetails .head_p {
    position: absolute;
    top:210px;
   left: 380px;


 }
 .vipDetails .vipBox .headImg{
   width: 67px;
   height: 67px;
   background-color: #eceff4;
   border-radius: 4px;
   position: relative;
   left: -620px;
   top: 40px;
 }
 .vipDetails .vipBox .unregisterBox{
   width: 867px;
   height: 65px;
   position: relative;
   top: 65px;
   left: 50px;
   font-size: 14px;

 }
  .vipDetails .fff {
    width: 1px;height: 49px;
    background: #dadee4;
    position: relative;
    top: -75px;
    right: 74px;
    float: left;
 }
  .vipDetails .ffff {
    width: 1px;height: 49px;
    background: #dadee4;
    position: relative;
    top: -50px;
    right: 74px;
    float: left;
  }
 .vipDetails  .divtext{

   width: 146px;
   height: 65px;
   position: relative;
   left: 95px;

  }
  .vipDetails .td_font{

    font-size: 14px;

  }
  .vipDetails .td_right{
    text-align: right;

  }
  .vipDetails .td_left{
    text-align: left;
  }
</style>
