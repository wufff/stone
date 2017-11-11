<template>
  <div>
    <div class="pu_header clearfix" >
             <span class="title">关于我们</span>
    </div>   
    <div class="pu_content">
       <ul class="listUl">
          <li v-for="item in list">
             <div class="time">{{item.created}}</div>
             <div class="name">{{item.name}}</div>
             <div class="des" v-html="item.content"></div>
          </li>
       </ul>
    </div>
     <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/aashare/foot';
import api from '@/api';
export default {
  name: 'hello',
  data () {
    return {
       list:"",
       page:1
    }
  },
  created:function(){
       api.ajaxLaoding('',
         "Article/AboutUs",{}
        ).then(res=>{
          console.log(res);
          this.list = res.data.result.articles;
        }).catch(()=>{
          console.log("失败");
        });
   },
  methods: {
     goback(){
       window.history.go(-1);
     },
     goDetail(id){
         this.$router.push({path:"/activeDetail",query:{id:id}});
     }
  },
   components: {
      foot
  }
  
}
</script>


<style lang="less" scoped>
@rem: 23.45rem;
  .listUl {
     li {
       background-color: #fff;
       margin-bottom: 3/@rem;
       padding: 50/@rem 15/@rem 10/@rem 15/@rem;
       position: relative;
       width: 100%;
       img {
          width: 85/@rem;
          height: 85/@rem;
       }
       .time  {
         position: absolute;
         top: 12/@rem;
         right: 15/@rem;
        width: 118/@rem;
        font-size: 13/@rem;
       }
      .name  {
         position: absolute;
         top: 12/@rem;
         left: 15/@rem;
        width: 218/@rem;
        font-size: 15/@rem;
        color: #545352;
        overflow: hidden;
       text-overflow:ellipsis;
        white-space: nowrap;
       }
       .des {
         padding: 0 15/@rem;
         color: #696969;
       }
     }
  }
</style>

