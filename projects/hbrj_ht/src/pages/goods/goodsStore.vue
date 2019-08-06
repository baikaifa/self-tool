<template>
    <div class="goodsStore">
        <!-- 头部切换tab -->
        <goodsTab :activeTab="activeTab"/>
        <!-- 查询部分 -->
        <div class="queryBox mb">
            <el-row :gutter="20" class="pb25">
                <el-col :span="6" class="queryItem">
                    <label class="w100">商品ID</label> 
                    <el-input v-model="goods.itemId"></el-input> 
                </el-col>
                <el-col :span="6" class="queryItem">
                    <label class="w100">商品名称</label> 
                    <el-input v-model="goods.name"></el-input> 
                </el-col>
                <el-col :span="6" class="queryItem">
                    <label class="w100">商品类目</label> 
                    <el-select v-model="goods.catName" placeholder="请选择">
                      <el-option  v-model="allGoodsValue" :label="allGoods"></el-option>
                        <el-option
                        v-for="item in categoryList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" class="queryItem">
                    <label class="w100">商品状态</label> 
                    <el-select v-model="goods.status" placeholder="请选择">
                        <el-option
                        v-for="item in orderStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="pb25">
                <el-col :span="6" class="queryItem" >
                    <label class="w100">店铺ID</label> 
                    <el-input v-model="goods.shopId"></el-input>
                </el-col>
                <el-col :span="6" class="queryItem">
                    <label class="w100">店铺类型</label> 
                    <el-select v-model="goods.shopType" placeholder="请选择">
                        <el-option
                        v-for="item in shopTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" class="queryItem">
                    <label class="w100">入库时间</label> 
                    <el-date-picker
                      value-format="yyyy-MM-dd"
                    v-model="goods.createTime"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6" class="queryItem">
                    <label class="w100">销量</label>
                    <el-input v-model="goods.minSell" class="w30"></el-input>--
                    <el-input v-model="goods.maxSell" class="w30"></el-input>
                </el-col>
                 <el-col :span="6" class="queryItem">
                    <label class="w100">价格</label>
                    <el-input v-model="goods.minPrice" class="w30"></el-input>--
                    <el-input v-model="goods.maxPrice" class="w30"></el-input>
                </el-col>
                <el-col :span="6" class="queryItem">
                    <label class="w100">优惠券面额</label>
                    <el-input v-model="goods.minCouponAmount" class="w30"></el-input>--
                    <el-input v-model="goods.maxCouponAmount" class="w30"></el-input>
                </el-col>
              <el-button type="primary" class="queryBtn btns" @click="queryGoods">查询</el-button>
            </el-row>

        </div>
        <!-- 列表 -->
        <div class="goodsList">
            <div class="btnsList textL mb">
                <span >将选中的商品&nbsp&nbsp&nbsp&nbsp&nbsp</span>
                <el-button @click="putItemsToshelf" type="primary" class="btns" ><i class="iconfont icon-piliangshangjia mr5"></i>批量上架</el-button>

              <el-button @click="exportGoods" type="primary"  class="btns"><i class="iconfont icon-daochu mr5"></i>导出</el-button>
                <el-upload 
                    style="margin-left:10px;"
                  
                    :data="{'sid':sid}"
                    action="/item/importexcel">
                    <el-button  :on-change="handleChange" type="primary"><i class="iconfont icon-Import mr5"></i>导入</el-button>
                    <div slot="tip" class="el-upload__tip"></div>
                </el-upload>
            </div>
            <el-table border  :data="tableData" @selection-change="selectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column
                    align="center"
                    type="index"
                    label="序号"
                    width="50">
                </el-table-column>
                <el-table-column v-for="(item,index) in columnsOne" :width="item.width" :label="item.label" :prop="item.prop" ></el-table-column>
                <el-table-column label="商品主图">
                    <template slot-scope="scope">
                        <img style="width:60px;height:60px;" :src="scope.row.pictUrl"/>
                    </template>
                </el-table-column>
                <el-table-column v-for="(item,index) in columns" :width="item.width" :label="item.label" :prop="item.prop" ></el-table-column>
                <el-table-column label="操作">
                     <template slot-scope="scope">
                        <div class="redColor" @click="putToshelf(scope.$index, scope.row)" v-if="scope.row.status!=='已上架'">上架</div>
                        <div class="blueColor" @click="viewDetail(scope.$index, scope.row)">查看详情</div>
                        <div class="yelColor" @click="moveTodepot(scope.$index, scope.row)">放至回收站</div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :total="total"
                :page-size="pageSize"
                class="pageFlag"
                ref="pagination"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
        <form action='/item/export' style="display:none;" method="get" ref="exportForm">

            <input type="text" id='sid' name ="sid" v-model="sid" >
            <input type="text" id='params' name ="params" ref="formParams" v-model="exportIds" >

            <input type="submit" text="导出">

        </form>
    </div>
</template>
<script>
import goodsTab from "@/components/goodsTab"
import { getLocalData} from "@/utils/base"
import {goodsList,putItemsShelf,deleteGoods,getCategoryList,upItemList,exportGoods} from "@/api/index.js"
export default {
    data(){
        return {
            exportIds:'',
            sid:getLocalData("hbrj_sid"),
            activeTab:'goodsStore',
            total:0,
            pageSize:10,
            pageNo:1,
            tabList:[{name:"商品库",path:"goodsStore"},{name:"商品品类库",path:'category'},{name:"商品回收站"},{name:"商品拉取规则"}],
            goods:{
                itemId:'',
                title:'',
                catName:'',
                status:'',
                shopId:'',
                shopType:'',
                createTime:'',
                minSell:'',
                maxSell:'',
                minPrice:'',
                // maxSell:'',
                minCouponAmount:'',
                maxCouponAmount:''
            },
            columnsOne:[{label:"商品ID",prop:'itemId'},{label:"商品名称",prop:'title'}],
            columns:[
              {label:"所属类目",prop:"catName"},{
              label:"商品状态",prop:"status"},
              {label:"店铺名称",prop:"shopTitle"},
              {label:"优惠券面额",prop:"couponAmount"},
              {label:"原价",prop:"reservePrice",},
              {label:"券后价",prop:"postCouponPrice",},
              {label:"佣金金额",prop:"couponAmount",},
              {label:"销量",prop:"volume"},
              {label:"活动库存",prop:"shopDsr",},
              {label:"入库时间",prop:"onShelvesTimeStr",},

            ],
            tableData:[
                
            ],
            allGoods:'全部',
            allGoodsValue:'0',
            categoryList:[],
            orderStatusList:[
                {
                value: '0',
                label: '全部'
                }, {
                value: '1',
                label: '已上架'
                }, {
                value: '2',
                label: '已下架'
                }, {
                value: '3',
                label: '待上架'
                }, {
                value: '4',
                label: '已失效'
                }
            ],
            itemIdAry:[],
            shopTypeList:[
                {
                    value:0,
                    label:'淘宝'
                },
                {
                    value:1,
                    label:"天猫"
                }
            ]
        }
    },
    created() {
        this.getCategoryListN();
        this.getData();

    },
    methods: {
        
        getData(){//获取商品列表
            var _this=this;
            _this.tableData=[];
            var param={
                pageSize:_this.pageSize,
                pageIndex:_this.pageNo,
                
            }
            for(var i in _this.goods){
                if(_this.goods[i]){
                    param[i]=_this.goods[i];
                }

            }

            goodsList(param).then(function(res){
                if(res.code==200){
                    var data=res.data;
                    var list=res.data.list;
                    _this.total=data.totalCount;
                    _this.$refs.pagination.total=_this.total;
                    for(var i=0;i<list.length;i++){
                        var goodsItem=list[i];
                        var tableItem={
                            "pictUrl":goodsItem.pictUrl,
                            "itemId":goodsItem.itemId,
                            "title":goodsItem.title
                        };
                        for(var j=0;j<_this.columns.length;j++){
                            var index=_this.columns[j].prop;


                            tableItem[index]=goodsItem[index];
                        }
                      switch (tableItem.status) {
                        case -2:
                          tableItem.status = "回收站删除";
                          break;
                        case -1:
                          tableItem.status = "删除";
                          break;
                        case 0:
                          tableItem.status = "待上架";
                          break;
                        case 1:
                          tableItem.status = "已上架";
                          break;
                        case 2:
                          tableItem.status = "已下架";
                          break;
                        case 3:
                          tableItem.status = "已失效";
                          break;

                      }

                      _this.tableData.push(tableItem);
                    }
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        getCategoryListN(){
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
        queryGoods(){//查询商品
           var goods=this.goods;
          for(let key  in goods){
            if( goods[key]!==''){

              this.pageNo=1;
              this.getData();

            }

          }

            

            
        },
        handleCurrentChange(val){
            this.pageNo=val;
            this.getData();
        },
        jumpToPage(path){
            this.activeTab = path;
            this.$router.push({name:path});
        },
        putToshelf(index,row){
            var _this=this;
            //上架
            let params = {
                "itemId":row.itemId
            }
            putItemsShelf(params).then((res) =>{
                if(res.code==200){
                    _this.$message({
                        message: '上架成功',
                        type: 'success',
                        onClose:_this.getData,
                        duration:1000
                     });
                }else{
                    _this.$message.error(res.msg);
                }
            })
        },
        viewDetail(index,row){
            //查看详情
            this.$router.push({name:'goodsDetail',query:{
                "itemId":row.itemId
            }});
        },
        moveTodepot(index,row){

            var _this=this;
            
            this.$prompt('是否将改商品放入回收站', '提示', {

                confirmButtonText: '确定',
                cancelButtonText: '取消'
            
            }).then(({ value }) => {
                var param={
                    "itemId":row.itemId,
                    "desc":value
                }

                deleteGoods(param).then(function(res){
                    if(res.code==200){
                        _this.$message({
                        message: '已将商品放至回收站',
                        type: 'success',
                        onClose:_this.getData,
                        duration:1000
                     });
                    }else{
                        _this.$message.error(res.msg);
                    }
                });
            })

        },
        selectionChange(selectItems){
            this.itemIdAry=[];
            for(var i=0;i<selectItems.length;i++){
                var item=selectItems[i];
                this.itemIdAry.push(item.itemId);
            }
            

        },
        putItemsToshelf(){
            var _this=this;
            if(_this.itemIdAry.length<=0){
                this.$message.error("没有选中任何商品");
                return;
            }
            upItemList({"itemIds":_this.itemIdAry.join(",")}).then(function(res){
                
                if(res.code==200){
                    _this.$message({
                        message: '批量上架成功',
                        type: 'success',
                        onClose:_this.getData,
                        duration:1000
                     });
                }else{
                    _this.$message.error(res.msg);
                }
            });
        },
        exportGoods(){
            var _this=this;
            if(_this.itemIdAry.length<=0){
                _this.$message.error("没有选中任何商品");
                return;
            }

            this.exportIds=this.itemIdAry.join(",");
            
            this.$refs.formParams.value=this.exportIds;
           
            this.$refs.exportForm.submit();

        },
        handleChange(res){
        if(res.status=="success"){
          var code=res.response.code;
          if(code==200){
            this.$message.success("导入成功");
          }else{
            this.$message.error(res.response.msg);
          }
          
        }
        if(res.status=="error"){
          this.$message.error("导入失败");
        }
      },
    },
    components:{
        goodsTab
    }
}
</script>
<style>
    .goodsStore{
        height:100%;
    }
    .goodsStore .queryBox{  
        padding:10px 50px;
        width: 100%;
        height: 200px;
        background-color: #ffffff;
        border-radius: 4px;
    }
    .goodsStore .goodsList{   
        width: 100%;
        background-color: #ffffff;
        border-radius: 4px;
        padding:20px 45px;
    }
    /* 搜索框区域 */
    .goodsStore .queryItem{
        display: flex;
        align-items: center;
    }
    .goodsStore .el-input{
        width:auto;
    }
    .goodsStore .w30{
        width:30%
    }
    .goodsStore .pb25{
        padding-bottom:25px;
    }
    .goodsStore .w100{
        width:100px;
        padding-right:10px;
        text-align: right;
        vertical-align: middle;
    }
    .goodsStore .queryBtn{
        width: 130px;
    }
    .goodsStore .btns{
        height: 41.53px;
        border-radius: 4px;
        font-size:14px;
        line-height: 0.5
    }
    .goodsStore tr th,.goodsStore tr td{
        text-align:center;
    }
    .goodsStore .redColor{
        width:100%;
        color:#f85c5d;
        cursor: pointer;
    }
    .goodsStore .blueColor{
        width:100%;
        color:#3288ff;
        cursor: pointer;
    }
    .goodsStore .yelColor{
        width:100%;
        color:#ff8f16;
        cursor: pointer;
    }
    .goodsStore .pageFlag{
        padding-top:10px;
    }
    .goodsStore .btnsList{
        display: flex;
    }
    .goodsStore .btnsList span{
     margin-top: 10px;
    }
</style>
