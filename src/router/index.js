import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  routes: [
    { 
      path: '/', 
      redirect: { name: 'discory' }
     },
    {
	  path: '/discory',
	  name:"discory",
	  component: function (resolve) {
	    require(['@/components/index/discory.vue'], resolve)
	  }
	},
	{
	  path: '/active',
	  name:'active',
	  component: function (resolve) {
	    require(['@/components/active/active.vue'], resolve)
	  }
	},
	{
	  path: '/about',
	  name:'about',
	  component: function (resolve) {
	    require(['@/components/about/about.vue'], resolve)
	  }
	},
	{
	  path: '/seek',
	  name:'seek',
	  component: function (resolve) {
	    require(['@/components/seek/seek.vue'], resolve)
	  }
	},
	{
	  path: '/search',
	  name:'search',
	  component: function (resolve) {
	    require(['@/components/search/search.vue'], resolve)
	  }
	},
	{
	  path: '/searchList',
	  name:'searchList',
	  component: function (resolve) {
	    require(['@/components/search/searchList.vue'], resolve)
	  }
	},
	{
	  path: '/classfiy',
	  name:'classfiy',
	  component: function (resolve) {
	    require(['@/components/classfiy/classfiy.vue'], resolve)
	  }
	},
	{
	  path: '/detail',
	  name:'detail',
	  component: function (resolve) {
	    require(['@/components/detail/detail.vue'], resolve)
	  }
	},
	{
	  path: '/seekDetail',
	  name:'seekDetail',
	  component: function (resolve) {
	    require(['@/components/seek/seekDetail.vue'], resolve)
	  }
	},
	{
	  path: '/activeDetail',
	  name:'activeDetail',
	  component: function (resolve) {
	    require(['@/components/active/activeDetail.vue'], resolve)
	  }
	}
	
  ]
})
