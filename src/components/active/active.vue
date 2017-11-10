<template>
  <div>
    <div class="pu_header clearfix" >
             <span class="title">活动列表</span>
    </div>   
    <div class="pu_content">
       <ul class="listUl">
          <li v-for="item in list" @click.prevent="goDetail(item.id)">
             <img v-lazy="item.image">
             <div class="tilte">{{item.name}}</div>
             <div class="des">{{item.intro}}</div>
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
         "Campaign/List",{"pageIndex":1,"pageSize":20}
        ).then(res=>{
          console.log(res);
          this.list = res.data.result.campaigns;
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
       padding: 10/@rem 15/@rem;
       position: relative;
       img {
          width: 85/@rem;
          height: 85/@rem;
       }
       .tilte  {
         position: absolute;
         top: 15/@rem;
         left: 120/@rem;
         color:#545352;
         overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 240/@rem;
       }
       .des {
         position: absolute;
         top: 50/@rem;
         left: 120/@rem;
         font-size: 13/@rem;
         width: 240/@rem;
         height: 36/@rem;
         line-height: 18/@rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
         -webkit-line-clamp: 2;
          overflow: hidden;
       }
     }
  }
</style>
