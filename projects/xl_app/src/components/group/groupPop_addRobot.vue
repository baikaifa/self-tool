<template>
    <div class="groupPop_addRobot" v-if="addMaskShow">
            <div class="mask"></div>
            <div class="popImgContain">
                <img class="popImg"  src="../../assets/img/community/addFriendPop.png"/>
                <img class="wxCode" :src="addRobotInfo.qrCode"/>
                <img class="closeImg" @click="addFriendCLose" src="../../assets/img/community/popClose.png"/>
                <div class="copyWxCode">
                    <div class="wxCodeTxt" v-model="addRobotInfo.robotAlias">{{addRobotInfo.robotAlias}}</div>
                    <div  class="copyBtn" 
                    v-clipboard:copy="addRobotInfo.robotAlias"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onCopyError">复制</div>
                </div>
               
            </div>           
            
    </div>
</template>
<script>
export default {
    data(){
        return {
            addMaskShow:false
        }
    },
    props:{
        
        addRobotInfo:{
            type:Object
        }
    },
    created(){
        
    },
    methods:{
        onCopy(val){
            alert("已复制微信号"+val.text+"到剪切板");
        },
        onCopyError(){
            alert("微信号复制失败")
        },
        addFriendCLose(){
            this.addMaskShow=false;
        },
    }
}
</script>
<style>
    .groupPop_addRobot{
        position: absolute;
        left: 0;
        top: -90px;
        right: 0;
        bottom: -100px;
        
    }
    .groupPop_addRobot .mask{

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color:black;opacity:0.7;left:0px;top: 0px;filter:alpha(opacity=70);-moz-opacity:0.7;position:absolute;
        z-index:100;
        
 
    }

    .groupPop_addRobot .popImgContain{
        position: absolute;
        z-index: 101;
        width: 90vw;
        margin-left:-45vw;
        left:50%;
        top:13vh;
    }

    .groupPop_addRobot .popImgContain .popImg{
        width: 100%;
    }

    .groupPop_addRobot .popImgContain .closeImg{
        position: absolute;
        z-index: 102;
        width: 80px;
        left: 50%;
        margin-left: -40px;
       bottom: 0px;
        
    }

    .groupPop_addRobot .popImgContain .wxCode{
        position: absolute;
        z-index: 102;
        width: 40vw;
        left: 50%;
        margin-left: -20vw;
        top:320px;
    }

    .groupPop_addRobot .popImgContain .copyWxCode{
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        z-index:102;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        bottom: 300px;
    }

    .groupPop_addRobot .popImgContain .copyWxCode .wxCodeTxt{
        color: #ef4454;
        padding-right: 20px;
    }

    .groupPop_addRobot .popImgContain .copyWxCode .copyBtn{
        background: #ef4454;
        color: #fff;
        padding: 0 20px;
        border-radius: 10px;
    }
</style>


