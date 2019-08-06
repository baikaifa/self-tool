<template>
	<div class="cour">
		<!-- 手机页面 -->
		<!-- <eleTit></eleTit> -->
		<div class="cour_win">
			<img class="win_phon" src="../../assets/img/mall/pingmu.png" alt />
			<img class="win_gif" :src="'static/course/' + pf + '.gif'" />
			<input type="button" class="win_btn" value="立即体验" @click.stop="entPf" @touch.stop="entPf" />
		</div>
		<!-- 手机页面 -->
	</div>
</template>
<script>
import eleTit from "@/components/title/title";
export default {
	data: function() {
		return {
			title: '淘宝返利教程',
			pf: 'tb',
			courGif: 'tb.gif'
		};
	},
	/**
	 * 组件检查 FIXME: 相关内容
	 */
	components:{
		eleTit
	},
	created() {
		const pf = this.$route.query.pf;
		if (pf) {
			switch (pf) {
				case 'jd':
					this.title = '京东返利教程';
					break;
				case 'vip':
					this.title = '唯品会返利教程';
					break;
				case 'pdd':
					this.title = '拼多多返利教程';
					break;
				default:
					return;
			}
			this.pf = pf;
		}
	},
	methods: {
		entPf() {
			switch (this.sysEnv) {
				case "ios":
					switch (this.pf) {
						case 'jd':
							window.webkit.messageHandlers.openJDUrl.postMessage({url: null, type: 0});
							return;
						case 'vip':
							window.webkit.messageHandlers.openVIPUrl.postMessage({url: null, type: 0});
							return;
						case 'pdd':
							window.webkit.messageHandlers.openPDDUrl.postMessage({url: null, type: 0});
							return;
						default:
							window.webkit.messageHandlers.openTBUrl.postMessage({url: null, type: 0});
							return;
					}
					return;
				case "android":
					switch (this.pf) {
						case 'jd':
							window.joybuy.openJDUrl("", 0);
							return;
						case 'vip':
							window.joybuy.openVIPUrl("", 0);
							return;
						case 'pdd':
							window.joybuy.openPDDUrl("", 0);
							return;
						default:
							window.joybuy.openTBUrl("", 0);
							return;
					}
					return;
			}
			alert("unknow error"); // 应为不可达情况
		},
	}
};
</script>

<style type="css/text" scoped="scoped">
.cour {
	display: flex;
	width: 750px;
	height: 100vh;
	background-image: url(../../assets/img/mall/gouwufanlibeijing.png);
	background-size: 750px;
	background-position: right top;
	background-repeat: no-repeat;
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
}
.cour .cour_win {
	position: relative;
	width: 384px;
	height: 784px;
}
.cour_win .win_phon {
	position: absolute;
	width: 384px;
	height: 784px;
}
.cour_win .win_gif {
	position: absolute;
	top: 78px;
	left: 50%;
	width: 345px;
	height: 610px;
	z-index: inherit + 1;
	transform: translate(-50%);
}
.cour_win .win_btn {
	margin-left: 50%;
	position: absolute;
	display: block;
	width: 300px;
	height: 80px;
	color: #fefffb;
	font-size: 16px;
	background-color: #ff314b;
	border-radius: 50px;
	transform: translate(-50%, 0);
	margin-top: 210%;
}
</style>


