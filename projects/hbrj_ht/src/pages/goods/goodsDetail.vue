<template>
    <div class="goodsDetailPage">
        <goodsDetailNav></goodsDetailNav>
        <goodsDetail :upBtnShow="true" :tableData="table"></goodsDetail>
    </div>
</template>
<script>
import goodsDetailNav from "@/components/goodsDetailNav"
import goodsDetail from "@/components/goodsDetail"
export default {
    data(){
        return {
          tableData:this.$route.params
            
        }
    },
    components:{
        goodsDetailNav,goodsDetail
    },
    methods: {
      table(){
        return this.tableData
      }
       
    }

}
</script>
<style>



</style>
