<template>
    <div class="category">
        <!-- 头部切换tab -->
        <goodsTab :activeTab="activeTab"/>
        <!-- 表格 -->
        <div class="tableBox">
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column label="序号" width="50" type="index"></el-table-column>
                <el-table-column label="类目ID" prop="id"></el-table-column>
                <el-table-column label="类目名称" prop="name"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="pad blueText">查看</span>
                        <span class="pad orText" v-if="scope.row.index != 1" @click="toTop(scope.$index, scope.row)">置顶</span>
                        <span class="pad orText" v-if="scope.row.index != tableData.length" @click="toBottom(scope.$index, scope.row)">置底</span>
                        <span class="pad redText" v-if="scope.row.index != 1" @click="moveTop(scope.$index, scope.row)">上移</span>
                        <span class="pad redText"  v-if="scope.row.index != tableData.length" @click="moveDown(scope.$index, scope.row)">下移</span>
                    </template>
                    
                </el-table-column>
              
            </el-table>
        </div>
       
    </div>
</template>
<script>
import goodsTab from "@/components/goodsTab"
import {getCategoryList,sortAdd,sortDecrease,sortTop,sortFoot} from "@/api/index"
export default {
    data(){
        return {
            activeTab:'category',
            tableData:[]
        }
    },
    created(){
        this.getCategoryList();
    },
    methods: {
         getCategoryList(){
            var _this=this;
            _this.tableData=[];
            getCategoryList().then(function(res){
                if(res.code==200){
                    for(var i=0;i<res.data.length;i++){
                        var item=res.data[i];
                        var itemObj={};
                        itemObj.name=item.categoryName;
                        itemObj.id=item.categoryId;
                        _this.tableData.push(itemObj);
                    }
                    
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
       toTop(index,row){//置顶
       var _this=this;
           var categoryId=row.id;
           sortTop({"categoryId":categoryId}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '品类已置顶',
                        type: 'success',
                        onClose:_this.getCategoryList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
       },
       toBottom(index,row){//置底
       var _this=this;
            var categoryId=row.id;
            sortFoot({"categoryId":categoryId}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '品类已置底',
                        type: 'success',
                        onClose:_this.getCategoryList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
       },
       moveTop(index,row){//上移
       var _this=this;
        var categoryId=row.id;
        sortAdd({"categoryId":categoryId}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '品类已上移',
                        type: 'success',
                        onClose:_this.getCategoryList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
       },
        moveDown(index,row){//下移
        var _this=this;
            var categoryId=row.id;
            sortDecrease({"categoryId":categoryId}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '品类已下移',
                        type: 'success',
                        onClose:_this.getCategoryList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
       },
    },
    components:{
        goodsTab
    }
}
</script>
<style>
.category .tableBox{
    width:910px;
}
.category tr th,.category tr td{
    text-align:center;
}
.category .pad{
    padding:10px 6px;
    cursor: pointer;
}
</style>
