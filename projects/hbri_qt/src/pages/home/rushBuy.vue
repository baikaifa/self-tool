<template>
    <div class="goodsShopPage">
        <backBtn :pageName="pageName" :type="type"></backBtn>
        <toTop></toTop>
        <div class="goodsListWrap">
            <sortTab @sortFun="_sortFun"></sortTab>
            <div class="goodsList">
                <goodsList :goodsList="goodsList" goType='home'></goodsList>
            </div>
        </div>
        <bottomBar fromType='0'></bottomBar>
    </div>
</template>
<script>

import backBtn from "@/components/backBtn";
import sortTab from "@/components/sortTab";
import bottomBar from "@/components/bottomBar";
import goodsList from "@/components/goodsList";
import toTop from "@/components/toTop";
import '@/assets/css/goodsShop.css';
import {homeGoodsList} from '@/api/index';

export default {
    components:{
        bottomBar,
        goodsList,
        toTop,
        backBtn,
        sortTab
    },
    data() {
        return {
            bannerImg: require('@/assets/img/home/banner1.jpg'),
            isShowMoreNav: false,
            bannerList: [
            ],
            moreNavs: [],
            goodsList: [],
            isClickType:'精选',
            pageName:"淘抢购",
            type:"",
            sortName:0,	//排序 0: 综合排序， 1：销量， 2：价格 3：最省钱
            sortType:0  //0 升序 1 降序
        }
    },
    created() {
        this.getGoodsList();
    },
    activated() {
        this.$nextTick(()=>{
            window.scrollTo(0,this.$homeScroll);
        })
    },
    methods: {
        changeGoodsType(item){
            this.isClickType = item.catName;
        },
        showMoreNavHandler() {
            this.isShowMoreNav = !this.isShowMoreNav;
        },
        getGoodsList() {
           
            
            let data = {
                searchType:3,
                sortName:this.sortName,
                sortType:this.sortType
            }
            homeGoodsList(data).then(d=>{
                if(d.code == 200) {
                    this.goodsList = d.data.list;
                } else {
                    console.log(d.msg);
                }
            })
        },
        goGoodsDetail(item) {
            
            
             this.$router.push({
                path: "/goodsDetail",
                query: {
                    itemId: item.itemId,
                    goType: 'home'
                }
            })
        },
        _sortFun:function(sortName,sortType){
            this.sortName=sortName;
            this.sortType=sortType;
            this.getGoodsList();
        }
    },
    beforeRouteLeave (to, from, next) {
        this.$homeScroll = document.documentElement.scrollTop || document.body.scrollTop;
        next();
    }
}
</script>
<style>

    

</style>
