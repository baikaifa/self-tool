<template>
	<div class="app_head" :class="{pc_app_head: sys_env === 'pc'}">
		<div class="clear"></div>
		<div class="tit_bar" :class="{pc_tit_bar: sys_env === 'pc'}">
			<div class="tit_bar_tit" :class="{pc_tit_bar_tit: sys_env === 'pc'}"></div>
			<div class="tit_bar_cont">
				<div v-if="showBak && !hasBothMenu" class="tit_side touch" :class="bw ? 'side_left_w' : 'side_left'" @click.stop="goBak">
				</div>
				<div v-if="hasBothMenu" class="tit_side touch">
					<slot name='app_tit_left'></slot>
				</div>
				<div class="tit_tit" :class="{tit_tit_w: bw}" slot="app_tit_txt">
					<slot v-if="!showTitle" name='app_tit_txt'>
					</slot>
					<template v-else>
						{{showTitle}}
					</template>
				</div>
				<div v-if="showBak || hasMenu || hasBothMenu" class="tit_side touch side_righ">
					<slot name='app_tit_righ'></slot>
				</div>
			</div>
		</div>
		<div class="tit_bak_hide" v-if="!hasBak"></div>
		<div class="clear"></div>
	</div>
</template>

<script>

export default {
	data: function() {
		return {
			sys_env: this.sysEnv
		}
	},
	// 标题，是否有后退控制，是否有背景框，是否有右部菜单，是否左右均为菜单（与Slot:app_tit_left共同使用），是否为白色底
	props: ['title','bak','hasBak', 'hasMenu', 'hasBothMenu', 'bw'],
	computed: {
		showTitle() {
			// console.log("in showtitle ... ");
			return this.title ? this.title : (this.defTitle ? this.defTitle : '');
		},
		showBak() {
			return this.bak ? this.bak : (this.headBak ? this.headBak : false);
		}
	},
	methods: {
		goBak() {
			// if (this.$parent.goBack) {
			// 	this.$emit('goBack');
			// } else {
				this.$router.go(-1);
			// }
			// try {
			// } catch (e) {
			// 	this.$router.go(-1);
			// }
		}
	}
}
</script>

<style scoped="scoped" type="text/css">
.app_head {
	width: 750px;
	height: 100px;
}
.pc_app_head{
	height: 60px !important;
}
.app_head .tit_bar {
	position: fixed;
	width: 750px;
	height: 100px;
	overflow: hidden;
}
.app_head .pc_tit_bar {
	height: 60px !important;
}
.app_head .tit_bar .tit_bar_tit {
	width: 750px;
	height: 40px;
	overflow: hidden;
}
.app_head .pc_tit_bar .tit_bar_tit {
	height: 0px !important;
}
.app_head .tit_bar .tit_bar_cont {
	display: flex;
	width: 750px;
	height: 60px;
}
.app_head .tit_bar_cont .tit_side {
	margin-top: 15px;
	flex: 4;
	height: 40px;
}
.app_head .tit_bar_cont .side_left {
	/* text-align: center; */
	/* color: #343434;
	padding-top: 7px; */
	margin-top: 18px;
	background-image: url(../../assets/img/global/tit_bak.png);
	background-repeat: no-repeat;
	background-size: 20px 35px;
	background-position: center center;
}
.app_head .tit_bar_cont .side_left_w {
	/* text-align: center; */
	/* color: #343434;
	padding-top: 7px; */
	background-image: url(../../assets/img/global/tit_bak_w.png);
	background-repeat: no-repeat;
	background-size: 20px 35px;
	background-position: center center;
}
.app_head .tit_bar_cont .side_left i {
	font-size: 34px;
}
.app_head .tit_bar_cont .tit_tit {
	margin-top: 13px;
	/* width: 630; */
	flex: 18;
	height: 40px;
	text-align: center;
	font-size: 36px;
	color: #343434;
}
.app_head .tit_bar_cont .tit_tit_w {
	color: #ffffff !important;
}
</style>
