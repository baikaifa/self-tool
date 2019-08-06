<template>
	<div class="labelContainer">
    <!-- 标题 -->
		<eleTit bak="true"></eleTit>
    <!--
    <div class="title">
      <i class="iconfont iconfanhui" @click="back"></i>
      <span class="baby">热门标签</span>
    </div>
    -->
    <div class="content">
      <ul>
        <li  v-for="(item,index) in list" :key="index">
          <span class="no1" v-if="item.tagId==1">{{index+1}}</span>
          <span class="no2" v-if="item.tagId==2">{{index+1}}</span>
          <span class="no3" v-if="item.tagId==3">{{index+1}}</span>
          <span class="no4" v-if="item.tagId >= 4">{{index+1}}</span>
			 <div class="line">
          <span>{{item.tagName}}</span>
          <span>
            <i class="iconfont iconremen"></i>
            <span class="hot">{{item.num}}</span>
          </span>
			 </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { caoApi } from "../../utils/request";
import eleTit from "@/components/title/title";
export default {
	components: {eleTit},
  data() {
    return {
      list: [] //标签列表数组
    };
  },
  created() {
    // this.token ="b389494d1530103054faacb890973eef3bf23bbea84523e84838fd0915ecb98d";
    this.gainLabels();
  },
  methods: {
    back() {
      console.log(1);
      this.$router.go(-1); //返回上一层
    },

    gainLabels() {
		caoApi.hotSearch().then(res => {
			if(res.code == 200) {
				this.list=res.data;
			}
		});
    }
  }
};
</script>

<style scoped="scoped" type="text/css" >
.labelContainer .title {
  /*标题*/
  width: 100%;
  height: 79px;
  position: relative;
  border-bottom: 1px solid #eeeeee;
}
.labelContainer .iconfanhui {
  	width: 19px;
	height: 33px;
  line-height: 79px;
  margin-left: 20px;
}
.labelContainer .baby {
  width: auto;
  height: 45px;
  font-family: STXihei;
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #000000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}



.labelContainer .content > ul li {
  height: 100px;
  margin-left: 30px;
width: 100%;
display: flex;
}
.labelContainer .content > ul li .line{
  border-bottom: 1px solid #eeeeee;/*no*/
  display: inline-block;
   height: 100px;
	flex:1;
	margin-left: 20px;
}
.labelContainer .content > ul li  span {
  height: 87px;
  line-height: 87px;
  font-size: 24px;

}
.labelContainer .content > ul li .line span:nth-child(1) {
  margin-left: 30px;
}
.labelContainer .content > ul li .line span:nth-child(2) {
  float: right;
  margin-right: 25px;
}
.labelContainer .no1 {
  color: #ef4454;
}
.labelContainer .no2 {
  color: #f5c348;
}
.labelContainer .no3 {
  color: #e87e43;
}
.labelContainer .no4 {
  color: #cccccc;
}
.labelContainer .hot {
  margin-left: 15px;
  color: #888888;
}
.labelContainer .iconremen {
  font-size: 24px;
  color: #e6e6e6;
  margin-left: 10px;
}
</style>

