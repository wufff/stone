<template>
  <div>
  <div class="clearfix" id="header">
          <div class="classfiyIcon" @click.prevent="goClassfiy">
            <span class="icon-分类二 icon"></span>
            <p class="text">分类</p>
          </div>
          <div class="cart" @click.prevent="goSeek">
            <span class="icon-咨询 icon"></span>
            <p class="text">咨讯</p>
          </div>
         <div class="inputBox" @click.prevent="goReach">
            <span class="icon-放大镜 icon"></span>
            <span style="color: #ddd">搜索宝贝</span>
         </div>
  </div>
  <div class="index_content">
        <div class="banner">
              <swiper :list="slides" loop auto :interval=5000 :aspect-ratio="340/790"  ></swiper>
             <!--  <swiper  loop auto :interval=2000 height="banheight">
                  <swiper-item v-for="(item,index) in bannerData" :key="index" >
                      <img :src="item.image">
                  </swiper-item>
              </swiper> -->
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
        <div class="active clearfix" id="box">
            <h5>{{text1}}</h5>
                  <div class="clearfix" id="wrap">
                    <div id="item" v-for="item in campaigns" @click="goAcitve(item.id)">
                       <img v-lazy="item.image">
                       <p class="name">{{item.title}}</p>
                    </div> 
                  </div> 
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
import { Swiper } from 'vux';
import foot from '@/components/aashare/foot';
import hot from  '@/components/aashare/hotList';
export default {
  name: 'hello',
  data () {
    return {
       slides:[],
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
          this.slides = res.data.result.slides.map( item => {
                     return {
                               url:"",
                               img:item.image,
                               title: ''
                            }
               });
          this.categories = res.data.result.categories;
          this.campaigns = res.data.result.campaigns;
          console.log(this.campaigns);
          this.text1 = "热门活动";
          this.text2="所有宝贝";
        }).catch(()=>{
          console.log("失败");
        });
    },

   updated: function (){
          var num = this.campaigns.length;
          var item = document.querySelector("#item");
          var box = document.querySelector("#box");
          var wrap = document.querySelector("#wrap");
          var Width = document.querySelector("#item").offsetWidth;
          wrap.style.width = num*Width +3+"px";

          function cssTransform(el,attr,val) {
                if(!el.transform){
                  el.transform = {};
                }
                if(arguments.length>2) {
                  el.transform[attr] = val;
                  var sVal = "";
                  for(var s in el.transform){
                    switch(s) {
                      case "rotate":
                      case "skewX":
                      case "skewY":
                        sVal +=s+"("+el.transform[s]+"deg) ";
                        break;
                      case "translateX":
                      case "translateY":
                        sVal +=s+"("+el.transform[s]+"px) ";
                        break;
                      case "scaleX":
                      case "scaleY":
                      case "scale":
                        sVal +=s+"("+el.transform[s]+") ";
                        break;  
                    }
                    el.style.WebkitTransform = el.style.transform = sVal;
                  }
                } else {
                  val  = el.transform[attr];
                  if(typeof val == "undefined" ) {
                    if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
                      val = 1;
                    } else {
                      val = 0;
                    }
                  }
                  return val;
                }
              }

/*---------------------平滑拖动----------------------*/

function navSwipe(box,ele) {
  var startPoint = 0;
  var startX = 0;
  var minX = box.clientWidth - ele.offsetWidth;
  var step = 1;
  var lastX = 0; //上次的距离
  var lastTime = 0;//上次的时间戳
  var lastDis = 0;
  var lastTimeDis = 0;
    box.addEventListener(
    'touchstart', 
    function(e) {
      ele.style.transition = "none";
      startPoint = e.changedTouches[0].pageX;
      startX = cssTransform(ele,"translateX");
      step = 1;
      lastX = startX;
      lastTime = new Date().getTime();
      lastDis = 0;
      lastTimeDis = 0;
    }
  );
    box.addEventListener(
    'touchmove', 
    function(e) {
      var nowPoint = e.changedTouches[0].pageX;
      var dis = nowPoint - startPoint;
      var left = startX + dis;
      var nowTime = new Date().getTime();
      if(left > 0) {
        step = 1-left / box.clientWidth; //根据超出长度计算系数大小，超出的越到 系数越小
        left = parseInt(left*step);
        /*left = 0;*/
      }
      if(left < minX) {
        var over = minX - left; // 计算下超出值
        step = 1-over / box.clientWidth; //根据超出值计算系数
        over = parseInt(over*step);
        left = minX - over;
      }
      lastDis = left-lastX; //距离差值
      lastTimeDis = nowTime - lastTime; //时间差值
      lastX = left;
      lastTime = nowTime;
      cssTransform(ele,"translateX",left);
    }
  );
    box.addEventListener(
    'touchend', 
    function (){
      var speed = (lastDis/lastTimeDis)*300; //用距离差值/时间差值 = 速度   速度*系数 = 缓冲距离
      var left = cssTransform(ele,"translateX");
      var target = left + speed; //当前值 + 缓冲距离 = 目标点
      var type = "cubic-bezier(.34,.92,.58,.9)";
      var time = Math.abs(speed*.9);
      time = time<300?300:time;
      if(target > 0) {
        target = 0;
        type ="cubic-bezier(.08,1.44,.6,1.46)";
      }
      if(target < minX) {
        target = minX;
        type ="cubic-bezier(.08,1.44,.6,1.46)";
      }
      ele.style.transition = time+"ms " + type;
      cssTransform(ele,"translateX",target);
    }
  );
   }
   navSwipe(box,wrap);
          
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
      hot,
      Swiper
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
       padding: 0/@rem 0 0/@rem 0;
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
         padding: 5/@rem 5/@rem 5/@rem 5/@rem;
          position: absolute;
          left:48/@rem;
          top:6/@rem;
         
        

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
    .banner {
       margin-bottom: 3/@rem;
       height: 161.39/@rem;
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
         width: 45/@rem;
         height:45/@rem;
         margin: 3/@rem auto;
       }
       p {
         text-align: center;
         font-size: 13/@rem;
         color: #545352;
       }
     }
  }
  .active {
       background-color: #fff;
       padding: 10/@rem 0/@rem 10/@rem 0/@rem;
       overflow: hidden;
       h5 {
         font-weight: normal;
         padding-left: 15/@rem;
         padding-bottom: 2/@rem;
         font-size: 14/@rem;
         margin-bottom: 4/@rem;
         text-align: center;
       }
      #wrap {
         position: relative;
         width: 150%;
         box-sizing: border-box;
         #item {
            width: 187/@rem;
            height: 187/@rem;
            float: left;
            padding: 5/@rem;
            position: relative;
            p {
               height: 43/@rem;
               position: absolute;
               bottom: 0;
               left:5/@rem;
               right: 5/@rem;
               bottom: 5/@rem;
               background-color: rgba(0, 0, 0, 0.2);
               color: #fff;
               font-size: 12/@rem;
               padding: 3/@rem 8/@rem;
               line-height: 18/@rem;
               overflow: hidden;
            }
         }
         img {
           width: 100%;
           height: 100%;
         }
      }
    }
</style>
