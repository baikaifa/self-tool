<template>
    <div class="homePage">
        <toTop></toTop>
        <!-- 顶部搜索栏 -->
        <div class="homeHeader">
            <!-- 测试 -->
            <!-- <span class="iconfont icon-richscan_icon scanIcon" @click="regGood"></span> -->
            <span class="iconfont icon-richscan_icon scanIcon" @click="scanGoods"></span>
            <div class="searchWrap">
                <span class="searchIcon iconfont icon-sousuo"></span>
                <input type="text" placeholder="复制淘宝商品标题或链接，先领券再购物" @click="jumpToSearch">
            </div>
        </div>
        <div class="homeConent">
        <mt-loadmore 
            :top-method="loadTop" 
            :bottom-method="loadBottom" 
            :bottom-all-loaded="allLoaded" 
            ref="loadmore" 
            :autoFill="false">
        <!-- 分类商品栏 -->
        <div class="goodsNavbar">
            <div class="goodsType">
                <span v-for="(item,index) in moreNavs" :key="index" @click="changeGoodsType(item)" 
                :class="[item.catName == isClickType?'blue':'']">{{item.catName}}</span>
            </div>
            <div class="moreBtn">
                <a class="iconfont icon-gengduo" @click="showMoreNavHandler"></a>
            </div>
        </div>
        <div class="moreNav" v-show="isShowMoreNav">
            <div class="title">更多频道</div>
            <ul class="moreNavWrap">
                <li class="navItem" v-for="(item,index) in moreNavs" :key="index" @click="changeGoodsType(item)">
                    <img :src="item.catIcon" alt="">
                    <span class="text">{{item.catName}}</span>
                </li>
            </ul>
        </div>
        <!-- banner -->
        <div class="bannerWrap" v-show="!isShowMoreNav">
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(item,index) in bannerList" :key="index" @click.native="goGoodsDetail(item)">
                    <img :src="item.imageUrl" alt="" class="bannerImg">
                    <!-- <img :src="bannerImg" alt="" class="bannerImg"> -->
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 专题页面 -->
        <!-- 一张图 -->
        <div class="specialList" v-if="specailList.length==1">
            <img v-for="item in specailList" :src="item.imageUrl" class="pic1" @click="goSpecial(item.id)">
        </div>
        <!-- 两张图 -->
        <div class="specialList" v-if="specailList.length==2">
            <img v-for="item in specailList" :src="item.imageUrl" class="pic2" @click="goSpecial(item.id)">
        </div>
        <!-- 三张图 -->
        <div class="specialList" v-if="specailList.length==3">
            <img v-for="(item,index) in specailList" :src="item.imageUrl" :class="index==0?'pic3L':'pic3R'" @click="goSpecial(item.id)">
        </div>
        <!-- 四张图 -->
        <div class="specialList" v-if="specailList.length==4">
            <img v-for="item in specailList" :src="item.imageUrl" class="pic4" @click="goSpecial(item.id)">
        </div>

        <!-- 分类 -->
        <div class="hotCardList" v-show="!isShowMoreNav">
            <div class="hotCard mr1" @click.stop="jumpToPost">
                <p class="title">9块9包邮</p>
                <p class="desc">爆款商品 9.9包邮</p>
                <div class="goBtn">
                    <img src="@/assets/img/home/go.png" alt="">
                </div>
            </div>
            <div class="hotCard hotCard2" @click.stop="jumpToTao">
                <p class="title">淘抢购</p>
                <p class="desc">惊喜特惠 限时疯抢</p>
                <div class="goBtn">
                    <img src="@/assets/img/home/go.png" alt="">
                </div>
            </div>
        </div>
        <div class="goodsListWrap">
            <div class="header" v-show="!isShowMoreNav">
                <img src="@/assets/img/home/title_left.png" alt="">
                <span>猜你喜欢</span>
                <img src="@/assets/img/home/title_right.png" alt="">
            </div>
            <div class="goodsList">
                <goodsList :goodsList="goodsList" goType='home'></goodsList>
            </div>
        </div>
         </mt-loadmore>
        </div>
        <bottomBar fromType='0'></bottomBar>
    </div>
</template>
<script>
import bottomBar from "@/components/bottomBar"
import goodsList from "@/components/goodsList"
import toTop from "@/components/toTop"
import '@/assets/css/home.css'
import {homeBannerList,homeChannelList,homeGoodsList,getScanType,specialTopicList} from '@/api/index';
export default {
    components:{
        bottomBar,
        goodsList,
        toTop
    },
    data() {
        return {
            bannerImg: require('@/assets/img/home/banner1.jpg'),
            isShowMoreNav: false,
            bannerList: [
            ],
            moreNavs: [],
            goodsList: [],
            isClickType:'',
            channelId:'7',
            pageSize:20,
            pageIndex:1,
            allLoaded:false,
            pageTotal:0,
            goodScanUrl:'',
            specailList:[],
        }
    },
    created() {
        this.getBannerList();
        this.getChannelList();
        this.getGoodsList();
        this.getSpecialTopicList();
        window.sendQrCodeToJS = this.sendQrCodeToJS;
        window.scanCode = this.scanCode;
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
        jumpToTao(){//海抢购
            this.$router.push({name:'goodsPost',params:{type:'home',searchType:3,pageName:"海抢购"}})
        },
        jumpToPost(){//9.9包邮
            this.$router.push({name:'goodsPost',params:{type:'home',searchType:2,pageName:"9.9包邮"}})
        },
        jumpToSearch(){
            setTimeout(() => {
                this.$router.push({name:'searchGoods'});
            }, 100);
           
        },
        changeGoodsType(item){
            this.isShowMoreNav = false;
            this.channelId = item.catId;
            this.isClickType = item.catName;
            this.getGoodsList();
            this.getBannerList();
        },
        showMoreNavHandler() {
            this.isShowMoreNav = !this.isShowMoreNav;
        },
        getBannerList() {
            homeBannerList({"catId":this.channelId}).then(d=>{
                if(d.code == 200) {
                    this.bannerList = d.data;
                } else {
                    console.log(d.msg);
                }
            })
        },
        getChannelList() {
            homeChannelList().then(d=>{
                if(d.code == 200) {
                    this.moreNavs = d.data;
                    this.isClickType = d.data[0].catName;
                    this.channelId = d.data[0].catId;
                } else {
                    console.log(d.msg);
                }
            })
        },
        getGoodsList() {
            let data = {
                searchType:1,
                channelId:this.channelId,
                pageSize:this.pageSize,
                pageIndex:this.pageIndex
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
        goGoodsDetail(data) {
            var type=data.type;
            if(type==0){
                this.$router.push({
                    name: "goodsDetail",
                    query: {
                        itemId: data.item,
                        goType: 'home'
                    }
                })
            }else{
                window.location.href=data.item;
            }
            
        },
        scanGoods() {
            //调用壳的接口
            if(this.$phoneType == 'android'){
                window.SealsDiary.getQrCode();
            }else if(this.$phoneType == 'ios'){
                window.webkit.messageHandlers.scanQRCode.postMessage(null);
            }
        },
        scanCode(qrGood){
            this.goodScanUrl = qrGood;
            this.regGood();
        },
        sendQrCodeToJS(qrGood){
            this.goodScanUrl = qrGood;
            this.regGood();
        },
        regGood() {
            let data = {
                qrcodeStr: this.goodScanUrl
            }
            getScanType(data).then(d=>{
                if(d.code == 200) {
                    if(d.data.type == 1) {
                        this.$router.push({
                            name: "goodsDetail",
                            query: {
                                itemId: d.data.itemId,
                                goType: 'home'
                            }
                        })
                    }
                    if(d.data.type == 2) {
                        this.goTbGoodsDetail(d.data.url,d.data.itemId)
                    }
                } else {
                    this.$toast({
                        message: d.msg
                    })
                }
            })
        },
        goTbGoodsDetail(goodsUrl,itemId) {
            this.$router.push({name: 'scanGoodsDetail',query:{itemId:itemId,url:goodsUrl}})
        },
        goSpecial(id){
            this.$router.push({
                name: "specialList",
                query: {
                    itemId: id
                }
            })
        },
        getSpecialTopicList(){
            specialTopicList().then(data=>{
                if(data.code==200){
                    console.log(data.data);
                    this.specailList = data.data;
                }
            })
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
