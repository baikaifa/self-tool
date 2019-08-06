<template>
    <div class="setView">
        <backBtn type="personalCenter" pageName="设置"></backBtn>
        <div class="bgDiv"></div>
        <div class="setContain">
            <div class="userImg rowCenter">
                <div class="editavatar columnCenter" @click="editImg">
                    <img :src="avatar"/>
                    <span class="fontgray font24 mtop20">点击修改头像</span>
                    <input type="file" 
                    accept="image/*" ref="uploadAvatar" 
                    class="uploadAvatar" @change="onUpload"/>
                </div>
            
            </div>
            <div class="infoItem between p20 borderTop">
                <p>昵称</p>
                <p class="fontgray pd10" @click="editNick"><span>{{nickName}}</span><i class="iconfont icon-next"></i></p>
            </div>
            <div class="infoItem between p20 borderTop">
                <p>个人标签</p>
                <p class="fontgray pd10" @click="setTag"><span>{{tag}}</span><i class="iconfont icon-next"></i></p>
            </div>
            <div class="infoItem between mtop20 p20">
                <p>绑定支付宝</p>
                <p class="fontgray pd10" @click="bindAlipay"><span>{{bindzfb}}</span><i class="iconfont icon-next"></i></p>
            </div>
            <div class="infoItem between p20 borderTop">
                <p>微信授权</p>
                <p class="fontgray pd10" @click="bindWechat"><span>{{wxAssign}}</span><i class="iconfont icon-next" v-if="wxAssign=='未绑定'"></i></p>
            </div>
            <div class="infoItem between mtop20 p20">
                <p>绑定手机号</p>
                <p class="fontgray pd10" @click="editPhone"><span>修改</span><i class="iconfont icon-next"></i></p>
            </div>
            <div class="infoItem between p20 borderTop">
                <p>修改密码</p>
                <p class="fontgray pd10" @click="editPwd"><span>修改</span><i class="iconfont icon-next"></i></p>
            </div>
            <div class="infoItem between mtop20 p20">
                <p>消息通知</p>
                <p class="fontgray pd10" @click="setNotice"><i class="iconfont icon-next"></i></p>
            </div>
            <div class="infoItem between p20 borderTop">
                <p>清除缓存<span class="fontgray">{{cache}}</span></p>
                <mt-button type="primary" class="clearCache" @click="clearCache">清除缓存</mt-button>
            </div>
            <div class="logoutBtn infoItem mtop20 p20" @click="logoutHandler">退出登录</div>
        </div>
        
    </div>
</template>
<script>
import backBtn from "@/components/backBtn"
import {userInfo,editAvatar,uploadAvatar} from "@/api/index"
import { getLocalData,removeItem } from "@/utils/store"
export default {
    data(){
        return {
           nickName:'未设置',
           tag:'未设置',
           bindzfb:'未绑定',
           wxAssign:'未绑定',
           cache:'',
           avatar:"",
           mobileNumber:'',
           inviteCode:''
        }
    },
    created() {
        this.getData();
        this.getCache();
        window.cacheSizeiOS = this.cacheSizeiOS;
        window.clearCacheSucessiOS = this.clearCacheSucessiOS;
    },
    methods: {
        clearCache(){
            if(this.cache == ''){
                this.$toast("暂无缓存清除");
                return;
            }
            if(this.$phoneType == 'android'){
                window.SealsDiary.clearSDCache();
                this.cache = '';
                this.$toast("清除缓存成功");
            }else if(this.$phoneType == 'ios'){
                window.webkit.messageHandlers.clearCache.postMessage(null);
                // clearCache();
            }
        },
        clearCacheSucessiOS(){
            this.cache = '';
            this.$toast("清除缓存成功");
        },
        editPwd(){
            this.$router.push({name:'forgetPwd',params:{type:'setting'}});
        },
        bindWechat(){
           
            if(this.wxAssign == "未绑定"){
                this.$router.push({
                    name:"wechatLogin",
                    params:{type:'setting',"mobileNumber":this.mobileNumber}
                });
                
            } 
        },
        logoutHandler(){
            removeItem('hbxj_sid');
            this.$router.push({name:'register'});
        },
        setTag(){
            if(this.tag=='设置'){
                this.$router.push({name:'editMyTag',params:{type:'setting'}});
            }else{
                this.$router.push({name:'chooseTags',params:{type:'setting'}})
            }
        },
        getData(){
            userInfo().then(data =>{
                let time = new Date().getTime();
                this.nickName = data.data.nickFlag == 0 ? "去设置": data.data.nickname;
                this.nickFlag = data.data.nickFlag;
                this.tag = data.data.tagFlag == 1 ?"设置":"未设置";
                this.bindzfb =data.data.alipayFlag == 1 ?"绑定":"未绑定";
                this.wxAssign = data.data.wechatFlag == 1? "绑定":"未绑定";
                this.avatar = data.data.avatar+"?time="+time;
                this.mobileNumber = data.data.mobileNumber;
                this.inviteCode = data.data.inviteCode;
            }).catch(err =>{
                if(err.code == 15){
                    this.$router.push({name:'register'});
                }
            })
        },
        getCache(){
            if(this.$phoneType == 'android'){
                let cache = window.SealsDiary.getSDCache();
                this.cache = cache;
            }else if(this.$phoneType == 'ios'){
                window.webkit.messageHandlers.getCacheSize.postMessage(null);
                // getCacheSize();
            }
        },
        cacheSizeiOS(size){
            if(size != '0.00'){
                this.cache = size + 'M';
            }
        },
        editNick(){//修改昵称
            this.$router.push({name:'editNick',params:{name:this.nickName, nickFlag:this.nickFlag}});
        },
        editImg(){
            this.$refs.uploadAvatar.click();
            console.log(this.avatar);
        },
        uploadAvater(){
            let params = {
              // sid:"adminadmin123",
               avatarUrl:this.avatar
            };
             editAvatar(params).then(data =>{
                
            })
        },
        onUpload(evt){
            console.log(evt);
            if(evt.target.files.length == 0){
                return;
            }
            let sid = getLocalData("hbxj_sid");
            let fData = new FormData();
            fData.append('sid',sid);
            fData.append('file',evt.target.files[0]);

            uploadAvatar(fData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
                let time = new Date().getTime();
                this.avatar = res.data+"?time="+time;
                this.uploadAvater();
            })
        },
        // 绑定(修改)支付宝
        bindAlipay(){
            this.$router.push({
                path: "/bindAlipay",
                query: {
                    isBind: this.bindzfb,
                    type:'setting'
                }
            })
        },
        // 修改手机号
        editPhone(){
            console.log(12312312,this.inviteCode)
            this.$router.push({name:'editPhone',params:{inviteCode:this.inviteCode}})
        },
        // 消息通知
        setNotice(){
            this.$router.push("/setNotice")
        }

    },
    components:{
        backBtn
    }
}
</script>
<style>
.setView{
    width: 100%;
}
.setView .setContain{
       top:0;
       left: 0;
       right: 0;
       bottom: 0;
       background: #f0f0f0;
}
.setView .bgDiv{
     background: #f0f0f0;
     position: absolute;
     left: 0;
     right: 0;
     top: 0;
     bottom: 0;
     z-index: -1;
}
.setView .userImg{
    background: #fff;
    height:2.78rem;
    margin-top:0.8rem;
}
.setView .infoItem{
    height: 0.9rem;
    background:#fff;
    font-size:0.28rem;
}
.setView .logoutBtn{
    text-align: center;
    line-height:0.9rem;
}
.editavatar img{
    width:1.33rem;
    height:1.33rem;
    border-radius: 50%;
}
.setView .clearCache{
    height:0.42rem;
    border-radius:0.21rem;
    font-size:0.28rem;
}
.uploadAvatar{
    display: none;
}
</style>