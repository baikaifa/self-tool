<template>
    <div class="myOrder">
        <div class="topBar">
            <i class="iconfont icon-fanhui" @click="goBack"></i>
            <div class="topTitle">
                <span :class='["title", from==="online"?"selTitle":""]' @click="orderFrom('online')">线上订单</span>
                <span :class='["title", from==="offline"?"selTitle":""]' @click="orderFrom('offline')">线下订单</span>
            </div>
            <i @click="openTime" class="iconfont icon-rili"></i>
        </div>
        <div class="orderContent">
           
            <div v-if="from==='online'">
                <div class="bottomTitle">
                    <div class="titles" @click="toOnline(0)"><span :class='query.status===0?"titleSel":""'>全部</span></div>
                    <div class="splitLine"></div>
                    <div class="titles" @click="toOnline(1)"><span :class='query.status===1?"titleSel":""'>即将到账</span></div>
                    <div class="splitLine"></div>
                    <div class="titles" @click="toOnline(2)"><span :class='query.status===2?"titleSel":""'>已到账</span></div>
                    <div class="splitLine"></div>
                    <div class="titles" @click="toOnline(3)"><span :class='query.status===3?"titleSel":""'>已失效</span></div>
                </div>
                <div class="bottomContent"
                    
                    @swipedown="swipeleft(x)"
                    @touchstart="touchStart"
                    @touchmove="touchMove"
                    @touchend="touchEnd('on')"
                   >
                    <div class="my-order__list" v-if="onlineHasData">

                        <div >
                            <div class="my-order__list_all_contentes" v-for="(item,index) in onlineOrderList">
                                <div class="content-img">
                                    <img :src="item.pictUrl" alt=""> 
                                </div> 
                                <div class="content-info">
                                    
                                    <p class="content-title">
                                        {{item.itemTitle}}
                                    </p>
                                    <p class="content-create-date">
                                        创建日期：{{item.orderTime}}
                                    </p>
                                    <p class="content-order-num">
                                        <span>订单号：<span id="listOrderNumber">{{item.orderId}}</span></span>
                                        <button type="button" class="pull-right" 
                                            v-clipboard:copy="item.orderId"
                                            v-clipboard:success="onCopy"
                                            v-clipboard:error="onError">复制</button>
                                    </p>
                                    <p class="content-consumption">
                                        <span class="">消费金额：￥{{item.orderPirce}}</span>
                                        <span class="pull-right income">预估收益：￥{{item.forecastIncome}}</span>
                                    </p>
                                </div>
                            </div>
                            
                            </div>
                            
                        </div>
                        <div class="my-order__no_box" v-else>
                            <div class="my-order__no_item">
                                <img src="../../assets/img/no-order-list@2x.png" alt="">
                            </div> 
                            

                        </div>
                    </div>
                    
                </div>
            </div>
            <!-- 线下订单 -->
            <div v-if="from==='offline'">
                <div class="bottomTitle">
                        <div class="titles" @click="toOffline(0)"><span :class='query.status===0?"titleSel":""'>全部</span></div>
                        <div class="splitLine"></div>
                        <div class="titles" @click="toOffline(1)"><span :class='query.status===1?"titleSel":""'>待付款</span></div>
                        <div class="splitLine"></div>
                        <div class="titles" @click="toOffline(2)"><span :class='query.status===2?"titleSel":""'>待使用</span></div>
                        <div class="splitLine"></div>
                        <div class="titles" @click="toOffline(3)"><span :class='query.status===3?"titleSel":""'>待评价</span></div>
                </div>
                <div class="bottomContent"
                    
                    @swipedown="swipeleft(x)"
                    @touchstart="touchStart"
                    @touchmove="touchMove"
                    @touchend="touchEnd('on')"
                   >
                    <div class="my-order__list" v-if="offlineHasData">
                        <div class="offlineOrderItem" v-for="(item,index) in offlineOrderList">
                                <div class="offLineTitle">
                                    <img :src="item.shopPictureUrl" alt="">
                                    <div class="shopName">{{item.shopTitle}}</div>
                                    <div class="orderStatus">{{item.statusTxt}}</div>
                                </div>
                                <div class="my-order__list_all_contentes" style="border:none;">
                                
                                    <div class="content-img">
                                    <img :src="item.orderPictureUrl" alt="">
                                    </div>
                                    <div class="content-info">
                                        
                                        <p class="content-title">
                                            {{item.orderTitle}}
                                        </p>
                                        <p class="content-create-date">
                                            {{item.items}}
                                        </p>
                                        <p class="content-order-num">
                                            <span>数量：{{item.number}}</span>
                                            
                                        </p>
                                        <p class="content-consumption">
                                            <span class="">总价：￥{{item.price}}</span>
                                            
                                        </p>
                                    </div>
                                
                            </div>
                    </div>
                   
                </div>
                <div class="my-order__no_box" v-else>
                            <div class="my-order__no_item">
                                <img src="../../assets/img/no-order-list@2x.png" alt="">
                            </div> 
                            

                        </div>
            </div>
        </div>
        <mt-datetime-picker
        ref="picker"
        type="date"
        @visible-change="HandlevisibleChange"
        @confirm="handleTimeConfirm"
        v-model="time">
        </mt-datetime-picker>
    </div>


    
</template>
<script>
import $ from 'jquery';
import { touch } from "@/utils/touch"
import { onlineOrder } from '@/api/index'
import VueClipboard from 'vue-clipboard2'

import { DatetimePicker } from 'mint-ui'
import { Toast } from 'mint-ui'

export default{
    data: function(){
        return{
            time:"",
            from: "online",
            onlineOrderList:[],
            onlineHasData:true,
            onlineProp:{
                "orderImg":"",
                "picUrl":"",
                "itemTitle":"",
                "orderTime":"",
                "orderId":"",
                "orderPirce":"",
                "forecastIncome":"",
                "pictUrl":""
            },
            offlineOrderList:[],
            offlineHasData:true,
            query:{
                pageNo:1,
                pageSize:10,
                type:1,
                time:"",
                status:0,

            },
            windowScoll:false
        }
    },
    
    created() {
        this.getOnlineOrderList();
    },
    methods: {
        goBack(){
            //this.$router.go(-1);
             this.$router.push("/personalCenter")
        },
        orderFrom(fromType){
            if(this.from !== fromType){
                this.from = fromType;
                this.query.status = 0
                
            }

            if(this.from=="online"){
                this.query.type=1;
                this.query.status=0;
                this.query.pageNo=1;
                this.query.time="";
                this.onlineOrderList=[];
                this.getOnlineOrderList()
            }else{
                this.query.type=2;
                this.query.status=0;
                this.query.pageNo=1;
                this.query.time="";
                this.offlineOrderList=[];
                this.getOffLineOrderList();
            }
        },
        toOnline(num){
            this.query.status = num;
            this.query.pageNo=1;
            this.query.time="";
            this.onlineOrderList=[];
            this.getOnlineOrderList();
        },
        toOffline(num){
            this.query.status = num;
            this.query.pageNo=1;
            this.query.time="";
            this.offlineOrderList=[];
            this.getOffLineOrderList();
        },
        touchStart(ev){
            this.disX = 0;
            var ev = ev || event;
            if(ev.touches.length == 1){
                this.startX = ev.touches[0].clientX
            }
        },
        touchMove(ev){
            var ev = ev || event;
            if(ev.touches.length == 1) {
                this.moveX = ev.touches[0].clientX
                this.disX = this.startX - this.moveX

                 console.log('moveX', this.moveX);
            }
        },
       
        touchEnd(type){
            if(type==='on'){
                if(this.disX >= 120){
                    if(this.onlineSel < 4){
                        this.onlineSel += 1;
                    }
                }else if(this.disX <= -120){
                    if(this.onlineSel > 0){
                        this.onlineSel -= 1;
                    }
                }
            }
        },

        // TODO:  订单列表待确认

        getOnlineOrderListes(){
            let data = {
                status: 0,
                type: 0,
                startTime:　1514736000,
                endTime: 1561910400
            }
            onlineOrder(data).then(ruq=>{
                console.log(req);
                // if(req.code == 200) {
                //     this.pageTotal = req.data.pageCount;
                //     if(this.pageIndex == 1){
                //         this.goodsList = req.data.list;
                //     }else{
                //         this.goodsList = this.goodsList.concat(req.data.list);
                //     }
                // } else {
                //     // console.log(req.msg);
                // }
            })
        },
        getOffLineOrderList(){
            this.offlineOrderList=[];
            onlineOrder(this.query).then(res=>{
                if(res.code==200){
                    this.offlineHasData=true?res.data.totalCount>0:false;  
                    if(this.offlineHasData){
                        var list=res.data.list;

                        for(var i=0;i<list.length;i++){
                            var detail=list[i].orderDetail;
                            this.offlineOrderList.push(JSON.parse(detail));
                        }

                        if(this.query.pageNo==res.data.lastPage){ // 最后一页
                            this.unbindScroll();
                            if(this.query.pageNo>1){
                                Toast("最后一页");
                            }
                        }else{
                            if(this.query.pageNo==1){
                                this.bindScoll();
                            }
                            
                        }
                    }
                    
                }else{
                    Toast(res.msg);
               }
            });
        },
        onCopy: function (e) {
            Toast("已将订单号复制到剪切板")
        },
        onError: function (e) {
            Toast("订单号复制失败")
        },
        bindScoll:function(){
            let _this=this;
            this.windowScoll=true;
            $(window).off("scroll").on("scroll",function(){
                if ($(window).scrollTop() >=$(document).height() - $(window).height()) {
                    _this.query.pageNo++;
                    if(_this.from=="online"){
                        _this.getOnlineOrderList();
                    }else{
                        _this.getOffLineOrderList();
                    }
                    
                }
            });
        },
        unbindScroll:function(){
            let _this=this;
            this.windowScoll=false;
            $(window).off("scroll");
        },
        openTime:function(){
             this.time=new Date();
             $("body").css("overflow","hidden");
             $(".picker .picker-slot").last().hide();
             this.$refs.picker.open();
        },
        HandlevisibleChange(val){
            if(!val){
                $("body").css("overflow","auto");
            }
        },
        handleTimeConfirm(val){
           var dateObj=new Date(val);
           var year=dateObj.getFullYear();
           var month=dateObj.getMonth()+1;
           if(month.toString().length<2){
               month="0"+month;
           }
           var time=year+"-"+month;
           
           this.query.time=time;
           this.query.pageNo=1;

           if(this.from=="online"){
               this.getOnlineOrderList();
           }else{
               this.getOffLineOrderList();
           }
        }


    }
}
</script>
<style scope>
    #app .myOrder{
        margin-top: -0.8rem;
    }
    .myOrder .topBar{
        background: #fff;
        height: 0.9rem;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 0.18rem;
        padding-right: 0.24rem;
    }
    .myOrder .icon-fanhui{
        font-size: 0.34rem;
        font-weight: bold
    }
    .myOrder .icon-rili{
        font-size: 0.42rem;
        color: #3288ff
    }
    .myOrder .topTitle{
        border: 1px solid #3288ff;
        border-radius: 0.1rem;
        height: 0.5rem;
        width: 3.12rem;
        display: flex;
        overflow: hidden;
    }
    .myOrder .title{
        height: 0.48rem;
        display: inline-block;
        line-height: 0.48rem;
        width: 50%;
        color: #3288ff;
        font-size: 0.28rem;
    }
    .myOrder .selTitle{
        height: 100%;
        color: #fff;
        background: #3288ff;
    }
    .myOrder .selOn{
        color: red
    }
    .myOrder .bottomTitle{
        height: 0.88rem;
        display: flex;
        background: #fff;
        align-items: center;
        margin-bottom: 0.2rem;
    }
    .myOrder .titles{
        width: 25%;
        font-weight: bold;
    }
    .myOrder .titles>span{
        padding: 0 0.2rem;
        display: inline-block;
        height: 0.88rem;
        line-height: 0.88rem;
    }
    .myOrder .titleSel{
        color: #3288ff;
        border-bottom: 2px solid #3288ff
    }
    .myOrder .splitLine{
        height: 0.56rem;
        border-right: 1px solid #cccccc;
    }
    .my-order__list {
        width: 100%;
        height: auto;
    }

    .my-order__list_all_contentes{
        display: flex;
        display: -webkit-flex;
        height: 2.36rem;
        padding: .2rem .19rem;
        text-align: left;
        border-bottom: #d4d4d4 solid 1px;
        background-color: #fff;
        width: 100%;
    } 
    .my-order__list_all_contentes .content-img {
        /* flex: 3; */
        width: 2rem;
        height: 2rem;
        border: #fff solid 1px;
        
        
    }
    .my-order__list_all_contentes .content-img img{
        width: 2rem;
        height: 2rem;
        border-radius: .1rem;
    }
    .my-order__list_all_contentes .content-info{
        flex: 1;
        font-size: .24rem;
        padding-left: 0.2rem;
    }
     .my-order__list_all_contentes .content-info p{
         margin-bottom: .20rem
     }

    .my-order__list_all_contentes .content-info .content-title {
        width: 4rem;
        height: .36rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .my-order__list_all_contentes .content-info .content-title span{
        /* display: inline-flex; */
        /* display: block; */
        width: 90%;
        min-width: 90%;
        max-width: 90%;
        /* text-overflow: ellipsis;
        /* white-space: nowrap; */
        /* overflow: hidden; */
        /* float: right; */
    }

    .my-order__list_all_contentes .content-info .content-create-date,
    .my-order__list_all_contentes .content-info .content-order-num {
        
        color: #999999;
    }

    .content-consumption .income{
        color: #ff942c;
    }

    .content-order-num button{
        margin-right: .5rem;
        font-size: .22rem;
        padding: 0 .15rem;
        color: #999999;
        background-color: #fff;
        border: #999999 solid 1px;
        border-radius: 25rem;
    }
    .content-order-num button:hover,
    .content-order-num button:focus {
        color: #fff;
        background-color: #3288ff;
        border: #3288f9 solid 1px;
    }

    .my-order__no_box {
        display: flex;
        display: -webkit-flex;
        width: 100%;
        height: 87vh;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }
    .my-order__no_item {
        width: 6.28rem;
        height: 4.82rem;
        /* border: 1px solid #00C1B3; */
    }

    .my-order__no_item img{
        width: 6.28rem;
        height: 4.82rem;
    }

    .pull-right {
        float: right;
    }

    .myOrder .offlineOrderItem{
        margin-bottom: 0.2rem;
    }

    .myOrder .offLineTitle{
        height: 0.8rem;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 0 0.2rem;
        border-bottom: 1px solid #ccc;
        
    }

    .myOrder .offLineTitle img{
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.1rem;
        
    }

    .myOrder .shopName{
        flex: 3;
        padding-left: 0.2rem;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .myOrder .orderStatus{
        flex: 2;
        text-align: right;
        
    }

    

</style>