<template>
    <div class="myColletion">
        <backBtn :type="type" :pageName="pageName"></backBtn>
        <div>
            <div class="collection" v-for="item in collectionList"
                @click="toDetail(item.itemId)"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd(item.itemId)">
                <img :src="item.itemPictUrl" class="collectImg">
                <div class="detail">
                    <div class="title">
                        <span class="source">淘宝</span>
                        <span class="titleText">{{item.itemTitle}}</span>
                    </div>
                    <div class="coupon">
                        <div class="couponNum"><span>券</span><span>¥{{item.itemCouponAmount}}</span></div>
                        <div class="commission">预估收益<span>&nbsp{{item.itemCommissionRate | price}}元</span></div>
                    </div>
                    <div class="price">
                        <div class="priceL">
                            <p class="left1">¥ <span>{{item.itemZkPrice | price}}</span></p>
                            <p class="left2">淘宝价 ¥ {{item.itemReservePrice | price}}</p>
                        </div>
                        <div class="priceR">已售{{item.itemVolume}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="showToast" v-if="showToast">
            <div class="toastOut">
                <div class="toastText">是否确认删除收藏</div>
                <div class="toastBtn">
                    <div class="cancelBtn" @click.stop="cancel">取消</div>
                    <div class="split"></div>
                    <div class="confirmBtn" @click.stop="confirm">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {myCollection, goodsCollect} from "@/api/index";
import backBtn from "@/components/backBtn";
export default{
    data(){
        return {
            type: "personalCenter",
            pageName: "收藏夹",
            pageNo: 1,
            pageSize: 20,
            showToast: false,
            collectionList: []
        }
    },
    components: {
        backBtn
    },
    created () {
        this.getInfo()
    },
    filters:{
        price:function(price){
            return price.toFixed(2)
        }
    },
    methods: {
        getInfo(){
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            }
            myCollection(params).then(data => {
                console.log(data)
                if(data.code == 200){
                    var data = typeof(data.data) === "string" ? JSON.parse(data.data) : data.data;
                    this.collectionList = data.list;
                }
            })
        },
        touchStart(ev){
            this.disX = 0;
            var ev = ev || event;
            if(ev.touches.length == 1){
                // 记录开始位置
                this.startX = ev.touches[0].clientX;
            }
        },
        touchMove(ev){
            var ev = ev || event;
            if(ev.touches.length == 1) {
                // 滑动时距离浏览器左侧实时距离
                this.moveX = ev.touches[0].clientX
            
                //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                this.disX = this.startX - this.moveX;
            }
        },
        touchEnd(id){
            if(this.disX >= 50){
                this.showToast = true;
                this.delId = id;
            }
            this.disX = 0;
        },
        toDetail(id){
            this.$router.push({
                path: "/goodsDetail",
                query: {
                    itemId: id,
                    goType: "myCollection"
                }
            })
        },
        cancel(){
            this.showToast = false;
            this.delId = "";
        },
        confirm(){
            let params = {
                itemId: this.delId,
                status: 1
            }
            console.log(params)
            goodsCollect(params).then(data => {
                if(data.code == 200){
                    this.$toast("已取消")
                    this.getInfo()
                }else{
                    this.$toast("取消失败");
                    console.log(data.msg)
                }
            })
            this.showToast = false;
        }
    }
}
</script>
<style>
    .myColletion .collection{
        display: flex;
        padding: 0.2rem;
        border-bottom: 1px solid #f2f2f2;
        background: #fff
    }
    .myColletion .collection>img{
        /* width: 2.27rem; */
        height: 2.27rem;
        border-radius: 0.1rem;
        margin-right: 0.2rem;
    }
    .myColletion .collection .title{
        font-size: 0.24rem;
        text-align: left;
        margin-top: 0.1rem
        
    }
    .myColletion .collection .source{
        color: #ff902c;
        border: 1px solid #ff902c;
        padding: 0.01rem 0.08rem;
        margin-right: 0.01rem
    }
    .myColletion .collection .titleText{
        font-weight: bold;
        line-height: 0.4rem;
    }
    .myColletion .collection .coupon{
        margin-top: 0.3rem;
        display: flex;
        border-radius: 4px;
        justify-content: space-between;
        align-items: center
    }
    .myColletion .collection .couponNum{
        display: flex
    }
    .myColletion .collection .coupon span{
        display: inline-block;
    }
    .myColletion .collection .couponNum>span:first-child{
        background: #ff902c;
        color: #fff;
        font-size: 0.23rem;
        font-weight: bold;
        height: 0.27rem;
        width: 0.35rem;
        line-height: 0.27rem;
        border: 1px solid #ff902c;
        border-radius: 0.04rem 0 0 0.04rem;
    }
    .myColletion .collection .couponNum>span:nth-child(2){
        color: #ff902c;
        height: 0.27rem;
        font-size: 0.2rem;
        line-height: 0.27rem;
        width: 0.78rem;
        border: 1px solid #ff902c;
        border-radius: 0 0.04rem 0.04rem 0;

    }
    .myColletion .collection .commission{
        font-size: 0.22rem
    }
    .myColletion .collection .commission>span{
        color: #e31212
    }
    .myColletion .collection .price{
        display: flex;
        margin-top: 0.3rem;
        justify-content: space-between;
        align-items: baseline;
        color: #8c8c8c
    }
    .myColletion .collection .priceL p{
        display: inline-block
    }
    .myColletion .collection .priceR{
        font-size: 0.22rem
    }
    .myColletion .collection .left1{
        color: #e31212;
        font-size: 0.2rem;
    }
    .myColletion .collection .left1>span{
        font-size: 0.4rem;
    }
    .myColletion .collection .left2{
        font-size: 0.26rem;
        text-decoration: line-through;
        margin-left: 0.15rem
    }
    .myColletion .showToast{
        background: rgba(0, 0, 0, 0.6);
        height: 100vh;
        width: 100vw;
        position: fixed;
        z-index: 1000;
        top: 0;
        bottom: 0;
    }
    .myColletion .toastOut{
        background: #fff;
        height: 2.98rem;
        width: 5.13rem;
        border-radius: 0.2rem;
        position: absolute;
        top: 43%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .myColletion .toastText{
        height: 2.04rem;
        line-height: 2.04rem;
        font-size: 0.34rem;
        font-weight: bold
    }
    .myColletion .toastBtn{
        border-top: 1px solid #d9d9d9;
        display: flex;
    }
    .myColletion .toastBtn>div{
        height: 0.93rem;
        line-height: 0.93rem;
        font-size: 0.28rem;
    }
    .myColletion .split{
        border-right: 1px solid #d9d9d9
    }
    .myColletion .cancelBtn{
        width: 50%
    }
    .myColletion .confirmBtn{
        width: 50%;
        color: #3288ff
    }

</style>