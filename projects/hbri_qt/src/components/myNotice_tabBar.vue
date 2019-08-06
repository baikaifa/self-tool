<template>
    <section class="myNotice_tab">
            <div class="tab_item" @click="goToIncomeNotice">
                <div class="tab_txt" :class="pageType=='income'?'cur':''">收益消息</div>
            </div>
            <div class="tab_line"></div>
            <div class="tab_item" @click="gotoMyNotice">
                <div class="tab_txt" :class="pageType=='notice'?'cur':''">我的消息</div>
                <div v-if="pageType=='income'&&hasNew" class="noticePoint"></div>
            </div>
    </section>
</template>

<script>
export default {
    data:()=>{
        return {
           
        }
    },
    props:{
        pageType:String, // notice-我的消息 income 收益消息
        hasNew:{
            type:Boolean,
            defalut:false
        } // 是否有新消息
    }, 
    created:function(){

    },
    mounted:function(){
        
    },
    methods:{
        
        goToIncomeNotice:function(){
            
            var pageType=this.pageType;
            if(pageType=="notice"){
                this.$router.push({
                    name:"incomeNotice"
                });
            }
        },
        gotoMyNotice:function(){
            var pageType=this.pageType;
            if(pageType=="income"){
                this.$router.push({
                    name:"myNotice"
                });
            }
        }
    }
}
</script>

<style>
    .myNotice_tab{height: 0.88rem;display: flex;align-items: center;background: #fff;}
    .tab_item{flex: 1;display: flex;justify-content: center;align-items: center;}
    .tab_txt{font-size: 0.32rem;height: 0.88rem;line-height: 0.88rem;}
    .tab_txt.cur{color: #3288ff;border-bottom: 2px solid #3288ff;}
    .tab_line{height: 0.56rem;border-left: 1px solid #ccc;width: 0rem;box-sizing: content-box;}
    .noticePoint{background: #fb4f4e;border-radius: 50%;width: 0.18rem;height: 0.18rem;position: relative;top: -0.15rem;left: 0.05rem;}
</style>

