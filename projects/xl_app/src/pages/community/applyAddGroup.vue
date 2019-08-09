<template>
    <section class="applyAddGroup">
		<eleTit>
            <div slot='app_tit_righ' class="appl_save" @click.stop="toSave" @touch.stop="toSave">申请记录</div>
        </eleTit>
    </section>
</template>

<script>
import eleTit from "@/components/title/title";
export default {
    components:{ eleTit },
    methods: {
        toSave() {
            this.$router.push({name: "applyResult" });
        },
    }
}
</script>

<style scoped="scoped" type="text/css">
    .applyAddGroup .pageTitle {
	width: 750px;
	height: 100px;
    }
    
    .applyAddGroup .pageTitle .tit_bar {
        margin-top: 40px;
        display: flex;
        width: 750px;
        height: 60px;
        overflow: hidden;
    }
    .applyAddGroup .pageTitle .tit_side {
        margin-top: 15px;
        flex: 6;
        height: 40px;
    }

    .applyAddGroup .appl_save{
        color: #ef4454;
        font-size: 28px;
    }
    
    .applyAddGroup .pageTitle .side_left {
        /* text-align: center; */
        /* color: #343434;
        padding-top: 7px; */
        background-image: url(../../assets/img/global/tit_bak.png);
        background-repeat: no-repeat;
        background-size: 20px 35px;
        background-position: center center;
    }
    .applyAddGroup .pageTitle .side_left i {
        font-size: 34px;
    }
    .applyAddGroup .pageTitle .tit_tit {
        margin-top: 13px;
        /* width: 630; */
        flex: 14;
        height: 40px;
        text-align: center;
        font-size: 36px;
        color: #343434;
    }
</style>
