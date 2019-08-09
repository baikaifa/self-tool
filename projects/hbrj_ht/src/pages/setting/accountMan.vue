<template>
    <div class="accountMan">
        <nav class="nav">
            <span class="blue">| </span>账户管理
            <el-button type="primary" @click="accountActionHandler('add')" class="btns addBtn pull-right">新增账户</el-button>
        </nav>
        <div class="accountSearchWrap">
            <el-form :inline="true" :model="searchData" class="searchFormInline">
                <el-form-item label="账号名称">
                    <el-input v-model="searchData.username" class="mxWidth" placeholder="请输入账号名称"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-select v-model="searchData.roleId" placeholder="全部">
                      <el-option v-model="allUserid" :label="allUser"></el-option>

                      <el-option
                        v-for="item in roles"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号状态">
                    <el-select v-model="searchData.status" placeholder="全部">
                      <el-option v-model="allUserid" :label="allUser"></el-option>
                      <el-option
                        v-for="item in state"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryData" class="queryBtn btns">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 查询区域 -->
        <!-- <div class="queryCont mb">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="fx">
                        <label class="w100">账号名称</label>
                        <el-input v-model="searchData.userName" class="mxWidth"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="fx">
                        <label class="w100">用户角色</label>
                        <el-select v-model="searchData.roleId" placeholder="请选择">
                            <el-option
                            v-for="item in roles"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="fx">
                        <label class="w100">账号状态</label>
                        <el-select v-model="searchData.status" placeholder="请选择">
                            <el-option
                            v-for="item in state"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="queryData" class="queryBtn btns">查询</el-button>
                </el-col>
            </el-row>
        </div> -->
        <!-- 列表区域 -->
        <div class="accountList">
            <p class="tableTitle">账户列表</p>
            <el-table border height="400px" :data="tableData">
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column type="index" width="55" label="序号" align="center" :index="indexMethod">

                </el-table-column>
                <el-table-column v-for="(item,index) in columns" :key="index" :label="item.label" :prop="item.prop" align="center" :width="item.width"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div class="blueText tableAction" @click="editHandle(scope.row)">编辑</div>
                        <div class="redText tableAction" @click="removeHandle(scope.row)"> <span class="cutLine">|</span> 删除 <span class="cutLine">|</span> </div>
                        <div class="orText tableAction" @click="resetPwd(scope.row)">重置密码</div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pageFlag"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pager.currentPage"
                :page-size="pager.pageSize"
                layout="total,prev, pager, next,jumper,sizes"
                :total="pager.total">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="modalTitle" :visible.sync="dialogAccountVisible" class="accountModalWrap" @close="closedHandler" center>
            <el-form :model="accountData" @submit.native.prevent ref="accountRulesForm" :validate-on-rule-change="false">
                <el-form-item label="用户名：" :label-width="formLabelWidth" class="is-required">
                    <el-input v-model="accountData.userName" auto-complete="off" :disabled="modalType == 'edit' || modalType == 'pwd'" @input="checkInputVal('userName')"></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth" class="is-required" v-show="modalType !== 'edit'">
                    <el-input v-model="accountData.password" auto-complete="off"  @input="checkInputVal('password')"></el-input>
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
                <el-form-item label="运营城市：" :label-width="formLabelWidth" prop="city" class="is-required">
                    <el-radio-group v-model="cityType" :disabled="modalType == 'pwd'" @change="cityTypeHandler">
                        <el-radio label="全国"></el-radio>
                        <el-radio label="城市"></el-radio>
                    </el-radio-group>
                    <!-- <el-select v-model="accountData.city" placeholder="请选择" :disabled="modalType == 'pwd'" v-show="cityType == '全国'">
                        <el-option
                            v-for="(item,index) in cityOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select> -->
                    <!-- 地区级联框 -->
                    <div class="selectedCityWrap" v-show="cityType == '城市'">
                        <el-tag
                            :key="index"
                            v-for="(city,index) in selectedCityArr"
                            closable
                            :disable-transitions="false"
                            @close="handleCityClose(city)">
                            {{city}}
                        </el-tag>
                    </div>
                    <div class="regionWrap" v-show="cityType == '城市'">
                        <el-cascader
                            ref="cityCascader"
                            :options="regionData"
                            v-model="selectedCity"
                            @change="handleCityChange">
                        </el-cascader>
                        <el-button class="addCityBtn" @click="citySelectFocus">继续添加</el-button>
                    </div>
                   
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
import {roleList,userList,addAccount,editAccount,resetPwd,deleteUser} from "@/api/index.js"
import {TextToCode,CodeToText} from 'element-china-area-data'
// import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import {provinceData,regionData} from "@/components/cityData.js"

export default {
    data(){
        return {
            searchData: {
                username:'',
                roleId: '',
                status: ''
            },
            pager: {
                pageNo: 1,
                pageSize: 10,
                total: 0,
                currentPage: 1
            },
            getRoleData: {
                pageNo: 1,
                pageSize: 100,
            },
            tableData: [],
            roles: [],
            state: [
                {
                    label: '启用',
                    value: 0
                },
                {
                    label: '禁用',
                    value: 1
                },
            ],
            columns: [
                {
                    label: '账号名称',
                    prop: 'userName'
                },
                {
                    label: '用户角色',
                    prop: 'roleName',
                    width: 150
                },
                {
                    label: '所属城市',
                    prop: 'city'
                },
                {
                    label: '创建时间',
                    prop: 'createTimeStr'
                },
                {
                    label: '账户状态',
                    prop: 'statusStr',
                    width: 120
                },
                {
                    label: '最新登录时间',
                    prop: 'updateTimeStr'
                }
            ],
            dialogAccountVisible: false,
            accountData: {
                userName: '',
                password: '',
                status: "0",//默认开启
                city: '',
            },
            allUser:'全部',
            allUserid:'',

            roleId:'',
            formLabelWidth: '120px',
            modalTitle: '新增账户',
            modalType: '',
            cityType: '全国',
            cityOptions: provinceData,
            regionData: regionData,
            roleOptions: [],
            selectedCity: [],
            selectedCityArr: [],//已选中的城市
            // accountRules: {
            //     city: [
            //         { validator: validateCity, trigger: ['blur','change'] }
            //     ],
            // }
        }
    },
    created() {
        this.getRoleList();
        this.getUserList();
    },
    methods: {
      handleSizeChange(val) {
        this.pager.pageSize=val;
        this.getUserList();
      },
        getRoleList() {
            let params = this.getRoleData;
            roleList(params).then((data) =>{
                if(data.code == 200) {
                    this.roles = data.data.list;
                    this.roleOptions = data.data.list;


                  var list=data.data.list;
                  var i=0
                  while (this.roleOptions[i]){
                    if(list[i].status==0){
                      list.splice(i,1);

                    }
                    else {

                      i++;
                    }

                  }
                  console.log(list)




                } else {
                    this.$message({
                        type:'warning',
                        message:data.msg
                    })
                }
            }) 
        },
        getUserList() {
            let params = {
                roleId: this.searchData.roleId,
                status: this.searchData.status,
            };
            if(this.searchData.username) {
                params.username = this.searchData.username;
            }

            params.pageNo = this.pager.currentPage;
            params.pageSize = this.pager.pageSize;
            userList(params).then((data) =>{
                if(data.code == 200) {

                    var list=data.data.list;


                  for (var i=0;i<list.length;i++){

                    if(list[i].statusStr=='正常'){

                      list[i].statusStr='启用'

                    }
                  }

                  this.tableData=list;

                    this.pager.pageNo = data.data.pageIndex;
                    this.pager.total = data.data.totalCount;
                } else {
                    this.$message({
                        type:'warning',
                        message:data.msg
                    })
                }
            }) 
        },
        // 点击城市继续添加
        citySelectFocus() {
            this.$refs.cityCascader.$refs.reference.click();
        },
        handleCityClose(city) {
            this.selectedCityArr.splice(this.selectedCityArr.indexOf(city), 1);
        },
        handleCurrentChange(val) {
            this.pager.currentPage = val;
            this.getUserList();
        },
        cityTypeHandler(value) {
            this.accountData.city = '';
            this.selectedCity = [];
        },
        handleCityChange(value) {
            var currentCity = this.transSelectedVal();
            this.selectedCity = [];
            if(this.selectedCityArr.length >= 9) {
                this.$message({
                    message: '最多选择不超过9个城市',
                    type: 'warning'
                });
                return;
            }
            
            if(this.selectedCityArr.indexOf(currentCity) < 0) {
                this.selectedCityArr.push(currentCity);
            } else {
                this.$message({
                    message: '该城市已存在请重新选择',
                    type: 'warning'
                });
            }
        },
        transSelectedVal() {
            if(this.selectedCity.length > 0) {
                let one = this.selectedCity[0] ? CodeToText[this.selectedCity[0]] : "";
                let two = this.selectedCity[1] ? CodeToText[this.selectedCity[1]] : "";
                let three = this.selectedCity[2] ? CodeToText[this.selectedCity[2]] : "";
                let str = one+'/'+two;
                if(three) {
                    str += '/'+three
                }
                return str;
            }
        },
        queryData(){//查询数据
            this.pager.currentPage = 1;
            this.getUserList();
        },
        editHandle(row){
            this.accountActionHandler('edit',row);
        },
        removeHandle(row){
            let params = {};
            params.params = JSON.stringify([].concat(row.uid));
            
            deleteUser(params).then((data)=>{
                if(data.code == 200) {
                    this.$message({
                        type:'success',
                        message:"删除成功"
                    })
                    this.getUserList();
                } else {
                    this.$message({
                        type:'warning',
                        message:data.msg
                    })
                }
            })
        },
        resetPwd(row){
            this.accountActionHandler('pwd',row);
        },
        showAccountData(row) {
            this.accountData = JSON.parse(JSON.stringify(row));
            this.roleId = row.roleId == '0' ? '' : row.roleId;
            this.cityType = row.cityType || '全国';
            
            this.accountData.status = this.accountData.status.toString();
            if(this.accountData.city) {
                this.transCityData(this.accountData.city);
            }
        },
        accountActionHandler(type,row) {
            this.modalType = type;
            if(type == 'add') {
                this.modalTitle = "新增账户"
            } else if(type == 'edit') {
                this.modalTitle = "编辑账户"
                // 编辑数据赋值(表格单条数据)
                this.showAccountData(row);
            } else {
                this.modalTitle = "重置密码"
                 this.showAccountData(row);
                // this.accountData = row;
                // this.roleId = row.roleId;
                // this.accountData.status = this.accountData.status.toString();
                // if(this.accountData.city) {
                //     this.transCityData();
                // }
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
            this.selectedCityArr = [];
        },
        cancelHandler() {
            this.dialogAccountVisible = false;
        },
        // 验证表单数据
        checkInputVal(val) {
            // var newRegName = ("^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g");
            var newRegName = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
            var newRegNum = /["^\d]/g;

            if(val == 'userName') {
                if(!newRegName.test(this.accountData.userName)){
                    this.$message({
                        type:'warning',
                        message: "用户名输入有误"
                    })
                    return;
                }

                if(newRegNum.test(this.accountData.userName)){
                    if(this.accountData.userName.length > 11) {
                        this.$message({
                            type:'warning',
                            message: "用户名输入有误"
                        })
                        return;
                    }
                   
                }
            }
            if(val == 'password') {
                if(this.accountData.password.length >= 22) {
                    this.$message({
                        type:'warning',
                        message: "密码长度最大为22位"
                    })
                }
            }
        },
        getCityData() {
            if(this.cityType == "全国") {
                return "全国";
                // return this.accountData.city;
            }
            
            if(this.cityType == "城市") {
                if(this.selectedCityArr.length > 0) {
                    let str = this.selectedCityArr.join(",");
                    return str;
                }
                // if(this.selectedCity.length > 0) {
                //     let one = CodeToText[this.selectedCity[0]];
                //     let two = CodeToText[this.selectedCity[1]];
                //     let three = CodeToText[this.selectedCity[2]];
                //     let str = one+','+two+','+three;
                //     return str;
                // }
            }
            return '';
        },
        transCityData(city) {
            if(this.cityType == "全国") {
                this.accountData.city == city;
            }
            
            if(this.cityType == "城市") {                
                var cityArr = city.split(",");                
                this.selectedCityArr = cityArr;
            }
            // if(this.cityType == "城市") {                
            //     var cityArr = city.split(',');                
            //     let one = TextToCode[cityArr[0]].code;
            //     let two = TextToCode[cityArr[0]][cityArr[1]].code;
            //     let three = TextToCode[cityArr[0]][cityArr[1]][cityArr[2]].code;
            //     this.selectedCity = [one,two,three];
            // }
        },
        saveAccountHandler() {
            if(this.modalType == "add" && !this.accountData.password) {
                this.$message({
                    type:'warning',
                    message:"必选项不能为空"
                })
                return;
            }
            if(!this.accountData.userName || !this.roleId ) {
                this.$message({
                    type:'warning',
                    message:"必选项不能为空"
                })
                return;
            }
            
            let addData = {};
            addData.roleId = this.roleId;
            if(this.modalType == 'add') {
                addData.params = [].concat(this.accountData);
                addData.params[0].city = this.getCityData();
                if(addData.params[0].city == '') {
                    this.$message({
                        type:'warning',
                        message:"城市为必选项"
                    })
                    return;
                }
              var newRegNum = /["^\d]/g;
              var newRegName = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
              if(newRegNum.test(this.accountData.userName)){
                if(this.accountData.userName.length>11) {
                  this.$message({
                    type:'warning',
                    message:"用户名输入有误"
                  })
                  return;
                }

              }
              if(!newRegName.test(this.accountData.userName)){
                this.$message({
                  type:'warning',
                  message: "用户名不可以输入数字，汉字，拼音之外的字的字符"
                })
                return;
              }




              if(this.accountData.password.length>22) {
                this.$message({
                  type:'warning',
                  message:"密码长度不超过22位字符"
                })
                return;
              }
                addData.params[0].cityType = this.cityType;
                addData.params = JSON.stringify(addData.params);
                addAccount(addData).then((data) =>{
                    if(data.code == 200) {
                        this.$message({
                            type:'success',
                            message:"新增账号成功"
                        })
                        this.closedHandler();
                        this.getUserList();
                    } else {
                        this.$message({
                            type:'warning',
                            message:data.msg
                        })
                    }
                }) 
            } else if(this.modalType == 'edit') {
                // 编辑
                let editData = {};
                editData.roleId = this.roleId;
                editData.params = {
                    uid: this.accountData.uid,
                    status: this.accountData.status,
                    cityType: this.cityType,
                    city: this.getCityData(),
                }
                editData.params = JSON.stringify(editData.params);
                editAccount(editData).then((data)=>{
                    if(data.code == 200) {
                        this.$message({
                            type:'success',
                            message:"账号信息修改成功"
                        })
                        this.closedHandler();
                        this.getUserList();
                    } else {
                        this.$message({
                            type:'warning',
                            message:data.msg
                        })
                    }
                })
            } else {
                // 重置密码
              if(this.accountData.password.length>22) {
                this.$message({
                  type:'warning',
                  message:"密码长度不超过22位字符"
                })
                return;
              }
                let pwdData = {};
                pwdData.userId = this.accountData.uid;
                pwdData.password = this.accountData.password;
                resetPwd(pwdData).then((data)=>{
                    if(data.code == 200) {
                        this.$message({
                            type:'success',
                            message:"重置成功"
                        })
                        this.closedHandler();
                        this.getUserList();
                    } else {
                        this.$message({
                            type:'warning',
                            message:data.msg
                        })
                    }
                })
            }
        },
      indexMethod (index) {
        let curpage = this.pager.currentPage     //单前页码，具体看组件取值
        let limitpage = this.pager.pageSize  //每页条数，具体是组件取值
        return (index+1) + (curpage-1)*limitpage
      }

    },
}
</script>
<style>
.accountMan .nav{
	overflow: hidden;
}
.accountMan .pull-right{
	float: right;
}
.accountMan .addBtn{
    margin-top: 8px;
    margin-right: 20px;
}
.accountMan .queryCont{
	height: 96px;
	background-color: #ffffff;
    border-radius: 4px;
    line-height: 96px;
}
.accountMan .mxWidth{
    max-width: 220px;
}
.accountMan .queryBtn{
    width: 130px;
}
.accountMan .btns{
    height: 32px;
    border-radius: 4px;
    font-size:14px;
    line-height: 0.5
}
.accountMan .accountList{
    background: #fff;
    padding: 20px;
}
.accountMan .accountList .tableTitle{
    text-align: left;
    padding-bottom: 20px;
}
.accountMan .accountList .pageFlag{
    padding-top: 20px;
}
.accountMan .accountList .tableAction{
    display: inline-block;
    cursor: pointer;
}
.accountMan .accountList .cutLine{
    color: #e5e5e5;
}
.accountSearchWrap .searchFormInline {
    width: auto;
    text-align: left;
    background: #fff;
    margin-bottom: 20px;
    padding: 20px;
}
.accountSearchWrap .searchFormInline .el-form-item {
    margin-bottom: 0;
    margin-right: 30px;
}
</style>
// 弹窗样式
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
    width: 50px;
}
.accountModalWrap .el-form .el-radio-group {
    width: 340px;
    text-align: left;
}
.accountModalWrap .el-form .selectedCityWrap {
    width: 500px;
    padding-bottom: 10px;
}
.accountModalWrap .el-form .selectedCityWrap .el-tag + .el-tag {
    margin-left: 10px;
}
.accountModalWrap .el-form .regionWrap {
    width: 460px;
}
.accountModalWrap .el-form .el-cascader {
    width: 340px;
}
.accountModalWrap .addCityBtn {
    margin-left: 10px;
}
</style>
