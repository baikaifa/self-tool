// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // vue主体
import 'lib-flexible/flexible' // 全局适配rem控制
import App from './App' // 主体app.vue加载
import router from './router/index' // 路由相关加载
import Navigation from 'vue-navigation' // 路由keepalive相关控制尝试
import axios from 'axios' // 请求相关控制1
import VueAxios from 'vue-axios' // 请求相关控制2
import VueScroller from 'vue-scroller' // 列表加载控制相关，上拉加载，下拉刷新
import VueLazyload from 'vue-lazyload' // 图片懒加载

import './assets/css/iconfont/iconfont.css' // 字体文件
import './assets/css/global.css' // 多功能通用样式内容

function decisionSystem() {
	const u = navigator.userAgent.toLowerCase();
	// app=navigator.appVersion;
	// var ia=u.indexOf('Android')>-1||u.indexOf('Linux')>-1;//andr
	// var ii=!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios
	const ag = {
		aliapp: "ali",
		ip: "ios",
		android: "android",
		linux: "android",
		symbianos: "symbian",
		"windows phone": "winPhone",
		mac: "mac"
	};
	for (let v in ag) {
		if (u.indexOf(v) >= 0) {
			return ag[v];
		}
	}
	return "pc";
}
// 注册项目的router文件
Vue.use(Navigation, { router });
Vue.prototype.$http = axios;
Vue.prototype.sysEnv = decisionSystem();
Vue.use(VueAxios, axios);
Vue.use(VueScroller);
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: require('./assets/img/defItem.png'),
	loading: require('./assets/img/defItem.png'),
	attempt: 1
});

// 复制插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({ // 初始化
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
