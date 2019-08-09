<template>
	<div class="labelContainer">
    <!-- 标题 -->
		<eleTit></eleTit>
    <!--
    <div class="title">
      <i class="iconfont iconfanhui" @click="back"></i>
      <span class="baby">热门标签</span>
    </div>
    -->
    <div class="content">
      <ul class="ullist">
        <li  v-for="(item,index) in list" :key="index" @click.stop="jumpHander(item.tagName)">
          <div class="spanCenter">
          <span class="no1" v-if="index===0">{{index+1}}</span>
          <span class="no2" v-if="index===1">{{index+1}}</span>
          <span class="no3" v-if="index===2">{{index+1}}</span>
          <span class="no4" v-if="index >=3">{{index+1}}</span>
          </div>
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
    this.gainLabels();
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },

    gainLabels() {
      caoApi.hotSearch().then(res => {
        if(res.code == 200) {
          this.list=res.data;
        }
      });
    },
	jumpHander(tagName){//跳到搜索页面
		let his = [];
		if(localStorage.getItem("xl_post_search")){
			his = his.concat(JSON.parse(localStorage.getItem("xl_post_search")).data);
			his.unshift(tagName);
			localStorage.setItem("xl_post_search",JSON.stringify({data:his}));
		}else{
			localStorage.setItem("xl_post_search",JSON.stringify({data:tagName}));
		}
	 	
		this.$router.push({name: "gongList", query:{wd: tagName}});
    }
  }
};
</script>

<style scoped="scoped" type="text/css" >
.labelContainer{
  font-family: "STXihei";
}
.labelContainer .ullist{
  margin-top:20px;
  border-top:1px solid #eee;/*no*/
}
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
.labelContainer .spanCenter{
  width: 80px;
 height: 100%;
 text-align: center;
 padding-left: 10px;
}
.labelContainer .content > ul li {
  height: 100px;
  /* padding-left: 30px; */
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.labelContainer .content > ul li .line{
  border-bottom: 1px solid #eeeeee;/*no*/
  display: flex;
  height: 100%;
  flex:1;
  justify-content: space-between;
	/* margin-left: 20px; */
}
.labelContainer .content > ul li  span {
  height: 100%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.labelContainer .content > ul li .line span:nth-child(2) {
  margin-right: 25px;
  display: flex;
  align-items: center;
}
.labelContainer .no1 {
  color:  #ef4454;
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

