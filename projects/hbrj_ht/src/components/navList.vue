<template>
    <div class="navList">
        <div v-for="(item,index) in navData" :key="index">
            <div class="topNav"><i :class="['iconfont blueText pr20',item.icon]"></i>{{item.name}}</div>
            <div v-for="(unit,pos) in item.subNav" :key="pos" :class="['subNav',clickPos == unit.name?'blueBg':'']" @click="jumpToPage(unit.path,unit.name)">
                <div>{{unit.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import {menuList} from "@/api/index"
import {getLocalData} from "@/utils/base"
export default {
    data(){
        return {
            clickPos:'商品库',
            navData:[]
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData(){
            let uid = getLocalData("hbrj_uid");
            let params = {
               // uid:uid
               uid:100001
            }
            menuList(params).then((data) => {
                if(data.code = 200){
                    this.navData = data.data
                }
            })
        },
        jumpToPage(path,name){
            this.clickPos = name;
            this.$router.push({name:path});
        }
    },
}
</script>
<style>
    .navList{
        height: 100%;
        overflow-y:auto;
        width:260px;
        color: #808080;
        font-size:16px;
        border-right:1px solid #dadee4;
    }
    .navList .topNav{ 
        height: 40px;
        background-color: #eff4ff;
        padding-left:30px;
        line-height:40px;
        text-align: left;
    }
    .navList .subNav{
        height: 40px;
        line-height:40px;
        text-align: left;
        padding-left:90px;
        font-size:14px;
        cursor: pointer;
        background:#fff;
    }
    .navList .subNav:hover{
        background:#3288ff;
        color:#fff;
    }
    .navList .blueBg{
        background:#3288ff;
        color:#fff;
    }
</style>
