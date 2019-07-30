<template>
  <div class="modifyNewPhoneWrap">
		<eleTit bak="true"></eleTit>
		<!--
    <div class="modifyNewPhoneHeader">
      <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
      <span class="title">修改密码</span>
    </div>
		-->
    <div class="forgetPwd">
      <!-- 手机号码 -->
      <div class="phone" :class="classObject">
        <div class="contentText">手机号码</div>
        <input
          type="number"
          :disabled="phoneDisabled"
          placeholder="请输入手机号码"
          v-model="phoneNum"
          @input="checkPhone"
        />
      </div>
      <!-- 验证码 -->
      <div class="code">
        <div class="contentText">验证码</div>
        <input type="text" placeholder="请输入验证码" />
        <button @click="gainVerificationCode" :disabled="disabled">{{codeText}}</button>
      </div>
      <!-- 新密码 -->
      <div class="newPwd">
        <div class="contentText">新密码</div>
        <input type="password" placeholder="请输入新密码" v-model="newPassword" />
      </div>
      <!-- 提交按钮 -->
      <button @click="confirmSubmit" class="revertPwd">确认提交</button>
    </div>
  </div>
</template>

<script>
import { reqForgetpwd } from "../../utils/request";
import { check } from "@/utils/checkReg"; //检查手机号是否合格
import eleTit from "@/components/title/title";

export default {
	components: {eleTit},
  data() {
    return {
      newPassword: "",
      phoneNum: "",
      verifyCode: "",
      disabled: false,
      codeText: "获取验证码",
      query: "",
      phone:"",
      phoneDisabled: false,
      classObject: {
        bgColor: false
      }
    };
  },
  created() {
    this.token ="b389494d1530103054faacb890973eef3bf23bbea84523e84838fd0915ecb98d";
    this.query = this.$route.query;
    this.query.phone='17733972991'
    if(this.query.phone == '') {
            this.phoneDisabled=false;
            this.classObject.bgColor=true;
      }
      if(this.query.phone){
         this.phoneDisabled=true;
         this.classObject.bgColor=false;
        this.phoneNum=this.query.phone;
      alert(this.phoneNum);
      }
  },
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    checkPhone() {
      this.phoneNum = check.phone(this.phoneNum);
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
    confirmSubmit() {
      var that = this;
  //     let params={
  //   token:that.phone,
  //     phone:'17745455411',
  // checkCode:"1225",	//验证码
	// 	password	:	"asdfeffadsf",
	// 	type	:	"2"		,			//
	// 	decrypt		:	"1",	
  //     }
  		

      let params = {
        token: that.token,
        phone: that.mobileNumber,
        checkCode: that.verifyCode,
        password: that.newPassword,
          type:2,
          decypt:1
      };
      console.log(params);
      reqForgetpwd.confirmSubmit(params).then(res => {
        if (res.code == 200) {
          alert("修改成功");
        } else {
          alert("验证码失败");
        }
      });
    }
  }
};
</script>
<style>
/* 标题--开始 */
.bgColor {
  background-color: #cccccc;
}
.modifyNewPhoneWrap .modifyNewPhoneHeader {
  background: #fff;
  /* padding: 20px 40px; */
  position: relative;
  height: 80px;
  line-height: 80px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #ebebeb;
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
.forgetPwd {
  padding: 0 0.3rem;
}
.forgetPwd > div {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  height: 0.86rem;
  line-height: 0.86rem;
}
.forgetPwd button {
  border: 0;
  background-color: transparent;
  outline: none;
}
.forgetPwd .contentText {
  width: 1.9rem;
  height: 0.86rem;
  font-size: 0.28rem;
  line-height: 0.86rem;
  text-align: left;
}
.forgetPwd input {
  background: none;
  outline: none;
  border: 0px;
  width: 5rem;
  line-height: 1.6;
}
.forgetPwd input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #c7c7c7;
  font-size: 0.28rem;
}
.forgetPwd .code {
  position: relative;
}
.forgetPwd .code button {
  position: absolute;
  right: 0;
  height: 0.5rem;
  width: 1.76rem;
  border: 1px solid #c7c7c7;
  border-radius: 0.25rem;
  font-size: 0.24rem;
}
.forgetPwd .code .blueColor {
  color: #3289ff;
  border: 1px solid #3289ff;
}

.forgetPwd .grayColor {
  color: #c7c7c7;
}
.forgetPwd .revertPwd {
  /* color: #fff;
  background: #ef4454;
  width: 6rem;
  height: 1rem;
  line-height: 1rem;
  border-radius: 0.36rem;
  margin-top: 1.1rem;
  font-size: 32px; */
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  background: #ef4454;
  width: 8rem;
  height: 1rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
  font-size: 0.426667rem;
  line-height: 1rem;
  position: relative;
  text-align: center;
}
</style>
