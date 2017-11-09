<template>
  <div>
  <div class="clearfix" id="header">
          <div class="classfiyIcon" @click.prevent="goClassfiy">
            <span class="icon-分类二 icon"></span>
            <p class="text">分类</p>
          </div>
          <div class="cart" @click.prevent="goSeek">
            <span class="icon-咨询 icon"></span>
            <p class="text">咨询</p>
          </div>
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
       <!--  <div class="hot_wrap">
            <hot :params="hotParams"></hot>
         </div> -->
  </div>

   <foot></foot>
  </div>
</template>

<script>
import api from '@/api';
import foot from '@/components/aashare/foot';
import hot from  '@/components/aashare/hotList';
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

   created:function(){
      api.ajaxLaoding('',
         "Home/Index",{}
        ).then(res=>{
          console.log(res);
        }).catch(()=>{
          console.log("失败");
        });
    },

  methods:{
      goClassfiy(){
         this.$router.push({path:"/classfiy"});
      },
      goReach(){
        this.$router.push({path:"/search"});
      },
      goSeek(){
        this.$router.push({path:"/seek"});
      }
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
       height: 43/@rem;
       .left {
         padding-top: 2/@rem;
         width: 28/@rem;
         text-align: center;
        } 

        div.classfiyIcon {
          position: absolute;
          left:13/@rem;
          top:5/@rem;
          color: #04BE02;
          span.icon {
             font-size: 20/@rem;
          }
          p.text{
             font-size: 10/@rem;
             position: relative;
             top:-3/@rem;
          }
        }

        div.cart {
          position: absolute;
          right:13/@rem;
          top:5/@rem;
          color: #999;
          span.icon {
             font-size: 20/@rem;
          }
          p.text{
             font-size: 10/@rem;
             position: relative;
             top:-3/@rem;
          }
        }

      
        .inputBox {
         background-color: #eee;
         padding: 4/@rem 5/@rem 4/@rem 5/@rem;
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
