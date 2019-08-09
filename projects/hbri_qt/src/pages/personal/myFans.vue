<template>
    <div class="myFans">
        <backBtn :pageName="pageName" :type="type"></backBtn>
        <mt-navbar v-model="selected" style="margin-top: 0.8rem">
            <mt-tab-item id="total">全部<span v-if="selected == 'total'">({{totalCount}})</span></mt-tab-item>
            <div class="splitLine"></div>
            <mt-tab-item id="direct">直属粉丝<span v-if="selected == 'direct'">({{totalCount}})</span></mt-tab-item>
            <div class="splitLine"></div>
            <mt-tab-item id="recommend">推荐粉丝<span v-if="selected == 'recommend'">({{totalCount}})</span></mt-tab-item>
        </mt-navbar>
        <div style="height: 0.2rem; background:#f5f5f5"></div>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="total">
                <div class='userList' v-for='(item, index) in userList'>
                    <img :src="item.userAvatar" alt="">
                    <div class="userDetail" :style="index==0?'border:none':''">
                        <div class="nickName">{{item.userNick}}</div>
                        <span class="detailText-1">{{item.mobileNumber}}</span>
                        <span class="detailText-2">{{item.createTime}}</span>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="direct">
                <div class='userList' v-for='(item, index) in userList'>
                    <img :src="item.userAvatar" alt="">
                    <div class="userDetail" :style="index==0?'border:none':''">
                        <div class="nickName">{{item.userNick}}
                            <div v-if='item.fansNum' @click="otherFan(id, item.userNick)">
                                <div>推荐{{item.fansNum}}人</div>
                                <i class="iconfont icon-next"></i>
                            </div>
                        </div>
                        <span class="detailText-1">{{item.mobileNumber}}</span>
                        <span class="detailText-2">{{item.createTime}}</span>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="recommend">
                <div class='userList' v-for='(item, index) in userList'>
                    <img :src="item.userAvatar" alt="">
                    <div class="userDetail" :style="index==0?'border:none':''">
                        <div class="nickName">{{item.userNick}}</div>
                        <span class="detailText-1">{{item.mobileNumber}}</span>
                        <span class="detailText-2">{{item.createTime}}</span>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="noMoreText">没有更多</div>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import {myFans, userInfo} from '@/api/index';
export default {
    data(){
        return {
            pageName: '粉丝管理',
            type: 'personalCenter',
            selected: 'total',
            pageSize: 20,
            pageNo: 1,
            userList: [],
            userId: "",
            totalCount: ""
        }
    },
    components:{
        backBtn
    },
    created () {
      this.getInfo(0);
      this.getUserId();
      this.userList = []
    },
    methods: {
        getInfo(type, queryUid){
            let params = {
                type: type,
                queryUid: queryUid,
                pageSize: this.pageSize,
                pageNo: this.pageNo
            }
            myFans(params).then(data => {
                var data = typeof(data) === 'string' ? JSON.parse(data) : data;
                if(data.code == 200){
                    console.log(data.data);
                    this.userList = data.data;
                    this.totalCount = data.data.totalCount > 99 ? "99+" : data.data.totalCount
                }
            })
        },
        getUserId(){
            userInfo().then(data => {
                var data = typeof(data) === 'string' ? JSON.parse(data) : data;
                if(data.code == 200){
                    console.log("get userId", data.data.userId);
                    this.userId = data.data.userId
                }
            })
        },
        otherFan(id, name){
            this.$router.push({
                path: '/otherFans',
                query: {
                    queryUid: id,
                    name: name
                }
            })
        }
    },
    watch: {
        'selected': {
            handler() {
                switch (this.selected) {
                    case 'total': // 全部粉丝0
                        console.log('全部粉丝');
                        this.getInfo(0)
                        break
                    case 'direct': // 直属粉丝1
                        console.log('直属粉丝');
                        this.getInfo(1)
                        break
                    case 'recommend': // 间接粉丝2
                        console.log('间接粉丝');
                        this.getInfo(2, this.userId)
                        break
                }
            }
        }
    }
}
</script>
<style>
    .myFans .splitLine{
        height: 0.56rem;
        margin: 0.14rem 0;
        border-right: 1px solid #cccccc

    }
    .myFans .mint-navbar .mint-tab-item{
        padding: 0;
        width: 33%;
        height: 0.84rem;
    }
    .myFans .mint-tab-item .mint-tab-item-label{
        font-size: 0.32rem;
        font-weight: bold;
        height: 0.84rem;
        margin: 0 auto;
        padding: 0;
        line-height: 0.84rem;
        width: fit-content
    }
    .myFans .mint-navbar .mint-tab-item.is-selected{
        border: none;
    }
    .myFans .is-selected .mint-tab-item-label{
        border-bottom: 1px solid #26a2ff
    }
    .myFans .userList{
        display: flex;
        align-items: center;
        padding-left: 0.16rem
    }
    .myFans .userList img{
        width: 0.78rem;
        height: 0.78rem;
        border-radius: 50%;
        margin: 0.2rem
    }
    .myFans .userDetail{
        padding-top: 0.26rem;
        padding-bottom: 0.15rem;
        font-size: 0.24rem;
        width: 100%;
        text-align: left;
        border-top: 1px solid #eeeeee
    }
    .myFans .nickName{
        width: 100%;
        font-weight: bold;
        margin-bottom: 0.12rem;
        display: flex;
        justify-content: space-between
    }
    .myFans .nickName>div{
        color: #ff942c;
        padding-right: 0.34rem;
        font-weight: normal;
        display: flex;
        align-items: center
    }
    .myFans .nickName i{
        color: #000;
        font-size: 0.2rem;
    }
    .myFans .detailText-1{
        padding-right: 0.2rem;
        font-size: 0.24rem;
        color: #666
    }
    .myFans .detailText-2{
        font-size: 0.2rem;
        color: #666
    }
    .myFans .noMoreText{
        margin-top: 0.5rem;
        color: #999999;
        font-size: 0.28rem
    }
</style>
