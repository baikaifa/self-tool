<template>
    <section class="section_contain">
        <backBtn :pageName="pageName" type="personalCenter"></backBtn>
        <myNoticeTabBar :pageType="pageType"></myNoticeTabBar>
        <inOutNoData v-if="noData" :noDataTxt1="noDataTxt"></inOutNoData>
        <section v-if="!noData" class="notice_contain">
            <div v-for="item in dataList" class="notice_item">
                <div class="notice_time">{{item.createTime}}</div>
                <div class="notice_info">
                    <div class="notice_icon_contain">
                        <div class="notice_icon"></div>
                    </div>
                    <div class="notice_txt">{{item.notifyDetail}}</div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>

import $ from 'jquery';

import backBtn from "@/components/backBtn";
import myNoticeTabBar from "@/components/myNotice_tabBar";
import inOutNoData from "@/components/inOutNoData";

import {noticeList} from '@/api/index';

export default {
    data:function(){
        return {
            pageName:"消息中心",
            pageType:'notice',
            dataList:[],
            noData:false,
            pageNo:1,
            pageSize:20,
            type:2,
            noDataTxt:'暂时没有新的消息哦~'
        }
    },
    components:{backBtn,myNoticeTabBar,inOutNoData},
    created:function(){
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
    .notice_time{height: 1rem;line-height: 1rem;text-align: center;font-size: 0.24rem;color: #919191;}
    .notice_info{height: 1.5rem;line-height: 1.5rem;background: #fff;width: 7.1rem;margin:0 auto;border-radius: 6px;display: flex;}
    .notice_icon_contain{width: 1.1rem;display: flex;justify-content: center;align-items: center;}
    .notice_icon{width: 0.38rem;height: 0.33rem;background-image: url('../../assets/img/notice_icon.png');color: #3288ff;background-size: contain;background-repeat: no-repeat;}
    .notice_txt{flex: 1;text-align: left;color: #858585;font-size: 0.28rem;}
</style>


