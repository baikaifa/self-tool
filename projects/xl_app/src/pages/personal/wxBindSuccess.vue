<template>
    <div class="wxBindSuccessWrap">
		<eleTit></eleTit>
        <!-- <div class="wxBindSuccessHeader">
            <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
            <span class="title">微信绑定</span>
        </div> -->
        <div class="wxBindSuccessContent">
            <p class="wxName">您的微信号：{{wxName}}</p>
            <p>已绑定成功！</p>
        </div>
    </div>
</template>
<script>
import eleTit from "@/components/title/title";
export default {
    components: {eleTit},
    data() {
        return {
            wxName: 'daisyning1993'
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
    }    
}
</script>
<style scoped="scoped" type="text/css">
    .wxBindSuccessWrap {
        background: #fff;
        height: 100vh;
    }
    /* 标题--开始 */
    .wxBindSuccessWrap .wxBindSuccessHeader {
        background: #fff;
        /* padding: 20px 40px; */
        position: relative;
        height: 80px;
        line-height: 80px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #ebebeb;
    }
    .wxBindSuccessWrap .wxBindSuccessHeader .btnBack {
        font-size: 34px;
        position: absolute;
        left: 20px;
    }
    .wxBindSuccessWrap .wxBindSuccessHeader .title {
        font-size: 36px;
    }
    /* 标题--结束 */
    .wxBindSuccessWrap .wxBindSuccessContent {
        margin: 20px;
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
    }
    .wxBindSuccessWrap .wxBindSuccessContent p {
        font-size: 54px;
        color: #424242;
    }
    .wxBindSuccessWrap .wxBindSuccessContent p.wxName {
        font-size: 36px;
        color: #737373;
        padding: 140px 0;
    }
</style>
