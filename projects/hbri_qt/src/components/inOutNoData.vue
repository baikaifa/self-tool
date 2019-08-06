<template>
    <section class="noData">
            <img src="../assets/img/no_in_out.png"/>
            <div class="noData_txt">{{noDataTxt1}}</div>
            <div class="noData_txt">{{noDataTxt2}}</div>
    </section>
</template>
<script>
export default {
    data:()=>{
        return {

        };
    },
    props:{
        noDataTxt1:{
            type:String,
            defalut:""
        },
        noDataTxt2:{
            type:String,
            defalut:""
        }
    },
    created:()=>{

    },
    methods:{

    }
}
</script>
<style>
    .noData img{display: block;width: 60%;margin: 0 auto;margin-top:1.8rem;}
    .noData .noData_txt{color: #a7c6ff;margin-top: 0.1rem;text-align: center;}
    .noData .noData_txt:first-of-type{margin-top:0.4rem;}
</style>


