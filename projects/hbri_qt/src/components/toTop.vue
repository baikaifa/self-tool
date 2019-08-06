<template>
    <!-- 要放到页面最上面 -->
    <div class="topTarget">
        <div id="topTarget"></div>
        <div id="topBtn" @click="toTop" v-if="showBtn">
            <img src="../assets/img/toTop.png" alt="" style="width: 0.37rem; height: 0.41rem">
        </div>
    </div>
</template>
<script>
export default {
    props:{

    },
    data(){
        return {
            showBtn: false
        }
    },
    mounted () {
        window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollToTop); 
    },
    methods: {
        toTop(){
            // document.body.scrollTop = 0
            // document.documentElement.scrollTop = 0
            topTarget.scrollIntoView();
        },
        scrollToTop() { 
            var target = document.getElementById('topBtn');
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop > 10){
                this.showBtn = true
            }else{
                this.showBtn = false
            }
            // console.log(scrollTop) 
        }
    }
}
</script>
<style>
    .topTarget #topBtn{
        position: fixed;
        bottom: 1.34rem;
        right: 0.53rem;
        width: 0.86rem;
        height: 0.86rem;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0px 0px 5px 1px #ccc;
        display: flex;
        align-items: center;
        justify-content: center
    }
</style>
