<template>
    <div class="loading" v-if="isShowLoad">
			<div class="loadingIn">
				<img src="../assets/img/xileloading.gif" alt="">
				<p>加载中...</p>
			</div>
	</div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        isShowLoad:{
            value:false,
            type:Boolean
        }
    },
    methods:{
        
    }
}
</script>

<style>
    .loading{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000000;
    }
    .loadingIn{
        width: 280px;
        height: 300px;
        border-radius: 10px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        margin-top: -150px;
        margin-left: -140px;
    }
    .loadingIn img{
        width: 160px;
        height: 160px;
        margin-top: 50px;
    }
    .loadingIn p{
        padding-top: 20px;
        font-size: 28px;
    }
</style>
