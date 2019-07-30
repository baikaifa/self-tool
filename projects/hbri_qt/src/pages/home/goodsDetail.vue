<template>
    <div class="gdsdetail">
        <toTop></toTop>
        <div class="goodsImg">
            <div class="goBack" @click="goBack">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <mt-swipe :auto="0" :show-indicators="false">
                <mt-swipe-item v-for="(item, index) in itemPictUrls" :key="index">
                    <img :src="item" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="goodsInfo">
            <div class="goodsTitle">
                <span class="goodsBadge">{{dataDetail.shopType}}</span>
                <span class="title">{{dataDetail.title}}</span>
            </div>
            <div class="goodsPrice">
                <div class="goodsPriceItem goodsNewPrice">
                    <div>券后价<span class="price">￥{{dataDetail.zkFinalPrice}}</span></div>
                    <div class="myIncome">预估收益 ： ￥{{dataDetail.commission}}</div>
                </div>
                <div class="goodsPriceItem">
                    <div class="oldPrice">原价{{dataDetail.reservePrice}}</div>
                    <div>已售 {{dataDetail.volume}}</div>
                </div>
            </div>
        </div>
        
        <div class="goodsShop">
            <div class="goodsShopImg">
                <img :src="dataDetail.shopPictUrl" alt="">
            </div>
            <span class="goodsShopName">{{dataDetail.shopTitle}}</span>
        </div>
        <div class="goodsIntro">
            <div class="title">
                —商品详情—
            </div>
            <div class="goodsPic">
                <ul>
                    <li v-for="(item,index) in dataDetail.itemDescList" :key="index" class="goodsItemImg">
                        <img :src="item" alt="">
                    </li>
                </ul>
            </div>
        </div>

        <div class="footerBtns around">
            <div class="columnCenter" @click.stop="goHome">
                <i class="iconfont icon-shouye- f40"></i>
                <span class="font22">首页</span>
            </div>
            <div class="columnCenter" @click.stop="collectHandler">
                <i class="iconfont icon-shoucang f40" v-show="!isCollected"></i>
                <i class="iconfont icon-shoucang1 f40 collectActive" v-show="isCollected"></i>
                <span class="font22">收藏</span>
            </div>
            <div class="shareAndquan centerTocenter" @click.stop="toShareHandler">
                <div class="shareBtn centerTocenter">
                    <i class="iconfont icon-fenxiang01 f40"></i>
                    <span>分享</span>
                </div>
                <div class="juanBtn centerTocenter" @click.stop="goTbAuthHandler">
                    <i class="iconfont icon-youhuiquan f40"></i>
                    <span>领券￥{{dataDetail.couponAmount}}</span>
                </div>
            </div>
        </div>

        <div class="tbAuthModal" v-show="isAuth">
            <div class="tbAuthWrap">
                <div class="closeWrap" @click="closeAuthModal()"><i class="iconfont icon-guanbi1"></i></div>
                <div class="tbLogo"><img src="@/assets/img/goodsDetail/tb_logo.jpg" alt=""></div>
                <div class="authText">
                    <p>请完成淘宝授权</p>
                    <p class="authDescText">淘宝授权后下单或分享产品可以获得收益哦</p>
                </div>
                <div class="authBtnWrap">
                    <button @click="gotoAuth" class="authBtn">去授权</button>
                </div>
            </div>
        </div>
        <div class="tbAuthModal tbAuthErrorModal" v-show="isErrorAuth">
            <div class="tbAuthWrap tbAuthErrorWrap">
                <div class="closeWrap" @click="closeAuthModal('error')"><i class="iconfont icon-guanbi1"></i></div>
                <div class="authErrorText">
                    <p>淘宝授权失败</p>
                    <p class="authDescText">授权失败将会影响您的订单收益结算，是否继续分享或下单？</p>
                </div>
                <div class="authActionWrap">
                    <button class="nextBtn" @click="closeAuthModal('error')">继续</button>
                    <button @click="gotoAuth" class="toAuthBtn">重新授权</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/css/goodsDetail.css';
import toTop from "@/components/toTop";
import {goodsDetail,goodsCollect,checkAuth,getAuthLink,getCutTicket} from "@/api/index";
import { Indicator } from 'mint-ui';
import { getLocalData } from "@/utils/store"

export default {
    data() {
        return {
            dataDetail:{
                itemPictUrls: [],
                shopType: "",
                title: "",
                zkFinalPrice: "", // 券后价
                commission: "", // 预估收益
                reservePrice: "", // 原价
                volume: "", // 已售
                shopPictUrl: "", // 店铺图标
                shopTitle: "",// 店铺名称
                itemDescList: [],// 商品详情
            
            },
            isCollected: false,
            routerQuery: {},
            isAuth: false,
            isErrorAuth: false,
            authBack:false,
            itemPictUrls:[],
            authCheck:null,
            authErrorClose:false
        }
    },
    components:{
        toTop
    },
    created () {
        this.routerQuery = this.$route.query;
        console.log(this.routerQuery.itemId);
        this.getInfo();
    },
    /*beforeRouteEnter(to,from,next){
       next();
    },
    beforeRouteLeave(to,from,next){
        var toName=to.name;
        if(toName=="home"||toName=="goodsPost"||toName=="rushBuy"||toName=="searchGoods"||toName=="shareGoods"||toName=="teaItemList"||toName=="myCollection"){
            this.dataDetail={};
            this.isCollected=false;
            this.itemPictUrls=[];
        }
       
       next();
    },
    activated(){

        var _this=this;
        console.log(this.authBack);
        let login_sid = getLocalData("hbxj_sid");
        
        if(this.authBack){ // 从淘宝授权返回回来的

            checkAuth({sid:login_sid}).then(function(res){
                if(res.code==200){ // 未授权-即授权失败

                    _this.isErrorAuth=!_this.isErrorAuth;

                }
            });

        }else{
            this.routerQuery = this.$route.query;
            this.getInfo();
        }

    },*/
    methods:{
        getInfo(){
            Indicator.open({
                text: '加载中...',
            //文字
                spinnerType: 'fading-circle',
            //样式
            });
            var itemId = this.routerQuery.itemId;
            let login_sid = getLocalData("hbxj_sid");
            var paramSid=login_sid;
            if(JSON.stringify(login_sid) == '{}') {
                    paramSid="";
            }

            var params = {
                itemId: itemId,
                sid:paramSid
            }
            goodsDetail(params).then(data=>{
                Indicator.close();
                if(data.code == 200){
                    var data = typeof(data.data) === "string" ? JSON.parse(data.data):data.data;
                    this.dataDetail = data;
                    this.isCollected=data.collection;
                    this.itemPictUrls = data.itemPictUrls
                }else{
                }
            })

        },
        goBack() {
             //this.$router.go(-1);
              this.$router.push({name:this.routerQuery.goType})
        },
        collectHandler() {
            let login_sid = getLocalData("hbxj_sid");
            if(JSON.stringify(login_sid) == '{}') {
                this.$router.push({name:'register'})
                return;
            }
            var collectData = {
                itemId: this.routerQuery.itemId,
                sid: login_sid,
            }
            collectData.status = this.isCollected ? 1 : 0;
            goodsCollect(collectData).then(data=> {
                if(data.code == 200) {
                    this.isCollected = !this.isCollected;
                } else {
                    this.$toast({
                        message: data.msg
                    })
                }
            })
            
        },
        toShareHandler() {
            let login_sid = getLocalData("hbxj_sid");
            if(JSON.stringify(login_sid) == '{}') {
                this.$router.push({name:'register'})
                return;
            }
            var _this=this;
            checkAuth({sid:login_sid}).then(function(res){
                if(res.code==200){ // 未授权
                    _this.isAuth = !_this.isAuth;                 
                }
            }).catch(err =>{
                if(err.code == 30){//已授权
                    this.$router.push({name:'shareGoods',query:{itemId:this.routerQuery.itemId,type:"goodsDetail"}});
                }
            })
           
        },
        goTbAuthHandler() { // 检查淘宝授权，已授权调用领取优惠券接口，未授权弹框授权

            var _this=this;
            let login_sid = getLocalData("hbxj_sid");

             if(JSON.stringify(login_sid) == '{}') {
                this.$router.push({name:'register'})
                return;
            }

            checkAuth({sid:login_sid}).then(function(res){

                if(res.code==200){ // 未授权

                    _this.isAuth = !_this.isAuth;                 

                }

            }).catch(err =>{
                if(err.code == 30){//已授权
                    _this.getCutTicketFun();
                }else{
                    console.log(res.msg);
                }
            })

            
        },
        getCutTicketFun(){
            let login_sid = getLocalData("hbxj_sid");
             var _this=this;
             var param={
                    itemId:this.routerQuery.itemId,
                    sid:login_sid
             }
                    getCutTicket(param).then(function(cutRes){

                        if(cutRes.code==200){
                            var data=cutRes.data;
                            if(_this.$phoneType=="android"){
                                window.SealsDiary.openTBUrl(data);
                            }else if(_this.$phoneType == 'ios'){
                                window.webkit.messageHandlers.getCouponAction.postMessage(data);
                                // getCouponAction(data);
                            }
                        }else{
                            console.log(cutRes.msg);
                        }

                    });
        },
        gotoAuth(){ // 去授权
            let login_sid = getLocalData("hbxj_sid");
            var _this=this;
            clearInterval(_this.authCheck);
            _this.authErrorClose=false;
            setTimeout(function(){ // 隐藏弹窗
                _this.isErrorAuth=false;
                _this.isAuth=false;
            },1000);
            getAuthLink({sid:login_sid}).then(function(res){
                var code=res.code;
                if(code==200){
                    var data=res.data;
                    if(_this.$phoneType=="android"){
                        window.SealsDiary.openTBUrl(data);
                    }else if(_this.$phoneType == 'ios'){
                        window.webkit.messageHandlers.TBLoginAction.postMessage(data);
                        //TBLoginAction(data);
                    }

                        _this.authCheck=setInterval(function(){
                            checkAuth({sid:login_sid}).then(function(res2){
                            if(res2.code==200){ // 未授权-即授权失败
                                if(!_this.authErrorClose){
                                     _this.isErrorAuth=true;
                                }                             
                            }
                        }).catch(err =>{
                            if(err.code == 30){//已授权
                                 _this.isErrorAuth=false;
                                 clearInterval(_this.authCheck);
                            }
                        });

                    },400);
                    
                }else{
                    console.log(res.msg);
                }
            });
        },
        goHome() {
            this.$router.push({name:'home'})
        },
        closeAuthModal(data) {     
            var _this=this;       
            if(data == 'error') {
                this.isErrorAuth = false;
                clearInterval(_this.authCheck);
                this.authErrorClose=true;
            } else {
                this.isAuth = false;
            }
        }

    }
    
}
</script>
<style>
.gdsdetail .footerBtns{
    height:1.2rem;
    width:100%;
    position:fixed;
    bottom:0;
    left:0;
    z-index:99;
    background: #fff
}
.gdsdetail .shareAndquan{
    height:0.92rem;
    color:#fff;
    /* width:4.34rem; */
}
.gdsdetail .shareBtn{
    background:#ffa12c;
    height:100%;
    width:1.88rem;
    border-radius: 0.46rem 0 0 0.46rem;
    font-size:0.3rem;
}
.gdsdetail .juanBtn{
    background:#2872f7;
    height:100%;
    width:2.47rem;
    border-radius: 0 0.46rem 0.46rem 0;
    font-size:0.3rem;
}
.gdsdetail .f40{
    font-size:0.4rem
}
</style>