
<template>
    <div class="groupPop_applySuccess" v-if="applyShow"  @touchmove.prevent>
            <div class="mask"></div>
            <div class="popImgContain" >
                <img class="popImg"  src="../../assets/img/community/applyPop.png"/>
                <img class="closeImg" @click="applyShowClose" src="../../assets/img/community/popClose.png"/>
            </div>           
            
    </div>
</template>

<script>
export default {
    data(){
        return {
            applyShow:false
        }
    },
    props:{
        
    },
    created(){
        
    },
    methods:{
        applyShowClose(){
            this.applyShow=false;
        }
    }
}
</script>

<style>
    .groupPop_applySuccess{
        position: absolute;
        left: 0;
        top: 0px;
        right: 0;
        bottom: -100px;
        height:100%;
        
    }
    .groupPop_applySuccess .mask{

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color:black;opacity:0.7;left:0px;top: 0px;filter:alpha(opacity=70);-moz-opacity:0.7;position:absolute;
        z-index:100;
        
 
    }

    .groupPop_applySuccess .popImgContain{
        position: absolute;
        z-index: 101;
        width: 90vw;
        margin-left:-45vw;
        left:50%;
        top:14vh;
    }

    .groupPop_applySuccess .popImgContain .popImg{
        width: 100%;
    }

    .groupPop_applySuccess .popImgContain .closeImg{
        position: absolute;
        z-index: 102;
        width: 80px;
        left: 50%;
        margin-left: -40px;
       bottom: 0px;
        
    }
</style>

