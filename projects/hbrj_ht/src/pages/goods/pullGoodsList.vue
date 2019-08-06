<template>
    <div class="pullGoodsListPage">
        <section class="searchPanel">
            <section class="searchPanel_up">
                <div class="searchItem">
                    <label class="w100">商品类目：</label> 
                    <el-select v-model="searchQuery.catIds" placeholder="请选择">
                        <el-option
                        v-for="item in categoryList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="searchItem">
                     <div class="searchLabel">店铺ID：</div>
                     <el-input v-model="searchQuery.shopId" class="searchInput"></el-input>
                </div>
                <div class="searchItem">
                    <div class="searchLabel">店铺类型：</div>
                    <el-select v-model="searchQuery.shopType" placeholder="请选择">
                        <el-option
                        v-for="item in shopTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="searchItem">
                     <div class="searchLabel">关键词：</div>
                     <el-input v-model="searchQuery.keyword" class="searchInput"></el-input>
                </div>
            </section>
            <section class="searchPanel_middle">
                <div class="searchItem">
                    <div class="searchLabel">平台类型：</div>
                    <el-select v-model="searchQuery.platform" placeholder="请选择">
                        <el-option
                        v-for="item in shopTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="searchItem">
                    <div class="searchLabel">销量：</div>
                    <el-input v-model="searchQuery.startVolme" class="searchInput_mini_1"></el-input>
                    <div class="lineDiv">-</div>
                    <el-input v-model="searchQuery.endVolme" class="searchInput_mini_2"></el-input>
                </div>
                <div class="searchItem">
                    <div class="searchLabel">价格：</div>
                    <el-input v-model="searchQuery.startPrice" class="searchInput_mini_1"></el-input>
                    <div class="lineDiv">-</div>
                    <el-input v-model="searchQuery.endPrice" class="searchInput_mini_2"></el-input>
                </div>
                <div class="searchItem">
                    <div class="searchLabel">优惠券面额：</div>
                    <el-input v-model="searchQuery.startCoupon" class="searchInput_mini_1"></el-input>
                    <div class="lineDiv">-</div>
                    <el-input v-model="searchQuery.endCoupon" class="searchInput_mini_2"></el-input>
                </div>
            </section>
            <section class="searchPanel_down">
                <div class="searchItem">
                    <div class="searchLabel">佣金金额：</div>
                    <el-input v-model="searchQuery.startCommission" class="searchInput_mini_1"></el-input>
                    <div class="lineDiv">-</div>
                    <el-input v-model="searchQuery.endCommission" class="searchInput_mini_2"></el-input>
                </div>
                <div class="searchItem">
                    <div class="searchLabel">拉取类型：</div>
                    <el-select v-model="searchQuery.type" placeholder="请选择">
                        <el-option
                        v-for="item in shopTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="searchItem" style="flex:1">
                    <el-button class="searchBtn" @click="pullGoodsFun" type="primary">拉取</el-button>
                </div>
            </section>
            
        </section>
        <section class="pullGoodsList">
             <div class="btnsList textL mb">
                <span>将选中的商品:</span>
                <el-button @click="gotoStore" class="btns"><i class="iconfont icon-Import mr5"></i>批量入库</el-button>
                <el-button @click="getHistoryList" class="btns"><i class="iconfont icon-daochu mr5"></i>查看更新历史</el-button>
            </div>
            <div class="tableContain">
                 <el-table
                @selection-change="selectionChange"
                :data="tableData"
                border
                style="width: 100%">
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column
                    align="center"
                    type="index"
                    label="序号"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    v-for="item in tableItem"
                    align="center"
                    :prop="item.prop"
                    :label="item.label">
                    </el-table-column>
                    <el-table-column
                    prop="roleId"
                    align="center"
                    label="操作">
                        <template slot-scope="scope">
                            <el-link @click="gotoStore(scope.$index, scope.row)" type="primary">入库</el-link>
                            <el-link @click="detailView(scope.$index, scope.row)" style="margin-left:20px;" type="danger">查看详情</el-link>
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
    </div>
</template>
<script>
import {getCategoryList,pullGoodsList,pullGoodsFun,goodsImport,findUpdateItemList} from "@/api/index.js"
export default {
    data(){
        return {
            total:0,
            pageIndex:1,
            pageSize:1,
            tableData:[],
            tableItem:[
                {
                    "label":"商品ID",
                    "prop":"itemId"
                },
                {
                    "label":"商品名称",
                    "prop":"title"
                },
                {
                    "label":"所属类目",
                    "prop":"catName"
                },
                {
                    "label":"商品状态",
                    "prop":"status"
                },
                {
                    "label":"优惠券面额",
                    "prop":"couponAmount"
                },
                {
                    "label":"原价",
                    "prop":"reservePrice"
                },
                {
                    "label":"券后价",
                    "prop":"couponAfterPrice"
                },
                {
                    "label":"佣金率",
                    "prop":"commissionRate"
                },
                {
                    "label":"佣金金额",
                    "prop":"couponAmount"
                },
                {
                    "label":"销量",
                    "prop":"volume"
                }
                
            ],
            searchQuery:{
                catIds:"",
                shopId:"",
                shopType:"",
                keyword:"",
                platform:"",
                startVolme:"",
                endVolme:"",
                startPrice:"",
                endPrice:"",
                startCoupon:"",
                endCoupon:"",
                startCommission:"",
                endCommission:"",
                type:"开始拉取"
            },
            shopTypeList:[
                {
                    value:0,
                    label:'淘宝'
                },
                {
                    value:1,
                    label:"天猫"
                }
            ],
            categoryList:[],
            pullTypeList:[
                {
                    value:0,
                    label:'开始拉取'
                },
                {
                    value:1,
                    label:"查看进度"
                }
            ],
            itemIdAry:[]
        }
        
    },
    created() {
        this.getCategoryList();
        this.getData();
       
    },
    methods:{
        getData(){
            var _this=this;
            _this.tableData=[];
            var param={
                pageIndex:_this.pageIndex,
                pageSize:_this.pageSize
            }
            /*for(var i=0;i<this.searchQuery;i++){
                if(this.searchQuery[i]){
                    param[i]=this.searchQuery[i];
                }
            }*/
            pullGoodsList(param).then(function(res){
                if(res.code==200){
                    var data=res.data;
                    var list=res.data.list;
                    _this.total=data.totalCount;
                    _this.$refs.pagination.total=_this.total;

                    for(var i=0;i<list.length;i++){
                        var itemObj={};
                        for(var j=0;j<_this.tableItem.length;j++){
                            var prop=_this.tableItem[j].prop;
                            itemObj[prop]=list[i][prop];
                        }
                        _this.tableData.push(itemObj);
                    }
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        getCategoryList(){
            var _this=this;
            getCategoryList().then(function(res){
                if(res.code==200){
                    for(var i=0;i<res.data.length;i++){
                        var item=res.data[i];
                        var itemObj={};
                        itemObj.label=item.categoryName;
                        itemObj.value=item.categoryId;
                        _this.categoryList.push(itemObj);
                    }
                    
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        handleCurrentChange(val){
            this.pageIndex=val;
            this.getData();
        },
        pullGoodsFun(){

            var param={};
           
            for(var i=0;i<this.searchQuery;i++){
                if(this.searchQuery[i]){
                    param[i]=this.searchQuery[i];
                }
            }

            pullGoodsFun(param).then(function(res){
                if(res.code==200){
                    _this.$message.success("拉取成功");
                    location.reload();
                }else{
                    _this.$message.error(res.msg);
                }
            });

        },
        detailView(index,goodsItem){
            this.$router.push({
                name:"goodsDetail",
                query:{
                    "itemId":goodsItem.itemId
                }
            })
        },
        selectionChange(selections){
            this.itemIdAry=[];
            for(var i=0;i<selections.length;i++){
                this.itemIdAry.push(selections[i].itemId);
            }
        },
        gotoStore(index,goodsItem){
            var _this=this;
            if(this.itemIdAry.length==0){
                this.$message.error("没有选中任何商品");
                return;
            }
            goodsImport({"itemIds":this.itemIdAry.join(",")}).then(function(res){
                if(res.code==200){
                    _this.$message({
                        message: '已入库',
                        type: 'success',
                        onClose:_this.getData,
                        duration:1000
                     });
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        getHistoryList(){
            var _this=this;
            _this.tableData=[];
            var param={
                pageNo:_this.pageIndex,
                pageSize:_this.pageSize
            }
            /*for(var i=0;i<this.searchQuery;i++){
                if(this.searchQuery[i]){
                    param[i]=this.searchQuery[i];
                }
            }*/
            findUpdateItemList(param).then(function(res){
                if(res.code==200){
                    var data=res.data;
                    var list=res.data.list;
                    _this.total=data.totalCount;
                    _this.$refs.pagination.total=_this.total;

                    for(var i=0;i<list.length;i++){
                        var itemObj={};
                        for(var j=0;j<_this.tableItem.length;j++){
                            var prop=_this.tableItem[j].prop;
                            
                            itemObj[prop]=list[i][prop];
                        }
                        _this.tableData.push(itemObj);
                    }
                }else{
                    _this.$message.error(res.msg);
                }
            });
        }

    }
}
</script>
<style>

    .pullGoodsListPage .searchPanel{
        height: 150px;
        font-size: 14px;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding-right: 30px;
    }

    .pullGoodsListPage .searchPanel .searchItem{
        display: flex;
        margin-left: 30px;
    }

    .pullGoodsListPage .searchPanel .searchPanel_up{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: flex-end;
        padding-bottom: 5px;
    }

     .pullGoodsListPage .searchPanel .searchPanel_middle{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        padding-bottom: 5px;
    }

    .pullGoodsListPage .searchPanel .searchPanel_down{
        width: 100%;
        height: 50px;
        display: flex;
        padding-top: 5px;
    }

    .pullGoodsListPage .searchPanel .searchItem .searchLabel{
        width: 100px;
        text-align: right;
        height: 32px;
        line-height: 32px;
    }
    .pullGoodsListPage .searchPanel .searchItem  .searchInput{
        
        margin-left: 20px;
        max-width: 220px;
    }
    .pullGoodsListPage .searchPanel .searchItem  .searchInput_mini_1{
        
        margin-left: 20px;
        max-width: 100px;
    }
    .pullGoodsListPage .searchPanel .searchItem  .searchInput_mini_2{
        
        
        max-width: 100px;
    }
    .pullGoodsListPage .searchPanel .searchItem .lineDiv{
        width: 20px;
        text-align: center;
        height: 32px;
        line-height: 32px;
        
    }
    .pullGoodsListPage .searchPanel .searchBtn{
            margin: 0 50px;
            width: 126px;
            height: 32px;
            line-height: 0px;
    }

    .pullGoodsListPage .pullGoodsList{
        margin-top:20px;
        background: #fff;
        

    }

    .pullGoodsListPage .btnsList {
        padding:0 40px;
        padding-top:20px;
    }

    .pullGoodsListPage .pullGoodsList .tableContain{padding: 0 40px;}

    .pullGoodsListPage .paginationContain{padding: 20px 0;}

</style>

