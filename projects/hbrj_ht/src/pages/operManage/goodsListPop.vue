<template>
  <section class="goodsListPop">
    <nav class="nav">| 商品列表</nav>
   



  </section>
</template>
<script>
  import {getbyitemIds,createSpecial} from "@/api/index"
  import {getLocalData} from "@/utils/base"

  export default {
    data() {
      return {
        items:'',
        tableData: [],
        SplicingitemIds:'',//拼接商品ID
        value:'',
        options: [{
          value: 'one',
          label: '简洁单列'
        }, {
          value: 'two',
          label: '时尚双列'
        }, {
          value: 'three',
          label: '摩登三列'
        }],
        type:'',
        name:'',
        startTime:'',
        endTime:'',
        imageUrl:'',
        background:'',
        templateImageUrl:'',
        itemIds:'',
      };
    },
    created() {
    },
    methods: {
      //获取商品列表
      getGoodsList() {
        var  _this=this;
        let params = {
          sid: getLocalData('hbrj_uid'),
          items:_this.items

        };
        getbyitemIds(params).then((res) => {
          if (res.code == 200) {
            _this.tableData = res.data;
            console.log(_this.tableData)


          }else {
            this.$message.error(res.msg);
          }
        })

      },
      //创建专题发送
      getCreateSpecial() {
        var  _this=this;
        let params = {
          sid: getLocalData('hbrj_uid'),
          type:_this.type,
          name:_this.name,
          startTime:_this.startTime,
          endTime:_this.endTime,
          imageUrl:_this.imageUrl,
          background:_this.background,
          templateImageUrl:_this.templateImageUrl,
          itemIds:_this.itemIds,

        };
        createSpecial(params).then((res) => {
          if (res.code == 200) {
            console.log(res)


          }else {
            this.$message.error(res.msg);
          }
        })

      },
      //返回
      goBack(){
        this.$router.push({name:'advertSite'});
      },
      //确认
      confirm(){
        this.SplicingitemIds='';
        for (var i=0;i<this.tableData.length;i++) {
          this.SplicingitemIds += this.tableData[i].itemId+',';
        }
        this.itemIds={ [this.value] :this.SplicingitemIds};

        if(this.value==''|| this.tableData.length==0){
          this.$message.error('请选择显示样式');
          this.$message.error('请添加商品');
        }else {

            this.getCreateSpecial()

        }

        // console.log(this.itemIds);


      },
      //删除行
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      //全部清除
      allClean(){
        this.tableData.length=0;
        this.tableData=[];
        console.log(this.tableData)

      },
      //上移
      moveUp(index){
        var that = this;
        // console.log('上移',index,row);
        // console.log(that.tableData[index]);
        if (index > 0) {
          let upDate = that.tableData[index - 1];
          that.tableData.splice(index - 1, 1);
          that.tableData.splice(index,0, upDate);
        } else {
        }
      },
      //下移
      moveDown(index){
        var that = this;
        // console.log('下移',index,row);
        if ((index + 1) === that.tableData.length){
        } else {
          // console.log(index);
          let downDate = that.tableData[index + 1];
          that.tableData.splice(index + 1, 1);
          that.tableData.splice(index,0, downDate);
        }
      },
      tableHeadSty(){
        return "    background:#fbfbfb;font-weight:normal;color:#000000"
      },

    }
  };
</script>
<style>
  .goodsListPop {
    height: 100%;
    position: relative;
  }

  .goodsListPop .searchPanel {
    height: 50px;
    font-size: 14px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 20px;
  }

  .goodsListPop .searchPanel .searchItem {
    display: flex;
    margin-left: 20px;
  }

  .goodsListPop .searchPanel .searchItem .searchLabel {
    width: 56px;
    text-align: right;
    height: 32px;
    line-height: 32px;
  }
  .goodsListPop .searchPanel .searchItem .searchLabel1 {
    width: 130px;
    text-align: right;
    height: 32px;
    line-height: 32px;
  }
  .goodsListPop .searchPanel .searchItem .searchInput {
    margin-left: 20px;
    max-width: 220px;
  }
  .goodsListPop .searchPanel .searchBtn {
    width: 126px;
    height: 32px;
    line-height: 0;
  }
  .goodsListPop  .sureBtn {
    width: 126px;
    height: 32px;
    line-height: 0;
    margin-right: 50px;
  }
  .goodsListPop  .pindao {
    margin-right: 20px;
  }


  .goodsListPop  .el-date-editor .el-range__icon {
    line-height: 0;
  }
  .goodsListPop  .el-date-editor .el-range-separator {
    line-height: 25px;
  }
  .goodsListPop  .ban_dis_tim {
    margin-left: -43px;
  }
  .goodsListPop .roleTableCotain {
    margin-top: 20px;
    background: #fff;
  }

  .goodsListPop .roleTableCotain .tableTitle {
    height: 76px;
    line-height: 76px;
    padding: 0 40px;
    /* display: flex; */
    /* justify-content:flex-start; */
    /* align-items: center; */
    max-width: 900px;
    text-align: left;
  }

  .goodsListPop .roleTableCotain .tableTitle .btn_addNewRole {
    height: 32px;
    line-height: 0;
    color:#409EFF;
    border:1px solid #409EFF;
  }

  .goodsListPop .roleTableCotain .tableContain {
    max-width: 900px;
    padding: 0 40px;
  }


  .goodsListPop .roleTableCotain .tableContain {
    max-width: 1547px;
    height: 520px;
  }

  .goodsListPop .searchPanelBtn .el-input__inner{

    width: 500px;
  }

  .goodsListPop  .el-input__inner {
    margin-right: 20px;
  }
  .goodsListPop  .el-link.el-link--default {

    color: #3288ff;
    font-size: 16px;
  }
  .goodsListPop  .tableBottom{
    width: 400px;
   margin-top: 50px;
    margin-left: 800px;
  }
  .goodsListPop  .clearBtn{
    margin-top: 50px;
    margin-right: 1300px;
  }
</style>

