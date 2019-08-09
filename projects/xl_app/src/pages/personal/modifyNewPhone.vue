<template>
  <div class="modifyNewPhoneWrap">
    <eleTit></eleTit>
    <!-- <div class="modifyNewPhoneHeader">
            <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
            <span class="title">修改手机号</span>
    </div>-->
    <div class="line"></div>
    <div class="modifyNewPhoneContent">
      <div class="panelItem">
        <span class="leftItem">新手机号码</span>
        <!-- <div class="rightItem">{{oldPhone}}</div> -->
        <input type="text" class="rightItem" @input="checkPhone" placeholder="请输入手机号码" v-model="newPhoneNum">
      </div>
      <div class="panelItem">
        <span class="leftItem">验证码</span>
        <div class="rightItem codeWrap">
          <input type="text" placeholder="请输入验证码"  v-model="verifyCode" class="inputCode" />
          <button class="getCode" @click="gainVerificationCode" :disabled="disabled">{{codeText}}</button>
        </div>
      </div>
      <div class="modifyNewPhoneBtn">
        <button @click="changePhone">确定更换</button>
      </div>
    </div>
  </div>
</template>
<script>
import eleTit from "@/components/title/title";
import { reqForgetpwd } from "../../utils/request";
import { check } from "@/utils/checkReg"; //检查手机号是否合格
export default {
  components: { eleTit },
  data() {
    return {
      oldPhone: "15311111111",
      codeText: "获取验证码",
      disabled:false,
      newPhoneNum:"",
      verifyCode:""
    };
  },
  created() {
  },
  mounted() {},
  methods: {
     checkPhone() {
      this.newPhoneNum = check.phone(this.newPhoneNum);
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 修改手机号
    changePhone() {
      var that = this;
      let params = {
        phone: that.newPhoneNum,
        checkCode: that.verifyCode,
      };
      reqForgetpwd.confirmSetNewPhone(params).then(res => {
        if (res.code == 200) {
           this.$router.go(-1);
          alert("修改成功");
        } else {
          alert("修改失败");
        }
      }).catch((err) => {
        alert(err);
      });
    },
    
    gainVerificationCode() {
      var that = this;
      let params = {
        decrypt:1,
        phone: that.newPhoneNum,
        type: 3
      };
      reqForgetpwd.gainCode(params).then(res => {
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
    }
  }
};
</script>
<style scoped="scoped" type="text/css">
.modifyNewPhoneWrap {
  background: #fff;
  height: 100vh;
}
.modifyNewPhoneWrap .line{
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #ebebeb;
  margin-top: 20px;
}
/* 标题--开始 */
.modifyNewPhoneWrap .modifyNewPhoneHeader {
  background: #fff;
  /* padding: 20px 40px; */
  position: relative;
  height: 80px;
  line-height: 80px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #f2f2f2;
}
.modifyNewPhoneWrap .modifyNewPhoneHeader .btnBack {
  font-size: 34px;
  position: absolute;
  left: 20px;
}
.modifyNewPhoneWrap .modifyNewPhoneHeader .title {
  font-size: 36px;
}
/* 标题--结束 */
.modifyNewPhoneWrap .modifyNewPhoneContent {
  font-size: 28px;
  padding: 0 30px;
  /* margin-top: 20px; */
}
.modifyNewPhoneWrap .modifyNewPhoneContent .panelItem {
  display: flex;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #ebebeb;
  height: 40px;
  line-height: 40px;
}
.modifyNewPhoneWrap .modifyNewPhoneContent .panelItem .leftItem {
  width: 150px;
  color: #343434;
  font-size:24px;
}
.modifyNewPhoneWrap .modifyNewPhoneContent .panelItem .rightItem::placeholder{
  filter: opacity(50%);
}
.modifyNewPhoneWrap .modifyNewPhoneContent .panelItem .rightItem {
  flex: 1;
  text-align: left;
  padding-left: 30px;
}
/* .modifyNewPhoneWrap .modifyNewPhoneContent .panelItem .rightItem.codeWrap {
  display: flex;
} */
.modifyNewPhoneWrap .panelItem .rightItem .inputCode {
  font-size: 28px;
  /* flex: 1; */
  width:200px;
}
.modifyNewPhoneWrap .panelItem .rightItem .inputCode::placeholder {
   filter: opacity(50%);
}
.modifyNewPhoneWrap .panelItem .rightItem .getCode {
  font-size: 28px;
  border: 0;
  height: 50px;
  line-height: 1;
  border: 1px solid #ef4454;/*no*/
  color: #ef4454;
  background: #fff;
  padding: 0 20px;
  border-radius: 25px;
  float: right;
}

.modifyNewPhoneWrap .modifyNewPhoneContent .modifyNewPhoneBtn {
  padding-top: 110px;
  text-align: center;
}
.modifyNewPhoneWrap .modifyNewPhoneContent .modifyNewPhoneBtn button {
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
