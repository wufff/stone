<template>
    <div>
      <div class="backBt"  @click.prenvet="goBack">
         <span class="icon-左"></span>
      </div>
      <div class="datail_content" id="content">
         <ul>
           <li class="page-lazyload-listitem" v-for="item in images">
             <img v-lazy="item">
           </li>
        </ul>
        <div class="info">
           <div v-html="info.desc">
              
           </div>
        </div>
      </div>
      <div class="footfix">
         <div class="top" id="top">
            <p class="name">{{info.name}}</p>
            <div class="tag">
              <span v-for="item in info.tags">{{item}}</span>
            </div>      
         </div>
         <div class="bottom clearfix">
            <div class="left" @click="scrollDetail">详情 <i class="fa fa-angle-right"></i></div>
            <div class="right"><span class="icon-浏览"></span> <span class="num"></span>{{info.pv}}</div>
            <div class="right" @click.prevent="like">
              <span class="icon-点赞空心" v-show="!info.hasLike"></span>
              <span class="icon-点赞空心" v-show="info.hasLike" style="color:red"></span>
             <span class="num">{{info.likeCount}}</span></div>
           </div>
      </div>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
 function getScrollTop() {  
            var scrollPos;  
            if (window.pageYOffset) {  
            scrollPos = window.pageYOffset; }  
            else if (document.compatMode && document.compatMode != 'BackCompat')  
            { scrollPos = document.documentElement.scrollTop; }  
            else if (document.body) { scrollPos = document.body.scrollTop; }   
            return scrollPos;   
    }  
 function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}
   
import { Lazyload } from 'mint-ui';
    export default {
    name: '',
    data(){
      return {
         images: [],
         info:""
      }
    },
    created:function(){
       api.ajaxLaoding('',
         "Goods/Detail",{"id":this.$route.query.id}
        ).then(res=>{
          console.log(res);
          this.images = res.data.result.images;
          this.info = res.data.result;
        }).catch(()=>{
          console.log("失败");
        });
    },
    mounted() {
         window.addEventListener('scroll', this.changscroll)
    },
    methods:{
      goBack(){
         window.history.go(-1);
      },
      changscroll(){
         var top = getScrollTop();
         var name = document.getElementById("top");
         if(top == 0){
            name.style.display = 'block';
         }else {
            name.style.display = 'none';
         }
      },
      scrollDetail(){
         var h = document.documentElement.scrollHeight || document.body.scrollHeight;
         window.scrollTo(h,h);
      },
      like(){
          api.ajax('',
         "Goods/Like",{"id":this.$route.query.id}
        ).then(res=>{
         if(res.data.result){
             this.$vux.toast.show({
                          text: '点赞成功',
                          type:"text",
                          time:1000
                     });
             
                }else {
             this.$vux.toast.show({
                          text: '已经点过赞',
                          type:"text",
                          time:1000
                });
            }
        }).catch(()=>{
          console.log("失败");
        });
      }
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
  img {
    display: block;
    width: 375/@rem;
    height: 375/@rem;
    margin-bottom: 5/@rem;
  }
  .backBt {
     width: 35px;
     height:35px;
     border-radius: 50%;
     background-color: rgba(0,0,0,0.2);
     color: #fff;
     line-height: 38px;
     text-align: center;
     position: fixed;
     left: 20/@rem;
     top:18/@rem;
     span{
      font-size: 20px;
     }
  }  
  .footfix {
     position:fixed;
     left: 0;
     bottom: 0;
     background-color: #fff;
     width: 100%;
     color:#545352;
     .top{
        padding:10/@rem 20/@rem 10/@rem 20/@rem;
       .name{margin-bottom: 10/@rem;}
       .tag {
          span {
                 display: inline-block; 
                 padding: 2/@rem 10/@rem;
                 background: red;
                 color:#fff;
                 border-radius:8/@rem;
                 font-size: 13/@rem;
                 margin-right: 8/@rem;

               }
                }
     }
     .bottom {
       border-top: 1px solid #ddd;
       height: 40/@rem;
       line-height: 40/@rem;
       padding-left: 15/@rem;
       padding-right: 15/@rem;
       div {
         width: 60/@rem;
         text-align: center;
       }
       .num {
         font-size: 14/@rem;
         margin-left: 5/@rem;
       }
     }
  }
  .datail_content {
     padding-bottom: 43/@rem;
  }
  .info {
     background-color: #fff;
     padding: 10/@rem;
  }
</style>