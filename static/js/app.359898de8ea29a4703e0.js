webpackJsonp([11],{101:function(t,e,n){n(93);var o=n(29)(n(65),n(98),null,null);t.exports=o.exports},39:function(t,e,n){"use strict";var o=n(7),i=n(99);o.default.use(i.a),e.a=new i.a({routes:[{path:"/",redirect:{name:"discory"}},{path:"/discory",name:"discory",component:function(t){n.e(0).then(function(){var e=[n(109)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/active",name:"active",component:function(t){n.e(6).then(function(){var e=[n(105)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/about",name:"about",component:function(t){n.e(7).then(function(){var e=[n(104)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/seek",name:"seek",component:function(t){n.e(4).then(function(){var e=[n(112)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/search",name:"search",component:function(t){n.e(3).then(function(){var e=[n(110)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/searchList",name:"searchList",component:function(t){n.e(1).then(function(){var e=[n(111)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/classfiy",name:"classfiy",component:function(t){n.e(2).then(function(){var e=[n(107)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/detail",name:"detail",component:function(t){n.e(8).then(function(){var e=[n(108)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/seekDetail",name:"seekDetail",component:function(t){n.e(9).then(function(){var e=[n(113)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/activeDetail",name:"activeDetail",component:function(t){n.e(5).then(function(){var e=[n(106)];t.apply(null,e)}.bind(this)).catch(n.oe)}}]})},41:function(t,e){},42:function(t,e){},43:function(t,e){},44:function(t,e){},50:function(t,e,n){n(92);var o=n(29)(n(66),n(97),null,null);t.exports=o.exports},51:function(t,e){function n(){var t=document.querySelector("html"),e=t.getBoundingClientRect().width;t.style.fontSize=e/16+"px"}n(),window.addEventListener("orientationchange",n),window.addEventListener("resize",n)},64:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(43),i=(n.n(o),n(48)),a=n.n(i),s=n(44),c=(n.n(s),n(49)),u=n.n(c),r=n(41),l=(n.n(r),n(46)),p=n.n(l),h=n(42),d=(n.n(h),n(47)),f=n.n(d),m=n(7),v=n(45),w=n.n(v),y=n(50),x=n.n(y),b=n(51),g=(n.n(b),n(39)),_=n(40);m.default.use(_.a),m.default.use(f.a),m.default.use(p.a),m.default.component(u.a.name,u.a),m.default.component(a.a.name,a.a),w.a.attach(document.body),m.default.config.productionTip=!1,new m.default({router:g.a,render:function(t){return t(x.a)}}).$mount("#app-box")},65:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(68);e.default={name:"toast",mixins:[o.a],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},66:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(54),i=n.n(o);e.default={name:"app",beforeCreate:function(){function t(t,e,n,o){var i=null;try{i=new XMLHttpRequest}catch(t){i=new ActiveXObject("Microsoft.XMLHTTP")}"get"==t&&n&&(e+="?"+n),i.open(t,e,!0),"get"==t?i.send():(i.setRequestHeader("content-type","application/x-www-form-urlencoded"),i.send(n)),i.onreadystatechange=function(){4==i.readyState&&(200==i.status?o&&o(i.responseText):alert("登录出错了,错误码："+i.status))}}function e(t){var e,n,o=decodeURIComponent(window.location.search.substring(1)),i=o.split("&");for(n=0;n<i.length;n++)if(e=i[n].split("="),e[0]===t)return void 0===e[1]||e[1]}function n(){var n=e("code"),s=e("state");if(void 0==n){var c={action:"OAuth/Authorize",args:null};t("post","http://www.wapdoor.com:888/",i()(c),function(t){console.log("发起授权");var e=JSON.parse(t);window.location.href=e.result})}var u={action:"OAuth/GetUserInfo",args:{state:s,code:n}},r=i()(u);if(void 0==n)return void console.log("code's length is 0");t("post","http://www.wapdoor.com:888/",r,function(t){console.log("授权完成");var e=JSON.parse(t),n=e.result.token;a.setItem("token",n),o()})}function o(){var e=a.getItem("token");if(e){var o={action:"OAuth/CheckToken",args:{token:e}};t("post","http://www.wapdoor.com:888/",i()(o),function(t){JSON.parse(t).result?console.log("已经是登录状态"):n()})}else n()}var a=window.localStorage;a.setItem("token","27817DC9-E279-4711-949E-6787F4C305E7"),o()}}},92:function(t,e){},93:function(t,e){},97:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},98:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content",style:t.style},[t._t("default")],2)])])],1)},staticRenderFns:[]}}},[64]);
//# sourceMappingURL=app.359898de8ea29a4703e0.js.map