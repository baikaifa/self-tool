<template>
  <div class="wxBindWrap">
		<eleTit></eleTit>
    <!-- <div class="wxBindHeader">
      <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
      <span class="title">微信绑定</span>
    </div> -->
    <div class="wxBindContent">
      <div class="title">输入验证码绑定：</div>
      <ul>
        <li>
          1.搜索微信号：{{xlWxName}}
          <button
            class="copyBtn"
            v-clipboard:copy="xlWxName"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >复制</button>添加好友发送验证码获取
        </li>
        <li>
          2.若已有
          <span class="textDanger">A喜乐生活助手</span>微信好友，直接发送“验证码”获取
        </li>
      </ul>
    </div>
    <div class="wxCodeWrapper">
      <div class="codeInfoWrap">
        <div class="codeInputWrap">
          <span>验证码：</span>
          <input type="text" placeholder="通过微信小助手获取" v-model="wxCode" />
        </div>
        <div class="codeBindBtn">
          <button @click="weixinBind">绑定</button>
        </div>
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
      xlWxName: "daisyning1993",
      wxCode: ""
    };
  },
  created() {},
  mounted() {},
  created() {
    this.token =
      "b389494d1530103054faacb890973eef3bf23bbea84523e84838fd0915ecb98d";
  },
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    onCopy: function(e) {
      alert("复制成功");
    },
    onError: function(e) {
      alert("复制失败");
    },
    weixinBind() {
      var that = this;
      // let params = {
      //   token: that.token,
      //   verifyCode: that.verifyCode
      // };
      // reqForgetpwd.wixinBind(params).then(res => {
        // if (res.code == 200) {
          // alert("绑定的微信号是" + res.data.wxNumber);
          this.$router.push({
            path: "wxBindResult",
            query: { type: "bindSuccess" }
          });
        // } else {
          // this.$router.push({
          //   path: "wxBindResult",
          //   query: { type: "bindError" }
          // });
        // }
      // });
    }
  }
};
</script>
<style scoped="scoped" type="text/css">
.wxBindWrap {
  background: #f4f5f7;
  height: 100vh;
}
/* 标题--开始 */
.wxBindWrap .wxBindHeader {
  background: #fff;
  /* padding: 20px 40px; */
  position: relative;
  height: 80px;
  line-height: 80px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #ebebeb;
}
.wxBindWrap .wxBindHeader .btnBack {
  font-size: 36px;
  position: absolute;
  left: 20px;
}
.wxBindWrap .wxBindHeader .title {
  font-size: 36px;
}
/* 标题--结束 */
.wxBindWrap .wxBindContent {
  margin: 20px;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
}
.wxBindWrap .wxBindContent .title {
  font-size: 30px;
  padding-bottom: 26px;
  color: #424141;
  font-weight: bold;
}
.wxBindWrap .wxBindContent .copyBtn {
  background: #ef4454;
  color: #fff;
  border-radius: 10px;
  border: 0;
  padding: 2px 15px;
}
.wxBindWrap .wxBindContent .textDanger {
  color: #ef4454;
  font-weight: bold;
}
.wxBindWrap .wxBindContent ul {
  font-size: 26px;
  line-height: 1.7;
  color: #5e5e5e;
}

.wxBindWrap .wxCodeWrapper {
  margin: 20px;
  padding: 68px 30px;
  margin-top: 20px;
  border-radius: 10px;
  background: #fff;
}
.wxBindWrap .wxCodeWrapper .codeInfoWrap {
  text-align: center;
}
.wxBindWrap .codeInfoWrap .codeInputWrap {
  display: flex;
  align-items: center;
  padding: 0 0 90px 0;
  font-size: 40px;
  color: #737373;
}
.wxBindWrap .codeInfoWrap .codeInputWrap input {
  flex: 1;
  border-bottom: 1px solid #9e9e9e;
  padding: 10px;
}

.wxBindWrap .codeInfoWrap .codeBindBtn button {
  border: 0;
  width: 490px;
  height: 68px;
  line-height: 1;
  font-size: 30px;
  color: #fff;
  background: #ef4454;
  border-radius: 10px;
  outline: none;
}
</style>
