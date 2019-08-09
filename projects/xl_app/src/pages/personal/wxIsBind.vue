<template>
    <div class="wxIsBindWrap">
		<eleTit bak="true"></eleTit>
        <!-- <div class="wxIsBindHeader">
            <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
            <span class="title">微信绑定</span>
        </div> -->
        <div class="wxIsBindContent">
            <p class="bindName">当前App已绑定微信号：{{wxName}}</p>
            <button class="changeBind" @click="changeBind">
                更换绑定
            </button>
        </div>
    </div>
</template>
<script>
import eleTit from "@/components/title/title";
export default {
    components: {eleTit},
    data() {
        return {
            wxName: ''
        }
    },
    created() {
        this.wxName = this.$route.query.wxName;
    },
    mounted() {
    },
    methods: {
        // 返回
        goBack() {
            this.$router.go(-1);
        },
        // 更换绑定
        changeBind() {
            this.$router.push('/changeWxBind')
        }
    }    
}
</script>
<style scoped="scoped" type="text/css">
    .wxIsBindWrap {
        background: #f4f5f7;
        height: 100vh;
    }
    /* 标题--开始 */
    .wxIsBindWrap .wxIsBindHeader {
        background: #fff;
        /* padding: 20px 40px; */
        position: relative;
        height: 80px;
        line-height: 80px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #ebebeb;
    }
    .wxIsBindWrap .wxIsBindHeader .btnBack {
        font-size: 34px;
        position: absolute;
        left: 20px;
    }
    .wxIsBindWrap .wxIsBindHeader .title {
        font-size: 36px;
    }
    /* 标题--结束 */
    .wxIsBindWrap .wxIsBindContent {
        margin: 20px;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
    }
    .wxIsBindWrap .wxIsBindContent .bindName {
        font-size: 34px;
        color: #424141;
        padding: 260px 0 360px 0;
        word-break: break-all;
    }
    .wxIsBindWrap .wxIsBindContent .changeBind {
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
