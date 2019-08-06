<template>
    <section class="logPage">
        
        <nav class="nav">| 日志列表</nav>
        <section class="searchPanel">
            <div class="searchItem">
                <div class="searchLabel">操作模块：</div>
                <el-select class="searchInput" v-model="operaModule" clearable placeholder="请选择">
                    <el-option
                        v-for="item in moduleList"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="searchItem">
                <div class="searchLabel">操作时间：</div>
                <el-date-picker class="searchInput"
                    :editable="false"
                    value-format="yyyy-MM-dd"
                    clearable
                    v-model="operationTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="searchItem">
                
                <el-input v-model="username" clearable placeholder="请输入账号名/昵称进行搜索" class="searchInfoInput"></el-input>
            </div>
            <el-button class="searchBtn" @click="getOperateList" type="primary">查询</el-button>
        </section>
        <section class="roleTableCotain">
            <div class="tableTitle">
                <div class="tableTitle_txt">日志列表</div>
               
            </div>
            <div class="tableContain">
                <el-table
                :data="tableData"
                border
                style="width: 100%">
                    <el-table-column
                    align="center"
                    prop="username"
                    label="操作人"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="operateTime"
                    label="操作时间"
                    width="250">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="operateModule"
                    label="操作模块"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    
                    prop="operateDesc"
                    label="操作内容">
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
        
        
    </section>
</template>
<script>

import {operateLogList} from "@/api/index"

export default {
    data(){
        return{
            pageNo:1,
            pageSize:20,
            total:0,
            operaModule:"",// 操作模块
            operationTime:"",// 操作时间
            username:"",// 操作人
            tableData: [],
            moduleList:["商品管理","运营管理","订单管理","数据管理","信息管理","财务管理","设置"]
        }
    },
    created(){
        this.getOperateList();
    },
    methods:{
        getOperateList(){
            var _this=this;
            _this.tableData=[];
            let param={
                pageNo:_this.pageNo,
                pageSize:_this.pageSize,
                operaModule:_this.operaModule,
                operationTime:_this.operationTime,
                username:_this.username
            };
            operateLogList(param).then(function(res){
                if(res.code==200){
                    var data=res.data;
                    _this.tableData=res.data.list.slice(0);
                    console.log(res.list)
                    _this.total=data.totalCount;
                   _this.$refs.pagination.total=_this.total;
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        handleCurrentChange(val){ // 点击分页
            this.pageNo=val;
            this.getOperateList();
        },
    }
   
}
</script>
<style>
    .logPage{height: 100%;position: relative;}
    
    .logPage .searchPanel{
        height: 100px;
        font-size: 14px;
        background: #fff;
       
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .logPage .searchPanel .searchItem{
        display: flex;
        margin-left: 30px;
    }

    .logPage .searchPanel .searchItem .searchLabel{
        width: 100px;
        text-align: right;
        height: 32px;
        line-height: 32px;
    }
    .logPage .searchPanel .searchItem  .searchInput{
        
        margin-left: 20px;
        max-width: 220px;
    }
     .logPage .searchPanel .searchItem  .searchInfoInput{
        
        margin-left: 20px;
        max-width: 300px;
    }
    .logPage .searchPanel .searchItem .el-input__icon{
        line-height: 0;
    }
    .logPage .searchPanel .searchBtn{
            margin: 0 50px;
            width: 126px;
            height: 32px;
            line-height: 0px;
    }

    .logPage .roleTableCotain{
        margin-top:20px;
        background: #fff;
        

    }

    .logPage .roleTableCotain .tableTitle{
        height: 76px;
        line-height: 76px;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
       
    }

    
    .logPage .roleTableCotain .tableTitle .btn_addNewRole{height: 32px;line-height: 0;}

    .logPage .roleTableCotain .tableContain{padding: 0 40px;}

    .logPage .paginationContain{padding: 20px 0;}
    
    .logPage .el-dialog__wrapper{position: absolute;}
    .logPage .v-modal{position: absolute;}
    .logPage .el-dialog__header{
            background: #f5f7fa;
            text-align: left;
            padding-left: 30px;
        }
    .logPage .el-dialog__footer{
        text-align: center;
    }
    .logPage .roleNameContain,.logPage .roleStatusContain{
        display: flex;
        height: 50px;
        line-height: 50px;
    }
    .logPage .lableDiv{
        width: 80px;
        text-align: right;   
        font-size: 14px;
        
    }
    .logPage .eleDiv{
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 10px;
    }
    .logPage .eleDiv .roleNameInput{
        width: 60%;
    }
    .logPage .errorNotice{
        color: red;
        font-size: 14px;
    }

    .logPage .errorContain{
        display: flex;
    }

    .logPage .ruleContain{
        display: flex;
    }
    
</style>


