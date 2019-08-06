import Vue from "vue"

import headerView from "@/components/header"
import navList from "@/components/navList"

function plugin(Vue){
    if(plugin.installed){
        return;
    }
    Vue.component("headerView", headerView);
    Vue.component("navList", navList);
}

export default plugin