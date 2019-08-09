<!--我的关注-->
<template>
  <div>
    <!-- <topTableBar name="我的关注" :isBack="true" @goBack="goBack" ></topTableBar> -->
    <eleTit bak="true"></eleTit>
    <div style="height:100%">
      <!-- scroll-y="true"-->
      <div class="addattpeople">
        <div class="currpeoplelist" v-for="(item,index) in attentionList" :key="index" @click="goPersonalHomePage(index)">
          <!-- v-for-index="idx" v-for-item="item" v-key="idx"-->
          <div class="img" >
            <img :src="item.avatar==''?noAvatar:item.avatar" />
          </div>
          <div class="msg">
            <div class="nickname">{{item.nickname}}</div>
            <div class="myAttenTopFan">{{item.topicNum}}作品 · {{item.fansNum}}关注</div>

            <div>
              <span class="currtype" v-for="(typeitem,idx) in item.tagNameList" :key="idx">#{{typeitem}}#</span>
              <!--v-for-index="idx" v-for-item="typeitem" v-key="idx"-->
              <!-- <text v-if="{{item.tagNameList.length>=3}}" style="color:rgb(101, 131, 230);">···</text> -->
            </div>
          </div>
          <div class="btn">
            <span :id="item.uid" class="btntxt">已关注</span>
          </div>
          <!-- <div class="btn" v-if="item.isFollow == 1">
            <span :id="item.uid" class="btntxt" @click="removeConcerns(item.uid,index)">{{clicktxt}}</span>
            bindtap='attention'  data-id="{{item.id}}" data-index="{{idx}}"
          </div>-->
          <div class="btn" v-if="item.isFollow == 0">
            <b :id="item.uid" class="btntxt redColor" @click="addAtt(item.uid,index)">关注</b>
            bindtap='attention' data-id="{{item.id}}" data-index="{{idx}}"
          </div>
        </div>
        <!-- <div class="noData" v-if="{{attentionList.length==0}}">没有更多粉丝信息</div> -->
        <isDelete v-if="this.deleteTrigger" title="确认不再关注" @cancelDelete="confirmDelete"></isDelete>
      </div>
      <noMessage v-if="isNone > 1" :src="noMessageImage" title="还没有关注任何人哦"></noMessage>
<!--      <div class="noData" >没有更多关注信息</div>-->
    </div>
  </div>
</template>

<script>
import eleTit from "@/components/title/title";
import isDelete from "../../components/personal/isDelete.vue";
import noMessage from "../../components/personal/noMessage.vue";
import noMessageImage from "../../assets/img/personal/noMessageImage.png";
// import { getMyAttention , indexFollow } from '../../api/indexOne';
import topTableBar from "../../components/personal/topTableBar.vue";
import { reqPersonal } from "../../utils/request";
export default {
  name: "app",
  components: {
    noMessage,
    isDelete,
    topTableBar,
    eleTit
  },
  data() {
    return {
      uids:'',
      type: Number(this.$route.params.type),
      noMessageImage,
      deleteTrigger: false, //是否调取删除弹层
      deleteId: -1,

      attentionList: [],
      //{ "uid": 2202057431,time:'123', "nickname": "2070", "topicNum": 2, "fansNum": 3, "avatar": "http://img.xbtx.com.cn/download/wechatmsg/userAvatar/default/userAvatar.png" }],
      // "baseUrl": app.globalData.baseUrl,
      pageNo: 1,
      pageSize: 10,
      clicktxt: "已关注",
      idx: "",
      isNone: 1,
      noAvatar:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560152076561&di=974873034daa111801d90771bbc0870f&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D565823642%2C1943097127%26fm%3D214%26gp%3D0.jpg"
    };
  },
  methods: {
    goPersonalHomePage(index){
      this.$router.push({name:"posterHomePage",params:{uid:this.attentionList[index].uid}})

    },
    indexFollow1() {
      //第一个indexFollow 两个indexFollow参数不一样
     var _that=this
      let params = {
        authorUid: this.uids,
        type: 1
      };
      reqPersonal.indexFollows(params).then(res => {
        if (res.code == 200) {
          // let data = _that.attentionList[_that.index];
          // _that.$set(data,"isFollow", 0);
          _that.$data.deleteTrigger = false;
          _that.attentionList[_that.idx].isFollow = 0;
        }
        //that.attentionList = res.data
      });
    },
    indexFollow2() {
      var _that=this
      let params = {
        type: 0,
        authorUid: this.uids,
      };
      reqPersonal.indexFollows(params).then(res => {
        if (res.code == 200) {
          _that.attentionList[_that.idx].isFollow = 1;
        }
        //that.attentionList = res.data
      });
    },
    getMyAttention() {
      //进来先调用这个
      let params = {
        type: 5,
        authorUid: this.uids
      };
      reqPersonal.getYourAttention(params).then(res => {
        if (res.code==200){
          this.attentionList = res.data;

          if (res.data.length <= 0 && this.pageNo <= 1) {
            this.isNone = 2;
          }
        }else {
          alert(res.msg)
        }

      });
    },
    goBack: function() {
      this.$router.go(-1);
    },
    removeConcerns(id, index) {
      this.$data.deleteTrigger = true;
      this.$data.deleteId = id;
      this.idx = index;
    },
    confirmDelete(val) {
      let _that = this;
      if (val) {
        this.indexFollow1();
      }
    },
    addAtt: function() {
      let _that = this;
      if (this.$data.deleteId) {
        this.indexFollow2();
      }
    }
  },
  created() {
	const that = this;

 this.query = this.$route.query;
 this.uids=this.query.id;
    this.getMyAttention();

  }
};
</script>
<style  scoped="scoped">
body {
  height: 100vh;
}

.addattpeople .scrollTitleCon {
  width: 100vw;
  white-space: nowrap;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.addattpeople .currscrollTitleCon {
  display: inline-block;
  padding: 0 35px;
  text-align: center;
  font-size: 30px;
  color: #999999;
  line-height: 68px;
}

.addattpeople .attentiontitle {
  font-size: 30px;
  height: 70px;
  line-height: 70px;
  box-sizing: border-box;
  padding-left: 35px;
}

.addattpeople .currpeoplelist {
  height: 160px;
  width: calc(100vw - 70px);
  display: flex;
  border-bottom: 1px solid #e9e9e8;
  margin: 0 auto;
  align-items: center;
  margin-top: 20px;
}

.addattpeople .currpeoplelist:first-child {
  border-top: 1px solid #e9e9e8;
}
.addattpeople .currpeoplelist .img {
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
}
.addattpeople .currpeoplelist img {
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
.addattpeople .currpeoplelist .msg {
  flex: 1;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding-left: 20px;
}
.addattpeople .currpeoplelist .msg .currtype {
  color: #6583e6;
  width: 120px;
  height: 39px;
  background-color: #f0f2f1;
  border-radius: 50px;
  margin-right: 10px;
  font-size: 24px;
  display: inline-block;
  text-align: center;
  line-height: 39px;
}
.addattpeople .currpeoplelist .btn {
  width: 116px;
  height: 100%;
  display: flex;
  align-items: center;
}
.addattpeople .currpeoplelist .btn .btntxt {
  width: 114px;
  height: 48px;
  border: 1px solid #999999; /*no*/
  text-align: center;
  font-size: 24px;
  border-radius: 50px;
  line-height: 48px;
  color: #999999;
}
.addattpeople .currpeoplelist .btn .noclick {
  border: 1px solid #ff314a;
  color: #ff314a;
}
.addattpeople .currpeoplelist .btn .hasclick {
  border: 1px solid #dadada;
  color: #dadada;
}
.addattpeople .nickname {
  font-size: 28px;
  color: #343434;
  font-weight: bold;
}

.addattpeople .currpeoplelist .btn .redColor {
  border-color: #ff2741;
  color: #ff2741;
}

/* .addattpeople .currscrollTitleCon:active{
  color: #ef4454;
} */
.noData {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-top: 50px;
  color: #999;
}

.myAttenTopFan {
  font-size: 13px;
  /*no*/
  color: #999;
}

[data-dpr="2"] .myAttenTopFan {
  font-size: 26px;
  /*no*/
}

[data-dpr="3"] .myAttenTopFan {
  font-size: 39px;
  /*no*/
}
</style>
