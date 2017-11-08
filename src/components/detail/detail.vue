<template>
    <div>
      <div class="backBt"  @click.prenvet="goBack">
         <i class="fa fa-angle-left"></i>
      </div>
      <ul>
          <li class="page-lazyload-listitem" v-for="item in list">
           <img v-lazy="item" class="page-lazyload-image">
        </li>
      </ul>
      <div class="footfix">
         <div class="top">
            <p class="name">namenamenamename</p>
            <div class="tag">
              <span>adfadfs</span>
              <span>adfadfs</span>
            </div>      
         </div>
         <div class="bottom clearfix">
            <div class="left" @click="scrollDetail">详情 <i class="fa fa-angle-right"></i></div>
            <div class="right">点赞 1</div>
            <div class="right">浏览 1</div>
         </div>
      </div>
    </div>
</template>

<script type="ecmascript-6">
 function getScrollTop() {  
            var scrollPos;  
            if (window.pageYOffset) {  
            scrollPos = window.pageYOffset; }  
            else if (document.compatMode && document.compatMode != 'BackCompat')  
            { scrollPos = document.documentElement.scrollTop; }  
            else if (document.body) { scrollPos = document.body.scrollTop; }   
            return scrollPos;   
    }  
import { Lazyload } from 'mint-ui';
    export default {
    name: '',
    data(){
      return {
         list: [
          'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg',
          'http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg',
          'http://fuss10.elemecdn.com/1/c5/95c37272d3e554317dcec1e17a9f5jpeg.jpeg',
          'http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg',
          'http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg',
          'http://fuss10.elemecdn.com/7/a5/596ab03934612236f807b92906fd8jpeg.jpeg'
        ]
      }
    },
    created:function(){
      
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
         console.log(top);
      },
      scrollDetail(){
          console.log("c");
          document.body.scrollTop = 0;
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
     line-height: 35px;
     text-align: center;
     position: fixed;
     left: 20/@rem;
     top:18/@rem;
     i {
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
                 padding: 2/@rem 15/@rem;
                 background: red;
                 color:#fff;
                 border-radius:8/@rem;}
                }
     }
     .bottom {
       border-top: 1px solid #999;
       height: 40/@rem;
       line-height: 40/@rem;
       div {
         width: 80/@rem;
         text-align: center;
       }
     }
  }
</style>