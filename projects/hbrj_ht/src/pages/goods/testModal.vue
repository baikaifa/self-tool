<template>
    <div class="testModal">
        <el-button type="primary" @click="accountActionHandler('add')">新建账户</el-button>
        <el-button type="success" @click="accountActionHandler('edit')">编辑</el-button>
        <el-button type="info" @click="accountActionHandler('pwd')">重置密码</el-button>
        <!-- 弹框 -->
        <el-dialog :title="modalTitle" :visible.sync="dialogAccountVisible" class="accountModalWrap" @close="closedHandler" center>
            <el-form :model="accountData" @submit.native.prevent>
                <el-form-item label="用户名：" :label-width="formLabelWidth" class="is-required">
                    <el-input v-model="accountData.userName" auto-complete="off" :disabled="modalType == 'edit' || modalType == 'pwd'"></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth" class="is-required" v-show="modalType !== 'edit'">
                    <el-input v-model="accountData.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色：" :label-width="formLabelWidth" class="is-required">
                    <el-select v-model="roleId" placeholder="请选择角色" :disabled="modalType == 'pwd'">
                        <el-option
                            v-for="item in roleOptions"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="启用状态：" :label-width="formLabelWidth" class="is-required">
                    <el-switch v-model="accountData.status" active-value="0" inactive-value="1" :disabled="modalType == 'pwd'"> </el-switch>
                </el-form-item>
                <el-form-item label="运营城市：" :label-width="formLabelWidth">
                    <el-radio-group v-model="cityType" :disabled="modalType == 'pwd'">
                        <el-radio label="全国"></el-radio>
                        <el-radio label="城市"></el-radio>
                    </el-radio-group>
                    <el-select v-model="accountData.city" placeholder="请选择" :disabled="modalType == 'pwd'">
                        <el-option
                            v-for="item in cityOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelHandler">取 消</el-button>
                <el-button type="primary" @click="saveAccountHandler">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
import {addAccount,roleList,editAccount,resetPwd} from "@/api/index.js"
export default {
    data(){
        return {
            dialogAccountVisible: false,
            accountData: {
                userName: '',
                password: '',
                status: "0",//默认开启
                city: '',
            },
            roleId:'',
            formLabelWidth: '120px',
            modalTitle: '新增账户',
            modalType: '',
            cityType: '全国',
            cityOptions: [
                {
                    name: '北京',
                    value: 'beijing'
                }
            ],
            roleOptions: []
        }
    },
    created() {
        this.getRoleList();
    },
    methods: {
        getRoleList() {
            var params = {
                pageNo: 1,
                pageSize: 100
            }
            roleList(params).then((data) =>{
                if(data.code == 200) {
                    this.roleOptions = data.data.list;
                } else {
                    this.$message({
                        type:'warning',
                        message:"msg"
                    })
                }
            }) 
        },
        accountActionHandler(type,row) {
            this.modalType = type;
            if(type == 'add') {
                this.modalTitle = "新增账户"
            } else if(type == 'edit') {
                this.modalTitle = "编辑账户"
                // 编辑数据赋值(表格单条数据)
                this.accountData = row;
            } else {
                this.modalTitle = "重置密码"
            }
            this.dialogAccountVisible = true;
        },
        // 弹窗关闭时数值全部重置
        closedHandler() {
            this.dialogAccountVisible = false;
            this.modalTitle = '';
            this.modalType = '';
            this.accountData = {
                userName: '',
                password: '',
                status: "0",//默认开启
                city: '',
            }
            this.cityType = '全国';
            this.roleId = '';
        },
        cancelHandler() {
            this.dialogAccountVisible = false;
        },
        saveAccountHandler() {
            if(!this.accountData.userName || !this.accountData.password || !this.roleId ) {
                this.$message({
                    type:'warning',
                    message:"必选项不能为空"
                })
                return;
            }
            
            let addData = {};
            addData.roleId = this.roleId;
            if(this.modalType == 'add') {
                addData.params = JSON.stringify([].concat(this.accountData));
                addAccount(addData).then((data) =>{
                    if(data.code == 200) {
                        this.closedHandler();
                    } else {
                        this.$message({
                            type:'warning',
                            message:"msg"
                        })
                    }
                }) 
            } else if(this.modalType == 'edit') {
                // 编辑
                let editData = {};
                editAccount(editData).then((data)=>{
                    if(data.code == 200) {
                        this.closedHandler();
                    } else {
                        this.$message({
                            type:'warning',
                            message:"msg"
                        })
                    }
                })
            } else {
                // 重置密码
                let pwdData = {};
                resetPwd().then((data)=>{
                    if(data.code == 200) {
                        this.closedHandler();
                    } else {
                        this.$message({
                            type:'warning',
                            message:"msg"
                        })
                    }
                })
            }
        }
    },
    components:{
    }
}
</script>
<style>
.accountModalWrap .el-form {
    width: 460px;
}
.accountModalWrap .el-form .el-input__inner {
    height: 40px;
    line-height: 40px;
}
.accountModalWrap .el-form .el-select .el-input {
    width: 340px;
}
.accountModalWrap .el-form .el-switch {
    width: 340px;
}
.accountModalWrap .el-form .el-radio-group {
    width: 340px;
    text-align: left;
}
</style>
