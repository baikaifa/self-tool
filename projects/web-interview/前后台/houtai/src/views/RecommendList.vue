<template>
  <div class="container">
     <el-button type="primary" size="small" class="add_btn" icon="view" @click="handleAdd()">添加</el-button>
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
         
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width:100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column label="创建时间" prop="date" width="150" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:10px">{{scope.row.date}}</span>
          </template>
        </el-table-column>
             <el-table-column prop="id" label="id" width="130" align="center">
          <template slot-scope="scope">
            <span style="color:#f56767">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="imgUrl" label="头像" width="130" align="center">
          <template slot-scope="scope">
            <span style="color:#f56767">{{scope.row.imgUrl}}</span>
          </template>
        </el-table-column>
           <el-table-column prop="name" label="作者" width="130" align="center">
          <template slot-scope="scope">
            <span style="color:#f56767">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" width="130" align="center">
          <template slot-scope="scope">
            <span style="color:#f56767">{{scope.row.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180" prop="operation">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index,scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="handleDelete(scope.$index,scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <RecommendList :dialog="dialog" :formData="formData" @update="getProfile"></RecommendList>
  </div>
</template>
<script>
import RecommendList from "../components/RecommendList";
export default {
  name: "recommendList",
  data() {
    return {
      paginations: {
        page_index: 1, //当前位于
        total: 0, //总数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
      tableData: [],
      allTableData: [],
      formData: {
        imgUrl: "",
        id: "",
        _id:"",
        desc:"",
        name:""
      },
      dialog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      //获取表格数据
      this.$axios
        .get("/api/recommendList")
        .then(res => {
          this.allTableData = res.data;
          console.log( this.allTableData);
          //设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    setPaginations() {
      //分页属性设置
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 10;
      //设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改作者信息",
        option: "edit"
      };
      this.formData = {
        desc: row.desc,
        imgUrl: row.imgUrl,
        name: row.name,
        id: row.id,
        _id:row._id,
      };
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/recommendList/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加作者信息",
        option: "add"
      };
      this.formData = {
        imgUrl: "",
        desc: "",
        name: "",
        id: "",
        _id:"",
      };

      this.dialog.show = true;
    },
    handleSizeChange(page_size) {
      //切换size

      this.paginations.page_index=1;
      this.paginations.page_size=page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleCurrentChange(page) {
      //获取当前页
      let index=this.paginations.page_size*(page-1);
      //数据的总数
      let nums=this.paginations.page_size*page;
      //容器
      let tables=[];
      for(let i = index;i < nums; i++)
      {
        if(this.allTableData[i]){
            tables.push(this.allTableData[i]);
        }
        this.tableData=tables;
        console.log(this.tableData);
      }
    }
  },
  components: {
    RecommendList
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.btnRight{
  display: block;
  margin-left: 800px;
  cursor: pointer;
}
.pagination {
  text-align: center;
  margin-top: 10px;
}
.add_btn{
    margin-left:90%;
}
</style>
