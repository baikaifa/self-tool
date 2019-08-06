<template>
    <div class="goodsTab fx flexEnd">
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
            tabList:[{name:"商品库",path:"goodsStore"},{name:"商品品类库",path:'category'},{name:"商品回收站",path:'cycle'},{name:"商品拉取规则",path:'goodsOutRule'}]
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
.goodsTab .tabItem{
    width: 154px;
    height: 43px;
    background-color: #dadce8;
    line-height: 43px;
    cursor: pointer;
}
.goodsTab .activeTab{
    width: 158px;
    height: 61px;
    line-height: 61px;
    background-color: #ffffff;
    font-size: 18px;
    color: #f85c5d;
}
</style>
