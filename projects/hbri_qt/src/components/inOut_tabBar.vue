<template>
    <section class="inOut_tab">
            <div class="tab_item" @click="goToInDetail">
                <div class="tab_txt" :class="pageType=='in'?'cur':''">收入</div>
            </div>
            <div class="tab_line"></div>
            <div class="tab_item" @click="goToOutDetail">
                <div class="tab_txt" :class="pageType=='out'?'cur':''">支出</div>
               
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
        pageType:String, // in-收入 out-支出
    }, 
    created:function(){

    },
    methods:{
        goToOutDetail:function(){
            var pageType=this.pageType;
            if(pageType=="in"){
                this.$router.push({
                    name:"outDetail"
                });
            }
        },
        goToInDetail:function(){
            var pageType=this.pageType;
            if(pageType=="out"){
                this.$router.push({
                    name:"incomeDetail"
                });
            }
        }
    }
}
</script>

<style>
    .inOut_tab{height: 0.88rem;display: flex;align-items: center;background: #fff;}
    .tab_item{flex: 1;display: flex;justify-content: center;align-items: center;}
    .tab_txt{font-size: 0.32rem;height: 0.88rem;line-height: 0.88rem;}
    .tab_txt.cur{color: #3288ff;border-bottom: 2px solid #3288ff;}
    .tab_line{height: 0.56rem;border-left: 1px solid #ccc;width: 0rem;box-sizing: content-box;}
    .noticePoint{background: #fb4f4e;border-radius: 50%;width: 0.18rem;height: 0.18rem;position: relative;top: -0.15rem;left: 0.05rem;}
</style>

