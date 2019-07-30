<template>
	<div class="groupSearchPage">
		<eleTit></eleTit>
    <!-- 头部搜索区域 -->
		<div class="topCont">
			<!-- <i class="iconfont iconfanhui backBtn" @click="goBack"></i> -->
			<div class="rel searchCont">
				<i class="iconfont iconsousuo searchIcon"></i>
				<input type="text" v-model="keywords" placeholder class="searchBox" ref="searchBox"/>
				<i class="iconfont iconguanbi- cancleCont"></i>
			</div>	
			<span  @click="getSearchList" class="searchBtn">搜索</span>
		</div>
	<!-- 历史搜索 -->
    <div class="searchHistoryContain" v-if="historyList.length">
      <div class="title">
        <div class="titleTxt">历史搜索</div>
        <img src="../../assets/img/community/deleteIcon.png" @click="removeHistory" />
      </div>
	  <!-- 搜索记录 -->
      <div class="historyTagContain">
        <div v-for="(item,index) in historyList" :key="index" class="historyTag">{{item}}</div>
      </div>
    </div>
	 <div class="grayBar" v-if="hotSearch.length & historyList.length"></div>
	<!-- 喜乐热搜 -->
	 <div class="content"  v-if="hotSearch.length">
        <div class="titleTxt">
          喜乐热搜
     		<p class="all" @click="toTagView">
				全部
				<i class="iconfont icongengduo1"></i>
          	</p>
        </div>
		<ul class="mt30 hotList">
			<li v-for="(item,index) in hotSearch" :key="'hot'+index" class="hotItem">
				<div  :class='["Square","Square"+index]'>{{index + 1}}</div>
				<div class="words">{{item.tagName}}</div>
			</li>
		</ul>
      </div>
  </div>
</template>
<script>
import {caoApi} from "@/utils/request.js"
import eleTit from "@/components/title/title";
export default {
  data() {
    return {
      keywords: "",
      searched: false, //是否点击了搜索按钮
	  historyList: [], //历史记录的数据
	  hotSearch:[]//热搜的数据
    };
  },
	components:{
		eleTit
	},
  mounted() {
	  this.$refs.searchBox.focus();
  },
  created() {
	this.keywords = this.$route.query.wd || '';
	this.getHistory();
	this.getHotSearch();
  },
  methods: {
	getHotSearch(){
		caoApi.hotSearch().then((data)=>{
			if(data.code == 200){
				this.hotSearch = data.data.slice(0,7)
			}
		})
	},
	goBack(){
		this.$router.go(-1);
	},
	toTagView(){
		this.$router.push({name:'gongLab'});
	},
	goSearch(val) {
      console.log(this.keywords);
		if (!val) {
			val = this.keywords;
		}
      this.getSearchList();
    },
    removeHistory() {
		localStorage.removeItem("xl_post_search");
		this.historyList = [];
    },
    getSearchList() {
		if(this.keywords ==''){
			return;
		}
		this.saveHistory();
		this.$router.push({name: "gongList", query:{wd: val}});
    },
    //保存历史记录
    saveHistory() {
		this.historyList = this.historyList.slice(0,9);
		if(this.historyList.includes(this.keywords)){
			let position = this.historyList.indexOf(this.keywords);
			this.historyList.splice(position,1);
			this.historyList.unshift(this.keywords);
		}else{
			this.historyList.unshift(this.keywords);
		}
		localStorage.setItem("xl_post_search",JSON.stringify({data:this.historyList}));
    },
    //获取历史记录
    getHistory() {
		if(localStorage.getItem("xl_post_search")){
			this.historyList = JSON.parse(localStorage.getItem("xl_post_search")).data;
		}else{
			this.historyList = [];
		}
    }
  },
 
};
</script>
<style>

.groupSearchPage .grayBar{
  	width: 100%;
	height: 20px;
	background-color: #f8f8f8;
	margin:30px 0;
}
.groupSearchPage .topCont{
	height:100px;
	width:100%;
	background:#fff;
	display: flex;
  align-items: center;
  justify-content: center;
}
.groupSearchPage .backBtn{
	padding:0 16px 0 24px;
	font-size:34px;
}
.groupSearchPage .searchBox{
	width: 570px;
	height: 66px;
	background-color: #f0f0f0;
	border-radius: 33px;
	padding-left:65px;
	box-sizing: border-box;
}
.groupSearchPage .searchBtn{
	font-size: 28px;
	color: #999999;
	padding:0 20px;
}	
.groupSearchPage .rel{
	position: relative;
}
.groupSearchPage .searchIcon{
	position: absolute;
	left:20px;
	font-size:34px;
	color:#999;
}
.groupSearchPage .searchCont{
	display: flex;
	align-items: center;
}
.groupSearchPage .cancleCont{
	position: absolute;
	right:0;
	padding:0 20px;
	font-size: 28px;
	color:#999;
}
.groupSearchPage .searchHistoryContain {
  margin-top: 30px;
}

.groupSearchPage .searchHistoryContain .title {
  display: flex;
  padding-left:30px;
  justify-content: space-between;
  align-items: center;
}
.groupSearchPage .searchHistoryContain .title img {
  width: 32x;
  height: 32px;
  padding:0 30px;
}
.groupSearchPage .titleTxt {
  font-size: 28px;
  font-weight: 300;
  font-family: STXihei;
  font-weight: bold;
}

.groupSearchPage .historyTag {
  padding: 0px 38px;
  border-radius: 33px;
  background: #f8f8f8;
  height: 66px;
  line-height: 66px;
  box-sizing: border-box;
  color: #565656;
  font-size: 28px;
  margin-top:20px;
  margin-right:20px;
}
.groupSearchPage .searchHistoryContain .historyTagContain {
  display: flex;
  flex-wrap: wrap;
  padding:0 30px;
}
.groupSearchPage .content {
  margin-left: 25px;
}
.groupSearchPage .mt30{
	margin-top:40px;
}
.groupSearchPage .hotList{
	display: flex;
	flex-wrap: wrap;
}
.groupSearchPage .hotItem{
	width:50%;
	margin-bottom:20px;
	display: flex;
	align-items: center;
}





























.groupSearchPage .searchHistoryContain .title .titleTxt {
  font-size: 28px;
}




.groupSearchPage .searchPanel {
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  z-index: 99;
  background: #fff;
}

.groupSearchPage .searchPanel .searchContain {
  width: 750px;
  padding-top: 20px;
  background-color: #ffffff;
  overflow: hidden;
}

.groupSearchPage .searchPanel .backBtn {
  float: left;
  margin-top: 15px;
  margin-left: 20px;
  width: 20px;
  height: 34px;
  overflow: hidden;
  background-image: url(../../assets/img/bak.png);
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.groupSearchPage .searchPanel .searchContain .searchInputContain {
  float: left;
  margin-left: 35px;
  width: 550px;
  height: 64px;
  overflow: hidden;
  background-color: #f3f3f3;
  border-radius: 32px;
  -webkit-border-radius: 32px;
}

.groupSearchPage .searchPanel .findIcon {
  float: left;
  margin-left: 20px;
  margin-top: 16px;
  width: 32px;
  height: 32px;
  overflow: hidden;
  background-image: url(../../assets/img/search_bg.png);
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.groupSearchPage .searchPanel input {
  width: 78%;
  height: 64px;
  line-height: 64px;
  font-size: 28px;
  padding-left: 20px;
}

.groupSearchPage .searchBtn {
  float: left;
  height: 64px;
font-weight: bold;
font-family: STXihei;
  padding: 0px 20px 0 30px;
  color: #6a6a6a;
  font-size: 28px;
  display: flex;
  align-items: center;
}

.groupSearchPage .all {
  height: 23px;
  font-family: STXihei;
  font-size: 28px;
  line-height: 23px;
  letter-spacing: 2px;
  color: #999999;
  float: right;
  margin-right: 35px;
  margin-top: 10px;
}
.groupSearchPage .one {
  width: 50%;
  height: 40px;
  float: left;
  margin-top: 15px;
}
.groupSearchPage .Square {
	width: 28px;
	height: 28px;
	background-color: #d8b503;
	margin-left: 20px;
	display: inline-block;
	text-align: center;
	font-size:24px;
	color: #a4a5a9;
	margin-right:15px;
	line-height: 28px;
}
.groupSearchPage .Square0 {
  background-color: #f7e279;
}
.groupSearchPage .Square1 {
  background-color: #c8e2f8;
}
.groupSearchPage .Square2 {
  background-color: #e7cdba;
}
.groupSearchPage .Square3 {
  background-color: #e1e7ee;
}
.groupSearchPage .Square4 {
  background-color: #e1e7ee;
}
.groupSearchPage .Square5 {
  background-color: #e1e7ee;
}
.groupSearchPage .Square6 {
  background-color: #e1e7ee;
}
.groupSearchPage .Square7 {
  background-color: #e1e7ee;
}

.groupSearchPage .words {
	font-family: STXihei;
	font-size: 28px;
	letter-spacing: 2px;
	font-weight: normal;
	font-stretch: normal;
	vertical-align: bottom;
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex:1;
}
</style>


