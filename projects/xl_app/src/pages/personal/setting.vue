<template>
    <div class="settingWrap">
		<eleTit></eleTit>
        <!-- <div class="settingHeader">
            <span class="iconfont iconfanhui btnBack" @click="goBack"></span>
            <span class="title">设置</span>
        </div> -->
        <div class="userInfoWrap">
            <div class="modifyUserAvatar">
                <img :src="userInfo.avatar" alt="" class="userAvatar" @click="changeAvatar">
                <span @click="changeAvatar">点击修改头像</span>
                <input type="file" 
                    accept="image/*" ref="uploadAvatar" 
                    class="uploadAvatar" @change="onUpload"/>
            </div>
            
        </div>
        <div class="panelListWrap">
            <div :class="item.type == 'name' ? 'panelItem borderB20 nickName': 'panelItem'" v-for="(item,index) in panels" :key="index" @click="modifyInfo(item.type)">
                <div class="leftPanel">
                    <span class="panelName">{{item.name}}</span>
                    <span class="itemVal" v-show="item.type == 'phone'">{{userInfo.phone}}</span>
                </div>
                
                <div class="rightPanel">
                    <span class="actionText" v-show="item.type !== 'name'">{{item.actionText}}</span>
                    <span class="actionText" v-show="item.type == 'name'">{{userInfo.nickname}}</span>
                    <span class="goNext iconfont icongengduo1"></span>
                </div>
            </div>
            <div class="logOut">
                <span @click="logOutBtn">退出登录</span>
            </div>
        </div>
    </div>
</template>
<script>
import {reqPersonal} from "../../utils/request";
import defaultAvatar from '../../assets/img/personal/avatar.png';
import eleTit from "@/components/title/title";
export default {
    components: {eleTit},
    data() {
        return {
            token: '',
            uploadImg: '',
            userInfo: {
                userId: '',
                avatar: defaultAvatar,
                nickname: '',
                phone: '',
            },
            panels: [
                {
                    name: '昵称',
                    actionText: '',
                    type: 'name'
                },
                // {
                //     name: '收款账户',
                //     actionText: '设置',
                //     type: 'account'
                // },
                {
                    name: '绑定手机',
                    actionText: '修改',
                    type: 'phone'
                },
                {
                    name: '登录密码',
                    actionText: '修改',
                    type: 'pwd'
                },
            ]
        }
    },
    created() {
        this.token = 'b389494d1530103054faacb890973eef3bf23bbea84523e84838fd0915ecb98d';
        this.getSelfInfo();
    },
    mounted() {
    },
    methods: {
        // 返回
        goBack() {
            this.$router.go(-1);
        },
        getSelfInfo() {
            let params = {
                token: this.token
            }
            reqPersonal.selfInfo(params).then(res=>{
                if(res.code == 200) {
                    this.userInfo = res.data;
                    this.userInfo.avatar = this.userInfo.avatar ? this.userInfo.avatar : defaultAvatar;
                } else {
                    console.log("获取数据失败")
                }
            })

        },
        // 修改头像
        changeAvatar() {
            this.$refs.uploadAvatar.click();
        },
        onUpload(evt){
            if(evt.target.files.length == 0){
                return;
            }
            // let sid = getLocalData("hbxj_sid");
            let fData = new FormData();
            fData.append('token',this.token);
            // fData.append('file',evt.target.files[0]);
            fData.append('act','appavatar');
            fData.append('userid',this.userId);

            reqPersonal.uploadAvatar(fData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
                if(res.result == 200) {
                    console.log("res",res)
                    let time = new Date().getTime();
                    this.uploadImg = res.info.image+"?time="+time;
                    this.saveAvater();
                } else {
                    console.log("上传失败")
                }
            })
            // reqPersonal.uploadAvatar(fData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
            //     if(res.result == 200) {
            //         console.log("res",res)
            //         let time = new Date().getTime();
            //         this.uploadImg = res.info.image+"?time="+time;
            //         this.saveAvater();
            //     } else {
            //         console.log("上传失败")
            //     }
            // })
        },
        // 上传保存图片
        saveAvater(){
            let params = {
                token: this.token,
                avatar:this.uploadImg
            };
            reqPersonal.saveAvatar(params).then(res =>{
                if(res.code == 200) {
                    alert("头像保存成功")
                    this.getSelfInfo();
                } else{
                    console.log("头像保存失败")
                }
            })
        },
        // 修改信息
        modifyInfo(type) {
            if(type == 'name') {
                this.$router.push('/nickname');
            }
            if(type == 'account') {

            }
            if(type == 'phone') {
                // this.$router.push({path:'/modifyPhone',query:{phone:this.phone}});
                if(this.userInfo.phone) {
                    this.$router.push({path:'/modifyPhone',query:{phone:'17733972992'}});
                } else {
                    this.$router.push({path:'/modifyNewPhone'});
                }
            }
            if(type == 'pwd') {
                if(this.userInfo.phone) {
                    this.$router.push({path:'/forgetPwd',query:{phone:'17733972992'}});
                } else {
                    this.$router.push({path:'/forgetPwd',query:{phone:''}});
                }
            }
        },
        // 退出登录
        logOutBtn() {
            window.logoutAction();
        }
    }    
}
</script>
<style scoped="scoped" type="text/css">
    .settingWrap {
        background: #f4f5f7;
        height: 100vh;
    }
    .settingWrap .settingHeader {
        background: #fff;
        /* padding: 20px 40px; */
        position: relative;
        height: 80px;
        line-height: 80px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #ebebeb;
    }
    .settingWrap .settingHeader .btnBack {
        font-size: 34px;
        position: absolute;
        left: 20px;
    }
    .settingWrap .settingHeader .title {
        font-size: 36px;
    }
    .settingWrap .userInfoWrap {
        text-align: center;
        background: #fff;
        padding: 0 30px;
    }
    .settingWrap .userInfoWrap .modifyUserAvatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #c7c7c7;
        padding: 50px 0;
        font-size: 24px;
        border-bottom: 1px solid #f2f2f2;
    }
    .settingWrap .userInfoWrap .userAvatar {
        display: block;
        width: 130px;
        height: 130px;
        background: #fff;
        border: 1PX solid #ccc;
        border-radius: 50%;
        margin-bottom: 20px;
    }
    .settingWrap .panelListWrap {
        font-size: 32px;
        color: #000;
        background: #fff;
    }
    .settingWrap .panelListWrap .panelItem {
        padding: 30px 0;
        margin: 0 30px;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .settingWrap .panelListWrap .panelItem.noBorder {
        border: 0;
    }
    .settingWrap .panelListWrap .panelItem.borderB20 {
        border-bottom: 20px solid #f4f5f7;
    }
    .settingWrap .panelListWrap .panelItem.nickName {
        margin: 0;
        padding: 30px;
    }
    .settingWrap .panelListWrap .panelItem .panelName {
        flex: 1;
        padding-left: 20px;
    }
    .settingWrap .panelListWrap .panelItem .iconfont {
        font-size: 40px;
        color: #ef4454;
    }
    .settingWrap .panelListWrap .panelItem .goNext {
        color: #bfbfbf;
    }
    .settingWrap .panelListWrap .leftPanel .itemVal {
        color: #c7c7c7;
    }
    .settingWrap .panelListWrap .rightPanel .actionText {
        color: #c7c7c7;
    }
    .settingWrap .panelListWrap .logOut {
        padding: 27px;
        /* border-bottom: 1px solid #ddd; */
        text-align: center;
        border-top: 20px solid #f4f5f7;
    }
    .settingWrap .uploadAvatar{
        display: none;
    } 
</style>
