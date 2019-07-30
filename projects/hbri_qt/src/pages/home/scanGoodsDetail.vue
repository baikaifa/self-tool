<template>
    <div class="scanGdsdetail">
        <backBtn pageName="商品详情页" :type="type">
            <i class="iconfont icon-shuaxin toRight" slot="rightBtn" @click="refreshBtn"></i>
        </backBtn>
        <div class="scanGdsHeader">
            请点击底部按钮"搜一搜有惊喜"
        </div>
        <iframe id="iframe" :src="goodsUrl" scrolling="auto" frameborder="0" class="tbGoodsDetail" STYLE="background-color: white"></iframe>
        <div class="scanGdsFooter" v-show="!showMoreInfo">
            <button @click="getGoodsInfoHandler">搜一搜有惊喜</button>
        </div>
        <div class="scanGdsFooter scanGdsFooterActions" v-show="showMoreInfo">
            <button class="btn income" @click="incomeHandler">
                <i class="iconfont icon-fenxiang01"></i>预估收益
                <span>￥{{income}}</span>
            </button>
            <button class="btn coupon" @click="couponHandler">去领券</button>
        </div>
        <!-- 授权弹窗 -->
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
// import $ from 'jquery';
import '@/assets/css/goodsDetail.css';
import backBtn from "@/components/backBtn";
import {goodsDetail,checkAuth,getAuthLink} from "@/api/index";
import { getLocalData } from "@/utils/store";
import { Indicator } from 'mint-ui';

export default {
    data() {
        return {
            // goodsUrl: 'https://h5.m.taobao.com/awp/core/detail.htm?spm=a219t.7900221/10.1998910419.d30ccd691.2a8f75a5Fctun2&id=587202474425',
            goodsUrl: '',
            itemId: '',
            type:'home',
            income: '0',
            coupon: '0',
            showMoreInfo: false,
            isAuth: false,
            isErrorAuth: false,
            authCheck:null,
            authErrorClose:false
        }
    },
    components:{
        backBtn
    },
    created () {
        this.goodsUrl = this.$route.query.url;
        this.itemId = this.$route.query.itemId;
    },
    methods: {
        goBack() {
             this.$router.push({name:'home'})
            //this.$router.go(-1);
        },
        refreshBtn() {
            this.$router.go(0);
        },
        getGoodsInfoHandler() {
            Indicator.open({
                spinnerType: 'fading-circle',
            });
            let login_sid = getLocalData("hbxj_sid");
            var paramSid=login_sid;
            if(JSON.stringify(login_sid) == '{}') {
                paramSid="";
            }
            var params = {
                itemId: this.itemId,
                sid:paramSid
            }
            goodsDetail(params).then(data=>{
                Indicator.close();
                if(data.code == 200){
                    this.showMoreInfo = true;
                    this.income = data.data.commission;
                    this.coupon = data.data.couponAmount;
                    // this.$router.push({
                    //     name: "goodsDetail",
                    //     query: {
                    //         itemId: this.itemId,
                    //         goType: 'scanGoodsDetail',
                    //         data: {
                    //             itemId: this.itemId,
                    //             url: this.goodsUrl
                    //         }
                    //     }
                    // })
                }else{
                    this.$toast({
                        message: "该商品还未参加推广活动，请试试其他商品"
                    })
                }
            })
        },
        incomeHandler() {
            this.getAuthHandler('income');
        },
        couponHandler() {
            if(!this.coupon || this.coupon == 0) {
                this.$toast({
                    message: "该商品没有优惠券"
                })
            } else {
                // 此处判断登陆和授权操作
                this.getAuthHandler('coupon');
            }
        },
        getAuthHandler(type) {
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
                    if(type == 'income') {
                        this.$router.push({name:'shareGoods',query:{itemId:this.itemId,type:"scanGoodsDetail",data: {itemId: this.itemId,url: this.goodsUrl}}});
                        return;
                    }
                    if(type == 'coupon'){
                        _this.getCutTicketFun();
                        return;
                    }
                }else{
                    // this.$toast({
                    //     message: res.msg
                    // })
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
.scanGdsdetail {
    /* margin-top: -0.8rem; */
    height: calc(100vh - 0.8rem);
    background: #fff;
}
.navi-bar {
    display: none;
}
.scanGdsdetail .scanGdsHeader {
    background: #eee;
    font-size: 12px;
    height: 0.72rem;
    line-height: 0.72rem;
}
.scanGdsdetail .tbGoodsDetail {
    width: 100%;
    height: calc(100vh - 1.52rem);
    overflow-x: hidden;
    overflow-y: auto;
}
.scanGdsdetail .scanGdsFooter {
    position: fixed;
    z-index: 120;
    bottom: 0;
    width: 100%;
    height: 55px;
    line-height: 55px;
    background: #fff;
    border: 1px solid #eee;
    margin-top: -1px;
}
.scanGdsdetail .scanGdsFooter button {
    width: 90%;
    height: 40px;
    border: 0;
    background: #2872f7;
    border-radius: 60px;
    color: #fff;
    font-size: 15px;
    outline: none;
}
.scanGdsdetail .scanGdsFooterActions {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.scanGdsdetail .scanGdsFooter .btn {
    width: auto;
    background: #2872f7;
    color: #fff;
    font-size: 15px;
    outline: none;
}
.scanGdsdetail .scanGdsFooter .btn.income {
    flex: 1;
    width: auto;
    /* border-top-right-radius: 0;
    border-bottom-right-radius: 0; */
    background: #ffa12c;
    margin-right: 20px;
}
.scanGdsdetail .scanGdsFooter .btn.income .iconfont {
    padding-right: 8px;
}
.scanGdsdetail .scanGdsFooter .btn.coupon {
    width: 120px;
    /* border-top-left-radius: 0;
    border-bottom-left-radius: 0; */
}
.scanGdsdetail .toRight {
  font-size: .28rem;
  position: absolute;
  top: .25rem;
  right: .24rem;
}
</style>