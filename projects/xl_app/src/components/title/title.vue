<template>
	<div class="app_head">
		<div class="clear"></div>
		<div class="tit_bar">
			<div v-if="showBak"  slot="app_tit_left" class="tit_side touch side_left" @click.stop="goBak" @touch.stop="goBak">
				<i class="iconfont iconfanhui"></i>
			</div>
			<div class="tit_tit" slot="app_tit_txt">
				{{showTitle}}
			</div>
			<div v-if="showBak" class="tit_side touch side_righ" slot="app_tit_righ">
			</div>
		</div>
		<div class="clear"></div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
		}
	},
	props: ['title','bak'],
	computed: {
		showTitle() {
			// console.log("in showtitle ... ");
			return this.title ? this.title : (this.defTitle ? this.defTitle : '喜乐阳光汇');
		},
		showBak() {
			return this.bak ? this.bak : (this.headBak ? this.headBak : false);
		}
	},
	methods: {
		goBak() {
			this.$router.go(-1);
		}
	}
}
</script>

<style scoped="scoped" type="text/css">
.app_head {
	width: 750px;
	height: 100px;
}
.app_head .tit_bar {
	margin-top: 40px;
	display: flex;
	width: 750px;
	height: 60px;
	overflow: hidden;
}
.app_head .tit_side {
	margin-top: 10px;
	flex: 1;
	height: 40px;
}
.app_head .side_left {
	text-align: right;
	color: #343434;
	height: 100%;
	line-height: 100%;
}
.app_head .side_left i {
	font-size: 34px;
}
.app_head .tit_tit {
	margin-top: 10px;
	/* width: 630; */
	flex: 10;
	height: 40px;
	text-align: center;
	font-size: 36px;
	color: #343434;
}
</style>
