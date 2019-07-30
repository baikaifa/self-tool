<template>
    <div class="teaItemList">
        <div class="search">
            <div class="searchWrap">
                <span class="searchIcon iconfont icon-sousuo"></span>
                <input type="text" placeholder="记得先领券再购物哦" @click="jumpToSearch">
            </div>
        </div>
        <div class="allClass">
            <div class="allClassL">
                <div :class='["firstClass", selected==item.catId?"selected":""]' v-for="item in classList" @click.stop="getSecond(item.catId)">
                    {{item.catName}}
                </div>
            </div>
            <div class="allClassR">
                <div class="secondClass" v-for="item in secondList" @click.stop="toPage(item.catId)">
                    <img :src="item.catIcon" alt="" style="height: 1rem; width: 1rem">
                    <p class="font24">{{item.catName}}</p>
                </div>
            </div>
        </div>
        <bottomBar fromType='1'></bottomBar>
    </div>
</template>
<script>
import bottomBar from "@/components/bottomBar";
import {allClass} from "@/api/index"
export default{
    data(){
        return{
            firstClass: "",
            selected: 1,
            classList: [],
            secondList: [],
            catLeafId: ""
        }
    },
    created () {
        this.getInfo()
    },
    methods: {
        jumpToSearch(){
            this.$router.push({name:'searchGoods',params:{type:'teaItemList'}});
        },
        getInfo(){
            allClass().then(data => {
                if(data.code == 200){
                    this.classList = data.data
                    this.getSecond(this.selected)
                }
            })
        },
        getSecond(type){
            console.log(type)
            this.selected = type;
            let seList = this.classList.find(data => data.catId == type);
            this.secondList = seList.childCat;
        },
        toPage(id){
            this.$router.push({
                name: "goodsPost", 
                params: {
                    catId: this.selected,
                    catLeafId: id,
                    showSearch: true,
                    searchType: 0,
                    type: "teaItemList"
                }
            })
            console.log('catLeafId: ', id, 'catId: ', this.selected)
        }
    },
    components: {
        bottomBar
    }
}
</script>
<style>
    .teaItemList{
    }
    .teaItemList .searchWrap .searchIcon {
        padding: 0 0.16rem 0 0.25rem;
        color: #404040;
        font-size: 0.4rem;
    }
    .teaItemList .searchWrap > input {
        height: 0.66rem;
        background: none;
        border: none;
        flex: 1;
        line-height: normal;
    }
    .teaItemList .searchWrap > input:focus {
        outline: none;
    }
    .teaItemList .searchWrap > input::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
        color: #565656;
        font-size: 0.24rem;
    }
    .teaItemList .searchWrap > input::-moz-placeholder { /* Firefox 19+ */  
        color: #565656;
        font-size: 0.24rem;
    }
    .teaItemList .searchWrap > input:-ms-input-placeholder { /* IE 10+ */ 
        color: #565656;
        font-size: 0.24rem;
    }
    .teaItemList .searchWrap > input:-moz-placeholder { /* Firefox 18- */ 
        color: #565656;
        font-size: 0.24rem;
    }
    .teaItemList .searchWrap{
        width: 6.3rem;
        height: 0.66rem;
        background: #f1f1f1;
        margin: 0.14rem auto;
        border-radius: 0.33rem;
        display: flex;
        align-items: center
    }
    .teaItemList .search{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #e2e2e2;
        background:#fff;
    }
    .teaItemList .allClassL{
        width: 2.04rem;
        min-height: calc(100vh - 1rem);
        padding: 0 0.32rem;
        border-right: 1px solid #e2e2e2;
        padding-bottom:1rem;
    }
    .teaItemList .allClass{
        display: flex;
        margin-top: 1rem;
        height:calc(100vh-1rem);
    }
    .teaItemList .firstClass{
        height: 0.58rem;
        width: 1.4rem;
        line-height: 0.58rem;
        font-size: 0.3rem;
        font-weight: bold;
        margin-top: 0.48rem;
    }
    .teaItemList .selected{
        border-radius: 0.29rem;
        background: #3289ff;
        color: #fff;
    }
    .teaItemList .allClassR{
        width: 5.4rem;
    }
    .teaItemList .secondClass{
        float: left;
        margin-top: 0.5rem;
        width: 1.8rem;
        height: 1.4rem;
    }
</style>
