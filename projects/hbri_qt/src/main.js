import Vue from 'vue'
import App from './App'
import router from './router/index'
import "@/assets/css/fontSize/iconfont.css"
import Mint from "mint-ui"
import 'mint-ui/lib/style.css'
import "@/assets/css/index.css"
import { MessageBox, Toast } from 'mint-ui';
import md5 from "js-md5"
import { phoneType} from "./config";
import VueClipboard from 'vue-clipboard2';
import 'swiper/dist/css/swiper.css';
import filters from "@/utils/filter";

import { DatetimePicker } from 'mint-ui';

Vue.component(DatetimePicker.name, DatetimePicker);

let homeScrollTop = 0;
Vue.use(Mint);
Vue.use(VueClipboard);
Vue.prototype.$messagebox = MessageBox;
Vue.prototype.$toast = Toast;
Vue.prototype.$md5 = md5;
Vue.prototype.$phoneType = phoneType;
Vue.prototype.$homeScroll = homeScrollTop;

Object.keys(filters).forEach((item) =>{
	Vue.filter(item, filters[item]);
});


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

