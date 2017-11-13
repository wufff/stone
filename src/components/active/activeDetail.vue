<template>
  <div class="wrap">
      <div class="backBt"  @click.prenvet="goBack">
         <span class="icon-左"></span>
      </div>
      <img v-lazy="list.image">
      <h4 class="title">{{list.name}}</h4>
      <p class="content">{{list.intro}}</p>
      <div class="content" v-html="list.desc"></div>
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
       
    }
  },
  created:function(){
       api.ajax('',
         "Campaign/Detail",{"id":this.$route.query.id}
        ).then(res=>{
          this.list = res.data.result;
          console.log(this.list);
         
        }).catch(()=>{
          console.log("失败");
        });
   },

    
  updated: function (){
          var p = document.querySelectorAll("p");
            for (let i = 0 ; i<p.length ; i++){
                p[i].style.padding  = '10px';
           }
            var imgs = document.querySelectorAll("img");
            for (let i = 0 ; i<imgs.length ; i++){
                imgs[i].style.width = '100%';
           }
       },

  methods: {
     goBack(){
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
   img {
     width: 100%;
     display: block;
   }
   .title {
     text-align: center;
     font-weight: normal;
     background-color: #fff;
     padding: 20/@rem 15/@rem;
     /*border-bottom: 1px solid #ddd;*/
   }
   .content {
     background-color: #fff;
     color: #696969;
   }
   .wrap {
     min-height: 100%;
     background-color: #fff;
   }
</style>
