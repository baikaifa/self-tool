<template>
    <div class="modifyPhoneWrap">
		<eleTit></eleTit>
        <!-- <div class="modifyPhoneHeader">
            <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
            <span class="title">修改手机号</span>
        </div> -->
        <div class="modifyPhoneContent">
            <div class="panelItem">
                <span class="leftItem">原手机号码</span>
                <div class="rightItem">{{oldPhone}}</div>
            </div>
            <div class="panelItem">
                <span class="leftItem">验证码</span>
                <div class="rightItem codeWrap">
                    <input type="text" placeholder="请输入验证码" class="inputCode">
                    <!-- <button class="getCode" >获取验证码</button> -->
                    <button class="getCode" @click="gainVerificationCode" :disabled="disabled">{{codeText}}</button>
                </div>
            </div>
            <div class="modifyPhoneBtn">
                <button @click="confirmChange">确定更换</button>
            </div>
        </div>
    </div>
</template>
<script>
import { reqForgetpwd } from "../../utils/request";
import eleTit from "@/components/title/title";
export default {
    components: {eleTit},
    data() {
        return {
            oldPhone: '15311111111',
    disabled: false,
      codeText: "获取验证码",

        }
    },
     created() {
    this.token ="b389494d1530103054faacb890973eef3bf23bbea84523e84838fd0915ecb98d";
      //获取手机号并且替换中间四位
      this.query = this.$route.query;
      var reg = /^(\d{3})\d*(\d{4})$/;
      var str = this.query.phone.replace(reg,'$1****$2')
      this.oldPhone=this.query.phone;
       //获取手机号并且替换中间四位
  },
    mounted() {
    },
    methods: {
        // 返回
        goBack() {
            this.$router.go(-1);
        }, confirmChange(){
  var that = this;
      let params = {
        token: that.token,
        phone: that.mobileNumber,
        checkCode: that.verifyCode,
      };
      reqForgetpwd.confirmChange(params).then(res => {
        if (res.code == 200) {
            this.$router.push({path:'modifyNewPhone',})
                alert("验证成功");
        }else{
            alert('验证失败');
        }
      });

        },
         gainVerificationCode() {
      var that = this;
      let params = {
        token: that.token,
        phoneNum: that.phoneNum,
        type: 1
      };
      reqForgetpwd.modifyPhones(params).then(res => {
        this.verifyCode = res.code; //获取到的验证码
        that.disabled = true;
        let time = 60;
        let timer = setInterval(() => {
          --time;
          if (time == 0) {
            clearInterval(timer);
            that.disabled = false;
            that.codeText = "获取验证码";
          } else {
            that.codeText = time + "s";
          }
        }, 1000);
      });
    },
    }    
}
</script>
<style scoped="scoped" type="text/css">
    .modifyPhoneWrap {
        background: #fff;
        height: 100vh;
    }
    /* 标题--开始 */
    .modifyPhoneWrap .modifyPhoneHeader {
        background: #fff;
        /* padding: 20px 40px; */
        position: relative;
        height: 80px;
        line-height: 80px;
        text-align: center;
        box-sizing: border-box;
        border: 1PX solid #ebebeb;
    }
    .modifyPhoneWrap .modifyPhoneHeader .btnBack {
        font-size: 34px;
        position: absolute;
        left: 20px;
    }
    .modifyPhoneWrap .modifyPhoneHeader .title {
        font-size: 36px;
    }
    /* 标题--结束 */
    .modifyPhoneWrap .modifyPhoneContent {
        font-size: 28px;
        padding: 0 30px;
    }
    .modifyPhoneWrap .modifyPhoneContent .panelItem {
        display: flex;
        align-items: center;
        padding: 30px 0;
        border-bottom: 1PX solid #ddd;
    }
    .modifyPhoneWrap .modifyPhoneContent .panelItem  .leftItem{
        width: 150px;
    }
    .modifyPhoneWrap .modifyPhoneContent .panelItem  .rightItem{
        flex: 1;
        text-align: left;
        padding-left: 10px;
    }
    .modifyPhoneWrap .modifyPhoneContent .panelItem  .rightItem.codeWrap{
        display: flex;
    }
    .modifyPhoneWrap  .panelItem  .rightItem .inputCode {
        font-size: 28px;
        flex: 1;
    }
    .modifyPhoneWrap  .panelItem  .rightItem .getCode {
        font-size: 28px;
        border: 0;
        height: 50px;
        width: 220px;
        line-height: 1;
        border: 1PX solid #ef4454;
        color: #ef4454;
        background: #fff;
        padding: 0 20px;
        border-radius: 25px;
    }

    .modifyPhoneWrap .modifyPhoneContent .modifyPhoneBtn{
        padding-top: 110px;
        text-align: center;
    }
    .modifyPhoneWrap .modifyPhoneContent .modifyPhoneBtn button{
        font-size: 28px;
        width: 600px;
        height: 74px;
        line-height: 1;
        background: #ef4454;
        color: #fff;
        border: 0;
        border-radius: 40px;
    }
</style>
