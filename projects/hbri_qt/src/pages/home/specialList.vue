<template>
    <div class="speList" :style="style">
        <div class="backV">
            <div class="btn">
                <i class="iconfont icon-fanhui" @click="goBack"></i>
                <span class="transTocenter">{{pageName}}</span>
            </div>
        </div>
        <img v-for="item in imageUrl" :src="item" alt="" class="titleImg">

        <!-- 分割线 -->
        <div class="splitTitle">
            <img src="../../assets/img/home/title_left.png" alt="">
            <span>商品列表名称</span>
            <img src="../../assets/img/home/title_right.png" alt="">
        </div>

        <div v-for="(item,index) in detailList" :key="index">
            <!-- 一列商品 -->
            <div class="detail_1 wbg" v-if="item.type==1" v-for="_item in item.lists" @click="toDetail(_item.itemId)">
                <img :src="_item.pictUrl" alt="">
                <div class="d1_right">
                    <p class="d1_title">
                        <span>{{_item.shopType }}</span>{{_item.title}}
                    </p>
                    <div class="d1_price">
                        <p class="red">¥<span class="font34"> {{_item.zkFinalPrice}}</span></p>
                        <p class="grey" style="padding-left: 0.3rem">原价 ¥ {{_item.reservePrice}}</p>
                    </div>
                    <div class="d1_coupon">
                        <p class="d1_coupon1 fl">{{_item.couponAmount}}元券</p>
                        <p class="d1_coupon2 fr">预估收益: ¥ {{_item.commission}}</p>
                    </div>
                    <div class="d1_store">{{_item.shopTitle}}</div>
                </div>
            </div>

            <!-- 两列商品 -->
            <div class="clearF">
                <div class="detail_2 wbg fl" v-if="item.type==2" v-for="_item in item.lists" @click="toDetail(_item.itemId)">
                    <img :src="_item.pictUrl" alt="">
                    <div class="d2_title font28">{{_item.title}}</div>
                    <div class="d2_coupon">
                        <div class="d2_coupon1 flex">
                            <span class="d2_coupon_t1 font20">券</span>
                            <span class="d2_coupon_t2 font18">¥ {{_item.couponAmount}}</span>
                        </div>
                        <div class="d2_coupon2 flex">
                            <span class="d2_coupon_t3">预估收益</span>
                            <span class="d2_coupon_t4 red font20">{{_item.commission}}元</span>
                        </div>
                    </div>
                    <div class="d2_price flex">
                        <p class="red d2_price1 font24">¥<span class="font34">{{_item.zkFinalPrice}}</span><span class="grey d2_price2">¥ {{_item.reservePrice}}</span></p>
                        <p class="grey d2_price3 font20">已售{{_item.volume}}</p>
                    </div>
                </div>
            </div>

            <!-- 三列商品 -->
            <div class="clearF">
                <div class="detail_3 wbg fl" v-if="item.type==3" v-for="_item in item.lists" @click="toDetail(_item.itemId)">
                    <img :src="_item.pictUrl" alt="">
                    <div class="d3_title font28">{{_item.title}}</div>
                    <div class="red font24" style="text-align: left;padding-left:0.1rem;">券后价: ¥ {{_item.zkFinalPrice}}</div>
                    <div class="d3_coupon font20">预估收益: ¥ {{_item.commission}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import {specialTopicDetail} from "@/api/index";
export default {
    data(){
        return{
            type: "home",
            pageName: "",
            detailList: [],
            style: "",
            imageUrl: [],
        }
    },
    created () {
        var id = this.$route.query.itemId;
        console.log(id);
        var params = {id: id};
        specialTopicDetail(params).then(data=>{
            if(data.code == 200) {
                console.log(data.data);
                this.pageName = data.data.name;
                this.detailList = data.data.list;
                // var test = [
                //     {type:1,lists:[{itemId:1},{itemId:2}]},
                //     {type:2,lists:[{itemId:3},{itemId:4}]},
                //     {type:1,lists:[{itemId:11},{itemId:12}]},
                //     {type:3,lists:[{itemId:21},{itemId:22},{itemId:32}]},
                // ];
                // this.detailList = test;
                var background = data.data.background;
                this.style = "background:"+background;
                this.imageUrl = data.data.templateImageUrl;
            } else {
                console.log(data.msg);
            }
        })
    },
    components:{
        backBtn
    },
    methods: {
        toDetail(itemid){
            this.$router.push({
                name: "goodsDetail",
                query: {
                    itemId: itemid
                }
            })
            console.log(itemid);
        },
        goBack(){
            this.$router.push('home')
        }
    }
}
</script>
<style>
    .speList{font-family:"华文细黑";}
    .speList img{display: block}
    .speList .fl{float: left;}
    .speList .fr{float: right}
    .speList .wbg{background: #fff}
    .speList .red{color: #ff0000}
    .speList .grey{color: #999999}
    .speList .flex{display: flex}
    .speList .font18{font-size: 0.18rem;}
    .speList .font20{font-size: 0.20rem;}
    .speList .font24{font-size: 0.24rem;}
    .speList .font28{font-size: 0.28rem;}
    .speList .font34{font-size: 0.34rem;}
    .speList .clearF{clear: both; overflow: auto}
    .speList .titleImg{
        width: 100vw;
        height: auto;
        margin-bottom: 0.15rem;
    }
    .speList .splitTitle{
        margin: 0.3rem;
        color: #3289ff;
        font-size: 0.36rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .speList .splitTitle img{
        margin: 0 0.2rem;
        width: 0.39rem;
        height: auto;
    }
    .speList .detail_1{
        display: flex;
        padding: 0.2rem;
        margin-bottom: 0.2rem;
    }
    .speList .detail_1 img{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.08rem
    }
    .speList .d1_title{
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        font-size: 0.26rem;
        font-weight: bold;
        text-align: left;
        line-height: 1.5;
    }
    .speList .d1_title span{
        color: #ff942c;
        border: 1px solid #ff942c;
        padding: 0.02rem 0.06rem;
        font-size: 0.22rem;
        border-radius: 0.05rem;
        margin-right: 0.2rem;
        font-weight: normal;
        height: 0.3rem;
        line-height: 0.3rem;
    }
    .speList .d1_price{
        font-size: 0.24rem;
        display: flex;
        align-items: baseline;
        padding-left: 0.12rem;
        margin-top: 0.2rem;
    }
    .speList .d1_right{
        margin-left: 0.4rem;
        height: 2.5rem;
        position: relative;
    }
    .speList .d1_coupon{
        width: 4rem;
        height: 0.5rem;
        padding-left: 0.12rem;
        margin-top: 0.25rem;
    }
    .speList .d1_coupon1{
        color: #fff;
        background: #ff942c;
        border: 1px solid #ff942c;
        border-radius: 0.05rem;
        font-size: 0.2rem;
        height: 0.32rem;
        line-height: 0.32rem;
        padding: 0 0.05rem;
    }
    .speList .d1_coupon2{
        font-size: 0.24rem;
        color: #ff942c;
        border: 1px solid #ff942c;
        height: 0.32rem;
        line-height: 0.32rem;
        background: #fff4e9;
        border-radius: 0.05rem;
        padding: 0 0.22rem;
    }
    .speList .d1_store{
        text-align: left;
        padding-left: 0.12rem;
        font-size: 0.24rem;
        position: absolute;
        bottom: 0;
    }
    .speList .d2_title{
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        text-align: left;
        padding: 0.1rem;
        line-height: 1.5;
    }
    .speList .detail_2{
        width: 3.5rem;
        height: 5.6rem;
        border-radius: 0.1rem;
        overflow: hidden;
        margin-left: 0.16rem;
        margin-bottom: 0.2rem;
    }
    .speList .detail_2 img{
        width: 3.5rem;
        height: 3.5rem;
    }
    .speList .d2_coupon{
        margin-top: 0.05rem;
        padding: 0 0.1rem;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }
    .speList .d2_coupon_t3{
        font-size: 0.16rem;
    }
    .speList .d2_coupon1{
        height: 0.3rem;
        border: 1px solid #ff902c;
        border-radius: 0.05rem;
    }
    .speList .d2_coupon_t1{
        line-height: 0.3rem;
        background: #ff902c;
        padding: 0 0.02rem;
        color: #fff;
    }
    .speList .d2_coupon_t2{
        line-height: 0.3rem;
        padding: 0 0.15rem;
        color: #ff902c;
    }
    .speList .d2_price{
        height: 0.5rem;
        position: relative;
        padding: 0 0.12rem;
        justify-content: space-between;
        align-items: baseline;
        margin-top: 0.1rem;
    }
    .speList .d2_price2{
        text-decoration: line-through;
        margin-left: 0.15rem;
    }
    .speList .d3_title{
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        padding: 0.1rem;
        text-align: left;
    }
    .speList .detail_3 img{
        height: 2.3rem;
        width: 2.3rem;
    }
    .speList .detail_3{
        width: 2.3rem;
        height: 3.8rem;
        overflow: hidden;
        border-radius: 0.1rem;
        margin-left: 0.15rem;
        margin-bottom: 0.2rem;
    }
    .speList .d3_coupon{
        color: #ff942c;
        border: 1px solid #ff942c;
        background: #fff4e9;
        border-radius: 0.05rem;
        margin: 0.1rem auto;
        width: 2.1rem;
    }
    .speList .d2_coupon2{
        align-items: baseline
    }
    .backV{
        width:100%;
        background: #fff;
        border-bottom:1px solid #f2f2f2;
        position: fixed;
        z-index:999;
        top:0;
    }
    .backV .btn{
        width:100%;
        height:0.8rem;
        display: flex;
        align-items: center;
        padding-left:0.24rem;
        position:relative;
    }
    .backV .btn i{
        font-size:0.32rem;
    }
</style>