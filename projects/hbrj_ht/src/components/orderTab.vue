<template>
    <div class="orderTab fx flexEnd">
        <span v-for="(item,index) in tabList" :key="index" 
        :class="['tabItem',activeTab == item.path ?'activeTab' :'mr5']"
        @click="jumpToPage(item.path)">{{item.name}}</span>
    </div>
</template>
<script>
export default {
    props:{
        activeTab:''
    },
    data(){
        return {
            clickTab:this.activeTab,
            tabList:[{name:"订单详情",path:"orderDetail"},{name:"商品详情",path:'orderGoodsDetail'},{name:"会员详情",path:'numberDetail'}]
        }
    },
    methods: {
        jumpToPage(path){
            this.clickTab = path;
            this.$router.push({name:path});
        }
    },
}
</script>
<style>
.orderTab .tabItem{
    width: 154px;
    height: 43px;
    background-color: #dadce8;
    line-height: 43px;
    cursor: pointer;
}
.orderTab .activeTab{
    width: 158px;
    height: 61px;
    line-height: 61px;
    background-color: #ffffff;
    font-size: 18px;
    color: #f85c5d;
}
</style>
