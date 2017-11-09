<template>
    <div>
      <div class="pu_header clearfix" >
             <div @click.prevent="goback" class="bakcSpan">
                  <span class="icon-左"></span>
             </div>
             <span class="title">详情</span>
      </div>   
    </div>
</template>

<script type="ecmascript-6">
    export default {
    name: '',
    data(){
      return {
      	title:"" 
      }
    },
    created:function(){
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
    
</style>