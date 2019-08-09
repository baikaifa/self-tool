<!--我的粉丝-->
<template>
  <div>
       <eleTit bak="true"></eleTit> 
   
    <div style="height:100%" class="addattpeople">
      <!-- scroll-y="true" -->
      <div class="allDivs" >
        <div class="attentionItem" v-for="(item,index) in attentionList" :key="index" @click="goPersonalHomePage(index)" >
          <!-- bindtap='goDetail' -->
          <div class="itemleft" >
            <img :src="item.avatar==''?noAvatar:item.avatar" />
          </div>
          <div class="itemright">
            <div class="attentionTitle">
              <b class="attentionName">{{item.nickname}}</b>
            </div>
            <div class="attentionTime">{{item.time}}</div>
          </div>
        </div>
        <noMessage v-if="init && attentionList.length===0" :src="noMessageImage" title="没有更多粉丝信息"></noMessage>
        <!-- <div class="noData" v-if="attentionList.length==0">没有更多粉丝信息</div> -->
<!--          <div class="noData" ></div>-->
      </div>
    </div>
  </div>
</template>

<script>
// import noMessage from '../components/noMessage/noMessage.vue';
import noMessage from "../../components/personal/noMessage.vue";
// import noMessageImage from '../assets/noMessageImage.png';
import noMessageImage from "../../assets/img/personal/noMessageImage.png";
// import topTableBar from '../components/topTableBar/topTableBar.vue';
import topTableBar from "../../components/personal/topTableBar.vue";
// import { getMyFan } from '../api/indexOne';
import { reqPersonal } from "../../utils/request";
import eleTit from "@/components/title/title";
export default {
  name: "app",
  components: {
    noMessage,
    topTableBar,
    eleTit
  },
  data() {
    return {uids:'',
      type: Number(this.$route.params.type),
      noMessageImage,
      attentionList: [],
      //"baseUrl": app.globalData.baseUrl,
      pageNo: 1,
      pageSize: 10,
      init: false,
      noAvatar:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560152076561&di=974873034daa111801d90771bbc0870f&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D565823642%2C1943097127%26fm%3D214%26gp%3D0.jpg"
    };
  },
  created() {
    const that = this;
    this.init = false;
    this.query = this.$route.query;
    this.uids=this.query.id;
    this.getMyFan();
  },
  methods: {
    goPersonalHomePage(index){
      this.$router.push({name:"posterHomePage",params:{uid:this.attentionList[index].uid}})
    },
    goBack: function() {
      this.$router.go(-1);
    },
    getMyFan() {
      var that = this;

      let params = {
        type: 6,
        pageNo: that.pageNo,
        pageSize: that.pageSize,
        authorUid: this.uids
      };

      reqPersonal.gainMyFans(params).then(res => {
        if (res.code == 200) {
          that.attentionList = res.data;
          that.init = true;
        }
      });
    }
  }
};
</script>
<style scoped type="text/css">

.addattpeople .allDivs{/*白凯发加的样式*/
  margin-top: 20px;
  border-top: 1px solid #eeeeee;
}

.attentionContent {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  background-color: #fff;
}
.attentionItem {
  display: flex;
  align-items: center;
  font-size: 24px;
  height: 122px;
  margin: 0 20px;
}
.attentionItem .itemleft img {
  height: 78px;
  width: 78px;
  border-radius: 50%;
}
.attentionItem .itemright {
  flex-grow: 2;
  margin-left: 25px;
  height: 100%;
  font-size: 24px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.itemright .attentionTitle .attentionName {
  font-weight: bold;
  margin-right: 10px;
}
.itemright .attentionTime {
  float: right;
  color: #999999;
  font-size: 20px;
}
.noData {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-top: 50px;
  color: #999;
}
</style>
