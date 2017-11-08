<template>
    <div class="classfiy">
       <div class="searchWarp clearfix">
         <div class="left" @click.prevent="goBack">
           <i class="fa fa-angle-left"></i>
          </div>
         <div class="inputBox2 right" @click.prevent="goSearch">
            <span class="icon-放大镜 icon"></span>
            <span>约131102件宝贝</span>
         </div>
      </div>
      <div class="content">
         <category></category>
      </div>
      
    </div>
</template>

<script type="ecmascript-6">
import category from '@/components/classfiy/category';
    export default {
    name: 'classfiy',
    data(){
      return {
        /*-------------分类--------------*/
        classDate:["手机相机","大家电","食品酒水","电脑办公","厨卫电器","居家生活","食品酒水"],
        tabNow:0
       
      }
    },
    created:function(){
      
    },

    methods:{
    	goSearch(){
         this.$router.push({path:"/search"});
      },
      goTab(index){
        this.tabNow = index;
      },
      goBack(){
         window.history.go(-1);
      }
    },
     components: {
      category
   }
  }
</script>
<style lang="less" src="../../../static/style/search.less" scoped></style>
<style lang="less" scoped>
@rem: 23.45rem;
    .classfiy {
       width: 100%;
       height: 100%;
    }
  
  .content{
    padding-top: 44/@rem;
    height: 100%;
    overflow: atuo;
  }
  
</style>