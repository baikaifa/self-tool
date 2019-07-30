<template>
    <section class="goodsDetailPage">
        <orderTab :activeTab="'orderDetail'"></orderTab>
        <section class="orderStep">
            <el-steps :active="2" align-center>
                <el-step title="步骤1" description=""></el-step>
                <el-step title="步骤2" description=""></el-step>
                <el-step title="步骤3" description=""></el-step>
                <el-step title="步骤4" description=""></el-step>
            </el-steps>
        </section>
        <section class="orderTableContain">
            <div class="tableTitle">
                <div class="tableTitle_txt">订单基本信息</div>
               
            </div>
            <div class="tableContain">
                <el-table
                :data="orderTableData"
                border
                style="width: 100%">
                    <el-table-column
                    align="center"
                    prop="orderId"
                    label="订单编号"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="orderStatus"
                    label="订单状态"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="orderStatus"
                    label="订单标记"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="orderTime"
                    label="创建时间">
                    </el-table-column>
                </el-table>
            </div>
        </section>
        <section class="orderTableContain">
            <div class="tableTitle">
                <div class="tableTitle_txt">商品信息</div>             
            </div>
            <div class="tableContain">
                <el-table
                :data="goodsTableData"
                border
                style="width: 100%">
                    <el-table-column
                    align="center"
                    prop="itemTitle"
                    label="商品名称"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                   
                    label="商品ID"
                    >
                        <template slot-scope="scope">
                            <el-link @click="gotoGoodsDetail(scope.$index, scope.row)"  type="primary">{{scope.row.itemId}}</el-link>                          
                        </template>
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="catName"
                    label="商品类目"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="itemNum"
                    label="商品数量"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="commissionRate"
                    label="佣金率"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="itemAllPrice"
                    label="商品总金额"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="discounts"
                    label="优惠金额"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="orderPrice"
                    label="支付金额"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </section>
        <section class="orderTableContain">
            <div class="tableTitle">
                <div class="tableTitle_txt">下单人信息</div>              
            </div>
            <div class="tableContain">
                <el-table
                :data="userTableData"
                border
                style="width: 100%">
                    <el-table-column
                    align="center"
                    prop="userId"
                    label="用户ID"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="nick"
                    label="用户昵称"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="level"
                    label="用户等级"
                    >
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="nature"
                    label="用户属性">
                    </el-table-column>
                </el-table>
            </div>
        </section>
        <section class="btnContain">
            <el-button class="returnBtn" @click="returnFun" type="primary">返回</el-button>
        </section>
    </section>
</template>

<script>
import orderTab from "@/components/orderTab"
import {orderDetail} from "@/api/index"
export default {
    data(){
        return {
            userTableData:[],
            orderTableData:[],
            goodsTableData:[],
            orderId:""
        }
    },
     components:{
        orderTab
    },
    created(){
        this.orderId=this.$route.query.orderId;
        this.getInfo();
    },
    methods:{
        getInfo(){
            var _this=this;
            var param={
                "orderId":this.orderId
            }
            orderDetail(param).then(function(res){
                if(res.code==200){
                    var data=res.data;

                    var orderItem={
                        "orderStatus":data.orderStatus,
                        "orderId":data.orderId,
                        "orderTime":data.orderTime
                    };
                    _this.orderTableData.push(orderItem);

                    var userItem={
                        "nick":data.nick,
                        "nature":data.nature,
                        "userId":data.userId,
                        "level":data.level
                    }
                    _this.userTableData.push(userItem);
                    //itemTitle itemId catName itemNum commissionRate itemAllPrice discounts orderPrice
                    var goodsItem={
                        "itemId":data.itemId,
                        "itemTitle":data.itemTitle,
                        "catName":data.catName,
                        "itemNum":data.itemNum,
                        "commissionRate":data.commissionRate,
                        "itemAllPrice":data.itemAllPrice,
                        "discounts":data.discounts,
                        "orderPrice":data.orderPrice
                    }
                    _this.goodsTableData.push(goodsItem);

                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        returnFun(){
            this.$router.push({
                name:"orderList"
            })
        },
        gotoGoodsDetail(index,item){
            this.$router.push({
                name:"orderGoodsDetail",
                query:{
                    "itemId":item.itemId
                }
            })
        }
    }
}
</script>

<style>
    .goodsDetailPage .orderStep{
        padding:10px 50px;
        width: 100%;
        height: 200px;
        background-color: #ffffff;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .goodsDetailPage .orderTableContain{
        margin-top:20px;
        background: #fff;
        

    }

    .goodsDetailPage .orderTableContain .tableTitle{
        height: 76px;
        line-height: 76px;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
       
    }

    .goodsDetailPage .orderTableContain .tableContain{padding: 0 40px;padding-bottom: 40px;}

    .goodsDetailPage .btnContain{margin-top:20px;}

    .goodsDetailPage .returnBtn {width: 126px;height: 32px;line-height: 0px;}

</style>


