<template>

 <div class="personalSetting">


   <nav class="nav"><span class="blueText">| </span>修改密码</nav>
      <!--   修改密码页面-->
   <div class="changePwd">
     <div class="Centered">
       <el-row :gutter="20">
         <el-col :span="8">
           <div class="fx">
             <label class="w100" >用户名</label>
             <el-input v-model="name" class="mxWidth" name="用户名" disabled="" ></el-input>
           </div>
         </el-col>
       </el-row>
       <el-row :gutter="20">
         <el-col :span="8">
           <div class="fx">
             <label class="w100">原密码</label>
             <el-input v-model="oldpwd" class="mxWidth"  placeholder="请输入原密码" type="password"></el-input>
           </div>
         </el-col>
       </el-row>
       <el-row :gutter="10">
         <el-col :span="8">
             <label id="remind" >{{remind}}</label>
         </el-col>
       </el-row>
       <el-row :gutter="20">
         <el-col :span="8">
           <div class="fx">
             <label class="w100">新密码</label>
             <el-input v-model="newpwd" class="mxWidth" placeholder="请输入新密码" type="password"></el-input>
           </div>
         </el-col>
       </el-row>
       <el-row :gutter="20">

         <el-col :span="6">
           <el-button type="primary" @click="changpwd" class="queryBtn btns">确认修改</el-button>
         </el-col>

       </el-row>
     </div>

   </div>

 </div>
</template>

<script>
  import {userLogin,personalSet} from "@/api/index"
  import {getLocalData} from "@/utils/base"

  export default {
    data(){
      return {
        name:'',
        oldpwd:'',
        newpwd:'',
        remind:''

      }
    },
    created() {
      this.name = getLocalData("hbrj_userName");
    },
    methods: {
      changpwd(){//密码修改 用户名与密码是否一致判断
          if(this.newpwd == '' || this.oldpwd == ''){
            this.$message({
              type:'warning',
              message:"密码不能为空"
            });
            return;
          }else if (this.newpwd.length>22) {
            this.$message({
              type:'warning',
              message:"密码长度不超过22位字符"
            });
            return;
          }
          let params = {
            username:this.name,
            password:this.oldpwd
          };
          userLogin(params).then(data =>{
            if(data.code !== 200){
              //console.log(data.msg)
             this.remind = data.msg
            }else{
              this.remind = '';
              this.setPwd();
            }
          })


      },
      setPwd(){
        let params = {
            userId:getLocalData('hbrj_uid'),
            password:this.newpwd
        };
        personalSet(params).then((data)=>{
          if(data.code == 200){
             this.$message({
                type:'success',
                message:"修改成功"
            })
          }
        })
      }

  }}
</script>

<style>
  #remind{
    position: absolute;
    left: 90px;
    top: -60px;
    color: red;
  }

  .changePwd .mxWidth{
    max-width: 380px;
    z-index: 100;
  }
  .changePwd .queryBtn{
    width: 130px;
  }
  .changePwd .btns{
    height: 32px;
    border-radius: 4px;
    font-size:14px;
    line-height: 0.5;
    margin-left: 150px;

  }
  .changePwd{
    height: 770px;
    background-color: #ffffff;
    border-radius: 4px;
    line-height: 96px;
  }
  .Centered{
    width: 1400px;
    position: relative;
    left: 100px;
  }
</style>
