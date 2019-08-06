<template>
    <div class="goodsTopic">
        <nav class="nav">|  创建专题</nav>
        <div class="cont">
            <!-- 右侧表单 -->
            <div class="formDiv">
                <el-form :data="topicForm" class="topicForm" label-width="120px" >
                    <el-form-item label="专题类型" prop="type">
                        <el-input v-model="topicForm.type" disabled></el-input>
                    </el-form-item>
                    <div class="uploadCont">
                        <label class="uploadText">专题列表图</label>
                        <el-upload
                            required
                            :limit='1'
                            class="avatar-uploader"
                            :data="{'sid':sid}"
                            action="/special/topic/upload"
                            :show-file-list="false"
                            :on-success="uploadTopicImg"
                            :before-upload="beforeAvatarUpload">
                                <img v-if="topicImg" :src="topicImg" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <p slot="tip" class="uploadTips">注：只能上传JPG/PNG文件，且大小不超过500KB</p>
                        </el-upload>
                        <span class="removeText" @click="removeFile">删除</span>
                    </div>
                    <el-form-item label="专题名称" prop="name">
                        <el-input v-model="topicForm.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="专题显示时间" prop="time" required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="topicForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-date-picker placeholder="选择日期" v-model="topicForm.date2" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <div class="uploadCont">
                        <label class="uploadText"><span class="requireStar"></span>插入图片模板</label>
                        <el-upload
                            required
                            multiple
                            class="avatar-uploader"
                            :data="{'sid':sid}"
                            action="/special/topic/upload"
                            :show-file-list="false"
                            :on-success="uploadImgTml"
                            :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <p slot="tip" class="uploadTips">注：只能上传JPG/PNG文件，且大小不超过500KB</p>
                        </el-upload>
                    </div>
                    <div class="goodsText">商品列表设置</div>
                    <el-form-item label="背景颜色" class="textL">
                        <div class="colorBox">
                            <el-input class="colorInput"  suffix-icon="el-icon-arrow-down" @click.native="showColor"></el-input>
                            <span class="selectedCor" :style="{background:selCor}"></span>
                        </div>
                       <div class="colorCont" v-show="isShowCol">
                        <span 
                        v-for="(item,index) in colorList" 
                        :key="'corList_'+index" 
                        :style="{background:item}" 
                        class="colorItem" @click="selectColor(item)"></span>
                       </div>
                    </el-form-item>
                    <el-form-item label="配置商品" class="textL">
                       <el-button type="primary" icon="el-icon-plus" @click.native="addGoods">添加商品</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="goBack" class="btn blueBox">返回</el-button>
                        <el-button type="primary" @click="onSubmit" class="btn">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 左侧预览 -->
            <div class="priview" ref="priview">
                <!-- 图片列表 -->
                <draggable v-model="imgList" :options="{animation: 60,}"  @update="datadragEnd">
                    <div v-for="(item,index) in imgList" :key="'imgList_'+index" class="imgItem">
                        <img :src="item"  class="preTitleImg"  />
                        <span class="cancleImg" @click="cancleImg(index)"><i class="iconfont icon-guanbi-"></i></span>
                    </div>
                </draggable>
                <!-- 商品列表 -->
                <div v-for="(item,index) in goodsList" :key="'goodsList_'+index">
                    <!-- 一列商品 -->
                    <div v-if="item.type==1">
                        <div class="detail_1 wbg"  v-for="(_item,index) in item.lists" :key="'col1_'+index">
                            <img :src="_item.pictUrl" alt="">
                            <div class="d1_right">
                                <p class="d1_title">
                                    <span>{{_item.shopType }}</span>{{_item.title}}
                                </p>
                                <div class="d1_price">
                                    <p class="red">¥<span class="font34"> {{_item.zkFinalPrice}}</span></p>
                                    <p class="grey" style="padding-left: 0.3rem">原价 ¥ {{_item.reservePrice}}</p>
                                </div>
                                <div class="d1_coupon">
                                    <p class="d1_coupon1 fl">{{_item.couponAmount}}元券</p>
                                    <p class="d1_coupon2 fr">预估收益: ¥ {{_item.commission}}</p>
                                </div>
                                <div class="d1_store">{{_item.shopTitle}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 两列商品 -->
                    <div class="clearF" v-if="item.type==2">
                        <div class="detail_2 wbg fl"  v-for="(_item,index) in item.lists" :key="'col2_'+index">
                            <img :src="_item.pictUrl" alt="">
                            <div class="d2_title font28">{{_item.title}}</div>
                            <div class="d2_coupon">
                                <div class="d2_coupon1 flex">
                                    <span class="d2_coupon_t1 font20">券</span>
                                    <span class="d2_coupon_t2 font18">¥ {{_item.couponAmount}}</span>
                                </div>
                                <div class="d2_coupon2 flex">
                                    <span class="d2_coupon_t3">预估收益</span>
                                    <span class="d2_coupon_t4 red font20">{{_item.commission}}元</span>
                                </div>
                            </div>
                            <div class="d2_price flex">
                                <p class="red d2_price1 font24">¥<span class="font34">{{_item.zkFinalPrice}}</span><span class="grey d2_price2">¥ {{_item.reservePrice}}</span></p>
                                <p class="grey d2_price3 font20">已售{{_item.volume}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- 三列商品 -->
                    <div class="clearF" v-if="item.type==3">
                        <div class="detail_3 wbg fl"  v-for="(_item,index) in item.lists" :key="'col3_'+index">
                            <img :src="_item.pictUrl" alt="">
                            <div class="d3_title font28">{{_item.name}}</div>
                            <div class="red font24" style="text-align: left;padding-left:0.1rem;">券后价: ¥ {{_item.zkFinalPrice}}</div>
                            <div class="d3_coupon font20">预估收益: ¥ {{_item.commission}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹出添加商品的列表页面 -->
        <el-dialog title="商品列表" :visible.sync="dialogFormVisible" :show-close="false" :modal-append-to-body="false" width="80%">
             <section class="searchPanel">
                <div class="searchItem">
                    <div class="searchLabel pindao">显示样式</div>
                    <el-select placeholder="请选择样式" v-model="value" >
                        <el-option
                            v-for="item in styleList"
                            :key="'styList_'+item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class='groupName'>
                    <label>商品列表名称</label>
                    <el-input v-model="groupName"></el-input>
                </div>
                </section>
            <!--    查询-->
                <section class="searchPanel searchPanelBtn">
                <div class="searchItem">
                    <el-input placeholder="请输入多个商品的ID并使用“,(英文逗号)”分隔"  v-model="items"></el-input>
                </div>
                <el-button class="sureBtn" type="primary" @click="getGoodsList">添加</el-button>
                </section>
            <!--    表格-->
                <section class="roleTableCotain">

                <div class="tableContain">
                    <el-table :data="tableData" border style="width: 100%"
                            :header-cell-style="tableHeadSty">
            <!--          <el-table-column align="center" label="序号" width="30"></el-table-column>-->

                    <el-table-column align="center" prop="itemId" label="商品 ID" ></el-table-column>
                    <el-table-column align="center" prop="title" label="商品名称" width="200"></el-table-column>
                    <el-table-column align="center" prop="catLeafName" label="商品项目" ></el-table-column>
                    <el-table-column align="center" prop="zkFinalPrice" label="商品价格" ></el-table-column>
                    <el-table-column align="center" prop="commissionRate" label="佣金金额"></el-table-column>
                    <el-table-column align="center" prop="couponAmount" label="优惠券额"></el-table-column>
                    <el-table-column align="center" prop="shopTitle" label="店铺名称"></el-table-column>
                    <el-table-column align="center" label="操作" width="220">
                        <template slot-scope="scope">
                        <el-link
                            type="info"
                            size="mini"
                            class="redText pr20 font18"
                            v-if="scope.$index!=0"
                            @click="moveUp(scope.$index,scope.row)" >上移</el-link>
                        <el-link
                            type="info"
                            size="mini"
                            class="redText pr20 font18"
                            v-if="scope.$index!==(tableData.length-1)"
                            @click="moveDown(scope.$index,scope.row)">下移</el-link>
   
                        <el-link type="info" size="mini"  class="redText pr20 font18"  @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-link>

                        </template>

                    </el-table-column>
                    </el-table>
                    <el-link   class="blueText clearBtn" @click="allClean" > 清除全部</el-link>
                    <div class="tableBottom" >
                        <el-button class="sureBtn" type="primary" @click="returnHander">返回</el-button>
                        <el-button class="sureBtn" type="primary" @click="confirm">确定</el-button>
                    </div>
                </div>
                </section>

        </el-dialog>
    </div>
</template>
<script>
import { getLocalData} from "@/utils/base"
import draggable from 'vuedraggable';
import '@/assets/css/goodsTopic.css'
import {getbyitemIds,createSpecial,uploadTopicImg} from "@/api/index"
export default {
    data(){
        return {
            sid:getLocalData("hbrj_sid"),
            topicImg:'',
            topicForm:{
                type:"商品专题",
                name:'',
            },
            imgList:[ ],
            goodsList:[],
            colorList:["#FFFFFF","#FF0000","#00FF00","#0000FF","#FF00FF","#00FFFF","#FFFF00","#000000","#70DB93"," #00FF7F",
            "#5C3317","#9F5F9F","#B5A642","#D9D919","#A67D3D","#8C7853","#A67D3D","#5F9F9F","#D98719","#B87333","#4F2F4F",
            "#FF7F00","#CC3299","#D8D8BF","#99CC32","#545454","#856363","#8E2323","#DBDB70","#238E23"," #9F9F5F","#BC1717",
            "#C0D9D9","#8F8FBD","#426F42","#855E42","#FF7F00","#8FBC8F","#3299CC","#DB70DB","#BC8F8F","#23238E"
            ],
            selCor:'#FFFFFF',
            imageUrl:'',
            isShowCol:false,
            dialogFormVisible:false,
            styleList:[
                {
                value: '1',
                label: '简洁单列'
                }, {
                value: '2',
                label: '时尚双列'
                }, {
                value: '3',
                label: '摩登三列'}
            ],
            groupName:'',
            items:'',
            value:'',
            tableData:[],
        }
    },
    created() {
 
    },
    methods: {
        uploadImgTml(res, file){
            if(res.code == 200){
                this.imgList.push(res.data);
            }
        },
        datadragEnd(evt){
            console.log('拖动前的索引 :' + evt.oldIndex)
            console.log('拖动后的索引 :' + evt.newIndex)
        },
        showColor(){
            this.isShowCol = true;
        },
        cancleImg(index){//删除图片
            this.imgList.splice(index,1);
        },
        returnHander(){
            this.dialogFormVisible = false;
        },
        addGoods(){
            this.dialogFormVisible = true;
        },
        getGoodsList() {
            var  _this=this;
            let params = {
                items:this.items
            };
            if(this.items==''){
                this.$message.error('请输入商品id');
                return;
            }
            if(this.groupName==''){
                this.$message.error('请输入商品列表名称');
                return;
            }
            if(this.value==''){
                this.$message.error('请选择显示样式');
                return;
            }
            getbyitemIds(params).then((res) => {
                if (res.code == 200) {
                    _this.tableData = res.data;
                }else {
                    this.$message.error(res.msg);
                }
            })

        },
        tableHeadSty(){
            return "    background:#fbfbfb;font-weight:normal;color:#000000"
        },
          //全部清除
        allClean(){
            this.tableData.length=0;
            this.tableData=[];
            console.log(this.tableData)

        },
        goBack(){
            this.$router.go(-1)
        },
        onSubmit(){
            let that = this;
            let tplImg = this.imgList.join(',');
            let st = this.topicForm.date1.toLocaleString('chinese',{hour12:false}).replace(/\//g,'-');
            let ed =  this.topicForm.date2.toLocaleString('chinese',{hour12:false}).replace(/\//g,'-');
            let params = {
                type:1,
                name:this.topicForm.name,
                startTime:st,
                endTime:ed,
                imageUrl:this.topicImg,
                background:this.selCor,
                templateImageUrls:tplImg,
                itemIds:this.goodsList,

            }
            createSpecial(params).then((data)=>{
                console.log(data);
                if(data.code == 200){
                    that.$message({
                        message: '保存成功',
                        type: 'success',
                        duration:1000
                    })
                    that.$router.go(-1)
                }else{
                    that.$message.error(data.msg);
                }
            })
        },
        selectColor(val){
            this.selCor = val;
            this.isShowCol = false;
            this.$refs.priview.style.background=val;
        },
        uploadTopicImg(res, file){
            if(res.code == 200){
                this.topicImg = res.data;
            } 
        },
        beforeAvatarUpload(){},
        removeFile(){},
        confirm(){
            this.dialogFormVisible = false;
            this.goodsList.push({type:this.value,name:this.groupName,lists:this.tableData});
            console.log(this.goodsList);
        },
          //创建专题发送
        getCreateSpecial() {
            let params = {
                type:1,
                name:this.groupName,
                startTime:this.startTime,
                endTime:this.endTime,
                imageUrl:this.imageUrl,
                background:this.background,
                templateImageUrl:this.templateImageUrl,
                itemIds:this.itemIds
            };
            createSpecial(params).then((res) => {
                if (res.code == 200) {
                    console.log(res)
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        //删除行
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
         //上移
        moveUp(index){
            if (index > 0) {
                let upDate = this.tableData[index - 1];
                this.tableData.splice(index - 1, 1);
                this.tableData.splice(index,0, upDate);
            } else {
            }
        },
        //下移
        moveDown(index){
            if ((index + 1) === this.tableData.length){
            } else {
            // console.log(index);
                let downDate = this.tableData[index + 1];
                this.tableData.splice(index + 1, 1);
                this.tableData.splice(index,0, downDate);
            }
        },
      
    },
    components:{
        draggable
    }
}
</script>


