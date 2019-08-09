<template>
    <div class="orderPage">
        <nav class="nav">| 订单列表</nav>
        <section class="searchPanel">
            <section class="searchPanel_up">
                <div class="searchItem">
                    <div class="searchLabel">订单编号：</div>
                    <el-input v-model="orderId" class="searchInput"></el-input>
                </div>
                <div class="searchItem">
                    <div class="searchLabel">订单状态：</div>
                     <el-select class="searchInput" v-model="orderStatus" placeholder="请选择">
                        <el-option
                        v-for="item in orderStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    
                </div>
                <div class="searchItem">
                    <div class="searchLabel">下单手机号：</div>
                    <el-input v-model="mobileNumber" class="searchInput"></el-input>
                </div>
            </section>
            <section class="searchPanel_down">
                <div class="searchItem" style="flex:3">
                    <div class="searchLabel">支付时间：</div>
                    <el-date-picker
                    v-model="startTime"
                    class="searchTimeInput"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                    <div style="width:20px;text-align:center;height:32px;line-height:32px;">-</div>
                     <el-date-picker
                    v-model="endTime"
                    class="searchTimeInput"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                   
                </div>
                <div class="searchItem" style="flex:2">
                    <div class="searchLabel">所属会员手机号：</div>
                    <el-input class="searchInput"></el-input>
                </div>
                <div class="searchItem" style="flex:2">
                    <div class="searchLabel">所属店铺：</div>
                    <el-input v-model="shopTitle" class="searchInput"></el-input>
                </div>
                <div class="searchItem" style="flex:1">
                    <el-button class="searchBtn" @click="getOrderList" type="primary">查询</el-button>
                </div>
            </section>
        </section>
        <section class="orderContain">
            <div class="tableTitle">
                <div class="tableTitle_txt">订单列表</div>
                <el-button class="searchBtn" type="primary">导出订单</el-button>
            </div>
            <div class="tableContain">
                <el-table
                :data="tableData"
                border
                style="width: 100%">
                    <el-table-column
                    align="center"
                    type="index"
                    label="序号"
                    width="50"
                    :index="indexMethod">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="orderIdStr"
                    label="订单号"
                    width="">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="userName"
                    label="下单人昵称"
                    width="">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="orderTimeStr"
                    label="下单时间"
                    width="">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="itemCount"
                    label="商品数量"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="updateTimeStr"
                    label="付款时间"
                    width="">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="itemTitle"
                    label="商品名称"
                    width="">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="itemId"
                    label="商品ID"
                    width="">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="sellerShopTitle"
                    label="店铺名"
                    width="">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="sellerId"
                    label="店铺ID"
                    width="">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="itemPrice"
                    label="商品总金额"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="orderStatus"
                    label="优惠金额"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="orderPirce"
                    label="实付金额"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="orderStatus"
                    label="订单状态"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    label="操作"
                    width="50">
                        <template slot-scope="scope">
                            <el-link @click="gotoOrderDetail(scope.$index, scope.row)"  type="primary">查看</el-link>
                           
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
                >
                </el-pagination>
            </div>
        </section>
    </div>
</template>
<script>
import {orderList} from "@/api/index"
export default {
    data(){
        return {
            tableData:[],
            total:0,
            pageNo:1,
            pageSize:20,
            orderStatus:"",//订单状态
            mobileNumber:"",// 手机号
            startTime:"",
            endTime:"",
            shopTitle:"",
            orderId:"",
            orderStatusList:[
                {
                value: '0',
                label: '全部'
                }, {
                value: '1',
                label: '未完成'
                }, {
                value: '2',
                label: '已完成'
                }, {
                value: '3',
                label: '已结算'
                }, {
                value: '4',
                label: '已退款'
                }
            ]

        }
    },
    created(){
        var _this=this;
        _this.getOrderList();
    },
    methods:{
        handleSizeChange(val) {
          this.pageSize=val;
          this.getOrderList();
        },
        indexMethod (index) {
          let curpage = this.pageNo     //单前页码，具体看组件取值
          let limitpage = this.pageSize  //每页条数，具体是组件取值
          return (index+1) + (curpage-1)*limitpage
        },
        getOrderList(){
            var _this=this;
            _this.tableData=[];
            var param={
                "pageSize":_this.pageSize,
                "pageNo":_this.pageNo
            }
            if(_this.orderStatus){
                param.orderStatus=_this.orderStatus;
            }
            if(_this.mobileNumber){
                param.mobileNumber=_this.mobileNumber;
            }
            if(_this.startTime){
                param.startTime=_this.startTime;
            }
            if(_this.endTime){
                param.endTime=_this.endTime;
            }
            if(_this.shopTitle){
                param.shopTitle=_this.shopTitle;
            }   
            if(_this.orderId){
                param.orderId=_this.orderId;
            }
            orderList(param).then(function(res){
                if(res.code==200){
                    var data=res.data;
                    _this.tableData=data.list;
                    _this.total=data.totalCount;
                    _this.$refs.pagination.total=_this.total;
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        gotoOrderDetail(index,item){
            this.$router.push({
                "name":"orderDetail",
                "query":{
                    "orderId":item.orderId
                }
            })
        },
        handleCurrentChange(val){
            this.pageNo=val;
            this.getOrderList();
        }
    }
}
</script>
<style>
    .orderPage{height: 100%;position: relative;}
    
    .orderPage .searchPanel{
        height: 100px;
        font-size: 14px;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
    }

    .orderPage .searchPanel .searchPanel_up{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: flex-end;
        padding-bottom: 5px;
    }
    .orderPage .searchPanel .searchPanel_down{
        width: 100%;
        height: 50px;
        display: flex;
        padding-top: 5px;
    }

    .orderPage .searchPanel_up .searchItem{
        display: flex;
        margin-left: 20px;
        flex:1;
    }

     .orderPage .searchPanel .searchItem{
        display: flex;
        margin-left: 20px;
    }

    .orderPage .searchPanel .searchItem .searchLabel{
       
        text-align: right;
        height: 32px;
        line-height: 32px;
        
    }
    .orderPage .searchPanel .searchItem  .searchInput{
        
        margin-left: 20px;
        max-width: 220px;
    }

    .orderPage .searchPanel .searchItem  .searchTimeInput{
        
        
        max-width: 200px;
    }


    .orderPage  .searchBtn{
            margin: 0 50px;
            width: 126px;
            height: 32px;
            line-height: 0px;
    }

    .orderPage .orderContain{
        background:#fff;
        margin-top: 20px;
    }

    .orderPage .orderContain .tableTitle{
        height: 76px;
        line-height: 76px;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
       
    }
    .orderPage .orderContain .tableContain{padding: 0 40px;}

    .orderPage .paginationContain{padding: 20px 0;}
</style>


