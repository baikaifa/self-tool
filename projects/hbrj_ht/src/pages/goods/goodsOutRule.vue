<template>
    <div class="goodsOut">
        <!-- 头部切换tab -->
        <goodsTab :activeTab="'goodsOutRule'"/>
        <div class="checkContain">
            <div class="title">拉取规则</div>
            <el-checkbox class="cbox" @change="checkeAllFun" v-model="checkAll">全选</el-checkbox>
        </div>
        <div class="checkContain">
            <div class="title"></div>
            <el-checkbox-group v-model="weekAry">
                <el-checkbox v-for="(item,index) in weekTxtAry" :key="index" :label="item.value" :checked="item.checked" >{{item.txt}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="checkContain">
            <div class="title">拉取条件</div>
            <el-select v-model="condition" placeholder="请选择">
                <el-option
                v-for="item in pullConditionAry"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="checkContain">
            <div class="title">拉取时间</div>
            <el-time-picker
            v-model="time"
            :default-value="initTime"
             :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
            }"
            placeholder="选择时间">
            </el-time-picker>
            <el-button class="btn" type="primary" @click="subFun">提交</el-button>
        </div>
    </div>
</template>
<script>
import {addPullTask} from "@/api/index"
import goodsTab from "@/components/goodsTab"
export default {
    data(){
        return {
            checkAll:false,
            condition:"",
            pullConditionAry:[
                {
                    "label":"最新",
                    "value":"1"
                },
                {
                    "label":"销量",
                    "value":"2"
                },
                {
                    "label":"佣金额",
                    "value":"3"
                },
                {
                    "label":"优惠券面额",
                    "value":"4"
                },
            ],
            weekAry:[],
            weekTxtAry:[
                {
                    "txt":"星期一",
                    "checked":false,
                    "value":"1"
                },
                {
                    "txt":"星期二",
                    "checked":false,
                    "value":"2"
                },
                {
                    "txt":"星期三",
                    "checked":false,
                    "value":"3"
                },
                {
                    "txt":"星期四",
                    "checked":false,
                    "value":"4"
                },
                {
                    "txt":"星期五",
                    "checked":false,
                    "value":"5"
                },
                {
                    "txt":"星期六",
                    "checked":false,
                    "value":"6"
                },
                {
                    "txt":"星期日",
                    "checked":false,
                    "value":"7"
                },
            ],
            time:"",
            initTime:new Date()
        }
    },
    components:{
        goodsTab
    },
    created(){
        
        
    },
    methods:{
       checkeAllFun(){
           if(this.checkAll){
               this.weekAry=["1","2","3","4","5","6","7"];
           }else{
                this.weekAry=[]
           }
           
       },
       subFun(){
           var _this=this;
           if(this.weekAry.length==0){
               this.$message.error("请选择拉取规则");
               return;
           }

           if(!this.condition){
               this.$message.error("请选择拉取规则");
               return;
           }

           if(!this.time){
               this.$message.error("请选择拉取时间");
               return;
           }

           var param={
               condition:this.condition,
               weeks:this.weekAry.join(","),
               time:this.time
           }

           addPullTask(param).then(function(res){
               if(res.code==200){
                   _this.$message.success("添加成功");
                   location.reload();
               }else{
                   _this.$message.error(res.msg);
               }
           });

           
       }
    }
}
</script>

<style>
    .goodsOut .checkContain{
        display: flex;
        height: 50px;
        align-items: center;
        background: #fff;
        font-size: 16px;
    }

    .goodsOut .checkContain .title{width:100px;text-align: center;margin-right: 20px;}

    .goodsOut .btn{
        height: 32px;line-height: 0;margin-left:20px;
    }

   
</style>


