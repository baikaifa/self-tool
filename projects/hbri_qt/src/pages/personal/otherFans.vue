<template>
    <div class="otherFans">
        <backBtn :pageName="name" :type="type"></backBtn>
        <div class="split"></div>
        <div class="fanLists">
            <div v-for="item in fanList" class="detail">
                <img :src="item.userAvatar" alt="" class="userAvatar">
                <div class="rDetail">
                    <div class="name">{{item.userNick}}</div>
                    <div class="other">
                        <span class="phonenum">{{item.mobileNumber}}</span>
                        <span class="time">{{item.createTime}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import {myFans} from "@/api/index";
export default {
    data(){
        return {
            type: 'myFans',
            name: "",
            pageSize: 20,
            pageNo: 1,
            fanList: []
        }
    },
    components:{
        backBtn
    },
    created () {
        this.queryUid = this.$route.query.queryUid;
        this.name = this.$route.query.name;
        // this.name = 123123
        console.log(this.$route.query.queryUid, this.$route.query.name);
        this.getInfo()
    },
    methods: {
        getInfo(){
            let params = {
                type: 2,
                queryUid: this.queryUid,
                pageSize: this.pageSize,
                pageNo: this.pageNo
            }
            myFans(params).then(res=>{
                if(res.code == 200){
                    var data = typeof(res.data) === 'string'?JSON.parse(res.data):res.data;
                    this.fanList = data.list

                }else{
                    console.log(res.msg)
                }
            })
        }
    },
}
</script>
<style>
    .otherFans .split{
        height: 0.2rem;
        background: #f5f5f5
    }
    .otherFans .detail{
        display: flex;
        padding-top: 0.2rem;
        padding-left: 0.36rem;
    }
    .otherFans .userAvatar{
        height: 0.78rem;
        width: 0.78rem;
        border-radius: 50%;
        margin-right: 0.2rem;
    }
    .otherFans .rDetail{
        font-size: 0.24rem;
        width: 100%;
        padding-top: 0.05rem;
        padding-bottom: 0.1rem;
        padding-right: 0.2rem;
        border-bottom: 1px solid #eeeeee
    }
    .otherFans .name{
        text-align: left
    }
    .otherFans .other{
        color: #666666;
        margin-top: 0.1rem;
        display: flex;
        justify-content: space-between;
    }
</style>