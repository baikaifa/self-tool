<template>
    <section class="section_contain">
        <backBtn :pageName="pageName" :type="viewType"></backBtn>
        <inOutTabBar :pageType="pageType"></inOutTabBar>
        <inOutNoData v-if="noData" :noDataTxt1="noDataTxt"></inOutNoData>
        <section v-if="!noData" class="outList_contain">
            <!--<div v-for="item in dataList" class="out_item">
                <div class="out_line1">
                    <div class="out_txt_item">
                        <div class="out_txt">{{item.title}}</div>
                        <div v-if="item.status==1" class="out_type out_type_success">提现成功</div>
                        <div v-if="item.status==2" class="out_type out_type_waiting">提现待审核</div>
                        <div v-if="item.status==3" class="out_type out_type_fail">提现失败</div>
                    </div>
                    <div class="out_money">-{{item.price}}</div>
                </div>
                <div class="out_line2">
                    <div class="out_ordernum">订单号：{{item.orderId}}</div>
                    <div class="out_date">{{item.time}}</div>
                </div>
            </div>
            <div class="out_item">
                <div class="out_line1">
                    <div class="out_txt_item">
                        <div class="out_txt">提现</div>
                        <div class="out_type out_type_fail">提现失败</div>
                    </div>
                    <div class="out_money">-177.00</div>
                </div>
                <div class="out_line2">
                    <div class="out_ordernum">订单号：0011223654884</div>
                    <div class="out_date">2018-5-24 12:23</div>
                </div>
            </div>
            <div class="out_item">
                <div class="out_line1">
                    <div class="out_txt_item">
                        <div class="out_txt">提现</div>
                        <div class="out_type out_type_waiting">提现待审核</div>
                    </div>
                    <div class="out_money">-177.00</div>
                </div>
                <div class="out_line2">
                    <div class="out_ordernum">订单号：0011223654884</div>
                    <div class="out_date">2018-5-24 12:23</div>
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
    data:function(){
        return {
            pageName:"收支明细",
            viewType:'',
            pageType:'out',
            dataList:[],
            noData:false,
            pageNo:1,
            pageSize:20,
            type:1,
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
    .outList_contain{margin-top:0.15rem;}
    .out_item{height: 1.1rem;background: #fff;border-bottom:1px solid #ebebeb;display: flex;flex-direction: column;padding: 0 0.4rem;justify-content: center;}
    .out_line1{display: flex;width: 100%;align-items: flex-end;}
    .out_txt_item{flex: 1;display: flex;align-items: center;}
    .out_txt{font-size: 0.28rem;}
    .out_type{font-size: 0.2rem;margin-left: 0.1rem;border-radius: 15px;padding: 0 0.1rem;}
    .out_type.out_type_success{color: #ff942c;border:1px solid #ff942c;}
    .out_type.out_type_fail{color: #3288ff;border:1px solid #3288ff;}
    .out_type.out_type_waiting{color: #999;border:1px solid #999;}
    .out_money{flex: 1;text-align: right;padding-right: 0.2rem;}
    .out_line2{display: flex;width: 100%;font-size: 0.2rem;color: #999999;}
    .out_ordernum{text-align: left;flex: 1;}
    .out_date{text-align: right;flex: 1;}
</style>


