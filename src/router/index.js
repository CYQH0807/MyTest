import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);



const index = r => require.ensure([], () => r(require('../view/index')), 'index');
const transformExp = r => require.ensure([], () => r(require('../view/transformExp')), 'transformExp');
const scrollbar = r => require.ensure([], () => r(require('../view/scrollbar')), 'scrollbar');
const formValidator = r => require.ensure([], () => r(require('../view/formValidator')), 'formValidator');
const betterScroll = r => require.ensure([], () => r(require('../view/betterScroll')), 'betterScroll');

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
    },
    {
      path: '/scrollbar',
      name: 'scrollbar',
      component: scrollbar
    },
    {
      path: '/formValidator',
      name: 'formValidator',
      component: formValidator
    }, {
      path: '/betterScroll',
      name: 'betterScroll',
      component: betterScroll
    }
  ]
})





