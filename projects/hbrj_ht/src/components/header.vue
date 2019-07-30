
<template>
    <div class="headerCom">
        <div class="logoInfo">
            <img src="../assets/image/logo.png" class="logoSize"/>
            <p class="dl logoName">
                <span class="f30 pad15">海豹日记</span><span class="f20">中台系统</span>
            </p>
        </div>
        <div class="userInfo">
            <span><i class="iconfont  icon-tongzhi sign-two" ></i></span>
            <span class="gk" @click="logout"><i class="iconfont  icon-tuichu1 sign-two" ></i></span>

            <span class="name-sty " >{{userName}}</span>
            <span><i class="iconfont icon-xia sign-end name-sty"  ></i></span>


            <img  class="head-img " :src="userImg"/>
        </div>
    </div>
</template>
<script>
import {removeItem} from "@/utils/base"
export default {
    props:{
        userName:{
            type:String,
            default:'小豹子'
        },
        userImg:{
            type:String,
            default:'../assets/image/logo.png'
        }
    },
    methods: {
      logout(){
        removeItem("hbrj_sid");
        removeItem("hbrj_uid");
        this.$router.push({name:'login'});
      }
    },
}
</script>

<style>
  .icon-tongzhi:before {
    content: "\e613";
  }
  .headerCom{
      width:100%;
      height:65px;
      background:#4842e3;
      padding:0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .headerCom .logoInfo{
        color:#fff;
    }
    .headerCom .logoSize{
        width:40px;
        vertical-align: middle;
    }
    .headerCom .logoName{
        vertical-align: middle;
    }
    .headerCom .pad15{
        padding:0 15px;
    }
  .headerCom .userInfo{
    margin-right: 15px;

  }
  .headerCom .sign-two{
   font-size: 28px;
    color: white;
    margin-right: 7px;
  }
  .headerCom .gk{
    padding-right: 70px;

  }
  .headerCom .name-sty{
    font-size: 15px;
    color: white;
    margin-bottom: 20px;
    position: relative;
    top: -5px;
    margin-right: 7px;

  }
  .headerCom .sign-end{
    font-size: 10px;
  }
  .headerCom .head-img{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-left: 8px;
    position: relative;
    top: 5px;
  }

</style>
