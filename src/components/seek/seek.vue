<template>
    <div>
       <div class="pu_header clearfix" >
             <div @click.prevent="goback" class="bakcSpan">
                  <span class="icon-左"></span>
             </div>
             <span class="title">咨讯</span>
      </div>   
      <div class="pu_content">
          <ul class="wrap">
            <li class="clearfix" @click.prevent="goDetail(item.id)" v-for="item in liDate">
              <span class="title">{{item.name}}</span>
              <span class="time">{{item.created}}</span>
              <span class="icon-右 icon"></span>
            </li>
          </ul>
      </div>  
       <foot></foot>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
import foot from '@/components/aashare/foot';
    export default {
    name: '',
    data(){
      return {
         liDate:[], 
      }
    },

    created:function(){
       api.ajaxLaoding('',
         "Article/List",{"pageIndex":1,"pageSize":20}
        ).then(res=>{
          this.liDate = res.data.result.articles;
          console.log(res);
        }).catch(()=>{
          console.log("失败");
        });
   },
   
    methods:{
       goback(){
         window.history.go(-1);
       },
       goDetail(id){
         this.$router.push({path:"/seekDetail",query:{id:id}});
       }
    },
    components: {
      foot 
    }
  }
</script>

<style  lang="less" scoped>
@rem: 23.45rem;
  .wrap {
     li {
        background-color: #fff;
        position: relative;
        border-bottom: 1px solid #eee;
        padding:9/@rem 15/@rem 9/@rem 15/@rem;
        span{
           float: left;
        }
        .title {
           width: 230/@rem;
           overflow: hidden;
           text-overflow:ellipsis;
           white-space: nowrap;
           color:#545352;
        } 
        .time {
            font-size: 14/@rem;
            color:#999;
            margin-left: 15/@rem;
            position: relative;
            top:3/@rem;
        }
        .icon {
          position: absolute;
          right: 12/@rem;
          top:11/@rem;
        }
     }
  }
    
</style>