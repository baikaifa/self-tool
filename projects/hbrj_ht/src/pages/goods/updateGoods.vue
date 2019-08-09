<template>
  <div class="updataGoods">


    <!-- 查询部分 -->
    <section class="searchPanel">

      <div class="searchItem">
        <div class="searchLabel">更新时间：</div>

        <el-date-picker
          v-model="addForm.repairTime" type="date"  suffix-icon="el-icon-date" size="small"
          value-format=" yyyy-MM-dd" @change="getSTime" ></el-date-picker>
      </div>



      <el-button class="searchBtn" type="primary" @click="querygetItemList">查询</el-button>
    </section>
    <!-- 列表 -->
    <div class="goodsList">
      <section class="roleTableCotain">

        <el-table border  :data="tableData"
                  max-width="100%"
                  :header-cell-style="tableHeader"
                   >
          <el-table-column type="index" align="center" label="序号"
                           width="70"   prop="num" :index="indexMethod">
          </el-table-column>
          <el-table-column align="center" label="更新时间"
                           width="85"   prop="updateTime">
          </el-table-column>
          <el-table-column align="center" label="商品ID"
                           width="90"   prop="itemId">
          </el-table-column>
          <el-table-column align="center" label="商品名称"
                           width="240" height="140"  prop="list" class="redText " >
            <template slot-scope="scope">
              <div >{{scope.row.itemTitle}}</div>
              <div class="redText" v-for="(item,index) in scope.row.oldList" :key="index">{{item.itemTitle}}</div>

            </template>

          </el-table-column>
          <el-table-column align="center" label="所属类目"
                           width="140" height="140"  prop="categoryName">
          </el-table-column>

          <el-table-column align="center" label="商品状态"
                           width="70" height="140"  prop="itemStatus">
          </el-table-column>
          <el-table-column align="center" label="店铺ID"
                           width="70" height="140"  prop="shopId">
          </el-table-column>
          <el-table-column align="center" label="店铺名称"
                           width="164" height="140"  prop="shopTitle">
          </el-table-column>
          <el-table-column align="center" label="优惠券面额"
                           width="80" height="140"  prop="list">
            <template slot-scope="scope">
              <div>{{scope.row.couponAmount}}</div>
              <div class="redText" v-for="(item,index) in scope.row.oldList" :key="index">{{item.couponAmount}}</div>

            </template>
          </el-table-column>

          <el-table-column align="center" label="原价"
                           width="70" height="140"  prop="list">
            <template slot-scope="scope">
              <div>{{scope.row.itemReservePrice}}</div>
              <div class="redText" v-for="(item,index) in scope.row.oldList" :key="index">{{item.itemReservePrice}}</div>

            </template>
          </el-table-column>
          <el-table-column align="center" label="券后价"
                           width="70" height="140"  prop="list">
            <template slot-scope="scope">
              <div>{{scope.row.couponAfterPrice}}</div>
              <div class="redText" v-for="(item,index) in scope.row.oldList" :key="index">{{item.couponAfterPrice}}</div>

            </template>
          </el-table-column>
          <el-table-column align="center" label="佣金率"
                           width="70" height="140"  prop="list">
            <template slot-scope="scope">
              <div>{{scope.row.commissionRate}}</div>
              <div class="redText" v-for="(item,index) in scope.row.oldList" :key="index">{{item.commissionRate}}</div>

            </template>
          </el-table-column>
          <el-table-column align="center" label="佣金金额"
                           width="70" height="140"  prop="list">
            <template slot-scope="scope">
              <div>{{scope.row.commissionAmount}}</div>
              <div class="redText" v-for="(item,index) in scope.row.oldList" :key="index">{{item.commissionAmount}}</div>

            </template>
          </el-table-column>
          <el-table-column align="center" label="销量"
                           width="70" height="140"  prop="volume">
          </el-table-column>
          <el-table-column align="center" label="活动库存"
                           width="70" height="140"  prop="stock">
          </el-table-column>
          <el-table-column label="操作" prop="shopId" >
            <template slot-scope="scope">
              <el-link @click="viewDetail(scope.$index, scope.row)" class="blueColor" type="primary">查看详情</el-link>
            </template>
          </el-table-column>
        </el-table>


        <div class="paginationContain">
          <el-pagination
            background
            @size-change="handleSizeChange"
            layout="total,prev, pager, next,jumper,sizes"
            :total=total
            class="pageFlag"
            :page-size=pageSize
            :current-page=pageNo
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>

      </section>


    </div>
  </div>
</template>
<script>
  import goodsTab from "@/components/goodsTab"
  import {getLocalData} from "@/utils/base"
  import {findUpdateItemList} from "@/api/index"
  export default {
    data(){
      return {
        activeTab:'goodsStore',
        addForm: {},
        pageNo:1,
        pageSize:10,
        num:'',
        total:0,
        goods:{},
        index:'',
        tableData:[
          {}
        ]
      }
    },
    created() {
      this. getItemList();
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize=val;
        this. getItemList();

      },
      indexMethod (index) {
        let curpage = this.pageNo     //单前页码，具体看组件取值
        let limitpage = this.pageSize  //每页条数，具体是组件取值
        return (index+1) + (curpage-1)*limitpage
      },



      getItemList() {

        var _this=this;
        let params = {
          sid: getLocalData('hbrj_uid'),
          pageNo:this.pageNo ,
          pageSize:this.pageSize,

        };

        findUpdateItemList(params).then((res) => {
          if (res.code == 200) {

            _this.tableData = res.data.list;
            _this.total=res.data.totalCount;


          }else{
            _this.$message.error(res.msg);
          }
        })
      },
      //按时间点击查询
      querygetItemList() {
        var _this=this;

        this.pageNo=1;
        let params = {
          sid: getLocalData('hbrj_uid'),
          pageNo: this.pageNo ,
          pageSize:this.pageSize,
          updateDate:this.addForm.repairTime
        };
        findUpdateItemList(params).then((res) => {
          if (res.code == 200) {
            _this.tableData = res.data.list;
            _this.total=res.data.totalCount



          }else{
            _this.$message.error(res.msg);
          }
        })
      },
      pagegetItemList() {
        var _this=this;


        let params = {
          sid: getLocalData('hbrj_uid'),
          pageNo:this.pageNo ,
          pageSize:this.pageSize,
          updateDate:this.addForm.repairTime
        };
        findUpdateItemList(params).then((res) => {
          if (res.code == 200) {

            _this.tableData = res.data.list;

            _this.total=res.data.totalCount



          }else{
            _this.$message.error(res.msg);
          }
        })
      },

      getSTime(val) {
        this.addForm.repairTime = val
      },


      jumpToPage(path){
        this.activeTab = path;
        this.$router.push({name:path});
      },

      viewDetail(index){
        //查看详情
        var _this=this
        this.$router.push({name:'goodsDetail',

          params:_this.tableData[index],
        });
      },

      handleCurrentChange(val) {
        this.pageNo=val;
        this.pagegetItemList()
        // console.log( this.pageNo)
      },
      tableHeader({row,column,rowIndex,columnIndex}){
        return 'width:60px'
      }

    },
    components:{
      goodsTab
    }
  }
</script>
<style>

  .updataGoods thead .el-table_1_column_4   {

    background: #fef0f0;

  }
  .updataGoods  thead .el-table_1_column_5  {

    background: #fef0f0;

  }
  .updataGoods thead .el-table_1_column_13  {

    background: #fef0f0;

  }
  .updataGoods  thead .el-table_1_column_9  {

    background: #fef0f0;

  }
  .updataGoods  thead .el-table_1_column_10  {

    background: #fef0f0;

  }
  .updataGoods  thead .el-table_1_column_11  {

    background: #fef0f0;

  }
  .updataGoods  thead .el-table_1_column_12  {

    background: #fef0f0;

  }
  .updataGoods{
    height:100%;
  }

  .updataGoods .goodsList{
    width: 100%;
    min-height: 630px;
    margin-top:20px;
    background: #fff;
    font-size: 14px;


    border-radius: 4px;
    padding:20px 45px;
  }

  .updataGoods tr th,.updataGoods tr td{
    text-align:center;
  }

  .updataGoods .blueColor{
    width:100%;
    color:#3288ff;
    cursor: pointer;
  }

  .updataGoods .pageFlag{
    padding-top:10px;
  }
  .updataGoods  .searchBtn{
    margin: 0 50px;
    width: 126px;
    height: 32px;
    line-height: 0;
  }
  .updataGoods  .searchPanel{
    height: 100px;
    font-size: 14px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .updataGoods  .searchItem{
    display: flex;
    margin-left: 10px;

  }
  .updataGoods  .searchLabel{
    width: 100px;
    text-align: right;
    line-height: 32px;
  }
  .updataGoods  .roleTableCotain{
    background: #ffffff;


  }
  .updataGoods  .el-table th div {
   font-size: 14px;
    font-weight:normal
 }
 .updataGoods .redText{
   color: #f85c5d;
   margin-top:32px;

  }

 .updataGoods .paginationContain{

    max-width: 900px;
   align-content: center;




  }
  .updataGoods .el-table thead{


font-size: 14px ;
    font-weight:normal;
    color: #262626;

  }



</style>
