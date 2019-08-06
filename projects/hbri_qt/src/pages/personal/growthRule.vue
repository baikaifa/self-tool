<template>
    <div>
        <backBtn pageName="成长值规则" :type="type"></backBtn>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
export default {
    data(){
        return {
            type: ""
        }
    },
    created() {
        this.type = this.$route.params.type;
    },
    components:{
        backBtn
    },
    created () {
        
    },
    methods: {
        
    },
}
</script>
<style>
</style>