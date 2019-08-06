<template>
    <div class="bottomBox" >
        <div v-for="(item,index) in list" :key="index">
             <div  @touchstart.stop="clickHandle(item.path,item.params)">
                <i :class="['iconfont',item.title,fromType == index?'activeText':'']"></i>
                <p :class="fromType == index?'activeText':''">{{item.name}}</p>
            </div>
        </div>
        <slot name='purchaseNum'></slot>
    </div>
</template>

<script>
export default {
	name: "",
    props:{
      fromType:0,
      list:{
          type:Array,
          default(){
              let group = [
                  {name:'首页',path:'home',title:'icon-shouye-'},
                  {name:'分类',path:'teaItemList',title:'icon-fenlei'},
                  {name:'好券',path:'goodsPost',title:'icon-youhuiquan',params:'quanView'},
                  {name:'我的',path:'personalCenter',title:'icon-my'}
                  ];
              return group;
          }
      }
    },
    methods:{
      clickHandle:function (path,par) {
        if(par){
          this.$router.push({name:path,params:{"quanView":par,"pageName":'好券',searchType:4}})
        }else{
          this.$router.push({name:path})
        }
      }
    }
}
</script>

<style scoped type="text/css">
.bottomBox{
  border-top: 1px solid #e2e2e2;
  position: fixed;
  bottom:0;
  width:100%;
  height:0.97rem;
  display: flex;
  justify-content: space-around;
  font-size:0.2rem;
  align-items: center;
  background: #fff
}
.bottomBox i{
  font-size:20px;
}
.activeText{
  color:#3289ff;
}
</style>
