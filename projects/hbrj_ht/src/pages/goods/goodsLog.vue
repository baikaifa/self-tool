<template>
  <section class="operateLog">

    <nav class="nav">| 操作日志查看</nav>
<!--    搜索面板-->
    <section class="searchPanel">


        <div class="searchLabel">操作时间：</div>
        <el-date-picker
          v-model="addForm.repairTime" type="date"  suffix-icon="el-icon-date" size="small"
                        value-format=" yyyy-MM-dd" @change="getSTime" ></el-date-picker>



         <div class="searchLabel">操作动作：</div>
          <el-select  v-model="value" size="small" class="selectStyle" value="全部" >
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>


      <el-button class="searchBtn" type="primary" @click="queryOperateLog">查询</el-button>
    </section>
<!--表格表面-->
      <section class="roleTableCotain">
            <div class="tableSty">
              <el-table  border
                         max-width="50%"
                         type="card"
                         :data="list"


              >     <el-table-column
                align="center"
                type="index"
                label="序号"
                width="50"
                :index="indexMethod">
              </el-table-column>

                <el-table-column align="center" label="操作人员"
                                 max-width="28.6%" height="70"  prop="username">
                </el-table-column>
                <el-table-column  align="center" label="操作时间" max-width="40.7%"  prop="operateTimeStr">
                </el-table-column>
                <el-table-column  align="center" label="操作动作" max-width="30.7%" class="tableHeadSty "
                                  prop="operateType">

                  <template slot-scope="scope">
                    <div v-if="scope.row.operateType=='查看详情'" class="blueText">{{scope.row.operateType}}</div>
                    <div v-else-if="scope.row.operateType=='上架商品'" class="redText">{{scope.row.operateType}}</div>
                    <div v-else-if="scope.row.operateType=='放至回收站'" class="yelColorText">{{scope.row.operateType}}</div>

                  </template>

                </el-table-column>
              </el-table>
            </div>




        <!--      翻页-->

        <div class="paginationContain">
          <el-pagination
            background
            ref="pagination"
            layout="total,prev, pager, next,jumper,sizes"
            :total=total
            :page-size=pageSize
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            class="pageFlag"
          >
          </el-pagination>
        </div>



      </section>


  </section>
</template>
<script>
  import {getLocalData} from "@/utils/base"
  import {itemoperateLogList} from "@/api/index"

  export default {
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        operateDate:'',
        opearteType:'',
        list: [],
        addForm: {},
        columns: [
          {label: "序号"},
        ],
        value: "全部",
        label:'',
        options: [{value: '全部',}, {value: '查看详情',},{value: '放至回收站',}, {value: '上架商品',}],
        tableData: [{operate: '查看详情'}, {operate: '放至回收站'}, {operate: '上架商品'}]

      }
    },

    methods: {
      handleSizeChange(val) {
        this.pageSize=val;
        this.pageOperateLog()
      },
      indexMethod (index) {
        let curpage = this.pageNo     //单前页码，具体看组件取值
        let limitpage = this.pageSize  //每页条数，具体是组件取值
        return (index+1) + (curpage-1)*limitpage
      },
      pageOperateLog() {
        var  _this=this;
        let params = {
          sid: getLocalData('hbrj_uid'),
          operateDate:this.addForm.repairTime ,
          opearteType:this.value,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
        itemoperateLogList(params).then((res) => {
          if (res.code ==200) {
            this.list = res.data.list;
            _this.total=res.data.totalCount


          }else {
            this.$message.error(res.msg);

          }
        })
      },
      queryOperateLog() {
       var  _this=this;
        this.pageNo=1;
        let params = {
          sid: getLocalData('hbrj_uid'),
          operateDate:this.addForm.repairTime ,
          opearteType:this.value,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
        itemoperateLogList(params).then((res) => {
          if (res.code == 200) {
            this.list = res.data.list;
            _this.total=res.data.pageCount


          }else {
            this.$message.error(res.msg);

          }
        })


      },
      getOperateLog() {
        var  _this=this;

        let params = {
          sid: getLocalData('hbrj_uid'),
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
        itemoperateLogList(params).then((res) => {
          if (res.code == 200) {
            this.list = res.data.list;
            _this.total=res.data.totalCount

          }else {
            this.$message.error(res.msg);

          }
        })
      },
      getSTime(val) {
        this.addForm.repairTime = val
      },
      handleCurrentChange(val) {
        this.pageNo = val;

        this.pageOperateLog()
      },


    },
    created(){
      this.getOperateLog()
    },



  }
</script>
<style>
  .operateLog{
    height: 100%;position: relative;}

  .operateLog .searchPanel{
    height: 100px;
    font-size: 14px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .operateLog  .searchPanel .searchItem{
    display: flex;
    margin-left: 50px;
  }

  .operateLog  .searchLabel{
    width: 100px;
    text-align: right;
    line-height: 32px;
  }

  .operateLog  .searchPanel .searchBtn{
    margin: 0 50px;
    width: 126px;
    height: 32px;
    line-height: 0;
  }

  .operateLog .roleTableCotain{

    background: #fff;
    margin-top: 21px;


  }

  .operateLog .paginationContain{

   /*margin-left: -300px;*/
    margin-top: 100px;
    align-content: center;

  }

  .operateLog .selectStyle{

    width: 220px;
    background-color: #ffffff;
    border-radius: 4px;

  }

  .operateLog .tableSty{
    max-width: 916px;
    padding-top: 50px;
    padding-left: 50px;

  }


  .operateLog .redText{

    color: #f85c5d;
  }

  .operateLog .blueText{

    color: #3288ff;
  }

  .operateLog .yelColorText{

    color: #ff8f16;
  }
  .operateLog .el-table--border th, .el-table__fixed-right-patch{
    background: #fafafa;

    font-size: 14px ;
    font-weight:normal;
    color: #262626;

  }
  .operateLog .el-table--border th, .el-table__fixed-right-patch {


    font-size: 14px;
    font-weight: normal;
    color: #262626;


  }


</style>


