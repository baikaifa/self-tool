<template>
    <div class="groupPop_bindWx" v-if="bindWxShow"  @touchmove.prevent>
            <div class="mask"></div>
            <div class="popImgContain" @mousewheel.prevent>
                <img class="popImg"  src="../../assets/img/community/popBindNotice.png"/>
                <img class="closeImg" @click="bindWxClose" src="../../assets/img/community/popClose.png"/>
                <img class="toBindBtn" @click="gotoWxBind" src="../../assets/img/community/btn_toBind.png"/>
               
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
        },
        gotoWxBind(){
            this.$router.push({
                name:'wxBind'
            })
        }
    }
}
</script>

<style>
    .groupPop_bindWx{
        position: absolute;
        left: 0;
        top: 0px;
        right: 0;
        bottom: -100px;
        touch-action: none    
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
        width: 86vw;
        margin-left:-43vw;
        left:50%;
        top:20vh;
        overflow: hidden;
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

