<template>
  <div class="createAd">
    <nav class="nav">| 创建广告</nav>
    
    <!-- 表单 -->
    <div class="formDiv">
      
      <el-form  class="topicForm" label-width="120px" label-position="right" :model="list" :rules="rules">
        <el-form-item label="所属频道:" prop="catId" required>
          <div class="leftDiv">
            <el-select v-model="list.catId"   >
              <el-option
                v-for="item in channelList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </div>
        </el-form-item>
        <el-form-item label="banner名称:" prop="name">
          <el-col :span="11">
            <el-input v-model="list.name"   :rules="rules" maxlength="16"  auto-complete="off" @input="bannerName(list.name,this)" :class="outfifteen ? 'borderRed':''"></el-input>

          </el-col>
        </el-form-item>
        <div class="uploadCont">
          <label class="uploadText"><span class="requireStar">*</span>图片</label>
          <div class="upDiv">
            <el-upload
            :limit="1"
            ref="upload"
            required
            :action='imgAction'
            :data="{'sid':sid}"
            :on-change="handleChange"
            :on-error="handleEer"
            :on-remove="handelRemove"
            :before-upload="handleBeforeUpload"
            class="avatar-uploader"
            >
            <img v-if="list.imageUrl" :src="list.imageUrl" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p slot="tip" class="uploadTips">注:广告图片尺寸750*375X,或者长高比为2:1的图片,大小不超过2M</p>
          </el-upload>
          </div>
          <span v-if="list.imageUrl" class="removeText" @click="handelRemove">删除</span>
        </div>
        <el-form-item style="display:none;" label="图片链接：" prop="imageUrl" >
          <el-col :span="11">
            <el-input v-model="list.imageUrl" ></el-input>

          </el-col>
        </el-form-item>
        <el-form-item label="选择链接内容:" prop="type" >
          <div class="leftDiv">
            <el-select v-model="list.type"  >
              <el-option
                v-for="item in adTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </div>
        </el-form-item>
        <el-form-item v-if="list.type===0" label="输入商品ID:" prop="item">
          <el-col :span="11">
            <el-input v-model="list.item"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-if="list.type===1" label="输入URL链接:" prop="item" >
          <el-col :span="11">
            <el-input v-model="list.item"></el-input>

          </el-col>
        </el-form-item>

        <el-form-item label="banner时间:" >

          <el-col :span="11">
            <el-form-item prop="startTime" >
              <el-date-picker type="datetime" placeholder="开始时间" v-model="list.startTime"  value-format="	yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime"  >
              <el-date-picker type="datetime" placeholder="结束时间" v-model="list.endTime" value-format="	yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-form-item>
        <el-form-item label="banner排序:" prop="sort" >
          <el-col :span="11">
            <el-input v-model="list.sort" placeholder="请输入整数"  ></el-input>
          </el-col>

        </el-form-item>

        <el-form-item>
          <el-button @click="goBack" class="btn blueBox">返回</el-button>
          <el-button type="primary" @click="subFun" class="btn">确定</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
  import {getLocalData} from "@/utils/base"
  import {advertisingSpace,getChannelList,upbanner,getBannerDetail} from'@/api/index'
  export default {
    data(){
      return {
        outfifteen:false,
        rules:{
          catId :[{required: true, message: '请选择', trigger: 'blur'}],
          endTime :[{required: true, message: '请选择', trigger: 'blur'}],
          startTime :[{required: true, message: '请选择', trigger: 'blur'}],
          imageUrl :[{required: true, message: '请添加', trigger: 'blur'}],
          type :[{required: true, message: '请选择', trigger: 'blur'}],
          sort :[{required: true, message: '请输入', trigger: 'blur'}],
          name :[{required: true, message: '请输入', trigger: 'blur'}],
          item :[{required: true, message: '请输入', trigger: 'blur'}]
        },
        "sid":getLocalData("hbrj_sid"),
        "imgAction":"/banner/upload",
        "list":{
          "name":"",
          "imageUrl":"",
          "type":"",
          "startTime":"",
          "endTime":"",
          "catId":"",
          "sort":"",
          "item":""
        },
         "channelList":[],
         "adTypeList":[
           {
             "value":0,
             "label":"链接到商品"
           },
           {
             "value":1,
             "label":"链接到专题"
           }
         ]
      }
    },
    created(){
      this.getChannelListFun();
      var bannerId=this.$route.query.id;
      if(bannerId){
        this.getBannerDetail(bannerId);
      }
    },
    methods: {

      getBannerDetail(bannerId){
        var _this=this;
        getBannerDetail({"bannerId":bannerId}).then(function(res){
          if(res.code==200){
            var data=res.data;
            for(var i in _this.list){
              _this.list[i]=data[i];
            }
          }else{
             _this.message.error(res.msg);
          }
        });
      },
      getChannelListFun(){
        var _this=this;
        getChannelList().then(function(res){
          if(res.code==200){
            var list=res.data;
            for(var i=0;i<list.length;i++){
              var item={};
              item.label=list[i].categoryName;
              item.value=list[i].categoryId;
              _this.channelList.push(item);
            }
            console.log(JSON.stringify(_this.channelList));
          }else{
            _this.message.error(res.msg);
          }
        });
        
      },
      handleChange(res){
        if(res.status=="success"){
          var code=res.response.code;
          if(code==200){
            this.list.imageUrl=res.response.data;

          }else{
            this.$message.error(res.response.msg);
            this.$message.error("图片上传失败");

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
        // this.$message.success('移除成功')
        this.list.imageUrl="";
        this.$refs.upload.clearFiles();
      },
      subFun(){
        var _this=this;
        advertisingSpace(_this.list).then(function(res){
          if(res.code==200){
            _this.$message.success("添加成功");
            location.reload();
          }else{
            _this.$message.error(res.msg);
          }
        });
      },
      goBack(){
        this.$router.push({
          name:"advertSite"
        })

      },
      bannerName(name){
        this.outfifteen=false
        if (name.length>15) {
          this.outfifteen=true
          this.$message({
            type:'warning',
            message: "banner名称不能超过15字符"
          })



        }


      },
      handleEer(err, file, fileList){

        this.$message.error("上传失败")
      }
    }
  }
</script>
<style>
  .createAd .topicForm{
    height:937px;
    width:600px;
  }
  .createAd input {
    height:32px;
  }
  .createAd .el-input{
    text-align: left;
  }
  .createAd .formDiv{
    width:100%;
    background:#fff;
    padding:30px;
  }
  .createAd .btn{
    width: 130px;
    height: 32px;
    border-radius: 4px;
    line-height:0.5;
  }
  .createAd .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .createAd .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .createAd .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .createAd .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .createAd .uploadTips{
    position: relative;
    left: 85px;
    padding:20px 0;
    font-size:12px;
    color:#f85c5d;
  }
  .createAd .uploadText{
    width:100px;
  }
  .createAd .uploadCont{
    display: flex;
    align-items: center;
  }
  .createAd .requireStar{
    color:#f85c5d;
  }
  .createAd .removeText{
    position: relative;
    left: -150px;
    top: 50px;
    font-size:14px;
    color:#3288ff;
    padding:20px;
    cursor: pointer;
  }
  .createAd .redText{

    color: red;
    font-size: 14px;
  }
  .createAd  .leftDiv{
    position: relative;
    left:-130px;
  }
  .createAd .upDiv{

    position: relative;
    left: -65px;
  }

  .createAd .borderRed  .el-input__inner{
    border-color: red;

  }
</style>
