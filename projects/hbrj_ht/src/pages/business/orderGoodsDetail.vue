<template>
    <section class="orderGoodsDetailPage">
        <orderTab :activeTab="'orderGoodsDetail'"></orderTab>
        <goodsDetail></goodsDetail>
    </section>
</template>
<script>
import orderTab from "@/components/orderTab"
import goodsDetail from "@/components/goodsDetail"
export default {
    data(){
        return {

        }
    },
    components:{
        orderTab,goodsDetail
    },
}
</script>
<style>

</style>


