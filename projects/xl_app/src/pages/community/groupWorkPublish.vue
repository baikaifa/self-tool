<!-- 编辑作品 -->
<template>
    <div  class="groupWorkPublish">
        <!-- <topTableBar :name="msg" :isBack="true" @goBack="goBack" ></topTableBar> -->
		<eleTit></eleTit>
        <!-- <div class="go-back">
            <span class="go-back_img" @click="goBack"></span>
            <p class="go-back_title">发布作品</p>
        </div> -->
        <!-- 作品图片 -->
        <div class="addImg bgc">

            <!--&lt;!&ndash; 图片 &ndash;&gt;-->
            <!--<div></div> -->

            <!--&lt;!&ndash; 添加按钮 &ndash;&gt;-->
            <!--<div class="addImgs">-->
            <!--<img src="../assets/addBtn_03.jpg" @click="addImg">-->
            <!--</div>-->
            <!--            <upLoadImg @getFiles='getImageList' @removeFiles='removeImage' ref="upLoad"></upLoadImg>-->
            <div class="addImgs">
                <input id="file-input" type="file" multiple class="fileBox" ref="fileBox" accept="image/*" @change="onUpload"/>
                <label for="file-input">
                    <img src="../../assets/img/addBtn_03.jpg" class="addPhoto"/>
                </label>

            </div>
<!--            <div class="add">  </div>-->

             <div class="upImgku"  v-for="(tu,index) in showImgList" >
                        <img :src=tu class="addPhoto"  >
                        <i class="iconfont iconguanbi- cancleCont" @click="removeImage(index)"></i>
             </div>

<!--                 accept="image/jpeg,image/png" capture="camera" -->

        </div>

        <div v-if="FabuDiv"  class="fabuSureDiv" ><p>{{fabuText}}</p><button class="publishSureBtn" @click="closeFabuDiv(fabuText)">确定</button>
        </div>
        <div v-if="tostShow" class="tostDiv">{{tostText}}</div>

        <div class="message-box bgc">
            <!-- 添加标题 -->
            <div class="title">
                <input type="text" placeholder="加个标题会有更多赞哦" class="jgbt" id="postTitle" v-model="postTitle">
            </div>
            <!-- 添加内容 -->
            <div class="content bgc">
                <textarea name="" placeholder="说点什么吧......" id="postCon" v-model="postCon"></textarea>
            </div>
        </div>



        <!-- 添加标签及展示商品 -->
        <div class="bottom bgc">
            <div class="tag" style="width: 100%">
                <div class="chooseTagSpan">

                    <img src="../../assets/img/grassgrowing/tagImg.png" height="26" width="26"/>
                    <span v-if="tagName==0" id="tjbq">添加标签</span>
                    <p class="tag_div" v-if="tagName!=0">{{tagName}}</p>

                    <span @click="showTags"> <i class="iconfont " id="tianjia   ">&#xe733;</i></span>
                </div>
                <!-- 已选择的标签展示 -->
                <!--                <div class="myTag">-->
                <!--                    <div  class="tag_1" :key="">-->
                <!--                        <div class="tag_2">-->
                <!--                            {{tagName}}-->
                <!--                        </div>-->
                <!--                        <i class="iconfont iconguanbi1 tag_3" @click="cancelTag(item.tagId)" size="20px"></i>-->
                <!--                    </div>-->
                <!--                </div>-->
            </div>

        </div>  
        <button class="publish" @touchstart="sendPost">发布</button>
        <div class="labelContainer" v-show="showTag">

            <!-- <div class="line"></div> -->
            <div class="title">
                <i class="iconfont iconfanhui" @click="closeTags"></i>
                <span class="baby">热门标签</span>
            </div>

            <div class="topCont">
                <!-- <i class="iconfont iconfanhui backBtn" @click="goBack"></i> -->
                <div class="rel searchCont">
                    <i class="iconfont iconsousuo searchIcon"></i>
                    <input type="text" v-model="keywords" placeholder class="searchBox" ref="searchBox" />
                    <i class="iconfont iconguanbi- cancleCont" @click="clearAll" style="margin-top:-2px;" id="xx"></i>
                </div>
                <span  @click="getSearchList" class="searchBtn">搜索</span>
            </div>
            <!--                &lt;!&ndash; 标题 &ndash;&gt;-->
            <!--                <eleTit bak="true"></eleTit>-->



            <div class="content">
                <ul>
                    <li  v-for="(item,index) in list" :key="index"  @click="goGetTag(item)">
                        <div class="spanCenter">
                            <span class="no1" v-if="item.tagId==1" >{{index+1}}</span>
                            <span class="no2" v-if="item.tagId==2">{{index+1}}</span>
                            <span class="no3" v-if="item.tagId==3">{{index+1}}</span>
                            <span class="no4" v-if="item.tagId>=4">{{index+1}}</span>
                        </div>
                        <div class="line">
                            <span >{{item.tagName}}</span>
                            <span>
                    <i class="iconfont iconremen"></i>
                    <span class="hot">{{item.num}}</span>
                  </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>








    </div>

</template>

<script>
    //   import topTableBar from '../components/topTableBar/topTableBar.vue';
    //   import switchBtn from '../components/switchBtn/switchBtn';
    // import upLoadImg from '../../components/upLoadImg/upLoadImg';
    // import {getTypeList,sendPostData,getPostDetail} from "../api/indexOne";
    import { publishingWorks,caoApi} from "../../utils/request";
    import lrz from 'lrz'
    import eleTit from "@/components/title/title";
    //   require('../util/lrz.all.bundle');
    export default {
        name: 'app',
        data() {
            return {
                tagId:'',
                keywords: "",
                searched: false, //是否点击了搜索按钮
                historyList: [], //历史记录的数据
                hotSearch:[],//热搜的数据
                msg: '发布作品',
                showTag: false,
                showSame: false,
                ifOn: true,
                tagList: [],
                chooseList: [{
                    tagName:'虫草'
                },

                ],
                tagName:'',
                imgList: [],
                imgBottomList: [],
                CreateUserId: '',
                tostText: '',
                tostShow: false,
                FabuDiv:false,
                postTitle: '',
                postCon: '',
                postTid: '',
                list: [
                    {
                        "tagId": 2,
                        "tagName": "森女系",
                        "num": 1
                    },
                    {
                        "tagId": 2,
                        "tagName": "森女系",
                        "num": 1
                    }

                ] ,//标签列表数组
                showImgList:[],

                fabuText:'',
            }
        },
        created() {
            this.gainLabels();
            let _that = this;
            console.log(this.$route.query, '2323')
            if (this.$route.query.pageF != 1) {
                this.msg = '编辑作品'
            }
            this.CreateUserId = this.$route.query.userId;
            if (this.$route.query.tid) {
                this.postTid = this.$route.query.tid;
                this.getOnePostDetail();
            }
            // getTypeList({ token: this.token }).then(res => {
            //     if (res.code == 200) {
            //         _that.tagList = res.data.splice(1);
            //     }
            // });
        },
        mounted() {},
        components:{
            eleTit
        },
        methods: {
            upload11(){
                this.$refs.fileBox.click();


            },
            getSearchList() {
                if(this.keywords ==''){
                    return;
                }
                console.log(this.keywords)
                this.gainLabels();

            },
            onUpload(evt){
                if(evt.target.files.length == 0){
                    return;
                };
                let that = this;
                // console.log(evt.target.files.length)

                if(evt.target.files.length > 1){

                    for(let i=0;i < evt.target.files.length;i++){
                        if(i >2){
                            alert("最多只能上传3张图片");
                            break;
                        }
                        let fData = new FormData();
                        (function(){
                            var j = i;
                             lrz(evt.target.files[j],{width:600,height:600}).then((rst) =>{
                            fData.append('userid',70066);
                            fData.append('file',evt.target.files[0])
                                 const path1 = URL.createObjectURL(evt.target.files[0]);
                            publishingWorks.getImgUrl(fData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
                                if(res.result == 200){
                                    var imgname=res.info.image;
                                    const path = "http://img.xbtx.com.cn/download/"+imgname;

                                    that. showImgList.push(path1);
                                    // that. showImgList.push(path);
                                    that.imgList.push(path);


                                }

                            })
                            })
                        })(i)

                    }
                }else{

                    let fData = new FormData();

                     lrz(evt.target.files[0],{width:600,height:600}).then((rst) =>{
                    fData.append('userid',70066);
                    fData.append('file',evt.target.files[0])
                         const path1 = URL.createObjectURL(evt.target.files[0]);

                    publishingWorks.getImgUrl(fData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
                        if(res.result == 200){
                            var imgname=res.info.image;
                            const path = "http://img.xbtx.com.cn/download/"+imgname;

                            that. showImgList.push(path1);
                            // that. showImgList.push(path);

                            that.imgList.push(path);


                        }
                    })
                     })

                }

            },

            getImageList(files) {
                let _that = this;
                let data = files;
                let type = '';

                this.$nextTick(() => {
                    for (let i = 0, len = files.length; i < len; i++) {
                        let data = files[i];
                        console.log(data);
                        let fData = new FormData();
                        fData.append('uploadImg',data);

                        publishingWorks.getImgUrl(fData,{headers: {'Content-Type': 'multipart/form-data'}}).then((data) =>{
                            console.log(data);
                        })
                        //
                        // publishingWorks.getImgUrl({userid: 70066,imgUrls: data}).then(function(ret) {
                        //     console.log(ret);
                        //
                        //     _that.sendImg(ret, 1);
                        // })
                    }
                });
            },
            //删除图片
            removeImage(index) {
                var that=this
                that.showImgList.splice(index, 1);
                that.imgList.splice(index, 1);
                console.log(that.imgList.length,that.showImgList.length)
            },

            sendImg: function(ret, fro) {
                let _that = this;
                let type = '';
                if (/(jpg|jpeg)/i.test(ret.origin.type)) {
                    type = 'jpg';
                } else if (/(png)/i.test(ret.origin.type)) {
                    type = 'png';
                } else if (/(gif)/i.test(ret.origin.type)) {
                    type = 'gif';
                }
                this.$http.request({
                    url: 'http://10.4.72.38:8080/upload/imgupload',
                    method: 'post',
                    data: {
                        act: 'html5',
                        userid: this.CreateUserId,
                        type: type,
                        name: "C:\\fakepath\\" + ret.origin.name,
                        base64: ret.base64,
                        length: ret.base64Len
                    }
                }).then(res => {
                    console.log(res);
                    let data = res.data;
                    if (data.r == 200) {
                        if (fro == 1) {
                            _that.imgList.push(data.image);
                            console.log(_that.imgList, '324523423423423423423')
                        } else {
                            _that.imgBottomList.push(data.image);
                        }
                    } else {
                        if (fro == 1) {
                            this.imgList.splice(this.imgList.length, 1);
                        } else {
                            _that.imgBottomList.splice(this.imgBottomList.length, 1);
                        }
                    }
                })
            },

            getImageListOne(files) {
                let data = files;
                let _that = this;
                this.$nextTick(() => {
                    for (let i = 0, len = files.length; i < len; i++) {
                        let data = files[i];
                        publishingWorks.getImgUrl(data, { width: 1024, quality: 0.6 }).then(function(ret) {
                            console.log(ret);
                            _that.sendImg(ret, 2);
                        })
                    }

                });
            },
            removeImageOne(index) {
                this.imgBottomList.splice(index, 1);
            },

            // 添加图片
            addImg: function() {
                console.log('addImg');
            },

            // 删除图片
            cancelImg: function() {
                console.log('cancelImg');
            },

            // 弹出标签选择
            showTags: function() {
                // console.log('choose tag');
                this.gainLabels();
                // this.stop();
                this.showTag = true;
                // this.$router.push('/groupWorkPublish')
            },

            // 点击删除标签
            cancelTag: function(id) {
                // 数组删除
                this.deleteTag(id);
                // 取消已选状态
                $("#" + id).removeClass("choosed")
            },

            // 关闭标签选择
            closeTags: function() {
                this.showTag = false;
                // console.log('close tag');
                // $('.tags ').removeClass('choosed');
                // this.chooseList = [];
                // this.move();

            },

            // 选择标签
            chooseTag: function(e) {
                // 获取当前点击的元素
                // let ele = e.currentTarget;
                e.returnValue = false;
                console.log(e.target)
                if ($(e.target).hasClass("choosed")) {
                    // 如果已被选择过, 再次点击取消选中状态
                    $(e.target).removeClass("choosed");
                    this.deleteTag(e.target.id)

                } else {
                    $(e.target).addClass("choosed");
                    let tag = { tagId: e.target.id, tagName: $(e.target).text() };
                    this.chooseList.push(tag);
                }
            },

            // 标签选择完成
            chosen: function() {
                this.showTag = false;
                this.move();
            },

            // 切换是否展示商品
            changeSwitch: function() {
                this.ifOn = !this.ifOn;
                if (!this.ifOn) {
                    console.log('展示');
                    this.showSame = true;
                } else {
                    console.log('不展示');
                    this.showSame = false;
                }
            },

            /***滑动限制***/
            stop() {
                let mo = function(e) {
                    e.preventDefault();
                };
                // document.body.style.overflow = 'hidden';
                // document.addEventListener("touchmove", mo, {passive: false});//禁止页面滑动
            },
            /***取消滑动限制***/
            move() {
                let mo = function(e) {
                    e.preventDefault();
                };
                // document.body.style.overflow = 'scroll';//出现滚动条
                // document.removeEventListener("touchmove", mo, false);
            },

            // 删除数组元素
            deleteTag: function(id) {
                let index = this.chooseList.findIndex(e => {
                    return e.id == id
                });
                this.chooseList.splice(index, 1);
            },

            getOnePostDetail: function() {
                let _that = this;
                getPostDetail({
                    tid: this.postTid
                }).then(res => {
                    console.log(res, '23232')
                    if (res.code == 200) {
                        _that.imgList = res.data.imageList;
                        _that.$refs.upLoad.renderImg(res.data.imageList);
                        _that.postTitle = res.data.title;
                        _that.postCon = res.data.content;
                        _that.chooseList = res.data.tagList;
                        if (res.data.commImgList.length > 0) {
                            _that.showSame = true;
                            _that.$refs.upLoadImgOne.renderImgOne(res.data.commImgList);
                        }

                    }
                })
            },

            sendPost: function() {

                // let tagAry = [];
                let tagStr = '',
                    imgListStr = '',
                    imgBottomStr = '';
                if (this.postTitle == '') {
                    this.showTost('请填写标题');
                    return
                }
                if (this.imgList.length <= 0) {
                    console.log(this.imgList)
                    this.showTost('请上传最少一张图片');
                    return
                }
                if (this.postCon == '') {
                    this.showTost('请填写简介');
                    return
                }
                if (this.tagName=='') {
                    this.showTost('请选择标签');
                    return
                }
                // this.chooseList.map(function(item, index) {
                //     tagAry.push(item.tagId);
                //     return tagAry
                // });
                // tagStr = tagAry.join(',');
                imgListStr = this.imgList.join(',');
                imgBottomStr = this.imgBottomList.join(',');
                publishingWorks.getPublishingWorks({
                    // tid: this.postTid,
                    tid: 0,
                    title: this.postTitle,
                    content: this.postCon,
                    imgUrls: imgListStr,
                    tagIds: this.tagId,
                    commImgUrls: imgBottomStr,
                    // videoUrl: '',
                }).then(res => {
                    if (res.code == 200) {
                        console.log(res)
                        this.fabuDivfun('发布成功');
                        // this.$router.push({ path: '/personal' })
                    }else {
                        console.log(res)
                        this.fabuDivfun('发布失败1'+res.msg+res.code);
                    }
                }).catch(err=>{
                        this.fabuDivfun('发布失败2'+err.msg+err.code);


                    }
                )
            },

            goBack: function() {
                this.$router.go(-1)
            },
            showTost: function(text) {
                clearTimeout();
                this.tostText = text;
                this.tostShow = true;
                setTimeout(() => {
                    this.tostShow = false;
                }, 1500);
            },
            back() {
                console.log(1);
                this.$router.go(-1); //返回上一层
            },
            //获取标签
            gainLabels() {

                caoApi.hotSearch({keyword:this.keywords}).then(res => {
                    if(res.code == 200) {
                        this.list=res.data;
                    }
                    else {

                        console.log("获取标签失败")
                    }
                });
            },
            clearAll(){
                this.keywords='';

            },
            goGetTag(item){

                this.tagName=item.tagName
                this.tagId=item.tagId

                this.showTag = false;

            },
            closeFabuDiv(text){
                console.log(text)
                    if(text=="发布成功"){
                        this.$router.push({ path: '/personal' })


                    }
                    if (text=="发布失败1非法请求，访问令牌错误401"){
                        this.FabuDiv=false

                    }
                if (text=="发布失败2非法请求,访问令牌错误"){
                    this.FabuDiv=false

                }


            },
            fabuDivfun: function(text) {

                this.fabuText = text;
                this.FabuDiv = true;



            },


        }
    }
</script>

<style scoped type="text/css">
    .groupWorkPublish{
        height: 100vh;
        background: #fff;
        overflow: hidden;
    }
 .groupWorkPublish   .line{
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #ebebeb;
  margin-top: 20px;
}
    .groupWorkPublish  .chooseTagSpan .iconfont{
        font-size: 45px;
        position: relative;
        top: 3px;
        color: #898989;
    }
    .groupWorkPublish  #tjbq{
        position: relative;
        right: 210px;
        /*top:5%;*/
        margin:  auto 0;



    }
    .groupWorkPublish .fileBox{
        /*background: url("../../assets/img/addBtn_03.jpg");*/
        display: none;

    }

    .groupWorkPublish .tag_div{
        font-size: 30px;
        color: #5e5e5e;
        float: left;
        position: relative;
        /*right: 195px;*/
        /*margin:auto  0 80px ;*/
        margin:auto 0;
        /*left: -25%;*/
        /*padding-left: 25%;*/

    }
    .groupWorkPublish .bgc {
        background-color: #fff
    }

    .groupWorkPublish   .message-box {
        width: 100%;
        border-top: 20px solid #f1f1f1;
    }

    .groupWorkPublish .tostDiv {
        min-width: 140px;
        min-height: 35px;
        border-radius: 20px;
        z-index: 200;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 30px;
        font-size: 24px;
        /*n0*/
        background: rgba(0, 0, 0, 0.6);
        color: #ffffff;
    }

    .groupWorkPublish [data-dpr='2'] .tostDiv {
        font-size: 28px;
        /*no*/
    }

    .groupWorkPublish  [data-dpr='3'] .tostDiv {
        font-size: 42px;
        /*no*/
    }

    .groupWorkPublish  .addImg {


        border-top: 2px solid #F3F3F3;
        display: flex;
        flex-wrap: wrap;
         width: 100%;
        /*margin-top: 10px;*/
        /*margin-left: 20px;*/
        position: relative;
        float: left;
        margin-bottom: 30px;

    }

    .groupWorkPublish   .addImgs {
        position: relative;

        margin: 25px 0 25px 25px;
    }

    .groupWorkPublish .addImgs>img {
        border-radius: 12px;
        overflow: hidden;
        width: 100px;
        height: 100px;
        position: relative;
        top: 10px;
        object-fit: cover

    }

    .groupWorkPublish .iconguanbi- {
        font-size: 32px;
        position: absolute;
        top: -22px;
        right: -16px;
    }

    .groupWorkPublish  input::-webkit-input-placeholder {
        color: #9A9A9A;
    }

    .groupWorkPublish textarea::-webkit-input-placeholder {
        color: #9A9A9A;
    }

    .groupWorkPublish  .message-box .title {

        padding: 15px 0;

        margin: 30px auto 0;
        width: 90%;
    }

    .groupWorkPublish  .message-box .title>input {
        height: 32px;
        width: 100%;
        font-size: 32px;
        padding: 10px 5px;
    }

    .groupWorkPublish  .message-box .content {
        border-top: 1px solid #f1f1f1;
        padding: 26px 30px 10px 30px;
        font-size: 28px
    }

    .groupWorkPublish .content>textarea {
        width: 100%;
        height: 200px;
        border: none
    }

    .groupWorkPublish .bottom {
        position: relative;
        margin-top: 20px;
        min-height: calc(100vh - 767px);
        padding: 40px 30px 170px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .groupWorkPublish  .chooseTagSpan {
        display: flex;
        border-top: 1px solid #f7f3f5;
        /*border-bottom: 1px solid #f7f3f5;*/
        /*border-top: #5e5e5e;*/
        padding-top: 40px;
        padding-bottom: 40px;
        justify-content: space-between
    }

    .groupWorkPublish .chooseTagSpan>span:nth-child(1) {
        font-size: 30px
    }

    .groupWorkPublish .chooseTagSpan>span:nth-child(2) {
        font-size: 32px;
        color: #9d9b9b
    }

    .groupWorkPublish  .showSame {
        width: 100%;
        margin-top: 30px;
    }

    .groupWorkPublish   .showBtn {
        font-size: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .groupWorkPublish  .publish {
        position: absolute;
        border: none;
        width: 92%;
        height: 70px;
        border-radius: 10px;
        background-color: #EE4657;
        color: #fff;
        font-size: 30px;
        bottom: 60px;
        margin-left: 4%;
    }
    .groupWorkPublish .publishSureBtn {
        position: absolute;
        border: none;
        width: 70%;
        height: 70px;
        border-radius: 10px;
        background-color: #EE4657;
        color: #fff;
        font-size: 30px;
        bottom: 20px;
        margin-left: 15%;
    }

    .groupWorkPublish .chooseTag {
        z-index: 100;
        padding-top: 80px;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(38, 38, 38, 0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center
    }

    .groupWorkPublish .chooseTag img {
        width: 92%;
        height: 70%;
        position: absolute;
        top: 8%;
    }

    .groupWorkPublish .tagInner {
        width: 674px;
        height: 838px;
        /*background-image: url('../assets/bgImg.png');*/
        background-size: 674px 838px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 10%;
    }

    .groupWorkPublish .tagClose {
        width: 70px;
        height: 70px;
        line-height: 70px;
        border: 5px solid #CACACA;
        border-radius: 50%;
        text-align: center;
        margin-top: 40px;
        position: absolute;
        top: 80%;
        left: 50%;
        margin-left: -35px;

    }

    .groupWorkPublish  .close {
        color: #CACACA;
        font-size: 32px;
        margin: auto;
    }

    .groupWorkPublish  .chooseTag_1 {
        margin-top: 100px;
        font-size: 36px;
    }

    .groupWorkPublish .chooseTag_2 {
        /* background-color: pink; */
        width: 525px;
        height: 390px;
        margin-top: 100px;
        display: flex;
        /* flex-direction: column; */
        flex-wrap: wrap;
        align-content: flex-start
    }

    .groupWorkPublish .chooseTag_3 {
        background-color: #EE4657;
        font-size: 36px;
        color: #fff;
        width: 522px;
        margin-top: 50px;
        height: 80px;
        line-height: 80px;
        border-radius: 40px;
        text-align: center;
    }

    .groupWorkPublish  .tags {
        width: 159px;
        height: 60px;
        border: 2px solid #C0C0C0;
        border-radius: 30px;
        margin: 8px;
        line-height: 60px;
        text-align: center;
        font-size: 32px;
    }

    .groupWorkPublish .choosed {
        color: #fff;
        background-color: #EE4657;
        border: 2px solid #EE4657;
    }

    .groupWorkPublish .myTag {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }

    .groupWorkPublish  .tag_1 {
        margin: 10px;
        width: 150px;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F3F3F3;
        height: 60px;
        border-radius: 30px;
        color: #747474;
    }

    .groupWorkPublish .tag_3 {
        margin-left: 10px;
    }

    .groupWorkPublish .show {
        margin-top: 20px;
        font-size: 28px;
        color: #6A6A6A
    }

    .groupWorkPublish  .show>div:nth-child(2) {
        margin-top: 20px;
        color: #A0A0A0
    }

    .groupWorkPublish .bottomImg {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
    }

    .groupWorkPublish .go-back {
        position: relative;
        width: 100%;
        height: 68px;
        text-align: center;
        /* line-height: 68px; */
        background-color: #ffffff;
        border-bottom: 1px solid #f1f1f1;
    }

    .groupWorkPublish  .go-back_title {
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        color: #000000;
        margin-top: 10px;
    }

    .groupWorkPublish  .go-back_img {
        width: 68px;
        height: 100%;
        display: block;
        position: absolute;

        left: 0;
        cursor: pointer;
        margin-top: 10px;
        background-image: url('../../assets/img/bak.png');
        background-repeat: no-repeat;
        background-size: 30%;
        background-position: top center;
    }
    .groupWorkPublish .add {
        width: 60%;
        height: 220px;
        float: left;
        text-align: center;
        line-height: 220px;
        /*font-size: 1.4rem;*/
        font-weight: 100;
        cursor: pointer;
        /*border: 1px solid #ccc;*/
        color: #999;
        position: relative;
        top: 25px;
        border-radius: 5px; /*no*/
        /*background: #f2f2f2;*/
        overflow: hidden;

    }


    .groupWorkPublish  .grayBar{
        width: 100%;
        height: 20px;
        background-color: #f8f8f8;
        margin:30px 0;
    }
    .groupWorkPublish .topCont{
        height:100px;
        width:100%;
        background:#fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .groupWorkPublish  .backBtn{
        padding:0 16px 0 24px;
        font-size:34px;
    }
    .groupWorkPublish  .searchBox{
        width: 570px;
        height: 66px;
        background-color: #f0f0f0;
        border-radius: 33px;
        padding-left:65px;
        box-sizing: border-box;
        border: 0;
    }
    .groupWorkPublish  .searchBtn{
        font-size: 28px;
        color: #999999;
        padding:0 20px;
    }
    .groupWorkPublish .rel{
        position: relative;
    }
    .groupWorkPublish  .searchIcon{
        position: absolute;
        left:20px;
        font-size:34px;
        color:#999;
    }
    .groupWorkPublish .searchCont{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .groupWorkPublish .cancleCont{
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 100;



        font-size: 32px;
        color:#999;
    }
    .groupWorkPublish   .searchHistoryContain {
        margin-top: 30px;
    }

    .groupWorkPublish .searchHistoryContain .title {
        display: flex;
        padding-left:30px;
        justify-content: space-between;
        align-items: center;
    }
    .groupWorkPublish  .searchHistoryContain .title img {
        width: 32px;
        height: 32px;
        padding:0 30px;
    }
    .groupWorkPublish .titleTxt {
        font-size: 28px;
        font-weight: 300;
        font-family: STXihei;
        font-weight: bold;
    }

    .groupWorkPublish .historyTag {
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
    .groupWorkPublish  .searchHistoryContain .historyTagContain {
        display: flex;
        flex-wrap: wrap;
        padding:0 30px;
    }
    .groupWorkPublish  .content {
        margin-left: 25px;
    }
    .groupWorkPublish  .mt30{
        margin-top:40px;
    }
    .groupWorkPublish  .hotList{
        display: flex;
        flex-wrap: wrap;
    }
    .groupWorkPublish .hotItem{
        width:50%;
        margin-bottom:20px;
        display: flex;
        align-items: center;
    }
    .groupWorkPublish .image-upload > input
    {
        display: none;
    }














    .groupWorkPublish   .labelContainer  {
        width: 100%;
        position: absolute;
        top: 0;
        height: 100%;
        background: #ffffff;
        z-index: 100;
        border: 0;
    }
.groupWorkPublish   .title{
margin-top: 30px;
}

    .groupWorkPublish   .labelContainer .title {


        /*标题*/
        width: 100%;
        height: 79px;
        position: relative;
        border-bottom: 1px solid #eeeeee;
    }
    .groupWorkPublish  .labelContainer .iconfanhui {
        width: 19px;
        height: 33px;
        line-height: 79px;
        margin-left: 20px;
    }
    .groupWorkPublish   .labelContainer .baby {
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
    .groupWorkPublish  .labelContainer .spanCenter{
        width: 80px;
        height: 87px;
        line-height: 87px;
        text-align: center;
        padding-left: 10px;
    }
    .groupWorkPublish  .labelContainer .content > ul li {
        height: 100px;
        /* padding-left: 30px; */
        width: 100%;
        display: flex;
    }
    .groupWorkPublish   .labelContainer .content > ul li .line{
        border-bottom: 1px solid #eeeeee;/*no*/
        display: inline-block;
        height: 87px;
        flex:1;
        /* margin-left: 20px; */
    }
    .groupWorkPublish   .labelContainer .content > ul li  span {
        height: 87px;
        line-height: 87px;
        font-size: 24px;
    }

    .groupWorkPublish    .labelContainer .content > ul li .line span:nth-child(2) {
        float: right;
        margin-right: 25px;
    }
    .groupWorkPublish   .labelContainer .no1 {
        color: #ef4454;
    }
    .groupWorkPublish   .labelContainer .no2 {
        color: #f5c348;
    }
    .groupWorkPublish   .labelContainer .no3 {
        color: #e87e43;
    }
    .groupWorkPublish  .labelContainer .no4 {
        color: #cccccc;
    }
    .groupWorkPublish  .labelContainer .hot {
        margin-left: 15px;
        color: #888888;
    }
    .groupWorkPublish  .labelContainer .iconremen {
        font-size: 24px;
        color: #e6e6e6;
        margin-left: 10px;
    }
    .groupWorkPublish  #xx{

        position: absolute;
        top:20px;
        right: 15px;

    }
    .groupWorkPublish  .upImgku{

        position: relative;
        float: left;
        overflow:hidden;
     margin-left: 26px;
        margin-top: 25px;

    }
    .groupWorkPublish  #tianjia{

        font-size: 32px;
        position: relative;
        top: 10px
    ;
    }
    .groupWorkPublish  .addPhoto{
        width: 200px;
        height: 200px;
    }
    .groupWorkPublish  .fabuSureDiv{
        position: absolute;
        top: 450px;
        left: 25%;


        font-size: 32px;
        /*font-size: 15px;*/


        width: 400px;
        height: 200px;
        background: #fcf7fb;
        z-index: 100;
        border-radius: 5%;
    }
    .groupWorkPublish  .fabuSureDiv p{
        position: relative;
        top: 30px;
        left: 30%;
    }
    .groupWorkPublish  .jgbt{
        width: 100%;
        border: 0;
    }



</style>

