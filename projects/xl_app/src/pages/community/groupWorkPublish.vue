<!-- 编辑作品 -->
<template>
    <div style="height: 100vh;background: #fff">
        <!-- <topTableBar :name="msg" :isBack="true" @goBack="goBack" ></topTableBar> -->
        <div class="go-back">
            <span class="go-back_img"></span>
            <span class="go-back_title">发布作品</span>
        </div>
        <!-- 作品图片 -->
        <div class="addImg bgc">
            <!--&lt;!&ndash; 图片 &ndash;&gt;-->
            <!--<div></div> -->
    
            <!--&lt;!&ndash; 添加按钮 &ndash;&gt;-->
            <!--<div class="addImgs">-->
            <!--<img src="../assets/addBtn_03.jpg" @click="addImg">-->
            <!--</div>-->
            <upLoadImg @getFiles='getImageList' @removeFiles='removeImage' ref="upLoad"></upLoadImg>
        </div>
        <div class="message-box bgc">
            <!-- 添加标题 -->
            <div class="title">
                <input type="text" placeholder="加标题会有更多赞哦" style="width: 100%" id="postTitle" v-model="postTitle">
            </div>
            <!-- 添加内容 -->
            <div class="content bgc">
                <textarea name="" placeholder="说点什么吧......" id="postCon" v-model="postCon"></textarea>
            </div>
        </div>
    
        
        
        <!-- 添加标签及展示商品 -->
        <div class="bottom bgc">
            <!-- 添加标签 -->
            <div class="tag" style="width: 100%">
                <div class="chooseTagSpan">
                    <span>添加标签</span>
                    <span @click="showTags">添加</span>
                </div>
                <!-- 已选择的标签展示 -->
                <div class="myTag">
                    <div v-for="item in chooseList" class="tag_1" :key="">
                        <div class="tag_2">
                            {{item.tagName}}
                        </div>
                        <i class="iconfont iconguanbi1 tag_3" @click="cancelTag(item.tagId)" size="20px"></i>
                    </div>
                </div>
            </div>
            <!-- 选择标签弹层 -->
            <div class="chooseTag" v-show="showTag">
                <img src="../../assets/img/bgImg.png" alt="">
                <div class="tagInner">
                    <div class="chooseTag_1">请选择标签</div>
                    <!-- 标签 -->
                    <div class="chooseTag_2">
                        <div v-for="(item, index) in tagList" class="tags" :key="index" :id="item.goodsId" @click.stop="chooseTag($event)">
                            {{item.goodsKind}}
                        </div>
                    </div>
                    <div class="chooseTag_3" @click.stop="chosen">完成</div>
                </div>
                <div class="tagClose" @click="closeTags">
                    <i class="iconfont iconguanbi1 close"></i>
                </div>
            </div>
            <!-- 展示同款商品 -->
            <div class="showSame" style="width: 100%">
                <div class="showBtn">
                    <div>展示同款商品</div>
                    <switchBtn :ifOn="ifOn" @click.native="changeSwitch"></switchBtn>
                </div>
                <!-- 选择展示 -->
                <div class="show" v-show="showSame">
                    <div>请上传想要推荐商品的图片</div>
                    <div>
                        注：</br>
                        1、一个商品只需上传一张图片</br>
                        2、最多可上传9张图片
                    </div>
                    <div class="bottomImg">
                        <!-- 图片 -->
                        <!--<div></div>-->
    
                        <!--&lt;!&ndash; 添加按钮 &ndash;&gt;-->
                        <!--<div class="addImgs">-->
                        <!--<img src="../assets/addBtn_03.jpg" @click="addImg">-->
                        <!--</div>-->
                        <upLoadImg @getFiles='getImageListOne' @removeFiles='removeImageOne' ref="upLoadImgOne"></upLoadImg>
                    </div>
                </div>
            </div>
            <button class="publish" @touchstart="sendPost">发布</button>
        </div>
        <div class="tostDiv" v-if="tostShow">
            <span>{{tostText}}</span>
        </div>
    </div>
</template>

<script>
//   import topTableBar from '../components/topTableBar/topTableBar.vue';
//   import switchBtn from '../components/switchBtn/switchBtn';
import upLoadImg from '../../components/upLoadImg/upLoadImg';
//   import {getTypeList,sendPostData,getPostDetail} from "../api/indexOne";

//   require('../util/lrz.all.bundle');
export default {
    name: 'app',
    components: {
        //   topTableBar,
        //   switchBtn,
        upLoadImg
    },
    data() {
        return {
            msg: '发布作品',
            showTag: false,
            showSame: false,
            ifOn: true,
            tagList: [],
            chooseList: [],
            imgList: [],
            imgBottomList: [],
            CreateUserId: '',
            tostText: '',
            tostShow: false,
            postTitle: '',
            postCon: '',
            postTid: '',
        }
    },
    created() {
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
        getTypeList({ token: this.token }).then(res => {
            if (res.code == 200) {
                _that.tagList = res.data.splice(1);
            }
        });
    },
    mounted() {},
    methods: {

        getImageList(files) {
            let _that = this;
            let data = files;
            let type = '';

            this.$nextTick(() => {
                for (let i = 0, len = files.length; i < len; i++) {
                    let data = files[i];
                    lrz(data, { width: 1024, quality: 0.6 }).then(function(ret) {
                        console.log(ret);
                        _that.sendImg(ret, 1);
                    })
                }
            });
        },
        //删除图片
        removeImage(index) {
            this.imgList.splice(index, 1);
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
                url: 'http://img.xbtx.com.cn/upload/imgupload',
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
                    lrz(data, { width: 1024, quality: 0.6 }).then(function(ret) {
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
            console.log('choose tag');
            this.stop();
            this.showTag = true;
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
            console.log('close tag');
            $('.tags ').removeClass('choosed');
            this.chooseList = [];
            this.move();
            this.showTag = false;
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
                token: this.token,
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
            let tagAry = [];
            let tagStr = '',
                imgListStr = '',
                imgBottomStr = '';
            if (this.postTitle == '') {
                this.showTost('请填写标题');
                return
            }
            if (this.imgList.length <= 0) {
                this.showTost('请上传最少一张图片');
                return
            }
            if (this.postCon == '') {
                this.showTost('请填写简介');
                return
            }
            if (this.chooseList.length <= 0) {
                this.showTost('请选择标签');
                return
            }
            this.chooseList.map(function(item, index) {
                tagAry.push(item.tagId);
                return tagAry
            });
            tagStr = tagAry.join(',');
            imgListStr = this.imgList.join(',');
            imgBottomStr = this.imgBottomList.join(',');
            sendPostData({
                token: this.token,
                tid: this.postTid,
                title: this.postTitle,
                content: this.postCon,
                imgUrls: imgListStr,
                tagIds: tagStr,
                commImgUrls: imgBottomStr,
                videoUrl: '',
            }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.showTost('发布成功');
                    this.$router.push({ path: '/myWorksList' })
                }
            })
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
        }
    }
}
</script>

<style scoped type="text/css">
.bgc {
    background-color: #fff
}

.message-box {
    width: 100%;
    border-top: 20px solid #f1f1f1;
}

.tostDiv {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 30px;
    font-size: 14px;
    /*n0*/
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
}

[data-dpr='2'] .tostDiv {
    font-size: 28px;
    /*no*/
}

[data-dpr='3'] .tostDiv {
    font-size: 42px;
    /*no*/
}

.addImg {
    border-top: 2px solid #F3F3F3;
    display: flex;
    flex-wrap: wrap;
    /* width: 99%; */
    padding: 40px 0 40px 35px;
}

.addImgs {
    position: relative;
    margin: 0 26px 26px 0;
}

.addImgs>img {
    border-radius: 12px;
    overflow: hidden;
    width: 200px;
    height: 200px;
    object-fit: cover
}

.iconguanbi- {
    font-size: 32px;
    position: absolute;
    top: -22px;
    right: -16px;
}

input::-webkit-input-placeholder {
    color: #9A9A9A;
}

textarea::-webkit-input-placeholder {
    color: #9A9A9A;
}

.message-box .title {
    padding: 40px 0;
    margin: 0 auto;
    width: 90%;
}

.message-box .title>input {
    height: 32px;
    width: 100%;
    font-size: 32px;
    padding: 10px 5px;
}

.message-box .content {
    border-top: 1px solid #f1f1f1;
    padding: 26px 30px 10px 30px;
    font-size: 28px
}

.content>textarea {
    width: 100%;
    height: 200px;
    border: none
}

.bottom {
    position: relative;
    margin-top: 20px;
    min-height: calc(100vh - 767px);
    padding: 40px 30px 170px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chooseTagSpan {
    display: flex;
    justify-content: space-between
}

.chooseTagSpan>span:nth-child(1) {
    font-size: 30px
}

.chooseTagSpan>span:nth-child(2) {
    font-size: 28px;
    color: #E45471
}

.showSame {
    width: 100%;
    margin-top: 30px;
}

.showBtn {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.publish {
    position: absolute;
    border: none;
    width: 92%;
    height: 70px;
    border-radius: 10px;
    background-color: #EE4657;
    color: #fff;
    font-size: 30px;
    bottom: 60px;
}

.chooseTag {
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

.chooseTag img {
    width: 92%;
    height: 70%;
    position: absolute;
    top: 8%;
}

.tagInner {
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

.tagClose {
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

.close {
    color: #CACACA;
    font-size: 32px;
    margin: auto;
}

.chooseTag_1 {
    margin-top: 100px;
    font-size: 36px;
}

.chooseTag_2 {
    /* background-color: pink; */
    width: 525px;
    height: 390px;
    margin-top: 100px;
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    align-content: flex-start
}

.chooseTag_3 {
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

.tags {
    width: 159px;
    height: 60px;
    border: 2px solid #C0C0C0;
    border-radius: 30px;
    margin: 8px;
    line-height: 60px;
    text-align: center;
    font-size: 32px;
}

.choosed {
    color: #fff;
    background-color: #EE4657;
    border: 2px solid #EE4657;
}

.myTag {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}

.tag_1 {
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

.tag_3 {
    margin-left: 10px;
}

.show {
    margin-top: 20px;
    font-size: 28px;
    color: #6A6A6A
}

.show>div:nth-child(2) {
    margin-top: 20px;
    color: #A0A0A0
}

.bottomImg {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
}

.go-back {
    position: relative;
    width: 100%;
    height: 68px;
    text-align: center;
    /* line-height: 68px; */
    background-color: #ffffff;
    border-bottom: 1px solid #f1f1f1;
}

.go-back_title {
    font-size: 36px;
    font-weight: normal;
    font-stretch: normal;
    color: #000000;
}

.go-back_img {
    width: 68px;
    height: 100%;
    display: block;
    position: absolute;
    top: 4px;
    left: 0;
    cursor: pointer;
    background-image: url('../../assets/img/bak.png');
    background-repeat: no-repeat;
    background-size: 30%;
    background-position: top center;
}
</style>
