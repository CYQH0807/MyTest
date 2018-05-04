import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



const index = r => require.ensure([], () => r(require('../view/index')), 'index');
const transformExp = r => require.ensure([], () => r(require('../view/transformExp')), 'transformExp');

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/transformExp',
      name: 'transformExp',
      component: transformExp
    }
  ]
})
