<template>
    <div class="hb_agreeMent">
        <backBtn pageName="用户协议" :type="type"></backBtn>
        <p>海豹App用户协议</p>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn"
export default {
    data(){
        return {
            type:''
        }
    },
      created() {
        this.type = this.$route.params.type;
    },
    components:{
        backBtn
    }
}
</script>
<style></style>