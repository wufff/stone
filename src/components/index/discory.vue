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
            <span style="color: #ddd"></span>
         </div>
  </div>
  <div class="index_content">
        <div class="page-swipe slide">
              <mt-swipe :auto="5000">
                 <mt-swipe-item v-for="(item,index) in slides" :key="index">
                     <img v-lazy="item.image">
                  </mt-swipe-item>
              </mt-swipe>
        </div>
        <div class="classfiy clearfix">
            <div v-for="item in categories" @click="goSearchlist(item.id,item.name)">
              <img v-lazy="item.image">
              <p>{{item.name}}</p>
            </div>
           <div @click.prevent="goClassfiy">
              <img v-lazy="">
              <p v-text="text2"></p>
           </div>
        </div>
        <div class="active clearfix">
            <h5>{{text1}}</h5>
            <img v-lazy="item.image"  v-for="item in campaigns" @click="goAcitve(item.id)">
         </div> 
        <div class="hot">
            <hot :params="hotParams"></hot>
        </div>
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
       slides:"",
       categories:"",
       campaigns:"",
       /*text*/
       text1:"",
       text2:"",
       hotParams:{
           action:"Home/HotSales",
           title:"部分精选"
        }
    }
  },

   created:function(){
      api.ajaxLaoding('',
         "Home/Index",{}
        ).then(res=>{
          this.slides = res.data.result.slides;
          this.categories = res.data.result.categories;
          this.campaigns = res.data.result.campaigns;
          console.log(this.campaigns);
          this.text1 = "热门活动";
          this.text2="所有宝贝";
        }).catch(()=>{
          console.log("失败");
        });
    },

  methods:{
      goClassfiy(){
         /*this.$router.push({path:"/classfiy"});*/
         alert("即将上线")
      },
      goReach(){
        this.$router.push({path:"/search"});
      },
      goSeek(){
        this.$router.push({path:"/seek"});
      },
      goSearchlist(id,word){
          this.$router.push({path:"/searchList",query:{cateId:id,cateword:word}});
      },
      goAcitve(id){
        this.$router.push({path:"/activeDetail",query:{id:id}});
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
    .slide {
       margin-bottom: 3/@rem;
    }
    .classfiy{
      margin-bottom: 3/@rem;
    }
    .active {
       margin-bottom: 3/@rem;
    }
  }
  .classfiy {
     > div {
       width: 16.666%;
       float: left;
       border-right:1px solid #f4f4f4; 
       background-color: #fff;
       padding: 5/@rem 0;
       img{ 
         display: block;
         width: 30/@rem;
         height: 30/@rem;
         margin: 3/@rem auto;
       }
       p {
         text-align: center;
         font-size: 13/@rem;
       }
     }
  }
  .active {
       background-color: #fff;
       padding: 10/@rem 8/@rem 10/@rem 8/@rem;
       h5 {
         font-weight: normal;
         padding-left: 15/@rem;
         padding-bottom: 2/@rem;
         font-size: 14/@rem;
         margin-bottom: 4/@rem;
         text-align: center;
       }
      img {
         width: 100%;
         height: 180/@rem;
         margin-bottom: 5/@rem;
      }
    }
</style>
