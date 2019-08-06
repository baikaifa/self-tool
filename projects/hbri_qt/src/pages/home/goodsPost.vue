<template>
    <div class="goodsShopPage">
        <toTop></toTop>
        <backBtn :pageName="pageName" :type="type" v-if="!showSearch"></backBtn>
        <backBtn :type="type" v-if="showSearch">
            <div class="searchHeader between" slot="other">
                <div class="searchWrap">
                    <span class="searchIcon iconfont icon-sousuo"></span>
                    <input type="text" placeholder="记得先领券再购物哦" v-model="searchKey" ref="searchBox" @click="jumpToSearch">
                    <span class="closeBtn" @click="delSearchKey" v-if="searchKey"></span>
                </div>
            </div>
        </backBtn>
        
        <div class="goodsListWrap">
            <mt-loadmore 
            :top-method="loadTop" 
            :bottom-method="loadBottom" 
            :bottom-all-loaded="allLoaded" 
            ref="loadmore" 
            :autoFill="false">
                <sortTab @sortFun="_sortFun"></sortTab>
                <div class="goodsList">
                    <goodsList :goodsList="goodsList" goType='home'></goodsList>
                </div>
            </mt-loadmore>
        </div>
        
        <bottomBar fromType='2' v-if="quanView"></bottomBar>
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
            pageName:"",
            type:"",
            searchType:'',//搜索类型 ： 0:全频道，全类目查询 1：猜你喜欢 2:9.9包邮区 3：海抢淘  默认0全频道
            sortName:0,	//排序 0: 综合排序， 1：销量， 2：价格 3：最省钱
            sortType:0,  //0 升序 1 降序
            catId:'',
            catLeafId:'',
            searchKey: "",
            quanView:"",
            pageSize:20,
            pageIndex:1,
            allLoaded:false,
            pageTotal:0
        }
    },
    created() {
        this.quanView = this.$route.params.quanView;
        this.type = this.$route.params.type;
        this.searchType = this.$route.params.searchType;
        this.catId = this.$route.params.catId;
        this.catLeafId = this.$route.params.catLeafId;
        this.showSearch = this.$route.params.showSearch?true:false;
        this.pageName = this.$route.params.pageName;
        this.getGoodsList();
        console.log(this.catId, this.catLeafId)
    },
    activated() {
        this.$nextTick(()=>{
            window.scrollTo(0,this.$homeScroll);
        })
    },
    methods: {
        loadBottom(){//上滑加载
            if(this.pageIndex < this.pageTotal){
                this.pageIndex = this.pageIndex+1;
                this.getGoodsList();
            }else{
                this.allLoaded = true;
            }
            this.$refs.loadmore.onBottomLoaded();
        },
        loadTop(){//下拉刷新
            this.pageIndex = 1;
            this.getGoodsList();
            this.$refs.loadmore.onTopLoaded();
        },
        jumpToSearch(){
            this.$router.push({
                name:'searchGoods',
                params:{
                    type:'goodsPost',
                    catId: this.catId,
                    catLeafId: this.catLeafId
            }});
        },
        delSearchKey(){
            this.searchKey = "";
        },
        changeGoodsType(item){
            this.isClickType = item.catName;
        },
        showMoreNavHandler() {
            this.isShowMoreNav = !this.isShowMoreNav;
        },
        getGoodsList() {
            let data = {
                searchType:this.searchType,
                sortName:this.sortName,
                sortType:this.sortType,
                catId:this.catId,
                catLeafId:this.catLeafId,
                pageSize:this.pageSize,
                pageIndex:this.pageIndex,
            }
            homeGoodsList(data).then(d=>{
                if(d.code == 200) {
                    this.pageTotal = d.data.pageCount;
                    if(this.pageIndex == 1){
                        this.goodsList = d.data.list;
                    }else{
                        this.goodsList = this.goodsList.concat(d.data.list);
                    }
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
