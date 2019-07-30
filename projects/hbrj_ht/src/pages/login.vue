<template>
    <div class="loginView">
        <div class="loginForm">
            <p class="title">欢迎登录海豹日记中台系统</p>
            <el-form  ref="ruleForm">
                <div class="userItem">
                    <span class="iconPos"><i class="iconfont icon-ren"></i></span>
                    <el-input 
                        v-model="userName" 
                        placeholder="请输入用户名"
                        :class="['items','ft18',noName || errorMsg?'redBorder':'']" 
                        clearable 
                        @input.native="userNameNoSpace"
                    ></el-input>
                </div>
                
                <span class="notips" v-show="!noName"></span>
                <span class="tips" v-show="noName" >请输入用户名</span>

                <div class="passItems">
                    <span class="iconPos"><i class="iconfont icon-key"></i></span>
                    <el-input 
                        v-model="password" 
                        placeholder="请输入密码" 
                        type="password" 
                        :class="['items','ft18',noPass || errorMsg?'redBorder':'']"
                        clearable
                   @input.native="passwordeNoSpace"
                ></el-input>
                </div>
               
                <span class="notips" v-show="!noPass && !errorMsg"></span>
                <span class="tips" v-show="noPass">请输入密码</span>
                <span class="tips" v-show="errorMsg && !noPass && !noName">{{errorMsg}}</span>
                <el-button type="primary" @click="onSubmit" class="items loginBtn">登 录</el-button>

            </el-form>

        </div>
    </div>
</template>
<script>
import {userLogin} from "@/api/index"
import {setLocalData} from "@/utils/base"
import {noSpace} from "@/utils/check"
export default {
    data(){
        return {
            userName:'',
            password:'',
            errorMsg:'',
            noName:false,
            noPass:false
        }
    },
    methods: {
        userNameNoSpace(value){
        this.userName = noSpace(this.userName);
        },
        passwordeNoSpace(value){
        this.password = noSpace(this.password);
        },
        onSubmit(){//登录
           this.checkName();
           this.checkPass();
           if(this.noName || this.noPass){//用户名或密码有一个为空时
                this.errorMsg = '';
                return false;
           }else{
             
               let params = {
                   username:this.userName,
                   password:this.password
               };
               let that = this;
               userLogin(params).then(data =>{
                   if(data.code != 200){
                       this.errorMsg = data.msg;
                   }else{
                       setLocalData("hbrj_uid",data.data.uid);
                       setLocalData("hbrj_sid",data.data.sid);
                       setLocalData("hbrj_userName",that.userName);
                       this.$router.push({name:'goodsStore'});
                   }
               })
           }
        },
        checkName(){
            if(this.userName == ''){
                this.noName = true;
            }else{
                this.noName = false;
            }
        },
        checkPass(){
            if(this.password == ''){
                this.noPass = true;
            }else{
                this.noPass = false;
            }
        }
    },
}
</script>
<style>
    .loginView{
        height:100vh;
        background:url("../assets/image/login.png") no-repeat;
        background-size:100% 100%;
    }
    .loginView .title{
        color:#3289ff;
        font-size:32px;
        letter-spacing: 3px;
        margin-bottom:80px;
    }
    .loginView .loginForm{
        position: absolute;
        right:210px;
        top:50%;
        transform:translateY(-50%);
        z-index:99;
    }
    .loginView .items{
        width:540px;
        display:block;
    }
    .loginView .formCont{
        display: flex;
        flex-direction: column;
    }
    .loginView input{
        height:60px;
        border-radius: 30px;
        border:none;
        padding-left:45px;
        background:#fff;
    }
    .loginView .loginBtn{
        height:60px;
        border-radius: 30px;
        margin-top:70px;
        font-size:26px; 
        letter-spacing: 3px;
    }
    .loginView .iconPos{
        position:absolute;
        left:15px;
        top:0;
        height:60px;
        line-height:60px;
        z-index:99;
    }
    .loginView .iconPos i{
        font-size:22px;
        color:#ccc;
    }
    .loginView .tips{
        height:74px;
        display: inline-block;
        padding:20px 0 30px 0;
        color:#ff0000;
        font-size:18px;
    }
    .loginView .notips{
        display: inline-block;
        width:100%;
        height:74px;
    }
    .userItem,.passItems{
        position: relative;
    }
    .loginView .redBorder{
        border:1px solid #ff0000;
        border-radius: 30px;
    }
</style>
