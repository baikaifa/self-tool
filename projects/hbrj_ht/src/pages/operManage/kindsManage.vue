<template>
    <div class="kindsMge">
        <nav class="nav">| 分类管理</nav>
        <div class="cont">
            <!-- 左边一级分类 -->
            <div class="levelA">
                <el-button type="primary" class="addBtn"  @click="addEditLevel('','a')">新增一级分类</el-button>
                <div v-for="(item,index) in levelAData" :key="index" 
                :class="['levelAItem',index == activeItem ?'activeBg' :'']">
                    <span class="pad classAtitle">{{item.categoryName}}</span>
                    <div>
                        <span class="pad blueText" @click="addEditLevel(item,'a')">编辑</span>
                        <span class="pad orText"  @click="getLevelBList(item.categoryId,index)">查看</span>
                        <span class="pad redText" @click="deleteHander(item.categoryId,'classA')">删除</span>
                        <span v-if="index !== 0" class="pad redText" @click="moveTotop(item.categoryId)">上移</span>
                        <span v-if="index !== levelAData.length-1" class="pad redText" @click="moveTodown(item.categoryId)">下移</span>
                    </div> 
                </div>
            </div>
        <!-- 右边二级分类 -->
            <div class="levelB">
                <el-button type="primary" class="addBtn"  @click="addLevelB">新增二级分类</el-button>
                <div class="levelBcont">
                    <div v-for="(item,index) in levelBData" :key="index"  class="textC">
                        <p class="levelBTitle">{{item.categoryName}}</p>
                        <img :src="item.url" class="kindImg" />
                        <div>
                            <div class="operBtn">
                                <span class="pad5 blueText" @click="addEditLevel(item,'b')">编辑</span>
                                <span class="pad5 orText">查看</span>
                            </div>
                            <div class="operBtn">
                                <span @click="deleteHander(item.categoryId,'classB')" class="pad5 redText">删除</span>
                                <span v-if="index !== 0" @click="moveTotop(item.categoryId)" class="pad5 redText">上移</span>
                                <span v-if="index !== levelBData.length-1" @click="moveTodown(item.categoryId)" class="pad5 redText">下移</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="addLevelBBtn" @click="addLevelB"><i class="el-icon-plus"></i></div>
                        <div class="operBtn"></div>
                        <div class="operBtn"></div>
                    </div>
                   
                </div>
            </div>
        </div>
        <el-dialog :show-close="false" :title="popTitle" :modal-append-to-body="false" :visible.sync="dialogFormVisible">
            <div class="flxCenter mb10">
                <label class="w100">分类名称</label>
                <el-input v-model="query.catName" class="w50" required></el-input>
            </div>
            <div class="flxCenter">
                <label class="w100">显示时间</label> 
                <el-date-picker
                    v-model="query.startTime"
                type="datetime"
                placeholder="开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
                 - 
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="query.endTime"
                    type="datetime"
                    placeholder="结束时间"            
                >
                </el-date-picker>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleHander">取 消</el-button>
                <el-button type="primary" @click="submitHander">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {createClassA,createClassB,sortAdd,sortDecrease,getCategoryList,deleteClass,getClassBData} from "@/api/index"
export default {
    data(){
        return {
            activeItem:0,
            dialogFormVisible:false,
            popTitle:'',
            typeName:'',
            durTime:'',
            levelAData:[],
            levelBData:[],
            query:{
                catName:"",
                startTime:"",
                endTime:"",
                sort:0,
                id:""
            },
            editType:""
        }
    },
    created() {
        this.getClassAList();
    },
    methods: {
        getClassAList(){
            getCategoryList().then((data)=>{
                if(data.code == 200){
                    this.levelAData = data.data;
                }
            });
        },
        getLevelBList(id,index){
            this.activeItem = index;
            let that =this;
            getClassBData({id:id}).then((data) =>{
                if(data.code == 200){
                    that.levelBData = data.data;
                }else{
                    that.$message.error(data.msg);
                }
            })
        },
        deleteHander(id,type){//删除
            let that =this;
            deleteClass({id:id}).then((data)=>{
                if(data.code == 200){
                    if(type == "classA"){
                        that.getClassAList();
                    }else{
                        that.getLevelBList();
                    }
                    that.$message({
                        message: '删除成功',
                        type: 'success',
                        duration:1000
                     });
                }else{
                   that.$message.error(data.msg);
                }
            })
        },
        addEditLevel(item,type){//新增或者编辑一级分类
            
            this.dialogFormVisible = true;
            this.editType=type;
            if(item){
                if(type=='a'){
                    this.popTitle = "编辑一级分类";
                    
                }else{
                    this.popTitle = "编辑二级分类";
                    this.query.pId=item.parentCategoryId;
                    this.query.pictUrl=item.categoryIcon;
                }
                
                this.query.catName=item.categoryName;
                this.query.id=item.categoryId;
                this.query.startTime=item.startTime;
                this.query.endTime=item.endTime;
                this.query.sort=item.sort;
                
            }else{
                this.popTitle = "新增一级分类";
            }
            //this.submitHander("classA");
        },
        submitClassAData(){
            
            let that = this;
            createClassA(this.query).then((data)=>{
                
                if(data.code == 200){
                    that.$message({
                    message: '添加成功',
                    type: 'success',
                    duration:1000,
                    });
                    that.dialogFormVisible =false;
                    
                }else{
                    that.$message.error(data.msg);
                }
            });
        },
        submitClassBData(){
           let that = this;
            createClassB(this.query).then((data) =>{
                if(data.code == 200){
                    that.$message({
                        message: '添加成功',
                        type: 'success',
                        duration:1000
                    });
                    that.dialogFormVisible =false;
                    
                }else{
                   that.$message.error(data.msg); 
                }
            })
        },
        moveTotop(id){
            let _this = this;
            sortAdd({"categoryId":id}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '品类已上移',
                        type: 'success',
                        onClose:_this.getClassAList,
                        duration:1000
                     });
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        moveTodown(id){
            let _this = this;
            sortDecrease({"categoryId":id}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '品类已下移',
                        type: 'success',
                        onClose:_this.getClassBList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
        },
        addLevelB(id){
            this.dialogFormVisible = true;
            if(id){
                this.popTitle = "编辑二级分类";
            }else{
                this.popTitle = "新增二级分类";
            }
           this.submitHander("classB");
          
        },
        cancleHander(){//取消按钮
            this.dialogFormVisible =false;
            this.editType="";
            for(var i in this.query){
                this.query[i]="";
            }
        },
        submitHander(){
            console.log(this.query);
            if(this.editType == "a"){
                this.submitClassAData();
            }else{
                this.submitClassBData();
            }
          
        }

    },
}
</script>
<style>
.kindsMge {
    font-size:14px;
}
.kindsMge .cont{
    display: flex;
    justify-content: column;
    background:#fff;
    padding:20px 0px;
}
.kindsMge .levelA{
    width:50%;
    border-right:1px solid #ececec;
    text-align: right;
}
.kindsMge .levelB{
    width:50%;
    text-align: right; 
}
.kindsMge .levelAItem{
    width:90%;
    height:48px;
    display: flex;
    align-items: center;
    border:1px solid #ececec;
    border-top:none;
    padding:0 10px;
    justify-content: space-between;
    margin:0 5%;
}
.kindsMge .levelAItem:hover{
    background:#f5f7fa;
}
.kindsMge .levelAItem:first-of-type{
    border-top:1px solid #ececec;
}
.kindsMge .classAtitle{
    width:35%;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
   font-weight: bold;
   text-align: center;
}
.kindsMge .pad{
    padding:10px 6px;
    cursor: pointer;
}
.kindsMge .addBtn{
    margin-bottom:20px;
    margin-right:5%;
}
.kindsMge .activeBg{
    background:#f5f7fa;
}
.kindsMge .addLevelBBtn{
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    text-align: center;
}
.kindsMge .addLevelBBtn i{
    font-size:28px;
    color:#8c939d;
}
.kindsMge .kindImg{
    width: 148px;
    height: 148px;
    border-radius: 6px;
}
.kindsMge .levelBcont{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin:0 5%;
    align-items: center;
}
.kindsMge .operBtn{
    height:30px;
    line-height: 30px;
}
.kindsMge .pad5{
    padding:5px 6px;
    cursor: pointer;
}
.kindsMge .levelBTitle{
    padding:10px 0;
    font-size:16px;
    overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
}
.kindsMge .flxCenter{
    display: flex;
    align-items: center;
}
.kindsMge .w50{
    width:50%;
}
</style>
