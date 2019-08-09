<template>
  <div class="detailView">
    <!-- 商品信息 -->
    <div class="goodsInfo">
      <div class="infoItem">
        <span>商品品类</span>
        <span>{{formdata.catName}}</span>
      </div>
      <div class="infoItem">
        <span>商品名称</span>
        <input type="textarea" class="myInput" v-model="formdata.title" disabled />
        <!-- <label>{{formdata.title}}</label> -->
      </div>
      <div class="infoItem">
        <span>商品ID</span>
        <input type="text" v-model="formdata.itemId" disabled />
      </div>
      <div class="infoItem">
        <span>商品状态</span>
        <input type="text" v-model="formdata.status" disabled />
      </div>
      <div class="infoItem">
        <span>店铺名称</span>
        <input type="text" v-model="formdata.shopTitle" disabled />
      </div>
      <div class="infoItem">
        <span>店铺ID</span>
        <input type="text" v-model="formdata.shopId" disabled />
      </div>
      <div class="infoItem">
        <span>店铺类型</span>
        <input type="text" v-model="formdata.shopType" disabled />
      </div>
      <div class="infoItem">
        <span>店铺头像</span>
        <img :src="formdata.shopPictUrl" class="shopImg" />
      </div>
      <div class="infoItem">
        <span>商品主图</span>
        <!-- <img :src="formdata.pictUrl" class="mainImg" /> -->
        <img :src="smallImgList[0]" class="mainImg" />
      </div>
      <div class="infoItem">
        <span>商品详情</span>
        <div class="imgList">
          <!-- <img v-for="(imgSrc,index) in smallImgList" :src='imgSrc' :key="index" /> -->
          <!-- carousel轮播图 -->
          <template>
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="(item,index) in smallImgList" :key="index">
                <h3 class="medium">
                  <img :src="item" alt />
                </h3>
              </el-carousel-item>
            </el-carousel>
          </template>
          <!-- carousel轮播图 -->
        </div>
      </div>
    </div>
    <!-- 规格信息 -->
    <div class="formatInfo">
      <nav class="subnav">
        <span class="blue">|</span>规格信息
      </nav>
      <div class="infoItem">
        <span>商品规格</span>
        <div>
          <el-radio v-model="formdata.specification" label="1" disabled>单规格</el-radio>
          <el-radio v-model="formdata.specification" label="2" disabled>多规格</el-radio>
        </div>
      </div>
      <div class="infoItem">
        <span>优惠券面额</span>
        <input type="text" v-model="formdata.couponInfo" disabled />
        <span class="pf20">元</span>
      </div>
      <div class="infoItem">
        <span>原价</span>
        <input type="text" v-model="formdata.reservePrice" disabled />
        <span class="pf20">元</span>
      </div>
      <div class="infoItem">
        <span>券后价</span>
        <input type="text" v-model="formdata.postCouponPrice" disabled />
        <span class="pf20">元</span>
      </div>
      <div class="infoItem">
        <span>佣金率</span>
        <input type="text" v-model="formdata.commissionRate" disabled />
      </div>
      <div class="infoItem" style="display:none;">
        <span>可售库存</span>
        <input type="text" disabled />
      </div>
    </div>
    <div class="bottomBtns">
      <el-button type="primary" class="btn" @click="goBack">返回</el-button>
      <el-button v-if="formdata.status!=='已上架'" class="btn blueBox">上架</el-button>
    </div>
  </div>
</template>
<script>
import { goodsDetail, pullDetail } from "@/api/index";
export default {
  data() {
    return {
      formdata: {
        catName: "",
        title: "",
        itemId: "",
        status: "",
        shopId: "",
        shopTitle: "",
        shopType: "",
        shopPictUrl: "",
        pictUrl: "",
        postCouponPrice: "",
        reservePrice: "",
        commissionRate: "",
        couponInfo: "",
        specification:''
      },
      smallImgList: [],
      itemId: "",
    };
  },
  props: {
    upBtnShow: {
      value: false,
      type: Boolean
    },
    table: {
      type: Function
    }
  },
  created() {
    this.itemId = this.$route.query.itemId;
    this.getGoodsDetail();
    //  console.log(this.$parent.table().itemId)
  },
  methods: {
    getGoodsDetail() {
      var _this = this;
      var param = {};
      let toFun;
      if (this.$parent.table().itemId) {
        param["itemId"] = this.$parent.table().itemId;
      } else {
        param["itemId"] = this.itemId;
      }

      goodsDetail(param).then(function(res) {
        if (res.code == 200) {
          var data = res.data;
          for (var i in _this.formdata) {
            _this.formdata[i] = data[i];
          }
          console.log(_this.formdata.status);
          //data.smallImages="https://img.alicdn.com/bao/uploaded/i4/2455044325/O1CN01LBd6u61hotWH61QfG_!!0-item_pic.jpg,https://img.alicdn.com/bao/uploaded/i4/2455044325/O1CN01LBd6u61hotWH61QfG_!!0-item_pic.jpg,https://img.alicdn.com/bao/uploaded/i4/2455044325/O1CN01LBd6u61hotWH61QfG_!!0-item_pic.jpg"
          switch (_this.formdata.status) {
            case -2:
              _this.formdata.status = "回收站删除";
              break;
            case -1:
              _this.formdata.status = "删除";
              break;
            case 0:
              _this.formdata.status = "待上架";
              break;
            case 1:
              _this.formdata.status = "已上架";
              break;
            case 2:
              _this.formdata.status = "已下架";
              break;
            case 3:
              _this.formdata.status = "已失效";
              break;
          }
          var smallImages = data.smallImages.split(",");
          for (var i = 0; i < smallImages.length; i++) {
            _this.smallImgList.push(smallImages[i]);
          }
        } else {
          _this.$message.error(res.msg);
        }
      });
      // if(formdata.status=='待上架'){
      //
      //
      // }
    },

    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.detailView .goodsInfo {
  text-align: left;
  height: 937px;
  background: #fff;
  padding-left: 50px;
}
.detailView .myInput {
  width: 450px;
  height: 32px;
  background-color: #eceff4;
  border-radius: 4px;
  padding: 0px 10px;
}
.detailView input {
  width: 281px;
  height: 32px;
  background-color: #eceff4;
  border-radius: 4px;
  padding: 0px 10px;
}
.detailView .infoItem {
  display: flex;
  padding: 15px 0;
}
.detailView .infoItem > span:first-child {
  width: 100px;
  text-align: right;
  margin-right: 50px;
}
.detailView .shopImg {
  height: 80px;
  width: 80px;
  border-radius: 4px;
}
.detailView .mainImg {
  height: 120px;
  width: 120px;
  border-radius: 4px;
}
.detailView .imgList {
  width: 480px;
  border-radius: 4px;
  border: dotted 1px #cecece;
  overflow: auto;
}

.detailView .imgList img {
  width: 100px;
  height: 100px;
  margin: 20px 20px;
}
/* 规格信息 */
.detailView .formatInfo {
  margin-top: 20px;
  padding-left: 50px;
  height: 425px;
  background-color: #ffffff;
  border-radius: 0px 4px 4px 4px;
}
.detailView .subnav {
  height: 40px;
  text-align: left;
  padding-left: 50px;
  background: #fff;
  color: #333;
  font-size: 16px;
  line-height: 40px;
}
.detailView .bottomBtns {
  padding: 25px 0;
}
.detailView .bottomBtns .btn {
  width: 130px;
  height: 32px;
  border-radius: 4px;
  line-height: 0.5;
}
/* 轮播图样式 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 轮播图样式 */
</style>
