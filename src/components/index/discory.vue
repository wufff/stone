<template>
  <div>
  <div class="clearfix" id="header">
          <span class="icon-分类二 classfiyIcon" @click.prevent="goClassfiy"></span>
          <span class="cart"  @click.prevent="goCart">咨询</span>
         
         <div class="inputBox" @click.prevent="goReach">
            <span class="icon-放大镜 icon"></span>
            <span style="color: #ddd" >约152598种商品</span>
         </div>
  </div>
  <div class="index_content">
        <div class="page-swipe">
              <mt-swipe :auto="5000">
                 <mt-swipe-item v-for="(item,index) in 3" :key="index">{{item}}</mt-swipe-item>
              </mt-swipe>
        </div>
        <div class="hot_wrap">
            <hot :params="hotParams"></hot>
         </div>
  </div>

   <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/share/foot';
import hot from  '@/components/share/hotList';
export default {
  name: 'hello',
  data () {
    return {
       hotParams:{
           action:"Home/hotSales",
           storeId:"",
           title:"部分精选"
        }
    }
  },

  methods:{
      goClassfiy(){
         this.$router.push({path:"/classfiy"});
      },
      goReach(){
        this.$router.push({path:"/search"});
      },
  },

   components: {
      foot,
      hot
  }
}
</script>

<style  lang="less" scoped>
@rem: 23.45rem;
 #header {
       position: fixed;
       z-index: 560;
       top:0;
       left:0;
       right: 0;
       padding: 5/@rem 0 0/@rem 0;
       width: 100%;
       background-color: #fff;
       border-bottom: 1px solid #ddd; 
       height: 40/@rem;
       .left {
         padding-top: 2/@rem;
         width: 28/@rem;
         text-align: center;
        } 

        span.classfiyIcon {
          font-size: 22/@rem;
          position: absolute;
          left:13/@rem;
          top:9/@rem;
        }

        span.cart {
          /* font-size: 22/@rem;*/
          font-size: 13/@rem;
          position: absolute;
          right:13/@rem;
          top:9/@rem;
          
        }
      
        .inputBox {
         background-color: #eee;
         padding: 2/@rem 5/@rem 2/@rem 5/@rem;
          position: absolute;
          left:48/@rem;
          top:7/@rem;
         
        

           width: 280/@rem;
          
          border-radius: 5/@rem;
          font-size: 16/@rem;
          span.icon {margin: 0 3/@rem;position: relative;top:1px;}
          #inputbox::placeholder {
            color:#c7c7c7;
          }
          
        
      } 
     
    }
 .index_content {
    padding-top: 40/@rem;
    padding-bottom: 58/@rem;

  }
</style>
