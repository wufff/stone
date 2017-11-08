// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import initFont from '../static/js/initFont.js';
import { InfiniteScroll } from 'mint-ui';
import router from './router';
import { Swipe, SwipeItem } from 'mint-ui';
import { Lazyload } from 'mint-ui';


Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
