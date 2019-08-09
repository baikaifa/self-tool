<template>
    <div class="tRule">
        <!-- 后退键 -->
		<eleTit></eleTit>
        <!-- <div class="backBtn">
            <i class="iconfont iconfanhui" @click="goBak"></i>
            奖励规则
        </div> -->
        <div>
            <h3>一、基本规则</h3>
            <p>1. 金币汇率：1000金币=1元额度红包；每日最多提现2次；日常任务时限为00：00：00--23:59:59，次日零点刷新。</p>

            <h3>二、日常任务</h3>
            <p>2.1 阅读种草帖累计20s奖励20金币，多阅读多奖励，每天阅读时长上限为30分钟，即最多可得1800金币。</p>
            <p>2.2 点赞一条种草帖奖励10金币，每日最多点赞次数为20次，即最多可得200金币。</p>
            <p>2.3 用户发送原创种草帖，每条奖励100金币，每位用户每日最多发送10条种草贴，即最多可得1000金币。</p>
            <p>2.4 用户发送原创种草帖，帖子图片/视频精美，内容优质，经管理员审核即可升级为精华帖，升级为精华帖后奖励发帖者2元现金红包。</p>
            <p>2.5分享种草帖，每十个不同的用户点击该分享链接，分享者可得1金币，每日最多可得100金币。</p>
            <p>
                2.6原创种草帖中，相关商品成功交易，发帖者得5%该商品返利；帖子中相关商品成功交易，推荐该商品的用户可得10%商品返利。<br>
                <span style="color: #EF4C5B">注：需从帖子中附属的商品链接进入，成功购买，才可得到奖励</span>
            </p>
            <p>2.7 用户发送所有帖子累计点赞100次，奖励现金红包1元；用户发送所有帖子累计点赞200次，奖励现金红包2元；用户发送所有帖子累计点赞达到及超过500次，奖励现金红包6元。</p>
            <h3>三、新人任务</h3>
            <p>3.1 新人用户首次下载注册喜乐APP奖励2元现金红包。</p>
            <h3>四、邀请任务</h3>
            <p>4.1 成功邀请好友下载注册喜乐APP奖励2元现金红包/每人;受好友邀请，使用好友分享链接下载注册喜乐APP奖励2000金币。</p>
        </div>
    </div>
</template>
<script>
import eleTit from "@/components/title/title";
export default{
    data(){
        return {

        }
    },
    components: {
        eleTit
    },
    created () {

    },
    mounted() {
	},
    methods: {
        goBak(){
            this.$router.go(-1);
        },
    }
}
</script>
<style>
    /* .tRule .iconfanhui{
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 34px;
        font-weight: bold;
    }
    .tRule .backBtn{
        position: fixed;
        top: 0;
        height: 80px;
        width: 100vw;
        line-height: 80px;
        text-align: center;
        border-bottom: 1px solid #EBEBEB;
        font-size: 36px;
        background: #fff;
    } */
    /* .tRule{line-height: 2;height: 100%;} */
    .tRule h3{font-weight: bold;font-size: 28px;padding: 30px}
    .tRule p{font-size: 28px;padding: 20px 30px;}
    .tRule .pc_tit_bar[data-v-186ad4fe]{
        background: #ffffff;
        
        
    }
</style>