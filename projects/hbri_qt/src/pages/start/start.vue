<template>
    <div>
        <div class="startApp">

          <div class="startApp-bg">
            <img :src="start"  class="startApp-bg-img" />
          </div>
          <div class="startApp-info" >
            <img :src="startInfo" class="startApp-info-img" />
          </div>
          <div class="startApp-enter" v-if='enterBtnShow' v-on:click="enterBtnShow=''">
            <img :src="startEnter" class="startApp-enter-img" />
          </div>
          <div class="startApp-rotate" v-if='!enterBtnShow && time'>
            <img :src="startRotate" class="startApp-rotate-img" />
          </div>

        </div>

    </div>

</template>

<script>

import start from '../../assets/img/start/start.png'
import startInfo from '../../assets/img/start/start_info.png'
import startEnter from '../../assets/img/start/start_enter.png'
import startRotate from '../../assets/img/start/start_rotate.png'

export default {
    data(){
        return {
          start: start, // 启动图
          startInfo: startInfo, // 一次分享终身受益
          startEnter: startEnter, // 立即进入
          startRotate: startRotate, // 动画旋转加载
          time: 2000, // 动画旋转加载时间
          enterBtnShow: false // 立即进入按钮是否显示
        }
    },
    created() {

      setTimeout(()=>{
        this.enterBtnShow = true;
        this.time = '';
      },this.time)

    },
    methods: {
    }
}

</script>

<style>

.startApp {
  position: relative;
  width: 100%;
  height: 100%;
}
.startApp-bg-img {
  margin-top: 1.2rem;
  max-width: 80%;
  max-height: 55%;
}
.startApp-info-img {
  margin-top: 1rem;
  max-width: 55%;
}
.startApp-enter-img {
  margin-top: 1rem;
  max-width: 50%;
}
.startApp-rotate-img {
  margin-top: 1rem;
  max-width: .87rem;
  -webkit-animation: haha1 .8s linear infinite;
}

@-webkit-keyframes haha1 {
		0% {-webkit-transform:rotate(0deg);}
		25% {-webkit-transform:rotate(90deg);}
		50% {-webkit-transform:rotate(180deg);}
		75% {-webkit-transform:rotate(270deg);}
		100% {-webkit-transform:rotate(360deg);}
	}

</style>
