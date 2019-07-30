<template>
    <div class="shareView">
        <backBtn pageName="创建分享" :type="type" :params="backParams"></backBtn>
        <div class="saveMoney" v-if="false">
            <i class="iconfont icon-jinqian"></i>
            <span>立省：</span>
            <span>￥{{saveMoney}}</span>
        </div>
        <div class="goodsInfo">
            <p class="goodsTitle">{{goodsTitle}}</p>
            <p><span>【原价】 ￥</span><span>{{oldPrice}}</span></p>
            <p><span>【券后价】 ￥</span><span>{{cutPrice}}</span></p>
            <p v-if="isShowProfit"><span>【自购立省】 ￥</span><span>{{saveMoney}}</span></p>
            <div class="dotlin"></div>
            <p>复制这条（{{taoCode}}）</p>
            <p>进入淘宝即可抢购</p>
        </div>
        <div class="showProfit">
            <span class="fontgray">
                <i :class="['iconfont icon-xuanzhong',isShowProfit?'blue':'']" @click="ShowProfitHandler"></i>
                显示收益</span>
            <span class="copyToken"   
                v-clipboard:copy="message"
    　　        v-clipboard:success="onCopy"
                v-clipboard:error="onError">复制淘口令</span>
        </div>
        <div class="grayBar"></div>
        <!-- 图片区域 -->
        <div class="imgZone">
            <div class="shareBigImg" v-if="bigImg" @click="enlargeImg('big')">
                <img :src="bigImg" />
                <span @click.stop="selectBtnHander('big')" class="selectBtn fontgray">
                    <i :class="['iconfont icon-xuanzhong',isSelectedBigImg?'blue':'']"></i>
                </span>
            </div>
            <div class="imgList" >
                <div v-for="(item,index) in imgList" :key="index" @click="enlargeImg(index)">
                    <img :src="item" />
                    <span class="selectBtn fontgray" :data-key="index" @click.stop="selectBtnHander(index)">
                        <i :class="['iconfont icon-xuanzhong',isSelected[index]?'blue':'']"></i>
                    </span>
                </div> 
            </div>
        </div>
        <div class="bottomBar">
            <span class="shareImg"  @click="shareImg">分享图片</span>
            <span class="copyTaoCode" @click="shareTaoCode">分享淘口令</span>
        </div>
           <!--放大图片 -->
        <div class="lookImg" @click="reduceImg" v-if="isShowMask">
            <img :src="largeImg" class="largeImg"/>
            <div @click.stop="saveToAlbum(largeImg)" class="saveImgBtn">保存到相册</div>
        </div>
         <!-- 遮罩 -->
        <div class="mask" v-if="isShowMask" @click="reduceImg">
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import backBtn from "@/components/backBtn"
import {shareGoods} from "@/api/index"
import { getLocalData } from "@/utils/store"
import "@/assets/css/shareGoods.css"
export default {
    data(){
        return {
            itemId:'',
            saveMoney:'',
            goodsTitle:'',
            oldPrice:'',//原价
            cutPrice:'',//折后价
            taoCode:'',
            imgList:[],
            isSelected:[],
            isShowProfit:true,
            bigImg:'',
            isSelectedBigImg:true,
            isShowMask:false,
            largeImg:'',
            message:'',
            isShowPath:false,
            couponAmount:0,
            type:'',
            backParams:{},
            mainImg:''
        }
    },
    created() {
        this.itemId = this.$route.query.itemId;
        this.type = this.$route.query.type;
        this.backParams = {itemId:this.itemId};
        if(this.$route.query.data) {
            this.backParams = $.extend({},this.backParams,this.$route.query.data)
        }
        console.log(this.backParams);
        this.getData();
    },
    mounted() {
        
    },
    methods: {
        saveToAlbum(url){//保存图片到相册
            if(_this.$phoneType=="android"){
                window.SealsDiary.savePhoto(url);
            }else if(_this.$phoneType == 'ios'){
                window.webkit.messageHandlers.savePhoto.postMessage(url);           
            }

        },
        shareImg(){//分享图片
            let imgUrl = '';
            if(!this.isSelectedBigImg && !this.isSelected.includes(true)){
                this.$toast("请选择要分享的图片");
                return;
            } 
            if(this.isSelectedBigImg){
                imgUrl = this.bigImg;
            }else{
                let position = this.isSelected.indexOf(true);
                imgUrl = this.imgList[position];
            } 

            if(this.$phoneType == 'android'){
                window.SealsDiary.getShareAction(null,null,imgUrl,null,1);
            }else if(this.$phoneType == "ios"){
                window.webkit.messageHandlers.getShareAction.postMessage({title:null,detailUrl:null,imgUrl:imgUrl,desc:null,type:0});
            }
        },
        shareTaoCode(){//点击分享淘口令
            let title= this.goodsTitle;
            let showProfit =this.isShowProfit ? 1:0; 
            let articleUrl = `http://118.144.88.219:9999/share?showProfit=${showProfit}&itemId=${this.itemId}&token=${this.token}`;
            let imgUrl = this.mainImg;
            let quan = this.couponAmount ? `领${this.couponAmount}元优惠券` : '';
            let desc = `原价:￥${ this.oldPrice},${quan},实付:￥${this.cutPrice},并还有额外优惠等你拿，快行动吧~`;
           if(this.$phoneType == 'android'){     
                window.SealsDiary.getShareAction(title,articleUrl,imgUrl,desc,2);             
            }else if(this.$phoneType == "ios"){
                window.webkit.messageHandlers.getShareAction.postMessage({title:title,detailUrl:articleUrl,imgUrl:imgUrl,desc:desc,type:1});
            }

        },
        reduceImg(){
            this.isShowMask = false;
            this.largeImg = '';
            document.body.style.overflow = 'auto';
        },
        onError(){
            this.$toast("复制出错");
        },
        onCopy(){
            this.$toast("复制成功");
        },
        enlargeImg(index){
            this.isShowMask = !this.isShowMask;
            document.body.style.height = '100vh';
            document.body.style.overflow = 'hidden';
            if(this.isShowMask){
                if(index == 'big'){
                    this.largeImg = this.bigImg;   
                }else{
                    let img = this.imgList[index];
                    this.largeImg = img;
                }  
            }else{
                this.largeImg = '';
            }
        },
        getData(){
            let sid = getLocalData('hbxj_sid');
            let params = {
                sid:sid,
                itemId:this.itemId
                // itemId:'593720101078',
                // sid:'test1999'
            };
            shareGoods(params).then(data =>{
                let arr = [];let imgList = [];
                let len = data.data.itemDescList.length;
                this.oldPrice = data.data.reservePrice;
                this.cutPrice = data.data.zkFinalPrice;
                this.goodsTitle = data.data.title;
                this.taoCode = data.data.token;
                imgList = arr.concat(data.data.itemDescList);
                this.saveMoney = data.data.commission;
                this.bigImg = data.data.sharePictUrl;
                this.isSelected = Array.from({length:len},(v,k) => false);
                this.message = data.data.token;
                this.couponAmount = data.data.couponAmount;
                this.imgList = imgList.slice(0,5);
                this.mainImg = data.data.pictUrl;
            })
        },
        ShowProfitHandler(){
            this.isShowProfit = !this.isShowProfit;
        },
        selectBtnHander(index){
            if(this.isSelected.includes(true)){
                let position = this.isSelected.indexOf(true);
                if(index !== position){
                    this.isSelected[position] = false;  
                }
            }
            if(index == "big"){
                this.isSelectedBigImg = !this.isSelectedBigImg;
            }else{
                this.isSelectedBigImg = false;
                let val = !this.isSelected[index];
                this.isSelected.splice(index,1,val);
            }
        },
        getBase64Image(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            var dataURL = canvas.toDataURL();
            return dataURL;
        },
        fnGetExtension(imgSrc) {
  
            //文件扩展名的正则表达式
            var fileExtension= imgSrc.split('.').pop();
            return fileExtension
        }
    },
    components:{
        backBtn
    }
}
</script>