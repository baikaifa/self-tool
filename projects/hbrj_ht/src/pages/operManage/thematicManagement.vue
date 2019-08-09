<template>
  <section class="thematicManagement">
    <nav class="nav">专题管理</nav>
    <section class="searchPanel">
      <div class="searchItem">
        <div class="searchLabel">专题名称</div>
        <el-input v-model="list.name" class="searchInput"></el-input>
      </div>

        <div class="searchLabelTime">显示时间</div>
          <el-date-picker type="datetime" class="p10" placeholder="开始时间" v-model="list.startTime" format="yyyy 年 MM 月 dd 日 " value-format="yyyy-MM-dd "></el-date-picker>
        <el-col class="line" :span="1">-</el-col>
        <el-date-picker type="datetime" placeholder="结束时间" v-model="list.endTime" format="yyyy 年 MM 月 dd 日 " value-format="yyyy-MM-dd "></el-date-picker>



      <label class="w100">专题类型</label>
      <el-select placeholder="全部类型"
                 v-model="list.type">
        <el-option
          v-for="item in specialType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </section>
    <section class="searchPanel">
      <div class="searchItem">
        <div class="searchLabel">url链接</div>
        <el-input v-model="list.url" class="searchInput"></el-input>
      </div>

      <label class="w110">专题状态</label>
      <el-select class="rightLittle" placeholder="全部状态"
      v-model="list.status">
        <el-option
          v-for="item in specialStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </section>
    <section class="searchPanelToRight">
      <el-button class="toRight" type="primary"  @click="querySpecialList">&nbsp;&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    </section>
    <section class="roleTableCotain">
      <div class="tableTitle">
        <div class="tableTitle_txt">列表专题</div>

        <el-button class="btn_addNewRole newRoles" @click="addNewSpecialPopShow" type="primary">新增专题</el-button>


      </div>
      <div class="tableContain">
        <el-table :data="tableData" border
                  max-width="70%"
       >
          <el-table-column align="center" prop="id" label="专题ID" width="130px"></el-table-column>
          <el-table-column align="center" prop="name" label="专题名称" width="130px"></el-table-column>
          <el-table-column align="center" prop="status" label="专题状态" width="130px">
            <template slot-scope="scope">
              <div   v-if="scope.row.status==0">未开始</div>
              <div    v-if="scope.row.status==1">已上线</div>
              <div    v-if="scope.row.status==2">已下线</div>
              <div   v-if="scope.row.status==3">草稿中</div>
            </template>

          </el-table-column>

<el-table-column align="center" label="显示时间" width="310px">
  <template slot-scope="scope">
     {{scope.row.startTime}} --- {{scope.row.endTime}}
  </template>
</el-table-column>

          <el-table-column align="center" prop="url" label="URL链接" max-width="26.7%"></el-table-column>
          <el-table-column prop="roleId" align="center" max-width="23%" label="操作">
            <template slot-scope="scope">
              <el-link @click="editSpecial(scope.$index, scope.row)" class="operation" type="primary">编辑</el-link>
              <el-link @click="logSpecial(scope.$index, scope.row)" class="operation" type="primary">日志</el-link>
              <el-link @click="releaseSpecial(scope.$index, scope.row)" class="operation" type="primary"
                       v-if="tableData[scope.$index].status=='1'"
              >发布</el-link>
              <el-link
                @click="deleteRow(scope.$index,tableData)"
                style="margin-left:20px;"
                type="primary"
                class="operation redText"
              >删除</el-link>

            </template>
          </el-table-column>
        </el-table>
      </div>
<!--      分页-->
      <div class="paginationContain">
        <el-pagination
          ref="pagination"
          background
          @size-change="handleSizeChange"
          layout="total,prev, pager, next,jumper,sizes"
          :total="total"
          :page-size="pageSize"
          class="pageFlag"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </section>

<!--新增专题对话框-->
    <el-dialog :show-close="true" :title="popTitle" :modal-append-to-body="false" :visible.sync="addSpecialShow"
     >
      <div class="flxCenter mb10">
        <label class="specialLavel">请选择您想要上传的专题类型:</label>
        <br>
        <br>

        <el-radio v-model="radio" label="img" class="pf40 f20">图片专题</el-radio>
        <el-radio v-model="radio" label="goods" class="pf20 f20" >商品专题</el-radio>      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmitType">确 定</el-button>
      </div>
    </el-dialog>

<!--日志对话框-->
    <el-dialog :show-close="true" :title="popTitleLog" :modal-append-to-body="false" :visible.sync="logSpecialShow"
    >
      <div class="flxCenter mb10">
        <el-table
          :data="logTabel"
          border
          style="width: 100%">
          <el-table-column
            prop="sepcialId"
            label="专题ID"
            width="180">
          </el-table-column>

          <el-table-column
            prop="sepcialTime"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="operateContent"
            label="操作内容">
          </el-table-column>
          <el-table-column
            prop="operateMan"
            label="操作人员"
            width="180">
          </el-table-column>
        </el-table>


      </div>

      <div slot="footer" class="dialog-footer">
<!--        <el-button type="primary" @click="sureRelease">确 定</el-button>-->
      </div>
    </el-dialog>



  </section>
</template>
<script>
import {
  specialDetail,
  specialTopicDelete,
  specialList,
  specialTopicLog,
  createSpecial,
  createImgSpecial
} from "@/api/index";
import {getLocalData} from "@/utils/base"
export default {
  data() {
    return {
      list:{
        name:'',
        startTime:'',
        endTime:'',
        type:'',
        url:'',
        status:'',
      },
      logTabel:[{
        sepcialId:'213131',
        operateMan:'压缩哦',
        sepcialTime:'2019-02-08',
        operateContent:'新增',
      },{
      sepcialId:'213131',
        operateMan:'托儿所',
        sepcialTime:'2019-02-08',
        operateContent:'上架',
    }],
      tableData: [

      ],

      label:'',
      label2:'',
      radio:'img',
      total: 0,
      pageSize: 10,
      pageIndex:10,
      pageNo:1,
      addSpecialShow: false,
      logSpecialShow:false,

      permissionAry: [],
      popTitle: "新增专题",
      popTitleLog: "日子专题",



      specialType: [{
        value: '0',
        label: '图片专题'
      }, {
        value: '1',
        label: '商品专题'
      },],
      specialStatus: [{
        value: '0',
        label: '未上线'
      }, {
        value: '1',
        label: '已上线'
      }, {
        value: '2',
        label: '已结束'
      }, {
        value: '3',
        label: '草稿中'
      }],
    };
  },
  created() {
   this.getSepcialList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize=val;
      this.querySpecialList();
    },
    indexMethod (index) {
      let curpage = this.pageNo     //单前页码，具体看组件取值
      let limitpage = this.pageSize  //每页条数，具体是组件取值
      return (index+1) + (curpage-1)*limitpage
    },
    getSepcialList() {
      // 获取专题列表
      var _this = this;
      let param = {
        sid: getLocalData('hbrj_uid'),
        pageIndex:this.pageNo,
        pageSize: 10,


      };
      specialList(param).then(function(res) {
        if (res.code == 200) {
          _this.tableData=res.data.list;
          _this.total=res.data.totalCount;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    //查询专题
    querySpecialList() {
      var  _this=this;
      let params = {
        sid: getLocalData('hbrj_uid'),
        name:this.list.name,
        startTime:this.list.startTime,
        endTime:this.list.endTime,
        type:this.list.type,
        url:this.list.url,
        status:this.list.status,
        pageIndex:this.pageNo,
        pageSize: 10,

      };
      specialList(params).then((res) => {
        if (res.code == 200) {
          _this.tableData=res.data.list;
          console.log(_this.tableData);
          _this.total=res.data.totalCount;
          _this.listArr= _this.total;

        }else {
          this.$message.error(res.msg);
        }
      })
    },

    handleCurrentChange(val) {
      // 点击分页
      this.pageNo = val;
      this.querySpecialList();
    },
    deleteRow(index, rows) {
      //删除专题
      var _this = this;
      if(this.tableData[index].sepcialStatus=='已上线'){

        this.$alert('进行中的专题不得删除','提示')

      }else {
        this.$confirm('您确定要删除该专题吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let param = {
            sid: getLocalData('hbrj_uid'),
            id:this.tableData[index].id,
          };
          specialTopicDelete(param).then(function(res) {

            if (res.code == 200) {


              rows.splice(index, 1);
              _this.$message({
                type: 'success',
                message: '删除成功!'});
              return 0

            } else {
              _this.$message.error(res.msg);

            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }

    },
    addNewSpecialPopShow() {
      // 新增专题确认
      this.roleDialogType = "add";
       this.addSpecialShow = true;

    },
    addSubmitType(type){
      //新增专题确定
      var _this = this;
      if(this.radio=="img"){
        this.$router.push({name:'imgTopic',
          params: {
            nav:"创建专题",
            type:this.radio
          }},
        );
      }else{
        this.$router.push({name:'goodsTopic',
          params: {
            nav:"创建专题",
            type:this.radio
          }},
        );
      }
      
    },
    editSpecial(index, rowObj) {
      // 点击编辑按钮
      if (rowObj.type==0) {
        this.$router.push({name:'imgTopic',
          query: {
            id: rowObj.id
           

          }},
        );
      }else{


      }


    },
    logSpecial(index, rowObj) {
      // 点击日志按钮
      var _this = this;
      this.logSpecialShow = true;


      let param = {
        sid: getLocalData('hbrj_uid'),
        id: _this.tableData[index].id,
      };

      specialTopicLog(param).then(function(res) {
        if (res.code == 200) {
          _this.logTabel==res.data.list;
          console.log(res.data);


        } else {
          _this.$message.error(res.msg);
        }
      });

    },

    releaseSpecial(index, rowObj) {
      //发布专题
      var _this = this;
      this.$confirm('你确定要发布该专题吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        if(_this.tableData[index].type==0){
          //图片专题
          let param = {
            sid: getLocalData('hbrj_uid'),
            imageUrl:_this.tableData[index].imageUrl,
            id:_this.tableData[index].id,
            type:_this.tableData[index].type,
            name:_this.tableData[index].name,
            // startTime:_this.tableData[index].startTime,
            // endTime:_this.tableData[index].endTime,
            startTime:"2019-01-01 00:00:00",
            endTime:"2019-01-02 00:00:00",
          };
          createImgSpecial(param).then(function (res) {
            if (res.code ==200){
              console.log(res)
              this.tableData[index].status=1;
              this.$message({
                type: 'success',
                message: '发布成功!'
              });
            } else {
              _this.$message.error(res.msg);
            }

          });
        }else {
          //商品专题

          let param = {
            sid: getLocalData('hbrj_uid'),
            id:_this.tableData[index].id,
            type:_this.tableData[index].type,
            name:_this.tableData[index].name,
            startTime:_this.tableData[index].startTime,
            endTime:_this.tableData[index].endTime,
            imageUrl:_this.tableData[index].imageUrl,
            background:_this.tableData[index].background,
            templateImageUrls:_this.tableData[index].templateImageUrls,
            itemIds:_this.tableData[index].itemIds,
          };
          createSpecial(param).then(function (res) {
            if (res.code ==200){
              console.log(res)
              this.tableData[index].status=1;
              this.$message({
                type: 'success',
                message: '发布成功!'
              });
            } else {
              _this.$message.error(res.msg);
            }

          });

        }



      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        });
      });
    },
    permissionCheckChange() {
      // 权限的选中与取消选中事件
      var checkedKeysAry = this.$refs.tree.getCheckedKeys(true);
      this.roleInfo.permissionIds = checkedKeysAry.join(",");
    },

  }
};
</script>
<style>
.thematicManagement {
  height: 100%;
  position: relative;
}
.thematicManagement .el-input__prefix{
  margin-top: -3px;
}
.thematicManagement .searchPanel {
  height: 60px;
  font-size: 14px;
  background: #fff;
  display: flex;
  align-items: center;
  position: relative;
}
.searchPanelToRight {
  height: 60px;
  font-size: 14px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.toRight {
  margin-right: 605px;
  height: 32px;
  line-height: 0;
}
.thematicManagement .searchPanel .searchItem {
  display: flex;
  margin-left: 40px;
}
.thematicManagement .searchPanel .searchItem .searchLabel {
  width: 100px;
  text-align: left;
  height: 32px;
  line-height: 32px;
}
.thematicManagement .searchPanel .searchItem .searchLabelTime {
  width: 85px;
  text-align: left;
  height: 32px;
  line-height: 32px;
}
.thematicManagement .searchPanel .searchItem .searchInput {
  margin-left: -20px;
  max-width: 220px;
}

.thematicManagement .searchPanel .searchBtn {
  margin: 0 50px;
  width: 126px;
  height: 32px;
  line-height: 0px;
}
.thematicManagement .searchPanel .halfSearchBtn {
  margin: 0 50px;
  width: 63px;

  height: 32px;
  line-height: 0px;
}
.thematicManagement .roleTableCotain {

  margin-top: 20px;
  background: #fff;
}

.thematicManagement .roleTableCotain .tableTitle {
  height: 76px;
  line-height: 76px;
  padding: 0 40px;
  display: flex;
  /* justify-content:flex-start; */
  align-items: center;
  max-width: 1400px;
}

.thematicManagement .roleTableCotain .tableTitle .btn_addNewRole {
  height: 32px;
  line-height: 0;
}

.thematicManagement .roleTableCotain .tableContain {
  /*max-width: 1391px;*/
  padding: 0 40px;
}

.thematicManagement .paginationContain {
  max-width: 900px;
  padding: 20px 0;
  align-content: center;

}

.thematicManagement .el-dialog__wrapper {
  position: absolute;
}
.thematicManagement .v-modal {
  position: absolute;
}
.thematicManagement .el-dialog__header {
  background: #f5f7fa;
  text-align: left;
  padding-left: 30px;
}
.thematicManagement .el-dialog__footer {
  text-align: center;
}
.thematicManagement .roleNameContain,
.thematicManagement .roleStatusContain {
  display: flex;
  height: 50px;
  line-height: 50px;
}
.thematicManagement .lableDiv {
  width: 80px;
  text-align: right;
  font-size: 14px;
}
.thematicManagement .eleDiv {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.thematicManagement .eleDiv .roleNameInput {
  width: 60%;
}
.thematicManagement .errorNotice {
  color: red;
  font-size: 14px;
}

.thematicManagement .errorContain {
  display: flex;
}

.thematicManagement .ruleContain {
  display: flex;
}

.thematicManagement .w110 {
  width: 105px;
  padding-right: 10px;
  text-align: right;
  vertical-align: middle;
}
.thematicManagement.rightLittle {
  margin-left: 15px;
}
.thematicManagement .newRoles {
  margin-left: 60px;
}
.thematicManagement .thematicManagement .roleTableCotain .tableContain {
  max-width: 1391px;
}

.thematicManagement .operation{
        margin-left: 30px;

}
.thematicManagement .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
  width: 220px;
  margin-left: -20px;
}
.thematicManagement.el-date-editor .el-range__icon{
line-height: 0px;
}
.thematicManagement .el-date-editor .el-range-separator{
  line-height: 25px;
}
.thematicManagement .specialLavel{

    font-size: 16px;
  }

.thematicManagement .flxCenter{
  display: flex;
  align-items: center;
}
.thematicManagement  .pf40{
    margin-left: 40px;

  }

.thematicManagement  .searchLabelTime{
  margin-left: 40px;


  }
.thematicManagement .p10{

  margin-left: 10px;
}


</style>


