<template>
    <div>
       <div class="pu_header clearfix" >
             <div @click.prevent="goback" class="bakcSpan">
                  <span class="icon-左"></span>
             </div>
             <span class="title">咨询</span>
      </div>   
      <div class="pu_content">
          <ul class="wrap">
            <li class="clearfix" @click.prevent="goDetail">
              <span class="title">玉雕的几种特殊工艺技术</span>
              <span class="time">1982/12/21</span>
              <span class="icon-右 icon"></span>
            </li>
             <li class="clearfix">
              <span class="title">人文化，立体化的玉器办件供应案发时爱的</span>
              <span class="time">1982/12/21</span>
              <span class="icon-右 icon"></span>
            </li>
          </ul>
      </div>  
       <foot></foot>
    </div>
</template>

<script type="ecmascript-6">
import foot from '@/components/aashare/foot';
    export default {
    name: '',
    data(){
      return {
         liDate:[], 
      }
    },
    created:function(){
      
    },
    methods:{
       goback(){
         window.history.go(-1);
       },
       goDetail(){
         this.$router.push({path:"/seekDetail"});
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
        padding:7/@rem 15/@rem 7/@rem 15/@rem;
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
        }
        .icon {
          position: absolute;
          right: 12/@rem;
          top:8/@rem;
        }
     }
  }
    
</style>