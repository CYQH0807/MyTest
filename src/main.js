// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import loading from './plugin/loading'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
import './assets/scss/index.css';
import betterScroll from './components/betterScroll.vue'

Vue.use(ElementUI);
Vue.use(loading)
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
