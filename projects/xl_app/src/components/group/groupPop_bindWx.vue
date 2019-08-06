<template>
    <div class="groupPop_bindWx" v-if="bindWxShow">
            <div class="mask"></div>
            <div class="popImgContain">
                <img class="popImg"  src="../../assets/img/community/popBindNotice.png"/>
                <img class="closeImg" @click="bindWxClose" src="../../assets/img/community/popClose.png"/>
                <img class="toBindBtn" src="../../assets/img/community/btn_toBind.png"/>
               
            </div>           
            
    </div>
</template>
<script>
export default {
    data(){
        return {
            bindWxShow:false,
        }
    },
    props:{
        
    },
    methods:{
        bindWxClose(){
            this.bindWxShow=false;
        }
    }
}
</script>

<style>
    .groupPop_bindWx{
        position: absolute;
        left: 0;
        top: -90px;
        right: 0;
        bottom: -100px;
        
    }
    .groupPop_bindWx .mask{

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color:black;opacity:0.7;left:0px;top: 0px;filter:alpha(opacity=70);-moz-opacity:0.7;position:absolute;
        z-index:100;
        
 
    }

    .groupPop_bindWx .popImgContain{
        position: absolute;
        z-index: 101;
        width: 90vw;
        margin-left:-45vw;
        left:50%;
        top:14vh;
    }

    .groupPop_bindWx .popImgContain .popImg{
        width: 100%;
    }

    .groupPop_bindWx .popImgContain .closeImg{
        position: absolute;
        z-index: 102;
        width: 80px;
        left: 50%;
        margin-left: -40px;
       bottom: 0px;
        
    }
    .groupPop_bindWx .popImgContain .toBindBtn{
         position: absolute;
         z-index: 102;
         width: 70vw;
         left: 50%;
         margin-left: -35vw;
         bottom: 200px;
    }
</style>

