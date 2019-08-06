<template>
  <section class="adverSite">
    <nav class="nav">| 广告位管理</nav>
    <section class="searchPanel">
      <div class="searchItem">
        <div class="searchLabel pindao">频道</div>
        <el-select placeholder="全部" v-model="adQuery.catId">
          <el-option v-model="allValue" :label="allValueShow"></el-option>
          <el-option
            v-for="item in channelList"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item.categoryId"
            class="searchOption"
          ></el-option>
        </el-select>
        <!-- <el-input  class="searchInput"></el-input> -->
      </div>

      <div class="searchItem">
        <div class="searchLabel pindao">banner名称</div>
        <el-input placeholder="请输入banner名称" clearable v-model="adQuery.name"></el-input>
      </div>
      <div class="searchItem">
        <div class="searchLabel pindao">bannerID</div>
        <el-input placeholder="请输入bannerID" clearable v-model="adQuery.id"></el-input>
      </div>
    </section>
    <section class="searchPanel">
      <div class="searchItem">
        <div class="searchLabel pindao">banner状态</div>
        <el-select placeholder="全部" v-model="adQuery.status">
          <el-option
            v-for="item in statusMap"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            class="searchOption"
          ></el-option>
        </el-select>
      </div>
      <div class="searchItem">
        <div class="searchLabel pindao ban_dis_tim">banner显示时间</div>
        <el-date-picker
          v-model="adQuery.durTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :default-time="['00:00:00']"
        ></el-date-picker>
      </div>
    </section>
    <section class="searchPanel searchPanelBtn">
      <div class="searchItem"></div>
      <el-button class="searchBtn" type="primary" @click="queryData">查询</el-button>
    </section>
    <section class="roleTableCotain">
      <div class="tableTitle">
        <el-button class="searchBtn" style="width:90px;" type="primary" @click="addAdSite">
          <i class="iconfont icon-shangchuantupian1"></i>新建
        </el-button>
        <!-- <div class="tableTitle_txt">列表专题</div> -->
        <el-button class="btn_addNewRole newRoles">
          <i class="iconfont icon-yulan"></i> 预览
        </el-button>
      </div>
      <div class="tableContain">
        <div class="tableDiv">
          <el-table :data="tableData" border width="100%">
            <el-table-column align="center" prop="id" label="banner ID"></el-table-column>
            <el-table-column align="center" prop="item" label="所属频道"></el-table-column>
            <el-table-column align="center" prop="name" label="banner名称"></el-table-column>
            <el-table-column align="center" prop="imageUrl" label="banner图片" width="250">
              <template slot-scope="imgScope">
                <img style="width:164px;height:60px;" :src="imgScope.row.imageUrl" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="time" label="banner时间" width="155">
              <template slot-scope="timeScope">
                <p>{{timeScope.row.stTime}}</p>
                <p></p>
                <p class="splitLine">——</p>
                <p>{{timeScope.row.edTime}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="statusStr" label="banner状态">
              <template slot-scope="stScope">
                <span
                  :class="['statusBtn',statusMap[stScope.row.status].textColor]"
                >{{stScope.row.statusStr}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="banner顺序"></el-table-column>
            <el-table-column prop="id" align="center" width="180" label="操作">
              <template slot-scope="scope">
                <el-link
                  @click="editBanner(scope.row.id)"
                  class="blueText pr20"
                  type="primary"
                >编辑</el-link>
                <el-link @click="deleteBanner(scope.row,1)" class="orText pr20" type="primary">作废</el-link>
                <el-link @click="deleteBanner(scope.row,0)" class="redText" type="primary">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="pagDiv">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="pageNo"
            layout="total,prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import { adverSite, getChannelList, deleteAdSite } from "@/api/index";
import { getLocalData } from "@/utils/base";
export default {
  data() {
    return {
      sid: getLocalData("hbrj_sid"),
      pageNo: 1,
      pageSize: 8,
      total: 0,
      roleStatus: false,
      dialogFormVisible: false,
      permissionAry: [],
      errorNotice: "",
      showError: false,
      roleInfo: {
        roleId: "",
        roleName: "",
        status: 0,
        permissionIds: ""
      },
      searchRoleName: "",
      permissionList: [],
      permissionProps: {
        children: "subNav",
        label: "name"
      },
      tableData: [],
      statusMap: [
        { value: 0, label: "全部", textColor: "nolineBg" },
        { value: 1, label: "未上线", textColor: "nolineBg" },
        { value: 2, label: "已失效", textColor: "grayBg" },
        { value: 3, label: "已下线", textColor: "offlineBg" },
        { value: 4, label: "已上线", textColor: "greenBg" }
      ],
      channelList: [],
      adQuery: {
        id: "",
        name: "",
        catId: "",
        status: "",
        durTime: "",
        endTime: "",
        startTime: ""
      },
      roleDialogType: "", // add edit
      allValue: "", //频道全部选项值
      allValueShow: "全部" //频道全部选项
    };
  },
  created() {
    this.getData();
    this.getChannelData();
  },
  methods: {
    getData(parms) {
      let params = {
        pageSize: this.pageSize,
        pageIndex: this.pageNo,
        ...parms,
        sid: getLocalData("hbrj_uid")
      };
      console.log(params);

      Object.keys(params).forEach(function(item) {
        if (params[item]==="") {
         delete params[item]
        }
        if(item==="durTime"){
          delete params.durTime;
        }
      });

      console.log(params);
      let that = this;
      adverSite(params).then(data => {
        if (data.code == 200) {
          that.tableData = data.data.list;
          that.pageNo = data.data.pageIndex;
          that.total = data.data.totalCount;
          that.tableData.forEach(ele => {
            let reg = /([A-Z]|\.\S+)/g;
            ele.statusStr = that.statusMap[ele.status].label;
            ele.stTime = ele.startTime.replace(reg, " ");
            ele.edTime = ele.endTime.replace(reg, " ");
          });
        } else {
          that.$message.error(data.msg);
        }
      });
    },
    getChannelData() {
      getChannelList().then(data => {
        if (data.code == 200) {
          this.channelList = data.data;
        }
      });
    },
    queryData() {
      if (this.adQuery.durTime.length > 1) {
        this.adQuery.startTime = this.adQuery.durTime[0];
        this.adQuery.endTime = this.adQuery.durTime[1];
      }
      this.getData(this.adQuery);
    },
    handleCurrentChange(val) {
      // 点击分页
      this.pageNo = val;
      this.getData();
    },
    addAdSite() {
      this.$router.push({ name: "createAd" });
    },
    editBanner(id) {
      // 点击编辑按钮
      console.log(id);
      this.$router.push({ name: "createAd", query: { id: id } });
    },
    deleteData(row, type) {
      let params = {
        status: type, //0 删除， 1 作废
        id: row.catId
      };
      let typeStr = type == 1 ? "作废" : "删除";

      deleteAdSite(params).then(data => {
        if (data.code == 200) {
          this.$message({
            type: "success",
            message: `${typeStr}成功`
          });
        } else {
          this.$message({
            type: "info",
            message: data.msg
          });
        }
      });
    },
    deleteBanner(row, type) {
      // 删除
      let typeStr = type == 1 ? "作废" : "删除";
      let title = `您确定要${typeStr}该广告位么？`;
      this.$confirm(title, "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteData(row, type);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消${typeStr}`
          });
        });
    }
  }
};
</script>
<style>
.adverSite {
  height: 100%;
  position: relative;
}

.adverSite .searchPanel {
  height: 50px;
  font-size: 14px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
}
.adverSite .searchPanelBtn {
  justify-content: flex-end;
}
.adverSite .searchPanel .searchItem {
  display: flex;
  margin-left: 20px;
}

.adverSite .searchPanel .searchItem .searchLabel {
  width: 140px;
  text-align: right;
  height: 32px;
  line-height: 32px;
}
.adverSite .searchPanel .searchItem .searchInput {
  margin-left: 20px;
  max-width: 220px;
}
.adverSite .searchPanel .searchBtn {
  width: 126px;
  height: 32px;
  line-height: 0px;
}
.searchBtn {
  width: 126px;
  height: 32px;
  line-height: 0px;
}
.pindao {
  margin-right: 20px;
}

.el-date-editor .el-range__icon {
  line-height: 0px;
}
.el-date-editor .el-range-separator {
  line-height: 25px;
}
.ban_dis_tim {
  margin-left: -43px;
}
.adverSite .roleTableCotain {
  margin-top: 20px;
  background: #fff;
}

.adverSite .roleTableCotain .tableTitle {
  height: 76px;
  line-height: 76px;
  padding: 0 40px;
  /* display: flex; */
  /* justify-content:flex-start; */
  /* align-items: center; */
  max-width: 900px;
  text-align: left;
}

.adverSite .roleTableCotain .tableTitle .btn_addNewRole {
  height: 32px;
  line-height: 0;
  color: #409eff;
  border: 1px solid #409eff;
}

.adverSite .paginationContain {
  min-width: 900px;
  padding: 20px 0;
}

.adverSite .el-dialog__wrapper {
  position: absolute;
}
.adverSite .v-modal {
  position: absolute;
}
.adverSite .el-dialog__header {
  background: #f5f7fa;
  text-align: left;
  padding-left: 30px;
}
.adverSite .el-dialog__footer {
  text-align: center;
}
.adverSite .roleNameContain,
.adverSite .roleStatusContain {
  display: flex;
  height: 50px;
  line-height: 50px;
}
.adverSite .lableDiv {
  width: 80px;
  text-align: right;
  font-size: 14px;
}
.adverSite .eleDiv {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.adverSite .eleDiv .roleNameInput {
  width: 60%;
}
.adverSite .errorNotice {
  color: red;
  font-size: 14px;
}

.adverSite .errorContain {
  display: flex;
}

.adverSite .ruleContain {
  display: flex;
}
.adverSite .splitLine {
  height: 10px;
  line-height: 10px;
  color: #595959;
}
.adverSite .Crossbar {
  width: 50px;
  height: 0px;
  border-bottom: 1px solid black;
}
.adverSite .roleTableCotain .tableContain {
  max-width: 1547px;
}
.adverSite .statusBtn {
  width: 66px;
  height: 26px;
  border-radius: 13px;
  color: #fff;
  line-height: 26px;
  display: inline-block;
}
.tableDiv {
  margin-left: 50px;
  margin-bottom: 50px;
}
.pagDiv {
  height: 70px;
  margin-bottom: 20px;
}
</style>

