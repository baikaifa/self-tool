<template>
    <section class="rolePage">
        
        <nav class="nav">| 角色管理</nav>
        <section class="searchPanel">
            <div class="searchItem">
                <div class="searchLabel">角色名称：</div>
                <el-input v-model="searchRoleName" class="searchInput"></el-input>
            </div>
            <div class="searchItem">
                <div class="searchLabel">角色状态：</div>
<!--                <el-input class="searchInput"></el-input>-->
              <el-select v-model="status" placeholder="请选择">
                <el-option v-for="item in option"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>


              </el-select>

            </div>
            <el-button class="searchBtn" type="primary" @click="queryRoleList">查询</el-button>
        </section>
        <section class="roleTableCotain">
            <div class="tableTitle">
                <div class="tableTitle_txt">角色列表</div>
                <el-button class="btn_addNewRole" @click="addNewRolePopShow" type="primary">新增角色</el-button>
            </div>
            <div class="tableContain">
                <el-table
                
                :data="tableData"
                border
                style="width: 100%">
                    <el-table-column
                    align="center"
                    prop="num"
                    label="序号"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="roleName"
                    label="用户角色"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="roleStatu"
                    label="用户状态">
                    </el-table-column>
                    <el-table-column
                    prop="roleId"
                    align="center"
                    label="操作">
                        <template slot-scope="scope">
                            <el-link @click="editRole(scope.$index, scope.row)" type="primary">编辑</el-link>
                            <el-link @click="deleteRole(scope.$index, scope.row)" style="margin-left:20px;" type="danger">删除</el-link>
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
        
        <el-dialog :show-close="false" :title="popTitle" :modal-append-to-body="false" :visible.sync="dialogFormVisible">
            <div class="roleNameContain">
                <div class="lableDiv"><span style="color:red;">*</span>角色名称：</div>
                <div class="eleDiv">
                    <el-input class="roleNameInput" v-model="roleInfo.roleName" clearable></el-input>
                </div>
            </div>
            <div class="errorContain" v-show="showError">
                <div class="lableDiv"></div>
                <div class="eleDiv">
                    <div class="errorNotice">{{errorNotice}}</div>
                </div>
            </div>
            <div class="roleStatusContain">
                <div class="lableDiv">角色状态：</div>
                <div class="eleDiv">
                    <el-switch v-model="roleStatus" active-color="#409eff" inactive-color="#dcdfe6"></el-switch>
                </div>
            </div>
            <div class="ruleContain">
                <div class="lableDiv">关联权限：</div>
                <div class="eleDiv">
                    <el-tree
                    ref="tree"
                    :data="permissionList"
                    show-checkbox
                    node-key="id"
                    :default-expanded-keys='permissionAry'
                    :default-checked-keys='permissionAry'
                    @check="permissionCheckChange"
                    :props="permissionProps">
                    </el-tree>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleAddRole">取 消</el-button>
                <el-button type="primary" @click="submitRole">保 存</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>

import {roleList,deleteRole,permissionProps,getRoleDetail,addRole,updateRole} from "@/api/index"

export default {
    data(){
        return{
          status:'',
            pageNo:1,
            pageSize:8,
            total:0,
            roleList:[],
            roleStatus:false,
            dialogFormVisible:false,
            permissionAry:[],
            popTitle:"新增角色",
            errorNotice:"",
            showError:false,
            roleInfo:{
                "roleId":"",
                "roleName":"",
                "status":0,
                "permissionIds":''
            },
            searchRoleName:"",
            permissionList:[],
            permissionProps: {
                children: 'subNav',
                label: 'name'
            },
            tableData: [],
            roleDialogType:"" ,
      // add edit，
          option:[{
            value:'',
            label:'全部',

          },
            {
              value:'0',
              label:'启用',

            },
            {
              value:'1',
              label:'禁用'

            }]
        }
    },

    created(){
        this.getRoleList();
        this.getPermissionList();
    },
    methods:{
        getRoleList(){ // 获取角色列表
            var _this=this;
            _this.tableData=[];
            let param={
                name:_this.searchRoleName,
               status:_this.status,
                pageNo:_this.pageNo,
                pageSize:_this.pageSize

            };
            
            roleList(param).then(function(res){
                if(res.code==200){
                   var data=res.data;
                   var list=data.list;
                   _this.total=data.totalCount;
                   _this.$refs.pagination.total=_this.total;
            
                   for(var i=0;i<list.length;i++){
                       var item=list[i];
                       var itemObj={};
                       itemObj['num']=i+1;
                       itemObj['roleName']=item.roleName;
                       itemObj['roleStatu']=item.status==1?"启用":"禁用";
                       itemObj['roleId']=item.roleId;
                       
                       _this.tableData.push(itemObj);
                   }
                }else{
                    _this.$message.error(res.msg);
                }
            });
            
        },
        getPermissionList(){ // 读取角色权限列表
            var _this=this;
            permissionProps().then(function(res){
                if(res.code==200){
                    _this.permissionList=res.data;
                }else{
                    _this.$message.error(res.msg);
                }
            })
        },
        handleCurrentChange(val){ // 点击分页
            this.pageNo=val;
            this.getRoleList();
        },
        addNewRolePopShow(){ // 点击添加按钮
            this.roleDialogType="add";
            this.dialogFormVisible=true;
        },
        editRole(index,rowObj){ // 点击编辑按钮
            var _this=this;
            var roleId=rowObj.roleId;
            this.roleDialogType="edit";
            _this.dialogFormVisible=true;
            getRoleDetail({"roleId":roleId}).then(function(res){
                if(res.code==200){
                    var data=res.data;
                    
                    _this.roleInfo.roleId=data.roleId;
                    _this.roleInfo.roleName=data.roleName;
                    _this.roleInfo.status=data.status;
                    _this.roleStatus= _this.roleInfo.status==1?true:false;
                    
                    _this.roleInfo.permissionIds='8,13,15';
                    var permissionIdAry=_this.roleInfo.permissionIds.split(",");
                    _this.permissionAry=permissionIdAry;
                    //_this.$refs.tree.setCheckedKeys(permissionIdAry);
                }else{
                    _this.dialogFormVisible=false;
                    _this.$message.error(res.msg);
                }
            });
        },
        deleteRole(index,rowObj){ // 删除角色
            var _this=this;
            var roleId=rowObj.roleId;
            deleteRole({"roleIds":roleId}).then(function(res){
                if(res.code==200){
                     _this.$message({
                        message: '删除成功',
                        type: 'success',
                        onClose:_this.getRoleList,
                        duration:1000
                     });
                     
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        permissionCheckChange(){ // 权限的选中与取消选中事件
            var checkedKeysAry=this.$refs.tree.getCheckedKeys(true);
            this.roleInfo.permissionIds=checkedKeysAry.join(",");
        },
        cancleAddRole(){ // 取消按钮
            this.dialogHideAndClean();
        },
        submitRole(){ // 保存按钮
            var _this=this;
            if(this.roleStatus){
                this.roleInfo.status=1;
            }else{
                this.roleInfo.status=0;
            }
            var param=this.roleInfo;
            if(this.roleDialogType=="add"){
                
                delete param.roleId;
                addRole(param).then(function(res){
                    if(res.code==200){
                        _this.$message({
                            message: '添加成功',
                            type: 'success',
                            onClose:_this.submitRoleSuccessHandle,
                            duration:1000
                        });
                    }else{
                        _this.$message.error(res.msg);
                    }
                });
            }else{
                updateRole(param).then(function(res){
                    if(res.code==200){
                        _this.$message({
                            message: '角色编辑完成',
                            type: 'success',
                            onClose:_this.submitRoleSuccessHandle,
                            duration:1000
                        });
                    }else{
                        _this.$message.error(res.msg);
                    }
                });
            }
            
        },
        submitRoleSuccessHandle(){ // 角色添加成功的回调
            this.dialogHideAndClean();
            this.getRoleList();
        },
        dialogHideAndClean(){ // 关闭弹框，清空数据
            this.dialogFormVisible=false;
            this.$refs.tree.setCheckedKeys([]);
            this.roleStatus=false;
            this.showError=false;
            this.roleDialogType="";
            this.permissionAry=[];
            this.errorNotice="";
            this.roleInfo={
                "roleId":0,
                "roleName":"",
                "status":0,
                "permissionIds":""
            }
            for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){ // 收起树形结构所有节点
                this.$refs.tree.store._getAllNodes()[i].expanded=false;
            }
        },
        queryRoleList(){


          this.getRoleList();




        }
    }
   
}
</script>
<style>
    .rolePage{height: 100%;position: relative;}
    
    .rolePage .searchPanel{
        height: 100px;
        font-size: 14px;
        background: #fff;
       
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .rolePage .searchPanel .searchItem{
        display: flex;
        margin-left: 50px;
    }

    .rolePage .searchPanel .searchItem .searchLabel{
        width: 100px;
        text-align: right;
        height: 32px;
        line-height: 32px;
    }
    .rolePage .searchPanel .searchItem  .searchInput{
        
        margin-left: 20px;
        max-width: 220px;
    }
    .rolePage .searchPanel .searchBtn{
            margin: 0 50px;
            width: 126px;
            height: 32px;
            line-height: 0px;
    }

    .rolePage .roleTableCotain{
        margin-top:20px;
        background: #fff;
        

    }

    .rolePage .roleTableCotain .tableTitle{
        height: 76px;
        line-height: 76px;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 900px;
    }

    
    .rolePage .roleTableCotain .tableTitle .btn_addNewRole{height: 32px;line-height: 0;}

    .rolePage .roleTableCotain .tableContain{max-width: 900px;padding: 0 40px;}

    .rolePage .paginationContain{max-width: 900px;padding: 20px 0;}
    
    .rolePage .el-dialog__wrapper{position: absolute;}
    .rolePage .v-modal{position: absolute;}
    .rolePage .el-dialog__header{
            background: #f5f7fa;
            text-align: left;
            padding-left: 30px;
        }
    .rolePage .el-dialog__footer{
        text-align: center;
    }
    .rolePage .roleNameContain,.rolePage .roleStatusContain{
        display: flex;
        height: 50px;
        line-height: 50px;
    }
    .rolePage .lableDiv{
        width: 80px;
        text-align: right;   
        font-size: 14px;
        
    }
    .rolePage .eleDiv{
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 10px;
    }
    .rolePage .eleDiv .roleNameInput{
        width: 60%;
    }
    .rolePage .errorNotice{
        color: red;
        font-size: 14px;
    }

    .rolePage .errorContain{
        display: flex;
    }

    .rolePage .ruleContain{
        display: flex;
    }
    
</style>


