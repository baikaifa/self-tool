<template>
    <div class="backV">
        <div class="btn">
            <i class="iconfont icon-fanhui backBtn" @click="goBack" v-if="type"></i>
            <span class="transTocenter">{{pageName}}</span>
            <slot name="rightBtn"></slot>
            <slot name="other"></slot>
        </div>

    </div>
</template>
<script>
export default {
    props:{
        pageName:'',
        type:'',
        params:{
            type:Object
        }
    },

    methods: {
        goBack(){
            console.log(this.$router);
            if(this.params && JSON.stringify(this.params) != "{}"){//分享页面返回到详情页需要带的参数
                console.log(this.params);
                if(this.type==="wechatLogin"){
                    return;
                }
                if (Object.keys(params).length > 0) {
                    this.$router.push({name:this.type,query:this.params});
                } else {
                    this.$router.go(-1);
                }
            }
            //this.$router.go(-1);
        }
    },
}
</script>
<style>
.backV{
    width:100%;
    background: #fff;
    border-bottom:1px solid #f2f2f2;
    position: fixed;
    z-index:999;
    top:0;
}
.backV .btn{
   width:100%;
   height:0.8rem;
   display: flex;
   align-items: center;
   padding-left:0.24rem;
  position:relative;
}
.backV .btn i{
    font-size:0.32rem;
}
.backV .backIcon{
    cursor: pointer;
}
</style>
