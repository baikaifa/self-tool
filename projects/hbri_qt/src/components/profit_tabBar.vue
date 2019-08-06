<template>
    <section class="profit_tab">
            <div class="tab_item" @click="changeTab">
                <div class="tab_txt" :class="pageType=='online'?'cur':''">线上</div>
            </div>
            <div class="tab_line"></div>
            <div class="tab_item" @click="changeTab">
                <div class="tab_txt" :class="pageType=='offline'?'cur':''">线下</div>
               
            </div>
    </section>
</template>

<script>
export default {
    data:function(){
        return {

        }
    },
    props:{
        pageType:String, // online-线上 offline-线下
    }, 
    created:function(){

    },
    methods:{
        
        changeTab:function(){

             this.$emit("changeTab");

        }

    }
}
</script>

<style>
    .profit_tab{height: 0.88rem;display: flex;align-items: center;background: #fff;}
    .tab_item{flex: 1;display: flex;justify-content: center;align-items: center;}
    .tab_txt{font-size: 0.32rem;height: 0.88rem;line-height: 0.88rem;}
    .tab_txt.cur{color: #3288ff;border-bottom: 2px solid #3288ff;}
    .tab_line{height: 0.56rem;border-left: 1px solid #ccc;width: 0rem;box-sizing: content-box;}
</style>

