import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  routes: [
    {
	  path: '/',
	  component: function (resolve) {
	    require(['@/components/index/Hello.vue'], resolve)
	  }
	},
	{
	  path: '/active',
	  component: function (resolve) {
	    require(['@/components/active/active.vue'], resolve)
	  }
	},
  ]
})
