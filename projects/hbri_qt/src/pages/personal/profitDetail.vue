<template>
    <section>
        <backBtn :pageName="pageName" :type="type"></backBtn>
        <profitTabBar @changeTab="_changeTab" :pageType="pageType"></profitTabBar>
        <inOutNoData v-if="noData" :noDataTxt1="noDataTxt"></inOutNoData>
        <section v-if="!noData" class="profitItem_contain">
            <div v-for="item in dataList" class="profit_item">
                <div class="item_title">
                    <div class="month">{{item.month}}</div>
                    <div class="month_price">￥{{item.price}}</div>
                    <div class="month_status">{{item.status}}</div>
                </div>
                <div v-for="profitItem in item.orderList" class="profit_detail">
                     <div class="order_title">{{profitItem.title}}</div>
                     <div class="order_otherInfo">
                         <div class="info_date">创建日 {{profitItem.startTime}}</div>
                         <div class="profit_money">+￥{{profitItem.income}}</div>
                     </div>
                     <div class="order_otherInfo">
                         <div class="info_date">结算日 {{profitItem.endTime}}</div>
                         <div class="order_money">订单金额 ￥{{profitItem.orderPrice}}</div>
                     </div>
                </div>
                
            </div>
            
        </section>
    </section>
</template>

<script>

import $ from 'jquery';

import backBtn from "@/components/backBtn";
import profitTabBar from "@/components/profit_tabBar";
import inOutNoData from "@/components/inOutNoData";

import {profitDetail} from "@/api/index.js"

export default {
    data:function(){
        return {
            pageName:"收益结算明细",
            type:'',
            pageType:'online',
            dataList:[],
            noData:false,
            requestType:0, // 0 线上 1 线下
            noDataTxt:'未查询到相关数据'
        }
    },
    components:{backBtn,profitTabBar,inOutNoData},
    created:function(){
        this.getDataList();
    },
    methods:{
        _changeTab:function(){

            if(this.pageType=="online"){
                this.pageType="offline";
                this.requestType=1;
            }else{
                this.pageType="online";
                this.requestType=0;
            }

            this.getDataList();

        },
        getDataList:function(){

            var _this=this;

            var param={
                type:this.requestType
            }

            profitDetail(param).then(function(res){

                if(res.code==200){

                    var data=res.data;
                    if(data.length==0){
                        _this.noData=true;
                        _this.noDataTxt="未查询到相关数据";
                    }else{
                        _this.noData=false;
                        _this.dataList=data;
                    }

                }else{
                    _this.noData=true;
                    _this.noDataTxt=res.msg;
                }

            });

        }
    }
}
</script>

<style>

    .item_title{height: 0.8rem;line-height:0.8rem;display: flex;align-items: center;padding: 0 0.3rem;}
    .month{width: 1.1rem;text-align: left;}
    .month_price{flex: 1;color:#ff942c;text-align: left;}
    .month_status{flex: 1;text-align: right;font-size: 0.28rem;color:#3288ff; }
    .profit_detail{height: 1.8rem;background: #fff;border-bottom:1px solid #ebebeb;padding: 0 0.3rem;display: flex;flex-direction: column;justify-content: center;}
    .order_title{width:80%;text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    .order_otherInfo{display: flex;font-size: 0.28rem;color:#999;}
    .info_date{text-align: left;flex:1;}
    .profit_money{color: #ff942c;text-align: right;}
    .order_money{text-align: right;}

</style>

