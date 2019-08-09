<template>
  <div class="nickname">
		<eleTit>

    </eleTit>
    <!-- <div class="modifyNewPhoneHeader">
      <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
      <span class="title">昵称</span>
    </div> -->
      <div class="line"></div>
    <div class="myNickName">
      我的昵称
      <input type="text" class="nickNam" v-model="nickname" placeholder="请输入新的昵称" />
      <!-- 提交按钮 -->
      <div @click="changeNickname" class="revertPwd">确定修改</div>
    </div>
  </div>
</template>

<script>
import { reqForgetpwd } from "../../utils/request";
import eleTit from "@/components/title/title";
export default {
  data() {
    return {
      nickname: ""
    };
  },
	components:{
		eleTit
	},
  created() {
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    changeNickname() {
      var that = this;
      let params = {
        nickname: that.nickname
      };
      console.log(params);
      reqForgetpwd.changeNickname(params).then(res => {
        if(res.code==200){
        this.$router.go(-1);
        alert('修改成功');
        }else{
          alert('修改失败');
        }
      });
    }
  }
};
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
  border: 1px solid #ebebeb;
}

.nickname .line{
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #ebebeb;
  margin-top: 20px;
}
.modifyPhoneWrap .modifyPhoneHeader .btnBack {
  font-size: 34px;
  position: absolute;
  left: 20px;
}
.modifyPhoneWrap .modifyPhoneHeader .title {
  font-size: 36px;
}

.nickname .myNickName {
  height: 85px;
  width: 680px;
  float: right;
  line-height: 85px;
  font-size: 28px;
  border-bottom: 1px solid #ebebeb;
  /* margin-top:px; */
}
.nickname .myNickName .nickNam{
      z-index: 100;
      font-size: 28px;
}
.nickname .myNickName > input:nth-child(1) {
  margin-left: 40px;
}
.nickname .myNickName > input:nth-child(1)::placeholder {
  font-size: 28px;
  filter: opacity(50%);
}
.nickname .revertPwd {
  color: #fff;
  background: #ef4454;
  width: 8rem;
  height: 1rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
  font-size: 32px;
  line-height: 1rem;
  position: relative;
  text-align: center;
}
/* 标题--结束 */
</style>


