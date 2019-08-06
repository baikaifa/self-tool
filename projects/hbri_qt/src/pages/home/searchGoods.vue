<template>
    <div class="searchView">
         <!-- 顶部搜索栏 -->
        <backBtn :type="type" :params="fromParams">
            <div class="searchHeader between" slot="other">
                <div class="searchWrap">
                    <span class="searchIcon iconfont icon-sousuo"></span>
                    <input type="text" placeholder="复制淘宝商品标题或链接，先领券再购物" v-model="searchKey" ref="searchBox">
                    <span class="closeBtn" @click="delSearchKey" v-if="searchKey"></span>
                    
                </div>
                <div class="searchBtn" @click="searchHander">搜索</div>
            </div>
        </backBtn>
        <!-- 历史记录 -->
        <div v-if="!clickSearch">
            <div class="between historyItems" v-if="hisData.length">
                <span>历史记录</span>
                <i class="iconfont icon-shanchu" @click="delHisList"></i>
            </div>
            <div class="noHisItems" v-if="hisData.length == 0">
                <p>这里空空如也~</p>
            </div>
            <div class="hisList">
                <div class="graybk" v-for="(item,index) in hisData" :key="index" @click="addSearchBox(item)">{{item}}</div>
            </div>
        </div>
         <!-- 搜索结果 -->
        <div v-if="clickSearch" class="content">
            <div v-for="(item,index) in searchList" :key="index" class="between searchItems" @click="jumpToDetail(item.itemId)">
                <div class="goodsImg"><img :src="item.pictUrl"/></div>
                <div class="goodsInfo">
                    <div>
                        <p class="goodsTitle"><span class="goodsFrom">{{item.shopType}}</span>{{item.title}}</p>
                    </div>
                    <div class="wt">
                        <span class="red zkFinalPrice">￥{{item.zkFinalPrice}}</span>
                        <span class="fontgray reservePrice">{{item.shopType}}价{{item.reservePrice}}</span>
                    </div>
                    <div class="between wt">
                        <span class="couponAmount" v-if="item.couponAmount">{{item.couponAmount}}元券</span>
                        <span class="commission centerTocenter">预估收益：￥{{item.commission}}</span>
                    </div>
                    <div class="wt shopName"><p>{{item.shopTitle}}</p></div>
                </div>
            </div>
            <div v-if="searchList.length==0 && initStatus" class="noResult">
                <p>已经搜肠刮肚了，还是没有找到~</p>
            </div>
        </div>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn"
import "@/assets/css/search.css"
import {getLocalData,setLocalData,removeItem} from "@/utils/store"
import {homeGoodsList} from "@/api/index"
export default {
    data(){
        return {
            type:'',
            hisData:[],
            searchKey:'',
            searchList:[],
            clickSearch:false,
            fromParams:{},
            initStatus:false
        }
    },
    created() {
        console.log(this.$route.params)
        this.type = this.$route.params.type || "home";
        if(this.type=="goodsPost"){
            this.fromParams = {
                catId: this.$route.params.catId,
                catLeafId: this.$route.params.catLeafId,
                showSearch: true,
                type: "teaItemList"
            }
        }
        this.getHisData();
    },
    mounted() {
         this.$refs.searchBox.focus();
    },
    methods: {
        delSearchKey(){
            this.searchKey = "";
        },
        addSearchBox(val){
            this.searchKey = val;
            let index = this.hisData.indexOf(val);
            this.hisData.splice(index,1);
            this.hisData.unshift(this.searchKey);
        },
        getHisData(){//得到历史记录
            let data = getLocalData("hbxj_hisData");
            if(JSON.stringify(data) !== "{}"){
                console.log(data);
                this.hisData = data;
            }else{
                this.hisData = [];
            }
        },
        delHisList(){//清空历史列表
            removeItem("hbxj_hisData");
            this.hisData = [];
        },
        searchHander(){//搜索事件
            if(!this.searchKey){
                this.searchList = [];
                this.clickSearch = false;
                return;
            }
            if(this.hisData.includes(this.searchKey)){
                let index = this.hisData.indexOf(this.searchKey);
                this.hisData.splice(index,1);
                this.hisData.unshift(this.searchKey);
            }else{
                this.hisData.unshift(this.searchKey);
            }
            setLocalData("hbxj_hisData",this.hisData);
            this.clickSearch = true;
            let params = {
                q:this.searchKey,
                searchType:0//搜索类型 ： 0:全频道，全类目查询 1：猜你喜欢 2:9.9包邮区 3：海抢淘  默认0全频道
            }
            homeGoodsList(params).then(d =>{
                if(d.data){
                    this.initStatus = false;
                    this.searchList = d.data.list;
                }else{
                    this.initStatus = true;
                    this.searchList = [];
                }
                
            })
        },
        jumpToDetail(id){
            this.$router.push({name:'goodsDetail',query:{itemId:id,goType:'searchGoods'}})
        }
    },
    components:{
      backBtn  
    }
}
</script>
<style></style>