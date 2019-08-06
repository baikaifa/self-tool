<template>
   <div class="imgTopic">
        <nav class="nav">| 图片专题</nav>
        <!-- 表单 -->
        <div class="formDiv">
             <el-form :data="topicForm" class="topicForm" label-width="120px">
            <el-form-item label="专题类型" prop="typeName">
                <el-input readonly v-model="typeName"></el-input>
            </el-form-item>
            <el-form-item label="专题名称" prop="name" >
                <el-input v-model="topicForm.name"></el-input>
            </el-form-item>
            <el-form-item label="专题显示时间" prop="time" >
                 <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="topicForm.startTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-date-picker type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="topicForm.endTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <div class="uploadCont">
                <label class="uploadText"><span class="requireStar">*</span>上传图片</label>
                  <el-upload
                    ref="upload"
                    required
                    :limit='1'
                    class="avatar-uploader"
                    :data="{'sid':sid}"
                    action="/special/topic/upload"
                    :on-change="handleChange"
                    :on-remove="handelRemove"
                    :before-upload="handleBeforeUpload"
                    :show-file-list="false">
                        <img v-if="topicForm.imageUrl" :src="topicForm.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <p slot="tip" class="uploadTips">注：只能上传JPG/PNG文件，且大小不超过500KB</p>
                    </el-upload>
                    <span class="removeText" @click="handelRemove">删除</span>
            </div>
            <el-form-item>
                <el-button @click="goBack" class="btn blueBox">返回</el-button>
                <el-button type="primary" @click="saveFun" class="btn">保存</el-button>
            </el-form-item>
        </el-form>
        </div>
       
    </div> 
</template>
<script>
  import {addSpecialDetail,createImgSpecial} from "@/api/index.js";
  import {getLocalData} from "@/utils/base";
export default {
    data(){
        return {
            sid: getLocalData("hbrj_sid"),
            topicForm:{
                type:0,
                
                name:'',
                startTime:'',
                endTime:'',
                imageUrl:'',
                id:""
            },
            typeName:"图片专题"
        }
    },
    created(){
      this.topicForm.id=this.$route.query.id;
      if(this.topicForm.id){
        this.getTopicDetail();
      }
      
    },
    methods: {
      getTopicDetail(){
        addSpecialDetail({"id":this.topicForm.id}).then((res)=>{
          if(res.code==200){
            var data=res.data;
            for(var i in this.topicForm){
              this.topicForm[i]=data[i];
            }
          }else{
            this.$message.error("图片上传失败");
          }
        });
      },
      handleChange(res){
        if(res.status=="success"){
          var code=res.response.code;
          if(code==200){
            this.topicForm.imageUrl=res.response.data;
          }else{
            this.$message.error(res.response.msg);
          }
          
        }
        if(res.status=="error"){
          this.$message.error("图片上传失败");
        }
      },
      handleBeforeUpload(file){
       // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

       /* if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }*/
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return;
        }
       
      },
      handelRemove(){
        this.topicForm.imageUrl="";
        this.$refs.upload.clearFiles();
      },
      goBack(){
        this.$router.push({
          name:"topicManage"
        })
      },
      saveFun(){
        createImgSpecial(this.topicForm).then((res)=>{
          if(res.code==200){
            this.$message.success("图片专题编辑成功");
            location.reload();
          }else{
            this.$message.error(res.msg)
          }
        });
      }
    },
}   
</script>
<style>
    .imgTopic .topicForm{
        height:937px;
        width:600px;
    }
    .imgTopic input {
        height:32px;
    }
    .imgTopic .el-input{
        text-align: left;
    }
     .imgTopic .formDiv{
        width:100%;
        background:#fff;
        padding:30px;
    }
    .imgTopic .btn{
        width: 130px;
        height: 32px;
        border-radius: 4px;
        line-height:0.5;
    }
    .imgTopic .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .imgTopic .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
  .imgTopic .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .imgTopic .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .imgTopic .uploadTips{
      padding:20px 0;
      font-size:12px;
      color:#f85c5d;
  }
  .imgTopic .uploadText{
    width:100px;
  }
  .imgTopic .uploadCont{
      display: flex;
      align-items: center;
  }
  .imgTopic .requireStar{
      color:#f85c5d;
  }
  .imgTopic .removeText{
      font-size:14px;
      color:#3288ff;
      padding:20px;
      cursor: pointer;
  }
</style>
