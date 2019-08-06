<template>
    <div class="editNickView">
        <backBtn type="setting" pageName="昵 称"></backBtn>
        <div class="nickNameContain">
            <span class="nickNameLable">我的昵称</span>
            <input class="nickNameInput" :placeholder="placeholder" v-model="nickName" @input="inputFun" type="text" />
            <span v-if="showClose" @click="clearInput" class="closeBtn"></span>
        </div>
        <!--<mt-field label="我的昵称" :placeholder="placeholder" v-model="nickName" class="editField"></mt-field>-->
        <mt-button class="sureBtn" type="primary" @click="clickSureBtn">{{btnText}}</mt-button>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn"
import {editNick} from "@/api/index"
import { getLocalData } from "@/utils/store"
export default {
    data(){
        return {
            nickName:"",
            btnText: "",
            placeholder: "",
            showClose:false
        }
    },
    created() {
        this.nickFlag = this.$route.params.nickFlag;
        console.log(this.nickFlag)
        this.nickName = this.nickFlag == 0 ? "" : this.$route.params.name;
        if(this.nickName){
            this.showClose=true;
        }
        this.btnText = this.nickFlag == 0 ? "确定" : "确定修改";
        this.placeholder = this.nickFlag == 0 ? "快来设置你的昵称" : "请输入新的昵称";
    },
    methods: {
        clickSureBtn(){
            if(this.nickName == ''){
                this.$toast("请设置你的昵称");
                return;
            }
            // let sid = getLocalData('hbxj_sid');
            let params = {
                nickname:this.nickName,
               // sid:"adminadmin123"
            }
            editNick(params).then(data =>{
                this.$toast({
                    message:"设置成功",
                    duration: 1500
                });
                setTimeout(() => {
                this.$router.push({name:'setting'}) 
                }, 1500);
               
            })
        },
        clearInput(){
            this.nickName="";
            this.showClose=false;
        },
        inputFun(){
            if(this.nickName){
                this.showClose=true;
            }else{
                this.showClose=false;
            }
        }
    },
    components:{
        backBtn
    }
}
</script>
<style>

.editNickView .editField{
    height:0.9rem;
    border-bottom:1px solid #f2f2f2;
    font-size:0.28rem;
}
.editNickView .sureBtn{
    width:6rem;
    height:0.75rem;
    border-radius:0.38rem;
    margin-top:2.06rem;
    font-size:0.28rem;
}

input::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
	font-size: 0.28rem;
}

.editNickView .nickNameContain{
    display: flex;
    height: 0.88rem;
    border-bottom: 1px solid #f2f2f2;
    line-height: 0.88rem;
    font-size: 0.28rem;
    padding: 0 0.32;
}

.editNickView .nickNameLable{
    display: inline-block;
    width: 1.5rem;
}

.editNickView .nickNameInput{
    background: none;
    outline: none;
    border: 0px;
    width: 5rem;;
    line-height: 1.6;
}

.editNickView .closeBtn{
    width:0.7rem;
    height:100%;
    background:url("../../assets/img/close.png") no-repeat;
    background-size:50%;
    background-position:center center;
    cursor: pointer;

}
</style>
