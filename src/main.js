// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import loading from './plugin/loading'
import error from './plugin/error'
import ElementUI from 'element-ui';
require("./assets/scss/index.scss");
import "./assets/css/test.css"
import 'element-ui/lib/theme-chalk/index.css'
import util from "./util/util";

Vue.config.productionTip = false
import betterScroll from './components/betterScroll.vue'

Vue.use(ElementUI);
Vue.use(loading);
Vue.use(error);
Vue.component('better-scroll', betterScroll);



Vue.directive('urlRplace', {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind: function (el, binding) {
    // 聚焦元素
    let value = binding.value;
    let finalVal = value;
    console.log(util.getReguRL(value));
    let urlArray = util.getReguRL(value);
    //debugger
    //console.log(util.replaceUrl(this.urlData,"|--|"));
    for (let i = 0; i < urlArray.length; i++) {
      const urlStr = urlArray[i];
      finalVal = finalVal.replace(urlStr, "<a href='" + urlStr + "'>" + urlStr + "</a>")
      console.log(finalVal)
    }
    //
    el.innerHTML = finalVal;

  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
