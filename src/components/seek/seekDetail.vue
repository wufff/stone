<template>
    <div class="content">
      <div class="pu_header clearfix" >
             <div @click.prevent="goback" class="bakcSpan">
                  <span class="icon-左"></span>
             </div>
             <span class="title" id ="title">{{data.name}}</span>
      </div>   
      <div class="content2">
            <div class="time">{{data.created}}</div>
            <div class="summary" v-if="data.summary">{{data.summary}}</div>
            <div class="inner" v-html="data.content"></div>
      </div>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
    export default {
    name: '',
    data(){
      return {
      	data:""
      }
    },

    created:function(){
       api.ajaxLaoding('',
         "Article/Detail",{id:this.$route.query.id}
        ).then(res=>{
          this.data = res.data.result;
          console.log(res);
          console.log(this.data);
        }).catch(()=>{
          console.log("失败");
        });
   },

    updated: function (){
          var imgs = document.querySelectorAll("img");
            for (let i = 0 ; i<imgs.length ; i++){
                imgs[i].style.width = '100%';
           }
       },
       
    methods:{
       goback(){
         window.history.go(-1);
       }
    	 
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    #title {
     color:#545352;
     
    }
    .pu_header{
      border-bottom: none;
    }
    .content {
       min-height: 100%;
       background-color: #fff;
    }
    .content2 {
       padding-top: 50/@rem;
    }
    .time {
       font-size: 12/@rem;
       text-align: center;
       margin-bottom: 5/@rem;
    }
    .summary {
       font-size: 13/@rem;
       text-align: center;
       padding-bottom: 5/@rem;
    }
    .inner {
       padding: 0 18/@rem 0 19/@rem;
    }
</style>