<template>
    <div class="sreach">
          <div class="searchWarp clearfix">
         <div class="left" @click.prevent="goBack">
           <i class="fa fa-angle-left"></i>
          </div>
         <div class="right ss" @click.prevent="sreach">搜索</div>
         <div class="inputBox3 right">
             <span class="icon-放大镜 icon"></span>
             <input type="text" name="adf" placeholder="海量商品这里搜索" id="inputbox" v-model="msg">
             <icon type="cancel" style="color:#999;" v-show="msg" class="dele" @click.native="dele"></icon>
         </div>
      </div>
      <div class="content">
      	  <h4>热门搜索</h4>
      	  <ul class="clearfix">
      	  	<li v-for="item in word" @click.prevent="goSearchList(item)">{{item}}</li>
      	  </ul>
      </div>
    </div>
</template>

<script type="ecmascript-6">
import { Icon } from 'vux'
import api from '@/api';
    export default {
    name: 'sreach',
    data(){
      return {
      	word:[],
      	msg:""
      }
    },
    created:function(){
      api.ajaxLaoding('',
      "Search/Hot",{}
          ).then(res=>{
            console.log(res);
         this.word = res.data.result.words;
         }).catch(()=>{
          console.log("失败");
        });
    },
    methods:{
    	goBack(){
    	   window.history.go(-1);
    	},
    	goSearchList(item){
    		this.$router.push({path:"/searchList",query:{word:item}});
    	},
    	sreach(){
    		if(this.msg){
    			this.$router.push({path:"/searchList",query:{word:this.msg}});
    		}
    	},
    	dele(){
    		this.msg = "";
    	}
    },
    components: {
        Icon
     }
  }
</script>
<style lang="less" src="../../../static/style/search.less" scoped></style>
<style lang="less" scoped>
@rem: 23.45rem;
   .content {
      padding-top: 48/@rem;
   	 h4 {
   	 	font-weight:normal;
   	   padding-bottom: 8/@rem;
       background-color: #fff;
       padding-left: 15/@rem;
       padding-top: 15/@rem;
       border-bottom: 1px solid #eee;
   	 }
     ul{
       padding: 0 20/@rem;
       background-color: #fff;
       padding-top:20/@rem;
       padding-bottom: 5/@rem;
     }
   	 li {
   	 	float: left;
   	 	border:1px solid #999;
   	 	border-radius: 10px;
   	 	padding: 3/@rem 10/@rem; 
   	 	margin-right: 20/@rem; 
   	 	margin-bottom:15/@rem; 
   	 }
   }
</style>