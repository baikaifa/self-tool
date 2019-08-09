<template>
    <div class="fillInvitationCode ">
        <eleTit>

        </eleTit>
        <!-- <div class="modifyNewPhoneHeader">
          <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
          <span class="title">昵称</span>
        </div> -->
        <div class="line"></div>
        <p class="myNickP">请输入邀请码</p>
        <div class="myNickName">
            邀请码
            <input type="text" class="nickNam" v-model="inviteCode" placeholder="请输入邀请码" />
            <!-- 提交按钮 -->
            <div @click="getInviteCode" class="revertPwd">确定</div>
        </div>
    </div>
</template>

<script>
    import { reqForgetpwd } from "../../utils/request";
    import eleTit from "@/components/title/title";
    export default {
        data() {
            return {
                inviteCode: "",
                userName:'',
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
            getInviteCode() {
                var _this = this;
                let params = {
                    inviteCode: _this.inviteCode
                };
                console.log(params);
                reqForgetpwd.InviteCode(params).then(res => {
                    if(res.code==200){
                        _this.userName=res.data.beinvitedName;
                        this.$router.push({path:'/BindedMan',query:{id:_this.userName}});

                    }else{
                        this.$toast("请填写正确的邀请码")
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

    .fillInvitationCode .line{
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

    .fillInvitationCode .myNickName {

        height: 85px;
        width: 680px;
        float: right;
        line-height: 85px;
        font-size: 32px;
        border-bottom: 1px solid #ebebeb;

        /* margin-top:px; */
    }
    .fillInvitationCode .myNickP {
        height: 85px;
        width: 680px;
        float: right;
        line-height: 85px;
        font-size: 32px;
        margin-top: 10px;
        margin-bottom: 40px;
        /* margin-top:px; */
    }
    .fillInvitationCode .myNickName .nickNam{
        z-index: 100;
        font-size: 32px;
    }
    .fillInvitationCode .myNickName > input:nth-child(1) {
        margin-left: 40px;
    }
    .fillInvitationCode .myNickName > input:nth-child(1)::placeholder {
        font-size: 32px;
        filter: opacity(50%);
    }
    .fillInvitationCode .revertPwd {
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


