<template>
    <div class="grass-red-tip">
		<!-- <eleTit bak="true"></eleTit> -->
        <div class="red-tip_box">
            <div class="red-tip_user-info">
                <div class="red-tip_user-bg">
                    <span>阅读点赞红包</span>
                    <div class="red-tip_user-avatar">
                        <img :src="weChartInfos.memberAvatar" alt="">
                    </div>
                </div>
                
                <div class="red-tip_user-nick">
                    <p>由<span>{{weChartInfos.memberName}}</span>发送</p>
                </div>
            </div>
            <div class="red-tip_number">
                <p class="number-num"><span>10</span>喜乐币</p>
                <p class="number-help">由于你的付出，楼主可额外获得<span>0.1</span>元现金红包</p>
                <div class="red-tip_btn-group">
                    <button type="button" class="btn-red" @click="goPostGroup">我也想发帖</button>
                    <button type="button" class="btn-yellow" @click="goCash">去兑现</button>
                </div>
                <p class="number-info">已领<span>{{grassLength}}</span>个红包</p>
            </div>
        </div>
        <div class="red-tip_log-lists">
            <div class="red-tip_log-list" v-for="(item, index) in logArr" :key="index">
                <div class="red-tip_log-avatar">
                    <img :src="item.avatar" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">{{item.name}}</p>
                    <p class="log-time">{{item.time}}</p>
                </div>
                <div class="gold-name">
                    <span>+10金币</span>
                </div>
            </div>
            <!-- <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div>
            <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div>
            <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div>
            <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div>
            <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div>
            <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div>
            <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div>
            <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div>
            <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div>
            <div class="red-tip_log-list">
                <div class="red-tip_log-avatar">
                    <img src="../../assets/img/grassgrowing/av-bg.png" alt="">
                </div>
                <div class="red-tip_log-nick">
                    <p class="nick-name">多彩的春季</p>
                    <p class="log-time">18:47:29</p>
                </div>
                <div class="gold-name">
                    <span>+20金币</span>
                </div>
            </div> -->
        </div>

    </div>
</template>
<script>
import {caoApi,reqPersonal} from "../../utils/request";
import eleTit from "@/components/title/title";
import Vue from "vue";
export default {
    components: {eleTit},
    data() {
        return {
            weChartInfos: {},
            logArr: [],
            uid: this.$route.query.userId,
            grassLength: 0

        }
    },
    created() {
        this.getGrassTip();
        this.getWechartInfo();
    },
    mounted() {
    },
    methods: {
        // 获取历史记录
        getGrassTip(){
            const _this = this;
            let params = {
                type: '223',
                userId: this.$route.query.userId,
                tid: this.$route.query.tid,
            }
            console.log(this.$route.query);
            caoApi.grassRedTip(params).then((data)=>{
                if(data.code == 200){
                    _this.logArr = data.data.names;
                    _this.grassLength = data.data.names.length
                } else if(data.code == 217) {
                    _this.logArr = data.data.names;
                    _this.grassLength = data.data.names.length
                } else {
                    alert(data.msg);
                }
            })
        },
        // 获取微信信息
        getWechartInfo(){
            const _this = this;
            if(this.$route.query.weChartId){
                let params = {
                    wxid: this.$route.query.weChartId
                }
                caoApi.getWechartInfo(params).then((data)=>{
                    if(data.r == 200){
                        _this.weChartInfos = data.data;
                    }
                })
            }else{
                reqPersonal.userMessage().then(res=>{
                    if(res.code == 200) {
                        _this.weChartInfos = {
                            memberAvatar:res.data.avatar,
                            memberName:res.data.nickname
                        };
                    } else {
                        console.log("获取数据失败")
                    }
                })
            }
          
        },
        // 我也想发帖
        goPostGroup(){
            let query = {
                userid: this.uid
            }
            this.$router.push({
                name:"groupWorkPublish",
                query:query
            });
        },
        goCash(){
            let query = {
                userid: this.uid
            }
            this.$router.push({
                name:"personal",
                query:query
            });
        }




    }    
}
</script>
<style scoped="scoped" type="text/css">
.grass-red-tip {
    height: 100vh;
    background: #f4f5f7;
    
}

.app_head,
.tit_bar {
    background-color: #fff;
    z-index: 9999;
}

.red-tip_box {
    position: fixed;
    top:0;
    width: 750px;
    height: auto;
    background-color: #fff;
    
}

.red-tip_user-info {
    width: 100%;
    height: auto;
}

.red-tip_user-bg {
    position: relative;
    width: 100%;
    height: 320px;
    line-height: 160px;
    text-align: center;
    background-image: url('../../assets/img/grassgrowing/red-tip-bg.png');
    background-repeat: no-repeat;
    background-position: top top; 
    background-size: 750px;
}

.red-tip_user-bg span {
    font-size: 40px;
	font-weight: bold;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #ffffff;
}

.red-tip_user-avatar {
    position: absolute;
    height: 144px;
    width: 144px;
    background-color: red;
    bottom: 0px;
    left: 50%;
    margin-left: -72px;
    border-radius: 50%;
    overflow: hidden;
}

.red-tip_user-avatar img{
    margin-top: -20px;
    width: 144px;
    height: 144px;
}
.red-tip_user-nick {
    width: 100%;
    height: auto;
    text-align: center;
    margin-top: 26px;
}

.red-tip_user-nick p{
	font-size: 30px;
	font-weight: bold;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #000000;
}
.red-tip_user-nick p span{
	color: #ef4454;
}

.red-tip_number {
    width: auto;
    height: auto;
    margin-top: 30px;
    text-align: center;
    padding: 0 20px;
    
}
.number-num {
    height: 80px;
    line-height: 80px;
    font-size: 38px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
    color: #343434;
    text-align: -moz-center !important;
    text-align: center;
    vertical-align: middle;
}
.number-num span{
    vertical-align: middle;
    font-size: 72px;
	font-weight: bold;
	font-stretch: normal;
	letter-spacing: 0px;
    color: #ff9600;
    padding-right: 10px;
}

.number-help {
    font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
    letter-spacing: 1px;
    padding: 50px 0 40px 0;
	color: #626262;
}
.number-help span{
    color: #ff9600;
}

.red-tip_btn-group {
    width: 100%;
    height: auto;
}

.red-tip_btn-group button {
    width: 235px;
	height: 66px;
    border-radius: 33px;
    font-size: 30px;
    text-align: center;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 0px;
	color: #ffffff;
}

.btn-red{
    border: 2px solid #ef4454;
    background-color: #ef4454;
    margin-right: 80px;
}


.btn-yellow {
    border: 2px solid #e6a830;
    background-color: #e6a830;
}

.number-info {
    text-align: left;
    font-size: 26px;
    padding: 50px 0 20px 0;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #626262;
}

.red-tip_log-lists {
    position: fixed;
    background-color: #fff;
    margin-top: 830px;
    width: 710px;
    height: 800px;
    padding: 0 20px;
    overflow-y: auto;
    /* bottom: 0px; */
}
.red-tip_log-list{
    display: flex;
    padding: 25px 0;
    border-bottom: 1px solid #ededed;
}
.red-tip_log-avatar {
    width: 83px;
    height: 83px;
}
.red-tip_log-avatar img{
    width: 83px;
    height: 83px;
}

.red-tip_log-nick{
    margin-left: 20px;
    width: 400px;
    text-align: left;
    line-height: 40px;
}

.nick-name {
    font-size: 26px;
    padding-top: 1px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #3f3f3f;
}
.log-time{
    font-size: 26px;
    padding-top: 15px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #a2a2a2;
}

.gold-name {
    width: 100%;
    height: 30px;
    text-align: right;
	font-size: 30px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 0px;
	color: #df9300;
}

</style>
