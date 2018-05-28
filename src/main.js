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

Vue.config.productionTip = false
import betterScroll from './components/betterScroll.vue'

Vue.use(ElementUI);
Vue.use(loading);
Vue.use(error);
Vue.component('better-scroll', betterScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
