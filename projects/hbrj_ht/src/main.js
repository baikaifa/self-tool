
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/common.css"
import "@/assets/css/font-size/iconfont.css"
import GL_Component from "@/config/gComponent.js"

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(GL_Component);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
