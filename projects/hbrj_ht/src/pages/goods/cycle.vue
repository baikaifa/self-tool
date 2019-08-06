<template>
    <div class="cyclePage">
        <!-- 头部切换tab -->
        <goodsTab :activeTab="activeTab"/>
        <!-- 搜索框 -->
        <section class="searchPanel">
            <div class="searchItem">
                <div class="searchLabel">商品Id：</div>
                <el-input v-model="searchQuery.itemId" clearable placeholder="请输入账号名/昵称进行搜索" class="searchInput"></el-input>
            </div>
            <div class="searchItem">
                <div class="searchLabel">放置时间：</div>
                <el-date-picker class="searchInput"
                    :editable="false"
                    value-format="yyyy-MM-dd"
                    clearable
                    v-model="searchQuery.deleteTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            
            <el-button class="searchBtn" @click="getDeleteList" type="primary">查询</el-button>
        </section>
        <section class="cycleTableCotain">
            <div class="btnsList textL mb ">
                <span class="pr20">将选中的商品:</span>
                <el-button @click="revertMultiGoods" type="primary" class="btnPf">批量还原</el-button>

                <el-button @click="deleteMultiGoods" type="primary" class="btnPf">批量删除</el-button>
            </div>
            <div class="tableContain">
                <el-table
                @selection-change="selectionChange"
                :data="tableData"
                border
                width="100%">
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column
                    align="center"
                    type="index"
                    label="序号"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    v-for="item in tableItem"
                    align="center"
                    :prop="item.prop"
                    :label="item.label">
                    </el-table-column>
                     <el-table-column
                    prop="roleId"
                    align="center"
                    label="操作">
                        <template slot-scope="scope">
                          <div>
                            <el-link @click="revertGoods(scope.$index, scope.row)" type="primary">还原</el-link>
                          </div>
                          <div>
                            <el-link @click="deleteGoods(scope.$index, scope.row)" type="danger">删除</el-link>

                          </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paginationContain">
                <el-pagination
                ref="pagination"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                class="pageFlag"
                @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </section>
    </div>
</template>
<script>
import {deleteList,revertGoods,deleteCycleGoods} from "@/api/index"
import goodsTab from "@/components/goodsTab"
export default {
    data(){
        return {
            activeTab:'cycle',
            pageSize:5,
            pageNo:1,
            total:0,
            searchQuery:{
                "itemId":"",
                "deleteTime":""
            },
            tableData:[],
            itemIdAry:[],
            tableItem:[
                {
                    "label":'商品ID',
                    "prop":'itemId'
                },
                {
                    "label":'商品名称',
                    "prop":'title'
                },
                {
                    "label":' 所属类目',
                    "prop":'catName'
                },
                {
                    "label":'店铺名称',
                    "prop":'shopTitle'
                },
                {
                    "label":'商品价格',
                    "prop":'reservePrice'
                },
                {
                    "label":'佣金金额',
                    "prop":'commissionRate'
                },
                {
                    "label":'放置时间',
                    "prop":'updateTimeStr'
                },
                {
                    "label":'备注',
                    "prop":'deleteDesc'
                }
            ]
        }
    },
    components:{
        goodsTab
    },
    created(){
        this.getDeleteList();
    },
    methods:{
        getDeleteList(){
            var _this=this;
            _this.tableData=[];
            var param={
                pageIndex:_this.pageNo,
                pageSize:_this.pageSize
            };
            for(var i in _this.searchQuery){
                if(_this.searchQuery[i]){
                    param[i]=_this.searchQuery[i];
                }
            }
            deleteList(param).then(function(res){
                if(res.code==200){
                    var data=res.data;
                    var list=res.data.list;
                    _this.total=data.totalCount;
                    _this.$refs.pagination.total=_this.total;

                    for(var i=0;i<list.length;i++){
                        var itemObj={};
                        for(var j=0;j<_this.tableItem.length;j++){
                            var prop=_this.tableItem[j].prop;


                            itemObj[prop]=list[i][prop];
                        }
                        _this.tableData.push(itemObj);
                    }

                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        revertGoods(index,row){
            var _this=this;
            var itemId=row.itemId;
            revertGoods({"itemIds":itemId}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '商品已还原',
                        type: 'success',
                        onClose:_this.getDeleteList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
        },
        deleteGoods(index,row){
            var _this=this;
            var itemId=row.itemId;
            deleteCycleGoods({"itemIds":itemId}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '商品已删除',
                        type: 'success',
                        onClose:_this.getDeleteList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
        },
        revertMultiGoods(){
            var _this=this;
            if(_this.itemIdAry.length<=0){
                _this.$message.error("没有选中的商品");
                return;
            }
            revertGoods({"itemIds":_this.itemIdAry.join(",")}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '商品已还原',
                        type: 'success',
                        onClose:_this.getDeleteList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
        },
        deleteMultiGoods(){
            var _this=this;
            if(_this.itemIdAry.length<=0){
                _this.$message.error("没有选中的商品");
                return;
            }
            deleteCycleGoods({"itemIds":_this.itemIdAry.join(",")}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '商品已删除',
                        type: 'success',
                        onClose:_this.getDeleteList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
        },
        handleCurrentChange(val){
            this.pageNo=val;
            this.getDeleteList();
        },
        selectionChange(selections){
            this.itemIdAry=[];
            for(var i=0;i<selections.length;i++){
                this.itemIdAry.push(selections[i].itemId);
            }
        }
    }
}
</script>
<style>
    .cyclePage .searchPanel{
        height: 100px;
        font-size: 14px;
        background: #fff;
       
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .cyclePage .searchPanel .searchItem{
        display: flex;
        margin-left: 30px;
    }

    .cyclePage .searchPanel .searchItem .searchLabel{
        width: 100px;
        text-align: right;
        height: 32px;
        line-height: 32px;
    }
    .cyclePage .searchPanel .searchItem  .searchInput{
        
        margin-left: 20px;
        max-width: 220px;
    }
    .cyclePage .searchPanel .searchBtn{
            margin: 0 50px;
            width: 126px;
            height: 32px;
            line-height: 0;
    }

    .cyclePage .cycleTableCotain{
        margin-top:20px;
        background: #fff;
        

    }

    .cyclePage .btnsList {
        padding:0 40px;
        padding-top:20px;
    }

    .cyclePage .cycleTableCotain .tableContain{padding: 0 40px;}

    .cyclePage .paginationContain{padding: 20px 0;}
    .cyclePage .btnPf{
     margin-left: 30px;
    }





</style>
