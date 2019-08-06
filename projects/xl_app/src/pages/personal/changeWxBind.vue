<template>
    <div class="changeWxBindWrap">
        <!-- <div class="changeWxBindHeader">
            <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
            <span class="title">微信绑定</span>
        </div> -->
		<eleTit bak="true"></eleTit>
        <div class="changeWxBindContent">
            <div class="title">输入验证码绑定：</div>
            <ul>
                <li>
                    1.搜索微信号：{{xlWxName}},给<span class="textDanger">{{xlName}}</span>发送“验证码”获取
                </li>
                <li>
                    2.搜索微信号：{{xlNewWxName}}
                    <button
                        class="copyBtn"
                        v-clipboard:copy="xlWxName"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                    >
                        复制
                    </button>添加好友发送验证码获取
                </li>
            </ul>
        </div>
        <div class="wxCodeWrapper">
            <div class="codeInfoWrap">
                <div class="codeInputWrap">
                    <span>验证码：</span>
                    <input type="text" placeholder="通过微信小助手获取" v-modal="wxCode">
                </div>
                <div class="codeBindBtn">
                    <button @click="changewixinBind">切换</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import eleTit from "@/components/title/title";
export default {
    components: {eleTit},
    data() {
        return {
            xlNewWxName: 'daisyning1993',
            xlWxName: 'daisyning1993',
            xlName: 'A喜乐生活助手213',
            wxCode: ''
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        // 返回
        goBack() {
            this.$router.go(-1);
        },
        onCopy: function (e) {
            alert('复制成功')
        },
        onError: function (e) {
            alert('复制失败')
        },changewixinBind(){
                  var that = this;
      let params = {
        token: that.token,
      };
      reqForgetpwd.changewixinBind(params).then(res => {
        if (res.code == 200) {
          console.log(6);
          alert("绑定的微信号是" + res.data.wxNumber);
          this.$router.push({
            path: "wxBindResult",
            query: { type: "changeSuccess" }
          });
        } else {
          this.$router.push({
            path: "wxBindResult",
            query: { type: "changeError" }
          });
        }
      });
        }

    }    
}
</script>
<style scoped="scoped" type="text/css">
    .changeWxBindWrap {
        background: #f4f5f7;
        height: 100vh;
    }
    /* 标题--开始 */
    .changeWxBindWrap .changeWxBindHeader {
        background: #fff;
        /* padding: 20px 40px; */
        position: relative;
        height: 80px;
        line-height: 80px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #ebebeb;
    }
    .changeWxBindWrap .changeWxBindHeader .btnBack {
        font-size: 36px;
        position: absolute;
        left: 20px;
    }
    .changeWxBindWrap .changeWxBindHeader .title {
        font-size: 36px;
    }
    /* 标题--结束 */
    .changeWxBindWrap .changeWxBindContent {
        margin: 20px;
        background: #fff;
        padding: 30px;
        border-radius: 10px;
    }
    .changeWxBindWrap .changeWxBindContent .title {
        font-size: 30px;
        padding-bottom: 26px;
        color: #424141;
        font-weight: bold;
    }
    .changeWxBindWrap .changeWxBindContent .copyBtn {
        background: #ef4454;
        color: #fff;
        border-radius: 10px;
        border: 0;
        padding: 2px 15px;
    }
    .changeWxBindWrap .changeWxBindContent .textDanger {
        color: #ef4454;
        font-weight: bold;
    }
    .changeWxBindWrap .changeWxBindContent ul {
        font-size: 26px;
        line-height: 1.7;
        color: #5e5e5e;
    }
    
    .changeWxBindWrap .wxCodeWrapper {
        margin: 20px;
        padding: 68px 30px;
        margin-top: 20px;
        border-radius: 10px;
        background: #fff;
    }
    .changeWxBindWrap .wxCodeWrapper .codeInfoWrap {
        text-align: center;
    }
    .changeWxBindWrap  .codeInfoWrap .codeInputWrap {
        display: flex;
        align-items: center;
        padding: 0 0 90px 0;
        font-size: 40px;
        color: #737373;
    }
    .changeWxBindWrap  .codeInfoWrap .codeInputWrap input {
        flex: 1;
        border-bottom: 1px solid #9e9e9e;
        padding: 10px;
    }

    .changeWxBindWrap .codeInfoWrap .codeBindBtn button {
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
