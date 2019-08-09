<template>
    <div class="topBox">
      <p v-if="isBack" v-on:click="goBack()" class="goback"><i class="iconfont iconfanhui"></i></p>
      <p class="backText">{{topname}}</p>
      <p v-if="isRight"></p>
    </div>
</template>

<script>
	export default {
		name: "topTable",
    props:{
      topname:String,
      isBack:Boolean,
      isRight:false,
    },
    methods:{
		  goBack:function () {
        this.$emit('goBack')
      }
    }
	}
</script>

<style scoped type="text/css">
  .topBox{
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    position: fixed;
    top: 0;
    background: #ffffff;
    z-index: 100000;
  }
  .topBox p{
    display: inline-block;
  }
  .goback{
    font-size: 24px;/*no*/
    float: left;
    width: 50px;
    position: absolute;
    top: 0;
    left: 0;
    height: 80px;
    line-height: 80px;
  }
  .goback .iconfont{
    font-size: 36px;
  }
  /* [data-dpr = '2'] .goback .iconfont{
    font-size: 36px;
  }
  [data-dpr = '3'] .goback .iconfont{
    font-size: 48px;
  } */
  .backText{
    font-size: 32px;/*no*/
  }
  /* [data-dpr = '2'] .backText{
    font-size: 32px;
  }
  [data-dpr = '3'] .backText{
    font-size: 48px;
  } */
</style>
