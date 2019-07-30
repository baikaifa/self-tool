<template>
    <section class="section_contain">
        <backBtn :pageName="pageName" type="personalCenter"></backBtn>
        <myNoticeTabBar :pageType="pageType" :hasNew="hasNew"></myNoticeTabBar>
        <inOutNoData v-if="noData" :noDataTxt1="noDataTxt"></inOutNoData>
        <section v-if="!noData" class="incomeNotice_contain">
            <div v-for="item in dataList" class="incomeNotice_item">
                <div class="item_text">{{item.notifyDetail}}</div>
                <div class="item_money">+{{item.price}}</div>
            </div>
            
        </section>
    </section>
</template>
<script>

import $ from 'jquery';

import backBtn from "@/components/backBtn";
import myNoticeTabBar from "@/components/myNotice_tabBar";
import inOutNoData from "@/components/inOutNoData";

import {noticeList,userInfo} from '@/api/index';

export default {
    data:function(){
        return {
            pageName:"消息中心",
            pageType:'income',
            hasNew:false,
            dataList:[],
            noData:false,
            pageNo:1,
            pageSize:20,
            type:1,
            noDataTxt:'未查询到相关数据'
        }
    },
    components:{backBtn,myNoticeTabBar,inOutNoData},
    created:function(){
        var _this=this;
        _this.getDataList(); // 收益消息
        _this.getInfo();
    },
    methods:{
        getInfo(){
            userInfo().then(data=>{
                if(data.code==200){
                    if(data.data.notifyNumber!=0){
                        this.hasNew = true
                    }
                }
            })
        },
        getDataList:function(){
            var _this=this;
            var param={
                pageNo:_this.pageNo,
                pageSize:_this.pageSize,
                type:_this.type
            }
            noticeList(param).then(function(res){
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
    .incomeNotice_contain{margin-top:0.25rem;}

    .incomeNotice_item{display: flex;height: 1.1rem;line-height: 1.1rem;font-size: 0.28rem;background: #fff;border-bottom: 1px solid #ebebeb;text-align: left;}
    .item_text{padding-left: 0.45rem;flex:1;}
    .item_money{width: 2rem;padding-right: 0.5rem;color: #ff942c;}
</style>


