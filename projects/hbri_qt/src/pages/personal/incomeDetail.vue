<template>
    <section class="section_contain">
        <backBtn :pageName="pageName" :type="viewType"></backBtn>
        <inOutTabBar :pageType="pageType"></inOutTabBar>
        <inOutNoData v-if="noData" :noDataTxt1="noDataTxt" :noDataTxt2="'请再接再厉~'"></inOutNoData>
        <section v-if="!noData" class="incomeList_contain">
            <!--<div v-for="item in dataList" class="income_item">
                <div class="income_line1">
                    <div class="income_title">
                        {{item.title}}
                    </div>
                    <div class="income_money">+{{item.price}}</div>
                </div>
                <div class="income_line2">
                    <div class="income_ordernum">订单号：{{item.orderId}}</div>
                    <div class="income_date">{{item.time}}</div>
                </div>
            </div>
            <div class="reward_item">
                <div class="reward_left">
                    <div class="reward_title">平台奖励</div>
                </div>
                <div class="reward_right">
                    <div class="reward_money">+288.00</div>
                    <div class="reward_date">2018-5-24 12:23</div>
                </div>
            </div>-->
        </section>
    </section>
</template>

<script>
import $ from 'jquery';
import backBtn from "@/components/backBtn";
import inOutTabBar from "@/components/inOut_tabBar";
import inOutNoData from "@/components/inOutNoData";

import {inOutComeDetail} from '@/api/index';

export default {
    data:()=>{
        return {
            pageName:"收支明细",
            viewType:'',
            pageType:'in',
            dataList:[],
            noData:false,
            pageNo:1,
            pageSize:20,
            type:0,
            noDataTxt:'未查询到相关数据'
        }
    },
    components:{backBtn,inOutTabBar,inOutNoData},
    created:function(){
        this.viewType = this.$route.params.type || 'userProfit';
        this.getDataList();
    },
    methods:{
        getDataList:function(){
            var _this=this;
            var param={
                pageNo:_this.pageNo,
                pageSize:_this.pageSize,
                type:_this.type
            }
            inOutComeDetail(param).then(function(res){
                var code=res.code;
                if(code==200){
                    var data=res.data;
                    var totalCount=data.totalCount;
                    if(totalCount==0){
                        _this.noData=true;
                        
                    }else{
                        _this.dataList=data.list;
                        if(_this.pageNo==data.lastPage){ // 最后一页
                            _this.unbindScroll();
                        }else{
                            if(_this.pageNo==1){
                                _this.bindScoll();
                            }
                            
                        }
                    }
                }else{
                    _this.noData=true;
                    _this.noDataTxt=res.msg;
                }
                
            });
        },
        bindScoll:function(){
            let _this=this;
            $(window).on("scroll",function(){
                if ($(window).scrollTop() >=$(document).height() - $(window).height()) {
                    _this.pageNo++;
                    _this.getDataList();
                }
            });
        },
        unbindScroll:function(){
            let _this=this;
            $(window).off("scroll");
        }
    }
}
</script>

<style>

    /*.section_contain{background: #f5f5f5;height:100vh;overflow: auto;}*/

    .incomeList_contain{margin-top:0.15rem;}
    .income_item{height: 1.1rem;background: #fff;border-bottom:1px solid #ebebeb;display: flex;flex-direction: column;padding: 0 0.4rem;justify-content: center;}
    .income_line1{display: flex;width: 100%;align-items: flex-end;}
    .income_title{flex: 1;text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 0.28rem;}
    .income_money{width: 2.2rem;text-align: right;padding-right: 0.2rem;color: #ff942c;}   
    .income_line2{display: flex;width: 100%;font-size: 0.2rem;color: #999999;}
    .income_ordernum{text-align: left;flex: 1;}
    .income_date{text-align: right;flex: 1;}

    .reward_item{display: flex;height: 1.1rem;background: #fff;border-bottom:1px solid #ebebeb;padding: 0 0.4rem;}
    .reward_left{flex:1;display: flex;align-items: center;font-size: 0.28rem;}
    .reward_right{flex:1;display: flex;flex-direction: column;justify-content: center;}
    .reward_money{color: #ff942c;text-align: right;padding-right: 0.2rem;}
    .reward_date{font-size: 0.2rem;color: #999;text-align: right;}

</style>


