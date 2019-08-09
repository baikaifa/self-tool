<template>
    
    <div class="apply-cooperation">
        <eleTit bak="true">
            <div slot="app_tit_righ"><div class="gotoApplyResultBtn" @click="gotoApplyResult">申请记录</div></div>
        </eleTit>
        <div class="banner-box">
            <img src="../../assets/img/community/ac-banner@2x.png" alt="" srcset="">
        </div>
        <form class="info-box">
            <div class="info-item">
                <label for="" class="item-title">群类别：</label>
                <div class="radio-box">
                    <input type="radio" :checked="query.groupType==1" id="groupWeChart" value="1" v-model="query.groupType" name="group-type">
                    <label for="groupWeChart" class="radio-label">&nbsp;微信群</label>
                </div>
                <div class="radio-box">
                    <input type="radio" :checked="query.groupType==2" id="groupQq" value="2" v-model="query.groupType" name="group-type">
                    <label for="groupQq" class="radio-label">&nbsp;QQ群</label>
                </div>
            </div>
            <div class="info-item">
                <label class="item-title">群名称：</label>
                <input type="text" v-model="query.groupName">
    
            </div>
            <div class="info-item">
                <label class="item-title">群人数：</label>
                <input type="number" v-model="query.memberNum">
    
            </div>
            
            <div class="info-item">
                <label for="" class="item-title line-h_0">群类型：</label>
                <div class="group-type_lists">
                    <span  
                        v-for="(item, index) in groupTagLists" 
                        :class="['type-list',query.classifyType==item.type?'type-list_active':'']"
                        @click="chooseGroupType(item)"
                        :key="index">
                        {{item.name}}
                       
                    </span>
                    <span @click="showRestTag" class="listBtn" v-if="zhanKaiShow">
                        展开<i class="iconfont iconzhankai"></i>
                    </span>
                    <span @click="hideRestTag" class="listBtn" v-if="shouQiShow">
                        收起<i class="iconfont iconshouqi"></i>
                    </span>
                </div>
                
            </div>
            <div class="info-item">
                <label for="" class="item-title">群职位：</label>
                <div class="radio-box">
                    <input type="radio" id="groupBoss" v-model="query.groupOffice" name="group-position" value="2">
                    <label for="groupBoss" class="radio-label">&nbsp;群主</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="groupAdmin" v-model="query.groupOffice" name="group-position" value="4">
                    <label for="groupAdmin" class="radio-label">&nbsp;群管理</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="groupHum" v-model="query.groupOffice" name="group-position" value="1">
                    <label for="groupHum" class="radio-label">&nbsp;普通成员</label>
                </div>
            </div>
            <div class="info-item">
                <label for="" class="item-title">联系方式：</label>
                <input type="text" v-model="query.contactWay" placeholder="微信或QQ号">
            </div>
            <div class="info-item">
                <label for="" class="item-title">客服微信：</label>
                <span id="customerWechart" class="customer-wechart">skyrivus</span>
                <button type="button"
                v-clipboard:copy="'skyrivus'"
                v-clipboard:success="onCopy"
                v-clipboard:error="onCopyError"
                 class="btn btn-copy">复制</button>
            </div>
        </form>

        <div class="btn-box">
            <button type="button" class="btn sub-btn" @click="submitBtn()">申请</button>
        </div>
    </div>
</template>

<script>
import {reqGroup} from "../../utils/request";
import eleTit from "@/components/title/title";
export default {
    components: { eleTit },
    data() {
        return {
            query:{
                groupName:"",
                groupType:1,//1 wx 2 qq
                memberNum:"",
                classifyType:"",
                groupOffice:"",//1 群员 2 群主 4 管理员
                contactWay:"",
                
            },
            docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
            showHeight: document.documentElement.clientHeight,   //实时屏幕高度
            hidshow:true,  //显示或者隐藏footer 申请按钮父元素
            groupTagLists:[],
            groupTagListFirst:[],
            groupTagListRest:[],
            zhanKaiShow:false,
            shouQiShow:false
        }
    },
    created() {
        
        this.getGroupTagList();
    },
    mounted() {
        window.onresize = ()=>{
            return(()=>{
                this.showHeight = document.body.clientHeight;
            })()
        }
    },
    watch: {
        showHeight: function() {
            if(this.docmHeight > this.showHeight){
                this.hidshow=false
            }else{
                this.hidshow=true
            }
        }
    },
    methods: {
        wxQQCheck(val){
            var wxReg=/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
            var qqReg=/^[1-9]\d{4,9}$/;
            var phoneRes=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var isPhone=phoneRes.test(val);
            var isWx=wxReg.test(val);
            var isQQ=qqReg.test(val);
            if(isWx||isQQ||isPhone){
                return true;
            }else{
                return false;
            }
        },
        numCheck(val){
            var numCheckReg=/^[1-9]\d*$/;
            return numCheckReg.test(val);
        },
        showRestTag(){
            this.zhanKaiShow=false;
            this.shouQiShow=true;
            this.groupTagLists=this.groupTagListFirst.concat(this.groupTagListRest);
        },
        hideRestTag(){
            this.zhanKaiShow=true;
            this.shouQiShow=false;
            this.groupTagLists=this.groupTagListFirst;
        },
        onCopy(val){
            alert("已复制客服微信："+val.text+"到剪切板");
        },
        onCopyError(){
            alert("微信号复制失败")
        },
        
        submitBtn: function(){
            console.log(JSON.stringify(this.query));
            if(!this.query.groupName){
                alert("请填写群名称");
                return;
            }
            if(!this.numCheck(this.query.memberNum)){
                alert("请填写正确的群人数（正整数）");
                return;
            }
            if(!this.query.classifyType){
                alert("请选择群类型");
                return;
            }
            if(!this.query.groupOffice){
                alert("请选择群职位");
                return;
            }
            if(!this.wxQQCheck(this.query.contactWay)){
                alert("请填写正确的联系方式-微信号或QQ号");
                return;
            }

            reqGroup.applyCooperation(this.query).then(res=>{
               if(res.code==200){
                   alert("申请成功！");
                   this.$router.push({
                       name:"applyResult"
                   });
                   this.query={
                       groupName:"",
                    groupType:1,//1 wx 2 qq
                    memberNum:"",
                    classifyType:"",
                    groupOffice:"",//1 群员 2 群主 4 管理员
                    contactWay:""
                   }
               }else{
                   alert(res.message);
               }
            });
        },
        // 获取tag列表
        getGroupTagList(){ 
            reqGroup.groupTagList().then((res)=>{
                if(res.code==200){
                    
                    this.groupTagListFirst=res.data.slice(0,9);
                    this.groupTagListRest=res.data.slice(10)
                    this.groupTagLists=this.groupTagListFirst;     
                    if(res.data.length>10){
                        this.zhanKaiShow=true;
                    }
                }else{
                    alert(res.message);
                }
            });
        },
        chooseGroupType(item){ //classifyType
            this.query.classifyType=item.type;
        },
        gotoApplyResult(){
            this.$router.push({
                       name:"applyResult"
                   });
                   this.query={
                       groupName:"",
                    groupType:1,//1 wx 2 qq
                    memberNum:"",
                    classifyType:"",
                    groupOffice:"",//1 群员 2 群主 4 管理员
                    contactWay:""
                   }
        }
    },
    
}
</script>

<style type="text/css">
.apply-cooperation {
    /* background: #f4f5f7; */
    height: 100vh;
    background-color: #fff;
    
}

.apply-cooperation .marginDiv{
    height:200px;
}

.apply-cooperation .gotoApplyResultBtn{
    font-size: 28px;
    color:#ef4454;
}

.apply-cooperation div.app_head div.tit_bar {
    background-color: #fff;
    z-index: 9999;
}

.apply-cooperation .app_head .tit_bar_cont .side_left{
    margin-left:-20px;
}

.apply-cooperation .app_head .tit_bar_cont .tit_tit{
   flex:16; 
   margin-left:35px;
}

.apply-cooperation .app_head .tit_bar_cont .side_righ{
    margin-right:25px;
    margin-top:22px;
}

.apply-cooperation .banner-box {
    display: flex;
    height: auto;
    width: auto;
    padding: 15px 10px 0 10px;
}

.apply-cooperation .banner-box>img {
    width: 100%;
    height: 330px;
}

.apply-cooperation .info-box {
    width: auto;
    height: auto;
    padding: 0 25px;
}

.apply-cooperation .info-box .info-item {
    display: flex;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
}

.apply-cooperation .info-item .item-title {
    width: 170px;
    height: 70px;
    text-align: left;
    line-height: 70px;
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    /* text-align: justify;
        text-align-last: justify; */
    color: #666666;
}

.apply-cooperation .radio-box {
    height: 70px;
    line-height: 70px;
    margin-right: 30px;
}

.apply-cooperation .radio-label {
    /* font-size: 10px; */
    color: #999999;
    font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
}

.apply-cooperation .customer-wechart {
    min-width: 100px;
    width: auto;
    /* max-width: 440px; */
    height: 70px;
    padding: 0 15px 0 0;
    line-height: 70px;
	font-size: 28px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #999999;
}

.apply-cooperation .btn-copy {
    width: 120px;
    height: 50px;
    font-size: 28px;
    line-height: 50px;
    margin-top: 10px;
    background-color: #ef4454;
    border: #ef4454 solid 1px;
    border-radius: 25px;
    color: #fff
}

.apply-cooperation .btn-box {
    /*position: fixed;
    bottom: 30px;
   
    left: 30px;
    right: 30px;*/
    width: calc(100% - 60px);
    margin:0 auto;
    box-sizing: border-box;
    overflow:hidden;

}

/* .btn-group {
    width: 100%;
    padding: 30px 30px;
} */
.apply-cooperation .sub-btn{
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 32px;
    font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #fffefe;
    background-color: #ef4454;
    border: 1px solid #ef4454;
	border-radius: 10px;
}

.apply-cooperation .group-type_lists{
    width: 70%;
    height: auto;
    display: flex;
    display: -webkit-flex;
    /* justify-content: space-between; */
    flex-direction: row;
    flex-wrap: wrap;
}
.apply-cooperation .type-list,.listBtn{
    font-size: 24px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 10px 24px;
    border-radius: 4px;
	border: solid 2px #cccccc;
    font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
    color: #9b9b9b;
    cursor: pointer;
}

.apply-cooperation .type-list_active {
    color: #ef4454 !important;
    background-color: #ffe5e7 !important;
	border-radius: 4px;
	border: solid 2px #f15564 !important;

}

/* 元素级样式及表单元素美化 */
.apply-cooperation .line-h_0{
    line-height: 38px !important; 
}

.apply-cooperation input[type="text"], .apply-cooperation input[type="number"]{
    width: 470px;
    height: 70px;
    font-size: 32px;
    padding: 0 15px;
    color: #000;
    line-height: 70px;
    border: solid 2px #bcbcbc;
    border-radius: 4px;
    /* border-radius: 4px; */
}

.apply-cooperation .radio-box input[type="radio"] {
    position: absolute;
    opacity: 0;
}

.apply-cooperation .radio-label {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #b4b4b4;
}

.apply-cooperation .radio-box input[type="radio"]+.radio-label:before {
    content: "\e655";
    /* background: #f4f4f4; */
    /* border-radius: 100%; */
    /* border: 1px solid #b4b4b4; */
    display: inline-block;
    width: 32px;
    height: 0px;
    position: relative;
    top: -35px;
    /* margin-right: 5px; */
    vertical-align: middle;
    cursor: pointer;
    text-align: center;
    -webkit-transition: all 250ms ease;
    transition: all 250ms ease;
}

.apply-cooperation .radio-box input[type="radio"]:checked+.radio-label:before {
    /* background-color: #ef4454; */
    color: #ef4454;
    content: "\e654";
    /* box-shadow: inset 0 0 0 4px #f4f4f4; */
}

.apply-cooperation .radio-box input[type="radio"]:focus+.radio-label:before {
    outline: none;
    /* border-color: #ef4454; */
    color: #ef4454;
    content: "\e654";
}

.apply-cooperation .radio-box input[type="radio"]:disabled+.radio-label:before {
    /* box-shadow: inset 0 0 0 4px #f4f4f4;
    border-color: #b4b4b4;
    background: #b4b4b4; */
    color: #b4b4b4;
    content: "\e655";
}

.apply-cooperation .radio-box input[type="radio"]+.radio-label:empty:before {
    margin-right: 0;
}

.apply-cooperation .mb-200{
    margin-bottom: 200px !important;
}
</style>
