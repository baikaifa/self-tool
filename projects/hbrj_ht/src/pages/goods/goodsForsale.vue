<template>
    <section class="goodsForsalePage">
        
        <nav class="nav">| 在售商品管理</nav>
        <section class="searchPanel">
            <section class="searchPanel_up">
                <div class="searchItem">
                    <div class="searchLabel">商品Id：</div>
                    <el-input v-model="searchQuery.itemId" class="searchInput"></el-input>
                </div>
                <div class="searchItem">
                    <div class="searchLabel">商品类目：</div>
                     <el-select class="searchInput" v-model="searchQuery.catName" placeholder="请选择">
                        <el-option
                        v-for="item in categoryList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    
                </div>
                <div class="searchItem">
                    <div class="searchLabel">上架时间：</div>
                    <el-date-picker
                    v-model="searchQuery.onShelvesDate"
                    class="searchTimeInput"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                </div>
            </section>
            <section class="searchPanel_down">
                <div class="searchItem" style="flex:3">
                    <div class="searchLabel">置顶时间：</div>
                    <el-date-picker
                      :picker-options="pickerOptions"
                    v-model="searchQuery.sortStartDate"
                    class="searchTimeInput"
                    type="date"
                    placeholder="选择日期时间">
                    </el-date-picker>
                  <el-col class="line" :span="1">-</el-col>
                  <el-date-picker
                    v-model="searchQuery.sortEndDate"
                    :picker-options="pickerOptions"

                    class="searchTimeInput"
                    type="date"
                    placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                
                <div class="searchItem" style="flex:1">
                    <el-button class="searchBtn" @click="getGoodsOnSaleList" type="primary">查询</el-button>
                </div>
            </section>
        </section>
        <section class="goodsForsaleTableCotain">
            <div class="btnsList textL mb">
                <span>将选中的商品&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
                <el-button @click="downItemListFun" class="btns" type="primary"><i class="iconfont icon-Import mr5"></i>批量下架</el-button>
                <el-button class="btns" @click="getExportOnSaleItemList" type="primary"><i class="iconfont icon-daochu mr5"></i>导出</el-button>
            </div>
            <div class="tableContain">
                <el-table
                @selection-change="selectionChange"
                :data="tableData"
                border
               width="100%">

                    <el-table-column
                    align="center"
                    type="selection"
                    width="40">
                    </el-table-column>

                    <el-table-column
                    align="center"
                    type="index"
                    label="序号"
                    width="50">
                    </el-table-column>
                  <el-table-column>

                  </el-table-column>
                    <el-table-column v-for="(item,index) in titleList"  :prop="item.prop"
                    :label="item.name"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="roleId"
                    align="center"
                    label="操作">
                        <template slot-scope="scope">
                            <el-link @click="editToTop(scope.$index, scope.row)" style="display:block;" type="primary">编辑置顶</el-link>
                            <el-link @click="detailView(scope.$index, scope.row)" style="display:block;" type="danger">查看详情</el-link>
                            <el-link @click="noShelfGoods(scope.$index, scope.row)" style="display:block;" type="danger">下架商品</el-link>
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
      <el-dialog

        title="编辑置顶"
        :visible.sync="dialogVisible"
         width="30%"
        :before-close="handleClose">
        <div class="editDiv">
          <el-form  class="topicForm" label-width="120px" label-position="right" :model="list" >

            <el-form-item label="置顶排序:"  >
              <el-col :span="11">
                <el-input v-model="list.sort" placeholder="请输入整数"  ></el-input>
              </el-col>
              <br>
              <br>

            </el-form-item>


            <el-form-item label="置顶时间:" >
              <el-col :span="11">
                <el-form-item prop="startTime" >
                  <el-date-picker type="datetime" placeholder="开始时间" v-model="list.sortEndDate"  value-format="	yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endTime"  >
                  <el-date-picker type="datetime" placeholder="结束时间" v-model="list.sortStartDate" value-format="	yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
              </el-col>

            </el-form-item>

          </el-form>



        </div>

    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="getEditTop">确 定</el-button>

      </el-dialog>
      <form action='item/exportOnSaleItemList' style="display:none;" method="get" ref="exportForm">

        <input type="text" id='sid' name ="sid" v-model="sid" >
        <input type="text" id='params' name ="params" ref="formParams" v-model="exportIds" >

        <input type="submit" text="导出">

      </form>

        
    </section>
</template>
<script>

import {goodsOnSaleList,
  getCategoryList,
  offShellGoods,downItemList,editSortTop,exportOnSaleItemList} from "@/api/index"
import {getLocalData} from "@/utils/base"
import axios from "axios"



export default {
    data(){
        return{
            pageNo:1,
            pageSize:5,
            total:0,
            tableData:[],
            categoryList:[],
            searchQuery:{
                itemId:"",
                catName:"",
                catLeafName:"",
                onShelvesDate:"",
                sortStartDate:"",
                sortEndDate:""
            },

            titleList:[
                {name:'商品ID',prop:"itemId"},
                {name:'商品名称',prop:"title"},
                {name:'所属类目',prop:"catName"},
                {name:'店铺名称',prop:"shopTitle"},
                {name:'商品价格',prop:"reservePrice"},
                {name:'佣金金额',prop:"couponAmount"},
                {name:'上架时间',prop:"updateTimeStr"},
                {name:'置顶状态',prop:"sortStatus"},
                {name:'置顶时间',prop:"sortStartTimeStr"},

            ],
            pickerOptions: {
            disabledDate(time) {
              return time.getTime() >Date.now() ;
            }
          },
            dialogVisible:false,
            list:{
              itemId:'',
              sortStartDate:'',
              sortEndDate:'',
              sort:'',
              sid:'',
            },

          sid:getLocalData('hbrj_uid')
         ,
          exportIds:'',
          itemIdAry:[],

          // catNamedAry:[],
          // catLeafNameAry:[],
          // onShelvesDateAry:[],
          // sortStartDateAry:[],
          // sortEndDateAry:[],


        }
    },
    created(){
        this.getCategoryList();
       this.getGoodsOnSaleList();

    },
    methods:{
        getGoodsOnSaleList(){
            var _this=this;
            _this.tableData=[];
            var param={
                pageNo:_this.pageNo,
                pageSize:_this.pageSize
            }
            for(var i in _this.searchQuery){
                if(_this.searchQuery[i]){
                    param[i]=_this.searchQuery[i];
                }
            }
            goodsOnSaleList(param).then(function(res){
                if(res.code==200){
                    var data=res.data;
                    var list=data.list;
                    _this.total=data.totalCount;
                    _this.$refs.pagination.total=_this.total;
                    for(var i=0;i<list.length;i++){
                        var goodsItem={};
                        for(var j=0;j<_this.titleList.length;j++){
                            var prop=_this.titleList[j].prop;
                            goodsItem[prop]=list[i][prop];
                        }
                        _this.tableData.push(goodsItem);
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
            this.getGoodsOnSaleList();
        },
        editToTop(index){

         this.itemId=this.tableData[index].itemId;


          this.dialogVisible = true;
          // this.getEditTop(itemId);

        },
         getEditTop(){
          this.dialogVisible = false;

          var _this=this;
           let params = {
             sid: getLocalData('hbrj_uid'),
             itemId: this.itemId,
             sortStartDate:  this.list.sortStartDate,
             sortEndDate:  this.list.sortEndDate,
             sort:  this.list.sort,

           };
           editSortTop(params).then((res) => {
             if (res.code == 200) {
               this.$message({

                 message: '置顶成功',
                 type: 'success'
               })


             }else {
               this.$message.error(res.msg);

             }
           })


        },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        detailView(index,goodsItem){
            this.$router.push({
                name:"goodsDetail",
                query:{
                    "itemId":goodsItem.itemId
                }
            })
        },
        noShelfGoods(index,goodsItem){
            var _this=this;
            offShellGoods({"itemId":goodsItem.itemId}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '商品已下架',
                        type: 'success',
                        onClose:_this.getGoodsOnSaleList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
        },
        selectionChange(selectItems){
            this.itemIdAry=[];
            // console.log(selectItems)
            for(var i=0;i<selectItems.length;i++){
                var item=selectItems[i];
              this.itemIdAry.push(item.itemId);
              // this.catNamedAry.push(item.catName);
              // this.catLeafNameAry.push(item.catLeafName);
              // this.onShelvesDateAry.push(item.onShelvesTimeStr);
              // this.sortStartDateAry.push(item.sortStartTimeStr);
              // this.sortEndDateAry.push(item.sortEndTimeStr);

            }



        },
        downItemListFun(){
            var _this=this;
            if(_this.itemIdAry.length<=0){
                this.$message.error("没有选中任何商品");
                return;
            }
            downItemList({"itemIds":_this.itemIdAry.join(",")}).then(function(res){
                if(res.code==200){
                        _this.$message({
                        message: '商品已下架',
                        type: 'success',
                        onClose:_this.getGoodsOnSaleList,
                        duration:1000
                     });
                }else{
                        _this.$message.error(res.msg);
                }
            });
        },
        getExportOnSaleItemList(){

          var _this=this;
          if(_this.itemIdAry.length<=0){
            _this.$message.error("没有选中任何商品");
            return;
          }
          this.exportIds=this.itemIdAry.join(",");
          let params = {
            sid: getLocalData('hbrj_uid'),
            itemId: this.exportIds,
          };
          exportOnSaleItemList(params).then( res =>{


              //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型

              let blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=GBK'});
              console.log(blob)

              let downloadElement = document.createElement('a');

              let href = window.URL.createObjectURL(blob);

              downloadElement.href = href;

              downloadElement.download = '在线商品表.xls';　　　　　　　　　　// xxx.xls/xxx.xlsx

              document.body.appendChild(downloadElement);

              downloadElement.click();

              document.body.removeChild(downloadElement);

              window.URL.revokeObjectURL(href);
            // const fileName = '测试表格123.xls';
            // if ('download' in document.createElement('a')) { // 非IE下载
            //   const blob = new Blob([res], {type: 'application/ms-excel',
            //     encoding:"gbk"});
            //   const elink = document.createElement('a');
            //   elink.download = fileName;
            //   elink.style.display = 'none';
            //   elink.href = URL.createObjectURL(blob);
            //   document.body.appendChild(elink);
            //   elink.click();
            //   URL.revokeObjectURL(elink.href); // 释放URL 对象
            //   document.body.removeChild(elink);
            // }



          })
            .catch( err => {
              this.$message.error('服务器连接错误！');
            });








        },
          Exccc (Vue, options){


        Vue.prototype.downloadFile =function(data){
          if (!data) {
            return
          }
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'excel1111.xlsx')
          document.body.appendChild(link)
          link.click()
        };
      },





    }

}
</script>
<style>
    .goodsForsalePage .searchPanel{
        height: 100px;
        font-size: 14px;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
    }

    .goodsForsalePage .searchPanel .searchPanel_up{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: flex-end;
        padding-bottom: 5px;
    }
    .goodsForsalePage .searchPanel .searchPanel_down{
        width: 100%;
        height: 50px;
        display: flex;
        padding-top: 5px;
    }

    .goodsForsalePage .searchPanel_up .searchItem{
        display: flex;
        margin-left: 20px;
        flex:1;
    }

     .goodsForsalePage .searchPanel .searchItem{
        display: flex;
        margin-left: 20px;
    }

    .goodsForsalePage .searchPanel .searchItem .searchLabel{
       
        text-align: right;
        height: 32px;
        line-height: 32px;
        
    }
    .goodsForsalePage .searchPanel .searchItem  .searchInput{
        
        margin-left: 20px;
        max-width: 220px;
    }

    .goodsForsalePage .searchPanel .searchItem  .searchTimeInput{
        
        
        max-width: 200px;
    }


    .goodsForsalePage  .searchBtn{
            margin: 0 50px;
            width: 126px;
            height: 32px;
            line-height: 0px;
    }

    .goodsForsalePage .goodsForsaleTableCotain{
        margin-top:20px;
        background: #fff;
        

    }

    .goodsForsalePage .goodsForsaleTableCotain .tableTitle{
        height: 76px;
        line-height: 76px;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      
    }

    
    .goodsForsalePage .goodsForsaleTableCotain .tableTitle .btn_addNewRole{height: 32px;line-height: 0;}

    .goodsForsalePage .goodsForsaleTableCotain .tableContain{padding: 0 40px;}

    .goodsForsalePage .paginationContain{padding: 20px 0;}
    
    .goodsForsalePage .btnsList{padding:0 40px;padding-top:20px;}
  .editDiv{

  height: 200px;
  }
    
</style>


