<template>
    <div class="setPwd">
        <backBtn pageName="设置密码" type="setPass">
          <span class="transToRight" slot="rightBtn" @click="jumpToHome">跳过</span>
        </backBtn>
        <div class='setPass'>

          <mt-field placeholder="设置密码" type="text" class="fieldBox" v-model="code"  v-if="eye" @input.native="checkSpace"></mt-field>
          <mt-field placeholder="设置密码" type="password" class="fieldBox" v-model="code"  @input.native="checkSpace" v-else></mt-field>

          <div class="open-eye" v-if="eye" v-on:click="eye=false"></div>
          <div class="close-eye" v-else v-on:click="eye=true"></div>

          <div class="setPass-submit">
            <mt-button type="primary" size="large" class="lgBtn" v-on:click="setPass">确认</mt-button>
          </div>

        </div>
    </div>

</template>
<script>
import backBtn from "@/components/backBtn"
import { setPassword, getRandomnumber } from "@/api/index"
import {getLocalData} from "@/utils/store"
import {checkPsw,checkSpace} from "@/utils/checkReg"
export default {
    data(){
        return {
            code: '', // 密码
            eye: false // 眼睛是否睁开
        }
    },
    components:{
        backBtn
    },
    methods: {
      jumpToHome(){
         this.$router.push({name:'home'})
      },
      checkSpace(){
        this.code = checkSpace(this.code)
      },
      setPass(){

          let reg1 = /^[0-9a-zA-Z]{6,20}$/; // 数字字母
          let reg2= /^(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,20}$/;// 数字特殊字符
          let reg3 = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,20}$/; // 数字+字母+特殊字符

          if(!reg1.test(this.code)&&!reg2.test(this.code)&&!reg3.test(this.code)){
            this.$toast('密码设置长度必须为6-20位，数字和字母或特殊字符的组合');
            return;
          }

          let params = {
              r1: this.$md5(this.code+'a'),
              r2: '',
              sid: ''
          };
          let flag = this.regData();
          if(!flag){
              return;
          }else{
            let sid = getLocalData("hbxj_sid");
            let sidParams = {
              sid:sid
            }
            getRandomnumber(sidParams).then(data=>{
              if (data.code == 200) {
                let sort = ((data.data.nums).sort((a,b)=>{return b-a;})).join('');
                params.r2 = this.$md5(params.r1 + sort);
                params.sid = sid;

              } else {
                this.$toast('设置失败');
              }

            })
            .then(()=>{

              setPassword(params).then(data=>{
                if(data.code == 200){
                  this.$toast('设置成功');
                  this.$router.push({name:'home'})
                }else {
                  this.$toast('设置失败');
                }
              });
            })

          }

      },
      regData(){
        if(!this.code){
            this.$toast('密码不能为空');
            return false;
        }
        let result = checkPsw(this.code);
        if(!result.flag){
          this.$toast(result.msg);
          return false;
        }
        return true;
      }
    },
}
</script>
<style>

.setPass {
  position: relative;
}
.fieldBox {
  height: 0.77rem;
  width: 100%;
  padding: 0 0.2rem;
  margin: .4rem 0 0.8rem;
}
.open-eye {
  position: absolute;
  top: .38rem;
  right: .3rem;
  width: .32rem;
  height: .24rem;
  background: url(../../assets/img/input/open_eye.png) no-repeat;
  background-size: 100% 100%;
}
.close-eye {
  position: absolute;
  top: .43rem;
  right: .3rem;
  width: .32rem;
  height: .14rem;
  background: url(../../assets/img/input/close_eye.png) no-repeat;
  background-size: 100% 100%;
}
.mint-field-clear {
  display: none;
}
.setPass-submit {
  padding: 0 .8rem;
}
.lgBtn {
  background: #3289ff;
  border-radius: 60px;
}
.setPwd .icon-fanhui {
  display: none;
}
.setPass .mint-cell-wrapper{
  background-image:none; 
}
.transToRight {
  color: #3289ff;
  font-size: .28rem;
  position: absolute;
  top: .25rem;
  right: .24rem;
}
</style>
