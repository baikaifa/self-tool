<template>
    <!-- 商品列表 -->
    <div class='goodsContainer' style="height:100%;overflow-y:scroll;">
        <div class='goods'>
            <div class='goods_inner' v-for='(item,index) in goodsList' :key="index" @click="toDetails(item.itemId)">
                <img class='goods_img' :src='item.pictUrl' />
                <div class='goods_title'>
                    <span class='t_text'>{{item.title}}</span>
                </div>
                <div class='goods_save'>
                    <div class='save_1' v-if="item.couponAmount">
                        <span class='s_text'>券</span>
                        <span class='s_text_1'>¥{{item.couponAmount | exactNum}}</span>
                    </div>
                    <div  v-if="!item.couponAmount"></div>
                    <div class='save_2'>
                        <span class='s_text'>预估收益</span>
                        <span class='s_text_1'>{{item.commission |exactNum}}元</span>
                    </div>
                </div>
                <div class='goods_pride'>
                    <div>
                        <span class='p_price_1'>¥</span>
                        <span class='p_price_2' style="font-weight: bold">{{item.zkFinalPrice |exactNum}}</span>
                        <span class='p_oprice'>¥{{item.reservePrice |exactNum}}</span>
                    </div>
                    <div>
                        <span class='p_sailed'>已售{{item.volume |exactNum}}</span>
                    </div>
                </div>
                <div class='goods_watch'>
                    <!-- <div class='w_num'>浏览量{{item.pageviews}}</div> -->
                    <div class='w_icon'>
                        <i class='iconfont iconyou shop_goods_icon' size='14'></i>
                        <div v-for='(img_item,img_index) in item.avatar' :key='img_index'>
                            <img :src='img_item' class='i_img'></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {

            }
        },
        props:{
            goodsList: {
                type: Array,
                value: []
            },
            goType: {
                type: String,
                value: null
            }
        },
        methods:{
            toDetails(commId){
                // console.log(this.goType);
                // console.log(commId)
                var theQuery = {};
                theQuery.itemId = commId;
                if(this.goType) {
                    theQuery.goType = this.goType;
                }                
                this.$router.push({
                    name: "goodsDetail",
                    query: theQuery
                })
            }
		}
	}
</script>

<style scoped="">
    /*@import "goods_list.css";*/
    .shop_goods_icon{
        font-size: 0.14rem !important;
        margin-left: 0.06rem;
    }
    .goodsContainer .goods{
        padding-bottom: 0.2rem;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        background: #f7f7f7
    }
    .goodsContainer .goods_inner{
        margin-top: 0.20rem;
        margin-left: 0.20rem;
        width: 3.46rem;
        height: 5.45rem;
        overflow: hidden;
        border-radius: 0.12rem;
        background: #fff;
        display: flex;
        flex-direction: column
        /* border: 1px solid #EEEEEE */
    }
    .goodsContainer .goods_img{
        width: 3.68rem;
        height: 3.68rem;
    }
    .goodsContainer .goods_title{
        /*height: 1.1rem;*/
        display: flex;
        align-items: center;
        padding: 0.1rem 0.10rem;
    }
    .goodsContainer .t_name{
        text-align: center;
        width: 0.60rem;
        margin-right: 0.05rem;
        border-radius: 0.14rem;
        background-color: #FF5400;
        font-size: 0.20rem;
        color: #FFFFFF;
    }
    .goodsContainer .t_text{
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.28rem;
        font-weight: bold;
        line-height: 0.38rem/*33*/
    }
    .goodsContainer .goods_save{
        height: 0.28rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 0.10rem;
        padding-right: 0.10rem;
        margin-top:0.05rem;
    }
    .goodsContainer .save_1{
        display: flex;
        align-items: center;
        border: 1px solid #ff902c;
        border-radius: 0.04rem;
        height: 0.25rem;
    }
    .goodsContainer .save_1 .s_text_1{
        font-size: 0.18rem;
        color:  #ff902c;
        width: 0.64rem
    }
    .goodsContainer .save_1 .s_text{
        font-size: 0.2rem;
        color: #fff;
        background: #ff902c;
        height: 0.25rem;
        line-height: 0.25rem;
        width: 0.3rem
    }
    .goodsContainer .save_2 .s_text{
        font-size: 0.18rem;
    }
    .goodsContainer .save_2 .s_text_1{
        font-size: 0.20rem;
        color: #EF4454;
        font-weight: bold
    }
    .goodsContainer .iconyouhuiquan{
        font-size: 0.24rem;
        color: #A5A5A5
    }
    .goodsContainer .iconshouyi{
        font-size: 0.30rem;
        margin-right: -0.04rem;
        color: #A5A5A5
    }
    .goodsContainer .goods_pride{
        height: 0.69rem;
        padding: 0 0.10rem;
        /*margin-top: 0.2rem;*/
        display: flex;
        justify-content: space-between;
        align-items: flex-end
    }
    .goodsContainer .p_price_1{
        color:#EF4454;
        font-size: 0.20rem
    }
    .goodsContainer .p_price_2{
        color: #EF4454;
        font-size: 0.32rem
    }
    .goodsContainer .p_oprice{
        color: #A5A5A5;
        font-size: 0.20rem;
        text-decoration: line-through;
        margin-left: 0.08rem
    }
    .goodsContainer .p_sailed{
        color: #A5A5A5;
        font-size: 0.20rem
    }
    .goodsContainer .goods_watch{
        height: 0.40rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0.10rem;
        padding-right: 0.10rem
    }
    .goodsContainer .w_num{
        font-size: 0.20rem;
        color: #A5A5A5;
    }
    .goodsContainer .w_icon{
        display: flex;
        flex-direction: row-reverse;
        align-items: center
    }
    .goodsContainer .i_img{
        width: 0.26rem;
        height: 0.26rem;
        border-radius: 0.50%;
        margin-left: -0.08rem;
        border: 1px solid #FFFFFF
    }
    .goodsContainer .iconyou{
        font-size: 0.20rem;
        color: #A5A5A5;
    }
    .goodsContainer .no-data-text{
        display: none;
    }


</style>
