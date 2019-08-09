<template>
    <div class="iDetail">
        <!-- 后退键 -->
		<eleTit></eleTit>
        <!-- <div class="backBtn">
            <i class="iconfont iconfanhui" @click="goBak"></i>
            任务中心
        </div> -->
        <!-- 内容 -->
        <div class="lists">
            <scroller :on-refresh="refList" :on-infinite="lodList" ref="mallScro" :nodatatext="noDaTxt">
                <!-- <div class="title">收益明细</div> -->
                <div v-for="item in detailList" class="listDetail">
                    <div class="dLeft">{{item.title}}</div>
                    <div class="dRight">
                        <p :class="['r1', item.flag==0?'red':'grey']">
                            <span v-if="item.flag==0">+{{item.amount}}</span>
                            <span v-if="item.flag==1">{{item.amount}}</span>
                            <span v-if="item.incomeType==0">金币</span>
                            <span v-if="item.incomeType==1">元</span>
                        </p>
                        <p class="r2">{{item.time}}</p>
                    </div>
                </div>
            </scroller>
        </div>
    </div>
</template>
<script>
import {reqOther} from "../../utils/request";
import eleTit from "@/components/title/title";
export default{
    data(){
        return {
            noDaTxt: "", // 没有数据时显示的内容
            pageNo: 0,
            totalPage: 1,
            pageSize: 20,
            detailList: []
        }
    },
    components: {
        eleTit
    },
    created () {
    },
    mounted() {
		this.$refs.mallScro.finishInfinite(false);
		this.$refs.mallScro.finishPullToRefresh();

	},
    methods: {

        goBak(){
            this.$router.go(-1);
        },
        // 刷新数据
        refList() {
            console.log("刷新");
            this.pageNo = 2;
            this.detailList.length = 0;
			this.getDetail();
            this.$refs.mallScro.finishPullToRefresh();
		},
        // 加载更多
        lodList() {
            debugger;
            this.pageNo = 1 + this.pageNo;
            console.log("加载");
			this.getDetail();
		},
        // 获取数据
        getDetail(){
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            reqOther.inDetail(params).then(res => {
                if(res.code==200){


                    debugger;
                    this.totalPage = res.data.totalPage;
                    // if(this.totalPage < this.pageNo){
                    //     console.log(1111111111111111111);
                    //     this.$refs.mallScro.finishInfinite(true);
                    //     // return
                    // }
                    var data = res.data.bonusList;
                    for(var i = 0; i<data.length; i++){
                        if(data[i].amount.indexOf("-")>-1){
                            data[i].flag = 1;
                        }else{
                            data[i].flag = 0;
                        }
                        this.detailList.push(data[i])
                    }
                    console.log(this.totalPage, this.pageNo);
                    
                }
            })
        }
    }
}
</script>
<style>
    .iDetail .iconfanhui{
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 34px;
        font-weight: bold;
    }
    .iDetail .backBtn{
        position: fixed;
        top: 0;
        height: 80px;
        width: 100vw;
        line-height: 80px;
        text-align: center;
        box-shadow: 0 -6px 10px 4px #ddd;
        font-size: 34px;
    }
    .iDetail .lists{
        /* position: fixed;
        top: 80px; */
        position: relative;
        width: 100vw;
        height: fill-available;
	    height: -webkit-fill-available;
    }
    .iDetail .title{
        text-align: center;
        height: 76px;
        line-height: 72px;
        background: #FBFBFB;
        font-size: 30px;
    }
    .iDetail .listDetail{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 120px;
        border-bottom: 1px solid #F7F7F7;/*no*/
        margin: 0 20px;
        font-size: 32px;
    }
    .iDetail .r1{
        text-align: right;
        font-size: 28px;
    }
    .iDetail .r2{
        text-align: right;
        color: #A9A9A9;
        font-size: 24px;
    }
    .iDetail .red{
        color: #F04959;
    }
    .iDetail .grey{
        color: #666666;
    }
</style>