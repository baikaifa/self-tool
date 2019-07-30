<template>
    <div class="wxBindResultWrap">
		<eleTit :title="title"></eleTit>
        <!-- <div class="wxBindResultHeader">
            <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
            <span class="title">{{title}}</span>
        </div> -->
        <div class="wxBindResultContent">
            <p class="resultIcon">
                <span class="iconfont iconchenggong successIcon" v-show="result"></span>
                <span class="iconfont iconshibai errorIcon" v-show="!result"></span>
                <br>
                <span>{{title}}！</span>
            </p>
            <button class="btnDone" @click="btnDone">
                {{actionText}}
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
            title: '绑定成功',
            query: null,
            result: null,
            actionText: '完成'
        }
    },
    created() {
        this.query = this.$route.query;
        if(this.query.type == 'bindSuccess') {
            this.title = '绑定成功';
            this.result = true;
            
        }
        if(this.query.type == 'bindError') {
            this.title = '绑定失败';
            this.result = false;
            this.actionText = '返回，重新绑定';
        }
        if(this.query.type == 'changeSuccess') {
            this.title = '切换成功';
            this.result = true;
            this.actionText = '完成';
        }
        if(this.query.type == 'changeError') {
            this.title = '切换失败';
            this.result = false;
            this.actionText = '返回，重新绑定';
        }
    },
    mounted() {
    },
    methods: {
        // 返回
        goBack() {
            this.$router.go(-1);
        },
        // 更换绑定
        btnDone() {
            // 确认下不同的跳转页面
            // this.$router.push('/changeWxBind')
            if(this.query.type == 'bindSuccess') {
            }
            if(this.query.type == 'bindError') {
                this.$router.go(-1);
            }
            if(this.query.type == 'changeSuccess') {
            }
            if(this.query.type == 'changeError') {
                this.$router.go(-1);
            }
        }
    }    
}
</script>
<style scoped="scoped" type="text/css">
    .wxBindResultWrap {
        background: #f4f5f7;
        height: 100vh;
    }
    /* 标题--开始 */
    .wxBindResultWrap .wxBindResultHeader {
        background: #fff;
        /* padding: 20px 40px; */
        position: relative;
        height: 80px;
        line-height: 80px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #ebebeb;
    }
    .wxBindResultWrap .wxBindResultHeader .btnBack {
        font-size: 34px;
        position: absolute;
        left: 20px;
    }
    .wxBindResultWrap .wxBindResultHeader .title {
        font-size: 36px;
    }
    /* 标题--结束 */
    .wxBindResultWrap .wxBindResultContent {
        margin: 20px;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
    }
    .wxBindResultWrap .wxBindResultContent .resultIcon {
        font-size: 40px;
        color: #424141;
        padding: 170px 0 270px 0;
        word-break: break-all;
        text-align: center;
        font-weight: bold;
    }
    .wxBindResultWrap .wxBindResultContent .resultIcon .successIcon{
        font-size: 190px;
        color: #34a853;
    }
    .wxBindResultWrap .wxBindResultContent .resultIcon .errorIcon{
        font-size: 190px;
        color: #e05858;
    }
    .wxBindResultWrap .wxBindResultContent .btnDone {
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
